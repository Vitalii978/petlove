// AuthNav.jsx - ИСПРАВЛЕННАЯ ВЕРСИЯ
import { NavLink } from 'react-router-dom';
import styles from './AuthNav.module.css';

function AuthNav({ closeBurgerMenu }) {
  return (
    // Изменяем div на ul с правильным классом
    <ul className={styles.authNav}>
      <li className={styles.authNavItem}>
        <NavLink
          to="/register"
          className={styles.registerBtn}
          onClick={closeBurgerMenu}
        >
          Register
        </NavLink>
      </li>
      <li className={styles.authNavItem}>
        <NavLink
          to="/login"
          className={styles.loginBtn}
          onClick={closeBurgerMenu}
        >
          Login
        </NavLink>
      </li>
    </ul>
  );
}

export default AuthNav;