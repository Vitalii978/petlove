// // src/components/Notices/NoticesList/NoticesList.jsx

// import NoticesItem from '../NoticeItem/NoticeItem';
// import styles from './NoticesList.module.css';

// // 🎯 КОМПОНЕНТ СПИСКА ОБЪЯВЛЕНИЙ
// const NoticesList = ({ 
//   notices = [],           // Массив объявлений
//   onLearnMore,           // Что делать при клике "Learn more"
//   onToggleFavorite,      // Что делать при клике на сердечко
//   favorites = []         // Массив ID избранных объявлений
// }) => {
  
//   // 🎯 Проверяем есть ли объявления
//   if (!notices || notices.length === 0) {
//     return (
//       <div className={styles.emptyContainer}>
//         <div className={styles.emptyIcon}>🐾</div>
//         <h3 className={styles.emptyTitle}>No notices found</h3>
//         <p className={styles.emptyText}>
//           Try changing your search criteria or filters
//         </p>
//       </div>
//     );
//   }
  
//   // 🎯 Функция проверки - в избранном ли объявление
//   const isNoticeFavorite = (noticeId) => {
//     return favorites.includes(noticeId);
//   };
  
//   // 🎯 РЕНДЕР СПИСКА
//   return (
//     // 🎯 ul - неупорядоченный список (Unordered List)
//     <ul className={styles.noticesList}>
//       {notices.map((notice) => (
//         // 🎯 Каждый элемент списка - карточка объявления
//         <NoticesItem
//           key={notice._id}                      // Уникальный ключ
//           notice={notice}                       // Данные объявления
//           isFavorite={isNoticeFavorite(notice._id)} // Закрашено ли сердечко
//           onLearnMore={onLearnMore}             // Передаем функцию дальше
//           onToggleFavorite={onToggleFavorite}   // Передаем функцию дальше
//         />
//       ))}
//     </ul>
//   );
// };

// export default NoticesList;








// // src/components/Notices/NoticesList/NoticesList.jsx

// import NoticesItem from '../NoticeItem/NoticeItem';
// import styles from './NoticesList.module.css';

// // 🎯 КОМПОНЕНТ СПИСКА ОБЪЯВЛЕНИЙ
// const NoticesList = ({ 
//   notices = [],           // Массив объявлений
//   onLearnMore,           // Что делать при клике "Learn more"
//   onToggleFavorite,      // Что делать при клике на сердечко
//   favorites = []         // Массив ID избранных объявлений
// }) => {
  
//   // 🎯 Проверяем есть ли объявления
//   if (!notices || notices.length === 0) {
//     return (
//       <div className={styles.emptyContainer}>
//         <div className={styles.emptyIcon}>🐾</div>
//         <h3 className={styles.emptyTitle}>No notices found</h3>
//         <p className={styles.emptyText}>
//           Try changing your search criteria or filters
//         </p>
//       </div>
//     );
//   }
  
//   // 🎯 Функция проверки - в избранном ли объявление
//   const isNoticeFavorite = (noticeId) => {
//     // 👇 Добавляем логирование для отладки
//     console.log(`🔍 Проверка объявления ${noticeId}:`, {
//       вМассиве: favorites.includes(noticeId),
//       массивFavorites: favorites
//     });
//     return favorites.includes(noticeId);
//   };
  
//   // 🎯 РЕНДЕР СПИСКА
//   return (
//     // 🎯 ul - неупорядоченный список (Unordered List)
//     <ul className={styles.noticesList}>
//       {notices.map((notice) => {
//         // 👇 Логируем каждое объявление
//         console.log(`📦 Рендерим объявление ${notice._id}:`, {
//           название: notice.title,
//           вИзбранном: isNoticeFavorite(notice._id)
//         });
        
//         return (
//           // 🎯 Каждый элемент списка - карточка объявления
//           <NoticesItem
//             key={notice._id}                      // Уникальный ключ
//             notice={notice}                       // Данные объявления
//             isFavorite={isNoticeFavorite(notice._id)} // Закрашено ли сердечко
//             onLearnMore={onLearnMore}             // Передаем функцию дальше
//             onToggleFavorite={onToggleFavorite}   // Передаем функцию дальше
//           />
//         );
//       })}
//     </ul>
//   );
// };

// export default NoticesList;










// // src/components/Notices/NoticesList/NoticesList.jsx

// import NoticesItem from '../NoticeItem/NoticeItem';
// import styles from './NoticesList.module.css';

// const NoticesList = ({ 
//   notices = [],
//   onLearnMore,
//   onToggleFavorite,
//   favorites = []
// }) => {
  
//   console.log('📦 NoticesList получил данные:', {
//     количество: notices.length,
//     первыйЭлемент: notices[0]
//   });
  
//   if (!notices || notices.length === 0) {
//     return (
//       <div className={styles.emptyContainer}>
//         <div className={styles.emptyIcon}>🐾</div>
//         <h3 className={styles.emptyTitle}>No notices found</h3>
//         <p className={styles.emptyText}>
//           Try changing your search criteria or filters
//         </p>
//       </div>
//     );
//   }
  
//   const isNoticeFavorite = (noticeId) => {
//     return favorites.includes(noticeId);
//   };
  
//   return (
//     <ul className={styles.noticesList}>
//       {notices.map((notice, index) => {
//         // ✅ Используем _id если есть, иначе index (как запасной вариант)
//         const itemKey = notice?._id || `notice-${index}`;
        
//         return (
//           <NoticesItem
//             key={itemKey}  // 👈 СТАБИЛЬНЫЙ КЛЮЧ
//             id={notice?._id}
//             imgURL={notice?.imgURL}
//             title={notice?.title}
//             name={notice?.name}
//             birthday={notice?.birthday}
//             gender={notice?.sex}
//             species={notice?.species}
//             category={notice?.category}
//             comment={notice?.comment}
//             price={notice?.price}
//             popularity={notice?.popularity}
//             onOpenModal={() => onLearnMore?.(notice?._id)}
//             onToggleFavorite={() => onToggleFavorite?.(notice?._id)}
//             isFavorite={isNoticeFavorite(notice?._id)}
//             favorites={false}
//             boxFavorite={true}
//           />
//         );
//       })}
//     </ul>
//   );
// };

// export default NoticesList;



// src/components/Notices/NoticesList/NoticesList.jsx

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
  
  const isNoticeFavorite = (noticeId) => {
    return favorites.includes(noticeId);
  };
  
  return (
    <ul className={styles.noticesList}>
      {notices.map((notice, index) => {
        const itemKey = notice?._id || `notice-${index}`;
        
        return (
          <NoticesItem
            key={itemKey}
            id={notice?._id}
            imgURL={notice?.imgURL}
            title={notice?.title}
            name={notice?.name}
            birthday={notice?.birthday}
            gender={notice?.sex}
            species={notice?.species}
            category={notice?.category}
            comment={notice?.comment}
            price={notice?.price}
            popularity={notice?.popularity}
            onOpenModal={() => onLearnMore?.(notice)}
            onToggleFavorite={() => onToggleFavorite?.(notice?._id)}
            isFavorite={isNoticeFavorite(notice?._id)}
            favorites={false}
            boxFavorite={true}
          />
        );
      })}
    </ul>
  );
};

export default NoticesList;