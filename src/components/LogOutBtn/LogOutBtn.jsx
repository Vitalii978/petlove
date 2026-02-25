// src/components/LogOutBtn/LogOutBtn.jsx
// 🎯 КНОПКА ВЫХОДА
// 🔧 ИСПРАВЛЕНО: открывает модалку подтверждения

import clsx from 'clsx';
import styles from './LogOutBtn.module.css';

const LogOutBtn = ({ onLogout, outsideTheHeader }) => {
  return (
    <button
      className={clsx(
        styles.logoutButton,
        outsideTheHeader && styles.outsideTheHeader
      )}
      type="button"
      onClick={onLogout}
    >
      Log out
    </button>
  );
};

export default LogOutBtn;
