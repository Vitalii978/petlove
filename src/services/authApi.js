// src/services/authApi.js

import api from './api';

// 🎯 СЕРВИС ДЛЯ РАБОТЫ С АВТОРИЗАЦИЕЙ (исправленный по документации)
const authApi = {
  // 🎯 ФУНКЦИЯ: Регистрация нового пользователя
  // Документация: POST /users/signup
  register: async userData => {
    try {
      console.log('🔄 Регистрируем нового пользователя...');
      console.log('📤 Отправляемые данные:', {
        name: userData.name,
        email: userData.email,
        // Не логируем пароль для безопасности!
      });

      // 🎯 ИСПРАВЛЕНО: правильный эндпоинт
      const response = await api.post('/users/signup', userData);

      console.log('📥 Ответ от сервера при регистрации:', {
        статус: response.status,
        естьТокен: !!response.data.token,
        естьПользователь: !!response.data.name,
      });

      // Сохраняем токен в localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        console.log('✅ Токен сохранен в localStorage');
      }

      return {
        success: true,
        data: response.data, // {email, name, token}
      };
    } catch (error) {
      console.error('❌ Ошибка при регистрации:', error);

      let errorMessage = 'Не удалось зарегистрироваться';

      if (error.response) {
        // Сервер ответил с ошибкой
        console.log('📡 Статус ошибки:', error.response.status);
        console.log('📡 Данные ошибки:', error.response.data);

        if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.status === 409) {
          errorMessage = 'Пользователь с таким email уже существует';
        } else if (error.response.status === 400) {
          errorMessage = 'Неверные данные для регистрации';
        }
      } else if (error.request) {
        errorMessage = 'Нет соединения с сервером';
      }

      return {
        success: false,
        error: errorMessage,
      };
    }
  },

  // 🎯 ФУНКЦИЯ: Вход (логин) пользователя
  // Документация: POST /users/signin
  login: async credentials => {
    try {
      console.log('🔄 Авторизуем пользователя...');

      // 🎯 ИСПРАВЛЕНО: правильный эндпоинт
      const response = await api.post('/users/signin', credentials);

      console.log('📥 Ответ от сервера при входе:', {
        статус: response.status,
        естьТокен: !!response.data.token,
        естьПользователь: !!response.data.name,
      });

      // Сохраняем токен
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        console.log('✅ Токен сохранен в localStorage');
      }

      return {
        success: true,
        data: response.data, // {email, name, token}
      };
    } catch (error) {
      console.error('❌ Ошибка при входе:', error);

      let errorMessage = 'Не удалось войти';

      if (error.response) {
        if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.status === 401) {
          errorMessage = 'Неверный email или пароль';
        } else if (error.response.status === 404) {
          errorMessage = 'Пользователь не найден';
        }
      } else if (error.request) {
        errorMessage = 'Нет соединения с сервером';
      }

      return {
        success: false,
        error: errorMessage,
      };
    }
  },

  // 🎯 ФУНКЦИЯ: Выход (логаут) пользователя
  // Документация: POST /users/signout
  logout: async () => {
    try {
      console.log('🔄 Выходим из системы...');

      // 🎯 ИСПРАВЛЕНО: правильный эндпоинт
      const response = await api.post('/users/signout');

      // Удаляем токен из localStorage
      localStorage.removeItem('token');
      console.log('🗑️ Токен удален из localStorage');

      return {
        success: true,
        data: response.data, // {message: "Sign out success"}
      };
    } catch (error) {
      console.error('❌ Ошибка при выходе:', error);

      // Даже если сервер ответил с ошибкой, удаляем токен на клиенте
      localStorage.removeItem('token');
      console.log('🗑️ Токен удален (даже при ошибке сервера)');

      return {
        success: false,
        error: 'Не удалось выйти из системы',
      };
    }
  },

  // 🎯 ФУНКЦИЯ: Получить текущего пользователя
  // Документация: GET /users/current
  getCurrentUser: async () => {
    try {
      console.log('🔄 Получаем данные текущего пользователя...');

      const response = await api.get('/users/current');

      console.log('📥 Текущий пользователь:', {
        имя: response.data.name,
        email: response.data.email,
        естьТокен: !!response.data.token,
      });

      return {
        success: true,
        data: response.data, // {_id, name, email, token, noticesFavorites, ...}
      };
    } catch (error) {
      console.error('❌ Ошибка при получении пользователя:', error);

      // Если ошибка 401 (Unauthorized) - токен не валидный
      if (error.response && error.response.status === 401) {
        console.log('🔐 Токен не валидный, удаляем его');
        localStorage.removeItem('token');
      }

      return {
        success: false,
        error: 'Не удалось получить данные пользователя',
        data: null,
      };
    }
  },

  // 🎯 ФУНКЦИЯ: Получить полную информацию о пользователе
  // Документация: GET /users/current/full
  getCurrentUserFull: async () => {
    try {
      console.log('🔄 Получаем полную информацию о пользователе...');

      const response = await api.get('/users/current/full');

      console.log('📥 Полная информация пользователя:', {
        имя: response.data.name,
        email: response.data.email,
        аватар: response.data.avatar,
        телефон: response.data.phone,
        количество_питомцев: response.data.pets?.length || 0,
        избранные_объявления: response.data.noticesFavorites?.length || 0,
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('❌ Ошибка при получении полной информации:', error);

      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
      }

      return {
        success: false,
        error: 'Не удалось получить полную информацию',
        data: null,
      };
    }
  },
};

export default authApi;
