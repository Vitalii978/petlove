import React from 'react';
import styles from './NewsItem.module.css';

const NewsItem = ({
  title = 'Без названия',
  description = 'Нет описания',
  date = 'Дата не указана',
  imageUrl = '',
  readMoreUrl = '#',
}) => {
  const formatDate = dateString => {
    try {
      if (!dateString) return 'Дата не указана';
      const dateObj = new Date(dateString);
      if (isNaN(dateObj.getTime())) return dateString;
      const day = dateObj.getDate().toString().padStart(2, '0');
      const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
      const year = dateObj.getFullYear();
      return `${day}/${month}/${year}`;
    } catch {
      return dateString;
    }
  };

  return (
    <li className={styles.newsItem}>
      <div className={styles.imageContainer}>
        <img
          className={styles.newsImage}
          src={
            imageUrl ||
            'https://placehold.co/400x300/ff6b08/white?text=PetLove+News'
          }
          alt={title}
          loading="lazy"
          onError={e => {
            e.target.src =
              'https://placehold.co/400x300/cccccc/666666?text=Изображение+не+доступно';
            e.target.onerror = null;
          }}
        />
      </div>

      <div className={styles.newsContent}>
        <h3 className={styles.newsTitle}>{title}</h3>
        <p className={styles.newsDescription}>{description}</p>
        <div className={styles.newsDateBlock}>
          <p className={styles.newsDate}>{formatDate(date)}</p>
          <a
            className={styles.newsLink}
            href={readMoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => {
              if (readMoreUrl === '#' || !readMoreUrl) {
                e.preventDefault();
              }
            }}
          >
            Read more
          </a>
        </div>
      </div>
    </li>
  );
};

export default NewsItem;
