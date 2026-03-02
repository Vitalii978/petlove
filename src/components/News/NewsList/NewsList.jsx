import React from 'react';
import NewsItem from '../NewsItem/NewsItem';
import styles from './NewsList.module.css';

const NewsList = ({ news = [] }) => {
  if (!news || !Array.isArray(news) || news.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <p>No news found</p>
        <p className={styles.subtext}>
          Please try changing your search query or come back later.
        </p>
      </div>
    );
  }

  return (
    <ul className={styles.newsList}>
      {news.map((item, index) => {
        const itemKey = item._id || item.id || `news-item-${index}`;

        return (
          <NewsItem
            key={itemKey}
            title={item.title || 'Без названия'}
            description={item.text || 'Нет описания'}
            date={item.date || 'Дата не указана'}
            imageUrl={item.imgUrl || ''}
            readMoreUrl={item.url || '#'}
          />
        );
      })}
    </ul>
  );
};

export default NewsList;
