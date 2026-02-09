// // src/utils/auth.js

// // 🎯 ФУНКЦИЯ 1: Проверка авторизации (ГЛАВНАЯ)
// export function isAuthenticated() {
//   const token = localStorage.getItem('token');
//   return !!token; // true если есть токен, false если нет
// }

// // 🎯 ФУНКЦИЯ 2: Сохранить токен
// export function saveToken(token) {
//   localStorage.setItem('token', token);
// }

// // 🎯 ФУНКЦИЯ 3: Удалить токен
// export function removeToken() {
//   localStorage.removeItem('token');
// }

// // 🎯 ФУНКЦИЯ 4: Регистрация (ИСПРАВЛЕНА - убрал error)
// export async function register(userData) {
//   try {
//     console.log('🔄 Регистрируем пользователя...');
    
//     const response = await fetch('https://petlove.b.goit.study/api/users/signup', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(userData),
//     });

//     const data = await response.json();
    
//     console.log('📥 Ответ сервера:', {
//       статус: response.status,
//       данные: data
//     });
    
//     if (response.ok) {
//       // Успешно!
//       saveToken(data.token);
//       console.log('✅ Токен сохранен');
//       return { success: true, user: data };
//     } else {
//       // Ошибка от сервера
//       let errorMessage = 'Registration failed';
      
//       if (data.message) {
//         errorMessage = data.message;
//       } else if (response.status === 409) {
//         errorMessage = 'User with this email already exists';
//       } else if (response.status === 400) {
//         errorMessage = 'Invalid data';
//       }
      
//       return { success: false, error: errorMessage };
//     }
//   } catch {
//     // 🎯 ИСПРАВЛЕНО: убрал параметр error
//     console.error('❌ Ошибка сети');
//     return { success: false, error: 'No internet connection' };
//   }
// }

// // 🎯 ФУНКЦИЯ 5: Вход (ИСПРАВЛЕНА - убрал error)
// export async function login(credentials) {
//   try {
//     console.log('🔄 Входим в систему...');
    
//     const response = await fetch('https://petlove.b.goit.study/api/users/signin', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(credentials),
//     });

//     const data = await response.json();
    
//     console.log('📥 Ответ сервера:', {
//       статус: response.status,
//       данные: data
//     });
    
//     if (response.ok) {
//       // Успешно!
//       saveToken(data.token);
//       console.log('✅ Токен сохранен');
//       return { success: true, user: data };
//     } else {
//       // Ошибка от сервера
//       let errorMessage = 'Login failed';
      
//       if (data.message) {
//         errorMessage = data.message;
//       } else if (response.status === 401) {
//         errorMessage = 'Wrong email or password';
//       } else if (response.status === 404) {
//         errorMessage = 'User not found';
//       }
      
//       return { success: false, error: errorMessage };
//     }
//   } catch {
//     // 🎯 ИСПРАВЛЕНО: убрал параметр error
//     console.error('❌ Ошибка сети');
//     return { success: false, error: 'No internet connection' };
//   }
// }

// // 🎯 ФУНКЦИЯ 6: Выход (ИСПРАВЛЕНА - убрал error)
// export async function logout() {
//   try {
//     console.log('🔄 Выходим из системы...');
    
//     const token = localStorage.getItem('token');
    
//     if (token) {
//       await fetch('https://petlove.b.goit.study/api/users/signout', {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//     }
//   } catch {
//     // 🎯 ИСПРАВЛЕНО: убрал параметр error
//     console.error('❌ Ошибка при выходе');
//   } finally {
//     // ВСЕГДА удаляем токен
//     removeToken();
//     console.log('🗑️ Токен удален');
//   }
// }

// // 🎯 ФУНКЦИЯ 7: Получить токен
// export function getToken() {
//   return localStorage.getItem('token');
// }

// // 🎯 ФУНКЦИЯ 8: Получить данные пользователя
// export async function getCurrentUser() {
//   try {
//     const token = localStorage.getItem('token');
    
//     if (!token) {
//       return { success: false, error: 'Not authenticated' };
//     }
    
//     const response = await fetch('https://petlove.b.goit.study/api/users/current', {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const data = await response.json();
    
//     if (response.ok) {
//       return { success: true, user: data };
//     } else {
//       // Если токен невалидный - удаляем его
//       if (response.status === 401) {
//         removeToken();
//       }
//       return { success: false, error: 'Failed to get user' };
//     }
//   } catch {
//     // 🎯 ИСПРАВЛЕНО: убрал параметр error
//     return { success: false, error: 'Network error' };
//   }
// }


// src/utils/auth.js

// 1. Проверка авторизации
export function isAuthenticated() {
  const token = localStorage.getItem('token');
  return !!token;
}

// 2. Получить данные пользователя
export async function getCurrentUser() {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      return { success: false, error: 'Not authenticated' };
    }
    
    const response = await fetch('https://petlove.b.goit.study/api/users/current', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    
    if (response.ok) {
      return { success: true, user: data };
    } else {
      return { success: false, error: 'Failed to get user' };
    }
  } catch {
    return { success: false, error: 'Network error' };
  }
}

// 3. Регистрация
export async function register(userData) {
  try {
    const response = await fetch('https://petlove.b.goit.study/api/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      localStorage.setItem('token', data.token);
      return { success: true, user: data };
    } else {
      let errorMessage = 'Registration failed';
      if (data.message) errorMessage = data.message;
      return { success: false, error: errorMessage };
    }
  } catch {
    return { success: false, error: 'No internet connection' };
  }
}

// 4. Вход
export async function login(credentials) {
  try {
    const response = await fetch('https://petlove.b.goit.study/api/users/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      localStorage.setItem('token', data.token);
      return { success: true, user: data };
    } else {
      let errorMessage = 'Login failed';
      if (data.message) errorMessage = data.message;
      return { success: false, error: errorMessage };
    }
  } catch {
    return { success: false, error: 'No internet connection' };
  }
}