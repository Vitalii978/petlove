// Logo.jsx - компонент логотипа
import { Link } from 'react-router-dom';
import styles from './Logo.module.css';

// Функция Logo принимает пропс closeBurgerMenu (для мобильной версии)
function Logo({ closeBurgerMenu }) {
    return (
        <div className={styles.logo}>
            {/* Link ведёт на главную страницу */}

        <Link to="/"
          className={styles.logoLink}
          onClick={closeBurgerMenu}  // При клике закрываем бургер-меню
        > 
          {/* Эмоджи временно, потом заменим на SVG */}          
            <span className={styles.logoIcon}>🐾</span>
            <span className={styles.logoText}>Petlove</span>
        </Link>
        </div>
    );
}

export default Logo;