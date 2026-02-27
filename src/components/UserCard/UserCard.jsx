// // src/components/UserCard/UserCard.jsx
// // 🎯 КАРТОЧКА ПОЛЬЗОВАТЕЛЯ
// // 🔧 ИСПРАВЛЕНО: передача onLogout в ModalApproveAction

// import { useState } from 'react';
// import EditUserBtn from './EditUserBtn/EditUserBtn';
// import UserBlock from './UserBlock/UserBlock';
// import PetsBlock from './PetsBlock/PetsBlock';
// import LogOutBtn from '../LogOutBtn/LogOutBtn';
// import ModalApproveAction from '../ModalApproveAction/ModalApproveAction';
// import styles from './UserCard.module.css';

// const UserCard = ({ userData, onUserUpdate, onAddPet, onLogout }) => {
//   const [user, setUser] = useState(userData);
//   const [showLogoutModal, setShowLogoutModal] = useState(false);

//   const handleUserUpdate = updatedUser => {
//     setUser(updatedUser);
//     if (onUserUpdate) {
//       onUserUpdate(updatedUser);
//     }
//   };

//   const handleAddPet = () => {
//     if (onAddPet) {
//       onAddPet();
//     }
//   };

//   const handleLogoutClick = () => {
//     setShowLogoutModal(true);
//   };

//   const handleLogoutConfirm = () => {
//     if (onLogout) {
//       onLogout();
//     }
//     setShowLogoutModal(false);
//   };

//   const handleLogoutCancel = () => {
//     setShowLogoutModal(false);
//   };

//   return (
//     <ul className={styles.userCard}>
//       {/* 🎯 Модалка подтверждения выхода */}
//       <ModalApproveAction
//         isOpen={showLogoutModal}
//         onClose={handleLogoutCancel}
//         onConfirm={handleLogoutConfirm}
//         title="Already leaving?"
//         confirmText="Yes"
//         cancelText="Cancel"
//       />

//       <li className={styles.userCardItem}>
//         <EditUserBtn user={user} onUpdate={handleUserUpdate} />
//         <UserBlock user={user} onUpdate={handleUserUpdate} />
//       </li>

//       <li className={styles.userCardItem}>
//         <PetsBlock pets={user?.pets || []} onAddPet={handleAddPet} />
//       </li>

//       <li className={styles.userCardItem}>
//         <LogOutBtn onLogout={handleLogoutClick} outsideTheHeader={true} />
//       </li>
//     </ul>
//   );
// };

// export default UserCard;

// // src/components/UserCard/UserCard.jsx
// // 🎯 КАРТОЧКА ПОЛЬЗОВАТЕЛЯ
// // ✅ РАЗМЕТКА И СТИЛИ КАК В ПРИМЕРЕ, ЛОГИКА НАША

// import { useState } from 'react';
// import EditUserBtn from './EditUserBtn/EditUserBtn';
// import UserBlock from './UserBlock/UserBlock';
// import PetsBlock from './PetsBlock/PetsBlock';
// import LogOutBtn from '../LogOutBtn/LogOutBtn';
// import ModalApproveAction from '../ModalApproveAction/ModalApproveAction';
// import styles from './UserCard.module.css';

// const UserCard = ({ userData, onUserUpdate, onAddPet, onLogout }) => {
//   const [user, setUser] = useState(userData);
//   const [showLogoutModal, setShowLogoutModal] = useState(false);

//   const handleUserUpdate = updatedUser => {
//     setUser(updatedUser);
//     if (onUserUpdate) {
//       onUserUpdate(updatedUser);
//     }
//   };

//   const handleAddPet = () => {
//     if (onAddPet) {
//       onAddPet();
//     }
//   };

//   const handleLogoutClick = () => {
//     setShowLogoutModal(true);
//   };

//   const handleLogoutConfirm = () => {
//     if (onLogout) {
//       onLogout();
//     }
//     setShowLogoutModal(false);
//   };

//   const handleLogoutCancel = () => {
//     setShowLogoutModal(false);
//   };

//   return (
//     // 🎯 РАЗМЕТКА КАК В ПРИМЕРЕ: используем <ul>
//     <ul className={styles.userCard}>
//       {/* 🎯 Модалка подтверждения выхода - как в примере */}
//       <ModalApproveAction
//         isOpen={showLogoutModal}
//         onClose={handleLogoutCancel}
//         onConfirm={handleLogoutConfirm}
//         title="Already leaving?"
//         confirmText="Yes"
//         cancelText="Cancel"
//       />

//       {/* 🎯 ПЕРВЫЙ ЭЛЕМЕНТ СПИСКА: EditUserBtn + UserBlock */}
//       <li>
//         <EditUserBtn user={user} onUpdate={handleUserUpdate} />
//         <UserBlock user={user} onUpdate={handleUserUpdate} />
//       </li>

//       {/* 🎯 ВТОРОЙ ЭЛЕМЕНТ СПИСКА: PetsBlock */}
//       <li>
//         <PetsBlock pets={user?.pets || []} onAddPet={handleAddPet} />
//       </li>

//       {/* 🎯 ТРЕТИЙ ЭЛЕМЕНТ СПИСКА: LogOutBtn */}
//       <li>
//         <LogOutBtn onLogout={handleLogoutClick} outsideTheHeader={true} />
//       </li>
//     </ul>
//   );
// };

// export default UserCard;

// src/components/UserCard/UserCard.jsx
// ✅ ИСПРАВЛЕНО: убрана дублирующая модалка

import { useState } from 'react';
import EditUserBtn from './EditUserBtn/EditUserBtn';
import UserBlock from './UserBlock/UserBlock';
import PetsBlock from './PetsBlock/PetsBlock';
import LogOutBtn from '../LogOutBtn/LogOutBtn';
// 🚫 Убираем импорт ModalApproveAction
import styles from './UserCard.module.css';

const UserCard = ({ userData, onUserUpdate, onAddPet, onLogout }) => {
  const [user, setUser] = useState(userData);
  // 🚫 Убираем showLogoutModal

  const handleUserUpdate = updatedUser => {
    setUser(updatedUser);
    if (onUserUpdate) {
      onUserUpdate(updatedUser);
    }
  };

  const handleAddPet = () => {
    if (onAddPet) {
      onAddPet();
    }
  };

  // 🚫 Убираем handleLogoutClick, handleLogoutConfirm, handleLogoutCancel
  // Вся логика теперь в LogOutBtn

  return (
    <ul className={styles.userCard}>
      {/* 🚫 Убираем ModalApproveAction отсюда! */}

      <li>
        <EditUserBtn user={user} onUpdate={handleUserUpdate} />
        <UserBlock user={user} onUpdate={handleUserUpdate} />
      </li>

      <li>
        <PetsBlock pets={user?.pets || []} onAddPet={handleAddPet} />
      </li>

      <li>
        {/* ✅ LogOutBtn сам вызывает модалку */}
        <LogOutBtn onLogout={onLogout} outsideTheHeader={true} />
      </li>
    </ul>
  );
};

export default UserCard;
