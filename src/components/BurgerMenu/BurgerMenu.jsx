// import { useEffect } from 'react';
// import { NavLink } from 'react-router-dom';
// import styles from './BurgerMenu.module.css';
// import LogOutBtn from '../LogOutBtn/LogOutBtn';
// import UserBar from '../UserBar/UserBar';
// import sprite from '../../assets/icon/icon-sprite.svg';

// const BurgerMenu = ({ isOpen, onClose, isLoggedIn, isHomePage, onLogout }) => {
//   // Закрытие по Escape
//   useEffect(() => {
//     const handleEscape = event => {
//       if (event.key === 'Escape') {
//         onClose();
//       }
//     };

//     if (isOpen) {
//       document.addEventListener('keydown', handleEscape);
//       // НЕ блокируем прокрутку страницы
//     }

//     return () => {
//       document.removeEventListener('keydown', handleEscape);
//     };
//   }, [isOpen, onClose]);

//   // Закрытие по клику на overlay
//   const handleOverlayClick = event => {
//     if (event.target === event.currentTarget) {
//       onClose();
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className={styles.overlay} onClick={handleOverlayClick}>
//       <div className={styles.menuContainer}>
//         <div
//           className={`${styles.menu} ${isHomePage ? styles.menuWhite : styles.menuYellow}`}
//         >
//           <button className={styles.closeButton} onClick={onClose}>
//             <svg className={styles.closeIcon}>
//               <use href={`${sprite}#icon-close`} />
//             </svg>
//           </button>

//           <div className={styles.menuContent}>
//             <nav className={styles.burgerNav}>
//               <ul className={styles.burgerNavList}>
//                 <li className={styles.burgerNavItem}>
//                   <NavLink
//                     to="/news"
//                     className={({ isActive }) =>
//                       `${styles.burgerNavLink} ${isActive ? styles.active : ''}`
//                     }
//                     onClick={onClose}
//                   >
//                     News
//                   </NavLink>
//                 </li>
//                 <li className={styles.burgerNavItem}>
//                   <NavLink
//                     to="/notices"
//                     className={({ isActive }) =>
//                       `${styles.burgerNavLink} ${isActive ? styles.active : ''}`
//                     }
//                     onClick={onClose}
//                   >
//                     Find pet
//                   </NavLink>
//                 </li>
//                 <li className={styles.burgerNavItem}>
//                   <NavLink
//                     to="/friends"
//                     className={({ isActive }) =>
//                       `${styles.burgerNavLink} ${isActive ? styles.active : ''}`
//                     }
//                     onClick={onClose}
//                   >
//                     Our friends
//                   </NavLink>
//                 </li>
//               </ul>
//             </nav>

//             {isLoggedIn ? (
//               <>
//                 <div className={styles.burgerUserBar}>
//                   <UserBar isMobile={false} isHomePage={isHomePage} />
//                 </div>

//                 <div className={styles.burgerLogout}>
//                   <LogOutBtn
//                     onLogout={() => {
//                       onLogout();
//                       onClose();
//                     }}
//                   />
//                 </div>
//               </>
//             ) : (
//               <nav className={styles.burgerAuth}>
//                 <ul className={styles.burgerAuthList}>
//                   <li className={styles.burgerAuthItem}>
//                     <NavLink
//                       to="/login"
//                       className={`${styles.burgerAuthLink} ${isHomePage ? styles.authLinkHome : styles.authLinkOther}`}
//                       onClick={onClose}
//                     >
//                       LOG IN
//                     </NavLink>
//                   </li>
//                   <li className={styles.burgerAuthItem}>
//                     <NavLink
//                       to="/register"
//                       className={`${styles.burgerRegisterLink} ${isHomePage ? styles.registerLinkHome : styles.registerLinkOther}`}
//                       onClick={onClose}
//                     >
//                       REGISTRATION
//                     </NavLink>
//                   </li>
//                 </ul>
//               </nav>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BurgerMenu;

// src/components/BurgerMenu/BurgerMenu.jsx
// 🎯 БУРГЕР-МЕНЮ ДЛЯ МОБИЛЬНЫХ УСТРОЙСТВ
// ✅ ПРОВЕРЕНО: нет дублирующих модалок, только LogOutBtn

import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './BurgerMenu.module.css';
import LogOutBtn from '../LogOutBtn/LogOutBtn';
import UserBar from '../UserBar/UserBar';
import sprite from '../../assets/icon/icon-sprite.svg';

const BurgerMenu = ({ isOpen, onClose, isLoggedIn, isHomePage, onLogout }) => {
  // Закрытие по Escape
  useEffect(() => {
    const handleEscape = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Закрытие по клику на overlay
  const handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.menuContainer}>
        <div
          className={`${styles.menu} ${isHomePage ? styles.menuWhite : styles.menuYellow}`}
        >
          {/* Кнопка закрытия */}
          <button className={styles.closeButton} onClick={onClose}>
            <svg className={styles.closeIcon}>
              <use href={`${sprite}#icon-close`} />
            </svg>
          </button>

          <div className={styles.menuContent}>
            {/* Навигация */}
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

            {/* Авторизованный пользователь */}
            {isLoggedIn ? (
              <>
                <div className={styles.burgerUserBar}>
                  <UserBar isMobile={false} isHomePage={isHomePage} />
                </div>

                {/* ✅ LogOutBtn - здесь нет модалки, только кнопка */}
                <div className={styles.burgerLogout}>
                  <LogOutBtn
                    onLogout={() => {
                      onLogout();
                      onClose();
                    }}
                    outsideTheHeader={true}
                    isHomePage={isHomePage} // ✅ Добавляем isHomePage
                    location="burger" // 👈 ДЛЯ ШИРИНЫ 178px
                  />
                </div>
              </>
            ) : (
              /* Неавторизованный пользователь */
              <nav className={styles.burgerAuth}>
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
              </nav>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;
