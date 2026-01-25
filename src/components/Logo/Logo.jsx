// Импортируем Link из react-router-dom для навигации без перезагрузки страницы
import { Link } from 'react-router-dom';
import styles from './Logo.module.css';

const Logo = () => {
  return (
    // Логотип должен быть ссылкой на главную страницу
    // Link работает как <a href>, но не перезагружает страницу (SPA - Single Page Application)
    <Link to="/" className={styles.logo}>
      
      {/* Текст логотипа */}
      {/* По дизайну из скриншота: "petl·ve" с точкой посередине */}
      <span className={styles.logoText}>petl·ve</span>
      
      {/* Можно добавить иконку рядом с текстом, если она есть в дизайне */}
      {/* <svg className={styles.logoIcon}>...</svg> */}
    </Link>
  );
};

export default Logo;