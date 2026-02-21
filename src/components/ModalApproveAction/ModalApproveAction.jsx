// 📁 src/components/ModalApproveAction/ModalApproveAction.jsx
// 🎯 МОДАЛЬНЕ ВІКНО ПІДТВЕРДЖЕННЯ ДІЇ (ВИХІД, ВИДАЛЕННЯ)
// 🎯 ТЗ: Закривається по clickу на кнопку Cancel, clickу на кнопку закриття, click по backdrop, press по Escape

import { useEffect } from 'react';
import styles from './ModalApproveAction.module.css';
import sprite from '../../assets/icon/icon-sprite.svg';

const ModalApproveAction = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Already leaving?',
  confirmText = 'Yes',
  cancelText = 'Cancel',
}) => {
  // 🎯 ТЗ: press по Escape закриває модальне вікно
  useEffect(() => {
    const handleEscape = event => {
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
  const handleOverlayClick = event => {
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

        {/* 🎯 РОЗМІТКА ЯК У ПРИКЛАДІ */}
        <ul className={styles.modalApproveAction}>
          {/* 🎯 Картинка в кружечку */}
          <li className={styles.imageWrapper}>
            <img src="/🐈.png" alt="cat" className={styles.catImage} />
          </li>

          {/* 🎯 Заголовок */}
          <li>
            <h2 className={styles.title}>{title}</h2>
          </li>

          {/* 🎯 Кнопки */}
          <li className={styles.buttonsWrapper}>
            <button
              type="button"
              onClick={handleConfirm}
              className={styles.confirmButton}
            >
              {confirmText}
            </button>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
            >
              {cancelText}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ModalApproveAction;
