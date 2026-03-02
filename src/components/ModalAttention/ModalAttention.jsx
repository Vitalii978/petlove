import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import sprite from '../../assets/icon/icon-sprite.svg';
import styles from './ModalAttention.module.css';

const ModalAttention = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = e => {
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

  if (!isOpen) return null;
  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <button
          className={styles.buttonClose}
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg className={styles.icon} width={24} height={24}>
            <use href={`${sprite}#icon-close`} />
          </svg>
        </button>

        <div className={styles.boxImg}>
          <img src="/🐶.png" alt="" width={44} height={44} />
        </div>
        <h3 className={styles.title}>Attention</h3>

        <p className={styles.message}>
          We would like to remind you that certain functionality is available
          only to authorized users.If you have an account, please log in with
          your credentials. If you do not already have an account, you must
          register to access these features
        </p>

        <div className={styles.boxLink}>
          <NavLink to="/login" className={styles.linkLogin} onClick={onClose}>
            Log In
          </NavLink>
          <NavLink
            to="/register"
            className={styles.linkRegister}
            onClick={onClose}
          >
            Registration
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ModalAttention;
