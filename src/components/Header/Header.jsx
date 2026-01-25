
// Импортируем необходимые компоненты и хуки
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { usePageType } from '../../hooks/usePageType';
import styles from './Header.module.css';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

// Импортируем SVG спрайт
import sprite from '../../assets/icon/icon-sprite.svg';

const Header = () => {
  const { isHomePage } = usePageType();
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const toggleBurgerMenu = () => {
    setIsBurgerOpen(!isBurgerOpen);
  };

  return (
    
    <header className={`${styles.header} `}>
      
      {/* Контейнер должен быть такой же ширины как HomePage */}
      <div className={`${styles.container} ${isHomePage ? styles.containerHome : styles.containerOther}`}>
        
        {/* Логотип */}
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

        
        
        {/* Навигация для десктопа */}
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
        {/* Авторизация для десктопа */}
        <nav className={styles.desktopAuth} aria-label="Authentication navigation">
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
        </nav>
        
        {/* Бургер-кнопка для мобильных */}
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
            <svg className={`${styles.iconMenu} ${isHomePage ? styles.iconMenuWhite : styles.iconMenuBlack}`} >
              <use href={`${sprite}#icon-menu`} />
            </svg>
          )}
        </button>
        </div>


        {/* Бургер-меню */}
        {/* {isBurgerOpen && (
          <div className={styles.burgerMenuOverlay} onClick={toggleBurgerMenu}>
            <div className={styles.burgerMenuContent} onClick={(e) => e.stopPropagation()}>
              <div className={styles.burgerMenuHeader}>
                <button className={styles.burgerCloseButton} onClick={toggleBurgerMenu}>
                  <svg className={styles.iconMenuClose}>
                    <use href={`${sprite}#icon-close`} />
                  </svg>
                </button>
              </div>
              <p className={styles.burgerMenuText}>Меню</p>
            </div>
          </div>
        )} */}
        {isBurgerOpen && (
  <BurgerMenu 
    isOpen={isBurgerOpen}
    onClose={toggleBurgerMenu}
    isLoggedIn={false} // Пока false, так как нет авторизации
    isHomePage={isHomePage} // Передаем информацию о странице
  />
)}
      </div>
    </header>
  );
};

export default Header;