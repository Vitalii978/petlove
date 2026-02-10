// src/utils/auth.js
import api from '../services/api'; // ✅ Импортируем наш axios instance

// 1. Проверка авторизации
export function isAuthenticated() {
  const token = localStorage.getItem('token');
  return !!token;
}

// 2. Получить данные пользователя (ИСПРАВЛЕНО - используем api)
export async function getCurrentUser() {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      return { success: false, error: 'Not authenticated' };
    }
    
    // ✅ ИСПРАВЛЕНО: используем api вместо fetch
    const response = await api.get('/users/current');
    
    return {
      success: true,
      user: response.data
    };
    
  } catch (error) {
    console.error('❌ Ошибка при получении пользователя:', error);
    
    if (error.response && error.response.status === 401) {
      // Токен невалидный
      localStorage.removeItem('token');
    }
    
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to get user'
    };
  }
}

// 3. Регистрация (ИСПРАВЛЕНО - используем api)
export async function register(userData) {
  try {
    console.log('🔄 Регистрируем пользователя через api...');
    
    // ✅ ИСПРАВЛЕНО: используем api вместо fetch
    const response = await api.post('/users/signup', userData);
    
    // Сохраняем токен
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      console.log('✅ Токен сохранен');
    }
    
    return {
      success: true,
      user: response.data
    };
    
  } catch (error) {
    console.error('❌ Ошибка при регистрации через api:', error);
    
    let errorMessage = 'Registration failed';
    
    if (error.response) {
      if (error.response.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response.status === 409) {
        errorMessage = 'User with this email already exists';
      } else if (error.response.status === 400) {
        errorMessage = 'Invalid data';
      }
    } else if (error.request) {
      errorMessage = 'No internet connection';
    }
    
    return {
      success: false,
      error: errorMessage
    };
  }
}

// 4. Вход (ИСПРАВЛЕНО - используем api)
export async function login(credentials) {
  try {
    console.log('🔄 Входим в систему через api...');
    
    // ✅ ИСПРАВЛЕНО: используем api вместо fetch
    const response = await api.post('/users/signin', credentials);
    
    console.log('📥 Ответ от сервера при входе:', {
      статус: response.status,
      естьТокен: !!response.data.token
    });
    
    // Сохраняем токен
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      console.log('✅ Токен сохранен');
    }
    
    return {
      success: true,
      user: response.data
    };
    
  } catch (error) {
    console.error('❌ Ошибка при входе через api:', error);
    
    let errorMessage = 'Login failed';
    
    if (error.response) {
      if (error.response.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response.status === 401) {
        errorMessage = 'Wrong email or password';
      } else if (error.response.status === 404) {
        errorMessage = 'User not found';
      }
    } else if (error.request) {
      errorMessage = 'No internet connection';
    }
    
    return {
      success: false,
      error: errorMessage
    };
  }
}

// 5. Выход (ИСПРАВЛЕНО - используем api)
export async function logout() {
  try {
    console.log('🔄 Выходим из системы через api...');
    
    // ✅ ИСПРАВЛЕНО: используем api вместо fetch
    const response = await api.post('/users/signout');
    
    console.log('✅ Выход успешен:', response.data);
    
  } catch (error) {
    console.error('❌ Ошибка при выходе через api:', error);
  } finally {
    // ВСЕГДА удаляем токен из localStorage
    localStorage.removeItem('token');
    console.log('🗑️ Токен удален из localStorage');
  }
}

// 6. Получить токен (помощник)
export function getToken() {
  return localStorage.getItem('token');
}