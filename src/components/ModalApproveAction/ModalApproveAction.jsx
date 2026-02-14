// 📁 src/components/ModalApproveAction/ModalApproveAction.jsx
// 🎯 ТЗ: Модальне вікно підтвердження дії
// 🎯 ТЗ: Закривається по clickу на кнопку Cancel, clickу на кнопку закриття, click по backdrop, press по Escape

import { useEffect } from 'react';
import styles from './ModalApproveAction.module.css';
import sprite from '../../assets/icon/icon-sprite.svg';

const ModalApproveAction = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message = 'Do you really want to log out?',
  confirmText = 'Yes',
  cancelText = 'Cancel',
}) => {
  // 🎯 ТЗ: press по Escape закриває модальне вікно
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      // Блокуємо скрол сторінки
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      // Відновлюємо скрол сторінки
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // 🎯 ТЗ: click по backdrop закриває модальне вікно
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  // 🎯 ТЗ: обробник підтвердження
  const handleConfirm = () => {
    onConfirm();
    onClose(); // 🎯 Закриваємо модалку після підтвердження
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
        {/* 🎯 ТЗ: кнопка закриття (крестик) */}
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close modal"
          type="button"
        >
          <svg className={styles.closeIcon} aria-hidden="true">
            <use href={`${sprite}#icon-close`} />
          </svg>
        </button>

        {/* 🎯 КОНТЕНТ МОДАЛКИ */}
        <div className={styles.content}>
          {/* 🎯 ТЗ: заголовок модального вікна */}
          <h3 id="modal-title" className={styles.title}>
            {title}
          </h3>

          {/* 🎯 ТЗ: повідомлення */}
          <p className={styles.message}>{message}</p>

          {/* 🎯 ТЗ: 2 функціональні кнопки */}
          <div className={styles.buttons}>
            <button
              className={styles.cancelButton}
              onClick={onClose}
              type="button"
            >
              {cancelText}
            </button>
            <button
              className={styles.confirmButton}
              onClick={handleConfirm}
              type="button"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalApproveAction;