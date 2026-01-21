// Nav.jsx - общая навигация
import { NavLink } from 'react-router-dom';
import styles from './Nav.module.css';

function Nav({closeBurgerMenu}) {
     // Массив с данными для навигации.
     const navItems = [
        { path: '/news', label: 'Новости' },
        { path: '/notices', label: 'Notices' },
        { path: '/friends', label: 'friends ' },
      ];

return (
    <nav className={styles.navigation}>
      <ul className={styles.navList}>
        {navItems.map((item) => (
          <li key={item.path} className={styles.navItem}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ''}`
              }
              onClick={closeBurgerMenu}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
)
}

export default Nav;