// src/components/ModalNotice/ModalNotice.jsx
// 🎯 ИСПРАВЛЕНО: добавлена кнопка Contact рядом с Add/Delete

import React, { useEffect } from 'react';
import sprite from '../../assets/icon/icon-sprite.svg';
import styles from './ModalNotice.module.css';

const ModalNotice = ({ 
  isOpen, 
  onClose, 
  notice,
  onAdd,
  onRemove,
  isFavorite = false
}) => {
  
  // 🎯 Закрытие по Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !notice) return null;

  // 🎯 Форматирование даты
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

  // 🎯 Закрытие по клику на оверлей
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // 🎯 Пол иконка
  const getGenderIcon = () => {
    switch (notice.sex) {
      case 'female':
        return '#icon-femali-white';
      case 'male':
        return '#icon-male-blue';
      default:
        return '#icon-femali-male-yellow';
    }
  };

  // 🎯 Пол текст
  const getGenderText = () => {
    switch (notice.sex) {
      case 'female':
        return 'Female';
      case 'male':
        return 'Male';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        
        {/* 🎯 КНОПКА ЗАКРЫТИЯ */}
        <button 
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* 🎯 КОНТЕНТ МОДАЛЬНОГО ОКНА */}
        <div className={styles.content}>
          
          {/* 🎯 КРУГЛОЕ ФОТО ВВЕРХУ ПОСЕРЕДИНЕ */}
          <div className={styles.imageWrapper}>
            <div className={styles.imageContainer}>
              <img 
                src={notice.imgURL || 'https://placehold.co/200x200/cccccc/666666?text=Pet+Photo'}
                alt={notice.title}
                className={styles.image}
                onError={(e) => {
                  e.target.src = 'https://placehold.co/200x200/cccccc/666666?text=No+Image';
                }}
              />
            </div>
          </div>

          {/* 🎯 ИНФОРМАЦИЯ */}
          <div className={styles.info}>
            
            {/* 🎯 ИМЯ ЖИВОТНОГО */}
            <h2 className={styles.petName}>{notice.name || 'Unnamed'}</h2>
            
            {/* 🎯 РЕЙТИНГ (ПОПУЛЯРНОСТЬ) */}
            <div className={styles.rating}>
              <svg className={styles.star} width="20" height="20">
                <use href={`${sprite}#icon-star`} />
              </svg>
              <span className={styles.ratingValue}>{notice.popularity || 0}</span>
            </div>

            {/* 🎯 ХАРАКТЕРИСТИКИ - ТОЛЬКО 4 ПОЛЯ КАК В ФИГМЕ */}
            <div className={styles.characteristics}>
              
              {/* Name */}
              <div className={styles.characteristic}>
                <span className={styles.label}>Name</span>
                <span className={styles.value}>{notice.name || 'Not specified'}</span>
              </div>

              {/* Birthday */}
              <div className={styles.characteristic}>
                <span className={styles.label}>Birthday</span>
                <span className={styles.value}>{formatDate(notice.birthday)}</span>
              </div>

              {/* Gender */}
              <div className={styles.characteristic}>
                <span className={styles.label}>Gender</span>
                <span className={styles.value}>
                  <svg className={styles.genderIcon}>
                    <use href={`${sprite}${getGenderIcon()}`} />
                  </svg>
                  {getGenderText()}
                </span>
              </div>

              {/* Species */}
              <div className={styles.characteristic}>
                <span className={styles.label}>Species</span>
                <span className={styles.value}>
                  {notice.species ? 
                    notice.species.charAt(0).toUpperCase() + notice.species.slice(1) 
                    : 'Unknown'}
                </span>
              </div>
            </div>

            {/* 🎯 КОММЕНТАРИЙ */}
            <p className={styles.comment}>
              {notice.comment || 'No comments'}
            </p>

            {/* 🎯 ЦЕНА ИЛИ "No price" */}
            {notice.category === 'sell' && notice.price ? (
              <div className={styles.price}>${notice.price}</div>
            ) : (
              <div className={styles.noPrice}>No price</div>
            )}

            {/* 🎯 КНОПКИ В ДВЕ СТРОКИ */}
            <div className={styles.actions}>
              
              {/* ✅ Первая строка: Add/Delete кнопка */}
              <div className={styles.actionRow}>
                {isFavorite ? (
                  // Если в избранном - показываем Delete с корзиной
                  <button
                    className={`${styles.actionButton} ${styles.deleteButton}`}
                    onClick={() => onRemove(notice._id)}
                  >
                    <svg className={styles.buttonIcon}>
                      <use href={`${sprite}#icon-basket-white`} />
                    </svg>
                    Delete
                  </button>
                ) : (
                  // Если не в избранном - показываем Add to favorites с сердечком
                  <button
                    className={`${styles.actionButton} ${styles.addButton}`}
                    onClick={() => onAdd(notice._id)}
                  >
                    <svg className={styles.buttonIcon}>
                      <use href={`${sprite}#icon-heart`} />
                    </svg>
                    Add to 
                  </button>
                )}
              </div>
              
              {/* ✅ Вторая строка: Contact кнопка */}
              {notice.user &&  (
                  <a
                    href={`tel:${notice.user.phone}`}
                    className={`${styles.actionButton} ${styles.contactButton}`}
                  >
                    Contact
                  </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalNotice;