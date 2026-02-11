// src/components/UserCard/UserCard.jsx

// 🎯 ИМПОРТЫ
import { useState } from 'react';
import EditUserBtn from './EditUserBtn/EditUserBtn';
import UserBlock from './UserBlock/UserBlock';
import PetsBlock from './PetsBlock/PetsBlock';
import LogOutBtn from '../LogOutBtn/LogOutBtn';
import ModalApproveAction from '../ModalApproveAction/ModalApproveAction';
import styles from './UserCard.module.css';

// 🎯 КОМПОНЕНТ USERCARD: Объединяет все компоненты профиля
// Props:
// - userData: данные пользователя
// - onUserUpdate: функция при обновлении данных
// - onAddPet: функция при добавлении питомца
// - onLogout: функция выхода
const UserCard = ({ userData, onUserUpdate, onAddPet, onLogout }) => {
  // 🎯 СОСТОЯНИЯ
  const [user, setUser] = useState(userData);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // 🎯 ОБРАБОТЧИК ОБНОВЛЕНИЯ ПОЛЬЗОВАТЕЛЯ
  const handleUserUpdate = (updatedUser) => {
    setUser(updatedUser);
    if (onUserUpdate) {
      onUserUpdate(updatedUser);
    }
  };

  // 🎯 ОБРАБОТЧИК ДОБАВЛЕНИЯ ПИТОМЦА
  const handleAddPet = () => {
    if (onAddPet) {
      onAddPet();
    }
  };

  // 🎯 ОБРАБОТЧИКИ ВЫХОДА
  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    if (onLogout) {
      onLogout();
    }
    setShowLogoutModal(false);
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  // 🎯 РЕНДЕР КОМПОНЕНТА
  return (
    <article className={styles.userCard}>
      
      {/* 🎯 ЗАГОЛОВОК КАРТОЧКИ С КНОПКОЙ РЕДАКТИРОВАНИЯ */}
      <header className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>My Profile</h2>
        <EditUserBtn 
          user={user} 
          onUpdate={handleUserUpdate} 
        />
      </header>

      {/* 🎯 ОСНОВНОЕ СОДЕРЖИМОЕ */}
      <div className={styles.cardContent}>
        
        {/* 🎯 БЛОК ИНФОРМАЦИИ О ПОЛЬЗОВАТЕЛЕ */}
        <UserBlock user={user} />
        
        {/* 🎯 БЛОК С ПИТОМЦАМИ */}
        <PetsBlock 
          pets={user.pets || []} 
          onAddPet={handleAddPet}
        />
        
      </div>

      {/* 🎯 ФУТЕР С КНОПКОЙ ВЫХОДА */}
      <footer className={styles.cardFooter}>
        <LogOutBtn onLogout={handleLogoutClick} />
      </footer>

      {/* 🎯 МОДАЛЬНОЕ ОКНО ПОДТВЕРЖДЕНИЯ ВЫХОДА */}
      {showLogoutModal && (
        <ModalApproveAction
          title="Log Out"
          message="Are you sure you want to log out?"
          confirmText="Yes, Log Out"
          cancelText="Cancel"
          onConfirm={handleLogoutConfirm}
          onCancel={handleLogoutCancel}
          onClose={handleLogoutCancel}
        />
      )}
    </article>
  );
};

export default UserCard;