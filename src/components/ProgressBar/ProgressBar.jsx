// // src/components/ProgressBar/ProgressBar.jsx
// import { useEffect, useState } from 'react';
// import styles from './ProgressBar.module.css';

// const ProgressBar = ({ onComplete }) => {
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setProgress(p => {
//         if (p >= 100) {
//           clearInterval(timer);
//           setTimeout(onComplete, 200);
//           return 100;
//         }
//         return p + 1;
//       });
//     }, 10); // 10ms * 100 = 1 секунда

//     return () => clearInterval(timer);
//   }, [onComplete]);

//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.spinner} />
//       <div className={styles.progressText}>{progress}%</div>
//     </div>
//   );
// };

// export default ProgressBar;

// Импортируем хуки для работы с состоянием и эффектами
import { useEffect, useState } from 'react';
// useEffect - выполняет код после рендера (для таймера)
// useState - хранит текущий прогресс (0-100)
import styles from './ProgressBar.module.css'; // Стили для крутилки

// 🎯 Компонент ProgressBar - показывает крутящийся спиннер с процентами
// Получает функцию onComplete, которую вызовет когда прогресс достигнет 100%
const ProgressBar = ({ onComplete }) => {
  // 🎯 Состояние progress - текущий процент загрузки (0-100)
  const [progress, setProgress] = useState(0);

  // 🎯 useEffect - запускается один раз при появлении компонента
  useEffect(() => {
    // Создаем интервал, который будет срабатывать каждые 10 миллисекунд
    // 10ms * 100 = 1000ms = 1 секунда
    const timer = setInterval(() => {
      // setProgress получает предыдущее значение и возвращает новое
      setProgress(p => {
        // Если прогресс достиг 100 или больше
        if (p >= 100) {
          clearInterval(timer); // Останавливаем таймер
          setTimeout(onComplete, 200); // Через 200ms вызываем onComplete
          return 100; // Устанавливаем 100%
        }
        // Иначе увеличиваем на 1
        return p + 1;
      });
    }, 10); // 👈 10 миллисекунд между шагами = 1 секунда на всё

    // 🎯 Функция очистки - выполняется при удалении компонента
    return () => clearInterval(timer); // Убиваем таймер, чтобы не было утечек памяти
  }, [onComplete]); // 👈 Зависимость: onComplete (если изменится, эффект перезапустится)

  return (
    // 🎯 Контейнер для крутилки
    <div className={styles.wrapper}>
      {/* Крутящийся спиннер (стили анимации в CSS) */}
      <div className={styles.spinner} />
      {/* Текст с процентами посередине */}
      <div className={styles.progressText}>{progress}%</div>
    </div>
  );
};

export default ProgressBar;
