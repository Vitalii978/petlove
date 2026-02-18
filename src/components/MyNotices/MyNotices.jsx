// // src/components/MyNotices/MyNotices.jsx

// /**
//  * КОМПОНЕНТ НАВИГАЦИИ ПО МОИМ ОБЪЯВЛЕНИЯМ
//  *
//  * Содержит табы для переключения между избранными и просмотренными
//  * Использует вложенные маршруты React Router
//  */

// import { Suspense } from "react";
// import { NavLink, Outlet } from "react-router-dom";
// import clsx from "clsx";
// import styles from "./MyNotices.module.css";

// export default function MyNotices() {
//   /**
//    * Функция для определения активного класса ссылки
//    */
//   const buildLinkClass = ({ isActive }) => {
//     return clsx(styles.link, isActive && styles.active);
//   };

//   return (
//     <div className={styles.myNotices}>
//       {/* Навигация по табам */}
//       <nav className={styles.navigation}>
//         <NavLink
//           to="/profile/favorites"
//           className={buildLinkClass}
//         >
//           My favorite pets
//         </NavLink>
//         <NavLink
//           to="/profile/viewed"
//           className={buildLinkClass}
//         >
//           Viewed
//         </NavLink>
//       </nav>

//       {/* Контейнер для дочерних компонентов */}
//       <div className={styles.content}>
//         <Suspense fallback={
//           <div className={styles.loading}>
//             <div className={styles.spinner}></div>
//             <p>Loading your notices...</p>
//           </div>
//         }>
//           <Outlet />
//         </Suspense>
//       </div>
//     </div>
//   );
// }

// // src/components/MyNotices/MyNotices.jsx  15.02

// import { Suspense } from "react";
// import { NavLink, Outlet } from "react-router-dom";
// import clsx from "clsx";
// import styles from "./MyNotices.module.css";

// export default function MyNotices() {
//   const buildLinkClass = ({ isActive }) => {
//     return clsx(styles.link, isActive && styles.active);
//   };

//   return (
//     <div className={styles.myNotices}>
//       {/* Навигация */}
//       <nav className={styles.navigation}>
//         <NavLink to="/profile/favorites" className={buildLinkClass}>
//           My favorite pets
//         </NavLink>
//         <NavLink to="/profile/viewed" className={buildLinkClass}>
//           Viewed
//         </NavLink>
//       </nav>

//       {/* 👇 Outlet - сюда вставляются FavoritesList или ViewedList */}
//       <div className={styles.content}>
//         <Suspense fallback={<div>Loading...</div>}>
//           <Outlet />
//         </Suspense>
//       </div>
//     </div>
//   );
// }

// // 📁 src/components/MyNotices/MyNotices.jsx
// // 🎯 ТЗ: Компонент містить таби: My favorites pets та Viewed

// import { Suspense } from "react";
// import { NavLink, Outlet } from "react-router-dom";
// import clsx from "clsx";
// import styles from "./MyNotices.module.css";

// export default function MyNotices() {
//   const buildLinkClass = ({ isActive }) => {
//     return clsx(styles.link, isActive && styles.active);
//   };

//   return (
//     <div className={styles.myNotices}>
//       {/* 🎯 ТАБИ: навігація */}
//       <nav className={styles.navigation}>
//         <NavLink to="/profile/favorites" className={buildLinkClass} end>
//           My favorite pets
//         </NavLink>
//         <NavLink to="/profile/viewed" className={buildLinkClass} end>
//           Viewed
//         </NavLink>
//       </nav>

//       {/* 🎯 Outlet - СЮДИ ВСТАВЛЯЄТЬСЯ ViewedList або FavoritesList */}
//       {/* ВОНИ ВЖЕ МАЮТЬ СВОЮ РОЗМІТКУ З ul/li */}
//       <Suspense fallback={<div className={styles.loading}>Loading...</div>}>
//         <Outlet />
//       </Suspense>
//     </div>
//   );
// }

// 📁 src/components/MyNotices/MyNotices.jsx
// 🎯 ЭТО ГЛАВНЫЙ КОМПОНЕНТ - ОН УПРАВЛЯЕТ ВКЛАДКАМИ

// Импортируем React и специальные компоненты для работы с вкладками
import { Suspense } from 'react'; // Показывает "Загрузка..." пока контент подгружается
import { NavLink, Outlet } from 'react-router-dom'; // Для навигации между вкладками
import clsx from 'clsx'; // Удобно склеивать CSS классы
import styles from './MyNotices.module.css'; // Стили для этого компонента

// 🎯 ГЛАВНАЯ ФУНКЦИЯ КОМПОНЕНТА
export default function MyNotices() {
  // 🎯 ФУНКЦИЯ ДЛЯ ОПРЕДЕЛЕНИЯ, КАКАЯ ВКЛАДКА АКТИВНАЯ
  // buildLinkClass - это как "подсветка активной вкладки"
  // Представьте, что у вас в телефоне открыто несколько вкладок браузера
  // Та, которая открыта сейчас - подсвечена по-особенному
  const buildLinkClass = ({ isActive }) => {
    // clsx - это как "склейщик" классов
    // styles.link - это базовый класс для всех вкладок
    // styles.active - добавляется ТОЛЬКО если isActive === true
    return clsx(styles.link, isActive && styles.active);
  };

  // 🎯 ЧТО ВИДИТ ПОЛЬЗОВАТЕЛЬ
  return (
    // Главный контейнер компонента
    <div className={styles.myNotices}>
      {/* 🎯 НАВИГАЦИЯ ПО ВКЛАДКАМ */}
      {/* <nav> - семантический тег для навигации (как в реальной папке с разделителями) */}
      <nav className={styles.navigation}>
        {/* 🎯 ПЕРВАЯ ВКЛАДКА: "My favorite pets" */}
        {/* NavLink - специальный компонент React Router для ссылок */}
        {/* to="/profile/favorites" - при клике переходим по адресу */}
        {/* className={buildLinkClass} - определяем, активна ли вкладка */}
        {/* end - означает, что вкладка активна ТОЛЬКО если адрес СОВПАДАЕТ полностью */}
        <NavLink to="/profile/favorites" className={buildLinkClass} end>
          My favorite pets {/* Текст на вкладке */}
        </NavLink>

        {/* 🎯 ВТОРАЯ ВКЛАДКА: "Viewed" */}
        <NavLink to="/profile/viewed" className={buildLinkClass} end>
          Viewed {/* Текст на вкладке */}
        </NavLink>
      </nav>

      {/* 🎯 Outlet - ЭТО КАК "ОКНО", КУДА ВСТАВЛЯЕТСЯ СОДЕРЖИМОЕ ВКЛАДКИ */}
      {/* Представьте телевизор: нажимаете кнопку "1" - показывает 1 канал */}
      {/* Нажимаете "2" - показывает 2 канал. Outlet - это экран телевизора */}
      {/* А каналы - это FavoritesList и ViewedList */}

      {/* Suspense - это как "заставка" пока канал загружается */}
      <Suspense fallback={<div className={styles.loading}>Loading...</div>}>
        <Outlet /> {/* СЮДА ВСТАВИТСЯ ЛИБО FavoritesList, ЛИБО ViewedList */}
      </Suspense>
    </div>
  );
}
