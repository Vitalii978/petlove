import { useEffect } from 'react';
import Nav from '../Nav/Nav';
import AuthNav from '../AuthNav/AuthNav';
import UserNav from '../UserNav/UserNav';
import styles from './BurgerMenu.module.css';

const BurgerMenu = ({ isOpen, onClose, isLoggedIn }) => {
  // Закрытие меню по нажатию Escape
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Закрытие меню при клике на overlay
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className={styles.overlay} 
      onClick={handleOverlayClick}
    >
      <div className={styles.menu}>
        {/* Кнопка закрытия */}
        <button 
          className={styles.closeButton}
          onClick={onClose}
          type="button"
          aria-label="Close menu"
        >
          <span className={styles.closeIcon}>×</span>
        </button>
        
        {/* Содержимое меню */}
        <div className={styles.menuContent}>
          {/* Логотип в бургер-меню (похоже есть на скриншоте) */}
          <div className={styles.menuLogo}>
            <span className={styles.logoText}>petl·ve</span>
          </div>
          
          {/* Навигация */}
          <div className={styles.menuSection}>
            <h3 className={styles.menuTitle}>Navigation</h3>
            <Nav />
          </div>
          
          {/* Авторизация */}
          <div className={styles.menuSection}>
            <h3 className={styles.menuTitle}>Account</h3>
            {isLoggedIn ? (
              <UserNav />
            ) : (
              <AuthNav />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;