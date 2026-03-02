import React from 'react';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <p className={styles.loaderText}>Loading...</p>
    </div>
  );
};

export default Loader;
