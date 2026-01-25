import UserBar from '../UserBar/UserBar';
import LogOutBtn from '../LogOutBtn/LogOutBtn';
import styles from './UserNav.module.css';

const UserNav = ({ onLogout }) => {
  return (
    <div className={styles.userNav}>
      <div className={styles.userBarWrapper}>
        <UserBar />
      </div>
      
      <div className={styles.logoutWrapper}>
        <LogOutBtn onLogout={onLogout} />
      </div>
    </div>
  );
};

export default UserNav;