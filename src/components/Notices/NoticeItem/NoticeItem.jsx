// src/components/Notices/NoticeItem/NoticeItem.jsx
// 🎯 ИСПРАВЛЕНО: сердечко меняется на корзину при добавлении в избранное

import { useState } from 'react';
import sprite from '../../../assets/icon/icon-sprite.svg';
import styles from './NoticeItem.module.css';

const NoticesItem = ({ 
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
  onOpenModal,
  boxFavorite,
  onDelete,
  isFavorite = false,     // 👈 ВАЖНО: новый пропс - true/false
  onToggleFavorite        // 👈 ВАЖНО: функция для переключения
}) => {
  
  const [isHeartAnimating, setIsHeartAnimating] = useState(false);
  
  if (!id) {
    console.warn('⚠️ NoticesItem: нет id');
    return null;
  }
  
  // 🎯 ОБРАБОТЧИК КЛИКА НА СЕРДЕЧКО/КОРЗИНУ
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    setIsHeartAnimating(true);
    setTimeout(() => setIsHeartAnimating(false), 300);
    
    if (onToggleFavorite) {
      // ✅ Вызываем функцию переключения избранного
      console.log(`🔁 Переключаем избранное для ID: ${id}, текущее состояние: ${isFavorite}`);
      onToggleFavorite(id);
    } else if (onDelete) {
      // Если есть onDelete - значит это страница профиля (удаление)
      console.log(`🗑️ Удаляем из избранного, ID: ${id}`);
      onDelete(id);
    } else if (onOpenModal) {
      // Если нет ни того, ни другого - открываем модалку
      console.log(`🔍 Открываем модалку для ID: ${id}`);
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
        popularity
      });
    }
  };
  
  const handleLearnMoreClick = (e) => {
    e.preventDefault();
    if (onOpenModal) {
      console.log(`🔍 Открываем модалку для ID: ${id}`);
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
        popularity
      });
    }
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).replace(/\//g, '.');
    } catch {
      return dateString;
    }
  };
  
  const safeImgURL = imgURL || 'https://placehold.co/400x280/cccccc/666666?text=Pet+Photo';
  const safeTitle = title || 'No title';
  const safeName = name || 'No name';
  const safeGender = gender || 'unknown';
  const safeSpecies = species || 'unknown';
  const safeCategory = category || 'unknown';
  const safePopularity = popularity || 0;
  
  return (
    <article className={styles.noticeItem}>
      
      <div className={styles.imageContainer}>
        <img 
          src={safeImgURL}
          alt={safeTitle}
          className={styles.image}
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://placehold.co/400x280/cccccc/666666?text=No+Image';
          }}
        />
      </div>
      
      <div className={styles.content}>
        
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{safeTitle}</h3>
          <div className={styles.rating}>
            <svg className={styles.starIcon}>
              <use href={`${sprite}#icon-star`} />
            </svg>
            <span className={styles.ratingValue}>{safePopularity}</span>
          </div>
        </div>
        
        <div className={styles.infoTable}>
          
          <ul className={styles.fieldNames}>
            <li className={styles.fieldName}>Name</li>
            <li className={styles.fieldName}>Birthday</li>
            <li className={styles.fieldName}>Gender</li>
            <li className={styles.fieldName}>Species</li>
            <li className={styles.fieldName}>Category</li>
          </ul>
          
          <ul className={styles.fieldValues}>
            <li className={styles.fieldValue}>{safeName}</li>
            <li className={styles.fieldValue}>{formatDate(birthday)}</li>
            <li className={styles.fieldValue}>
              {safeGender === 'male' ? 'Male' : 
               safeGender === 'female' ? 'Female' : 'Unknown'}
            </li>
            <li className={styles.fieldValue}>
              {safeSpecies ? safeSpecies.charAt(0).toUpperCase() + safeSpecies.slice(1) : 'Unknown'}
            </li>
            <li className={styles.fieldValue}>
              {safeCategory.charAt(0).toUpperCase() + safeCategory.slice(1)}
            </li>
          </ul>
          
        </div>
        
        <div className={styles.description}>
          {comment || 'No description available'}
        </div>
        
        <div className={styles.pricePlain}>
          {price && safeCategory === 'sell' ? (
            <span className={styles.priceText}>${price}</span>
          ) : (
            <span className={styles.noPriceText}>No price</span>
          )}
        </div>
        
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
              className={`${styles.heartCircle} ${isHeartAnimating ? styles.heartBeat : ''}`}
              onClick={handleFavoriteClick}
              type="button"
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <svg className={styles.heartIcon}>
                {isFavorite ? (
                  // ✅ Если в избранном - показываем корзину
                  <use href={`${sprite}#icon-basket`} />
                ) : (
                  // ✅ Если не в избранном - показываем сердечко
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



