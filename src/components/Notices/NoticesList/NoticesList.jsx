// src/components/Notices/NoticesList/NoticesList.jsx
// 🎯 ИСПРАВЛЕНО: используем index как запасной вариант для key

import NoticesItem from '../NoticeItem/NoticeItem';
import styles from './NoticesList.module.css';

const NoticesList = ({ 
  notices = [],
  onLearnMore,
  onToggleFavorite,
  favorites = []
}) => {
  
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
  
  // 🎯 Функция проверки, находится ли объявление в избранном
  const isNoticeFavorite = (noticeId) => {
    if (!noticeId) return false;
    
    return favorites.some(fav => {
      if (typeof fav === 'object' && fav !== null) {
        return fav._id === noticeId || fav.id === noticeId;
      }
      return fav === noticeId;
    });
  };
  
  return (
    <ul className={styles.noticesList}>
      {notices.map((notice, index) => {  // 👈 ОСТАВИЛИ index
        if (!notice) return null;
        
        // ✅ Используем _id если есть, иначе index как запасной
        const itemKey = notice._id || `notice-${index}`;
        const isFavorite = notice._id ? isNoticeFavorite(notice._id) : false;
        
        return (
          <NoticesItem
            key={itemKey}  // ✅ index ИСПОЛЬЗУЕТСЯ здесь
            id={notice._id}
            imgURL={notice.imgURL}
            title={notice.title}
            name={notice.name}
            birthday={notice.birthday}
            gender={notice.sex}
            species={notice.species}
            category={notice.category}
            comment={notice.comment}
            price={notice.price}
            popularity={notice.popularity}
            onOpenModal={() => onLearnMore?.(notice)}
            onToggleFavorite={() => notice._id && onToggleFavorite?.(notice._id)}
            isFavorite={isFavorite}
            boxFavorite={true}
          />
        );
      })}
    </ul>
  );
};

export default NoticesList;

