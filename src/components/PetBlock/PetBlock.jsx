// src/components/PetBlock/PetBlock.jsx

import styles from './PetBlock.module.css';

const PetBlock = () => {
  return (
    <div className={styles.petBlock}>
      <div className={styles.imageContainer}>
        <img 
          src="https://placehold.co/600x400/ff6b08/ffffff?text=Pet+Love&font=montserrat"
          alt="Happy pets"
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>Find Your New Best Friend</h2>
        <p className={styles.description}>
          Join our community of pet lovers and find your perfect companion.
          Register now to save your favorite pets and connect with other animal enthusiasts.
        </p>
      </div>
    </div>
  );
};

export default PetBlock;