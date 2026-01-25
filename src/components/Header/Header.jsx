import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { usePageType } from '../../hooks/usePageType';
import styles from './Header.module.css';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import sprite from '../../assets/icon/icon-sprite.svg';

const Header = () => {
  const { isHomePage } = usePageType();
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  
  // 🎯 СОСТОЯНИЕ АВТОРИЗАЦИИ + КНОПКА ДЛЯ ТЕСТА
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const toggleBurgerMenu = () => {
    setIsBurgerOpen(!isBurgerOpen);
  };
  
  // 🎯 ФУНКЦИЯ ДЛЯ ПЕРЕКЛЮЧЕНИЯ АВТОРИЗАЦИИ (ТЕСТ)
  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <header className={`${styles.header} `}>
      <div className={`${styles.container} ${isHomePage ? styles.containerHome : styles.containerOther}`}>
        
        <NavLink
          to="/"
          className={`${styles.logo} ${isHomePage ? styles.linkLogoWhite : styles.linkLogoBlack}`}
        >
          <span className={styles.logoText}>petl</span>
          <svg className={`${styles.logoIcon} ${isHomePage ? styles.logoIconWhite : styles.logoIconYellow}`}>
            <use href={`${sprite}#icon-heart-circle`} />
          </svg>
          <span className={styles.logoText}>ve</span>
        </NavLink>

        {/* 🎯 ТЕСТОВАЯ КНОПКА (удалить позже) */}
        <button 
          onClick={toggleLogin}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: '#f6b83d',
            color: 'white',
            border: 'none',
            padding: '5px 10px',
            borderRadius: '5px',
            fontSize: '12px',
            zIndex: 1000
          }}
        >
          {isLoggedIn ? 'Выйти (тест)' : 'Войти (тест)'}
        </button>

        <nav className={styles.desktopNav} aria-label="Main navigation">
          {/* ... ваш существующий код навигации ... */}
        </nav>
        
        <div className={styles.Authburg}>
          <nav className={styles.desktopAuth} aria-label="Authentication navigation">
            {isLoggedIn ? (
              // 🎯 ЕСЛИ АВТОРИЗОВАН - пока заглушка
              <div style={{color: isHomePage ? 'white' : 'black'}}>
                UserNav (заглушка)
              </div>
            ) : (
              // 🎯 ЕСЛИ НЕ АВТОРИЗОВАН - ваш текущий AuthNav
              <ul className={styles.authList}>
                <li className={styles.authItem}>
                  <NavLink 
                    to="/login" 
                    className={`${styles.authLink} ${isHomePage ? styles.authLinkHome : styles.authLinkOther}`}
                  >
                    LOG IN
                  </NavLink>
                </li>
                <li className={styles.authItem}>
                  <NavLink 
                    to="/register" 
                    className={`${styles.registerLink} ${isHomePage ? styles.registerLinkHome : styles.registerLinkOther}`}
                  >
                    REGISTRATION
                  </NavLink>
                </li>
              </ul>
            )}
          </nav>
          
          <button 
            className={styles.burgerButton}
            onClick={toggleBurgerMenu}
            type="button"
            aria-label={isBurgerOpen ? "Close menu" : "Open menu"}
          >
            {isBurgerOpen ? (
              <svg className={`${styles.iconMenu} ${isHomePage ? styles.iconMenuWhite : styles.iconMenuBlack}`}>
                <use href={`${sprite}#icon-close`} />
              </svg>
            ) : (
              <svg className={`${styles.iconMenu} ${isHomePage ? styles.iconMenuWhite : styles.iconMenuBlack}`}>
                <use href={`${sprite}#icon-menu`} />
              </svg>
            )}
          </button>
        </div>

        {isBurgerOpen && (
          <BurgerMenu 
            isOpen={isBurgerOpen}
            onClose={toggleBurgerMenu}
            isLoggedIn={isLoggedIn} // 🎯 Теперь реальное состояние!
            isHomePage={isHomePage}
          />
        )}
      </div>
    </header>
  );
};

export default Header;