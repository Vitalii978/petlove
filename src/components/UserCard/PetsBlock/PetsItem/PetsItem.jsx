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
