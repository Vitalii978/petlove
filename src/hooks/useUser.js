// // src/hooks/useUser.js
// // 🎯 ИСПРАВЛЕНО: принудительно создаем НОВЫЙ объект currentUser

// import { useState, useEffect, useCallback, useMemo } from 'react';
// import { getCurrentUser } from '../utils/auth';
// import noticesApi from '../services/noticesApi';
// import storage from '../utils/storage';

// const useUser = () => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [viewedIds, setViewedIds] = useState([]);
//   const [allNotices, setAllNotices] = useState([]);
//   const [isMounted, setIsMounted] = useState(true);

//   // 🟢 ЗАГРУЗКА ПОЛЬЗОВАТЕЛЯ
//   const loadUser = useCallback(async () => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       setCurrentUser(null);
//       return;
//     }

//     setIsLoading(true);

//     try {
//       console.log('🔄 Загружаем данные пользователя с сервера...');
//       const userResponse = await getCurrentUser();

//       if (userResponse.success && isMounted) {
//         console.log('✅ Пользователь загружен:', userResponse.user.name);
//         console.log('📊 Избранных объявлений до:', currentUser?.noticesFavorites?.length);
//         console.log('📊 Избранных объявлений после:', userResponse.user.noticesFavorites?.length);

//         // 🔥 ВАЖНО: СОЗДАЕМ НОВЫЙ ОБЪЕКТ!
//         // Чтобы React увидел изменения, нужно создать новый объект
//         const newUser = {
//           ...userResponse.user,
//           // Убеждаемся, что noticesFavorites - это новый массив
//           noticesFavorites: userResponse.user.noticesFavorites
//             ? [...userResponse.user.noticesFavorites]
//             : []
//         };

//         setCurrentUser(newUser);

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

//   // 🟢 ОЧИСТКА
//   useEffect(() => {
//     return () => {
//       console.log('🧹 useUser: очищаем данные');
//       setIsMounted(false);
//       setCurrentUser(null);
//       setAllNotices([]);
//       setViewedIds([]);
//     };
//   }, []);

//   // 🟢 ДОБАВЛЕНИЕ В ПРОСМОТРЕННЫЕ
//   const addToViewed = (noticeId) => {
//     const added = storage.addToViewed(noticeId);
//     if (added) {
//       setViewedIds(storage.getViewed());
//     }
//     return added;
//   };

//   // 🟢 ПОЛУЧЕНИЕ ПРОСМОТРЕННЫХ
//   const getViewedNotices = useCallback(() => {
//     if (!viewedIds.length || !allNotices.length) return [];
//     return allNotices.filter(notice => viewedIds.includes(notice._id));
//   }, [viewedIds, allNotices]);

//   // 🟢 АВТОМАТИЧЕСКАЯ ЗАГРУЗКА
//   useEffect(() => {
//     loadUser();
//   }, [loadUser]);

//   // =============== 🎯 useMemo для favorites ===============
//   const favorites = useMemo(() => {
//     console.log('📦 useMemo: пересчитываем favorites');

//     if (!currentUser?.noticesFavorites) {
//       console.log('  → пустой массив');
//       return [];
//     }

//     console.log(`  → массив из ${currentUser.noticesFavorites.length} элементов`);
//     console.log('  → содержимое:', currentUser.noticesFavorites.map(f => f._id));

//     // 🔥 ВАЖНО: возвращаем НОВЫЙ массив
//     return [...currentUser.noticesFavorites];

//   }, [currentUser?.noticesFavorites]);

//   // =============== 🎯 ДОПОЛНИТЕЛЬНО: Логируем изменения ===============
//   useEffect(() => {
//     console.log('🟢 currentUser изменился:', {
//       есть: !!currentUser,
//       избранных: currentUser?.noticesFavorites?.length
//     });
//   }, [currentUser]);

//   return {
//     currentUser,
//     isLoading,
//     favorites,
//     viewed: getViewedNotices(),
//     viewedIds,
//     addToViewed,
//     refreshUser: loadUser
//   };
// };

// export default useUser;

// src/hooks/useUser.js
// 🎯 ИСПРАВЛЕНО: принудительно создаем НОВЫЙ объект currentUser
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
        console.log('✅ Пользователь загружен:', userResponse.user.name);
        console.log(
          '📊 Избранных объявлений до:',
          currentUser?.noticesFavorites?.length
        );
        console.log(
          '📊 Избранных объявлений после:',
          userResponse.user.noticesFavorites?.length
        );

        // 🔥 ВАЖНО: СОЗДАЕМ НОВЫЙ ОБЪЕКТ!
        // Чтобы React увидел изменения, нужно создать новый объект
        // Если вернуть тот же объект, React подумает что ничего не изменилось
        const newUser = {
          ...userResponse.user, // копируем все поля
          // Убеждаемся, что noticesFavorites - это новый массив
          // Если вернуть тот же массив, useMemo не сработает
          noticesFavorites: userResponse.user.noticesFavorites
            ? [...userResponse.user.noticesFavorites] // создаем НОВЫЙ массив
            : [],
        };

        setCurrentUser(newUser); // сохраняем нового пользователя

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
      setIsMounted(false); // Помечаем, что компонент мертв
      setCurrentUser(null); // Очищаем данные пользователя
      setAllNotices([]); // Очищаем кэш
      setViewedIds([]); // Очищаем просмотренные ID
    };
  }, []); // Пустой массив = выполняется один раз при монтировании

  // =============== 🟢 ДОБАВЛЕНИЕ В ПРОСМОТРЕННЫЕ ===============

  // 🟢 addToViewed - вызывается когда пользователь открывает карточку
  const addToViewed = noticeId => {
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

    if (!currentUser?.noticesFavorites) {
      console.log('  → пустой массив');
      return [];
    }

    console.log(
      `  → массив из ${currentUser.noticesFavorites.length} элементов`
    );
    console.log(
      '  → содержимое:',
      currentUser.noticesFavorites.map(f => f._id)
    );

    // 🔥 ВАЖНО: возвращаем НОВЫЙ массив
    // Если вернуть тот же массив, React не увидит изменений
    return [...currentUser.noticesFavorites];
  }, [currentUser?.noticesFavorites]);
  // ✅ Зависимость - конкретное поле noticesFavorites
  // Массив пересоздается ТОЛЬКО когда изменились сами избранные

  // =============== 🎯 ДОПОЛНИТЕЛЬНО: Логируем изменения ===============
  useEffect(() => {
    console.log('🟢 currentUser изменился:', {
      есть: !!currentUser,
      избранных: currentUser?.noticesFavorites?.length,
    });
  }, [currentUser]);

  // =============== 🟢 ЧТО МЫ ОТДАЕМ НАРУЖУ ===============

  return {
    // 🟢 currentUser - все данные пользователя (редко используется напрямую)
    currentUser,

    // 🟢 isLoading - флаг загрузки
    isLoading,

    // 🎯 favorites - СТАБИЛЬНАЯ ССЫЛКА на массив избранных
    // Благодаря useMemo ссылка не меняется между рендерами,
    // если данные не изменились на самом деле
    favorites, // ← ВОТ ЭТО САМОЕ ГЛАВНОЕ!

    // 🟢 viewed - просмотренные объявления (вычисляется)
    viewed: getViewedNotices(),

    // 🟢 viewedIds - просто ID просмотренных
    viewedIds,

    // 🟢 addToViewed - функция добавить в просмотренные
    addToViewed,

    // 🟢 refreshUser - функция обновить данные с сервера
    refreshUser: loadUser,
  };
};

export default useUser;
