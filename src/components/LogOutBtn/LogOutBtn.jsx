// // src/components/LogOutBtn/LogOutBtn.jsx
// // 🎯 КНОПКА ВЫХОДА
// // ✅ ИСПРАВЛЕНО: принимает isHomePage для стилей

// import { useState } from 'react';
// import clsx from 'clsx';
// import ModalApproveAction from '../ModalApproveAction/ModalApproveAction';
// import styles from './LogOutBtn.module.css';

// const LogOutBtn = ({ onLogout, outsideTheHeader, isHomePage,  }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleClick = () => {
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleConfirm = () => {
//     if (onLogout) {
//       onLogout();
//     }
//     setIsModalOpen(false);
//   };

//   return (
//     <>
//       <button
//         className={clsx(
//           styles.logoutButton,
//           outsideTheHeader && styles.outsideTheHeader,
//           // ✅ Добавляем класс в зависимости от страницы
//           isHomePage ? styles.logoutOnHome : styles.logoutOnOther
//         )}
//         type="button"
//         onClick={handleClick}
//         aria-label="Log out"
//       >
//         <span className={styles.logoutText}>Log Out</span>
//       </button>

//       <ModalApproveAction
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         onConfirm={handleConfirm}
//         title="Already leaving?"
//         confirmText="Yes"
//         cancelText="Cancel"
//       />
//     </>
//   );
// };

// export default LogOutBtn;

// src/components/LogOutBtn/LogOutBtn.jsx
// 🎯 КНОПКА ВЫХОДА
// ✅ ИСПРАВЛЕНО: принимает location для разных ширин

import { useState } from 'react';
import clsx from 'clsx';
import ModalApproveAction from '../ModalApproveAction/ModalApproveAction';
import styles from './LogOutBtn.module.css';

const LogOutBtn = ({
  onLogout,
  outsideTheHeader,
  isHomePage,
  location, // 'burger', 'userCard', 'userNav'
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    if (onLogout) {
      onLogout();
    }
    setIsModalOpen(false);
  };

  // Определяем класс для ширины в зависимости от location
  const getLocationClass = () => {
    if (location === 'burger') return styles.burgerMenuLogout;
    if (location === 'userCard') return styles.userCardLogout;
    return ''; // для userNav класс не нужен
  };

  return (
    <>
      <button
        className={clsx(
          styles.logoutButton,
          outsideTheHeader && styles.outsideTheHeader,
          isHomePage ? styles.logoutOnHome : styles.logoutOnOther,
          getLocationClass() // Добавляем класс для ширины
        )}
        type="button"
        onClick={handleClick}
        aria-label="Log out"
      >
        <span className={styles.logoutText}>Log Out</span>
      </button>

      <ModalApproveAction
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
        title="Already leaving?"
        confirmText="Yes"
        cancelText="Cancel"
      />
    </>
  );
};

export default LogOutBtn;
