// Импортируем React
import React from 'react';
// Импортируем CSS-модуль для стилей
import styles from './Loader.module.css';

// Создаем компонент Loader
const Loader = () => {
  return (
    // Основной контейнер для лоадера
    // Он будет центрировать анимацию на экране
    <div className={styles.loaderContainer}>
      {/* Сам элемент анимации.
          Это просто div, который мы заставим вращаться с помощью CSS. */}
      <div className={styles.loader}></div>

      {/* Можно добавить текст под анимацией */}
      <p className={styles.loaderText}>Loading...</p>
    </div>
  );
};

// Экспортируем компонент
export default Loader;
