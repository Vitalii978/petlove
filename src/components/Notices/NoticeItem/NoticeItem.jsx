// src/components/Notices/NoticeItem/NoticeItem.jsx
// 🎯 КОМПОНЕНТ КАРТОЧКИ ОБЪЯВЛЕНИЯ
// ✅ ИСПРАВЛЕНО: блок информации теперь как в примере - один список

import { useState } from 'react';
import sprite from '../../../assets/icon/icon-sprite.svg';
import styles from './NoticeItem.module.css';

const NoticesItem = ({
  // 📌 ОСНОВНЫЕ ДАННЫЕ ОБЪЯВЛЕНИЯ
  id,
  imgURL,
  title,
  name,
  birthday,
  gender,
  species,
  category,
  comment,
  price,
  popularity,

  // 📌 ФУНКЦИИ И ФЛАГИ
  onOpenModal,
  boxFavorite,
  onDelete,
  isFavorite = false,
  onToggleFavorite,
  isDisabled = false,
}) => {
  // 🟢 ЛОКАЛЬНОЕ СОСТОЯНИЕ ДЛЯ АНИМАЦИИ
  const [isHeartAnimating, setIsHeartAnimating] = useState(false);

  if (!id) {
    console.warn('⚠️ NoticesItem: нет id');
    return null;
  }

  // =============== 🎯 ОБРАБОТЧИК КЛИКА НА СЕРДЕЧКО/КОРЗИНУ ===============
  const handleFavoriteClick = e => {
    e.stopPropagation();
    e.preventDefault();

    console.log(
      `🔘 Клик на кнопку для ID: ${id}, isDisabled: ${isDisabled}, isFavorite: ${isFavorite}`
    );

    if (isDisabled) {
      console.log('⏳ Кнопка заблокирована, пропускаем');
      return;
    }

    setIsHeartAnimating(true);
    setTimeout(() => setIsHeartAnimating(false), 300);

    if (onDelete) {
      console.log(`  → Вызываем onDelete с ID: ${id}`);
      onDelete(id);
    } else if (onToggleFavorite) {
      console.log(`  → Вызываем onToggleFavorite с ID: ${id}`);
      onToggleFavorite(id);
    } else if (onOpenModal) {
      console.log(`  → Вызываем onOpenModal с ID: ${id}`);
      onOpenModal({
        _id: id,
        imgURL,
        title,
        name,
        birthday,
        sex: gender,
        species,
        category,
        comment,
        price,
        popularity,
      });
    }
  };

  // =============== 🎯 ОБРАБОТЧИК КЛИКА НА LEARN MORE ===============
  const handleLearnMoreClick = e => {
    e.preventDefault();
    console.log(`🔍 Клик на Learn more для ID: ${id}`);

    if (onOpenModal) {
      onOpenModal({
        _id: id,
        imgURL,
        title,
        name,
        birthday,
        sex: gender,
        species,
        category,
        comment,
        price,
        popularity,
      });
    }
  };

  // =============== 🎯 ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ===============
  const formatDate = dateString => {
    if (!dateString) return 'Not specified';
    try {
      const date = new Date(dateString);
      // 🔥 Форматируем как в примере: DD.MM.YYYY
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    } catch {
      return dateString;
    }
  };

  // Значения по умолчанию
  const safeImgURL =
    imgURL || 'https://placehold.co/400x280/cccccc/666666?text=Pet+Photo';
  const safeTitle = title || 'No title';
  const safeName = name || 'No name';
  const safeGender = gender || 'unknown';
  const safeSpecies = species || 'unknown';
  const safeCategory = category || 'unknown';
  const safePopularity = popularity || 0;

  // =============== 🎯 РЕНДЕР КОМПОНЕНТА ===============
  return (
    <article className={styles.noticeItem}>
      {/* БЛОК С ФОТОГРАФИЕЙ */}
      <div className={styles.imageContainer}>
        <img
          src={safeImgURL}
          alt={safeTitle}
          className={styles.image}
          loading="lazy"
          onError={e => {
            e.target.src =
              'https://placehold.co/400x280/cccccc/666666?text=No+Image';
          }}
        />
      </div>

      {/* БЛОК С ИНФОРМАЦИЕЙ */}
      <div className={styles.content}>
        {/* ВЕРХНЯЯ СТРОКА: Заголовок и рейтинг */}
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{safeTitle}</h3>
          <div className={styles.rating}>
            <svg className={styles.starIcon}>
              <use href={`${sprite}#icon-star`} />
            </svg>
            <span className={styles.ratingValue}>{safePopularity}</span>
          </div>
        </div>

        {/* 🔥 ИСПРАВЛЕНО: ТЕПЕРЬ ЭТО ОДИН СПИСОК КАК В ПРИМЕРЕ */}
        <ul className={styles.infoList}>
          {/* Name */}
          <li>
            <p className={styles.fieldLabel}>Name</p>
            <p className={styles.fieldValue}>{safeName}</p>
          </li>

          {/* Birthday */}
          <li>
            <p className={styles.fieldLabel}>Birthday</p>
            {birthday ? (
              <p className={styles.fieldValue}>{formatDate(birthday)}</p>
            ) : (
              <p className={styles.fieldValue}>Not specified</p>
            )}
          </li>

          {/* Gender */}
          <li>
            <p className={styles.fieldLabel}>Gender</p>
            <p className={styles.fieldValue}>
              {safeGender === 'male'
                ? 'Male'
                : safeGender === 'female'
                  ? 'Female'
                  : 'Unknown'}
            </p>
          </li>

          {/* Species */}
          <li>
            <p className={styles.fieldLabel}>Species</p>
            <p className={styles.fieldValue}>
              {safeSpecies
                ? safeSpecies.charAt(0).toUpperCase() + safeSpecies.slice(1)
                : 'Unknown'}
            </p>
          </li>

          {/* Category */}
          <li>
            <p className={styles.fieldLabel}>Category</p>
            <p className={styles.fieldValue}>
              {safeCategory.charAt(0).toUpperCase() + safeCategory.slice(1)}
            </p>
          </li>
        </ul>

        {/* ОПИСАНИЕ */}
        <p className={styles.description}>
          {comment || 'No description available'}
        </p>

        {/* ЦЕНА */}
        <div className={styles.pricePlain}>
          {price && safeCategory === 'sell' ? (
            <span className={styles.priceText}>${price}</span>
          ) : (
            <span className={styles.noPriceText}>No price</span>
          )}
        </div>

        {/* КНОПКИ */}
        <div className={styles.buttonsRow}>
          <button
            className={styles.learnMoreButton}
            onClick={handleLearnMoreClick}
            type="button"
          >
            Learn more
          </button>

          {boxFavorite && (
            <button
              className={`${styles.heartCircle} 
                ${isHeartAnimating ? styles.heartBeat : ''} 
                ${isDisabled ? styles.disabled : ''}`}
              onClick={handleFavoriteClick}
              type="button"
              disabled={isDisabled}
              aria-label={
                isFavorite ? 'Remove from favorites' : 'Add to favorites'
              }
            >
              <svg className={styles.heartIcon}>
                {isFavorite ? (
                  <use href={`${sprite}#icon-basket`} />
                ) : (
                  <use href={`${sprite}#icon-heart`} />
                )}
              </svg>
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default NoticesItem;
