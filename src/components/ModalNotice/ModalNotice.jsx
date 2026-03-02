import React, { useEffect } from 'react';
import sprite from '../../assets/icon/icon-sprite.svg';
import styles from './ModalNotice.module.css';

const ModalNotice = ({
  isOpen,
  onClose,
  notice,
  onAdd,
  onRemove,
  isFavorite = false,
}) => {
  useEffect(() => {
    const handleEscape = e => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !notice) return null;

  const formatDate = dateString => {
    if (!dateString) return 'No birthday';
    try {
      return `${dateString.slice(8, 10)}.${dateString.slice(5, 7)}.${dateString.slice(0, 4)}`;
    } catch {
      return dateString;
    }
  };

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getContactInfo = () => {
    if (typeof notice.user === 'object' && notice.user !== null) {
      return {
        email: notice.user.email,
        phone: notice.user.phone,
      };
    }
    return {
      email: null,
      phone: null,
    };
  };

  const contact = getContactInfo();

  const contactHref = contact.email
    ? `mailto:${contact.email}`
    : contact.phone
      ? `tel:${contact.phone}`
      : '#';

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.buttonClose}>
          <svg className={styles.icon} width={24} height={24}>
            <use href={`${sprite}#icon-close`} />
          </svg>
        </button>

        <div className={styles.imageWrapper}>
          <div className={styles.categoryBadge}>
            {notice.category === 'sell' && 'Sell'}
            {notice.category === 'free' && 'Free'}
            {notice.category === 'lost' && 'Lost'}
            {notice.category === 'found' && 'Found'}
            {!['sell', 'free', 'lost', 'found'].includes(notice.category) &&
              notice.category}
          </div>

          <img
            src={
              notice.imgURL ||
              'https://placehold.co/200x200/cccccc/666666?text=Pet+Photo'
            }
            alt={notice.name || 'Pet'}
            className={styles.imgModal}
            onError={e => {
              e.target.src =
                'https://placehold.co/200x200/cccccc/666666?text=No+Image';
            }}
          />
        </div>

        <h3 className={styles.title}>{notice.title || 'No title'}</h3>

        <div className={styles.boxPopularity}>
          <svg className={styles.icon} width={16} height={16}>
            <use href={`${sprite}#icon-star`} />
          </svg>
          <p className={styles.popularity}>{notice.popularity || 0}</p>
        </div>

        <ul className={styles.boxCharacteristics}>
          <li className={styles.oneCharacteristics}>
            <p className={styles.description}>Name</p>
            <p className={styles.meaning}>{notice.name || 'Not specified'}</p>
          </li>
          <li className={styles.oneCharacteristics}>
            <p className={styles.description}>Birthday</p>
            <p className={styles.meaning}>{formatDate(notice.birthday)}</p>
          </li>
          <li className={styles.oneCharacteristics}>
            <p className={styles.description}>Gender</p>
            <p className={styles.meaning}>{notice.sex || 'Unknown'}</p>
          </li>
          <li className={styles.oneCharacteristics}>
            <p className={styles.description}>Species</p>
            <p className={styles.meaning}>
              {notice.species
                ? notice.species.charAt(0).toUpperCase() +
                  notice.species.slice(1)
                : 'Unknown'}
            </p>
          </li>
        </ul>

        <p className={styles.comment}>{notice.comment || 'No comments'}</p>

        {notice.category === 'sell' && notice.price ? (
          <p className={styles.price}>${notice.price}</p>
        ) : (
          <p className={styles.price}>No price</p>
        )}

        <div className={styles.boxButton}>
          {isFavorite ? (
            <button
              type="button"
              className={styles.buttonAdd}
              onClick={() => onRemove(notice._id)}
            >
              Delete
              <svg width={18} height={18}>
                <use href={`${sprite}#icon-basket-white`} />
              </svg>
            </button>
          ) : (
            <button
              type="button"
              className={styles.buttonAdd}
              onClick={() => onAdd(notice._id)}
            >
              Add to
              <svg width={18} height={18}>
                <use href={`${sprite}#icon-heart-wite`} />
              </svg>
            </button>
          )}

          <a className={styles.linkBtn} href={contactHref}>
            Contact
          </a>
        </div>
      </div>
    </div>
  );
};

export default ModalNotice;
