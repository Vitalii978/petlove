// src/components/UserCard/EditUserBtn/EditUserBtn.jsx
import { useState } from 'react';
import sprite from '../../../assets/icon/icon-sprite.svg';
import ModalEditUser from '../../ModalEditUser/ModalEditUser';
import styles from './EditUserBtn.module.css';

const EditUserBtn = ({ user, onUpdate }) => {
  const [showModal, setShowModal] = useState(false);

  const handleEditClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleSave = async updatedData => {
    try {
      console.log('🔄 Сохраняем обновленные данные:', updatedData);

      // 🎯 ЗДЕСЬ БУДЕТ ЗАПРОС К API ДЛЯ ОБНОВЛЕНИЯ
      // const response = await api.patch('/users/current', updatedData);

      // Пока имитируем успешное обновление
      const mockResponse = {
        success: true,
        data: { ...user, ...updatedData },
      };

      if (mockResponse.success) {
        // Обновляем данные в родительском компоненте
        if (onUpdate) {
          onUpdate(mockResponse.data);
        }
        console.log('✅ Профиль обновлен');
      }

      setShowModal(false);
    } catch (error) {
      console.error('❌ Ошибка при обновлении пользователя:', error);
      // Здесь будет обработка ошибок
    }
  };

  return (
    <>
      <button
        className={styles.editButton}
        onClick={handleEditClick}
        type="button"
        aria-label="Edit profile information"
      >
        <svg className={styles.editIcon}>
          <use href={`${sprite}#icon-edit`} />
        </svg>
        Edit Profile
      </button>

      {showModal && (
        <ModalEditUser
          user={user}
          onSave={handleSave}
          onClose={handleModalClose}
        />
      )}
    </>
  );
};

export default EditUserBtn;
