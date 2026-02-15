// 📁 src/utils/cloudinary.js
// 🎯 ЭТО ФУНКЦИЯ ДЛЯ ЗАГРУЗКИ ФОТО НА CLOUDINARY

import axios from 'axios';

/**
 * Загружает фото на Cloudinary и возвращает URL
 * @param {File} file - файл изображения
 * @returns {Promise<string>} URL загруженного изображения
 */
export const uploadPhotoToCloudinary = async (file) => {
  try {
    // 🎯 ШАГ 1: СОЗДАЕМ FORM DATA для отправки файла
    // FormData - специальный формат для отправки файлов
    const formData = new FormData();
    formData.append('file', file);  // Добавляем сам файл
    
    // Добавляем "ключ" от нашего аккаунта на Cloudinary
    // Эти данные хранятся в .env файле (секретно!)
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    
    // 🎯 ШАГ 2: ОТПРАВЛЯЕМ НА CLOUDINARY
    // Это как "загрузить фото в облако"
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    );
    
    console.log('✅ Фото загружено:', response.data.secure_url);
    
    // 🎯 ШАГ 3: ВОЗВРАЩАЕМ URL загруженного фото
    // secure_url - это постоянная ссылка на фото в интернете
    return response.data.secure_url;
    
  } catch (error) {
    console.error('❌ Ошибка загрузки фото:', error);
    throw new Error('Failed to upload photo');
  }
};