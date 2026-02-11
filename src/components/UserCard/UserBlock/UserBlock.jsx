// src/components/UserCard/UserBlock/UserBlock.jsx

// 🎯 ИМПОРТЫ: Что нам нужно для компонента?
import sprite from '../../../assets/icon/icon-sprite.svg';
import styles from './UserBlock.module.css';

// 🎯 КОМПОНЕНТ UserBlock: Отображает информацию о пользователе
// Props (входные данные):
// - user: объект с данными пользователя {name, email, phone, avatar}
const UserBlock = ({ user }) => {
  // 🎯 ДЕСТРУКТУРИЗАЦИЯ: Берем нужные поля из объекта user
  // Значения по умолчанию на случай если данных нет
  const {
    name = 'User',           // Имя пользователя
    email = 'No email',      // Email
    phone = 'Not specified', // Телефон
    avatar = null            // URL аватарки (может быть null)
  } = user;

  // 🎯 ФОРМАТИРОВАНИЕ ТЕЛЕФОНА: Если телефон есть - форматируем
  const formatPhone = (phoneNumber) => {
    if (!phoneNumber || phoneNumber === 'Not specified') {
      return 'Not specified';
    }
    
    // Убираем все нецифровые символы
    const digits = phoneNumber.replace(/\D/g, '');
    
    // Форматируем: +38 (XXX) XXX-XX-XX
    if (digits.length === 12 && digits.startsWith('38')) {
      return `+${digits.slice(0,2)} (${digits.slice(2,5)}) ${digits.slice(5,8)}-${digits.slice(8,10)}-${digits.slice(10,12)}`;
    }
    
    // Если не подходит под формат - возвращаем как есть
    return phoneNumber;
  };

  // 🎯 РЕНДЕР КОМПОНЕНТА: Что увидит пользователь
  return (
    // 🎯 SECTION: Семантический тег для секции информации
    <section className={styles.userBlock}>
      
      {/* 🎯 HEADER: Заголовок секции */}
      <header className={styles.blockHeader}>
        <h3 className={styles.blockTitle}>Personal Information</h3>
      </header>
      
      {/* 🎯 CONTENT: Основное содержимое */}
      <div className={styles.blockContent}>
        
        {/* 🎯 АВАТАР ПОЛЬЗОВАТЕЛЯ */}
        <div className={styles.avatarSection}>
          <div className={styles.avatarContainer}>
            {avatar ? (
              // 🎯 Если есть аватар - показываем изображение
              <img 
                src={avatar} 
                alt={`${name}'s avatar`}
                className={styles.avatarImage}
                onError={(e) => {
                  // 🎯 Если изображение не загрузилось - показываем иконку
                  e.target.style.display = 'none';
                  e.target.parentNode.querySelector(`.${styles.avatarDefault}`).style.display = 'block';
                }}
              />
            ) : null}
            
            {/* 🎯 Дефолтная иконка если нет аватарки */}
            <svg 
              className={`${styles.avatarDefault} ${avatar ? styles.hidden : ''}`}
              aria-label="Default user avatar"
            >
              <use href={`${sprite}#icon-user`} />
            </svg>
          </div>
          
          {/* 🎯 ИМЯ ПОЛЬЗОВАТЕЛЯ под аватаркой */}
          <p className={styles.userName}>{name}</p>
        </div>
        
        {/* 🎯 СПИСОК ИНФОРМАЦИИ: Используем UL/LI как требует ТЗ */}
        <ul className={styles.infoList} aria-label="User information list">
          
          {/* 🎯 ЭЛЕМЕНТ СПИСКА 1: Email */}
          <li className={styles.infoItem}>
            <div className={styles.infoRow}>
              {/* 🎯 ИКОНКА для email */}
              <svg className={styles.infoIcon} aria-hidden="true">
                <use href={`${sprite}#icon-email`} />
              </svg>
              
              {/* 🎯 ТЕКСТОВАЯ ИНФОРМАЦИЯ */}
              <div className={styles.infoContent}>
                <span className={styles.infoLabel}>Email</span>
                <span className={styles.infoValue}>{email}</span>
              </div>
            </div>
          </li>
          
          {/* 🎯 ЭЛЕМЕНТ СПИСКА 2: Телефон */}
          <li className={styles.infoItem}>
            <div className={styles.infoRow}>
              {/* 🎯 ИКОНКА для телефона */}
              <svg className={styles.infoIcon} aria-hidden="true">
                <use href={`${sprite}#icon-phone`} />
              </svg>
              
              {/* 🎯 ТЕКСТОВАЯ ИНФОРМАЦИЯ */}
              <div className={styles.infoContent}>
                <span className={styles.infoLabel}>Phone</span>
                <span className={styles.infoValue}>{formatPhone(phone)}</span>
              </div>
            </div>
          </li>
          
          {/* 🎯 ЭЛЕМЕНТ СПИСКА 3: Дата регистрации */}
          <li className={styles.infoItem}>
            <div className={styles.infoRow}>
              {/* 🎯 ИКОНКА для календаря */}
              <svg className={styles.infoIcon} aria-hidden="true">
                <use href={`${sprite}#icon-calendar`} />
              </svg>
              
              {/* 🎯 ТЕКСТОВАЯ ИНФОРМАЦИЯ */}
              <div className={styles.infoContent}>
                <span className={styles.infoLabel}>Member since</span>
                <span className={styles.infoValue}>
                  {user.createdAt 
                    ? new Date(user.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })
                    : 'Recently'
                  }
                </span>
              </div>
            </div>
          </li>
          
        </ul>
      </div>
    </section>
  );
};

// 🎯 ЭКСПОРТ: Делаем компонент доступным для импорта
export default UserBlock;
