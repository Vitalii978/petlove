
// // src/components/Notices/NoticeItem/NoticeItem.jsx
// // 🎯 ПРОВЕРЯЕМ, ЧТО ВСЕ ПРОПСЫ ПЕРЕДАЮТСЯ ПРАВИЛЬНО

// import { useState } from 'react';
// import sprite from '../../../assets/icon/icon-sprite.svg';
// import styles from './NoticeItem.module.css';

// const NoticesItem = ({ 
//   id,
//   imgURL,
//   title,
//   name,
//   birthday,
//   gender,
//   species,
//   category,
//   comment,
//   price,
//   popularity,
//   onOpenModal,
//   boxFavorite,
//   onDelete,
//   isFavorite = false,
//   onToggleFavorite,
//   isDisabled = false
// }) => {
  
//   const [isHeartAnimating, setIsHeartAnimating] = useState(false);
  
//   if (!id) {
//     console.warn('⚠️ NoticesItem: нет id');
//     return null;
//   }

//   const handleFavoriteClick = (e) => {
//     e.stopPropagation();
//     e.preventDefault();
    
//     console.log(`🔘 Клик на кнопку для ID: ${id}, isDisabled: ${isDisabled}, isFavorite: ${isFavorite}`);
    
//     if (isDisabled) {
//       console.log('⏳ Кнопка заблокирована, пропускаем');
//       return;
//     }
    
//     setIsHeartAnimating(true);
//     setTimeout(() => setIsHeartAnimating(false), 300);
    
//     if (onToggleFavorite) {
//       console.log(`  → Вызываем onToggleFavorite с ID: ${id}`);
//       onToggleFavorite(id);
//     } else if (onDelete) {
//       console.log(`  → Вызываем onDelete с ID: ${id}`);
//       onDelete(id);
//     } else if (onOpenModal) {
//       console.log(`  → Вызываем onOpenModal с ID: ${id}`);
//       onOpenModal({
//         _id: id,
//         imgURL,
//         title,
//         name,
//         birthday,
//         sex: gender,
//         species,
//         category,
//         comment,
//         price,
//         popularity
//       });
//     }
//   };

//   const handleLearnMoreClick = (e) => {
//     e.preventDefault();
//     console.log(`🔍 Клик на Learn more для ID: ${id}`);
    
//     if (onOpenModal) {
//       onOpenModal({
//         _id: id,
//         imgURL,
//         title,
//         name,
//         birthday,
//         sex: gender,
//         species,
//         category,
//         comment,
//         price,
//         popularity
//       });
//     }
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'Not specified';
//     try {
//       const date = new Date(dateString);
//       return date.toLocaleDateString('en-GB', {
//         day: '2-digit',
//         month: '2-digit',
//         year: 'numeric'
//       }).replace(/\//g, '.');
//     } catch {
//       return dateString;
//     }
//   };

//   const safeImgURL = imgURL || 'https://placehold.co/400x280/cccccc/666666?text=Pet+Photo';
//   const safeTitle = title || 'No title';
//   const safeName = name || 'No name';
//   const safeGender = gender || 'unknown';
//   const safeSpecies = species || 'unknown';
//   const safeCategory = category || 'unknown';
//   const safePopularity = popularity || 0;

//   return (
//     <article className={styles.noticeItem}>
      
//       <div className={styles.imageContainer}>
//         <img 
//           src={safeImgURL}
//           alt={safeTitle}
//           className={styles.image}
//           loading="lazy"
//           onError={(e) => {
//             e.target.src = 'https://placehold.co/400x280/cccccc/666666?text=No+Image';
//           }}
//         />
//       </div>
      
//       <div className={styles.content}>
        
//         <div className={styles.titleRow}>
//           <h3 className={styles.title}>{safeTitle}</h3>
//           <div className={styles.rating}>
//             <svg className={styles.starIcon}>
//               <use href={`${sprite}#icon-star`} />
//             </svg>
//             <span className={styles.ratingValue}>{safePopularity}</span>
//           </div>
//         </div>
        
//         <div className={styles.infoTable}>
          
//           <ul className={styles.fieldNames}>
//             <li className={styles.fieldName}>Name</li>
//             <li className={styles.fieldName}>Birthday</li>
//             <li className={styles.fieldName}>Gender</li>
//             <li className={styles.fieldName}>Species</li>
//             <li className={styles.fieldName}>Category</li>
//           </ul>
          
//           <ul className={styles.fieldValues}>
//             <li className={styles.fieldValue}>{safeName}</li>
//             <li className={styles.fieldValue}>{formatDate(birthday)}</li>
//             <li className={styles.fieldValue}>
//               {safeGender === 'male' ? 'Male' : 
//                safeGender === 'female' ? 'Female' : 'Unknown'}
//             </li>
//             <li className={styles.fieldValue}>
//               {safeSpecies ? safeSpecies.charAt(0).toUpperCase() + safeSpecies.slice(1) : 'Unknown'}
//             </li>
//             <li className={styles.fieldValue}>
//               {safeCategory.charAt(0).toUpperCase() + safeCategory.slice(1)}
//             </li>
//           </ul>
          
//         </div>
        
//         <div className={styles.description}>
//           {comment || 'No description available'}
//         </div>
        
//         <div className={styles.pricePlain}>
//           {price && safeCategory === 'sell' ? (
//             <span className={styles.priceText}>${price}</span>
//           ) : (
//             <span className={styles.noPriceText}>No price</span>
//           )}
//         </div>
        
//         <div className={styles.buttonsRow}>
          
//           <button 
//             className={styles.learnMoreButton}
//             onClick={handleLearnMoreClick}
//             type="button"
//           >
//             Learn more
//           </button>
          
//           {boxFavorite && (
//             <button 
//               className={`${styles.heartCircle} 
//                 ${isHeartAnimating ? styles.heartBeat : ''} 
//                 ${isDisabled ? styles.disabled : ''}`}
//               onClick={handleFavoriteClick}
//               type="button"
//               disabled={isDisabled}
//               aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
//             >
//               <svg className={styles.heartIcon}>
//                 {isFavorite ? (
//                   <use href={`${sprite}#icon-basket`} />
//                 ) : (
//                   <use href={`${sprite}#icon-heart`} />
//                 )}
//               </svg>
//             </button>
//           )}
          
//         </div>
        
//       </div>
//     </article>
//   );
// };

// export default NoticesItem;







// src/components/Notices/NoticeItem/NoticeItem.jsx
// 🎯 КОМПОНЕНТ КАРТОЧКИ ОБЪЯВЛЕНИЯ
// ✅ ИСПРАВЛЕНО: правильная логика вызова функций

import { useState } from 'react';
import sprite from '../../../assets/icon/icon-sprite.svg';
import styles from './NoticeItem.module.css';

const NoticesItem = ({ 
  // 📌 ОСНОВНЫЕ ДАННЫЕ ОБЪЯВЛЕНИЯ
  id,
  imgURL,
  title,
  name,
  birthday,
  gender,
  species,
  category,
  comment,
  price,
  popularity,
  
  // 📌 ФУНКЦИИ И ФЛАГИ
  onOpenModal,
  boxFavorite,
  onDelete,
  isFavorite = false,
  onToggleFavorite,
  isDisabled = false
}) => {
  
  // 🟢 ЛОКАЛЬНОЕ СОСТОЯНИЕ ДЛЯ АНИМАЦИИ
  const [isHeartAnimating, setIsHeartAnimating] = useState(false);
  
  if (!id) {
    console.warn('⚠️ NoticesItem: нет id');
    return null;
  }

  // =============== 🎯 ОБРАБОТЧИК КЛИКА НА СЕРДЕЧКО/КОРЗИНУ ===============
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    console.log(`🔘 Клик на кнопку для ID: ${id}, isDisabled: ${isDisabled}, isFavorite: ${isFavorite}`);
    
    // Если кнопка заблокирована - ничего не делаем
    if (isDisabled) {
      console.log('⏳ Кнопка заблокирована, пропускаем');
      return;
    }
    
    // Анимация
    setIsHeartAnimating(true);
    setTimeout(() => setIsHeartAnimating(false), 300);
    
    // 🔥 ВАЖНО: правильный выбор функции
    // Приоритет: onDelete (корзина) > onToggleFavorite (сердечко) > onOpenModal (модалка)
    if (onDelete) {
      // Если есть onDelete - значит это корзина (удаление)
      console.log(`  → Вызываем onDelete с ID: ${id}`);
      onDelete(id);
    } else if (onToggleFavorite) {
      // Если есть onToggleFavorite - значит это сердечко (добавление)
      console.log(`  → Вызываем onToggleFavorite с ID: ${id}`);
      onToggleFavorite(id);
    } else if (onOpenModal) {
      // Если нет ни того, ни другого - открываем модалку
      console.log(`  → Вызываем onOpenModal с ID: ${id}`);
      onOpenModal({
        _id: id,
        imgURL,
        title,
        name,
        birthday,
        sex: gender,
        species,
        category,
        comment,
        price,
        popularity
      });
    }
  };

  // =============== 🎯 ОБРАБОТЧИК КЛИКА НА LEARN MORE ===============
  const handleLearnMoreClick = (e) => {
    e.preventDefault();
    console.log(`🔍 Клик на Learn more для ID: ${id}`);
    
    if (onOpenModal) {
      onOpenModal({
        _id: id,
        imgURL,
        title,
        name,
        birthday,
        sex: gender,
        species,
        category,
        comment,
        price,
        popularity
      });
    }
  };

  // =============== 🎯 ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ===============
  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).replace(/\//g, '.');
    } catch {
      return dateString;
    }
  };

  // Значения по умолчанию
  const safeImgURL = imgURL || 'https://placehold.co/400x280/cccccc/666666?text=Pet+Photo';
  const safeTitle = title || 'No title';
  const safeName = name || 'No name';
  const safeGender = gender || 'unknown';
  const safeSpecies = species || 'unknown';
  const safeCategory = category || 'unknown';
  const safePopularity = popularity || 0;

  // =============== 🎯 РЕНДЕР КОМПОНЕНТА ===============
  return (
    <article className={styles.noticeItem}>
      
      {/* БЛОК С ФОТОГРАФИЕЙ */}
      <div className={styles.imageContainer}>
        <img 
          src={safeImgURL}
          alt={safeTitle}
          className={styles.image}
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://placehold.co/400x280/cccccc/666666?text=No+Image';
          }}
        />
      </div>
      
      {/* БЛОК С ИНФОРМАЦИЕЙ */}
      <div className={styles.content}>
        
        {/* ВЕРХНЯЯ СТРОКА: Заголовок и рейтинг */}
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{safeTitle}</h3>
          <div className={styles.rating}>
            <svg className={styles.starIcon}>
              <use href={`${sprite}#icon-star`} />
            </svg>
            <span className={styles.ratingValue}>{safePopularity}</span>
          </div>
        </div>
        
        {/* ТАБЛИЦА С ДАННЫМИ */}
        <div className={styles.infoTable}>
          
          <ul className={styles.fieldNames}>
            <li className={styles.fieldName}>Name</li>
            <li className={styles.fieldName}>Birthday</li>
            <li className={styles.fieldName}>Gender</li>
            <li className={styles.fieldName}>Species</li>
            <li className={styles.fieldName}>Category</li>
          </ul>
          
          <ul className={styles.fieldValues}>
            <li className={styles.fieldValue}>{safeName}</li>
            <li className={styles.fieldValue}>{formatDate(birthday)}</li>
            <li className={styles.fieldValue}>
              {safeGender === 'male' ? 'Male' : 
               safeGender === 'female' ? 'Female' : 'Unknown'}
            </li>
            <li className={styles.fieldValue}>
              {safeSpecies ? safeSpecies.charAt(0).toUpperCase() + safeSpecies.slice(1) : 'Unknown'}
            </li>
            <li className={styles.fieldValue}>
              {safeCategory.charAt(0).toUpperCase() + safeCategory.slice(1)}
            </li>
          </ul>
          
        </div>
        
        {/* ОПИСАНИЕ */}
        <div className={styles.description}>
          {comment || 'No description available'}
        </div>
        
        {/* ЦЕНА */}
        <div className={styles.pricePlain}>
          {price && safeCategory === 'sell' ? (
            <span className={styles.priceText}>${price}</span>
          ) : (
            <span className={styles.noPriceText}>No price</span>
          )}
        </div>
        
        {/* КНОПКИ */}
        <div className={styles.buttonsRow}>
          
          <button 
            className={styles.learnMoreButton}
            onClick={handleLearnMoreClick}
            type="button"
          >
            Learn more
          </button>
          
          {boxFavorite && (
            <button 
              className={`${styles.heartCircle} 
                ${isHeartAnimating ? styles.heartBeat : ''} 
                ${isDisabled ? styles.disabled : ''}`}
              onClick={handleFavoriteClick}
              type="button"
              disabled={isDisabled}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <svg className={styles.heartIcon}>
                {isFavorite ? (
                  // Если в избранном - показываем КОРЗИНУ
                  <use href={`${sprite}#icon-basket`} />
                ) : (
                  // Если не в избранном - показываем СЕРДЕЧКО
                  <use href={`${sprite}#icon-heart`} />
                )}
              </svg>
            </button>
          )}
          
        </div>
        
      </div>
    </article>
  );
};

export default NoticesItem;