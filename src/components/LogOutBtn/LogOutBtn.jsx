import { useState } from 'react'; // ✅ ТЕПЕРЬ НУЖЕН ХУК!
import ModalApproveAction from '../ModalApproveAction/ModalApproveAction';
import styles from './LogOutBtn.module.css';
// import sprite from '../../assets/icon/icon-sprite.svg';

const LogOutBtn = ({ onLogout }) => {
  // 🎯 СОСТОЯНИЕ для модального окна - ✅ ХУК НУЖЕН!
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true); // ✅ Открываем модалку
  };

  const handleConfirm = () => {
    if (onLogout) {
      onLogout(); // Вызываем выход
    }
  };

  return (
    <>
      <button
        className={styles.logoutBtn}
        onClick={handleClick} // ✅ Теперь открывает модалку
        type="button"
        aria-label="Log out"
      >
        {/* <svg className={styles.logoutIcon}>
          <use href={`${sprite}#icon-logout`} />
        </svg> */}

        <span className={styles.logoutText}>Log Out</span>
      </button>

      {/* 🎯 МОДАЛЬНОЕ ОКНО */}
      <ModalApproveAction
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        title="Log out"
        message="Do you really want to log out?"
      />
    </>
  );
};

export default LogOutBtn;
