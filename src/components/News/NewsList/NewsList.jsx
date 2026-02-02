import React from 'react';
import NewsItem from '../NewsItem/NewsItem';
import styles from './NewsList.module.css';

const NewsList = ({ 
  news = [],        // 🎯 МАССИВ новостей
  isLoading = false, // 🎯 ФЛАГ загрузки
  error = null      // 🎯 СООБЩЕНИЕ об ошибке
}) => {
  
  // 🎯 СЛУЧАЙ 1: ИДЕТ ЗАГРУЗКА ДАННЫХ
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading news...</p>
      </div>
    );
  }
  
  // 🎯 СЛУЧАЙ 2: ПРОИЗОШЛА ОШИБКА ПРИ ЗАГРУЗКЕ
  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>Error: {error}</p>
        <p>Please try again later.</p>
      </div>
    );
  }
  
  // 🎯 СЛУЧАЙ 3: НОВОСТЕЙ НЕТ (пустой массив)
  if (news.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <p>No news found.</p>
      </div>
    );
  }
  
  // 🎯 СЛУЧАЙ 4: ВСЕ НОРМАЛЬНО, ЕСТЬ НОВОСТИ
  return (
    <ul className={styles.newsList}>
      
      {/* 🎯 ИСПОЛЬЗУЕМ map() ДЛЯ ПРЕОБРАЗОВАНИЯ МАССИВА В JSX */}
      {news.map((item) => (
        // 🎯 КЛЮЧЕВОЙ МОМЕНТ: key={item.id} - ДОЛЖЕН БЫТЬ ЗДЕСЬ!
        // НЕ передаем id в NewsItem так как он там не используется
        <NewsItem
          key={item.id}           // 🎯 УНИКАЛЬНЫЙ КЛЮЧ ТОЛЬКО ЗДЕСЬ!
          // id={item.id}         // ❌ НЕ ПЕРЕДАЕМ - не используется в NewsItem
          title={item.title}      // ✅ Передаем заголовок
          description={item.description} // ✅ Передаем описание
          date={item.date}        // ✅ Передаем дату
          imageUrl={item.imageUrl} // ✅ Передаем URL изображения
          readMoreUrl={item.readMoreUrl} // ✅ Передаем URL полной статьи
        />
      ))}
    </ul>
  );
};

export default NewsList;