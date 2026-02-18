// // src/services/noticesApi.js

// import api from './api';

// const noticesApi = {

//   // 🎯 ПОЛУЧИТЬ ОБЪЯВЛЕНИЯ С ФИЛЬТРАМИ
// getNotices: async ({
//   page = 1,
//   limit = 12,
//   keyword = '',
//   category = '',
//   sex = '',
//   species = '',
//   locationId = '',
//   byDate = false,
//   byPrice = false,
//   byPopularity = false
// } = {}) => {

//   try {
//     // 🎯 ПРАВИЛЬНЫЕ ПАРАМЕТРЫ - не отправляем false значения
//     const params = {
//       page,
//       limit,
//       ...(keyword.trim() && { keyword: keyword.trim() }),
//       ...(category && { category }),
//       ...(sex && { sex }),
//       ...(species && { species }),
//       ...(locationId && { locationId }),
//       // 🎯 Отправляем только если true
//       ...(byDate && { byDate: true }),
//       ...(byPrice && { byPrice: true }),
//       ...(byPopularity && { byPopularity: true })
//     };

//     console.log('📤 Запрос к /notices с параметрами:', params);

//       const response = await api.get('/notices', { params });

//       console.log('📥 Ответ от /notices:', {
//         статус: response.status,
//         количество: response.data.results?.length || 0,
//         страниц: response.data.totalPages,
//       });

//       return {
//         success: true,
//         data: response.data.results || [],
//         pagination: {
//           currentPage: response.data.page || page,
//           perPage: response.data.perPage || limit,
//           totalPages: response.data.totalPages || 1,
//           totalItems: (response.data.totalPages || 1) * limit
//         }
//       };

//     } catch (error) {
//       console.error('❌ Ошибка при получении объявлений:', error);

//       let errorMessage = 'Не удалось загрузить объявления';

//       if (error.response) {
//         errorMessage = `Ошибка сервера: ${error.response.status}`;
//         if (error.response.data && error.response.data.message) {
//           errorMessage = error.response.data.message;
//         }
//       } else if (error.request) {
//         errorMessage = 'Нет соединения с сервером';
//       }

//       return {
//         success: false,
//         error: errorMessage,
//         data: [],
//         pagination: {
//           currentPage: page,
//           totalPages: 1,
//           totalItems: 0
//         }
//       };
//     }
//   },

//   // 🎯 ПОЛУЧИТЬ ДАННЫЕ ДЛЯ ФИЛЬТРОВ
//   getFiltersData: async () => {
//     try {
//       console.log('🔄 Запрашиваем данные для фильтров...');

//       // 🎯 ПРАВИЛЬНЫЕ ЭНДПОИНТЫ
//       const [categories, sex, species, cities] = await Promise.all([
//         api.get('/notices/categories'),
//         api.get('/notices/sex'),
//         api.get('/notices/species'),
//         api.get('/cities/locations') // 🎯 ИСПРАВЛЕНО: /cities/locations
//       ]);

//       console.log('📊 Ответ от /cities/locations:', {
//         статус: cities.status,
//         количество: cities.data?.length || 0,
//         первыеГорода: cities.data?.slice(0, 3)
//       });

//       return {
//         success: true,
//         data: {
//           categories: categories.data || [],
//           sex: sex.data || [],
//           species: species.data || [],
//           cities: cities.data || []
//         }
//       };

//     } catch (error) {
//       console.error('❌ Ошибка при получении данных фильтров:', error);

//       if (error.response) {
//         console.error('📡 Статус ошибки:', error.response.status);
//         console.error('📡 Данные ошибки:', error.response.data);
//       }

//       return {
//         success: false,
//         error: error.message,
//         data: {
//           categories: [],
//           sex: [],
//           species: [],
//           cities: []
//         }
//       };
//     }
//   },

//   // 🎯 ПОЛУЧИТЬ ОДНО ОБЪЯВЛЕНИЕ ПО ID
//   getNoticeById: async (id) => {
//     try {
//       const response = await api.get(`/notices/${id}`);
//       return {
//         success: true,
//         data: response.data
//       };
//     } catch (error) {
//       console.error('❌ Ошибка при получении объявления:', error);
//       return {
//         success: false,
//         error: 'Не удалось загрузить объявление',
//         data: null
//       };
//     }
//   },

//   // 🎯 ДОБАВИТЬ В ИЗБРАННОЕ
//   addToFavorites: async (id) => {
//     try {
//       const response = await api.post(`/notices/favorites/add/${id}`);
//       return {
//         success: true,
//         data: response.data
//       };
//     } catch (error) {
//       console.error('❌ Ошибка при добавлении в избранное:', error);

//       let errorMessage = 'Не удалось добавить в избранное';
//       if (error.response && error.response.data && error.response.data.message) {
//         errorMessage = error.response.data.message;
//       }

//       return {
//         success: false,
//         error: errorMessage
//       };
//     }
//   },

//   // 🎯 УДАЛИТЬ ИЗ ИЗБРАННОГО
//   removeFromFavorites: async (id) => {
//     try {
//       const response = await api.delete(`/notices/favorites/remove/${id}`);
//       return {
//         success: true,
//         data: response.data
//       };
//     } catch (error) {
//       console.error('❌ Ошибка при удалении из избранного:', error);

//       let errorMessage = 'Не удалось удалить из избранного';
//       if (error.response && error.response.data && error.response.data.message) {
//         errorMessage = error.response.data.message;
//       }

//       return {
//         success: false,
//         error: errorMessage
//       };
//     }
//   }

// };

// export default noticesApi;

// src/services/noticesApi.js

import api from './api';

const noticesApi = {
  // 🎯 ПОЛУЧИТЬ ОБЪЯВЛЕНИЯ С ФИЛЬТРАМИ
  getNotices: async ({
    page = 1,
    limit = 12,
    keyword = '',
    category = '',
    sex = '',
    species = '',
    locationId = '',
    byDate = false,
    byPrice = false,
    byPopularity = false,
  } = {}) => {
    try {
      const params = {
        page,
        limit,
        ...(keyword.trim() && { keyword: keyword.trim() }),
        ...(category && { category }),
        ...(sex && { sex }),
        ...(species && { species }),
        ...(locationId && { locationId }),
        ...(byDate && { byDate: true }),
        ...(byPrice && { byPrice: true }),
        ...(byPopularity && { byPopularity: true }),
      };

      console.log('📤 Запрос к /notices с параметрами:', params);

      const response = await api.get('/notices', { params });

      console.log('📥 Ответ от /notices:', {
        статус: response.status,
        количество: response.data.results?.length || 0,
        страниц: response.data.totalPages,
      });

      return {
        success: true,
        data: response.data.results || [],
        pagination: {
          currentPage: response.data.page || page,
          perPage: response.data.perPage || limit,
          totalPages: response.data.totalPages || 1,
          totalItems: (response.data.totalPages || 1) * limit,
        },
      };
    } catch (error) {
      console.error('❌ Ошибка при получении объявлений:', error);

      let errorMessage = 'Не удалось загрузить объявления';

      if (error.response) {
        errorMessage = `Ошибка сервера: ${error.response.status}`;
        if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
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

  // 🎯 ПОЛУЧИТЬ ВСЕ ОБЪЯВЛЕНИЯ (НОВЫЙ МЕТОД)
  getAllNotices: async (limit = 100) => {
    try {
      console.log(`🔄 Загружаем все объявления (limit: ${limit})...`);

      const response = await api.get('/notices', {
        params: { limit, page: 1 },
      });

      console.log(
        '📥 Загружено объявлений:',
        response.data.results?.length || 0
      );

      return {
        success: true,
        data: response.data.results || [],
      };
    } catch (error) {
      console.error('❌ Ошибка при получении всех объявлений:', error);
      return {
        success: false,
        data: [],
      };
    }
  },

  // 🎯 ПОЛУЧИТЬ ДАННЫЕ ДЛЯ ФИЛЬТРОВ
  getFiltersData: async () => {
    try {
      console.log('🔄 Запрашиваем данные для фильтров...');

      const [categories, sex, species, cities] = await Promise.all([
        api.get('/notices/categories'),
        api.get('/notices/sex'),
        api.get('/notices/species'),
        api.get('/cities/locations'),
      ]);

      console.log('📊 Ответ от /cities/locations:', {
        статус: cities.status,
        количество: cities.data?.length || 0,
        первыеГорода: cities.data?.slice(0, 3),
      });

      return {
        success: true,
        data: {
          categories: categories.data || [],
          sex: sex.data || [],
          species: species.data || [],
          cities: cities.data || [],
        },
      };
    } catch (error) {
      console.error('❌ Ошибка при получении данных фильтров:', error);

      return {
        success: false,
        error: error.message,
        data: {
          categories: [],
          sex: [],
          species: [],
          cities: [],
        },
      };
    }
  },

  // 🎯 ПОЛУЧИТЬ ОДНО ОБЪЯВЛЕНИЕ ПО ID
  getNoticeById: async id => {
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

  // 🎯 ДОБАВИТЬ В ИЗБРАННОЕ
  addToFavorites: async id => {
    try {
      const response = await api.post(`/notices/favorites/add/${id}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('❌ Ошибка при добавлении в избранное:', error);

      let errorMessage = 'Не удалось добавить в избранное';
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      }

      return {
        success: false,
        error: errorMessage,
      };
    }
  },

  // 🎯 УДАЛИТЬ ИЗ ИЗБРАННОГО
  removeFromFavorites: async id => {
    try {
      const response = await api.delete(`/notices/favorites/remove/${id}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('❌ Ошибка при удалении из избранного:', error);

      let errorMessage = 'Не удалось удалить из избранного';
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      }

      return {
        success: false,
        error: errorMessage,
      };
    }
  },
};

export default noticesApi;
