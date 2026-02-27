// // src/components/LogOutBtn/LogOutBtn.jsx
// // 🎯 КНОПКА ВЫХОДА
// // 🔧 ИСПРАВЛЕНО: открывает модалку подтверждения

// import clsx from 'clsx';
// import styles from './LogOutBtn.module.css';

// const LogOutBtn = ({ onLogout, outsideTheHeader }) => {
//   return (
//     <button
//       className={clsx(
//         styles.logoutButton,
//         outsideTheHeader && styles.outsideTheHeader
//       )}
//       type="button"
//       onClick={onLogout}
//     >
//       Log out
//     </button>
//   );
// };

// export default LogOutBtn;

// src/components/LogOutBtn/LogOutBtn.jsx
// 🎯 КНОПКА ВЫХОДА
// ✅ ИСПРАВЛЕНО: onLogout передается в модалку

import { useState } from 'react';
import clsx from 'clsx';
import ModalApproveAction from '../ModalApproveAction/ModalApproveAction';
import styles from './LogOutBtn.module.css';

const LogOutBtn = ({ onLogout, outsideTheHeader }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // ✅ Функция подтверждения - вызывает onLogout из пропсов
  const handleConfirm = () => {
    if (onLogout) {
      onLogout(); // 👈 ВОТ ТЕПЕРЬ onLogout ИСПОЛЬЗУЕТСЯ!
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        className={clsx(
          styles.logoutButton,
          outsideTheHeader && styles.outsideTheHeader
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
        onConfirm={handleConfirm} // 👈 ПЕРЕДАЕМ handleConfirm
        title="Already leaving?"
        confirmText="Yes"
        cancelText="Cancel"
      />
    </>
  );
};

export default LogOutBtn;
