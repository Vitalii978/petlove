import sprite from '../../../assets/icon/icon-sprite.svg';
import styles from './FriendsItem.module.css';

const FriendsItem = ({ friend }) => {
  const {
    title = '',
    url = '',
    addressUrl = '',
    imageUrl = '',
    address = '',
    email = '',
    phone = '',
    workDays = [],
  } = friend || {};

  const getWorkHours = () => {
    if (!workDays || workDays.length === 0) {
      return 'Day and night';
    }

    const firstDay = workDays[0];

    if (firstDay && firstDay.from && firstDay.to) {
      return `${firstDay.from} - ${firstDay.to}`;
    }

    return 'Day and night';
  };

  const handleAddressClick = e => {
    if (!addressUrl || addressUrl === '#') {
      e.preventDefault();
    }
  };

  const handleEmailClick = e => {
    if (!url || url === '#') {
      e.preventDefault();
    }
  };

  const handlePhoneClick = e => {
    if (!phone) {
      e.preventDefault();
    }
  };

  const getEmailHref = () => {
    if (url && url !== '#') {
      return url;
    }
    if (email && email.includes('@')) {
      return `mailto:${email}`;
    }
    return '#';
  };

  const handleLogoClick = e => {
    const href = getEmailHref();
    if (!href || href === '#') {
      e.preventDefault();
      return;
    }
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  return (
    <li className={styles.friendItem}>
      <div className={styles.friendItem_container}>
        <div
          className={styles.leftSection}
          onClick={handleLogoClick}
          role="button"
          tabIndex={0}
          onKeyPress={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleLogoClick(e);
            }
          }}
        >
          <img
            src={
              imageUrl || 'https://placehold.co/80x80/cccccc/666666?text=Logo'
            }
            alt={`${title} logo`}
            className={styles.logo}
          />
        </div>

        <div className={styles.rightSection}>
          <div className={styles.workHours}>
            <svg className={styles.clockIcon}>
              <use href={`${sprite}#icon-clock`} />
            </svg>
            <span className={styles.workHoursText}>{getWorkHours()}</span>
          </div>

          <h2 className={styles.titleFirma}>{title || 'Unknown Partner'}</h2>

          <div className={styles.contactInfo}>
            <div className={styles.contactRow}>
              <span className={styles.contactLabel}>Email:</span>
              <a
                href={getEmailHref()}
                className={`${styles.contactValue} ${styles.emailLink}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleEmailClick}
              >
                {email || 'no email'}
              </a>
            </div>

            <div className={styles.contactRow}>
              <span className={styles.contactLabel}>Address:</span>
              <a
                href={addressUrl || '#'}
                className={`${styles.contactValue} ${styles.addressLink}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleAddressClick}
              >
                <span className={styles.addressText}>
                  {address || 'website only'}
                </span>
              </a>
            </div>

            <div className={styles.contactRow}>
              <span className={styles.contactLabel}>Phone:</span>
              <a
                href={phone ? `tel:${phone.replace(/\D/g, '')}` : '#'}
                className={styles.contactValue}
                onClick={handlePhoneClick}
              >
                {phone || 'Not specified'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default FriendsItem;
