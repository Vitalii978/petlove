import { NavLink } from 'react-router-dom';
import styles from './UserBar.module.css';
import sprite from '../../assets/icon/icon-sprite.svg';

const UserBar = ({ isMobile = false, isHomePage = false  }) => { // ✅ Добавляем пропс isMobile
  const user = {
    name: 'Anna',
    avatar: null,
    email: 'anna@example.com'
  };

  return (
    <NavLink to="/profile" className={styles.userBar}>
      <div className={styles.userInfo}>
        <div className={styles.avatarWrapper}>
          {user.avatar ? (
            <img 
              src={user.avatar} 
              alt={user.name}
              className={styles.avatar}
            />
          ) : (
            <svg className={styles.avatarDefault}>
              <use href={`${sprite}#icon-user`} />
            </svg>
          )}
        </div>
        
        {!isMobile && (
          // ✅ Добавляем класс в зависимости от isHomePage
          <span className={`${styles.userName} ${isHomePage ? styles.userNameWhite : styles.userNameBlack}`}>
            {user.name}
          </span>
        )}
      </div>

    </NavLink>
  );
};

export default UserBar;