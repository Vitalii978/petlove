// // 📁 src/components/UserCard/PetsBlock/PetsItem/PetsItem.jsx
// // 🎯 КАРТОЧКА ПИТОМЦА - ПОЛНАЯ ВЕРСИЯ

// import { useState } from 'react';
// import sprite from '../../../../assets/icon/icon-sprite.svg';
// import styles from './PetsItem.module.css';

// const PetsItem = ({ pet, onDelete }) => {
//   const [isDeleting, setIsDeleting] = useState(false);

//   console.log('🐕 PetsItem рендерит питомца:', pet?.name);
//   console.log('🗑️ onDelete есть?', !!onDelete);

//   const {
//     imgURL = '',
//     name = 'Unnamed',
//     species = 'Unknown',
//     birthday = '',
//     sex = 'unknown',
//     title = '',
//   } = pet || {};

//   const formatBirthday = dateString => {
//     if (!dateString) return 'Not specified';
//     try {
//       const date = new Date(dateString);
//       return date.toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric',
//       });
//     } catch {
//       return dateString;
//     }
//   };

//   const formatSex = sexValue => {
//     switch (sexValue) {
//       case 'male':
//         return 'Male';
//       case 'female':
//         return 'Female';
//       default:
//         return 'Unknown';
//     }
//   };

//   // ✅ ОБРАБОТЧИК УДАЛЕНИЯ
//   const handleDelete = () => {
//     console.log('🗑️ Клик по кнопке удаления для:', name);

//     // Проверяем, что onDelete существует и является функцией
//     if (typeof onDelete === 'function') {
//       setIsDeleting(true);
//       setTimeout(() => {
//         onDelete();
//       }, 300);
//     } else {
//       console.error('❌ onDelete не является функцией!');
//       alert('Delete function not available');
//     }
//   };

//   return (
//     <article
//       className={`${styles.petsItem} ${isDeleting ? styles.deleting : ''}`}
//     >
//       <div className={styles.petImageContainer}>
//         <img
//           src={
//             imgURL ||
//             'https://placehold.co/400x300/cccccc/666666?text=Pet+Photo'
//           }
//           alt={`Photo of ${name}`}
//           className={styles.petImage}
//           loading="lazy"
//           onError={e => {
//             e.target.src =
//               'https://placehold.co/400x300/cccccc/666666?text=No+Image';
//           }}
//         />

//         <div className={styles.speciesBadge}>
//           <svg className={styles.speciesIcon}>
//             <use href={`${sprite}#icon-paw`} />
//           </svg>
//           <span className={styles.speciesText}>{species}</span>
//         </div>
//       </div>

//       <div className={styles.petContent}>
//         <header className={styles.petHeader}>
//           <h4 className={styles.petName}>{name}</h4>

//           {/* ✅ КНОПКА УДАЛЕНИЯ */}
//           <button
//             className={styles.deleteButton}
//             onClick={handleDelete}
//             type="button"
//             aria-label={`Delete ${name}`}
//             disabled={isDeleting}
//           >
//             <svg className={styles.deleteIcon}>
//               <use href={`${sprite}#icon-trash`} />
//             </svg>
//           </button>
//         </header>

//         {title && <p className={styles.petDescription}>{title}</p>}

//         <ul className={styles.petInfoList}>
//           <li className={styles.petInfoItem}>
//             <svg className={styles.infoIcon} aria-hidden="true">
//               <use href={`${sprite}#icon-calendar`} />
//             </svg>
//             <div className={styles.infoContent}>
//               <span className={styles.infoLabel}>Birthday</span>
//               <span className={styles.infoValue}>
//                 {formatBirthday(birthday)}
//               </span>
//             </div>
//           </li>

//           <li className={styles.petInfoItem}>
//             <svg className={styles.infoIcon} aria-hidden="true">
//               <use href={`${sprite}#icon-gender`} />
//             </svg>
//             <div className={styles.infoContent}>
//               <span className={styles.infoLabel}>Gender</span>
//               <span className={styles.infoValue}>{formatSex(sex)}</span>
//             </div>
//           </li>
//         </ul>
//       </div>
//     </article>
//   );
// };

// export default PetsItem;

// 📁 src/components/UserCard/PetsBlock/PetsItem/PetsItem.jsx
// 🎯 КАРТОЧКА ПИТОМЦА
// ✅ ИСПРАВЛЕНО: разметка как в примере

import { useState } from 'react';
import sprite from '../../../../assets/icon/icon-sprite.svg';
import styles from './PetsItem.module.css';

const PetsItem = ({ pet, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    imgURL = '',
    name = 'Unnamed',
    species = 'Unknown',
    birthday = '',
    sex = 'unknown',
    title = '',
  } = pet || {};

  const formatBirthday = dateString => {
    if (!dateString) return 'Not specified';
    try {
      const date = new Date(dateString);
      return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
    } catch {
      return dateString;
    }
  };

  const handleDelete = () => {
    if (typeof onDelete === 'function') {
      setIsDeleting(true);
      setTimeout(() => onDelete(), 300);
    }
  };

  return (
    <ul className={`${styles.petItem} ${isDeleting ? styles.deleting : ''}`}>
      {/* 🎯 ФОТО */}
      <li className={styles.imageWrapper}>
        <img
          src={
            imgURL ||
            'https://placehold.co/400x300/cccccc/666666?text=Pet+Photo'
          }
          alt={name}
          className={styles.petImage}
        />
      </li>

      {/* 🎯 ИНФОРМАЦИЯ */}
      <li className={styles.infoWrapper}>
        <h3 className={styles.petTitle}>
          {title.length > 19 ? title.slice(0, 19) + '...' : title}
        </h3>

        <ul className={styles.petDetails}>
          <li>
            <p className={styles.detailLabel}>Name</p>
            <p className={styles.detailValue}>{name}</p>
          </li>
          <li>
            <p className={styles.detailLabel}>Birthday</p>
            <p className={styles.detailValue}>{formatBirthday(birthday)}</p>
          </li>
          <li>
            <p className={styles.detailLabel}>Sex</p>
            <p className={styles.detailValue}>{sex}</p>
          </li>
          <li>
            <p className={styles.detailLabel}>Species</p>
            <p className={styles.detailValue}>{species}</p>
          </li>
        </ul>
      </li>

      {/* 🎯 КНОПКА УДАЛЕНИЯ */}
      <li>
        <button
          className={styles.deleteButton}
          onClick={handleDelete}
          type="button"
          disabled={isDeleting}
        >
          <svg className={styles.deleteIcon}>
            <use href={`${sprite}#icon-basket`} />
          </svg>
        </button>
      </li>
    </ul>
  );
};

export default PetsItem;
