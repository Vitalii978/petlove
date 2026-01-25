// Импортируем Link для навигации и useLocation для определения активной страницы
import { Link, useLocation } from 'react-router-dom';
import styles from './Nav.module.css';

const Nav = () => {
  // Хук useLocation возвращает текущий URL (например, "/news")
  const location = useLocation();
  
  // Массив с данными для навигации
  // Каждый объект содержит текст ссылки и путь
  const navItems = [
    { text: 'News', path: '/news' },
    { text: 'Find pet', path: '/notices' }, // По ТЗ: Find pet → /notices
    { text: 'Our friends', path: '/friends' },
  ];

  return (
    // nav - семантический HTML5 тег для навигации
    <nav className={styles.nav}>
      
      {/* ul - неупорядоченный список для пунктов меню */}
      <ul className={styles.navList}>
        
        {/* Проходим по массиву navItems и создаем li для каждого пункта */}
        {navItems.map((item) => {
          // Проверяем, является ли текущая страница активной
          const isActive = location.pathname === item.path;
          
          return (
            // li - элемент списка
            // key - обязательный атрибут при использовании map()
            <li key={item.path} className={styles.navItem}>
              
              {/* Ссылка-пункт меню */}
              <Link 
                to={item.path}
                // Добавляем класс active если страница активна
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