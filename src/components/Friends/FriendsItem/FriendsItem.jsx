// src/components/Friends/FriendsItem/FriendsItem.jsx
// 🎯 КОМПОНЕНТ КАРТОЧКИ ДРУГА (ПАРТНЕРА)
// ✅ ИСПРАВЛЕНО: добавлен кликабельный логотип и email

import sprite from '../../../assets/icon/icon-sprite.svg';
import styles from './FriendsItem.module.css';

const FriendsItem = ({ friend }) => {
  // 🎯 Получаем все данные из пропса friend
  // friend - объект с информацией о партнере
  const {
    title = '', // Название компании
    url = '', // Веб-сайт компании
    addressUrl = '', // Ссылка на карту (Google Maps)
    imageUrl = '', // URL логотипа
    address = '', // Физический адрес
    email = '', // Email компании
    phone = '', // Телефон
    workDays = [], // Массив с днями работы
  } = friend || {};

  // 🎯 Функция для форматирования времени работы
  // Возвращает строку с часами работы или "Day and night"
  const getWorkHours = () => {
    // Если нет данных о работе
    if (!workDays || workDays.length === 0) {
      return 'Day and night';
    }

    // Берем первый день из массива (обычно там один объект)
    const firstDay = workDays[0];

    // Если есть время открытия и закрытия
    if (firstDay && firstDay.from && firstDay.to) {
      return `${firstDay.from} - ${firstDay.to}`;
    }

    return 'Day and night';
  };

  // 🎯 Обработчики для предотвращения перехода по пустым ссылкам
  const handleAddressClick = e => {
    if (!addressUrl || addressUrl === '#') {
      e.preventDefault(); // Отменяем переход если нет ссылки
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

  // 🎯 Функция получения href для email
  // Приоритет: сначала сайт компании, потом email
  const getEmailHref = () => {
    if (url && url !== '#') {
      return url; // Вебсайт компании
    }
    if (email && email.includes('@')) {
      return `mailto:${email}`; // Email
    }
    return '#'; // Ничего нет
  };

  // 🎯 Обработчик клика на логотип
  // Открывает сайт или email в новой вкладке
  const handleLogoClick = e => {
    const href = getEmailHref();
    if (!href || href === '#') {
      e.preventDefault();
      return;
    }
    // Открываем в новой вкладке с безопасными атрибутами
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  return (
    <li className={styles.friendItem}>
      <div className={styles.friendItem_container}>
        {/* 🎯 ЛЕВАЯ ЧАСТЬ - ЛОГОТИП */}
        {/* 🔥 ИЗМЕНЕНО: теперь кликабельный */}
        <div
          className={styles.leftSection}
          onClick={handleLogoClick} // Открывает сайт при клике
          role="button" // Для доступности
          tabIndex={0} // Можно фокусироваться
          onKeyPress={e => {
            // Поддержка клавиатуры (Enter и пробел)
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

        {/* 🎯 ПРАВАЯ ЧАСТЬ - ИНФОРМАЦИЯ */}
        <div className={styles.rightSection}>
          {/* 🎯 ВРЕМЯ РАБОТЫ */}
          <div className={styles.workHours}>
            <svg className={styles.clockIcon}>
              <use href={`${sprite}#icon-clock`} />
            </svg>
            <span className={styles.workHoursText}>{getWorkHours()}</span>
          </div>

          {/* 🎯 НАЗВАНИЕ ФИРМЫ */}
          <h2 className={styles.titleFirma}>{title || 'Unknown Partner'}</h2>

          {/* 🎯 КОНТАКТНАЯ ИНФОРМАЦИЯ */}
          <div className={styles.contactInfo}>
            {/* 🔥 EMAIL (теперь кликабельный) */}
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

            {/* 🔥 АДРЕС (с ограничением в 1 строку) */}
            <div className={styles.contactRow}>
              <span className={styles.contactLabel}>Address:</span>
              <a
                href={addressUrl || '#'}
                className={`${styles.contactValue} ${styles.addressLink}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleAddressClick}
              >
                {/* 🔥 Специальный span для адреса с троеточием */}
                <span className={styles.addressText}>
                  {address || 'website only'}
                </span>
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
      </div>
    </li>
  );
};

export default FriendsItem;
