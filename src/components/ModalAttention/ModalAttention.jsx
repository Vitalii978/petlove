// src/components/ModalAttention/ModalAttention.jsx

import React from 'react';
import styles from './ModalAttention.module.css';

const ModalAttention = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2 className={styles.title}>Attention</h2>
        <p className={styles.message}>
          You need to be logged in to add pets to favorites.
        </p>
        <div className={styles.buttons}>
          <a href="/login" className={styles.loginButton}>Log In</a>
          <a href="/register" className={styles.registerButton}>Register</a>
        </div>
      </div>
    </div>
  );
};

export default ModalAttention;