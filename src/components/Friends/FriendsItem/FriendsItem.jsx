// src/components/Friends/FriendsItem/FriendsItem.jsx

import sprite from '../../../assets/icon/icon-sprite.svg';
import styles from './FriendsItem.module.css';

const FriendsItem = ({ friend }) => {
  
  // 🎯 Получаем все данные
  const {
    title = '',
    url = '',
    addressUrl = '',
    imageUrl = '',
    address = '',
    email = '',
    phone = '',
    workDays = []
  } = friend || {};
  
  const getWorkHours = () => {
    if (!workDays || workDays.length === 0) {
      return 'Time not specified';
    }
    
    const firstDay = workDays[0];
    
    if (firstDay && firstDay.from && firstDay.to) {
      return `${firstDay.from} - ${firstDay.to}`;
    }
    
    return 'Time not specified';
  };
  
  const handleAddressClick = (e) => {
    if (!addressUrl || addressUrl === '#') {
      e.preventDefault();
    }
  };
  
  const handleEmailClick = (e) => {
    if (!url || url === '#') {
      e.preventDefault();
    }
  };
  
  const handlePhoneClick = (e) => {
    if (!phone) {
      e.preventDefault();
    }
  };
  
  // 🎯 Получаем href для email
  const getEmailHref = () => {
    if (url && url !== '#') {
      return url; // Вебсайт компании
    }
    if (email && email.includes('@')) {
      return `mailto:${email}`; // Email
    }
    return '#';
  };
  
  return (
    <li className={styles.friendItem}>
      
      {/* 🎯 ЛЕВАЯ ЧАСТЬ - ЛОГОТИП */}
      <div className={styles.leftSection}>
        <div className={styles.logoContainer}>
          <img 
            src={imageUrl || 'https://placehold.co/120x120/cccccc/666666?text=Logo'} 
            alt={`${title} logo`}
            className={styles.logo}
          />
        </div>
      </div>
      
      {/* 🎯 ПРАВАЯ ЧАСТЬ - ИНФОРМАЦИЯ */}
      <div className={styles.rightSection}>
        
        {/* 🎯 ВРЕМЯ РАБОТЫ (12px от верха) */}
        <div className={styles.workHours}>
          <svg className={styles.clockIcon}>
            <use href={`${sprite}#icon-clock`} />
          </svg>
          <span className={styles.workHoursText}>
            {getWorkHours()}
          </span>
        </div>
        
        {/* 🎯 НАЗВАНИЕ ФИРМЫ (20px от верха) */}
        <h3 className={styles.title}>
          {title || 'Unknown Partner'}
        </h3>
        
        {/* 🎯 КОНТАКТНАЯ ИНФОРМАЦИЯ */}
        <div className={styles.contactInfo}>
          
          {/* АДРЕС */}
          <div className={styles.contactRow}>
            <span className={styles.contactLabel}>Address:</span>
            <a 
              href={addressUrl || '#'}
              className={styles.contactValue}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleAddressClick}
            >
              {address || 'Not specified'}
            </a>
          </div>
          
          {/* EMAIL */}
          <div className={styles.contactRow}>
            <span className={styles.contactLabel}>Email:</span>
            <a 
              href={getEmailHref()}
              className={styles.contactValue}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleEmailClick}
            >
              {email || 'Not specified'}
            </a>
          </div>
          
          {/* PHONE */}
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
      
    </li>
  );
};

export default FriendsItem;