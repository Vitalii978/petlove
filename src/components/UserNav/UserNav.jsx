// import UserBar from '../UserBar/UserBar';
// import LogOutBtn from '../LogOutBtn/LogOutBtn';
// import styles from './UserNav.module.css';

// const UserNav = ({ onLogout, isHomePage }) => {
//   return (
//     // 🎯 МЕНЯЕМ <div> на <nav> для семантики навигации
//     <nav className={styles.userNav} aria-label="User navigation">
//       {/* 🎯 ДОБАВЛЯЕМ <ul> - список элементов навигации пользователя */}
//       <ul className={styles.userNavList}>
//         {/* 🎯 ПЕРВЫЙ <li>: LogOutBtn (кнопка выхода) */}
//         <li className={styles.userNavItem}>
//           {/* Оборачиваем LogOutBtn в div с вашим классом logoutWrapper */}
//           <div className={styles.logoutWrapper}>
//             <LogOutBtn onLogout={onLogout} />
//           </div>
//         </li>

//         {/* 🎯 ВТОРОЙ <li>: UserBar (информация о пользователе) */}
//         <li className={styles.userNavItem}>
//           {/* Оборачиваем UserBar в div с вашим классом userBarWrapper */}
//           <div className={styles.userBarWrapper}>
//             <UserBar isMobile={false} isHomePage={isHomePage} />
//           </div>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default UserNav;

// src/components/UserNav/UserNav.jsx
// ✅ ИСПРАВЛЕНО: передаем isHomePage в LogOutBtn

import UserBar from '../UserBar/UserBar';
import LogOutBtn from '../LogOutBtn/LogOutBtn';
import styles from './UserNav.module.css';

const UserNav = ({ onLogout, isHomePage }) => {
  return (
    <nav className={styles.userNav} aria-label="User navigation">
      <ul className={styles.userNavList}>
        <li className={styles.userNavItem}>
          <div className={styles.logoutWrapper}>
            {/* ✅ Передаем isHomePage */}
            <LogOutBtn
              onLogout={onLogout}
              isHomePage={isHomePage}
              location="userNav" // 👈 МОЖНО НЕ ПЕРЕДАВАТЬ, БУДЕТ 136px
            />
          </div>
        </li>
        <li className={styles.userNavItem}>
          <div className={styles.userBarWrapper}>
            <UserBar isMobile={false} isHomePage={isHomePage} />
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default UserNav;
