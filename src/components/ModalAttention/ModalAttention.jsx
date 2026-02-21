// src/components/ModalAttention/ModalAttention.jsx
// 🎯 МОДАЛЬНОЕ ОКНО ДЛЯ НЕАВТОРИЗОВАННЫХ ПОЛЬЗОВАТЕЛЕЙ
// ✅ ИСПРАВЛЕНО: правильные ссылки на /login и /register

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'; // 👈 Импортируем Link для навигации
import sprite from '../../assets/icon/icon-sprite.svg';
import styles from './ModalAttention.module.css';

const ModalAttention = ({ isOpen, onClose }) => {
  // 🎯 Закрытие по Escape
  useEffect(() => {
    const handleEscape = e => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // запрещаем скролл
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset'; // возвращаем скролл
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // 🎯 Закрытие по клику на оверлей
  const handleOverlayClick = e => {
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
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* 🎯 ИКОНКА ВНИМАНИЯ */}
        <div className={styles.iconWrapper}>
          <svg className={styles.attentionIcon}>
            <use href={`${sprite}#icon-attention`} />
          </svg>
        </div>

        {/* 🎯 ТЕКСТ СООБЩЕНИЯ */}
        <h2 className={styles.title}>Attention</h2>
        <p className={styles.message}>
          You need to log in or register to add pets to favorites.
        </p>

        {/* 🎯 КНОПКИ ДЕЙСТВИЙ */}
        <div className={styles.actions}>
          {/* 🔥 КНОПКА LOG IN - ведет на страницу логина */}
          <Link
            to="/login"
            className={styles.loginButton}
            onClick={onClose} // закрываем модалку при переходе
          >
            Log In
          </Link>

          {/* 🔥 КНОПКА REGISTRATION - ведет на страницу регистрации */}
          <Link
            to="/register"
            className={styles.registerButton}
            onClick={onClose} // закрываем модалку при переходе
          >
            Registration
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ModalAttention;
