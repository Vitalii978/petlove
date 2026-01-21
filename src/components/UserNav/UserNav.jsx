// UserNav.jsx - ИСПРАВЛЕННАЯ ВЕРСИЯ
import { Link } from 'react-router-dom';
import styles from './UserNav.module.css';

function UserNav({ closeBurgerMenu }) {
  const userName = "John Doe";
  const userAvatar = "👤";

  return (
    <ul className={styles.userNav}>
      <li className={styles.userNavItem}>
        <Link 
          to="/profile" 
          className={styles.profileLink}
          onClick={closeBurgerMenu}
        >
          <span className={styles.userAvatar}>{userAvatar}</span>
          <span className={styles.userName}>{userName}</span>
        </Link>
      </li>
      <li className={styles.userNavItem}>
        <button className={styles.logoutBtn}>
          Logout
        </button>
      </li>
    </ul>
  );
}

export default UserNav;