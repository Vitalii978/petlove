// src/components/Notices/NoticesFilters/NoticesFilters.jsx

import { useState } from 'react';
import SearchField from '../../SearchField/SearchField';
import styles from './NoticesFilters.module.css';

const NoticesFilters = ({ 
  onFilterChange,    
  onSearch,         
  onReset,          
  filtersData = {}
}) => {
  
  const [category, setCategory] = useState('');
  const [sex, setSex] = useState('');
  const [species, setSpecies] = useState('');
  const [locationId, setLocationId] = useState('');
  const [sortBy, setSortBy] = useState('');
  
  // Данные для фильтров
  const categoryOptions = filtersData.categories || [];
  const sexOptions = filtersData.sex || [];
  const speciesOptions = filtersData.species || [];
  const locationOptions = filtersData.cities || [];
  
  // Обработчики
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory(value);
    if (onFilterChange) onFilterChange('category', value);
  };
  
  const handleSexChange = (e) => {
    const value = e.target.value;
    setSex(value);
    if (onFilterChange) onFilterChange('sex', value);
  };
  
  const handleSpeciesChange = (e) => {
    const value = e.target.value;
    setSpecies(value);
    if (onFilterChange) onFilterChange('species', value);
  };
  
  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocationId(value);
    if (onFilterChange) onFilterChange('locationId', value);
  };
  
  const handleSortChange = (sortType) => {
    setSortBy(sortType);
    
    const sortParams = {
      byDate: false,
      byPrice: false,
      byPopularity: false
    };
    
    if (sortType === 'popularity') {
      sortParams.byPopularity = true;
    } else if (sortType === 'price') {
      sortParams.byPrice = true;
    } else if (sortType === 'date') {
      sortParams.byDate = true;
    }
    
    if (onFilterChange) {
      Object.entries(sortParams).forEach(([key, value]) => {
        onFilterChange(key, value);
      });
    }
  };
  
  const handleReset = () => {
    setCategory('');
    setSex('');
    setSpecies('');
    setLocationId('');
    setSortBy('');
    if (onReset) onReset();
  };
  
  return (
    <div className={styles.filtersContainer}>
      
      {/* 🔍 ПОЛЕ ПОИСКА - ПЕРВАЯ СТРОКА */}
      <div className={styles.searchRow}>
        <SearchField onSearch={onSearch} />
      </div>
      
      {/* 🎯 ФИЛЬТРЫ - ВТОРАЯ СТРОКА В ОДНУ ЛИНИЮ */}
      {/* Используем ul для семантического списка фильтров */}
      <ul className={styles.filtersList}>
        
        {/* 🎯 ЭЛЕМЕНТ СПИСКА: КАТЕГОРИЯ */}
        <li className={styles.filterItem}>
          <select
            value={category}
            onChange={handleCategoryChange}
            className={styles.filterSelect}
          >
            <option value="">Category</option>
            {categoryOptions.map((cat) => (
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
        
        {/* 🎯 ЭЛЕМЕНТ СПИСКА: ПОЛ */}
        <li className={styles.filterItem}>
          <select
            value={sex}
            onChange={handleSexChange}
            className={styles.filterSelect}
          >
            <option value="">Sex</option>
            {sexOptions.map((sexOption) => (
              <option key={sexOption} value={sexOption}>
                {sexOption === 'male' && 'Male'}
                {sexOption === 'female' && 'Female'}
                {sexOption === 'multiple' && 'Multiple'}
                {sexOption === 'unknown' && 'Unknown'}
              </option>
            ))}
          </select>
        </li>
        
        {/* 🎯 ЭЛЕМЕНТ СПИСКА: ВИД */}
        <li className={styles.filterItem}>
          <select
            value={species}
            onChange={handleSpeciesChange}
            className={styles.filterSelect}
          >
            <option value="">Type</option>
            {speciesOptions.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </li>
        
        {/* 🎯 ЭЛЕМЕНТ СПИСКА: ЛОКАЦИЯ */}
        <li className={styles.filterItem}>
          <select
            value={locationId}
            onChange={handleLocationChange}
            className={styles.filterSelect}
          >
            <option value="">Location</option>
            {locationOptions.map((location) => {
              const cityId = location._id;
              const cityName = location.cityEn || location.city || 'Unknown City';
              
              return (
                <option key={cityId} value={cityId}>
                  {cityName}
                </option>
              );
            })}
          </select>
        </li>
        
        {/* 🎯 ЭЛЕМЕНТ СПИСКА: СОРТИРОВКА */}
        <li className={styles.sortItem}>
          {/* Вложенный ul для кнопок сортировки */}
          <ul className={styles.sortButtonsList}>
            <li className={styles.sortButtonItem}>
              <button
                type="button"
                className={`${styles.sortButton} ${sortBy === 'popularity' ? styles.active : ''}`}
                onClick={() => handleSortChange('popularity')}
              >
                Popularity
              </button>
            </li>
            <li className={styles.sortButtonItem}>
              <button
                type="button"
                className={`${styles.sortButton} ${sortBy === 'price' ? styles.active : ''}`}
                onClick={() => handleSortChange('price')}
              >
                Price
              </button>
            </li>
            <li className={styles.sortButtonItem}>
              <button
                type="button"
                className={`${styles.sortButton} ${sortBy === 'date' ? styles.active : ''}`}
                onClick={() => handleSortChange('date')}
              >
                Date
              </button>
            </li>
          </ul>
        </li>
        
        {/* 🎯 ЭЛЕМЕНТ СПИСКА: КНОПКА СБРОСА */}
        <li className={styles.resetItem}>
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