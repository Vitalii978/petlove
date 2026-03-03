import { useState } from 'react';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import styles from './LoadingPage.module.css';
import sprite from '../../assets/icon/icon-sprite.svg';

const LoadingPage = ({ onComplete }) => {
  const [showProgress, setShowProgress] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.overlay} />

      {!showProgress ? (
        <button
          className={styles.logoButton}
          onClick={() => setShowProgress(true)}
        >
          petl
          <svg className={styles.heartIcon} viewBox="0 0 24 24">
            <use href={`${sprite}#icon-heart-circle`} />
          </svg>
          ve
        </button>
      ) : (
        <ProgressBar onComplete={onComplete} />
      )}
    </div>
  );
};

export default LoadingPage;
