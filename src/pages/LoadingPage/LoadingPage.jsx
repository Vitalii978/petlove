// // src/pages/LoadingPage/LoadingPage.jsx
// import { useState } from 'react';
// import ProgressBar from '../../components/ProgressBar/ProgressBar';
// import styles from './LoadingPage.module.css';
// import sprite from '../../assets/icon/icon-sprite.svg';

// const LoadingPage = ({ onComplete }) => {
//   const [showProgress, setShowProgress] = useState(false);

//   return (
//     <div className={styles.container}>
//       <div className={styles.overlay} />

//       {!showProgress ? (
//         <button
//           className={styles.logoButton}
//           onClick={() => setShowProgress(true)}
//         >
//           petl
//           <svg className={styles.heartIcon} viewBox="0 0 24 24">
//             <use href={`${sprite}#icon-heart-circle`} />
//           </svg>
//           ve
//         </button>
//       ) : (
//         <ProgressBar onComplete={onComplete} />
//       )}
//     </div>
//   );
// };

// export default LoadingPage;

// Импортируем необходимые инструменты
import { useState } from 'react'; // useState - для хранения состояния (показан ли прогресс)
import ProgressBar from '../../components/ProgressBar/ProgressBar'; // Компонент с крутилкой
import styles from './LoadingPage.module.css'; // Стили для этой страницы
import sprite from '../../assets/icon/icon-sprite.svg'; // Иконки (спрайт)

// 🎯 Компонент LoadingPage - получает функцию onComplete от родителя
// onComplete будет вызвана, когда загрузка закончится
const LoadingPage = ({ onComplete }) => {
  // 🎯 Состояние showProgress - показывать ли прогресс-бар
  // false - показываем логотип, true - показываем крутилку
  const [showProgress, setShowProgress] = useState(false);

  return (
    // 🎯 Основной контейнер с фоновой картинкой
    <div className={styles.container}>
      {/* Затемнение поверх картинки (чтобы логотип был лучше виден) */}
      <div className={styles.overlay} />

      {/* 🎯 Тернарный оператор: если НЕ показываем прогресс (showProgress === false) */}
      {!showProgress ? (
        // ✅ ЭТАП 1: Кнопка-логотип
        <button
          className={styles.logoButton} // Стили для красивой кнопки
          onClick={() => setShowProgress(true)} // При клике переключаем на прогресс
        >
          petl
          {/* Иконка сердечка из спрайта (символ PetLove) */}
          <svg className={styles.heartIcon} viewBox="0 0 24 24">
            <use href={`${sprite}#icon-heart-circle`} />
          </svg>
          ve
        </button>
      ) : (
        // ✅ ЭТАП 2: Прогресс-бар (крутилка с процентами)
        // Передаем onComplete, чтобы ProgressBar сообщил о завершении
        <ProgressBar onComplete={onComplete} />
      )}
    </div>
  );
};

export default LoadingPage;
