import { Link, useLocation } from 'react-router-dom';
import styles from './Nav.module.css';

const Nav = () => {
  const location = useLocation();

  const navItems = [
    { text: 'News', path: '/news' },
    { text: 'Find pet', path: '/notices' },
    { text: 'Our friends', path: '/friends' },
  ];

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        {navItems.map(item => {
          const isActive = location.pathname === item.path;

          return (
            <li key={item.path} className={styles.navItem}>
              <Link
                to={item.path}
                className={`${styles.navLink} ${isActive ? styles.active : ''}`}
              >
                {item.text}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Nav;
