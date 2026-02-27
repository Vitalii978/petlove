// // src/components/Header/Header.jsx

// import { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import { usePageType } from '../../hooks/usePageType';
// import { isAuthenticated } from '../../utils/auth'; // ✅ Импортируем проверку авторизации
// import styles from './Header.module.css';
// import BurgerMenu from '../BurgerMenu/BurgerMenu';
// import UserNav from '../UserNav/UserNav';
// import UserBar from '../UserBar/UserBar';
// import sprite from '../../assets/icon/icon-sprite.svg';

// const Header = () => {
//   const { isHomePage } = usePageType();
//   const [isBurgerOpen, setIsBurgerOpen] = useState(false);

//   // 🎯 ИСПРАВЛЕНО: используем реальную проверку авторизации
//   const isLoggedIn = isAuthenticated(); // true/false в зависимости от токена

//   const toggleBurgerMenu = () => {
//     setIsBurgerOpen(!isBurgerOpen);
//   };

//   // 🎯 Функция выхода (теперь работает с auth.js)
//   const handleLogout = () => {
//     // Удаляем токен из localStorage
//     localStorage.removeItem('token');
//     console.log('User logged out');
//     // Перезагружаем страницу чтобы обновить состояние
//     window.location.reload();
//   };

//   return (
//     <header className={`${styles.header} `}>
//       <div
//         className={`${styles.container} ${isHomePage ? styles.containerHome : styles.containerOther}`}
//       >
//         {/* Логотип */}
//         <NavLink
//           to="/"
//           className={`${styles.logo} ${isHomePage ? styles.linkLogoWhite : styles.linkLogoBlack}`}
//         >
//           <span className={styles.logoText}>petl</span>
//           <svg
//             className={`${styles.logoIcon} ${isHomePage ? styles.logoIconWhite : styles.logoIconYellow}`}
//           >
//             <use href={`${sprite}#icon-heart-circle`} />
//           </svg>
//           <span className={styles.logoText}>ve</span>
//         </NavLink>

//         {/* Навигация для десктопа */}
//         <nav className={styles.desktopNav} aria-label="Main navigation">
//           <ul className={styles.navList}>
//             <li className={styles.navItem}>
//               <NavLink
//                 to="/news"
//                 className={({ isActive }) =>
//                   `${styles.navLink} ${isHomePage ? styles.navLinkHome : styles.navLinkOther} ${isActive ? styles.active : ''}`
//                 }
//               >
//                 News
//               </NavLink>
//             </li>
//             <li className={styles.navItem}>
//               <NavLink
//                 to="/notices"
//                 className={({ isActive }) =>
//                   `${styles.navLink} ${isHomePage ? styles.navLinkHome : styles.navLinkOther} ${isActive ? styles.active : ''}`
//                 }
//               >
//                 Find pet
//               </NavLink>
//             </li>
//             <li className={styles.navItem}>
//               <NavLink
//                 to="/friends"
//                 className={({ isActive }) =>
//                   `${styles.navLink} ${isHomePage ? styles.navLinkHome : styles.navLinkOther} ${isActive ? styles.active : ''}`
//                 }
//               >
//                 Our friends
//               </NavLink>
//             </li>
//           </ul>
//         </nav>

//         <div className={styles.Authburg}>
//           {/* Авторизация для десктопа */}
//           <nav
//             className={styles.desktopAuth}
//             aria-label="Authentication navigation"
//           >
//             {isLoggedIn ? (
//               // 🎯 Если авторизован - показываем UserNav
//               <UserNav onLogout={handleLogout} isHomePage={isHomePage} />
//             ) : (
//               // 🎯 Если не авторизован - показываем кнопки входа/регистрации
//               <ul className={styles.authList}>
//                 <li className={styles.authItem}>
//                   <NavLink
//                     to="/login"
//                     className={`${styles.authLink} ${isHomePage ? styles.authLinkHome : styles.authLinkOther}`}
//                   >
//                     LOG IN
//                   </NavLink>
//                 </li>
//                 <li className={styles.authItem}>
//                   <NavLink
//                     to="/register"
//                     className={`${styles.registerLink} ${isHomePage ? styles.registerLinkHome : styles.registerLinkOther}`}
//                   >
//                     REGISTRATION
//                   </NavLink>
//                 </li>
//               </ul>
//             )}
//           </nav>

//           {/* 🎯 UserBar для мобильных (только иконка, без текста) */}
//           {isLoggedIn && (
//             <div className={styles.mobileUserIcon}>
//               <UserBar isMobile={true} isHomePage={isHomePage} />
//             </div>
//           )}

//           {/* Бургер-кнопка для мобильных */}
//           <button
//             className={styles.burgerButton}
//             onClick={toggleBurgerMenu}
//             type="button"
//             aria-label={isBurgerOpen ? 'Close menu' : 'Open menu'}
//           >
//             {isBurgerOpen ? (
//               <svg
//                 className={`${styles.iconMenu} ${isHomePage ? styles.iconMenuWhite : styles.iconMenuBlack}`}
//               >
//                 <use href={`${sprite}#icon-close`} />
//               </svg>
//             ) : (
//               <svg
//                 className={`${styles.iconMenu} ${isHomePage ? styles.iconMenuWhite : styles.iconMenuBlack}`}
//               >
//                 <use href={`${sprite}#icon-menu`} />
//               </svg>
//             )}
//           </button>
//         </div>

//         {/* Бургер-меню */}
//         {isBurgerOpen && (
//           <BurgerMenu
//             isOpen={isBurgerOpen}
//             onClose={toggleBurgerMenu}
//             isLoggedIn={isLoggedIn}
//             isHomePage={isHomePage}
//             onLogout={handleLogout}
//           />
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;

// // src/components/Header/Header.jsx
// // 🎯 КОМПОНЕНТ ШАПКИ
// // ✅ ПРИ ВИХОДІ ПЕРЕХІД НА ГОЛОВНУ

// import { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import { usePageType } from '../../hooks/usePageType';
// import { isAuthenticated } from '../../utils/auth';
// import styles from './Header.module.css';
// import BurgerMenu from '../BurgerMenu/BurgerMenu';
// import UserNav from '../UserNav/UserNav';
// import UserBar from '../UserBar/UserBar';
// import sprite from '../../assets/icon/icon-sprite.svg';

// const Header = () => {
//   const { isHomePage } = usePageType();
//   const [isBurgerOpen, setIsBurgerOpen] = useState(false);
//   const isLoggedIn = isAuthenticated();

//   const toggleBurgerMenu = () => {
//     setIsBurgerOpen(!isBurgerOpen);
//   };

//   // 🎯 Функція виходу — ПРАВИЛЬНА!
//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     // НЕ видаляємо sessionStorage — лоадер більше не покажеться
//     console.log('✅ User logged out');
//     window.location.href = '/'; // Просто переходимо на головну
//   };

//   return (
//     <header className={`${styles.header} `}>
//       <div
//         className={`${styles.container} ${isHomePage ? styles.containerHome : styles.containerOther}`}
//       >
//         <NavLink
//           to="/"
//           className={`${styles.logo} ${isHomePage ? styles.linkLogoWhite : styles.linkLogoBlack}`}
//         >
//           <span className={styles.logoText}>petl</span>
//           <svg
//             className={`${styles.logoIcon} ${isHomePage ? styles.logoIconWhite : styles.logoIconYellow}`}
//           >
//             <use href={`${sprite}#icon-heart-circle`} />
//           </svg>
//           <span className={styles.logoText}>ve</span>
//         </NavLink>

//         <nav className={styles.desktopNav} aria-label="Main navigation">
//           <ul className={styles.navList}>
//             <li className={styles.navItem}>
//               <NavLink
//                 to="/news"
//                 className={({ isActive }) =>
//                   `${styles.navLink} ${isHomePage ? styles.navLinkHome : styles.navLinkOther} ${isActive ? styles.active : ''}`
//                 }
//               >
//                 News
//               </NavLink>
//             </li>
//             <li className={styles.navItem}>
//               <NavLink
//                 to="/notices"
//                 className={({ isActive }) =>
//                   `${styles.navLink} ${isHomePage ? styles.navLinkHome : styles.navLinkOther} ${isActive ? styles.active : ''}`
//                 }
//               >
//                 Find pet
//               </NavLink>
//             </li>
//             <li className={styles.navItem}>
//               <NavLink
//                 to="/friends"
//                 className={({ isActive }) =>
//                   `${styles.navLink} ${isHomePage ? styles.navLinkHome : styles.navLinkOther} ${isActive ? styles.active : ''}`
//                 }
//               >
//                 Our friends
//               </NavLink>
//             </li>
//           </ul>
//         </nav>

//         <div className={styles.Authburg}>
//           <nav
//             className={styles.desktopAuth}
//             aria-label="Authentication navigation"
//           >
//             {isLoggedIn ? (
//               <UserNav onLogout={handleLogout} isHomePage={isHomePage} />
//             ) : (
//               <ul className={styles.authList}>
//                 <li className={styles.authItem}>
//                   <NavLink
//                     to="/login"
//                     className={`${styles.authLink} ${isHomePage ? styles.authLinkHome : styles.authLinkOther}`}
//                   >
//                     LOG IN
//                   </NavLink>
//                 </li>
//                 <li className={styles.authItem}>
//                   <NavLink
//                     to="/register"
//                     className={`${styles.registerLink} ${isHomePage ? styles.registerLinkHome : styles.registerLinkOther}`}
//                   >
//                     REGISTRATION
//                   </NavLink>
//                 </li>
//               </ul>
//             )}
//           </nav>

//           {isLoggedIn && (
//             <div className={styles.mobileUserIcon}>
//               <UserBar isMobile={true} isHomePage={isHomePage} />
//             </div>
//           )}

//           <button
//             className={styles.burgerButton}
//             onClick={toggleBurgerMenu}
//             type="button"
//             aria-label={isBurgerOpen ? 'Close menu' : 'Open menu'}
//           >
//             {isBurgerOpen ? (
//               <svg
//                 className={`${styles.iconMenu} ${isHomePage ? styles.iconMenuWhite : styles.iconMenuBlack}`}
//               >
//                 <use href={`${sprite}#icon-close`} />
//               </svg>
//             ) : (
//               <svg
//                 className={`${styles.iconMenu} ${isHomePage ? styles.iconMenuWhite : styles.iconMenuBlack}`}
//               >
//                 <use href={`${sprite}#icon-menu`} />
//               </svg>
//             )}
//           </button>
//         </div>

//         {isBurgerOpen && (
//           <BurgerMenu
//             isOpen={isBurgerOpen}
//             onClose={toggleBurgerMenu}
//             isLoggedIn={isLoggedIn}
//             isHomePage={isHomePage}
//             onLogout={handleLogout}
//           />
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;

// src/components/Header/Header.jsx
// 🎯 КОМПОНЕНТ ШАПКИ САЙТУ
// ====================================================
// Що робить цей компонент:
// 1. Показує логотип та навігацію
// 2. Відображає різні кнопки для авторизованих/неавторизованих
// 3. Керує бургер-меню на мобільних
// 4. Обробляє вихід користувача
// ====================================================

import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { usePageType } from '../../hooks/usePageType';
import { isAuthenticated } from '../../utils/auth';
import styles from './Header.module.css';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import UserNav from '../UserNav/UserNav';
import UserBar from '../UserBar/UserBar';
import sprite from '../../assets/icon/icon-sprite.svg';

const Header = () => {
  // 🎯 Хук для визначення, чи ми на головній сторінці
  const { isHomePage } = usePageType();

  // 🎯 Стан бургер-меню (відкрите/закрите)
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  // 🎯 Перевіряємо, чи авторизований користувач
  const isLoggedIn = isAuthenticated();

  // Функція для відкриття/закриття бургер-меню
  const toggleBurgerMenu = () => {
    setIsBurgerOpen(!isBurgerOpen);
  };

  // 🎯 ФУНКЦІЯ ВИХОДУ — КЛЮЧОВИЙ МОМЕНТ!
  // ====================================================
  // Чому вона тут, а не в окремому файлі?
  // Тому що шапка є на всіх сторінках, і кнопка виходу
  // повинна працювати скрізь однаково.
  // ====================================================
  const handleLogout = () => {
    // КРОК 1: Видаляємо токен з localStorage
    // Це робить користувача неавторизованим
    localStorage.removeItem('token');
    console.log('✅ Токен видалено, користувач вийшов');

    // ⚠️ ВАЖЛИВО: НЕ видаляємо sessionStorage з loaderShown!
    // Якщо ми видалимо loaderShown, то при виході знову покажеться лоадер,
    // а нам цього не треба. Лоадер має показуватись ТІЛЬКИ при першому відкритті вкладки.

    // КРОК 2: Переходимо на головну сторінку
    // Використовуємо window.location.href, а не navigate,
    // щоб гарантовано перезавантажити сторінку і скинути всі стани
    window.location.href = '/';
  };

  return (
    <header className={`${styles.header} `}>
      <div
        className={`${styles.container} ${isHomePage ? styles.containerHome : styles.containerOther}`}
      >
        {/* 🎯 ЛОГОТИП — завжди веде на головну */}
        <NavLink
          to="/"
          className={`${styles.logo} ${isHomePage ? styles.linkLogoWhite : styles.linkLogoBlack}`}
        >
          <span className={styles.logoText}>petl</span>
          <svg
            className={`${styles.logoIcon} ${isHomePage ? styles.logoIconWhite : styles.logoIconYellow}`}
          >
            <use href={`${sprite}#icon-heart-circle`} />
          </svg>
          <span className={styles.logoText}>ve</span>
        </NavLink>

        {/* 🎯 ДЕСКТОПНА НАВІГАЦІЯ (прихована на мобільних) */}
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
          {/* 🎯 АВТОРИЗАЦІЯ ДЛЯ ДЕСКТОПУ */}
          <nav
            className={styles.desktopAuth}
            aria-label="Authentication navigation"
          >
            {isLoggedIn ? (
              // Якщо авторизований — показуємо UserNav (аватар + кнопка виходу)
              <UserNav onLogout={handleLogout} isHomePage={isHomePage} />
            ) : (
              // Якщо не авторизований — показуємо кнопки LOG IN та REGISTRATION
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

          {/* 🎯 UserBar для мобільних (тільки іконка, без тексту) */}
          {isLoggedIn && (
            <div className={styles.mobileUserIcon}>
              <UserBar isMobile={true} isHomePage={isHomePage} />
            </div>
          )}

          {/* 🎯 БУРГЕР-КНОПКА ДЛЯ МОБІЛЬНИХ */}
          <button
            className={styles.burgerButton}
            onClick={toggleBurgerMenu}
            type="button"
            aria-label={isBurgerOpen ? 'Close menu' : 'Open menu'}
          >
            {isBurgerOpen ? (
              <svg
                className={`${styles.iconMenu} ${isHomePage ? styles.iconMenuWhite : styles.iconMenuBlack}`}
              >
                <use href={`${sprite}#icon-close`} />
              </svg>
            ) : (
              <svg
                className={`${styles.iconMenu} ${isHomePage ? styles.iconMenuWhite : styles.iconMenuBlack}`}
              >
                <use href={`${sprite}#icon-menu`} />
              </svg>
            )}
          </button>
        </div>

        {/* 🎯 БУРГЕР-МЕНЮ (з'являється на мобільних) */}
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
