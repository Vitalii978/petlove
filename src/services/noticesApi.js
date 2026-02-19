// import api from './api';

// const noticesApi = {
//   // 🎯 ПОЛУЧИТЬ ОБЪЯВЛЕНИЯ С ФИЛЬТРАМИ
//   getNotices: async ({
//     page = 1,
//     limit = 12,
//     keyword = '',
//     category = '',
//     sex = '',
//     species = '',
//     locationId = '',
//     byDate = false,
//     byPrice = false,
//     byPopularity = false,
//   } = {}) => {
//     try {
//       // 🔥 ДЕБАГ: Проверяем, что пришло в функцию
//       console.log('🔥🔥🔥 getNotices ПОЛУЧИЛ:', {
//         byPopularity,
//         byPrice,
//         byDate,
//         page,
//         limit,
//         keyword,
//         category,
//         sex,
//         species,
//         locationId,
//       });

//       const params = {
//         page,
//         limit,
//         ...(keyword.trim() && { keyword: keyword.trim() }),
//         ...(category && { category }),
//         ...(sex && { sex }),
//         ...(species && { species }),
//         ...(locationId && { locationId }),
//       };

//       // 🎯 ИСПРАВЛЕНО: сортировка по популярности
//       if (byPopularity === 'popular') {
//         params.sortBy = 'popularity';
//         params.sortOrder = 'desc'; // от максимального к минимальному
//         console.log('✅ Popular: сортировка по убыванию популярности');
//       } else if (byPopularity === 'unpopular') {
//         params.sortBy = 'popularity';
//         params.sortOrder = 'asc'; // от минимального к максимальному
//         console.log('✅ Unpopular: сортировка по возрастанию популярности');
//       } else if (byPopularity === true) {
//         // Для обратной совместимости
//         params.sortBy = 'popularity';
//         params.sortOrder = 'desc';
//         console.log('⚠️ byPopularity=true (устаревшее)');
//       }

//       // 🎯 ИСПРАВЛЕНО: сортировка по цене
//       if (byPrice === 'expensive') {
//         params.sortBy = 'price';
//         params.sortOrder = 'desc'; // от максимальной к минимальной
//         console.log('✅ Expensive: сортировка по убыванию цены');
//       } else if (byPrice === 'cheap') {
//         params.sortBy = 'price';
//         params.sortOrder = 'asc'; // от минимальной к максимальной
//         console.log('✅ Cheap: сортировка по возрастанию цены');
//       } else if (byPrice === true) {
//         // Для обратной совместимости
//         params.sortBy = 'price';
//         params.sortOrder = 'asc';
//         console.log('⚠️ byPrice=true (устаревшее)');
//       }

//       // 🎯 сортировка по дате (если нужна)
//       if (byDate) {
//         params.sortBy = 'date';
//         params.sortOrder = 'desc';
//         console.log('📅 Date: сортировка по дате');
//       }

//       // 🔥 ДЕБАГ: Показываем итоговые параметры
//       console.log('🔥🔥🔥 ИТОГОВЫЕ ПАРАМЕТРЫ ЗАПРОСА:');
//       console.log('params:', JSON.stringify(params, null, 2));
//       console.log('sortBy:', params.sortBy || 'не задан');
//       console.log('sortOrder:', params.sortOrder || 'не задан');

//       console.log('📤 Отправка запроса к /notices с параметрами:', params);

//       const response = await api.get('/notices', { params });

//       // 🔥 ДЕБАГ: Проверяем ответ сервера
//       console.log('🔥🔥🔥 ОТВЕТ СЕРВЕРА:');
//       console.log('Статус:', response.status);
//       console.log('Всего элементов:', response.data.results?.length || 0);

//       // Показываем первые 3 элемента для проверки сортировки
//       if (response.data.results && response.data.results.length > 0) {
//         console.log('Первые 3 элемента (для проверки сортировки):');
//         response.data.results.slice(0, 3).forEach((item, index) => {
//           console.log(`  ${index + 1}.`, {
//             title: item.title,
//             popularity: item.popularity,
//             price: item.price,
//             _id: item._id,
//           });
//         });
//       }

//       console.log('📥 Ответ от /notices:', {
//         статус: response.status,
//         количество: response.data.results?.length || 0,
//         страниц: response.data.totalPages,
//         сортировка: params.sortBy
//           ? `${params.sortBy} (${params.sortOrder})`
//           : 'без сортировки',
//       });

//       return {
//         success: true,
//         data: response.data.results || [],
//         pagination: {
//           currentPage: response.data.page || page,
//           perPage: response.data.perPage || limit,
//           totalPages: response.data.totalPages || 1,
//           totalItems: (response.data.totalPages || 1) * limit,
//         },
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
//           totalItems: 0,
//         },
//       };
//     }
//   },

//   // 🎯 ПОЛУЧИТЬ ВСЕ ОБЪЯВЛЕНИЯ (НОВЫЙ МЕТОД)
//   getAllNotices: async (limit = 100) => {
//     try {
//       console.log(`🔄 Загружаем все объявления (limit: ${limit})...`);

//       const response = await api.get('/notices', {
//         params: { limit, page: 1 },
//       });

//       console.log(
//         '📥 Загружено объявлений:',
//         response.data.results?.length || 0
//       );

//       return {
//         success: true,
//         data: response.data.results || [],
//       };
//     } catch (error) {
//       console.error('❌ Ошибка при получении всех объявлений:', error);
//       return {
//         success: false,
//         data: [],
//       };
//     }
//   },

//   // 🎯 ПОЛУЧИТЬ ДАННЫЕ ДЛЯ ФИЛЬТРОВ
//   getFiltersData: async () => {
//     try {
//       console.log('🔄 Запрашиваем данные для фильтров...');

//       const [categories, sex, species, cities] = await Promise.all([
//         api.get('/notices/categories'),
//         api.get('/notices/sex'),
//         api.get('/notices/species'),
//         api.get('/cities/locations'),
//       ]);

//       console.log('📊 Ответ от /cities/locations:', {
//         статус: cities.status,
//         количество: cities.data?.length || 0,
//         первыеГорода: cities.data?.slice(0, 3),
//       });

//       return {
//         success: true,
//         data: {
//           categories: categories.data || [],
//           sex: sex.data || [],
//           species: species.data || [],
//           cities: cities.data || [],
//         },
//       };
//     } catch (error) {
//       console.error('❌ Ошибка при получении данных фильтров:', error);

//       return {
//         success: false,
//         error: error.message,
//         data: {
//           categories: [],
//           sex: [],
//           species: [],
//           cities: [],
//         },
//       };
//     }
//   },

//   // 🎯 ПОЛУЧИТЬ ОДНО ОБЪЯВЛЕНИЕ ПО ID
//   getNoticeById: async id => {
//     try {
//       const response = await api.get(`/notices/${id}`);
//       return {
//         success: true,
//         data: response.data,
//       };
//     } catch (error) {
//       console.error('❌ Ошибка при получении объявления:', error);
//       return {
//         success: false,
//         error: 'Не удалось загрузить объявление',
//         data: null,
//       };
//     }
//   },

//   // 🎯 ДОБАВИТЬ В ИЗБРАННОЕ
//   addToFavorites: async id => {
//     try {
//       const response = await api.post(`/notices/favorites/add/${id}`);
//       return {
//         success: true,
//         data: response.data,
//       };
//     } catch (error) {
//       console.error('❌ Ошибка при добавлении в избранное:', error);

//       let errorMessage = 'Не удалось добавить в избранное';
//       if (
//         error.response &&
//         error.response.data &&
//         error.response.data.message
//       ) {
//         errorMessage = error.response.data.message;
//       }

//       return {
//         success: false,
//         error: errorMessage,
//       };
//     }
//   },

//   // 🎯 УДАЛИТЬ ИЗ ИЗБРАННОГО
//   removeFromFavorites: async id => {
//     try {
//       const response = await api.delete(`/notices/favorites/remove/${id}`);
//       return {
//         success: true,
//         data: response.data,
//       };
//     } catch (error) {
//       console.error('❌ Ошибка при удалении из избранного:', error);

//       let errorMessage = 'Не удалось удалить из избранного';
//       if (
//         error.response &&
//         error.response.data &&
//         error.response.data.message
//       ) {
//         errorMessage = error.response.data.message;
//       }

//       return {
//         success: false,
//         error: errorMessage,
//       };
//     }
//   },
// };

// export default noticesApi;

// src/services/noticesApi.js
// 🎯 API ДЛЯ РАБОТЫ С ОБЪЯВЛЕНИЯМИ
// ====================================================
// Что делает этот файл:
// 1. Отправляет запросы на бэкенд для получения объявлений
// 2. Получает данные для фильтров (категории, пол, типы, города)
// 3. Работает с избранным (добавление/удаление)
// 4. Содержит подробные логи для отладки
// ====================================================

import api from './api';

const noticesApi = {
  // 🎯 ПОЛУЧИТЬ ОБЪЯВЛЕНИЯ С ФИЛЬТРАМИ
  // Параметры:
  // - page: номер страницы (по умолчанию 1)
  // - limit: количество на странице (по умолчанию 12)
  // - keyword: поисковый запрос
  // - category: категория (sell/free/lost/found)
  // - sex: пол (male/female/multiple/unknown)
  // - species: вид животного
  // - locationId: ID локации
  // - byDate: сортировка по дате (true/false)
  // - byPrice: сортировка по цене (false, 'cheap', 'expensive')
  // - byPopularity: сортировка по популярности (false, 'popular', 'unpopular')
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
      // 🔥 ДЕБАГ: Проверяем, что пришло в функцию
      console.log('🔥🔥🔥 getNotices ПОЛУЧИЛ:', {
        byPopularity,
        byPrice,
        byDate,
        page,
        limit,
        keyword,
        category,
        sex,
        species,
        locationId,
      });

      const params = {
        page,
        limit,
        ...(keyword.trim() && { keyword: keyword.trim() }),
        ...(category && { category }),
        ...(sex && { sex }),
        ...(species && { species }),
        ...(locationId && { locationId }),
      };

      // 🎯 ИСПРАВЛЕНО: сортировка по популярности
      if (byPopularity === 'popular') {
        params.sortBy = 'popularity';
        params.sortOrder = 'desc'; // от максимального к минимальному
        console.log('✅ Popular: сортировка по убыванию популярности');
      } else if (byPopularity === 'unpopular') {
        params.sortBy = 'popularity';
        params.sortOrder = 'asc'; // от минимального к максимальному
        console.log('✅ Unpopular: сортировка по возрастанию популярности');
      } else if (byPopularity === true) {
        // Для обратной совместимости
        params.sortBy = 'popularity';
        params.sortOrder = 'desc';
        console.log('⚠️ byPopularity=true (устаревшее)');
      }

      // 🎯 ИСПРАВЛЕНО: сортировка по цене
      if (byPrice === 'expensive') {
        params.sortBy = 'price';
        params.sortOrder = 'desc'; // от максимальной к минимальной
        console.log('✅ Expensive: сортировка по убыванию цены');
      } else if (byPrice === 'cheap') {
        params.sortBy = 'price';
        params.sortOrder = 'asc'; // от минимальной к максимальной
        console.log('✅ Cheap: сортировка по возрастанию цены');
      } else if (byPrice === true) {
        // Для обратной совместимости
        params.sortBy = 'price';
        params.sortOrder = 'asc';
        console.log('⚠️ byPrice=true (устаревшее)');
      }

      // 🎯 сортировка по дате (если нужна)
      if (byDate) {
        params.sortBy = 'date';
        params.sortOrder = 'desc';
        console.log('📅 Date: сортировка по дате');
      }

      // 🔥 ДЕБАГ: Показываем итоговые параметры
      console.log('🔥🔥🔥 ИТОГОВЫЕ ПАРАМЕТРЫ ЗАПРОСА:');
      console.log('params:', JSON.stringify(params, null, 2));
      console.log('sortBy:', params.sortBy || 'не задан');
      console.log('sortOrder:', params.sortOrder || 'не задан');

      console.log('📤 Отправка запроса к /notices с параметрами:', params);

      const response = await api.get('/notices', { params });

      // 🔥 ДЕБАГ: Проверяем ответ сервера
      console.log('🔥🔥🔥 ОТВЕТ СЕРВЕРА:');
      console.log('Статус:', response.status);
      console.log('Всего элементов:', response.data.results?.length || 0);

      // Показываем первые 3 элемента для проверки сортировки
      if (response.data.results && response.data.results.length > 0) {
        console.log('Первые 3 элемента (для проверки сортировки):');
        response.data.results.slice(0, 3).forEach((item, index) => {
          console.log(`  ${index + 1}.`, {
            title: item.title,
            popularity: item.popularity,
            price: item.price,
            _id: item._id,
          });
        });
      }

      console.log('📥 Ответ от /notices:', {
        статус: response.status,
        количество: response.data.results?.length || 0,
        страниц: response.data.totalPages,
        сортировка: params.sortBy
          ? `${params.sortBy} (${params.sortOrder})`
          : 'без сортировки',
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
  // Используется в NoticesPage для загрузки всех данных сразу
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
