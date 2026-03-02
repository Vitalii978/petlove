import { useState, useId } from 'react';
import SearchField from '../../SearchField/SearchField';
import styles from './NoticesFilters.module.css';
import sprite from '../../../assets/icon/icon-sprite.svg';

const NoticesFilters = ({
  onFilterChange,
  onSearch,
  onReset,
  filtersData = {},
}) => {
  const categoryId = useId();
  const genderId = useId();
  const speciesId = useId();
  const locationId = useId();

  const [category, setCategory] = useState('');
  const [sex, setSex] = useState('');
  const [species, setSpecies] = useState('');
  const [locationIdValue, setLocationIdValue] = useState('');
  const [popularity, setPopularity] = useState('');
  const [price, setPrice] = useState('');

  const categoryOptions = filtersData.categories || [];
  const sexOptions = filtersData.sex || [];
  const speciesOptions = filtersData.species || [];
  const locationOptions = filtersData.cities || [];

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
    setLocationIdValue(value);
    if (onFilterChange) onFilterChange('locationId', value);
  };

  const handlePopularChange = () => {
    if (popularity === 'popular') {
      setPopularity('');
      if (onFilterChange) onFilterChange('byPopularity', false);
    } else {
      setPopularity('popular');
      if (onFilterChange) onFilterChange('byPopularity', 'popular');
    }
  };

  const handleUnpopularChange = () => {
    if (popularity === 'unpopular') {
      setPopularity('');
      if (onFilterChange) onFilterChange('byPopularity', false);
    } else {
      setPopularity('unpopular');
      if (onFilterChange) onFilterChange('byPopularity', 'unpopular');
    }
  };

  const handleCheapChange = () => {
    if (price === 'cheap') {
      setPrice('');
      if (onFilterChange) onFilterChange('byPrice', false);
    } else {
      setPrice('cheap');
      if (onFilterChange) onFilterChange('byPrice', 'cheap');
    }
  };

  const handleExpensiveChange = () => {
    if (price === 'expensive') {
      setPrice('');
      if (onFilterChange) onFilterChange('byPrice', false);
    } else {
      setPrice('expensive');
      if (onFilterChange) onFilterChange('byPrice', 'expensive');
    }
  };

  const handleReset = () => {
    setCategory('');
    setSex('');
    setSpecies('');
    setLocationIdValue('');
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
        <li className={styles.filterItem}>
          <SearchField onSearch={onSearch} className={styles.narrowSearch} />
        </li>

        <li className={styles.categoryGenderRow}>
          <div className={styles.selectWrapper}>
            <label htmlFor={categoryId} className={styles.selectLabel}>
              <svg className={styles.iconLabel}>
                <use href={`${sprite}#icon-arrow-left`} />
              </svg>
            </label>
            <select
              id={categoryId}
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
          </div>

          <div className={styles.selectWrapper}>
            <label htmlFor={genderId} className={styles.selectLabel}>
              <svg className={styles.iconLabel}>
                <use href={`${sprite}#icon-arrow-left`} />
              </svg>
            </label>
            <select
              id={genderId}
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
          </div>
        </li>

        <li className={styles.filterItemBytype}>
          <div className={styles.selectWrapperBytype}>
            <label htmlFor={speciesId} className={styles.selectLabel}>
              <svg className={styles.iconLabel}>
                <use href={`${sprite}#icon-arrow-left`} />
              </svg>
            </label>
            <select
              id={speciesId}
              value={species}
              onChange={handleSpeciesChange}
              className={styles.filterSelectBytype}
            >
              <option value="">By type</option>
              {speciesOptions.map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </li>

        <li className={styles.filterItemLocation}>
          <div className={styles.selectWrapperLocation}>
            <label htmlFor={locationId} className={styles.selectLabel}>
              <svg className={styles.iconSearch}>
                <use href={`${sprite}#icon-search`} />
              </svg>
            </label>
            <select
              id={locationId}
              value={locationIdValue}
              onChange={handleLocationChange}
              className={styles.filterSelectLocation}
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
          </div>
        </li>

        <li className={styles.sortingResetContainer}>
          <div className={styles.sortingButtonsWrapper}>
            <div className={styles.sortingRow}>
              <button
                type="button"
                className={`${styles.sortButton} ${popularity === 'popular' ? styles.active : ''}`}
                onClick={handlePopularChange}
              >
                Popular
                {popularity === 'popular' && (
                  <svg className={styles.iconX}>
                    <use href={`${sprite}#icon-x`} />
                  </svg>
                )}
              </button>

              <button
                type="button"
                className={`${styles.sortButton} ${popularity === 'unpopular' ? styles.active : ''}`}
                onClick={handleUnpopularChange}
              >
                Unpopular
                {popularity === 'unpopular' && (
                  <svg className={styles.iconX}>
                    <use href={`${sprite}#icon-x`} />
                  </svg>
                )}
              </button>

              <button
                type="button"
                className={`${styles.sortButton} ${price === 'cheap' ? styles.active : ''}`}
                onClick={handleCheapChange}
              >
                Cheap
                {price === 'cheap' && (
                  <svg className={styles.iconX}>
                    <use href={`${sprite}#icon-x`} />
                  </svg>
                )}
              </button>

              <button
                type="button"
                className={`${styles.sortButton} ${price === 'expensive' ? styles.active : ''}`}
                onClick={handleExpensiveChange}
              >
                Expensive
                {price === 'expensive' && (
                  <svg className={styles.iconX}>
                    <use href={`${sprite}#icon-x`} />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className={styles.resetButton}
          >
            Reset
          </button>
        </li>
      </ul>
    </div>
  );
};

export default NoticesFilters;
