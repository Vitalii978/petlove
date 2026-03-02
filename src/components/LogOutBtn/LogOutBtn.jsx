import { useState } from 'react';
import clsx from 'clsx';
import ModalApproveAction from '../ModalApproveAction/ModalApproveAction';
import styles from './LogOutBtn.module.css';

const LogOutBtn = ({ onLogout, outsideTheHeader, isHomePage, location }) => {
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

  const getLocationClass = () => {
    if (location === 'burger') return styles.burgerMenuLogout;
    if (location === 'userCard') return styles.userCardLogout;
    return '';
  };

  return (
    <>
      <button
        className={clsx(
          styles.logoutButton,
          outsideTheHeader && styles.outsideTheHeader,
          isHomePage ? styles.logoutOnHome : styles.logoutOnOther,
          getLocationClass()
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
