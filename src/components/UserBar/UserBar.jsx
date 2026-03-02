import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getCurrentUser } from '../../utils/auth';
import styles from './UserBar.module.css';
import sprite from '../../assets/icon/icon-sprite.svg';

const UserBar = ({ isMobile = false, isHomePage = false }) => {
  const [user, setUser] = useState({
    name: 'User',
    avatar: null,
    email: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const result = await getCurrentUser();
        if (result.success && result.user) {
          setUser({
            name: result.user.name || 'User',
            avatar: result.user.avatar || null,
            email: result.user.email || '',
          });
        }
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  if (loading) {
    return <div className={styles.loading}>...</div>;
  }

  return (
    <NavLink to="/profile/favorites" className={styles.userBar}>
      <div className={styles.userInfo}>
        <div className={styles.avatarWrapper}>
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className={styles.avatar} />
          ) : (
            <svg className={styles.avatarDefault}>
              <use href={`${sprite}#icon-user`} />
            </svg>
          )}
        </div>

        {!isMobile && (
          <span
            className={`${styles.userName} ${isHomePage ? styles.userNameWhite : styles.userNameBlack}`}
          >
            {user.name}
          </span>
        )}
      </div>
    </NavLink>
  );
};

export default UserBar;
