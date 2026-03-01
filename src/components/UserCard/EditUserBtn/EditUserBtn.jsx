// src/components/UserCard/EditUserBtn/EditUserBtn.jsx
// 🎯 КНОПКА РЕДАКТИРОВАНИЯ ПРОФИЛЯ
// 🔧 ИСПРАВЛЕНО: удален лишний запрос к API

import { useState } from 'react';
import sprite from '../../../assets/icon/icon-sprite.svg';
import ModalEditUser from '../../ModalEditUser/ModalEditUser';
import styles from './EditUserBtn.module.css';
import toast from 'react-hot-toast'; // 👈 ДОДАНО

const EditUserBtn = ({ user, onUpdate }) => {
  const [showModal, setShowModal] = useState(false);

  const handleEditClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  // 🎯 ОБГОРТКА для onUpdate з toast сповіщенням
  const handleUpdate = updatedUser => {
    // Викликаємо оригінальний onUpdate
    onUpdate(updatedUser);

    // Показуємо сповіщення про успішне оновлення
    toast.success('✅ Profile updated successfully', {
      duration: 3000,
    });
  };

  // 🎯 ВСЯ ЛОГИКА СОХРАНЕНИЯ В ModalEditUser
  // Здесь не нужно никаких запросов!

  return (
    <>
      <ul className={styles.editUserBtn}>
        <li className={styles.nameIconWrapper}>
          <p className={styles.userName}>{user.name || 'User'}</p>
          <svg className={styles.userIcon}>
            <use href={`${sprite}#icon-user-white`} />
          </svg>
        </li>
        <li>
          <button
            className={styles.editButton}
            onClick={handleEditClick}
            type="button"
            aria-label="Edit profile information"
          >
            <svg width={18} height={18}>
              <use href={`${sprite}#icon-pencil`} />
            </svg>
          </button>
        </li>
      </ul>

      {showModal && (
        <ModalEditUser
          user={user}
          // onSave={onUpdate} // ✅ onUpdate вызывается из модалки после успеха
          onSave={handleUpdate} // 👈 Використовуємо обгортку
          onClose={handleModalClose}
        />
      )}
    </>
  );
};

export default EditUserBtn;
