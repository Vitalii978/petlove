import { useEffect } from 'react';
import styles from './ModalApproveAction.module.css';
import sprite from '../../assets/icon/icon-sprite.svg';

const ModalApproveAction = ({ isOpen, onClose, onConfirm, title = "Are you sure?", message = "Do you really want to log out?" }) => {
  // 🎯 Закрытие по Escape
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
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

  // 🎯 Закрытие по клику на overlay
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        {/* 🎯 Кнопка закрытия */}
        <button className={styles.closeButton} onClick={onClose}>
          <svg className={styles.closeIcon}>
            <use href={`${sprite}#icon-close`} />
          </svg>
        </button>

        {/* 🎯 Содержимое модалки */}
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.message}>{message}</p>
          
          {/* 🎯 Кнопки действий */}
          <div className={styles.buttons}>
            <button 
              className={styles.cancelButton}
              onClick={onClose}
              type="button"
            >
              Cancel
            </button>
            <button 
              className={styles.confirmButton}
              onClick={() => {
                onConfirm();
                onClose();
              }}
              type="button"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalApproveAction;