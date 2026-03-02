import UserBar from '../UserBar/UserBar';
import LogOutBtn from '../LogOutBtn/LogOutBtn';
import styles from './UserNav.module.css';

const UserNav = ({ onLogout, isHomePage }) => {
  return (
    <nav className={styles.userNav} aria-label="User navigation">
      <ul className={styles.userNavList}>
        <li className={styles.userNavItem}>
          <div className={styles.logoutWrapper}>
            <LogOutBtn
              onLogout={onLogout}
              isHomePage={isHomePage}
              location="userNav"
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
