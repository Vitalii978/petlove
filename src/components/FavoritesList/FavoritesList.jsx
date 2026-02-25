// src/components/FavoritesList/FavoritesList.jsx
// 🎯 КОМПОНЕНТ ДЛЯ ОТОБРАЖЕНИЯ ИЗБРАННЫХ ОБЪЯВЛЕНИЙ
// ✅ ИСПРАВЛЕНО: оптимистичное удаление и синхронизация

import React, { useState, useCallback, useEffect, useRef } from 'react';
// useState     - для хранения локальных данных
// useCallback  - для стабильных функций
// useEffect    - для синхронизации с useUser
// useRef       - для сравнения предыдущих значений

import useUser from '../../hooks/useUser';
// useUser - дает нам favorites и refreshUser

import noticesApi from '../../services/noticesApi';
// noticesApi - для отправки запросов на сервер

import NoticesItem from '../Notices/NoticeItem/NoticeItem';
import ModalAttention from '../ModalAttention/ModalAttention';
import ModalNotice from '../ModalNotice/ModalNotice';
import styles from './FavoritesList.module.css';

const FavoritesList = () => {
  console.log('🔥 FavoritesList рендерится');

  // 🎯 ПОЛУЧАЕМ ДАННЫЕ ИЗ ХУКА useUser
  const { favorites, refreshUser } = useUser();
  console.log('📦 favorites из useUser:', favorites?.length || 0, 'элементов');
  console.log(
    '📦 содержимое favorites:',
    favorites?.map(f => f._id)
  );

  // 🟢 ЛОКАЛЬНОЕ СОСТОЯНИЕ для мгновенного обновления
  // Это позволяет удалять карточку сразу, не дожидаясь сервера
  const [localFavorites, setLocalFavorites] = useState(favorites);

  // 🟢 useRef для отслеживания предыдущих значений
  // Нужен, чтобы избежать бесконечного цикла при синхронизации
  const prevFavoritesRef = useRef(favorites);

  // 🟢 СОСТОЯНИЯ ДЛЯ МОДАЛЬНЫХ ОКОН
  const [isModalAttention, setIsModalAttention] = useState(false);
  const [isModalOneFriend, setIsModalOneFriend] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);

  // 🟢 СОСТОЯНИЕ ДЛЯ БЛОКИРОВКИ КНОПОК
  // Хранит ID объявлений, которые сейчас обрабатываются
  // Чтобы нельзя было нажать два раза подряд
  const [processingIds, setProcessingIds] = useState(new Set());

  const token = localStorage.getItem('token');

  const closeModalAttention = () => setIsModalAttention(false);
  const closeModalOneFriend = () => setIsModalOneFriend(false);

  // =============== 🟢 СИНХРОНИЗАЦИЯ С useUser ===============
  // 🔥 ВАЖНО: сравниваем по содержимому, чтобы избежать цикла
  useEffect(() => {
    const prevFavorites = prevFavoritesRef.current;
    const currentFavorites = favorites;

    // Проверяем по длине
    if (prevFavorites.length !== currentFavorites.length) {
      console.log('🔄 favorites изменился по длине');
      setLocalFavorites(currentFavorites);
      prevFavoritesRef.current = currentFavorites;
      return;
    }

    // Проверяем по содержимому (сортируем ID для стабильного сравнения)
    const prevIds = prevFavorites
      .map(f => f._id)
      .sort()
      .join(',');
    const currentIds = currentFavorites
      .map(f => f._id)
      .sort()
      .join(',');

    if (prevIds !== currentIds) {
      console.log('🔄 favorites изменился по содержимому');
      setLocalFavorites(currentFavorites);
      prevFavoritesRef.current = currentFavorites;
    } else {
      console.log('⏭️ favorites не изменился');
    }
  }, [favorites]);

  // =============== 🟢 ОБРАБОТЧИК ОТКРЫТИЯ МОДАЛКИ ===============
  const handleOpenModal = notice => {
    console.log('🔍 Открываем модалку для:', notice.title);
    // Добавляем флаг isFavorite = true (так как это избранное)
    const noticeWithFavorite = {
      ...notice,
      isFavorite: true,
    };
    setSelectedNotice(noticeWithFavorite);

    if (token) {
      setIsModalOneFriend(true);
    } else {
      setIsModalAttention(true);
    }
  };

  // =============== 🟢 УДАЛЕНИЕ ИЗ ИЗБРАННОГО (из модалки) ===============
  const handleRemoveFromFavorites = useCallback(
    async id => {
      console.log('🗑️ handleRemoveFromFavorites для ID:', id);

      if (processingIds.has(id)) return;

      try {
        setProcessingIds(prev => {
          const newSet = new Set(prev);
          newSet.add(id);
          return newSet;
        });

        // 🔥 ОПТИМИСТИЧНОЕ УДАЛЕНИЕ - удаляем СРАЗУ!
        setLocalFavorites(prev => prev.filter(item => item._id !== id));

        const response = await noticesApi.removeFromFavorites(id);

        if (response.success) {
          console.log('✅ Успешно удалено с сервера');
          await refreshUser();
          closeModalOneFriend();
        } else {
          // Если ошибка - возвращаем карточку обратно
          console.log('❌ Ошибка сервера, откатываем');
          setLocalFavorites(favorites);
        }
      } catch (error) {
        console.error('❌ Ошибка при удалении:', error);

        if (error.response?.status === 409) {
          console.log('⚠️ Уже удалено');
          setLocalFavorites(prev => prev.filter(item => item._id !== id));
          await refreshUser();
          closeModalOneFriend();
        } else {
          setLocalFavorites(favorites);
        }
      } finally {
        setProcessingIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      }
    },
    [processingIds, refreshUser, favorites]
  );

  // =============== 🟢 УДАЛЕНИЕ ИЗ КАРТОЧКИ (клик на корзину) ===============
  const handleDeleteFromCard = useCallback(
    async id => {
      console.log('🗑️ handleDeleteFromCard для ID:', id);

      if (processingIds.has(id)) return;

      try {
        setProcessingIds(prev => {
          const newSet = new Set(prev);
          newSet.add(id);
          return newSet;
        });

        // 🔥 ОПТИМИСТИЧНОЕ УДАЛЕНИЕ - карточка исчезает МГНОВЕННО!
        setLocalFavorites(prev => prev.filter(item => item._id !== id));

        const response = await noticesApi.removeFromFavorites(id);

        if (response.success) {
          console.log('✅ Успешно удалено с сервера');
          await refreshUser();
        } else {
          // Ошибка - возвращаем карточку
          console.log('❌ Ошибка сервера, откатываем');
          setLocalFavorites(favorites);
        }
      } catch (error) {
        console.error('❌ Ошибка при удалении из карточки:', error);

        if (error.response?.status === 409) {
          console.log('⚠️ Уже удалено');
          setLocalFavorites(prev => prev.filter(item => item._id !== id));
          await refreshUser();
        } else {
          setLocalFavorites(favorites);
        }
      } finally {
        setProcessingIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      }
    },
    [processingIds, refreshUser, favorites]
  );

  // =============== 🟢 СОСТОЯНИЕ: НЕТ ИЗБРАННЫХ ===============
  if (!localFavorites || localFavorites.length === 0) {
    console.log('📭 Нет избранных объявлений');
    return (
      // <div className={styles.noFavorites}>
      <p className={styles.noFavorites}>
        Oops,{' '}
        <span className={styles.colorNoFavorites}>
          looks like there aren't any furries
        </span>{' '}
        on our adorable page yet. Do not worry! View your pets on the "find your
        favorite pet" page and add them to your favorites.
      </p>
      // </div>
    );
  }

  console.log(`📋 Рендерим ${localFavorites.length} избранных объявлений`);

  // =============== 🟢 ОСНОВНОЙ РЕНДЕР ===============
  return (
    <>
      {/* Модальное окно для неавторизованных */}
      <ModalAttention isOpen={isModalAttention} onClose={closeModalAttention} />

      {/* Модальное окно с деталями объявления */}
      {selectedNotice && (
        <ModalNotice
          isOpen={isModalOneFriend}
          onClose={closeModalOneFriend}
          notice={selectedNotice}
          onAdd={handleRemoveFromFavorites} // В избранном Add = Remove
          onRemove={handleRemoveFromFavorites}
          isFavorite={true}
        />
      )}

      {/* 🎯 СПИСОК ИЗБРАННЫХ ОБЪЯВЛЕНИЙ */}
      <ul className={styles.noticesList}>
        {localFavorites.map(notice => {
          return (
            <li key={notice._id} className={styles.oneCard}>
              <NoticesItem
                id={notice._id}
                imgURL={notice.imgURL}
                title={notice.title}
                name={notice.name}
                birthday={notice.birthday}
                gender={notice.sex}
                species={notice.species}
                category={notice.category}
                comment={notice.comment}
                price={notice.price}
                popularity={notice.popularity}
                onOpenModal={() => handleOpenModal(notice)}
                // 🔥 В избранном всегда isFavorite = true (показываем корзину)
                isFavorite={true}
                boxFavorite={true}
                onDelete={handleDeleteFromCard} // функция удаления
                isDisabled={processingIds.has(notice._id)} // блокировка
              />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default FavoritesList;
