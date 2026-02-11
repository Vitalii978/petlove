// src/components/UserCard/PetsBlock/PetsItem/PetsItem.jsx

// 🎯 ИМПОРТЫ
import { useState } from 'react';
import sprite from '../../../../assets/icon/icon-sprite.svg';
import styles from './PetsItem.module.css';

// 🎯 КОМПОНЕНТ PETSITEM: Карточка одного питомца
// Props:
// - pet: объект с данными питомца
// - onDelete: функция удаления питомца
const PetsItem = ({ pet, onDelete }) => {
  // 🎯 СОСТОЯНИЕ ДЛЯ АНИМАЦИИ УДАЛЕНИЯ
  const [isDeleting, setIsDeleting] = useState(false);

  // 🎯 ДЕСТРУКТУРИЗАЦИЯ ДАННЫХ ПИТОМЦА
  const {
    imgURL = '',
    name = 'Unnamed',
    species = 'Unknown',
    birthday = '',
    sex = 'unknown',
    title = ''
  } = pet;

  // 🎯 ФОРМАТИРОВАНИЕ ДАТЫ РОЖДЕНИЯ
  const formatBirthday = (dateString) => {
    if (!dateString) return 'Not specified';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  // 🎯 ФОРМАТИРОВАНИЕ ПОЛА ПИТОМЦА
  const formatSex = (sexValue) => {
    switch (sexValue) {
      case 'male': return 'Male';
      case 'female': return 'Female';
      default: return 'Unknown';
    }
  };

  // 🎯 ФОРМАТИРОВАНИЕ ВИДА ПИТОМЦА
  const formatSpecies = (speciesValue) => {
    if (!speciesValue) return 'Unknown';
    return speciesValue.charAt(0).toUpperCase() + speciesValue.slice(1);
  };

  // 🎯 ОБРАБОТЧИК УДАЛЕНИЯ ПИТОМЦА
  const handleDelete = () => {
    // Запускаем анимацию удаления
    setIsDeleting(true);
    
    // Ждем 300ms для анимации, затем вызываем onDelete
    setTimeout(() => {
      if (onDelete) {
        onDelete();
      }
    }, 300);
  };

  // 🎯 КЛАССЫ ДЛЯ АНИМАЦИИ УДАЛЕНИЯ
  const itemClasses = `${styles.petsItem} ${isDeleting ? styles.deleting : ''}`;

  // 🎯 РЕНДЕР КАРТОЧКИ ПИТОМЦА
  return (
    <article className={itemClasses}>
      
      {/* 🎯 КОНТЕЙНЕР ДЛЯ ИЗОБРАЖЕНИЯ ПИТОМЦА */}
      <div className={styles.petImageContainer}>
        <img 
          src={imgURL || 'https://placehold.co/400x300/cccccc/666666?text=Pet+Photo'} 
          alt={`Photo of ${name}`}
          className={styles.petImage}
          loading="lazy"
          onError={(e) => {
            // 🎯 ЕСЛИ ИЗОБРАЖЕНИЕ НЕ ЗАГРУЗИЛОСЬ
            e.target.src = 'https://placehold.co/400x300/cccccc/666666?text=No+Image';
          }}
        />
        
        {/* 🎯 ИНДИКАТОР ВИДА ПИТОМЦА */}
        <div className={styles.speciesBadge}>
          <svg className={styles.speciesIcon}>
            <use href={`${sprite}#icon-paw`} />
          </svg>
          <span className={styles.speciesText}>
            {formatSpecies(species)}
          </span>
        </div>
      </div>

      {/* 🎯 КОНТЕНТ КАРТОЧКИ */}
      <div className={styles.petContent}>
        
        {/* 🎯 ЗАГОЛОВОК И КНОПКА УДАЛЕНИЯ */}
        <header className={styles.petHeader}>
          <h4 className={styles.petName}>{name}</h4>
          
          {/* 🎯 КНОПКА УДАЛЕНИЯ ПИТОМЦА */}
          <button
            className={styles.deleteButton}
            onClick={handleDelete}
            type="button"
            aria-label={`Delete ${name}`}
            disabled={isDeleting}
          >
            <svg className={styles.deleteIcon}>
              <use href={`${sprite}#icon-trash`} />
            </svg>
          </button>
        </header>

        {/* 🎯 ОПИСАНИЕ (если есть) */}
        {title && (
          <p className={styles.petDescription}>
            {title}
          </p>
        )}

        {/* 🎯 ИНФОРМАЦИЯ О ПИТОМЦЕ - СПИСОК */}
        <ul className={styles.petInfoList}>
          
          {/* 🎯 ДАТА РОЖДЕНИЯ */}
          <li className={styles.petInfoItem}>
            <svg className={styles.infoIcon} aria-hidden="true">
              <use href={`${sprite}#icon-calendar`} />
            </svg>
            <div className={styles.infoContent}>
              <span className={styles.infoLabel}>Birthday</span>
              <span className={styles.infoValue}>{formatBirthday(birthday)}</span>
            </div>
          </li>

          {/* 🎯 ПОЛ */}
          <li className={styles.petInfoItem}>
            <svg className={styles.infoIcon} aria-hidden="true">
              <use href={`${sprite}#icon-gender`} />
            </svg>
            <div className={styles.infoContent}>
              <span className={styles.infoLabel}>Gender</span>
              <span className={styles.infoValue}>{formatSex(sex)}</span>
            </div>
          </li>

        </ul>
      </div>
    </article>
  );
};

export default PetsItem;