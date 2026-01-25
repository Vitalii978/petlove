import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './BurgerMenu.module.css';
import sprite from '../../assets/icon/icon-sprite.svg';

const BurgerMenu = ({ isOpen, onClose, isLoggedIn, isHomePage }) => {
  // Закрытие по Escape
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

  // Закрытие по клику на overlay
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={`${styles.menu} ${isHomePage ? styles.menuWhite : styles.menuYellow}`}>
        {/* Кнопка закрытия */}
        <button className={styles.closeButton} onClick={onClose}>
          <svg className={styles.closeIcon}>
            <use href={`${sprite}#icon-close`} />
          </svg>
        </button>

        {/* Контент меню */}
        <div className={styles.menuContent}>
          {/* Навигация ВСЕГДА в бургер-меню */}
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

          {/* 🎯 ИСПРАВЛЕННАЯ СЕКЦИЯ: burgerAuth с условием */}
          <nav className={styles.burgerAuth}>
            {isLoggedIn ? (
              // 🎯 ЕСЛИ АВТОРИЗОВАН - показываем UserNav (пока заглушка)
              <div style={{
                textAlign: 'center',
                color: isHomePage ? 'white' : 'black',
                padding: '20px',
                fontFamily: 'Manrope, sans-serif',
                fontSize: '16px'
              }}>
                UserNav в меню (заглушка)
                <button 
                  onClick={onClose}
                  style={{
                    display: 'block',
                    margin: '10px auto',
                    background: isHomePage ? 'white' : '#f6b83d',
                    color: isHomePage ? '#f6b83d' : 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '30px',
                    cursor: 'pointer'
                  }}
                >
                  Выйти
                </button>
              </div>
            ) : (
              // 🎯 ЕСЛИ НЕ АВТОРИЗОВАН - показываем AuthNav
              <ul className={styles.burgerAuthList}>
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
              </ul>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;