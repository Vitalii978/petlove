// src/components/UserCard/UserBlock/UserBlock.jsx
// 🎯 БЛОК ИНФОРМАЦИИ О ПОЛЬЗОВАТЕЛЕ
// ====================================================
// ЧТО ДЕЛАЕТ ЭТОТ КОМПОНЕНТ:
// 1. Отображает аватар пользователя (если есть)
// 2. Если аватара нет - показывает иконку и кнопку "Upload photo"
// 3. При нажатии на кнопку можно загрузить фото (как в ModalEditUser)
// 4. Отображает имя, email и телефон пользователя (только для чтения)
// ====================================================

import { useState } from 'react';
import sprite from '../../../assets/icon/icon-sprite.svg';
import { uploadPhotoToCloudinary } from '../../../utils/cloudinary';
import styles from './UserBlock.module.css';

const UserBlock = ({ user, onUpdate }) => {
  // 🎯 СОСТОЯНИЯ КОМПОНЕНТА:
  // uploading - флаг загрузки фото (чтобы показать "Uploading..." и заблокировать кнопку)
  // previewUrl - временный URL для предпросмотра фото (сразу после выбора файла)
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(user.avatar || '');

  // 🎯 ДЕСТРУКТУРИЗАЦИЯ ДАННЫХ ПОЛЬЗОВАТЕЛЯ
  // Берем из props.user нужные поля, подставляем значения по умолчанию
  const { name = 'User', email = 'No email', phone = 'Not specified' } = user;

  // 🎯 ФУНКЦИЯ ФОРМАТИРОВАНИЯ ТЕЛЕФОНА
  // Превращает +380501234567 в +38 (050) 123-45-67
  const formatPhone = phoneNumber => {
    if (!phoneNumber || phoneNumber === 'Not specified') return 'Not specified';
    const digits = phoneNumber.replace(/\D/g, '');
    if (digits.length === 12 && digits.startsWith('38')) {
      return `+${digits.slice(0, 2)} (${digits.slice(2, 5)}) ${digits.slice(5, 8)}-${digits.slice(8, 10)}-${digits.slice(10, 12)}`;
    }
    return phoneNumber;
  };

  // 🎯 ОБРАБОТЧИК ВЫБОРА ФАЙЛА (КОПИЯ ИЗ ModalEditUser)
  // 1. Пользователь выбирает файл
  // 2. Создаем локальный URL для предпросмотра
  // 3. Загружаем на Cloudinary
  // 4. Обновляем пользователя с новым URL аватара
  const handleFileChange = async e => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);

      // 🔥 ШАГ 1: Создаем локальный URL для мгновенного предпросмотра
      const localUrl = URL.createObjectURL(file);
      setPreviewUrl(localUrl);

      // 🔥 ШАГ 2: Загружаем фото на Cloudinary
      console.log('🔄 Загружаем фото на Cloudinary...');
      const imageUrl = await uploadPhotoToCloudinary(file);
      console.log('✅ Фото загружено, URL:', imageUrl);

      // 🔥 ШАГ 3: Обновляем данные пользователя через onUpdate
      if (onUpdate) {
        onUpdate({ ...user, avatar: imageUrl });
      }
    } catch (error) {
      console.error('❌ Ошибка загрузки фото:', error);
      alert('Failed to upload photo. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    // 🎯 ИСПОЛЬЗУЕМ <ul> ДЛЯ СЕМАНТИЧЕСКОЙ ВЕРСТКИ (список)
    <ul className={styles.userBlock}>
      {/* 🎯 ЭЛЕМЕНТ СПИСКА: БЛОК С АВАТАРОМ И КНОПКОЙ */}
      <li className={styles.imgIcon}>
        {/* 🎯 УСЛОВИЕ: Если есть previewUrl (фото загружено) - показываем картинку */}
        {previewUrl ? (
          // ✅ ЕСТЬ ФОТО: показываем его
          <img src={previewUrl} alt={name} className={styles.imgUser} />
        ) : (
          // ❌ НЕТ ФОТО: показываем иконку и кнопку загрузки
          <div className={styles.boxIcon}>
            {/* Иконка пользователя (заглушка) */}
            <svg className={styles.iconUser}>
              <use href={`${sprite}#icon-user`} />
            </svg>

            {/* 🎯 СКРЫТЫЙ INPUT ДЛЯ ВЫБОРА ФАЙЛА (как в ModalEditUser) */}
            <input
              type="file"
              id="avatar-upload"
              accept="image/*"
              className={styles.fileInput}
              onChange={handleFileChange}
              disabled={uploading}
            />

            {/* 🎯 КНОПКА ЗАГРУЗКИ (на самом деле это label, привязанный к input) */}
            {/* htmlFor="avatar-upload" связывает label с input по id */}
            <label htmlFor="avatar-upload" className={styles.buttonImg}>
              {uploading ? 'Uploading...' : 'Upload photo'}
            </label>
          </div>
        )}
      </li>

      {/* 🎯 ЗАГОЛОВОК (НЕ ВНУТРИ LI, КАК В ПРИМЕРЕ) */}
      <h2 className={styles.title}>My information</h2>

      {/* 🎯 ЭЛЕМЕНТ СПИСКА: ПОЛЯ С ДАННЫМИ ПОЛЬЗОВАТЕЛЯ */}
      <li className={styles.boxInput}>
        {/* Имя - только для чтения */}
        <input
          type="text"
          defaultValue={name}
          className={styles.input}
          readOnly
        />

        {/* Email - только для чтения */}
        <input
          type="text"
          defaultValue={email}
          className={styles.input}
          readOnly
        />

        {/* Телефон - только для чтения (отформатированный) */}
        <input
          type="text"
          defaultValue={formatPhone(phone)}
          className={styles.input}
          readOnly
        />
      </li>
    </ul>
  );
};

export default UserBlock;
