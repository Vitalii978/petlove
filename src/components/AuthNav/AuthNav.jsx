// Импортируем Link для навигации между страницами
import { Link } from 'react-router-dom';
import styles from './AuthNav.module.css';

const AuthNav = () => {
  return (
    // Блок навигации для неавторизованных пользователей
    <div className={styles.authNav}>
      {/* Список ссылок для авторизации */}
      <ul className={styles.authList}>
        {/* Ссылка на страницу входа (Login) */}
        <li className={styles.authItem}>
          <Link to="/login" className={styles.authLink}>
            {/* По скриншоту: "LOG IN" или "LOGO IN" */}
            LOG IN
          </Link>
        </li>

        {/* Ссылка на страницу регистрации (Register) */}
        <li className={styles.authItem}>
          <Link to="/register" className={styles.registerLink}>
            REGISTRATION
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AuthNav;
