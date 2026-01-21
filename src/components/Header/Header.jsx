// Header.jsx - главный компонент, собирает все части
import { useState } from 'react';
import Logo from '../../components/Logo/Logo';
import Nav from '../../components/Nav/Nav';
import AuthNav from '../../components/AuthNav/AuthNav';
import UserNav from '../../components/UserNav/UserNav';
import styles from '../../components/Header/Header.module.css';

function Header() {
  // Состояние для бургер-меню
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Функции для управления меню
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  
  // Пока заглушка - позже заменим на Redux
  const isLoggedIn = false;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* 1. Logo компонент */}
        <Logo closeBurgerMenu={closeMenu} />
        
        {/* 2. Бургер-кнопка для мобильных */}
        <button
          type="button"
          className={`${styles.burgerBtn} ${isMenuOpen ? styles.active : ''}`}
          onClick={toggleMenu}
          aria-label="burger menu"
        >
          <span className={styles.burgerLine}></span>
        </button>
        
        {/* 3. Основная навигация (десктоп) */}
        <div className={styles.navWrapper}>
          {/* Nav - всегда показываем (по ТЗ) */}
          <Nav closeBurgerMenu={closeMenu} />
          
          {/* Условный рендеринг по авторизации */}
          {isLoggedIn ? (
            <UserNav closeBurgerMenu={closeMenu} />
          ) : (
            <AuthNav closeBurgerMenu={closeMenu} />
          )}
        </div>
      </div>
      
      {/* 4. Бургер-меню для мобильных (сделаем позже) */}
    </header>
  );
}

export default Header;