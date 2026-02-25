// // src/components/UserCard/EditUserBtn/EditUserBtn.jsx
// // 🎯 КНОПКА РЕДАКТИРОВАНИЯ ПРОФИЛЯ
// // 🔧 ИСПРАВЛЕНО: реальная работа с бэкендом

// import { useState } from 'react';
// import sprite from '../../../assets/icon/icon-sprite.svg';
// import ModalEditUser from '../../ModalEditUser/ModalEditUser';
// import api from '../../../services/api'; // 👈 ИМПОРТИРУЕМ API
// import styles from './EditUserBtn.module.css';

// const EditUserBtn = ({ user, onUpdate }) => {
//   const [showModal, setShowModal] = useState(false);

//   const handleEditClick = () => {
//     setShowModal(true);
//   };

//   const handleModalClose = () => {
//     setShowModal(false);
//   };

//   // 🎯 РЕАЛЬНЫЙ ЗАПРОС НА БЭКЕНД
//   const handleSave = async updatedData => {
//     try {
//       console.log('🔄 Отправляем запрос на обновление:', updatedData);

//       // 🔥 РЕАЛЬНЫЙ ЗАПРОС К API
//       const response = await api.patch('/users/current', updatedData);

//       console.log('✅ Ответ от сервера:', response.data);

//       // Обновляем данные в родительском компоненте
//       if (onUpdate) {
//         onUpdate(response.data);
//       }

//       setShowModal(false);
//     } catch (error) {
//       console.error('❌ Ошибка при обновлении пользователя:', error);

//       // Показываем уведомление об ошибке
//       alert(error.response?.data?.message || 'Failed to update profile');
//     }
//   };

//   return (
//     <>
//       <ul className={styles.editUserBtn}>
//         <li className={styles.nameIconWrapper}>
//           <p className={styles.userName}>{user.name || 'User'}</p>
//           <svg className={styles.userIcon}>
//             <use href={`${sprite}#icon-user-white`} />
//           </svg>
//         </li>
//         <li>
//           <button
//             className={styles.editButton}
//             onClick={handleEditClick}
//             type="button"
//             aria-label="Edit profile information"
//           >
//             <svg width={18} height={18}>
//               <use href={`${sprite}#icon-pencil`} />
//             </svg>
//           </button>
//         </li>
//       </ul>

//       {showModal && (
//         <ModalEditUser
//           user={user}
//           onSave={handleSave}
//           onClose={handleModalClose}
//         />
//       )}
//     </>
//   );
// };

// export default EditUserBtn;

// src/components/UserCard/EditUserBtn/EditUserBtn.jsx
// 🎯 КНОПКА РЕДАКТИРОВАНИЯ ПРОФИЛЯ
// 🔧 ИСПРАВЛЕНО: удален лишний запрос к API

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
          onSave={onUpdate} // ✅ onUpdate вызывается из модалки после успеха
          onClose={handleModalClose}
        />
      )}
    </>
  );
};

export default EditUserBtn;
