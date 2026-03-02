import { useEffect, useState } from 'react';
import styles from './ProgressBar.module.css';

const ProgressBar = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 200);
          return 100;
        }
        return p + 1;
      });
    }, 10);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.spinner} />
      <div className={styles.progressText}>{progress}%</div>
    </div>
  );
};

export default ProgressBar;
