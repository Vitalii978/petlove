// src/services/friendsApi.js

import api from './api';

// 🎯 СЕРВИС ДЛЯ РАБОТЫ С ДРУЗЬЯМИ (ПАРТНЕРАМИ)
const friendsApi = {
  // 🎯 ФУНКЦИЯ: Получить всех друзей (партнеров)
  getFriends: async () => {
    try {
      console.log('🔄 Загружаем список партнеров...');

      const response = await api.get('/friends');

      console.log('📥 Ответ от /friends:', {
        статус: response.status,
        количество: response.data.length || 0,
      });

      return {
        success: true,
        data: response.data || [],
      };
    } catch (error) {
      console.error('❌ Ошибка при получении партнеров:', error);

      let errorMessage = 'Не удалось загрузить партнеров';

      if (error.response) {
        errorMessage = `Ошибка сервера: ${error.response.status}`;
      } else if (error.request) {
        errorMessage = 'Нет соединения с сервером';
      }

      return {
        success: false,
        error: errorMessage,
        data: [],
      };
    }
  },

  // 🎯 ФУНКЦИЯ: Получить одного партнера по ID (если понадобится)
  getFriendById: async id => {
    try {
      const response = await api.get(`/friends/${id}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('❌ Ошибка при получении партнера:', error);
      return {
        success: false,
        error: 'Не удалось загрузить партнера',
        data: null,
      };
    }
  },
};

export default friendsApi;
