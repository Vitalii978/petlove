// src/components/ModalEditUser/ModalEditUser.jsx
// 🎯 МОДАЛЬНОЕ ОКНО РЕДАКТИРОВАНИЯ ПРОФИЛЯ ПОЛЬЗОВАТЕЛЯ
// ====================================================
// ЧТО ДЕЛАЕТ ЭТОТ КОМПОНЕНТ:
// 1. Открывается поверх страницы (как всплывающее окно)
// 2. Позволяет пользователю изменить свои данные (имя, email, телефон, аватар)
// 3. Валидирует введенные данные (проверяет правильность)
// 4. Отправляет изменения на сервер
// 5. Закрывается по клику на крестик, на фон (оверлей) или на Escape
// ====================================================

import { useState } from 'react';
// useState - хук для хранения данных, которые могут меняться:
// - loading (идет ли загрузка)
// - apiError (ошибка от сервера)
// - avatarImg (временное изображение аватара)

import { useForm } from 'react-hook-form';
// react-hook-form - библиотека для удобной работы с формами
// Она сама:
// - отслеживает значения полей
// - проверяет ошибки валидации
// - собирает данные для отправки

import { yupResolver } from '@hookform/resolvers/yup';
// Связка между react-hook-form и yup
// Позволяет использовать схемы yup для валидации

import * as yup from 'yup';
// yup - библиотека для создания схем валидации
// Описываем правила для каждого поля:
// - обязательное или нет
// - минимальная длина
// - формат (email, URL и т.д.)

import api from '../../services/api';
// api - наш настроенный axios для запросов к серверу
// Умеет автоматически подставлять baseURL и токен

import sprite from '../../assets/icon/icon-sprite.svg';
// sprite - файл со всеми иконками (SVG спрайт)
// Берем оттуда иконки: крестик, пользователь, облако и т.д.

import styles from './ModalEditUser.module.css';
// CSS модуль - стили только для этого компонента
// Классы в стилях не конфликтуют с другими компонентами

// 🎯 СХЕМА ВАЛИДАЦИИ YUP
// ====================================================
// Это как "список правил" для каждого поля формы
// Каждое правило говорит: "Это поле должно соответствовать ..."
// Если не соответствует - показываем ошибку
// ====================================================
const editUserSchema = yup
  .object({
    // 🟢 ПРАВИЛО 1: Имя (name)
    name: yup
      .string() // должно быть строкой
      .required('Name is required') // обязательно для заполнения
      .min(2, 'Name must be at least 2 characters') // минимум 2 символа
      .max(50, 'Name must be less than 50 characters'), // максимум 50 символов

    // 🟢 ПРАВИЛО 2: Email
    email: yup
      .string()
      .required('Email is required')
      .email('Please enter a valid email') // проверяет формат email
      .matches(
        /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
        'Invalid email format' // дополнительная проверка регулярным выражением
      ),

    // 🟢 ПРАВИЛО 3: Аватар (необязательное поле)
    avatar: yup
      .string()
      .url('Please enter a valid URL') // должен быть URL
      .matches(
        /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/,
        'URL must point to an image (png, jpg, jpeg, gif, bmp, webp)' // должен вести на картинку
      )
      .optional(), // необязательное поле

    // 🟢 ПРАВИЛО 4: Телефон (необязательное поле)
    phone: yup
      .string()
      .matches(/^\+38\d{10}$/, 'Phone must be in format: +38XXXXXXXXXX') // формат +380501234567
      .optional(),
  })
  .required(); // вся схема обязательна

// 🎯 ОСНОВНОЙ КОМПОНЕНТ
// ====================================================
// props (входные данные):
// - user: объект с данными пользователя
// - onSave: функция, которая вызовется после успешного сохранения
// - onClose: функция для закрытия модалки
// ====================================================
const ModalEditUser = ({ user, onSave, onClose }) => {
  // =============== СОСТОЯНИЯ (state) ===============
  // 🟢 loading - true когда идет запрос к серверу (показываем "Saving...")
  const [loading, setLoading] = useState(false);

  // 🟢 apiError - текст ошибки от сервера (если есть)
  const [apiError, setApiError] = useState('');

  // 🟢 avatarImg - временный URL загруженного фото (до отправки формы)
  const [avatarImg, setAvatarImg] = useState('');

  // =============== НАСТРОЙКА REACT-HOOK-FORM ===============
  // 🟢 register - функция для "регистрации" полей ввода
  // 🟢 handleSubmit - обертка для отправки формы
  // 🟢 formState.errors - объект с ошибками валидации
  // 🟢 reset - сброс формы к начальным значениям
  // 🟢 setValue - программное изменение значения поля
  // 🟢 watch - отслеживание изменений поля (для превью)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(editUserSchema), // подключаем валидацию Yup
    defaultValues: {
      // начальные значения (из данных пользователя)
      name: user.name || '',
      email: user.email || '',
      avatar: user.avatar || '',
      phone: user.phone || '',
    },
  });

  // 🟢 avatarValue - текущее значение поля avatar (следим за изменениями)
  const avatarValue = watch('avatar');

  // =============== ФУНКЦИЯ ЗАГРУЗКИ ФОТО НА CLOUDINARY ===============
  // Вызывается когда пользователь выбирает файл
  const handleFileUpload = async e => {
    // e.target.files[0] - первый выбранный файл
    const file = e.target.files[0];
    if (!file) return; // если нет файла - выходим

    try {
      setLoading(true); // включаем режим загрузки

      // FormData - специальный объект для отправки файлов
      const formData = new FormData();
      formData.append('file', file); // добавляем сам файл
      formData.append(
        'upload_preset',
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
      ); // ключ доступа

      // Отправляем файл на Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();

      // Если получили URL - сохраняем его
      if (data.secure_url) {
        setValue('avatar', data.secure_url); // в форму
        setAvatarImg(data.secure_url); // в локальное состояние для превью
      }
    } catch (error) {
      console.error('❌ Ошибка загрузки фото:', error);
      setApiError('Failed to upload photo');
    } finally {
      setLoading(false); // выключаем режим загрузки
    }
  };

  // =============== ОТПРАВКА ФОРМЫ ===============
  // formData - объект с данными из формы (после валидации)
  const onSubmit = async formData => {
    try {
      setLoading(true);
      setApiError('');

      console.log('🔄 Отправляем данные для обновления:', formData);

      // 🔥 PATCH запрос на обновление данных пользователя
      // Эндпоинт /users/current/edit берем из документации бэкенда
      const response = await api.patch('/users/current/edit', formData);

      console.log('✅ Пользователь обновлен:', response.data);

      // Если есть функция onSave - вызываем её с новыми данными
      if (onSave) {
        onSave(response.data);
      }

      // Закрываем модалку
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error('❌ Ошибка при обновлении пользователя:', error);

      // =============== ОБРАБОТКА ОШИБОК ===============
      // Разбираем разные типы ошибок от сервера
      if (error.response) {
        // Сервер ответил, но с ошибкой (4xx или 5xx)
        console.log('📊 Статус ошибки:', error.response.status);
        console.log('📊 Сообщение:', error.response.data);

        if (error.response.data?.message) {
          setApiError(error.response.data.message);
        } else if (error.response.status === 404) {
          setApiError('API endpoint not found. Please check the URL.');
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
        // Запрос отправлен, но ответа нет (нет интернета)
        setApiError('No connection to server. Check your internet.');
      } else {
        // Ошибка при настройке запроса
        setApiError('Request setup error');
      }
    } finally {
      setLoading(false);
    }
  };

  // =============== ОТМЕНА (ЗАКРЫТИЕ) ===============
  const handleCancel = () => {
    reset(); // сбрасываем форму к начальным значениям
    if (onClose) {
      onClose(); // вызываем функцию закрытия
    }
  };

  // =============== ЗАКРЫТИЕ ПО КЛИКУ НА ФОН ===============
  const handleBackdropClick = e => {
    // e.target - элемент на который кликнули
    // e.currentTarget - элемент на котором висит обработчик
    // Если кликнули на сам оверлей (фон) - закрываем
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  };

  // =============== ЗАКРЫТИЕ ПО ESCAPE ===============
  // 🎯 useEffect (но мы используем useState с функцией)
  // Этот код выполнится один раз при монтировании компонента
  useState(() => {
    const handleEscape = e => {
      // e.key - какая клавиша нажата
      if (e.key === 'Escape') {
        handleCancel();
      }
    };

    // Добавляем слушатель событий на всю страницу
    window.addEventListener('keydown', handleEscape);

    // Функция очистки (выполнится при размонтировании)
    return () => window.removeEventListener('keydown', handleEscape);
  });

  // =============== 🎯 РЕНДЕР КОМПОНЕНТА ===============
  // То, что увидит пользователь
  return (
    // 🎯 ОВЕРЛЕЙ (фон модалки) - полупрозрачный слой
    <div
      className={styles.modalOverlay}
      onClick={handleBackdropClick} // закрытие по клику на фон
      role="dialog" // для доступности (screen readers)
      aria-modal="true"
      aria-labelledby="modal-title" // связь с заголовком
    >
      {/* 🎯 КОНТЕНТ МОДАЛКИ (белое окно) */}
      <div className={styles.modalContent}>
        {/* 🎯 СПИСОК ВСЕГО КОНТЕНТА (ul - семантическая верстка) */}
        <ul className={styles.modalList}>
          {/* 🟢 ЭЛЕМЕНТ 1: КНОПКА ЗАКРЫТИЯ */}
          <li className={styles.closeButtonItem}>
            <button
              className={styles.closeButton}
              onClick={handleCancel}
              type="button"
              aria-label="Close modal"
            >
              <svg className={styles.closeIcon} width={24} height={24}>
                <use href={`${sprite}#icon-close`} />
              </svg>
            </button>
          </li>

          {/* 🟢 ЭЛЕМЕНТ 2: ЗАГОЛОВОК */}
          <li>
            <h2 id="modal-title" className={styles.modalTitle}>
              Edit information
            </h2>
          </li>

          {/* 🟢 ЭЛЕМЕНТ 3: АВАТАР (с превью) */}
          <li className={styles.avatarItem}>
            <div className={styles.avatarContainer}>
              {/* Если есть аватар (из пропсов или загруженный) - показываем картинку */}
              {user.avatar || avatarImg || avatarValue ? (
                <img
                  src={avatarImg || avatarValue || user.avatar}
                  alt={user.name}
                  className={styles.avatarImage}
                />
              ) : (
                // Иначе показываем иконку-заглушку
                <svg className={styles.avatarIcon}>
                  <use href={`${sprite}#icon-user`} />
                </svg>
              )}
            </div>
          </li>

          {/* 🟢 ЭЛЕМЕНТ 4: ОШИБКА ОТ API (если есть) */}
          {apiError && (
            <li>
              <div className={styles.apiError} role="alert">
                <svg className={styles.errorIcon}>
                  <use href={`${sprite}#icon-alert`} />
                </svg>
                <p>{apiError}</p>
              </div>
            </li>
          )}

          {/* 🟢 ЭЛЕМЕНТ 5: ФОРМА */}
          <li>
            {/* handleSubmit - обертка из react-hook-form */}
            {/* Она предотвращает отправку если есть ошибки валидации */}
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              {/* 🟢 БЛОК ЗАГРУЗКИ АВАТАРА (URL + файл) */}
              <div className={styles.avatarUpload}>
                {/* Поле для ввода URL аватара */}
                <input
                  type="text"
                  className={styles.avatarUrlInput}
                  placeholder={user.avatar || 'Enter URL'}
                  disabled={loading}
                  {...register('avatar')} // регистрируем поле в react-hook-form
                />

                {/* Скрытое поле для загрузки файла */}
                <input
                  type="file"
                  id="avatar-upload"
                  accept="image/*,.png,.jpg,.jpeg,.gif,.bmp,.webp"
                  className={styles.fileInput}
                  onChange={handleFileUpload} // обрабатываем выбор файла
                  disabled={loading}
                />

                {/* Лейбл для скрытого поля (красивая кнопка) */}
                <label
                  htmlFor="avatar-upload"
                  className={styles.fileInputLabel}
                >
                  Upload photo
                  <svg className={styles.uploadIcon}>
                    <use href={`${sprite}#icon-upload-cloud`} />
                  </svg>
                </label>
              </div>

              {/* Ошибка валидации для avatar (если есть) */}
              {errors.avatar && (
                <p className={styles.errorMessage}>{errors.avatar.message}</p>
              )}

              {/* 🟢 ОСНОВНЫЕ ПОЛЯ ФОРМЫ (имя, email, телефон) */}
              <div className={styles.formFields}>
                {/* Имя */}
                <div className={styles.fieldGroup}>
                  <input
                    type="text"
                    className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                    placeholder={user.name || 'Name'}
                    disabled={loading}
                    {...register('name')}
                  />
                  {errors.name && (
                    <p className={styles.errorMessage}>{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div className={styles.fieldGroup}>
                  <input
                    type="email"
                    className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                    placeholder={user.email || 'Email'}
                    disabled={loading}
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className={styles.errorMessage}>
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Телефон */}
                <div className={styles.fieldGroup}>
                  <input
                    type="tel"
                    className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                    placeholder={user.phone || 'Phone'}
                    disabled={loading}
                    {...register('phone')}
                  />
                  {errors.phone && (
                    <p className={styles.errorMessage}>
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              {/* 🟢 КНОПКА ОТПРАВКИ */}
              <button
                type="submit"
                className={styles.submitButton}
                disabled={loading} // блокируем во время загрузки
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
            </form>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ModalEditUser;

// 📋 КЛЮЧЕВЫЕ МОМЕНТЫ ДЛЯ ПОНИМАНИЯ:
// 1. Три уровня валидации:
// Yup - проверяет данные перед отправкой

// React Hook Form - управляет состоянием полей и ошибками

// Сервер - проверяет данные еще раз (на случай если обошли клиент)

// 2. Жизненный цикл модалки:
// Открытие → показываем форму

// Заполнение → валидация на лету

// Сабмит → отправка на сервер

// Успех → закрываем, обновляем профиль

// Ошибка → показываем сообщение

// 3. Два способа загрузки аватара:
// URL - просто ссылка на картинку

// Файл - загружается на Cloudinary, получаем URL

// 4. Закрытие модалки:
// ❌ Крестик

// 🖱️ Клик на фон

// ⌨️ Клавиша Escape

// Понимание этих концепций - основа работы с формами в React!
