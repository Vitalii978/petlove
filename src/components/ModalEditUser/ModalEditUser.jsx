// src/components/ModalEditUser/ModalEditUser.jsx

// 🎯 ИМПОРТЫ ДЛЯ ФОРМЫ И ВАЛИДАЦИИ
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import api from '../../services/api'; // ✅ Используем api, не fetch
import sprite from '../../assets/icon/icon-sprite.svg';
import styles from './ModalEditUser.module.css';

// 🎯 СХЕМА ВАЛИДАЦИИ YUP
// Определяем правила проверки для каждого поля
const editUserSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email')
    .matches(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      'Invalid email format'
    ),
  
  avatar: yup
    .string()
    .url('Please enter a valid URL')
    .matches(
      /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/,
      'URL must point to an image (png, jpg, jpeg, gif, bmp, webp)'
    )
    .optional(),
  
  phone: yup
    .string()
    .matches(
      /^\+38\d{10}$/,
      'Phone must be in format: +38XXXXXXXXXX'
    )
    .optional(),
}).required();

// 🎯 КОМПОНЕНТ МОДАЛЬНОГО ОКНА РЕДАКТИРОВАНИЯ
const ModalEditUser = ({ user, onSave, onClose }) => {
  // 🎯 СОСТОЯНИЕ ДЛЯ ЗАГРУЗКИ И ОШИБОК
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  // 🎯 ИНИЦИАЛИЗАЦИЯ REACT-HOOK-FORM С YUP ВАЛИДАЦИЕЙ
  const {
    register,           // Регистрация полей ввода
    handleSubmit,       // Обработчик отправки формы
    formState: { errors }, // Объект с ошибками валидации
    reset,              // Сброс формы
  } = useForm({
    resolver: yupResolver(editUserSchema), // Подключаем Yup валидацию
    defaultValues: {    // Начальные значения из данных пользователя
      name: user.name || '',
      email: user.email || '',
      avatar: user.avatar || '',
      phone: user.phone || '',
    },
  });

  // 🎯 ОБРАБОТЧИК ОТПРАВКИ ФОРМЫ
  const onSubmit = async (formData) => {
    try {
      setLoading(true);
      setApiError('');

      console.log('🔄 Отправляем данные для обновления:', formData);

      // 🎯 ОТПРАВЛЯЕМ ЗАПРОС НА API (используем api, не fetch!)
      const response = await api.patch('/users/current', formData);

      console.log('✅ Пользователь обновлен:', response.data);

      // Вызываем колбэк onSave с обновленными данными
      if (onSave) {
        onSave(response.data);
      }

      // Закрываем модальное окно
      if (onClose) {
        onClose();
      }

    } catch (error) {
      console.error('❌ Ошибка при обновлении пользователя:', error);
      
      // 🎯 ОБРАБОТКА ОШИБОК ОТ API
      if (error.response) {
        // Сервер вернул ошибку
        if (error.response.data?.message) {
          setApiError(error.response.data.message);
        } else if (error.response.status === 400) {
          setApiError('Invalid data sent to server');
        } else if (error.response.status === 401) {
          setApiError('You are not authorized');
        } else {
          setApiError(`Server error: ${error.response.status}`);
        }
      } else if (error.request) {
        // Нет ответа от сервера
        setApiError('No connection to server. Check your internet.');
      } else {
        // Ошибка в настройке запроса
        setApiError('Request setup error');
      }
    } finally {
      setLoading(false);
    }
  };

  // 🎯 ОБРАБОТЧИК ОТМЕНЫ
  const handleCancel = () => {
    reset(); // Сбрасываем форму к начальным значениям
    if (onClose) {
      onClose();
    }
  };

  // 🎯 ОБРАБОТЧИК ЗАКРЫТИЯ ПО BACKDROP И ESCAPE
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  };

  // Добавляем обработчик Escape
  useState(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleCancel();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  });

  // 🎯 РЕНДЕР МОДАЛЬНОГО ОКНА
  return (
    <div 
      className={styles.modalOverlay} 
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={styles.modalContent}>
        
        {/* 🎯 ЗАГОЛОВОК МОДАЛКИ */}
        <header className={styles.modalHeader}>
          <h2 id="modal-title" className={styles.modalTitle}>
            Edit Profile
          </h2>
          
          {/* 🎯 КНОПКА ЗАКРЫТИЯ */}
          <button
            className={styles.closeButton}
            onClick={handleCancel}
            type="button"
            aria-label="Close modal"
          >
            <svg className={styles.closeIcon}>
              <use href={`${sprite}#icon-close`} />
            </svg>
          </button>
        </header>

        {/* 🎯 ОШИБКА ОТ API (если есть) */}
        {apiError && (
          <div className={styles.apiError} role="alert">
            <svg className={styles.errorIcon}>
              <use href={`${sprite}#icon-alert`} />
            </svg>
            <p>{apiError}</p>
          </div>
        )}

        {/* 🎯 ФОРМА РЕДАКТИРОВАНИЯ */}
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          
          {/* 🎯 СПИСОК ПОЛЕЙ ВВОДА */}
          <ul className={styles.formFields}>
            
            {/* 🎯 ПОЛЕ 1: ИМЯ */}
            <li className={styles.formField}>
              <label htmlFor="edit-name" className={styles.label}>
                Name *
              </label>
              <input
                id="edit-name"
                type="text"
                className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                placeholder="Enter your name"
                disabled={loading}
                {...register('name')} // 🎯 Регистрируем поле в react-hook-form
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p id="name-error" className={styles.errorMessage}>
                  {errors.name.message}
                </p>
              )}
            </li>

            {/* 🎯 ПОЛЕ 2: EMAIL */}
            <li className={styles.formField}>
              <label htmlFor="edit-email" className={styles.label}>
                Email *
              </label>
              <input
                id="edit-email"
                type="email"
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                placeholder="Enter your email"
                disabled={loading}
                {...register('email')}
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className={styles.errorMessage}>
                  {errors.email.message}
                </p>
              )}
            </li>

            {/* 🎯 ПОЛЕ 3: АВАТАР (URL) */}
            <li className={styles.formField}>
              <label htmlFor="edit-avatar" className={styles.label}>
                Avatar URL
              </label>
              <input
                id="edit-avatar"
                type="url"
                className={`${styles.input} ${errors.avatar ? styles.inputError : ''}`}
                placeholder="https://example.com/avatar.jpg"
                disabled={loading}
                {...register('avatar')}
                aria-invalid={errors.avatar ? "true" : "false"}
                aria-describedby={errors.avatar ? "avatar-error" : undefined}
              />
              {errors.avatar && (
                <p id="avatar-error" className={styles.errorMessage}>
                  {errors.avatar.message}
                </p>
              )}
              <p className={styles.fieldHint}>
                Supported formats: png, jpg, jpeg, gif, bmp, webp
              </p>
            </li>

            {/* 🎯 ПОЛЕ 4: ТЕЛЕФОН */}
            <li className={styles.formField}>
              <label htmlFor="edit-phone" className={styles.label}>
                Phone
              </label>
              <input
                id="edit-phone"
                type="tel"
                className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                placeholder="+380123456789"
                disabled={loading}
                {...register('phone')}
                aria-invalid={errors.phone ? "true" : "false"}
                aria-describedby={errors.phone ? "phone-error" : undefined}
              />
              {errors.phone && (
                <p id="phone-error" className={styles.errorMessage}>
                  {errors.phone.message}
                </p>
              )}
              <p className={styles.fieldHint}>
                Format: +38 followed by 10 digits
              </p>
            </li>
          </ul>

          {/* 🎯 КНОПКИ ФОРМЫ */}
          <div className={styles.formButtons}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </button>
            
            <button
              type="submit"
              className={styles.saveButton}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className={styles.spinner}></span>
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEditUser;