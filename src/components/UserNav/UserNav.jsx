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
// 🎯 КОМПОНЕНТ НАВИГАЦИИ ПОЛЬЗОВАТЕЛЯ
// ✅ ИСПРАВЛЕНО: правильная разметка с ul/li и стили из примера

import UserBar from '../UserBar/UserBar';
import LogOutBtn from '../LogOutBtn/LogOutBtn';
import styles from './UserNav.module.css';

const UserNav = ({ onLogout, isHomePage }) => {
  return (
    // 🎯 МЕНЯЕМ <div> на <nav> для семантики навигации
    <nav className={styles.userNav} aria-label="User navigation">
      {/* 🎯 ДОБАВЛЯЕМ <ul> - список элементов навигации пользователя */}
      <ul className={styles.userNavList}>
        {/* 🎯 ПЕРВЫЙ <li>: LogOutBtn (кнопка выхода) */}
        <li className={styles.userNavItem}>
          {/* Оборачиваем LogOutBtn в div с вашим классом logoutWrapper */}
          <div className={styles.logoutWrapper}>
            <LogOutBtn onLogout={onLogout} />
          </div>
        </li>

        {/* 🎯 ВТОРОЙ <li>: UserBar (информация о пользователе) */}
        <li className={styles.userNavItem}>
          {/* Оборачиваем UserBar в div с вашим классом userBarWrapper */}
          <div className={styles.userBarWrapper}>
            <UserBar isMobile={false} isHomePage={isHomePage} />
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default UserNav;
