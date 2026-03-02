import { Link } from 'react-router-dom';
import styles from './Logo.module.css';

const Logo = () => {
  return (
    <Link to="/" className={styles.logo}>
      <span className={styles.logoText}>petl·ve</span>
    </Link>
  );
};

export default Logo;
