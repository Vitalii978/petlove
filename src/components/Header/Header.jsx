import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { usePageType } from '../../hooks/usePageType';
import styles from './Header.module.css';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import UserNav from '../UserNav/UserNav';
import UserBar from '../UserBar/UserBar';
import sprite from '../../assets/icon/icon-sprite.svg';

const Header = () => {
  const { isHomePage } = usePageType();
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const toggleBurgerMenu = () => {
    setIsBurgerOpen(!isBurgerOpen);
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    console.log('User logged out');
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

        <nav className={styles.desktopNav} aria-label="Main navigation">
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <NavLink 
                to="/news" 
                className={({ isActive }) => 
                  `${styles.navLink} ${isHomePage ? styles.navLinkHome : styles.navLinkOther} ${isActive ? styles.active : ''}`
                }
              >
                News
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink 
                to="/notices" 
                className={({ isActive }) => 
                  `${styles.navLink} ${isHomePage ? styles.navLinkHome : styles.navLinkOther} ${isActive ? styles.active : ''}`
                }
              >
                Find pet
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink 
                to="/friends" 
                className={({ isActive }) => 
                  `${styles.navLink} ${isHomePage ? styles.navLinkHome : styles.navLinkOther} ${isActive ? styles.active : ''}`
                }
              >
                Our friends
              </NavLink>
            </li>
          </ul>
        </nav>
        
        <div className={styles.Authburg}>
          {/* 🎯 Auth навигация ВСЕГДА внутри <nav> */}
          <nav className={styles.desktopAuth} aria-label="Authentication navigation">
            {/* 🎯 СПИСОК для всех состояний (авторизован/неавторизован) */}
            <ul className={styles.authList}>
              {isLoggedIn ? (
                // 🎯 ЕСЛИ АВТОРИЗОВАН - один <li> с UserNav внутри
                <li className={styles.authItem}>
                  <UserNav onLogout={handleLogout} isHomePage={isHomePage} />
                </li>
              ) : (
                // 🎯 ЕСЛИ НЕ АВТОРИЗОВАН - два <li> с ссылками
                <>
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
                </>
              )}
            </ul>
          </nav>
          
          {/* 🎯 UserBar для мобильных (вне списка, так это отдельный элемент) */}
          {isLoggedIn && (
            <div className={styles.mobileUserIcon}>
              <UserBar isMobile={true} isHomePage={isHomePage} />
            </div>
          )}
          
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
            isLoggedIn={isLoggedIn}
            isHomePage={isHomePage}
            onLogout={handleLogout}
          />
        )}
      </div>
    </header>
  );
};

export default Header;