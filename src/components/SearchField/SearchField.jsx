import React, { useState } from 'react';
import styles from './SearchField.module.css';
import sprite from '../../assets/icon/icon-sprite.svg';

const SearchField = ({ onSearch, placeholder = 'Search', className = '' }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleClear = () => {
    setSearchQuery('');
    if (onSearch) {
      onSearch('');
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <form
      className={`${styles.searchForm} ${className}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.searchContainer}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleChange}
          aria-label="Search input"
        />

        <ul className={styles.iconsList}>
          {searchQuery && (
            <li className={styles.iconItem}>
              <button
                type="button"
                className={styles.clearButton}
                onClick={handleClear}
                aria-label="Clear search"
              >
                <svg className={styles.clearIcon}>
                  <use href={`${sprite}#icon-close`} />
                </svg>
              </button>
            </li>
          )}

          <li className={styles.iconItem}>
            <button
              type="submit"
              className={styles.searchButton}
              onClick={handleSearchClick}
              aria-label="Search"
            >
              <svg className={styles.searchIcon}>
                <use href={`${sprite}#icon-search`} />
              </svg>
            </button>
          </li>
        </ul>
      </div>
    </form>
  );
};

export default SearchField;
