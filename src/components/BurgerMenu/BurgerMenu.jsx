import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './BurgerMenu.module.css';
import sprite from '../../assets/icon/icon-sprite.svg';
import UserBar from '../UserBar/UserBar';
import LogOutBtn from '../LogOutBtn/LogOutBtn';

const BurgerMenu = ({ isOpen, onClose, isLoggedIn, isHomePage, onLogout }) => {
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

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.menuContainer}>
        <div className={`${styles.menu} ${isHomePage ? styles.menuWhite : styles.menuYellow}`}>
          <button className={styles.closeButton} onClick={onClose}>
            <svg className={styles.closeIcon}>
              <use href={`${sprite}#icon-close`} />
            </svg>
          </button>

          <div className={styles.menuContent}>
            {/* 🎯 Навигация - уже правильный <ul> */}
            <nav className={styles.burgerNav}>
              <ul className={styles.burgerNavList}>
                <li className={styles.burgerNavItem}>
                  <NavLink 
                    to="/news" 
                    className={({ isActive }) => 
                      `${styles.burgerNavLink} ${isActive ? styles.active : ''}`
                    }
                    onClick={onClose}
                  >
                    News
                  </NavLink>
                </li>
                <li className={styles.burgerNavItem}>
                  <NavLink 
                    to="/notices" 
                    className={({ isActive }) => 
                      `${styles.burgerNavLink} ${isActive ? styles.active : ''}`
                    }
                    onClick={onClose}
                  >
                    Find pet
                  </NavLink>
                </li>
                <li className={styles.burgerNavItem}>
                  <NavLink 
                    to="/friends" 
                    className={({ isActive }) => 
                      `${styles.burgerNavLink} ${isActive ? styles.active : ''}`
                    }
                    onClick={onClose}
                  >
                    Our friends
                  </NavLink>
                </li>
              </ul>
            </nav>

            {/* 🎯 Auth навигация - ТЕПЕРЬ ПРАВИЛЬНЫЙ <ul> */}
            <nav className={styles.burgerAuth} aria-label="Authentication menu">
              <ul className={styles.burgerAuthList}>
                {isLoggedIn ? (
                  // 🎯 АВТОРИЗОВАН: два <li> (UserBar + LogOutBtn)
                  <>
                    <li className={styles.burgerAuthItem}>
                      <div className={styles.burgerUserBar}>
                        <UserBar isMobile={true} isHomePage={isHomePage} />
                      </div>
                    </li>
                    <li className={styles.burgerAuthItem}>
                      <div className={styles.burgerLogout}>
                        <LogOutBtn onLogout={onLogout} />
                      </div>
                    </li>
                  </>
                ) : (
                  // 🎯 НЕАВТОРИЗОВАН: два <li> с ссылками
                  <>
                    <li className={styles.burgerAuthItem}>
                      <NavLink 
                        to="/login" 
                        className={`${styles.burgerAuthLink} ${isHomePage ? styles.authLinkHome : styles.authLinkOther}`}
                        onClick={onClose}
                      >
                        LOG IN
                      </NavLink>
                    </li>
                    <li className={styles.burgerAuthItem}>
                      <NavLink 
                        to="/register" 
                        className={`${styles.burgerRegisterLink} ${isHomePage ? styles.registerLinkHome : styles.registerLinkOther}`}
                        onClick={onClose}
                      >
                        REGISTRATION
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;