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
    // 🎯 1. СОЗДАЕМ FORM DATA для отправки файла
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    
    // 🎯 2. ОТПРАВЛЯЕМ НА CLOUDINARY
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    );
    
    console.log('✅ Фото загружено:', response.data.secure_url);
    
    // 🎯 3. ВОЗВРАЩАЕМ URL загруженного фото
    return response.data.secure_url;
    
  } catch (error) {
    console.error('❌ Ошибка загрузки фото:', error);
    throw new Error('Failed to upload photo');
  }
};