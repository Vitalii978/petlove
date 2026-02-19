// // (МОЖНО ИСПОЛЬЗОВАТЬ)
// src/components/Notices/NoticesFilters/NoticesFilters.jsx
// // 🎯 ИСПРАВЛЕНО: логика Popular и Expensive

// import { useState } from 'react';
// import SearchField from '../../SearchField/SearchField';
// import styles from './NoticesFilters.module.css';

// const NoticesFilters = ({
//   onFilterChange,
//   onSearch,
//   onReset,
//   filtersData = {},
// }) => {
//   const [category, setCategory] = useState('');
//   const [sex, setSex] = useState('');
//   const [species, setSpecies] = useState('');
//   const [locationId, setLocationId] = useState('');
//   const [popularity, setPopularity] = useState(''); // 'popular' или 'unpopular'
//   const [price, setPrice] = useState(''); // 'cheap' или 'expensive'

//   // Данные для фильтров
//   const categoryOptions = filtersData.categories || [];
//   const sexOptions = filtersData.sex || [];
//   const speciesOptions = filtersData.species || [];
//   const locationOptions = filtersData.cities || [];

//   const handleCategoryChange = e => {
//     const value = e.target.value;
//     setCategory(value);
//     if (onFilterChange) onFilterChange('category', value);
//   };

//   const handleSexChange = e => {
//     const value = e.target.value;
//     setSex(value);
//     if (onFilterChange) onFilterChange('sex', value);
//   };

//   const handleSpeciesChange = e => {
//     const value = e.target.value;
//     setSpecies(value);
//     if (onFilterChange) onFilterChange('species', value);
//   };

//   const handleLocationChange = e => {
//     const value = e.target.value;
//     setLocationId(value);
//     if (onFilterChange) onFilterChange('locationId', value);
//   };

//   // 🎯 Popular (от максимального рейтинга к минимальному)
//   const handlePopularChange = () => {
//     if (popularity === 'popular') {
//       // Если уже активно - отключаем
//       setPopularity('');
//       if (onFilterChange) onFilterChange('byPopularity', false);
//     } else {
//       // Активируем popular, сбрасываем unpopular
//       setPopularity('popular');
//       if (onFilterChange) {
//         onFilterChange('byPopularity', 'popular'); // 👈 Передаем 'popular' для сортировки по убыванию
//       }
//     }
//   };

//   // 🎯 Unpopular (от минимального рейтинга к максимальному)
//   const handleUnpopularChange = () => {
//     if (popularity === 'unpopular') {
//       setPopularity('');
//       if (onFilterChange) onFilterChange('byPopularity', false);
//     } else {
//       setPopularity('unpopular');
//       if (onFilterChange) {
//         onFilterChange('byPopularity', 'unpopular'); // 👈 Передаем 'unpopular' для сортировки по возрастанию
//       }
//     }
//   };

//   // 🎯 Cheap (от минимальной цены к максимальной)
//   const handleCheapChange = () => {
//     if (price === 'cheap') {
//       setPrice('');
//       if (onFilterChange) onFilterChange('byPrice', false);
//     } else {
//       setPrice('cheap');
//       if (onFilterChange) {
//         onFilterChange('byPrice', 'cheap'); // 👈 Передаем 'cheap' для сортировки по возрастанию
//       }
//     }
//   };

//   // 🎯 Expensive (от максимальной цены к минимальной)
//   const handleExpensiveChange = () => {
//     if (price === 'expensive') {
//       setPrice('');
//       if (onFilterChange) onFilterChange('byPrice', false);
//     } else {
//       setPrice('expensive');
//       if (onFilterChange) {
//         onFilterChange('byPrice', 'expensive'); // 👈 Передаем 'expensive' для сортировки по убыванию
//       }
//     }
//   };

//   const handleReset = () => {
//     setCategory('');
//     setSex('');
//     setSpecies('');
//     setLocationId('');
//     setPopularity('');
//     setPrice('');
//     if (onFilterChange) {
//       onFilterChange('byPopularity', false);
//       onFilterChange('byPrice', false);
//     }
//     if (onReset) onReset();
//   };

//   return (
//     <div className={styles.filtersContainer}>
//       <ul className={styles.filtersList}>
//         {/* 🔍 Поиск */}
//         <li className={styles.filterItem}>
//           <SearchField onSearch={onSearch} />
//         </li>

//         {/* Category */}
//         <li className={styles.filterItem}>
//           <select
//             value={category}
//             onChange={handleCategoryChange}
//             className={styles.filterSelect}
//           >
//             <option value="">Category</option>
//             {categoryOptions.map(cat => (
//               <option key={cat} value={cat}>
//                 {cat === 'sell' && 'Sell'}
//                 {cat === 'free' && 'Free'}
//                 {cat === 'lost' && 'Lost'}
//                 {cat === 'found' && 'Found'}
//                 {!['sell', 'free', 'lost', 'found'].includes(cat) && cat}
//               </option>
//             ))}
//           </select>
//         </li>

//         {/* Gender */}
//         <li className={styles.filterItem}>
//           <select
//             value={sex}
//             onChange={handleSexChange}
//             className={styles.filterSelect}
//           >
//             <option value="">By gender</option>
//             {sexOptions.map(sexOption => (
//               <option key={sexOption} value={sexOption}>
//                 {sexOption === 'male' && 'Male'}
//                 {sexOption === 'female' && 'Female'}
//                 {sexOption === 'multiple' && 'Multiple'}
//                 {sexOption === 'unknown' && 'Unknown'}
//               </option>
//             ))}
//           </select>
//         </li>

//         {/* Type */}
//         <li className={styles.filterItem}>
//           <select
//             value={species}
//             onChange={handleSpeciesChange}
//             className={styles.filterSelect}
//           >
//             <option value="">By type</option>
//             {speciesOptions.map(type => (
//               <option key={type} value={type}>
//                 {type.charAt(0).toUpperCase() + type.slice(1)}
//               </option>
//             ))}
//           </select>
//         </li>

//         {/* Location */}
//         <li className={styles.filterItem}>
//           <select
//             value={locationId}
//             onChange={handleLocationChange}
//             className={styles.filterSelect}
//           >
//             <option value="">Location</option>
//             {locationOptions.map(location => {
//               const cityId = location._id;
//               const cityName =
//                 location.cityEn || location.city || 'Unknown City';
//               return (
//                 <option key={cityId} value={cityId}>
//                   {cityName}
//                 </option>
//               );
//             })}
//           </select>
//         </li>

//         {/* Кнопки сортировки */}
//         <li className={styles.popularityPriceWrapper}>
//           <div className={styles.popularityPrice}>
//             {/* Popular */}
//             <button
//               type="button"
//               className={`${styles.sortButton} ${popularity === 'popular' ? styles.active : ''}`}
//               onClick={handlePopularChange}
//             >
//               Popular
//               {popularity === 'popular' && (
//                 <svg className={styles.iconX}>
//                   <use href="/src/assets/icon/icon-sprite.svg#icon-x" />
//                 </svg>
//               )}
//             </button>

//             {/* Unpopular */}
//             <button
//               type="button"
//               className={`${styles.sortButton} ${popularity === 'unpopular' ? styles.active : ''}`}
//               onClick={handleUnpopularChange}
//             >
//               Unpopular
//               {popularity === 'unpopular' && (
//                 <svg className={styles.iconX}>
//                   <use href="/src/assets/icon/icon-sprite.svg#icon-x" />
//                 </svg>
//               )}
//             </button>

//             {/* Cheap */}
//             <button
//               type="button"
//               className={`${styles.sortButton} ${price === 'cheap' ? styles.active : ''}`}
//               onClick={handleCheapChange}
//             >
//               Cheap
//               {price === 'cheap' && (
//                 <svg className={styles.iconX}>
//                   <use href="/src/assets/icon/icon-sprite.svg#icon-x" />
//                 </svg>
//               )}
//             </button>

//             {/* Expensive */}
//             <button
//               type="button"
//               className={`${styles.sortButton} ${price === 'expensive' ? styles.active : ''}`}
//               onClick={handleExpensiveChange}
//             >
//               Expensive
//               {price === 'expensive' && (
//                 <svg className={styles.iconX}>
//                   <use href="/src/assets/icon/icon-sprite.svg#icon-x" />
//                 </svg>
//               )}
//             </button>
//           </div>
//         </li>

//         {/* Reset */}
//         <li className={styles.resetWrapper}>
//           <button
//             type="button"
//             onClick={handleReset}
//             className={styles.resetButton}
//           >
//             Reset filters
//           </button>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default NoticesFilters;

// src/components/Notices/NoticesFilters/NoticesFilters.jsx
// 🎯 КОМПОНЕНТ ФИЛЬТРОВ ДЛЯ СТРАНИЦЫ ОБЪЯВЛЕНИЙ
// ====================================================
// Что делает этот компонент:
// 1. Отображает все фильтры (поиск, категории, пол, тип, локацию)
// 2. Отображает 4 кнопки сортировки (Popular, Unpopular, Cheap, Expensive)
// 3. Отображает кнопку Reset
// 4. Передает изменения наверх в NoticesPage через onFilterChange
// ====================================================

import { useState } from 'react';
import SearchField from '../../SearchField/SearchField';
import styles from './NoticesFilters.module.css';

const NoticesFilters = ({
  onFilterChange, // функция для передачи изменений наверх
  onSearch, // функция для передачи поискового запроса
  onReset, // функция для сброса всех фильтров
  filtersData = {}, // данные для выпадающих списков (категории, пол, типы, города)
}) => {
  // 🎯 Локальное состояние для отслеживания выбранных фильтров
  // Нужно для подсветки активных кнопок (active class)
  const [category, setCategory] = useState('');
  const [sex, setSex] = useState('');
  const [species, setSpecies] = useState('');
  const [locationId, setLocationId] = useState('');
  const [popularity, setPopularity] = useState(''); // 'popular' или 'unpopular'
  const [price, setPrice] = useState(''); // 'cheap' или 'expensive'

  // Данные для фильтров (приходят с сервера через пропсы)
  const categoryOptions = filtersData.categories || [];
  const sexOptions = filtersData.sex || [];
  const speciesOptions = filtersData.species || [];
  const locationOptions = filtersData.cities || [];

  // =============== ОБРАБОТЧИКИ ДЛЯ ВЫПАДАЮЩИХ СПИСКОВ ===============

  const handleCategoryChange = e => {
    const value = e.target.value;
    setCategory(value);
    if (onFilterChange) onFilterChange('category', value);
  };

  const handleSexChange = e => {
    const value = e.target.value;
    setSex(value);
    if (onFilterChange) onFilterChange('sex', value);
  };

  const handleSpeciesChange = e => {
    const value = e.target.value;
    setSpecies(value);
    if (onFilterChange) onFilterChange('species', value);
  };

  const handleLocationChange = e => {
    const value = e.target.value;
    setLocationId(value);
    if (onFilterChange) onFilterChange('locationId', value);
  };

  // =============== ОБРАБОТЧИКИ ДЛЯ КНОПОК СОРТИРОВКИ ===============

  // 🎯 Popular (от максимального рейтинга к минимальному)
  const handlePopularChange = () => {
    if (popularity === 'popular') {
      // Если уже активно - отключаем (передаем false)
      setPopularity('');
      if (onFilterChange) onFilterChange('byPopularity', false);
    } else {
      // Активируем popular (передаем 'popular' для сортировки по убыванию)
      setPopularity('popular');
      if (onFilterChange) {
        onFilterChange('byPopularity', 'popular');
      }
    }
  };

  // 🎯 Unpopular (от минимального рейтинга к максимальному)
  const handleUnpopularChange = () => {
    if (popularity === 'unpopular') {
      setPopularity('');
      if (onFilterChange) onFilterChange('byPopularity', false);
    } else {
      setPopularity('unpopular');
      if (onFilterChange) {
        onFilterChange('byPopularity', 'unpopular');
      }
    }
  };

  // 🎯 Cheap (от минимальной цены к максимальной)
  const handleCheapChange = () => {
    if (price === 'cheap') {
      setPrice('');
      if (onFilterChange) onFilterChange('byPrice', false);
    } else {
      setPrice('cheap');
      if (onFilterChange) {
        onFilterChange('byPrice', 'cheap');
      }
    }
  };

  // 🎯 Expensive (от максимальной цены к минимальной)
  const handleExpensiveChange = () => {
    if (price === 'expensive') {
      setPrice('');
      if (onFilterChange) onFilterChange('byPrice', false);
    } else {
      setPrice('expensive');
      if (onFilterChange) {
        onFilterChange('byPrice', 'expensive');
      }
    }
  };

  // 🎯 Сброс всех фильтров
  const handleReset = () => {
    setCategory('');
    setSex('');
    setSpecies('');
    setLocationId('');
    setPopularity('');
    setPrice('');
    if (onFilterChange) {
      onFilterChange('byPopularity', false);
      onFilterChange('byPrice', false);
    }
    if (onReset) onReset();
  };

  return (
    <div className={styles.filtersContainer}>
      <ul className={styles.filtersList}>
        {/* 🔍 Поиск */}
        <li className={styles.filterItem}>
          <SearchField onSearch={onSearch} />
        </li>

        {/* 📁 Категория */}
        <li className={styles.filterItem}>
          <select
            value={category}
            onChange={handleCategoryChange}
            className={styles.filterSelect}
          >
            <option value="">Category</option>
            {categoryOptions.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'sell' && 'Sell'}
                {cat === 'free' && 'Free'}
                {cat === 'lost' && 'Lost'}
                {cat === 'found' && 'Found'}
                {!['sell', 'free', 'lost', 'found'].includes(cat) && cat}
              </option>
            ))}
          </select>
        </li>

        {/* ⚥ Пол */}
        <li className={styles.filterItem}>
          <select
            value={sex}
            onChange={handleSexChange}
            className={styles.filterSelect}
          >
            <option value="">By gender</option>
            {sexOptions.map(sexOption => (
              <option key={sexOption} value={sexOption}>
                {sexOption === 'male' && 'Male'}
                {sexOption === 'female' && 'Female'}
                {sexOption === 'multiple' && 'Multiple'}
                {sexOption === 'unknown' && 'Unknown'}
              </option>
            ))}
          </select>
        </li>

        {/* 🐾 Тип животного */}
        <li className={styles.filterItem}>
          <select
            value={species}
            onChange={handleSpeciesChange}
            className={styles.filterSelect}
          >
            <option value="">By type</option>
            {speciesOptions.map(type => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </li>

        {/* 📍 Локация */}
        <li className={styles.filterItem}>
          <select
            value={locationId}
            onChange={handleLocationChange}
            className={styles.filterSelect}
          >
            <option value="">Location</option>
            {locationOptions.map(location => {
              const cityId = location._id;
              const cityName =
                location.cityEn || location.city || 'Unknown City';
              return (
                <option key={cityId} value={cityId}>
                  {cityName}
                </option>
              );
            })}
          </select>
        </li>

        {/* 🎯 КНОПКИ СОРТИРОВКИ - их мы будем обрабатывать на фронтенде */}
        <li className={styles.popularityPriceWrapper}>
          <div className={styles.popularityPrice}>
            {/* Popular */}
            <button
              type="button"
              className={`${styles.sortButton} ${popularity === 'popular' ? styles.active : ''}`}
              onClick={handlePopularChange}
            >
              Popular
              {popularity === 'popular' && (
                <svg className={styles.iconX}>
                  <use href="/src/assets/icon/icon-sprite.svg#icon-x" />
                </svg>
              )}
            </button>

            {/* Unpopular */}
            <button
              type="button"
              className={`${styles.sortButton} ${popularity === 'unpopular' ? styles.active : ''}`}
              onClick={handleUnpopularChange}
            >
              Unpopular
              {popularity === 'unpopular' && (
                <svg className={styles.iconX}>
                  <use href="/src/assets/icon/icon-sprite.svg#icon-x" />
                </svg>
              )}
            </button>

            {/* Cheap */}
            <button
              type="button"
              className={`${styles.sortButton} ${price === 'cheap' ? styles.active : ''}`}
              onClick={handleCheapChange}
            >
              Cheap
              {price === 'cheap' && (
                <svg className={styles.iconX}>
                  <use href="/src/assets/icon/icon-sprite.svg#icon-x" />
                </svg>
              )}
            </button>

            {/* Expensive */}
            <button
              type="button"
              className={`${styles.sortButton} ${price === 'expensive' ? styles.active : ''}`}
              onClick={handleExpensiveChange}
            >
              Expensive
              {price === 'expensive' && (
                <svg className={styles.iconX}>
                  <use href="/src/assets/icon/icon-sprite.svg#icon-x" />
                </svg>
              )}
            </button>
          </div>
        </li>

        {/* 🧹 Кнопка сброса */}
        <li className={styles.resetWrapper}>
          <button
            type="button"
            onClick={handleReset}
            className={styles.resetButton}
          >
            Reset filters
          </button>
        </li>
      </ul>
    </div>
  );
};

export default NoticesFilters;
