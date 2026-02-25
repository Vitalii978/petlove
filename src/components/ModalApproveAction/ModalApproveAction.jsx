// src/components/ModalApproveAction/ModalApproveAction.jsx
// 🎯 МОДАЛЬНОЕ ОКНО ПОДТВЕРЖДЕНИЯ ВЫХОДА
// 🔧 ИСПРАВЛЕНО: без react-modal, с кастомной модалкой

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ModalApproveAction.module.css';
import sprite from '../../assets/icon/icon-sprite.svg';
import authApi from '../../services/authApi';

const ModalApproveAction = ({
  isOpen,
  onClose,
  title = 'Already leaving?',
  confirmText = 'Yes',
  cancelText = 'Cancel',
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 🎯 Закрытие по Escape
  useEffect(() => {
    const handleEscape = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // 🎯 РЕАЛЬНЫЙ ВЫХОД ЧЕРЕЗ API
  const handleLogout = async () => {
    try {
      setLoading(true);
      setError('');

      console.log('🔄 Выполняем logout...');

      // 🔥 РЕАЛЬНЫЙ ЗАПРОС К API
      await authApi.logout();

      console.log('✅ Logout успешен');

      // Очищаем localStorage
      localStorage.removeItem('token');

      // Закрываем модалку
      onClose();

      // Перенаправляем на главную
      navigate('/');

      // Перезагружаем страницу для обновления состояния
      window.location.reload();
    } catch (error) {
      console.error('❌ Ошибка при logout:', error);

      setError(error.response?.data?.message || 'Failed to logout');

      // Даже если сервер вернул ошибку, всё равно выходим на клиенте
      localStorage.removeItem('token');
      onClose();
      navigate('/');
      window.location.reload();
    } finally {
      setLoading(false);
    }
  };

  // 🎯 Закрытие по клику на оверлей
  const handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={styles.modal}>
        {/* 🎯 Кнопка закрытия */}
        <button
          onClick={onClose}
          className={styles.closeButton}
          disabled={loading}
          aria-label="Close modal"
        >
          <svg className={styles.closeIcon} width={24} height={24}>
            <use href={`${sprite}#icon-close`} />
          </svg>
        </button>

        {/* 🎯 Контент модалки */}
        <div className={styles.modalApproveAction}>
          {/* 🎯 Картинка */}
          <div className={styles.imageWrapper}>
            <img src="/🐈.png" alt="cat" className={styles.catImage} />
          </div>

          {/* 🎯 Заголовок */}
          <h2 className={styles.title} id="modal-title">
            {title}
          </h2>

          {/* 🎯 Ошибка (если есть) */}
          {error && <p className={styles.error}>{error}</p>}

          {/* 🎯 Кнопки */}
          <div className={styles.buttonsWrapper}>
            <button
              type="button"
              onClick={handleLogout}
              className={styles.confirmButton}
              disabled={loading}
            >
              {loading ? 'Loading...' : confirmText}
            </button>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
              disabled={loading}
            >
              {cancelText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalApproveAction;
