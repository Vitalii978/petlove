// src/components/ModalEditUser/ModalEditUser.jsx
// 🎯 МОДАЛЬНОЕ ОКНО РЕДАКТИРОВАНИЯ ПОЛЬЗОВАТЕЛЯ

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import api from '../../services/api';
import { uploadPhotoToCloudinary } from '../../utils/cloudinary'; // 👈 ИМПОРТИРУЕМ
import sprite from '../../assets/icon/icon-sprite.svg';
import styles from './ModalEditUser.module.css';

// 🎯 СХЕМА ВАЛИДАЦИИ YUP
const editUserSchema = yup
  .object({
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
      .matches(/^\+38\d{10}$/, 'Phone must be in format: +38XXXXXXXXXX')
      .optional(),
  })
  .required();

const ModalEditUser = ({ user, onSave, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false); // 👈 ДЛЯ ЗАГРУЗКИ ФОТО
  const [apiError, setApiError] = useState('');
  const [previewUrl, setPreviewUrl] = useState(user.avatar || '');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(editUserSchema),
    defaultValues: {
      name: user.name || '',
      email: user.email || '',
      avatar: user.avatar || '',
      phone: user.phone || '',
    },
  });

  const watchAvatar = watch('avatar');

  useEffect(() => {
    setPreviewUrl(watchAvatar);
  }, [watchAvatar]);

  // 🎯 РЕАЛЬНАЯ ЗАГРУЗКА НА CLOUDINARY
  const handleFileChange = async e => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      setApiError('');

      // Показываем локальное превью сразу
      const localUrl = URL.createObjectURL(file);
      setPreviewUrl(localUrl);

      // 🔥 ЗАГРУЗКА НА CLOUDINARY
      console.log('🔄 Загружаем фото на Cloudinary...');
      const imageUrl = await uploadPhotoToCloudinary(file);
      console.log('✅ Фото загружено, URL:', imageUrl);

      // Сохраняем полученный URL в форму
      setValue('avatar', imageUrl);
    } catch (error) {
      console.error('❌ Ошибка загрузки фото:', error);
      setApiError('Failed to upload photo. Please try again or use URL.');
    } finally {
      setUploading(false);
    }
  };

  // 🎯 ОТПРАВКА НА БЭКЕНД
  const onSubmit = async formData => {
    try {
      setLoading(true);
      setApiError('');

      console.log('🔄 Отправляем данные на сервер:', formData);

      const response = await api.patch('/users/current/edit', formData);

      console.log('✅ Пользователь обновлен:', response.data);

      if (onSave) {
        onSave(response.data);
      }
      onClose();
    } catch (error) {
      console.error('❌ Ошибка при обновлении пользователя:', error);

      if (error.response) {
        if (error.response.data?.message) {
          setApiError(error.response.data.message);
        } else if (error.response.status === 400) {
          setApiError('Invalid data sent to server');
        } else if (error.response.status === 401) {
          setApiError('You are not authorized');
        } else if (error.response.status === 409) {
          setApiError('User with such an email is already exist');
        } else {
          setApiError(`Server error: ${error.response.status}`);
        }
      } else if (error.request) {
        setApiError('No connection to server. Check your internet.');
      } else {
        setApiError('Request setup error');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    reset();
    if (onClose) {
      onClose();
    }
  };

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  };

  useEffect(() => {
    const handleEscape = e => {
      if (e.key === 'Escape') {
        handleCancel();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div
      className={styles.modalOverlay}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={styles.modalContent}>
        <ul className={styles.modalList}>
          <li className={styles.closeButtonItem}>
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
          </li>

          <li>
            <h2 id="modal-title" className={styles.modalTitle}>
              Edit information
            </h2>
          </li>

          <li className={styles.avatarItem}>
            <div className={styles.avatarContainer}>
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Avatar"
                  className={styles.avatarImage}
                  onError={e => {
                    e.target.style.display = 'none';
                    e.target.parentNode.querySelector(
                      `.${styles.avatarIcon}`
                    ).style.display = 'block';
                  }}
                />
              ) : null}
              <svg
                className={`${styles.avatarIcon} ${previewUrl ? styles.hidden : ''}`}
              >
                <use href={`${sprite}#icon-user`} />
              </svg>
            </div>
          </li>

          {apiError && (
            <li className={styles.apiError}>
              <svg className={styles.errorIcon}>
                <use href={`${sprite}#icon-alert`} />
              </svg>
              <p>{apiError}</p>
            </li>
          )}

          <li>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              <div className={styles.avatarUpload}>
                <input
                  type="text"
                  placeholder="Enter URL"
                  className={styles.avatarUrlInput}
                  {...register('avatar')}
                  disabled={loading || uploading}
                />
                <input
                  type="file"
                  id="avatar-upload"
                  accept="image/*"
                  className={styles.fileInput}
                  onChange={handleFileChange}
                  disabled={loading || uploading}
                />
                <label
                  htmlFor="avatar-upload"
                  className={styles.fileInputLabel}
                >
                  {uploading ? 'Uploading...' : 'Upload photo'}
                  <svg className={styles.uploadIcon}>
                    <use href={`${sprite}#icon-upload-cloud`} />
                  </svg>
                </label>
              </div>
              {errors.avatar && (
                <p className={styles.errorMessage}>{errors.avatar.message}</p>
              )}

              <div className={styles.formFields}>
                <div className={styles.fieldGroup}>
                  <input
                    type="text"
                    placeholder="Name *"
                    className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                    disabled={loading || uploading}
                    {...register('name')}
                  />
                  {errors.name && (
                    <p className={styles.errorMessage}>{errors.name.message}</p>
                  )}
                </div>

                <div className={styles.fieldGroup}>
                  <input
                    type="email"
                    placeholder="Email *"
                    className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                    disabled={loading || uploading}
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className={styles.errorMessage}>
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className={styles.fieldGroup}>
                  <input
                    type="tel"
                    placeholder="Phone"
                    className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                    disabled={loading || uploading}
                    {...register('phone')}
                  />
                  {errors.phone && (
                    <p className={styles.errorMessage}>
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className={styles.submitButton}
                disabled={loading || uploading}
              >
                {loading ? 'Saving...' : 'Go to profile'}
              </button>
            </form>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ModalEditUser;
