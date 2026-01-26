import UserBar from '../UserBar/UserBar';
import LogOutBtn from '../LogOutBtn/LogOutBtn';
import styles from './UserNav.module.css';

const UserNav = ({ onLogout }) => {
  return (
    <div className={styles.userNav}>
      {/* 🎯 UserBar для десктопа/планшета (полная версия) */}
      <div className={styles.userBarWrapper}>
        <UserBar isMobile={false} />
      </div>
      
      {/* 🎯 LogOutBtn для десктопа/планшета */}
      <div className={styles.logoutWrapper}>
        <LogOutBtn onLogout={onLogout} />
      </div>
    </div>
  );
};

export default UserNav;