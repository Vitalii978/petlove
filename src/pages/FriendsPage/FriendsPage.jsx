// src/pages/FriendsPage/FriendsPage.jsx

// 🎯 Импорты React хуков
import { useState, useEffect, useCallback } from 'react';

// 🎯 Импорты компонентов
import Title from '../../components/Title/Title';
import FriendsList from '../../components/Friends/FriendsList/FriendsList';

// 🎯 Импорт сервиса
import friendsApi from '../../services/friendsApi';

// 🎯 Импорт стилей
import styles from './FriendsPage.module.css';

// 🎯 КОМПОНЕНТ СТРАНИЦЫ "НАШИ ДРУЗЬЯ"
export const FriendsPage = () => {
  // =============== СОЗДАНИЕ СОСТОЯНИЙ ===============

  // 🎯 Состояние для хранения списка партнеров
  const [friends, setFriends] = useState([]);

  // 🎯 Состояние для отслеживания загрузки
  const [loading, setLoading] = useState(false);

  // 🎯 Состояние для ошибок
  const [error, setError] = useState(null);

  // =============== ФУНКЦИЯ ЗАГРУЗКИ ДАННЫХ ===============

  // 🎯 Функция для загрузки партнеров
  // В функции fetchFriends добавляем больше логирования:

  const fetchFriends = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('🔄 Загружаем партнеров через friendsApi...');

      const result = await friendsApi.getFriends();

      console.log('📊 Результат friendsApi.getFriends:', {
        успех: result.success,
        ошибка: result.error,
        типДанных: Array.isArray(result.data) ? 'массив' : typeof result.data,
        количествоДанных: Array.isArray(result.data)
          ? result.data.length
          : 'не массив',
        первыеДанные: result.data ? result.data.slice(0, 2) : 'нет данных',
      });

      if (result.success) {
        // 🎯 ДОПОЛНИТЕЛЬНАЯ ПРОВЕРКА ДАННЫХ
        if (!result.data || !Array.isArray(result.data)) {
          console.warn('⚠️ Данные не являются массивом:', result.data);
          setFriends([]);
          setError('Invalid data received from server');
        } else {
          // Фильтруем пустые значения
          const validData = result.data.filter(item => item !== null);
          setFriends(validData);
          console.log(`✅ Успешно загружено ${validData.length} партнеров`);
        }
      } else {
        setError(result.error);
        setFriends([]);
      }
    } catch (err) {
      console.error('❌ Неожиданная ошибка:', err);
      setError('Произошла ошибка при загрузке');
      setFriends([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // =============== ЭФФЕКТ ДЛЯ АВТОЗАГРУЗКИ ===============

  // 🎯 При загрузке страницы автоматически загружаем партнеров
  useEffect(() => {
    fetchFriends();
  }, [fetchFriends]);

  // =============== ОБРАБОТЧИК ПОВТОРНОЙ ЗАГРУЗКИ ===============

  const handleRetry = () => {
    fetchFriends();
  };

  // =============== РЕНДЕР СТРАНИЦЫ ===============

  return (
    // 🎯 section - семантический тег для секции
    <section className={styles.page}>
      {/* 🎯 Контейнер для центрирования */}
      {/* <div className={styles.container}> */}
      {/* 🎯 ЗАГОЛОВОК СТРАНИЦЫ */}
      <Title children="Our friends" />

      {/* 🎯 СОСТОЯНИЕ ЗАГРУЗКИ */}
      {loading && (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading our partners...</p>
        </div>
      )}

      {/* 🎯 СОСТОЯНИЕ ОШИБКИ */}
      {error && !loading && (
        <div className={styles.error}>
          <p>{error}</p>
          <button
            className={styles.retryButton}
            onClick={handleRetry}
            type="button"
          >
            Try again
          </button>
        </div>
      )}

      {/* 🎯 УСПЕШНАЯ ЗАГРУЗКА */}
      {!loading && !error && (
        <>
          {/* 🎯 ИНФОРМАЦИЯ О КОЛИЧЕСТВЕ */}
          {/* <div className={styles.info}>
              <p className={styles.count}>
                We cooperate with <strong>{friends.length}</strong>{' '}
                organizations
              </p>
            </div> */}

          {/* 🎯 КОМПОНЕНТ СПИСКА ПАРТНЕРОВ */}
          <FriendsList friends={friends} />
        </>
      )}

      {/* 🎯 ПУСТОЕ СОСТОЯНИЕ (когда нет ошибок и загрузки, но массив пуст) */}
      {!loading && !error && friends.length === 0 && (
        <div className={styles.empty}>
          <p>No partners found at the moment</p>
          <p className={styles.emptySubtext}>
            Please check back later or contact us to become a partner
          </p>
        </div>
      )}
      {/* </div> */}
    </section>
  );
};

export default FriendsPage;
