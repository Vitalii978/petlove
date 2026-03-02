import { useState } from 'react';
import sprite from '../../../assets/icon/icon-sprite.svg';
import styles from './NoticeItem.module.css';

const NoticesItem = ({
  id,
  imgURL,
  title,
  name,
  birthday,
  gender,
  species,
  category,
  comment,
  price,
  popularity,
  onOpenModal,
  boxFavorite,
  onDelete,
  isFavorite = false,
  onToggleFavorite,
  isDisabled = false,
}) => {
  const [isHeartAnimating, setIsHeartAnimating] = useState(false);

  if (!id) {
    return null;
  }

  const handleFavoriteClick = e => {
    e.stopPropagation();
    e.preventDefault();

    if (isDisabled) {
      return;
    }

    setIsHeartAnimating(true);
    setTimeout(() => setIsHeartAnimating(false), 300);

    if (onDelete) {
      onDelete(id);
    } else if (onToggleFavorite) {
      onToggleFavorite(id);
    } else if (onOpenModal) {
      onOpenModal({
        _id: id,
        imgURL,
        title,
        name,
        birthday,
        sex: gender,
        species,
        category,
        comment,
        price,
        popularity,
      });
    }
  };

  const handleLearnMoreClick = e => {
    e.preventDefault();

    if (onOpenModal) {
      onOpenModal({
        _id: id,
        imgURL,
        title,
        name,
        birthday,
        sex: gender,
        species,
        category,
        comment,
        price,
        popularity,
      });
    }
  };

  const formatDate = dateString => {
    if (!dateString) return 'Not specified';
    try {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    } catch {
      return dateString;
    }
  };

  const safeImgURL =
    imgURL || 'https://placehold.co/400x280/cccccc/666666?text=Pet+Photo';
  const safeTitle = title || 'No title';
  const safeName = name || 'No name';
  const safeGender = gender || 'unknown';
  const safeSpecies = species || 'unknown';
  const safeCategory = category || 'unknown';
  const safePopularity = popularity || 0;

  return (
    <article className={styles.noticeItem}>
      <div className={styles.imageContainer}>
        <img
          src={safeImgURL}
          alt={safeTitle}
          className={styles.image}
          loading="lazy"
          onError={e => {
            e.target.src =
              'https://placehold.co/400x280/cccccc/666666?text=No+Image';
          }}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{safeTitle}</h3>
          <div className={styles.rating}>
            <svg className={styles.starIcon}>
              <use href={`${sprite}#icon-star`} />
            </svg>
            <span className={styles.ratingValue}>{safePopularity}</span>
          </div>
        </div>

        <ul className={styles.infoList}>
          <li>
            <p className={styles.fieldLabel}>Name</p>
            <p className={styles.fieldValue}>{safeName}</p>
          </li>
          <li>
            <p className={styles.fieldLabel}>Birthday</p>
            {birthday ? (
              <p className={styles.fieldValue}>{formatDate(birthday)}</p>
            ) : (
              <p className={styles.fieldValue}>Not specified</p>
            )}
          </li>
          <li>
            <p className={styles.fieldLabel}>Gender</p>
            <p className={styles.fieldValue}>
              {safeGender === 'male'
                ? 'Male'
                : safeGender === 'female'
                  ? 'Female'
                  : 'Unknown'}
            </p>
          </li>
          <li>
            <p className={styles.fieldLabel}>Species</p>
            <p className={styles.fieldValue}>
              {safeSpecies
                ? safeSpecies.charAt(0).toUpperCase() + safeSpecies.slice(1)
                : 'Unknown'}
            </p>
          </li>
          <li>
            <p className={styles.fieldLabel}>Category</p>
            <p className={styles.fieldValue}>
              {safeCategory.charAt(0).toUpperCase() + safeCategory.slice(1)}
            </p>
          </li>
        </ul>

        <p className={styles.description}>
          {comment || 'No description available'}
        </p>

        <div className={styles.pricePlain}>
          {price && safeCategory === 'sell' ? (
            <span className={styles.priceText}>${price}</span>
          ) : (
            <span className={styles.noPriceText}>No price</span>
          )}
        </div>

        <div className={styles.buttonsRow}>
          <button
            className={styles.learnMoreButton}
            onClick={handleLearnMoreClick}
            type="button"
          >
            Learn more
          </button>

          {boxFavorite && (
            <button
              className={`${styles.heartCircle} 
                ${isHeartAnimating ? styles.heartBeat : ''} 
                ${isDisabled ? styles.disabled : ''}`}
              onClick={handleFavoriteClick}
              type="button"
              disabled={isDisabled}
              aria-label={
                isFavorite ? 'Remove from favorites' : 'Add to favorites'
              }
            >
              <svg className={styles.heartIcon}>
                {isFavorite ? (
                  <use href={`${sprite}#icon-basket`} />
                ) : (
                  <use href={`${sprite}#icon-heart`} />
                )}
              </svg>
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default NoticesItem;
