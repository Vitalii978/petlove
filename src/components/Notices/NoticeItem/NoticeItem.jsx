// // src/components/Notices/NoticesItem/NoticesItem.jsx

// import { useState } from 'react';
// import sprite from '../../../assets/icon/icon-sprite.svg';
// import styles from './NoticesItem.module.css';

// const NoticesItem = ({ 
//   notice,
//   onLearnMore,
//   onToggleFavorite,
//   isFavorite = false
// }) => {
  
//   const [isHeartAnimating, setIsHeartAnimating] = useState(false);
  
//   // 🎯 Обработчик сердечка/корзинки
//   const handleHeartClick = (e) => {
//     e.stopPropagation();
//     setIsHeartAnimating(true);
//     setTimeout(() => setIsHeartAnimating(false), 300);
    
//     if (onToggleFavorite) {
//       onToggleFavorite(notice._id);
//     }
//   };
  
//   // 🎯 Обработчик Learn more
//   const handleLearnMoreClick = () => {
//     if (onLearnMore) {
//       onLearnMore(notice._id);
//     }
//   };
  
//   // 🎯 Форматирование даты как на дизайне (05.11.2019)
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
  
//   // 🎯 Получаем текст описания
//   const getDescriptionText = () => {
//     // API использует поле 'comment' (в единственном числе)
//     const commentText = notice.comment;
    
//     if (!commentText || commentText.trim() === '') {
//       return 'No description available';
//     }
    
//     const text = commentText.trim();
//     // Ограничиваем длину для отображения
//     if (text.length > 120) {
//       return text.substring(0, 120) + '...';
//     }
    
//     return text;
//   };
  
//   // 🎯 Получаем данные (без comment, так как используем notice.comment напрямую)
//   const {
//     imgURL = '',
//     title = 'No title',
//     name = 'No name',
//     birthday = '',
//     sex = 'unknown',
//     species = 'unknown',
//     category = '',
//     popularity = 0,
//     price = null
//     // Не добавляем comment здесь, так как используем notice.comment в функции
//   } = notice;
  
//   return (
//     <li className={styles.noticeItem}>
      
//       {/* 🎯 КОНТЕЙНЕР ИЗОБРАЖЕНИЯ */}
//       <div className={styles.imageContainer}>
//         <img 
//           src={imgURL || 'https://placehold.co/400x280/cccccc/666666?text=Pet+Photo'} 
//           alt={title}
//           className={styles.image}
//           loading="lazy"
//           onError={(e) => {
//             e.target.src = 'https://placehold.co/400x280/cccccc/666666?text=No+Image';
//           }}
//         />
//       </div>
      
//       {/* 🎯 КОНТЕНТ КАРТОЧКИ */}
//       <div className={styles.content}>
        
//         {/* 🎯 СТРОКА ЗАГОЛОВКА И РЕЙТИНГА */}
//         <div className={styles.titleRow}>
//           <h3 className={styles.title}>{title}</h3>
//           <div className={styles.rating}>
//             <svg className={styles.starIcon}>
//               <use href={`${sprite}#icon-star`} />
//             </svg>
//             <span className={styles.ratingValue}>{popularity || 0}</span>
//           </div>
//         </div>
        
//         {/* 🎯 ТАБЛИЦА ИНФОРМАЦИИ */}
//         <div className={styles.infoTable}>
          
//           {/* 🎯 ПЕРВАЯ СТРОКА: НАЗВАНИЯ ПОЛЕЙ */}
//           <ul className={styles.fieldNames}>
//             <li className={styles.fieldName}>Name</li>
//             <li className={styles.fieldName}>Birthday</li>
//             <li className={styles.fieldName}>Gender</li>
//             <li className={styles.fieldName}>Species</li>
//             <li className={styles.fieldName}>Category</li>
//           </ul>
          
//           {/* 🎯 ВТОРАЯ СТРОКА: ЗНАЧЕНИЯ */}
//           <ul className={styles.fieldValues}>
//             <li className={styles.fieldValue}>{name}</li>
//             <li className={styles.fieldValue}>{formatDate(birthday)}</li>
//             <li className={styles.fieldValue}>
//               {sex === 'male' ? 'Male' : sex === 'female' ? 'Female' : 'Unknown'}
//             </li>
//             <li className={styles.fieldValue}>
//               {species ? species.charAt(0).toUpperCase() + species.slice(1) : 'Unknown'}
//             </li>
//             <li className={styles.fieldValue}>
//               {category.charAt(0).toUpperCase() + category.slice(1)}
//             </li>
//           </ul>
          
//         </div>
        
//         {/* 🎯 ОПИСАНИЕ КАРТИНКИ (используем notice.comment) */}
//         <div className={styles.description}>
//           {getDescriptionText()}
//         </div>
        
//         {/* 🎯 ЦЕНА БЕЗ ФОНА */}
//         <div className={styles.pricePlain}>
//           {price && category === 'sell' ? (
//             <span className={styles.priceText}>${price}</span>
//           ) : (
//             <span className={styles.noPriceText}>No price</span>
//           )}
//         </div>
        
//         {/* 🎯 СТРОКА КНОПОК */}
//         <div className={styles.buttonsRow}>
//           {/* 🎯 КНОПКА LEARN MORE */}
//           <button 
//             className={styles.learnMoreButton}
//             onClick={handleLearnMoreClick}
//             type="button"
//           >
//             Learn more
//           </button>
          
//           {/* 🎯 СЕРДЕЧКО/КОРЗИНКА В ЖЕЛТОМ КРУЖОЧКЕ */}
//           <button 
//             className={`${styles.heartCircle} ${isHeartAnimating ? styles.heartBeat : ''}`}
//             onClick={handleHeartClick}
//             type="button"
//             aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
//           >
//             <svg className={styles.heartIcon}>
//               {isFavorite ? (
//                 <use href={`${sprite}#icon-basket`} />
//               ) : (
//                 <use href={`${sprite}#icon-heart`} />
//               )}
//             </svg>
//           </button>
//         </div>
        
//       </div>
//     </li>
//   );
// };

// export default NoticesItem;


// src/components/Notices/NoticesItem/NoticesItem.jsx

// import { useState } from 'react';
// import sprite from '../../../assets/icon/icon-sprite.svg';
// import styles from './NoticesItem.module.css';

// const NoticesItem = ({ 
//   notice,
//   onLearnMore,
//   onToggleFavorite,
//   isFavorite = false
// }) => {
  
//   const [isHeartAnimating, setIsHeartAnimating] = useState(false);
  
//   // 🎯 Обработчик сердечка/корзинки
//   const handleHeartClick = (e) => {
//     e.stopPropagation();
//     setIsHeartAnimating(true);
//     setTimeout(() => setIsHeartAnimating(false), 300);
    
//     if (onToggleFavorite) {
//       console.log(`❤️ NoticesItem: клик по сердечку, ID: ${notice._id}, текущее состояние: ${isFavorite ? 'в избранном' : 'не в избранном'}`);
//       onToggleFavorite(notice._id);
//     }
//   };
  
//   // 🎯 Обработчик Learn more
//   const handleLearnMoreClick = () => {
//     if (onLearnMore) {
//       console.log(`🔍 NoticesItem: клик по Learn more, ID: ${notice._id}`);
//       onLearnMore(notice._id);
//     }
//   };
  
//   // 🎯 Форматирование даты как на дизайне (05.11.2019)
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
  
//   // 🎯 Получаем текст описания
//   const getDescriptionText = () => {
//     // API использует поле 'comment' (в единственном числе)
//     const commentText = notice.comment;
    
//     if (!commentText || commentText.trim() === '') {
//       return 'No description available';
//     }
    
//     const text = commentText.trim();
//     // Ограничиваем длину для отображения
//     if (text.length > 120) {
//       return text.substring(0, 120) + '...';
//     }
    
//     return text;
//   };
  
//   // 🎯 Получаем данные (без comment, так как используем notice.comment напрямую)
//   const {
//     imgURL = '',
//     title = 'No title',
//     name = 'No name',
//     birthday = '',
//     sex = 'unknown',
//     species = 'unknown',
//     category = '',
//     popularity = 0,
//     price = null
//     // Не добавляем comment здесь, так как используем notice.comment в функции
//   } = notice;
  
//   return (
//     <li className={styles.noticeItem}>
      
//       {/* 🎯 КОНТЕЙНЕР ИЗОБРАЖЕНИЯ */}
//       <div className={styles.imageContainer}>
//         <img 
//           src={imgURL || 'https://placehold.co/400x280/cccccc/666666?text=Pet+Photo'} 
//           alt={title}
//           className={styles.image}
//           loading="lazy"
//           onError={(e) => {
//             e.target.src = 'https://placehold.co/400x280/cccccc/666666?text=No+Image';
//           }}
//         />
//       </div>
      
//       {/* 🎯 КОНТЕНТ КАРТОЧКИ */}
//       <div className={styles.content}>
        
//         {/* 🎯 СТРОКА ЗАГОЛОВКА И РЕЙТИНГА */}
//         <div className={styles.titleRow}>
//           <h3 className={styles.title}>{title}</h3>
//           <div className={styles.rating}>
//             <svg className={styles.starIcon}>
//               <use href={`${sprite}#icon-star`} />
//             </svg>
//             <span className={styles.ratingValue}>{popularity || 0}</span>
//           </div>
//         </div>
        
//         {/* 🎯 ТАБЛИЦА ИНФОРМАЦИИ */}
//         <div className={styles.infoTable}>
          
//           {/* 🎯 ПЕРВАЯ СТРОКА: НАЗВАНИЯ ПОЛЕЙ */}
//           <ul className={styles.fieldNames}>
//             <li className={styles.fieldName}>Name</li>
//             <li className={styles.fieldName}>Birthday</li>
//             <li className={styles.fieldName}>Gender</li>
//             <li className={styles.fieldName}>Species</li>
//             <li className={styles.fieldName}>Category</li>
//           </ul>
          
//           {/* 🎯 ВТОРАЯ СТРОКА: ЗНАЧЕНИЯ */}
//           <ul className={styles.fieldValues}>
//             <li className={styles.fieldValue}>{name}</li>
//             <li className={styles.fieldValue}>{formatDate(birthday)}</li>
//             <li className={styles.fieldValue}>
//               {sex === 'male' ? 'Male' : sex === 'female' ? 'Female' : 'Unknown'}
//             </li>
//             <li className={styles.fieldValue}>
//               {species ? species.charAt(0).toUpperCase() + species.slice(1) : 'Unknown'}
//             </li>
//             <li className={styles.fieldValue}>
//               {category.charAt(0).toUpperCase() + category.slice(1)}
//             </li>
//           </ul>
          
//         </div>
        
//         {/* 🎯 ОПИСАНИЕ КАРТИНКИ (используем notice.comment) */}
//         <div className={styles.description}>
//           {getDescriptionText()}
//         </div>
        
//         {/* 🎯 ЦЕНА БЕЗ ФОНА */}
//         <div className={styles.pricePlain}>
//           {price && category === 'sell' ? (
//             <span className={styles.priceText}>${price}</span>
//           ) : (
//             <span className={styles.noPriceText}>No price</span>
//           )}
//         </div>
        
//         {/* 🎯 СТРОКА КНОПОК */}
//         <div className={styles.buttonsRow}>
//           {/* 🎯 КНОПКА LEARN MORE */}
//           <button 
//             className={styles.learnMoreButton}
//             onClick={handleLearnMoreClick}
//             type="button"
//           >
//             Learn more
//           </button>
          
//           {/* 🎯 СЕРДЕЧКО/КОРЗИНКА В ЖЕЛТОМ КРУЖОЧКЕ */}
//           <button 
//             className={`${styles.heartCircle} ${isHeartAnimating ? styles.heartBeat : ''}`}
//             onClick={handleHeartClick}
//             type="button"
//             aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
//           >
//             <svg className={styles.heartIcon}>
//               {isFavorite ? (
//                 <use href={`${sprite}#icon-basket`} /> // 👈 КОРЗИНКА когда в избранном
//               ) : (
//                 <use href={`${sprite}#icon-heart`} />   // 👈 СЕРДЕЧКО когда не в избранном
//               )}
//             </svg>
//           </button>
//         </div>
        
//       </div>
//     </li>
//   );
// };

// export default NoticesItem;








// src/components/Notices/NoticeItem/NoticeItem.jsx

import { useState } from 'react';
import sprite from '../../../assets/icon/icon-sprite.svg';
import styles from './NoticeItem.module.css';

const NoticesItem = ({ 
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
  onOpenModal,
  favorites,
  boxFavorite,
  onDelete
}) => {
  
  const [isHeartAnimating, setIsHeartAnimating] = useState(false);
  
  if (!id) {
    console.warn('⚠️ NoticesItem: нет данных');
    return null;
  }
  
  const handleHeartClick = (e) => {
    e.stopPropagation();
    setIsHeartAnimating(true);
    setTimeout(() => setIsHeartAnimating(false), 300);
    
    if (onDelete) {
      console.log(`❤️ NoticesItem: удаление из избранного, ID: ${id}`);
      onDelete(id);
    } else if (onOpenModal) {
      console.log(`❤️ NoticesItem: открытие модалки для ID: ${id}`);
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
  
  const handleLearnMoreClick = () => {
    if (onOpenModal) {
      console.log(`🔍 NoticesItem: открытие модалки для ID: ${id}`);
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
  
  const safeImgURL = imgURL || 'https://placehold.co/400x280/cccccc/666666?text=Pet+Photo';
  const safeTitle = title || 'No title';
  const safeName = name || 'No name';
  const safeGender = gender || 'unknown';
  const safeSpecies = species || 'unknown';
  const safeCategory = category || 'unknown';
  const safePopularity = popularity || 0;
  
  return (
    // 👇 МЕНЯЕМ <li> НА <div> ИЛИ <article>
    <article className={styles.noticeItem}>
      
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
      
      <div className={styles.content}>
        
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{safeTitle}</h3>
          <div className={styles.rating}>
            <svg className={styles.starIcon}>
              <use href={`${sprite}#icon-star`} />
            </svg>
            <span className={styles.ratingValue}>{safePopularity}</span>
          </div>
        </div>
        
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
        
        <div className={styles.description}>
          {comment || 'No description available'}
        </div>
        
        <div className={styles.pricePlain}>
          {price && safeCategory === 'sell' ? (
            <span className={styles.priceText}>${price}</span>
          ) : (
            <span className={styles.noPriceText}>No price</span>
          )}
        </div>
        
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
              className={`${styles.heartCircle} ${isHeartAnimating ? styles.heartBeat : ''}`}
              onClick={handleHeartClick}
              type="button"
              aria-label={favorites ? "Remove from favorites" : "Add to favorites"}
            >
              <svg className={styles.heartIcon}>
                {favorites ? (
                  <use href={`${sprite}#icon-basket`} />
                ) : (
                  <use href={`${sprite}#icon-heart`} />
                )}
              </svg>
            </button>
          )}
          
        </div>
        
      </div>
    </article> // 👈 ЗАКРЫВАЕМ <article>
  );
};

export default NoticesItem;