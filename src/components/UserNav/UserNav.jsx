import UserBar from '../UserBar/UserBar';
import LogOutBtn from '../LogOutBtn/LogOutBtn';
import styles from './UserNav.module.css';

const UserNav = ({ onLogout, isHomePage }) => {
  return (
    <div className={styles.userNav}>
      {/* 🎯 LogOutBtn для десктопа/планшета */}
      <div className={styles.logoutWrapper}>
        <LogOutBtn onLogout={onLogout} />
      </div>

      {/* 🎯 UserBar для десктопа/планшета (полная версия) */}
      <div className={styles.userBarWrapper}>
        <UserBar isMobile={false} isHomePage={isHomePage} />
      </div>
      

    </div>
  );
};

export default UserNav;