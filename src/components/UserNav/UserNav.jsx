import UserBar from '../UserBar/UserBar';
import LogOutBtn from '../LogOutBtn/LogOutBtn';
import styles from './UserNav.module.css';

const UserNav = ({ onLogout, isHomePage }) => {
  return (
    // 🎯 <nav> - семантический тег для навигации
    <nav className={styles.userNav} aria-label="User navigation">
      
      {/* 🎯 <ul> - СПИСОК элементов навигации пользователя */}
      <ul className={styles.userNavList}>
        
        {/* 🎯 <li> - ПЕРВЫЙ элемент списка: UserBar (ссылка на профиль) */}
        <li className={styles.userNavItem}>
          <UserBar isMobile={false} isHomePage={isHomePage} />
        </li>
        
        {/* 🎯 <li> - ВТОРОЙ элемент списка: LogOutBtn (кнопка выхода) */}
        <li className={styles.userNavItem}>
          <LogOutBtn onLogout={onLogout} />
        </li>
        
      </ul>
    </nav>
  );
};

export default UserNav;