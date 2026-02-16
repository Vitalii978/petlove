// // src/hooks/useUser.js - ИСПРАВЛЕННЫЙ

// import { useState, useEffect } from 'react';
// import authApi from '../services/authApi'; // 👈 ЭТОТ ИМПОРТ ПРАВИЛЬНЫЙ

// const useUser = () => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const loadUser = async () => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       setCurrentUser(null);
//       return;
//     }

//     setIsLoading(true);
//     try {
//       // 👇 ИСПРАВЛЯЕМ НАЗВАНИЕ МЕТОДА!
//       const response = await authApi.getCurrentUser(); // БЫЛО: getUserCurrent()
      
//       if (response.success) {
//         setCurrentUser(response.data);
//         console.log('✅ useUser: данные загружены', {
//           избранных: response.data?.noticesFavorites?.length || 0
//         });
//       } else {
//         setCurrentUser(null);
//       }
//     } catch (error) {
//       console.error('❌ Ошибка в useUser:', error);
//       setCurrentUser(null);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadUser();
//   }, []);

//   return {
//     currentUser,
//     isLoading,
//     favorites: currentUser?.noticesFavorites || [],
//     viewed: currentUser?.noticesViewed || [],
//     refreshUser: loadUser
//   };
// };

// export default useUser;



// src/hooks/useUser.js

/**
 * 🎣 ХУК ДЛЯ ПОЛУЧЕНИЯ ДАННЫХ ПОЛЬЗОВАТЕЛЯ
 * 
 * Возвращает:
 * - currentUser - объект пользователя
 * - favorites - массив избранных объявлений (с бекенда)
 * - viewed - массив просмотренных объявлений (из localStorage)
 * - viewedIds - массив ID просмотренных
 * - addToViewed - функция для добавления в просмотренные
 * - refreshUser - функция для обновления данных
 */

// import { useState, useEffect, useCallback } from 'react';
// import { getCurrentUser } from '../utils/auth';
// import storage from '../utils/storage';

// const useUser = () => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [viewedIds, setViewedIds] = useState([]);

//   // ========== ЗАГРУЗКА ДАННЫХ С БЕКЕНДА ==========
  
//   const loadUser = useCallback(async () => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       setCurrentUser(null);
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const response = await getCurrentUser();
      
//       if (response.success) {
//         setCurrentUser(response.user);
//         setViewedIds(storage.getViewed());
        
//         console.log('✅ useUser: данные загружены', {
//           избранных: response.user?.noticesFavorites?.length || 0,
//           просмотренных: storage.getViewed().length
//         });
//       } else {
//         setCurrentUser(null);
//       }
//     } catch (error) {
//       console.error('❌ Ошибка в useUser:', error);
//       setCurrentUser(null);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   // ========== РАБОТА С ПРОСМОТРЕННЫМИ ==========
  
//   /**
//    * Добавить объявление в просмотренные
//    * @param {string} noticeId - ID объявления
//    */
//   const addToViewed = (noticeId) => {
//     const added = storage.addToViewed(noticeId);
//     if (added) {
//       setViewedIds(storage.getViewed());
//       console.log('👁️ Добавлено в просмотренные:', noticeId);
//     }
//     return added;
//   };

//   /**
//    * Получить полные объекты просмотренных объявлений
//    * Фильтруем избранные по ID из просмотренных
//    */
//   const getViewedNotices = () => {
    
//       console.log('🔍 getViewedNotices:', {
//     естьFavorites: !!currentUser?.noticesFavorites,
//     viewedIds,
//     favoritesLength: currentUser?.noticesFavorites?.length
//   });

//     if (!currentUser?.noticesFavorites) return [];
    
//     return currentUser.noticesFavorites.filter(notice => 
//       viewedIds.includes(notice._id)
//     );
    
//   };

//   // Загружаем при монтировании
//   useEffect(() => {
//     loadUser();
//   }, [loadUser]);

//   return {
//     // Данные пользователя
//     currentUser,
//     isLoading,
    
//     // Избранные (с бекенда)
//     favorites: currentUser?.noticesFavorites || [],
    
//     // Просмотренные (из storage, отфильтрованные объекты)
//     viewed: getViewedNotices(),
//     viewedIds,
    
//     // Методы
//     addToViewed,
//     refreshUser: loadUser
//   };
// };

// export default useUser;







// // src/hooks/useUser.js 15.02

// import { useState, useEffect, useCallback } from 'react';
// import { getCurrentUser } from '../utils/auth';
// import noticesApi from '../services/noticesApi';
// import storage from '../utils/storage';

// const useUser = () => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [viewedIds, setViewedIds] = useState([]);
//   const [allNotices, setAllNotices] = useState([]);
  
//   // 👇 ДОБАВЛЯЕМ ФЛАГ ДЛЯ ОТСЛЕЖИВАНИЯ МОНТИРОВАНИЯ
//   const [isMounted, setIsMounted] = useState(true);

//   const loadUser = useCallback(async () => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       setCurrentUser(null);
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const userResponse = await getCurrentUser();
      
//       if (userResponse.success && isMounted) {
//         setCurrentUser(userResponse.user);
        
//         const storedViewedIds = storage.getViewed();
//         setViewedIds(storedViewedIds);
        
//         const noticesResponse = await noticesApi.getNotices({ limit: 100 });
//         if (noticesResponse.success && isMounted) {
//           setAllNotices(noticesResponse.data);
//         }
//       }
//     } catch (error) {
//       console.error('❌ Ошибка в useUser:', error);
//     } finally {
//       if (isMounted) {
//         setIsLoading(false);
//       }
//     }
//   }, [isMounted]);

//   // 👇 ОЧИЩАЕМ ВСЁ ПРИ РАЗМОНТИРОВАНИИ
//   useEffect(() => {
//     return () => {
//       console.log('🧹 useUser: очищаем данные');
//       setIsMounted(false);
//       setCurrentUser(null);
//       setAllNotices([]);
//       setViewedIds([]);
//     };
//   }, []);

//   const addToViewed = (noticeId) => {
//     const added = storage.addToViewed(noticeId);
//     if (added) {
//       setViewedIds(storage.getViewed());
//     }
//     return added;
//   };

//   const getViewedNotices = () => {
//     if (!viewedIds.length || !allNotices.length) return [];
    
//     return allNotices.filter(notice => 
//       viewedIds.includes(notice._id)
//     );
//   };

//   useEffect(() => {
//     loadUser();
//   }, [loadUser]);

//   return {
//     currentUser,
//     isLoading,
//     favorites: currentUser?.noticesFavorites || [],
//     viewed: getViewedNotices(),
//     viewedIds,
//     addToViewed,
//     refreshUser: loadUser
//   };
// };

// export default useUser;



































// // src/hooks/useUser.js
// // 🎯 ЭТО НАШ "СЕЙФ" С ДАННЫМИ - ВСЕ ДАННЫЕ ХРАНЯТСЯ ЗДЕСЬ

// import { useState, useEffect, useCallback } from 'react';  // Основные хуки React
// import { getCurrentUser } from '../utils/auth';            // Получение данных пользователя
// import noticesApi from '../services/noticesApi';           // API для объявлений
// import storage from '../utils/storage';                     // Работа с localStorage

// // 🎯 ГЛАВНЫЙ ХУК - ОН ОБЪЕДИНЯЕТ ВСЕ ДАННЫЕ В ОДНОМ МЕСТЕ
// // Это как центральный пульт управления: отсюда мы получаем
// // - информацию о пользователе
// // - его избранные объявления
// // - просмотренные объявления
// const useUser = () => {
//   // 🎯 СОСТОЯНИЯ (State) - как ячейки в Excel, они хранят данные
  
//   // Данные текущего пользователя (имя, email, аватарка и т.д.)
//   const [currentUser, setCurrentUser] = useState(null);
  
//   // Флаг загрузки (true - данные грузятся, false - загрузка закончена)
//   const [isLoading, setIsLoading] = useState(false);
  
//   // Массив ID просмотренных объявлений (берем из localStorage)
//   const [viewedIds, setViewedIds] = useState([]);
  
//   // Кэш всех объявлений (чтобы не грузить с сервера каждый раз)
//   const [allNotices, setAllNotices] = useState([]);
  
//   // 🎯 ВАЖНО: Флаг для отслеживания, "жив" ли еще компонент
//   // Это защита от утечек памяти. Представьте: вы открыли страницу, 
//   // началась загрузка, но вы быстро закрыли вкладку.
//   // Без этого флага React попытается обновить состояние уже закрытого компонента
//   const [isMounted, setIsMounted] = useState(true);

//   // 🎯 ФУНКЦИЯ ЗАГРУЗКИ ДАННЫХ ПОЛЬЗОВАТЕЛЯ
//   // useCallback - как "консервация" функции, чтобы она не пересоздавалась при каждом рендере
//   const loadUser = useCallback(async () => {
//     // 🎯 ШАГ 1: Проверяем, есть ли токен (залогинен ли пользователь)
//     const token = localStorage.getItem('token');
//     if (!token) {
//       // Если нет токена - пользователь не авторизован, чистим данные
//       setCurrentUser(null);
//       return;
//     }

//     // 🎯 ШАГ 2: Включаем индикатор загрузки
//     setIsLoading(true);
    
//     try {
//       // 🎯 ШАГ 3: Загружаем данные пользователя с сервера
//       const userResponse = await getCurrentUser();
      
//       // 🎯 ШАГ 4: Если все хорошо И компонент все еще жив (isMounted)
//       if (userResponse.success && isMounted) {
//         // Сохраняем данные пользователя
//         setCurrentUser(userResponse.user);
        
//         // 🎯 ШАГ 5: Загружаем ID просмотренных объявлений из localStorage
//         const storedViewedIds = storage.getViewed();
//         setViewedIds(storedViewedIds);
        
//         // 🎯 ШАГ 6: Загружаем все объявления (для просмотренных)
//         // limit: 100 - берем максимум 100 объявлений за раз
//         const noticesResponse = await noticesApi.getNotices({ limit: 100 });
//         if (noticesResponse.success && isMounted) {
//           setAllNotices(noticesResponse.data);
//         }
//       }
//     } catch (error) {
//       console.error('❌ Ошибка в useUser:', error);
//     } finally {
//       // 🎯 ШАГ 7: Выключаем индикатор загрузки, если компонент жив
//       if (isMounted) {
//         setIsLoading(false);
//       }
//     }
//   }, [isMounted]); // Зависимость: если isMounted меняется, функция пересоздается

//   // 🎯 ОЧИСТКА ПРИ РАЗМОНТИРОВАНИИ КОМПОНЕНТА
//   // Это как "уборка" перед уходом из комнаты
//   useEffect(() => {
//     // Функция, которая выполнится при размонтировании компонента
//     return () => {
//       console.log('🧹 useUser: очищаем данные');
//       setIsMounted(false);     // Помечаем, что компонент больше не жив
//       setCurrentUser(null);    // Очищаем данные пользователя
//       setAllNotices([]);       // Очищаем кэш объявлений
//       setViewedIds([]);        // Очищаем просмотренные ID
//     };
//   }, []); // Пустой массив = выполнится один раз при монтировании, и возвращенная функция при размонтировании

//   // 🎯 ФУНКЦИЯ ДОБАВЛЕНИЯ В ПРОСМОТРЕННЫЕ
//   const addToViewed = (noticeId) => {
//     // Пытаемся добавить ID в localStorage
//     const added = storage.addToViewed(noticeId);
//     if (added) {
//       // Если добавили успешно - обновляем состояние
//       setViewedIds(storage.getViewed());
//     }
//     return added;
//   };

//   // 🎯 ФУНКЦИЯ ПОЛУЧЕНИЯ ПРОСМОТРЕННЫХ ОБЪЯВЛЕНИЙ
//   // Это как фильтр: из всех объявлений оставляем только те,
//   // чьи ID есть в списке просмотренных
//   const getViewedNotices = () => {
//     // Если нет ID или нет объявлений - возвращаем пустой массив
//     if (!viewedIds.length || !allNotices.length) return [];
    
//     // Фильтруем: берем только те объявления, ID которых есть в viewedIds
//     return allNotices.filter(notice => 
//       viewedIds.includes(notice._id)
//     );
//   };

//   // 🎯 АВТОМАТИЧЕСКАЯ ЗАГРУЗКА ПРИ МОНТИРОВАНИИ
//   // Как только компонент загрузился - сразу грузим данные
//   useEffect(() => {
//     loadUser();
//   }, [loadUser]); // Зависимость: если loadUser меняется - перезагружаем

//   // 🎯 ЧТО МЫ ВОЗВРАЩАЕМ (API нашего хука)
//   return {
//     currentUser,           // Данные пользователя
//     isLoading,             // Флаг загрузки
//     favorites: currentUser?.noticesFavorites || [], // Избранные (из данных пользователя)
//     viewed: getViewedNotices(),                      // Просмотренные (вычисляем)
//     viewedIds,             // ID просмотренных
//     addToViewed,           // Функция добавить в просмотренные
//     refreshUser: loadUser  // Функция обновить данные
//   };
// };

// export default useUser;







// src/hooks/useUser.js
// 🎯 ЭТО ЦЕНТРАЛЬНЫЙ СКЛАД ВСЕХ ДАННЫХ ПОЛЬЗОВАТЕЛЯ
// ====================================================
// Что хранит этот хук:
// 1. currentUser - данные пользователя с сервера
// 2. favorites - избранные объявления (СТАБИЛЬНАЯ ССЫЛКА!)
// 3. viewed - просмотренные объявления
// 4. viewedIds - ID просмотренных
// 5. refreshUser - функция обновления данных
// ====================================================

import { useState, useEffect, useCallback, useMemo } from 'react';
// useState   - для хранения данных (полка)
// useEffect  - для загрузки при монтировании
// useCallback- для стабильных функций
// useMemo    - для СТАБИЛЬНЫХ ССЫЛОК на объекты/массивы

import { getCurrentUser } from '../utils/auth';
// getCurrentUser - функция, которая ходит на сервер за данными пользователя
// Отправляет GET запрос на /users/current

import noticesApi from '../services/noticesApi';
// noticesApi - для загрузки всех объявлений (нужно для просмотренных)

import storage from '../utils/storage';
// storage - работа с localStorage (сохраняет ID просмотренных)

const useUser = () => {
  // =============== 🟢 СОСТОЯНИЯ (STATE) ===============
  // Это как полки на складе - здесь хранятся все данные
  
  // 🟢 currentUser - ВСЕ данные пользователя с сервера
  // Структура: {
  //   _id: "123",
  //   name: "Анна",
  //   email: "anna@mail.com",
  //   avatar: "url",
  //   phone: "+380501234567",
  //   noticesFavorites: [  // ← ВОТ ЗДЕСЬ ЛЕЖАТ ИЗБРАННЫЕ!
  //     { _id: "pet1", title: "Щенок", ... },
  //     { _id: "pet2", title: "Котенок", ... }
  //   ],
  //   pets: [...] // питомцы пользователя
  // }
  const [currentUser, setCurrentUser] = useState(null);
  
  // 🟢 isLoading - флаг загрузки (true/false)
  const [isLoading, setIsLoading] = useState(false);
  
  // 🟢 viewedIds - массив ID просмотренных объявлений
  // Пример: ["pet1", "pet5", "pet8"]
  // Хранится в localStorage и дублируется здесь для быстрого доступа
  const [viewedIds, setViewedIds] = useState([]);
  
  // 🟢 allNotices - кэш ВСЕХ объявлений (для просмотренных)
  // Нужен, чтобы по ID просмотренных получить полные объекты
  const [allNotices, setAllNotices] = useState([]);
  
  // 🟢 isMounted - флаг, что компонент еще жив
  // Защита от утечек памяти (не обновляем состояние размонтированного компонента)
  const [isMounted, setIsMounted] = useState(true);

  // =============== 🟢 ФУНКЦИЯ ЗАГРУЗКИ ПОЛЬЗОВАТЕЛЯ ===============
  
  // 🟢 loadUser - ходит на сервер и забирает данные пользователя
  // useCallback - функция создается один раз и не меняется между рендерами
  const loadUser = useCallback(async () => {
    // 🔍 ШАГ 1: Проверяем, есть ли токен в localStorage
    // Если нет токена - пользователь не авторизован
    const token = localStorage.getItem('token');
    if (!token) {
      setCurrentUser(null); // Очищаем данные
      return;
    }

    // 🔍 ШАГ 2: Включаем индикатор загрузки
    setIsLoading(true);
    
    try {
      // 🔍 ШАГ 3: Идем на сервер за данными пользователя
      // GET запрос на /users/current
      console.log('🔄 Загружаем данные пользователя с сервера...');
      const userResponse = await getCurrentUser();
      
      // 🔍 ШАГ 4: Если успешно и компонент еще жив
      if (userResponse.success && isMounted) {
        // Сохраняем данные пользователя в состояние
        console.log('✅ Пользователь загружен:', userResponse.user.name);
        setCurrentUser(userResponse.user);
        
        // 🔍 ШАГ 5: Загружаем ID просмотренных из localStorage
        // localStorage.getItem('petlove_viewed') → ["pet1", "pet3"]
        const storedViewedIds = storage.getViewed();
        setViewedIds(storedViewedIds);
        
        // 🔍 ШАГ 6: Загружаем ВСЕ объявления (для просмотренных)
        // Нужно, чтобы по ID получить полные объекты
        const noticesResponse = await noticesApi.getNotices({ limit: 100 });
        if (noticesResponse.success && isMounted) {
          setAllNotices(noticesResponse.data);
        }
      }
    } catch (error) {
      // ❌ Ошибка при загрузке
      console.error('❌ Ошибка в useUser:', error);
    } finally {
      // 🔍 ШАГ 7: Выключаем индикатор загрузки
      if (isMounted) {
        setIsLoading(false);
      }
    }
  }, [isMounted]); // Зависимость: isMounted

  // =============== 🟢 ОЧИСТКА ПРИ РАЗМОНТИРОВАНИИ ===============
  
  // 🟢 useEffect с пустым массивом зависимостей выполняется:
  // - при монтировании: ничего
  // - при размонтировании: возвращенную функцию (cleanup)
  useEffect(() => {
    // Эта функция выполнится, когда компонент будет уничтожен
    return () => {
      console.log('🧹 useUser: очищаем данные');
      setIsMounted(false);     // Помечаем, что компонент мертв
      setCurrentUser(null);    // Очищаем данные пользователя
      setAllNotices([]);       // Очищаем кэш
      setViewedIds([]);        // Очищаем просмотренные ID
    };
  }, []); // Пустой массив = выполняется один раз при монтировании

  // =============== 🟢 ДОБАВЛЕНИЕ В ПРОСМОТРЕННЫЕ ===============
  
  // 🟢 addToViewed - вызывается когда пользователь открывает карточку
  const addToViewed = (noticeId) => {
    // Пытаемся добавить ID в localStorage
    const added = storage.addToViewed(noticeId);
    if (added) {
      // Если добавили успешно - обновляем состояние
      // Это вызовет перерендер компонентов, которые используют viewed
      setViewedIds(storage.getViewed());
    }
    return added;
  };

  // =============== 🟢 ПОЛУЧЕНИЕ ПРОСМОТРЕННЫХ ОБЪЯВЛЕНИЙ ===============
  
  // 🟢 getViewedNotices - возвращает ПОЛНЫЕ объекты просмотренных
  // Берет viewedIds (массив ID) и allNotices (все объявления)
  // Возвращает только те объявления, чьи ID есть в viewedIds
  const getViewedNotices = useCallback(() => {
    if (!viewedIds.length || !allNotices.length) return [];
    
    // Фильтруем: оставляем только те, чьи ID есть в viewedIds
    return allNotices.filter(notice => viewedIds.includes(notice._id));
  }, [viewedIds, allNotices]); // Зависимости: viewedIds, allNotices

  // =============== 🟢 АВТОМАТИЧЕСКАЯ ЗАГРУЗКА ПРИ МОНТИРОВАНИИ ===============
  
  // 🟢 Загружаем данные сразу при создании хука
  useEffect(() => {
    loadUser(); // Вызываем функцию загрузки
  }, [loadUser]); // Зависимость: loadUser (стабильная благодаря useCallback)

  // =============== 🎯 САМОЕ ВАЖНОЕ: useMemo для favorites ===============
  // 🔥 КЛЮЧЕВОЙ МОМЕНТ! БЕЗ ЭТОГО БУДЕТ БЕСКОНЕЧНЫЙ ЦИКЛ!
  
  // 🟢 favorites - это массив избранных объявлений
  // Берется из currentUser?.noticesFavorites
  // Если currentUser нет - пустой массив []
  
  // БЕЗ useMemo: КАЖДЫЙ РЕНДЕР создается НОВЫЙ массив []
  // return { favorites: currentUser?.noticesFavorites || [] }
  // Это вызывает бесконечный цикл в NoticesPage, потому что
  // useEffect зависит от userFavorites, а он каждый раз новый!
  
  // С useMemo: массив создается ТОЛЬКО когда изменились данные
  const favorites = useMemo(() => {
    console.log('📦 useMemo: пересчитываем favorites');
    return currentUser?.noticesFavorites || [];
  }, [currentUser?.noticesFavorites]); 
  // ✅ Зависимость - конкретное поле noticesFavorites
  // Массив пересоздается ТОЛЬКО когда изменились сами избранные
  
  // =============== 🟢 ЧТО МЫ ОТДАЕМ НАРУЖУ ===============
  
  return {
    // 🟢 currentUser - все данные пользователя (редко используется напрямую)
    currentUser,
    
    // 🟢 isLoading - флаг загрузки
    isLoading,
    
    // 🎯 favorites - СТАБИЛЬНАЯ ССЫЛКА на массив избранных
    // Благодаря useMemo ссылка не меняется между рендерами,
    // если данные не изменились на самом деле
    favorites,  // ← ВОТ ЭТО САМОЕ ГЛАВНОЕ!
    
    // 🟢 viewed - просмотренные объявления (вычисляется)
    viewed: getViewedNotices(),
    
    // 🟢 viewedIds - просто ID просмотренных
    viewedIds,
    
    // 🟢 addToViewed - функция добавить в просмотренные
    addToViewed,
    
    // 🟢 refreshUser - функция обновить данные с сервера
    refreshUser: loadUser
  };
};

export default useUser;