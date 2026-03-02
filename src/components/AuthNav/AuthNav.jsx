import { Link } from 'react-router-dom';
import styles from './AuthNav.module.css';

const AuthNav = () => {
  return (
    <div className={styles.authNav}>
      <ul className={styles.authList}>
        <li className={styles.authItem}>
          <Link to="/login" className={styles.authLink}>
            LOG IN
          </Link>
        </li>

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
