// src/services/noticesApi.js

import api from './api';

// 🎯 ОБЪЕКТ ДЛЯ РАБОТЫ С ОБЪЯВЛЕНИЯМИ
const noticesApi = {
  
  // 🎯 ФУНКЦИЯ: Получить объявления с фильтрацией и пагинацией
  getNotices: async ({ 
    page = 1, 
    limit = 12, 
    query = '',
    category = '',
    gender = '',
    species = '',
    city = '',
  } = {}) => {
    
    // 🎯 Собираем параметры фильтрации
    const params = {
      page,
      limit,
      ...(query && { query }),
      ...(category && { category }),
      ...(gender && { gender }),
      ...(species && { species }),
      ...(city && { city }),
    };
    
    console.log('📤 Отправляем запрос на /notices с параметрами:', params);
    
    try {
      const response = await api.get('/notices', { params });
      
      console.log('📥 Получен ответ от /notices:', {
        статус: response.status,
        количество_объявлений: response.data.results?.length || 0,
        всего_страниц: response.data.totalPages,
      });
      
      return {
        success: true,
        data: response.data.results || [],
        pagination: {
          currentPage: response.data.page || page,
          totalPages: response.data.totalPages || 1,
          totalItems: response.data.total || 0,
        },
      };
      
    } catch (error) {
      console.error('❌ Ошибка при получении объявлений:', error);
      
      let errorMessage = 'Не удалось загрузить объявления';
      
      if (error.response) {
        errorMessage = `Ошибка сервера: ${error.response.status}`;
      } else if (error.request) {
        errorMessage = 'Нет соединения с сервером';
      }
      
      return {
        success: false,
        error: errorMessage,
        data: [],
        pagination: {
          currentPage: page,
          totalPages: 1,
          totalItems: 0,
        },
      };
    }
  },
  
  // 🎯 ФУНКЦИЯ: Получить данные для фильтров
  getFiltersData: async () => {
    try {
      console.log('🔄 Запрашиваем данные для фильтров...');
      
      // 🎯 Делаем параллельные запросы для всех фильтров
      // Promise.all - выполняет все промисы параллельно
      const [categories, genders, species, cities] = await Promise.all([
        api.get('/notices/categories').catch(() => ({ data: [] })),
        api.get('/notices/genders').catch(() => ({ data: [] })),
        api.get('/notices/species').catch(() => ({ data: [] })),
        api.get('/cities').catch(() => ({ data: [] })),
      ]);
      
      return {
        success: true,
        data: {
          categories: categories.data || [],
          genders: genders.data || [],
          species: species.data || [],
          cities: cities.data || [],
        },
      };
      
    } catch (error) {
      console.error('❌ Ошибка при получении данных фильтров:', error);
      return {
        success: false,
        error: 'Не удалось загрузить данные фильтров',
        data: {
          categories: [],
          genders: [],
          species: [],
          cities: [],
        },
      };
    }
  },
  
  // 🎯 ФУНКЦИЯ: Получить одно объявление по ID (для модального окна)
  getNoticeById: async (id) => {
    try {
      const response = await api.get(`/notices/${id}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('❌ Ошибка при получении объявления:', error);
      return {
        success: false,
        error: 'Не удалось загрузить объявление',
        data: null,
      };
    }
  },
  
  // 🎯 ФУНКЦИЯ: Добавить в избранное (будем использовать позже)
  addToFavorites: async (noticeId) => {
    try {
      const response = await api.post(`/notices/${noticeId}/favorite`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('❌ Ошибка при добавлении в избранное:', error);
      return {
        success: false,
        error: 'Не удалось добавить в избранное',
      };
    }
  },
  
  // 🎯 ФУНКЦИЯ: Удалить из избранного
  removeFromFavorites: async (noticeId) => {
    try {
      const response = await api.delete(`/notices/${noticeId}/favorite`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('❌ Ошибка при удалении из избранного:', error);
      return {
        success: false,
        error: 'Не удалось удалить из избранного',
      };
    }
  },
  
};

export default noticesApi;