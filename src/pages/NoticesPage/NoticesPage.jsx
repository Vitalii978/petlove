// // // src/pages/NoticesPage/NoticesPage.jsx

// // // 🎯 ИМПОРТЫ
// // import { useState, useEffect, useCallback } from 'react';
// // import Title from '../../components/Title/Title';
// // import NoticesFilters from '../../components/Notices/NoticesFilters/NoticesFilters';
// // import NoticesList from '../../components/Notices/NoticesList/NoticesList'; // <-- ДОБАВИЛИ
// // import Pagination from '../../components/Pagination/Pagination';
// // import noticesApi from '../../services/noticesApi';
// // import styles from './NoticesPage.module.css';

// // // 🎯 КОМПОНЕНТ СТРАНИЦЫ ОБЪЯВЛЕНИЙ
// // export const NoticesPage = () => {
// //   // =============== СОСТОЯНИЯ (STATE) ===============
  
// //   // 🎯 ПОЛКА 1: Объявления
// //   const [notices, setNotices] = useState([]);
  
// //   // 🎯 ПОЛКА 2: Статус загрузки
// //   const [loading, setLoading] = useState(false);
  
// //   // 🎯 ПОЛКА 3: Ошибки
// //   const [error, setError] = useState(null);
  
// //   // 🎯 ПОЛКА 4: Поисковый запрос
// //   const [searchKeyword, setSearchKeyword] = useState('');
  
// //   // 🎯 ПОЛКА 5: Текущая страница
// //   const [currentPage, setCurrentPage] = useState(1);
  
// //   // 🎯 ПОЛКА 6: Всего страниц
// //   const [totalPages, setTotalPages] = useState(1);
  
// //   // 🎯 ПОЛКА 7: Данные для фильтров
// //   const [filtersData, setFiltersData] = useState({});
  
// //   // 🎯 ПОЛКА 8: Избранные объявления (ID)
// //   const [favorites, setFavorites] = useState([]);
  
// //   // 🎯 ПОЛКА 9: Активные фильтры
// //   const [activeFilters, setActiveFilters] = useState({
// //     category: '',
// //     sex: '',
// //     species: '',
// //     locationId: '',
// //     byDate: false,
// //     byPrice: false,
// //     byPopularity: false
// //   });
  
// //   // =============== ФУНКЦИИ ===============
  
// //   // 🎯 ФУНКЦИЯ 1: Загрузка объявлений
// //   const fetchNotices = useCallback(async () => {
// //     try {
// //       // 1. Включаем спиннер
// //       setLoading(true);
// //       setError(null);
      
// //       console.log('🔄 Загрузка объявлений...');
      
// //       // 2. Говорим почтальону принести объявления
// //       const result = await noticesApi.getNotices({
// //         page: currentPage,
// //         limit: 6,
// //         keyword: searchKeyword,
// //         ...activeFilters
// //       });
      
// //       console.log('📊 Ответ от сервера:', {
// //         успех: result.success,
// //         количество: result.data.length
// //       });
      
// //       // 3. Проверяем что принес почтальон
// //       if (result.success) {
// //         // Успех! Кладем объявления на полку
// //         setNotices(result.data);
// //         setTotalPages(result.pagination.totalPages);
// //       } else {
// //         // Ошибка! Кладем ошибку на полку
// //         setError(result.error);
// //         setNotices([]);
// //         setTotalPages(1);
// //       }
      
// //     } catch (err) {
// //       // Если что-то сломалось
// //       console.error('❌ Ошибка:', err);
// //       setError('Произошла ошибка');
// //       setNotices([]);
// //       setTotalPages(1);
// //     } finally {
// //       // Всегда выключаем спиннер
// //       setLoading(false);
// //     }
// //   }, [currentPage, searchKeyword, activeFilters]);
  
// //   // 🎯 ФУНКЦИЯ 2: Загрузка данных для фильтров
// //   const fetchFiltersData = useCallback(async () => {
// //     console.log('🔄 Загружаем данные для фильтров...');
    
// //     // Говорим почтальону принести списки для фильтров
// //     const result = await noticesApi.getFiltersData();
    
// //     if (result.success) {
// //       // Успех! Кладем данные на полку
// //       setFiltersData(result.data);
// //       console.log('✅ Данные фильтров загружены');
// //     } else {
// //       // Ошибка! Заполняем пустыми массивами
// //       console.warn('⚠️ Не удалось загрузить данные фильтров');
// //       setFiltersData({
// //         categories: [],
// //         sex: [],
// //         species: [],
// //         cities: []
// //       });
// //     }
// //   }, []);
  
// //   // 🎯 ФУНКЦИЯ 3: Обработка "Learn more"
// //   const handleLearnMore = (noticeId) => {
// //     console.log('🔍 Пользователь хочет узнать больше о объявлении:', noticeId);
// //     // Здесь позже откроем модальное окно
// //   };
  
// //   // 🎯 ФУНКЦИЯ 4: Добавление/удаление из избранного
// //   const handleToggleFavorite = async (noticeId) => {
// //     console.log('❤️ Пользователь кликнул на сердечко:', noticeId);
    
// //     // 1. Проверяем авторизован ли пользователь
    
// //     const token = localStorage.getItem('token');
// //     const isLoggedIn = token && token.length > 0; // Проверяем что токен есть и не пустой
    
// //     if (!isLoggedIn) {
// //       // Если не авторизован - показываем сообщение
// //       console.log('👤 Пользователь не авторизован');
// //       // Здесь позже откроем модальное окно ModalAttention
// //       return;
// //     }
    
// //     // 2. Проверяем уже ли в избранном
// //     const isFavorite = favorites.includes(noticeId);
    
// //     if (isFavorite) {
// //       // Уже в избранном - удаляем
// //       console.log('➖ Удаляем из избранного');
// //       const result = await noticesApi.removeFromFavorites(noticeId);
      
// //       if (result.success) {
// //         // Удаляем ID из массива favorites
// //         setFavorites(prev => prev.filter(id => id !== noticeId));
// //       }
// //     } else {
// //       // Не в избранном - добавляем
// //       console.log('➕ Добавляем в избранное');
// //       const result = await noticesApi.addToFavorites(noticeId);
      
// //       if (result.success) {
// //         // Добавляем ID в массив favorites
// //         setFavorites(prev => [...prev, noticeId]);
// //       }
// //     }
// //   };
  
// //   // 🎯 ФУНКЦИЯ 5: Обработка поиска
// //   const handleSearch = (keyword) => {
// //     setSearchKeyword(keyword);
// //     setCurrentPage(1);
// //   };
  
// //   // 🎯 ФУНКЦИЯ 6: Обработка изменения фильтра
// //   const handleFilterChange = (filterName, value) => {
// //     console.log(`🎛️ Изменен фильтр ${filterName}:`, value);
    
// //     // Особый случай для сортировки
// //     if (['byDate', 'byPrice', 'byPopularity'].includes(filterName)) {
// //       setActiveFilters(prev => ({
// //         ...prev,
// //         byDate: filterName === 'byDate' ? value : false,
// //         byPrice: filterName === 'byPrice' ? value : false,
// //         byPopularity: filterName === 'byPopularity' ? value : false
// //       }));
// //     } else {
// //       // Обычные фильтры
// //       setActiveFilters(prev => ({
// //         ...prev,
// //         [filterName]: value
// //       }));
// //     }
    
// //     setCurrentPage(1);
// //   };
  
// //   // 🎯 ФУНКЦИЯ 7: Сброс всех фильтров
// //   const handleResetFilters = () => {
// //     console.log('🔄 Сброс всех фильтров');
    
// //     setSearchKeyword('');
// //     setActiveFilters({
// //       category: '',
// //       sex: '',
// //       species: '',
// //       locationId: '',
// //       byDate: false,
// //       byPrice: false,
// //       byPopularity: false
// //     });
// //     setCurrentPage(1);
// //   };
  
// //   // 🎯 ФУНКЦИЯ 8: Обработка пагинации
// //   const handlePageChange = (page) => {
// //     setCurrentPage(page);
// //     // Плавная прокрутка вверх
// //     window.scrollTo({ top: 0, behavior: 'smooth' });
// //   };
  
// //   // =============== АВТОМАТИЧЕСКИЕ ДЕЙСТВИЯ ===============
  
// //   // 🎯 ЭФФЕКТ 1: Загрузка объявлений при изменении данных
// //   useEffect(() => {
// //     fetchNotices();
// //   }, [fetchNotices]);
  
// //   // 🎯 ЭФФЕКТ 2: Загрузка данных фильтров один раз при загрузке
// //   useEffect(() => {
// //     fetchFiltersData();
// //   }, [fetchFiltersData]);
  
// //   // =============== ГЕНЕРАЦИЯ КНОПОК ПАГИНАЦИИ ===============
  
// //   const paginationButtons = Array.from(
// //     { length: totalPages },
// //     (_, i) => i + 1
// //   );
  
// //   // =============== ОТОБРАЖЕНИЕ СТРАНИЦЫ ===============
  
// //   return (
// //     // 🎯 СЕКЦИЯ СТРАНИЦЫ
// //     <section className={styles.page}>
      
// //       {/* 🎯 КОНТЕЙНЕР ДЛЯ ЦЕНТРИРОВАНИЯ */}
// //       <div className={styles.container}>
        
// //         {/* 🎯 ЗАГОЛОВОК СТРАНИЦЫ */}
// //         <Title children="Find pet" />
        
        
// //         {/* 🎯 ПАНЕЛЬ ФИЛЬТРОВ */}
// //         <NoticesFilters
// //           onFilterChange={handleFilterChange}
// //           onSearch={handleSearch}
// //           onReset={handleResetFilters}
// //           filtersData={filtersData}
// //         />
        
// //         {/* =============== СОСТОЯНИЯ =============== */}
        
// //         {/* 🎯 СОСТОЯНИЕ 1: ЗАГРУЗКА */}
// //         {loading && (
// //           <div className={styles.loading}>
// //             <div className={styles.spinner}></div>
// //             <p>Loading notices...</p>
// //           </div>
// //         )}
        
// //         {/* 🎯 СОСТОЯНИЕ 2: ОШИБКА */}
// //         {error && !loading && (
// //           <div className={styles.error}>
// //             <p>{error}</p>
// //             <button
// //               className={styles.retryButton}
// //               onClick={fetchNotices}
// //               type="button"
// //             >
// //               Try again
// //             </button>
// //           </div>
// //         )}
        
// //         {/* 🎯 СОСТОЯНИЕ 3: УСПЕШНАЯ ЗАГРУЗКА */}
// //         {!loading && !error && (
// //           <>
// //             {/* 🎯 ИНФОРМАЦИЯ О РЕЗУЛЬТАТАХ */}
// //             <div className={styles.noticesInfo}>
// //               <p>
// //                 Found {notices.length} notices • Page {currentPage} of {totalPages}
// //               </p>
// //               {searchKeyword && (
// //                 <p className={styles.searchInfo}>
// //                   Search: "{searchKeyword}"
// //                 </p>
// //               )}
// //             </div>
            
// //             {/* 🎯 СПИСОК ОБЪЯВЛЕНИЙ */}
// //             {/* Здесь теперь используем NoticesList вместо ul/li */}
// //             <NoticesList
// //               notices={notices}
// //               onLearnMore={handleLearnMore}
// //               onToggleFavorite={handleToggleFavorite}
// //               favorites={favorites}
// //             />
            
// //             {/* 🎯 ПАГИНАЦИЯ (если больше 1 страницы) */}
// //             {totalPages > 1 && notices.length > 0 && (
// //               <div className={styles.paginationWrapper}>
// //                 <Pagination
// //                   toPage={currentPage}
// //                   totalPages={totalPages}
// //                   setToPage={handlePageChange}
// //                   numberOfPages={paginationButtons}
// //                 />
// //               </div>
// //             )}
// //           </>
// //         )}
        
// //         {/* 🎯 СОСТОЯНИЕ 4: ПУСТОЙ РЕЗУЛЬТАТ */}
// //         {!loading && !error && notices.length === 0 && (
// //           <div className={styles.empty}>
// //             <p>No notices found</p>
// //             <p className={styles.emptySubtext}>
// //               Try changing your search criteria or filters
// //             </p>
// //             <button
// //               className={styles.resetButton}
// //               onClick={handleResetFilters}
// //               type="button"
// //             >
// //               Reset filters and show all
// //             </button>
// //           </div>
// //         )}
        
// //       </div>
// //     </section>
// //   );
// // };

// // // 🎯 ЭКСПОРТ КОМПОНЕНТА
// // export default NoticesPage;



// // src/pages/NoticesPage/NoticesPage.jsx

// // 🎯 ИМПОРТЫ
// import { useState, useEffect, useCallback } from 'react';
// import Title from '../../components/Title/Title';
// import NoticesFilters from '../../components/Notices/NoticesFilters/NoticesFilters';
// import NoticesList from '../../components/Notices/NoticesList/NoticesList';
// import Pagination from '../../components/Pagination/Pagination';
// import noticesApi from '../../services/noticesApi';
// import useUser from '../../hooks/useUser'; // 👈 ДОБАВЛЯЕМ ХУК ДЛЯ ПОЛУЧЕНИЯ ДАННЫХ ПОЛЬЗОВАТЕЛЯ
// import styles from './NoticesPage.module.css';

// // 🎯 КОМПОНЕНТ СТРАНИЦЫ ОБЪЯВЛЕНИЙ
// export const NoticesPage = () => {
//   // =============== СОСТОЯНИЯ (STATE) ===============
  
//   // 🎯 ПОЛКА 1: Объявления
//   const [notices, setNotices] = useState([]);
  
//   // 🎯 ПОЛКА 2: Статус загрузки
//   const [loading, setLoading] = useState(false);
  
//   // 🎯 ПОЛКА 3: Ошибки
//   const [error, setError] = useState(null);
  
//   // 🎯 ПОЛКА 4: Поисковый запрос
//   const [searchKeyword, setSearchKeyword] = useState('');
  
//   // 🎯 ПОЛКА 5: Текущая страница
//   const [currentPage, setCurrentPage] = useState(1);
  
//   // 🎯 ПОЛКА 6: Всего страниц
//   const [totalPages, setTotalPages] = useState(1);
  
//   // 🎯 ПОЛКА 7: Данные для фильтров
//   const [filtersData, setFiltersData] = useState({});
  
//   // 🎯 ПОЛКА 8: Активные фильтры
//   const [activeFilters, setActiveFilters] = useState({
//     category: '',
//     sex: '',
//     species: '',
//     locationId: '',
//     byDate: false,
//     byPrice: false,
//     byPopularity: false
//   });
  
//   // =============== ДАННЫЕ ПОЛЬЗОВАТЕЛЯ ИЗ ХУКА ===============
  
//   // 🎯 ПОЛУЧАЕМ АКТУАЛЬНЫЙ СПИСОК ИЗБРАННЫХ И ФУНКЦИЮ ОБНОВЛЕНИЯ
//   const { favorites: userFavorites, refreshUser } = useUser();
  
//   // =============== ФУНКЦИИ ===============
  
//   // 🎯 ФУНКЦИЯ 1: Загрузка объявлений
//   const fetchNotices = useCallback(async () => {
//     try {
//       // 1. Включаем спиннер
//       setLoading(true);
//       setError(null);
      
//       console.log('🔄 Загрузка объявлений...');
      
//       // 2. Говорим почтальону принести объявления
//       const result = await noticesApi.getNotices({
//         page: currentPage,
//         limit: 6,
//         keyword: searchKeyword,
//         ...activeFilters
//       });
      
//       console.log('📊 Ответ от сервера:', {
//         успех: result.success,
//         количество: result.data.length
//       });
      
//       // 3. Проверяем что принес почтальон
//       if (result.success) {
//         // Успех! Кладем объявления на полку
//         setNotices(result.data);
//         setTotalPages(result.pagination.totalPages);
//       } else {
//         // Ошибка! Кладем ошибку на полку
//         setError(result.error);
//         setNotices([]);
//         setTotalPages(1);
//       }
      
//     } catch (err) {
//       // Если что-то сломалось
//       console.error('❌ Ошибка:', err);
//       setError('Произошла ошибка');
//       setNotices([]);
//       setTotalPages(1);
//     } finally {
//       // Всегда выключаем спиннер
//       setLoading(false);
//     }
//   }, [currentPage, searchKeyword, activeFilters]);
  
//   // 🎯 ФУНКЦИЯ 2: Загрузка данных для фильтров
//   const fetchFiltersData = useCallback(async () => {
//     console.log('🔄 Загружаем данные для фильтров...');
    
//     // Говорим почтальону принести списки для фильтров
//     const result = await noticesApi.getFiltersData();
    
//     if (result.success) {
//       // Успех! Кладем данные на полку
//       setFiltersData(result.data);
//       console.log('✅ Данные фильтров загружены');
//     } else {
//       // Ошибка! Заполняем пустыми массивами
//       console.warn('⚠️ Не удалось загрузить данные фильтров');
//       setFiltersData({
//         categories: [],
//         sex: [],
//         species: [],
//         cities: []
//       });
//     }
//   }, []);
  
//   // 🎯 ФУНКЦИЯ 3: Обработка "Learn more"
//   const handleLearnMore = (noticeId) => {
//     console.log('🔍 Пользователь хочет узнать больше о объявлении:', noticeId);
//     // Здесь позже откроем модальное окно
//   };
  
//   // 🎯 ФУНКЦИЯ 4: Добавление/удаление из избранного (ИСПРАВЛЕННАЯ)
//   const handleToggleFavorite = async (noticeId) => {
//     console.log('❤️ Пользователь кликнул на сердечко:', noticeId);
    
//     // 1. Проверяем авторизован ли пользователь
//     const token = localStorage.getItem('token');
//     const isLoggedIn = !!token;
    
//     if (!isLoggedIn) {
//       // Если не авторизован - показываем сообщение
//       console.log('👤 Пользователь не авторизован');
//       // Здесь позже откроем модальное окно ModalAttention
//       return;
//     }
    
//     // 2. Проверяем уже ли в избранном, используя АКТУАЛЬНЫЕ ДАННЫЕ ИЗ ХУКА
//     const isFavorite = userFavorites.includes(noticeId);
    
//     try {
//       if (isFavorite) {
//         // Уже в избранном - удаляем
//         console.log('➖ Удаляем из избранного');
//         const result = await noticesApi.removeFromFavorites(noticeId);
        
//         if (result.success) {
//           console.log('✅ Успешно удалено из избранного');
//           // Обновляем данные пользователя, чтобы синхронизировать с сервером
//           await refreshUser();
//         } else {
//           console.error('❌ Ошибка удаления:', result.error);
//         }
//       } else {
//         // Не в избранном - добавляем
//         console.log('➕ Добавляем в избранное');
//         const result = await noticesApi.addToFavorites(noticeId);
        
//         if (result.success) {
//           console.log('✅ Успешно добавлено в избранное');
//           // Обновляем данные пользователя, чтобы синхронизировать с сервером
//           await refreshUser();
//         } else {
//           console.error('❌ Ошибка добавления:', result.error);
//         }
//       }
//     } catch (error) {
//       console.error('❌ Ошибка при выполнении операции с избранным:', error);
//     }
//   };
  
//   // 🎯 ФУНКЦИЯ 5: Обработка поиска
//   const handleSearch = (keyword) => {
//     setSearchKeyword(keyword);
//     setCurrentPage(1);
//   };
  
//   // 🎯 ФУНКЦИЯ 6: Обработка изменения фильтра
//   const handleFilterChange = (filterName, value) => {
//     console.log(`🎛️ Изменен фильтр ${filterName}:`, value);
    
//     // Особый случай для сортировки
//     if (['byDate', 'byPrice', 'byPopularity'].includes(filterName)) {
//       setActiveFilters(prev => ({
//         ...prev,
//         byDate: filterName === 'byDate' ? value : false,
//         byPrice: filterName === 'byPrice' ? value : false,
//         byPopularity: filterName === 'byPopularity' ? value : false
//       }));
//     } else {
//       // Обычные фильтры
//       setActiveFilters(prev => ({
//         ...prev,
//         [filterName]: value
//       }));
//     }
    
//     setCurrentPage(1);
//   };
  
//   // 🎯 ФУНКЦИЯ 7: Сброс всех фильтров
//   const handleResetFilters = () => {
//     console.log('🔄 Сброс всех фильтров');
    
//     setSearchKeyword('');
//     setActiveFilters({
//       category: '',
//       sex: '',
//       species: '',
//       locationId: '',
//       byDate: false,
//       byPrice: false,
//       byPopularity: false
//     });
//     setCurrentPage(1);
//   };
  
//   // 🎯 ФУНКЦИЯ 8: Обработка пагинации
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     // Плавная прокрутка вверх
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };
  
//   // =============== АВТОМАТИЧЕСКИЕ ДЕЙСТВИЯ ===============
  
//   // 🎯 ЭФФЕКТ 1: Загрузка объявлений при изменении данных
//   useEffect(() => {
//     fetchNotices();
//   }, [fetchNotices]);
  
//   // 🎯 ЭФФЕКТ 2: Загрузка данных фильтров один раз при загрузке
//   useEffect(() => {
//     fetchFiltersData();
//   }, [fetchFiltersData]);
  
//   // =============== ГЕНЕРАЦИЯ КНОПОК ПАГИНАЦИИ ===============
  
//   const paginationButtons = Array.from(
//     { length: totalPages },
//     (_, i) => i + 1
//   );
  
//   // =============== ОТОБРАЖЕНИЕ СТРАНИЦЫ ===============
  
//   return (
//     // 🎯 СЕКЦИЯ СТРАНИЦЫ
//     <section className={styles.page}>
      
//       {/* 🎯 КОНТЕЙНЕР ДЛЯ ЦЕНТРИРОВАНИЯ */}
//       <div className={styles.container}>
        
//         {/* 🎯 ЗАГОЛОВОК СТРАНИЦЫ */}
//         <Title children="Find pet" />
        
//         {/* 🎯 ПАНЕЛЬ ФИЛЬТРОВ */}
//         <NoticesFilters
//           onFilterChange={handleFilterChange}
//           onSearch={handleSearch}
//           onReset={handleResetFilters}
//           filtersData={filtersData}
//         />
        
//         {/* =============== СОСТОЯНИЯ =============== */}
        
//         {/* 🎯 СОСТОЯНИЕ 1: ЗАГРУЗКА */}
//         {loading && (
//           <div className={styles.loading}>
//             <div className={styles.spinner}></div>
//             <p>Loading notices...</p>
//           </div>
//         )}
        
//         {/* 🎯 СОСТОЯНИЕ 2: ОШИБКА */}
//         {error && !loading && (
//           <div className={styles.error}>
//             <p>{error}</p>
//             <button
//               className={styles.retryButton}
//               onClick={fetchNotices}
//               type="button"
//             >
//               Try again
//             </button>
//           </div>
//         )}
        
//         {/* 🎯 СОСТОЯНИЕ 3: УСПЕШНАЯ ЗАГРУЗКА */}
//         {!loading && !error && (
//           <>
//             {/* 🎯 ИНФОРМАЦИЯ О РЕЗУЛЬТАТАХ */}
//             <div className={styles.noticesInfo}>
//               <p>
//                 Found {notices.length} notices • Page {currentPage} of {totalPages}
//               </p>
//               {searchKeyword && (
//                 <p className={styles.searchInfo}>
//                   Search: "{searchKeyword}"
//                 </p>
//               )}
//             </div>
            
//             {/* 🎯 СПИСОК ОБЪЯВЛЕНИЙ */}
//             <NoticesList
//               notices={notices}
//               onLearnMore={handleLearnMore}
//               onToggleFavorite={handleToggleFavorite}
//               favorites={userFavorites} // 👈 ТЕПЕРЬ ПЕРЕДАЕМ АКТУАЛЬНЫЙ СПИСОК ИЗ ХУКА
//             />
            
//             {/* 🎯 ПАГИНАЦИЯ (если больше 1 страницы) */}
//             {totalPages > 1 && notices.length > 0 && (
//               <div className={styles.paginationWrapper}>
//                 <Pagination
//                   toPage={currentPage}
//                   totalPages={totalPages}
//                   setToPage={handlePageChange}
//                   numberOfPages={paginationButtons}
//                 />
//               </div>
//             )}
//           </>
//         )}
        
//         {/* 🎯 СОСТОЯНИЕ 4: ПУСТОЙ РЕЗУЛЬТАТ */}
//         {!loading && !error && notices.length === 0 && (
//           <div className={styles.empty}>
//             <p>No notices found</p>
//             <p className={styles.emptySubtext}>
//               Try changing your search criteria or filters
//             </p>
//             <button
//               className={styles.resetButton}
//               onClick={handleResetFilters}
//               type="button"
//             >
//               Reset filters and show all
//             </button>
//           </div>
//         )}
        
//       </div>
//     </section>
//   );
// };

// // 🎯 ЭКСПОРТ КОМПОНЕНТА
// export default NoticesPage;



// // src/pages/NoticesPage/NoticesPage.jsx

// // 🎯 ИМПОРТЫ
// import { useState, useEffect, useCallback } from 'react';
// import Title from '../../components/Title/Title';
// import NoticesFilters from '../../components/Notices/NoticesFilters/NoticesFilters';
// import NoticesList from '../../components/Notices/NoticesList/NoticesList';
// import Pagination from '../../components/Pagination/Pagination';
// import noticesApi from '../../services/noticesApi';
// import authApi from '../../services/authApi';
// import useUser from '../../hooks/useUser';
// import styles from './NoticesPage.module.css';

// // 🎯 КОМПОНЕНТ СТРАНИЦЫ ОБЪЯВЛЕНИЙ
// export const NoticesPage = () => {
//   // =============== СОСТОЯНИЯ (STATE) ===============
  
//   const [notices, setNotices] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [searchKeyword, setSearchKeyword] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [filtersData, setFiltersData] = useState({});
//   const [activeFilters, setActiveFilters] = useState({
//     category: '',
//     sex: '',
//     species: '',
//     locationId: '',
//     byDate: false,
//     byPrice: false,
//     byPopularity: false
//   });
  
//   // =============== ДАННЫЕ ПОЛЬЗОВАТЕЛЯ ===============
  
//   const { favorites: userFavorites, refreshUser } = useUser();
  
//   // =============== ФУНКЦИИ ===============
  
//   // 🎯 Загрузка объявлений
//   const fetchNotices = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const result = await noticesApi.getNotices({
//         page: currentPage,
//         limit: 6,
//         keyword: searchKeyword,
//         ...activeFilters
//       });
      
//       if (result.success) {
//         setNotices(result.data);
//         setTotalPages(result.pagination.totalPages);
        
//         // 👇 ЛОГ: что пришло с сервера
//         console.log('📥 Данные с сервера:', {
//           количество: result.data.length,
//           первыйЭлемент: result.data[0]
//         });
        
//       } else {
//         setError(result.error);
//         setNotices([]);
//         setTotalPages(1);
//       }
      
//     } catch (err) {
//       console.error('❌ Ошибка:', err);
//       setError('Произошла ошибка');
//       setNotices([]);
//       setTotalPages(1);
//     } finally {
//       setLoading(false);
//     }
//   }, [currentPage, searchKeyword, activeFilters]);
  
//   // 🎯 Загрузка данных для фильтров
//   const fetchFiltersData = useCallback(async () => {
//     const result = await noticesApi.getFiltersData();
    
//     if (result.success) {
//       setFiltersData(result.data);
//     } else {
//       setFiltersData({
//         categories: [],
//         sex: [],
//         species: [],
//         cities: []
//       });
//     }
//   }, []);
  
//   // 🎯 Обработка "Learn more"
//   const handleLearnMore = (noticeId) => {
//     console.log('🔍 Пользователь хочет узнать больше о объявлении:', noticeId);
//   };
  
//   // 🎯 Добавление/удаление из избранного
//   const handleToggleFavorite = async (noticeId) => {
//     console.log('❤️ Пользователь кликнул на сердечко:', noticeId);
    
//     const token = localStorage.getItem('token');
//     const isLoggedIn = !!token;
    
//     if (!isLoggedIn) {
//       console.log('👤 Пользователь не авторизован');
//       return;
//     }
    
//     try {
//       console.log('🔄 Проверяем статус на сервере...');
//       const currentUserResponse = await authApi.getCurrentUser();
      
//       if (!currentUserResponse.success) {
//         console.error('❌ Не удалось получить данные пользователя');
//         return;
//       }
      
//       const freshFavorites = currentUserResponse.data.noticesFavorites || [];
//       const isFavorite = freshFavorites.some(item => 
//         item._id === noticeId || item === noticeId
//       );
      
//       console.log(`📊 Текущее состояние (с сервера): ${isFavorite ? 'в избранном' : 'не в избранном'}`);
      
//       if (isFavorite) {
//         console.log('➖ Отправляем запрос на удаление...');
//         const result = await noticesApi.removeFromFavorites(noticeId);
        
//         if (result.success) {
//           console.log('✅ Успешно удалено из избранного');
//           await refreshUser();
//         } else {
//           console.error('❌ Ошибка удаления:', result.error);
//         }
//       } else {
//         console.log('➕ Отправляем запрос на добавление...');
//         const result = await noticesApi.addToFavorites(noticeId);
        
//         if (result.success) {
//           console.log('✅ Успешно добавлено в избранное');
//           await refreshUser();
//         } else {
//           console.error('❌ Ошибка добавления:', result.error);
//         }
//       }
//     } catch (error) {
//       console.error('❌ Ошибка при выполнении операции с избранным:', error);
//     }
//   };
  
//   // 🎯 Обработка поиска
//   const handleSearch = (keyword) => {
//     setSearchKeyword(keyword);
//     setCurrentPage(1);
//   };
  
//   // 🎯 Обработка изменения фильтра
//   const handleFilterChange = (filterName, value) => {
//     if (['byDate', 'byPrice', 'byPopularity'].includes(filterName)) {
//       setActiveFilters(prev => ({
//         ...prev,
//         byDate: filterName === 'byDate' ? value : false,
//         byPrice: filterName === 'byPrice' ? value : false,
//         byPopularity: filterName === 'byPopularity' ? value : false
//       }));
//     } else {
//       setActiveFilters(prev => ({
//         ...prev,
//         [filterName]: value
//       }));
//     }
    
//     setCurrentPage(1);
//   };
  
//   // 🎯 Сброс всех фильтров
//   const handleResetFilters = () => {
//     setSearchKeyword('');
//     setActiveFilters({
//       category: '',
//       sex: '',
//       species: '',
//       locationId: '',
//       byDate: false,
//       byPrice: false,
//       byPopularity: false
//     });
//     setCurrentPage(1);
//   };
  
//   // 🎯 Обработка пагинации
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };
  
//   // =============== ЭФФЕКТЫ ===============
  
//   useEffect(() => {
//     fetchNotices();
//   }, [fetchNotices]);
  
//   useEffect(() => {
//     fetchFiltersData();
//   }, [fetchFiltersData]);
  
//   // =============== РЕНДЕР ===============
  
//   const paginationButtons = Array.from(
//     { length: totalPages },
//     (_, i) => i + 1
//   );
  
//   // 👇 ЛОГ ПЕРЕД РЕНДЕРОМ - ЧТО ПЕРЕДАЕТСЯ В NoticesList
//   console.log('📊 NoticesPage передает в NoticesList:', {
//     notices: notices,
//     длина: notices?.length,
//     первыйЭлемент: notices[0]
//   });
  
//   return (
//     <section className={styles.page}>
//       <div className={styles.container}>
        
//         <Title children="Find pet" />
        
//         <NoticesFilters
//           onFilterChange={handleFilterChange}
//           onSearch={handleSearch}
//           onReset={handleResetFilters}
//           filtersData={filtersData}
//         />
        
//         {loading && (
//           <div className={styles.loading}>
//             <div className={styles.spinner}></div>
//             <p>Loading notices...</p>
//           </div>
//         )}
        
//         {error && !loading && (
//           <div className={styles.error}>
//             <p>{error}</p>
//             <button
//               className={styles.retryButton}
//               onClick={fetchNotices}
//               type="button"
//             >
//               Try again
//             </button>
//           </div>
//         )}
        
//         {!loading && !error && (
//           <>
//             <div className={styles.noticesInfo}>
//               <p>
//                 Found {notices.length} notices • Page {currentPage} of {totalPages}
//               </p>
//               {searchKeyword && (
//                 <p className={styles.searchInfo}>
//                   Search: "{searchKeyword}"
//                 </p>
//               )}
//             </div>
            
//             <NoticesList
//               notices={notices}
//               onLearnMore={handleLearnMore}
//               onToggleFavorite={handleToggleFavorite}
//               favorites={userFavorites}
//             />
            
//             {totalPages > 1 && notices.length > 0 && (
//               <div className={styles.paginationWrapper}>
//                 <Pagination
//                   toPage={currentPage}
//                   totalPages={totalPages}
//                   setToPage={handlePageChange}
//                   numberOfPages={paginationButtons}
//                 />
//               </div>
//             )}
//           </>
//         )}
        
//         {!loading && !error && notices.length === 0 && (
//           <div className={styles.empty}>
//             <p>No notices found</p>
//             <p className={styles.emptySubtext}>
//               Try changing your search criteria or filters
//             </p>
//             <button
//               className={styles.resetButton}
//               onClick={handleResetFilters}
//               type="button"
//             >
//               Reset filters and show all
//             </button>
//           </div>
//         )}
        
//       </div>
//     </section>
//   );
// };

// export default NoticesPage;






// src/pages/NoticesPage/NoticesPage.jsx

// 🎯 ИМПОРТЫ
import { useState, useEffect, useCallback } from 'react';
import Title from '../../components/Title/Title';
import NoticesFilters from '../../components/Notices/NoticesFilters/NoticesFilters';
import NoticesList from '../../components/Notices/NoticesList/NoticesList';
import Pagination from '../../components/Pagination/Pagination';
import ModalNotice from '../../components/ModalNotice/ModalNotice';
import ModalAttention from '../../components/ModalAttention/ModalAttention';
import noticesApi from '../../services/noticesApi';
import authApi from '../../services/authApi';
import useUser from '../../hooks/useUser'; // 👈 ИМПОРТ useUser
import styles from './NoticesPage.module.css';

// 🎯 КОМПОНЕНТ СТРАНИЦЫ ОБЪЯВЛЕНИЙ
export const NoticesPage = () => {
  // =============== СОСТОЯНИЯ (STATE) ===============
  
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filtersData, setFiltersData] = useState({});
  const [activeFilters, setActiveFilters] = useState({
    category: '',
    sex: '',
    species: '',
    locationId: '',
    byDate: false,
    byPrice: false,
    byPopularity: false
  });
  
  // =============== СОСТОЯНИЯ ДЛЯ МОДАЛОК ===============
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [isModalAttention, setIsModalAttention] = useState(false);
  
  // =============== ДАННЫЕ ПОЛЬЗОВАТЕЛЯ ===============
  
  const { favorites: userFavorites, addToViewed, refreshUser } = useUser(); // 👈 ПОЛУЧАЕМ addToViewed
  
  // =============== ФУНКЦИИ ===============
  
  // 🎯 Загрузка объявлений
  const fetchNotices = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await noticesApi.getNotices({
        page: currentPage,
        limit: 6,
        keyword: searchKeyword,
        ...activeFilters
      });
      
      if (result.success) {
        setNotices(result.data);
        setTotalPages(result.pagination.totalPages);
        
        console.log('📥 Данные с сервера:', {
          количество: result.data.length,
          первыйЭлемент: result.data[0]
        });
        
      } else {
        setError(result.error);
        setNotices([]);
        setTotalPages(1);
      }
      
    } catch (err) {
      console.error('❌ Ошибка:', err);
      setError('Произошла ошибка');
      setNotices([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchKeyword, activeFilters]);
  
  // 🎯 Загрузка данных для фильтров
  const fetchFiltersData = useCallback(async () => {
    const result = await noticesApi.getFiltersData();
    
    if (result.success) {
      setFiltersData(result.data);
    } else {
      setFiltersData({
        categories: [],
        sex: [],
        species: [],
        cities: []
      });
    }
  }, []);
  
  // 🎯 Обработка открытия модалки с деталями
  const handleLearnMore = async (notice) => {
    console.log('🔍 Открываем модалку для объявления:', notice.title);
    setSelectedNotice(notice);
    
    const token = localStorage.getItem('token');
    if (token) {
      // 👇 ВАЖНО: добавляем в просмотренные
      addToViewed(notice._id);
      setIsModalOpen(true);
    } else {
      setIsModalAttention(true);
    }
  };
  
  // 🎯 Закрытие модалки
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNotice(null);
  };
  
  // 🎯 Закрытие модалки внимания
  const handleCloseAttention = () => {
    setIsModalAttention(false);
  };
  
  // 🎯 Добавление в избранное из модалки
  const handleAddToFavorites = async (id) => {
    const result = await noticesApi.addToFavorites(id);
    if (result.success) {
      await refreshUser();
      handleCloseModal();
    }
  };
  
  // 🎯 Удаление из избранного из модалки
  const handleRemoveFromFavorites = async (id) => {
    const result = await noticesApi.removeFromFavorites(id);
    if (result.success) {
      await refreshUser();
      handleCloseModal();
    }
  };
  
  // 🎯 Добавление/удаление из избранного (сердечко)
  const handleToggleFavorite = async (noticeId) => {
    console.log('❤️ Пользователь кликнул на сердечко:', noticeId);
    
    const token = localStorage.getItem('token');
    const isLoggedIn = !!token;
    
    if (!isLoggedIn) {
      console.log('👤 Пользователь не авторизован');
      setIsModalAttention(true);
      return;
    }
    
    try {
      const currentUserResponse = await authApi.getCurrentUser();
      
      if (!currentUserResponse.success) {
        console.error('❌ Не удалось получить данные пользователя');
        return;
      }
      
      const freshFavorites = currentUserResponse.data.noticesFavorites || [];
      const isFavorite = freshFavorites.some(item => 
        item._id === noticeId || item === noticeId
      );
      
      if (isFavorite) {
        const result = await noticesApi.removeFromFavorites(noticeId);
        if (result.success) {
          await refreshUser();
        }
      } else {
        const result = await noticesApi.addToFavorites(noticeId);
        if (result.success) {
          await refreshUser();
        }
      }
    } catch (error) {
      console.error('❌ Ошибка:', error);
    }
  };
  
  // 🎯 Обработка поиска
  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
    setCurrentPage(1);
  };
  
  // 🎯 Обработка изменения фильтра
  const handleFilterChange = (filterName, value) => {
    if (['byDate', 'byPrice', 'byPopularity'].includes(filterName)) {
      setActiveFilters(prev => ({
        ...prev,
        byDate: filterName === 'byDate' ? value : false,
        byPrice: filterName === 'byPrice' ? value : false,
        byPopularity: filterName === 'byPopularity' ? value : false
      }));
    } else {
      setActiveFilters(prev => ({
        ...prev,
        [filterName]: value
      }));
    }
    
    setCurrentPage(1);
  };
  
  // 🎯 Сброс всех фильтров
  const handleResetFilters = () => {
    setSearchKeyword('');
    setActiveFilters({
      category: '',
      sex: '',
      species: '',
      locationId: '',
      byDate: false,
      byPrice: false,
      byPopularity: false
    });
    setCurrentPage(1);
  };
  
  // 🎯 Обработка пагинации
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // =============== ЭФФЕКТЫ ===============
  
  useEffect(() => {
    fetchNotices();
  }, [fetchNotices]);
  
  useEffect(() => {
    fetchFiltersData();
  }, [fetchFiltersData]);
  
  // =============== РЕНДЕР ===============
  
  const paginationButtons = Array.from(
    { length: totalPages },
    (_, i) => i + 1
  );
  
  return (
    <>
      {/* Модальное окно с деталями */}
      {selectedNotice && (
        <ModalNotice
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          notice={selectedNotice}
          onAdd={handleAddToFavorites}
          onRemove={handleRemoveFromFavorites}
        />
      )}
      
      {/* Модальное окно для неавторизованных */}
      <ModalAttention 
        isOpen={isModalAttention} 
        onClose={handleCloseAttention} 
      />
      
      <section className={styles.page}>
        <div className={styles.container}>
          
          <Title children="Find pet" />
          
          <NoticesFilters
            onFilterChange={handleFilterChange}
            onSearch={handleSearch}
            onReset={handleResetFilters}
            filtersData={filtersData}
          />
          
          {loading && (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>Loading notices...</p>
            </div>
          )}
          
          {error && !loading && (
            <div className={styles.error}>
              <p>{error}</p>
              <button
                className={styles.retryButton}
                onClick={fetchNotices}
                type="button"
              >
                Try again
              </button>
            </div>
          )}
          
          {!loading && !error && (
            <>
              <div className={styles.noticesInfo}>
                <p>
                  Found {notices.length} notices • Page {currentPage} of {totalPages}
                </p>
                {searchKeyword && (
                  <p className={styles.searchInfo}>
                    Search: "{searchKeyword}"
                  </p>
                )}
              </div>
              
              <NoticesList
                notices={notices}
                onLearnMore={handleLearnMore}
                onToggleFavorite={handleToggleFavorite}
                favorites={userFavorites}
              />
              
              {totalPages > 1 && notices.length > 0 && (
                <div className={styles.paginationWrapper}>
                  <Pagination
                    toPage={currentPage}
                    totalPages={totalPages}
                    setToPage={handlePageChange}
                    numberOfPages={paginationButtons}
                  />
                </div>
              )}
            </>
          )}
          
          {!loading && !error && notices.length === 0 && (
            <div className={styles.empty}>
              <p>No notices found</p>
              <p className={styles.emptySubtext}>
                Try changing your search criteria or filters
              </p>
              <button
                className={styles.resetButton}
                onClick={handleResetFilters}
                type="button"
              >
                Reset filters and show all
              </button>
            </div>
          )}
          
        </div>
      </section>
    </>
  );
};

export default NoticesPage;