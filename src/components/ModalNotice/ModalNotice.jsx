// src/components/ModalNotice/ModalNotice.jsx

import React from 'react';
import sprite from '../../assets/icon/icon-sprite.svg';
import styles from './ModalNotice.module.css';

const ModalNotice = ({ 
  isOpen, 
  onClose, 
  notice,
  onAdd,
  onRemove 
}) => {
  
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

  // 🎯 Обработчик клика по кнопке
  const handleButtonClick = () => {
    if (notice.isFavorite) {
      onRemove(notice._id);
    } else {
      onAdd(notice._id);
    }
  };

  // 🎯 Закрытие по клику на оверлей
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
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
          
          {/* 🎯 ИЗОБРАЖЕНИЕ */}
          <div className={styles.imageContainer}>
            <img 
              src={notice.imgURL || 'https://placehold.co/400x280/cccccc/666666?text=Pet+Photo'}
              alt={notice.title}
              className={styles.image}
              onError={(e) => {
                e.target.src = 'https://placehold.co/400x280/cccccc/666666?text=No+Image';
              }}
            />
          </div>

          {/* 🎯 ИНФОРМАЦИЯ */}
          <div className={styles.info}>
            
            {/* ЗАГОЛОВОК И ПОПУЛЯРНОСТЬ */}
            <div className={styles.header}>
              <h2 className={styles.title}>{notice.title}</h2>
              <div className={styles.popularity}>
                <svg className={styles.star} width="16" height="16">
                  <use href={`${sprite}#icon-star`} />
                </svg>
                <span>{notice.popularity || 0}</span>
              </div>
            </div>

            {/* ТАБЛИЦА ХАРАКТЕРИСТИК */}
            <div className={styles.characteristics}>
              
              {/* ЛЕВЫЙ СТОЛБЕЦ - НАЗВАНИЯ */}
              <ul className={styles.labels}>
                <li>Name:</li>
                <li>Birthday:</li>
                <li>Gender:</li>
                <li>Species:</li>
                <li>Category:</li>
                {notice.category === 'sell' && <li>Price:</li>}
                <li>Comments:</li>
              </ul>

              {/* ПРАВЫЙ СТОЛБЕЦ - ЗНАЧЕНИЯ */}
              <ul className={styles.values}>
                <li>{notice.name || 'Not specified'}</li>
                <li>{formatDate(notice.birthday)}</li>
                <li>
                  {notice.sex === 'male' ? 'Male' : 
                   notice.sex === 'female' ? 'Female' : 'Unknown'}
                </li>
                <li>
                  {notice.species ? 
                    notice.species.charAt(0).toUpperCase() + notice.species.slice(1) 
                    : 'Unknown'}
                </li>
                <li>
                  {notice.category ? 
                    notice.category.charAt(0).toUpperCase() + notice.category.slice(1) 
                    : 'Unknown'}
                </li>
                {notice.category === 'sell' && (
                  <li className={styles.price}>
                    ${notice.price}
                  </li>
                )}
                <li className={styles.comment}>
                  {notice.comment || 'No comments'}
                </li>
              </ul>
            </div>

            {/* 🎯 КНОПКИ ДЕЙСТВИЙ */}
            <div className={styles.actions}>
              <button
                className={styles.mainButton}
                onClick={handleButtonClick}
              >
                {notice.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              </button>
              
              {/* Контактная информация пользователя */}
              {notice.user && (
                <a
                  href={`tel:${notice.user.phone}`}
                  className={styles.contactButton}
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