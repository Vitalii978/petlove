// src/components/Notices/NoticesList/NoticesList.jsx

import NoticesItem from '../NoticeItem/NoticeItem';
import styles from './NoticesList.module.css';

// 🎯 КОМПОНЕНТ СПИСКА ОБЪЯВЛЕНИЙ
const NoticesList = ({ 
  notices = [],           // Массив объявлений
  onLearnMore,           // Что делать при клике "Learn more"
  onToggleFavorite,      // Что делать при клике на сердечко
  favorites = []         // Массив ID избранных объявлений
}) => {
  
  // 🎯 Проверяем есть ли объявления
  if (!notices || notices.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <div className={styles.emptyIcon}>🐾</div>
        <h3 className={styles.emptyTitle}>No notices found</h3>
        <p className={styles.emptyText}>
          Try changing your search criteria or filters
        </p>
      </div>
    );
  }
  
  // 🎯 Функция проверки - в избранном ли объявление
  const isNoticeFavorite = (noticeId) => {
    return favorites.includes(noticeId);
  };
  
  // 🎯 РЕНДЕР СПИСКА
  return (
    // 🎯 ul - неупорядоченный список (Unordered List)
    <ul className={styles.noticesList}>
      {notices.map((notice) => (
        // 🎯 Каждый элемент списка - карточка объявления
        <NoticesItem
          key={notice._id}                      // Уникальный ключ
          notice={notice}                       // Данные объявления
          isFavorite={isNoticeFavorite(notice._id)} // Закрашено ли сердечко
          onLearnMore={onLearnMore}             // Передаем функцию дальше
          onToggleFavorite={onToggleFavorite}   // Передаем функцию дальше
        />
      ))}
    </ul>
  );
};

export default NoticesList;