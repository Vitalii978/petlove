import NoticesItem from '../NoticeItem/NoticeItem';
import styles from './NoticesList.module.css';

const NoticesList = ({
  notices = [],
  onLearnMore,
  onToggleFavorite,
  favorites = [],
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

  const isNoticeFavorite = noticeId => {
    if (!noticeId) return false;
    return favorites.includes(noticeId);
  };

  return (
    <ul className={styles.noticesList}>
      {notices.map(notice => {
        if (!notice || !notice._id) {
          return null;
        }

        const isFavorite = isNoticeFavorite(notice._id);

        return (
          <li key={notice._id} className={styles.oneCard}>
            <NoticesItem
              key={notice._id}
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
              onToggleFavorite={() => onToggleFavorite?.(notice._id)}
              isFavorite={isFavorite}
              boxFavorite={true}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default NoticesList;
