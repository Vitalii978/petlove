import { NavLink } from 'react-router-dom';
import styles from './UserBar.module.css';
import sprite from '../../assets/icon/icon-sprite.svg';

const UserBar = ({ isMobile = false }) => { // ✅ Добавляем пропс isMobile
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
        
        {/* 🎯 Показываем имя только если НЕ мобильная версия */}
        {!isMobile && (
          <span className={styles.userName}>{user.name}</span>
        )}
      </div>

      {/* 🎯 Стрелку показываем только если НЕ мобильная версия */}
      {!isMobile && (
        <svg className={styles.arrowIcon}>
          <use href={`${sprite}#icon-arrow-right`} />
        </svg>
      )}
    </NavLink>
  );
};

export default UserBar;