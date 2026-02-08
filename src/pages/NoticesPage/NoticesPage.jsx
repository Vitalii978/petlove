// src/pages/NoticesPage/NoticesPage.jsx

// 🎯 ИМПОРТЫ
import { useState, useEffect, useCallback } from 'react';
import Title from '../../components/Title/Title';
import NoticesFilters from '../../components/Notices/NoticesFilters/NoticesFilters';
import NoticesList from '../../components/Notices/NoticesList/NoticesList'; // <-- ДОБАВИЛИ
import Pagination from '../../components/Pagination/Pagination';
import noticesApi from '../../services/noticesApi';
import styles from './NoticesPage.module.css';

// 🎯 КОМПОНЕНТ СТРАНИЦЫ ОБЪЯВЛЕНИЙ
export const NoticesPage = () => {
  // =============== СОСТОЯНИЯ (STATE) ===============
  
  // 🎯 ПОЛКА 1: Объявления
  const [notices, setNotices] = useState([]);
  
  // 🎯 ПОЛКА 2: Статус загрузки
  const [loading, setLoading] = useState(false);
  
  // 🎯 ПОЛКА 3: Ошибки
  const [error, setError] = useState(null);
  
  // 🎯 ПОЛКА 4: Поисковый запрос
  const [searchKeyword, setSearchKeyword] = useState('');
  
  // 🎯 ПОЛКА 5: Текущая страница
  const [currentPage, setCurrentPage] = useState(1);
  
  // 🎯 ПОЛКА 6: Всего страниц
  const [totalPages, setTotalPages] = useState(1);
  
  // 🎯 ПОЛКА 7: Данные для фильтров
  const [filtersData, setFiltersData] = useState({});
  
  // 🎯 ПОЛКА 8: Избранные объявления (ID)
  const [favorites, setFavorites] = useState([]);
  
  // 🎯 ПОЛКА 9: Активные фильтры
  const [activeFilters, setActiveFilters] = useState({
    category: '',
    sex: '',
    species: '',
    locationId: '',
    byDate: false,
    byPrice: false,
    byPopularity: false
  });
  
  // =============== ФУНКЦИИ ===============
  
  // 🎯 ФУНКЦИЯ 1: Загрузка объявлений
  const fetchNotices = useCallback(async () => {
    try {
      // 1. Включаем спиннер
      setLoading(true);
      setError(null);
      
      console.log('🔄 Загрузка объявлений...');
      
      // 2. Говорим почтальону принести объявления
      const result = await noticesApi.getNotices({
        page: currentPage,
        limit: 6,
        keyword: searchKeyword,
        ...activeFilters
      });
      
      console.log('📊 Ответ от сервера:', {
        успех: result.success,
        количество: result.data.length
      });
      
      // 3. Проверяем что принес почтальон
      if (result.success) {
        // Успех! Кладем объявления на полку
        setNotices(result.data);
        setTotalPages(result.pagination.totalPages);
      } else {
        // Ошибка! Кладем ошибку на полку
        setError(result.error);
        setNotices([]);
        setTotalPages(1);
      }
      
    } catch (err) {
      // Если что-то сломалось
      console.error('❌ Ошибка:', err);
      setError('Произошла ошибка');
      setNotices([]);
      setTotalPages(1);
    } finally {
      // Всегда выключаем спиннер
      setLoading(false);
    }
  }, [currentPage, searchKeyword, activeFilters]);
  
  // 🎯 ФУНКЦИЯ 2: Загрузка данных для фильтров
  const fetchFiltersData = useCallback(async () => {
    console.log('🔄 Загружаем данные для фильтров...');
    
    // Говорим почтальону принести списки для фильтров
    const result = await noticesApi.getFiltersData();
    
    if (result.success) {
      // Успех! Кладем данные на полку
      setFiltersData(result.data);
      console.log('✅ Данные фильтров загружены');
    } else {
      // Ошибка! Заполняем пустыми массивами
      console.warn('⚠️ Не удалось загрузить данные фильтров');
      setFiltersData({
        categories: [],
        sex: [],
        species: [],
        cities: []
      });
    }
  }, []);
  
  // 🎯 ФУНКЦИЯ 3: Обработка "Learn more"
  const handleLearnMore = (noticeId) => {
    console.log('🔍 Пользователь хочет узнать больше о объявлении:', noticeId);
    // Здесь позже откроем модальное окно
  };
  
  // 🎯 ФУНКЦИЯ 4: Добавление/удаление из избранного
  const handleToggleFavorite = async (noticeId) => {
    console.log('❤️ Пользователь кликнул на сердечко:', noticeId);
    
    // 1. Проверяем авторизован ли пользователь
    const isLoggedIn = false; // Пока заглушка
    
    if (!isLoggedIn) {
      // Если не авторизован - показываем сообщение
      console.log('👤 Пользователь не авторизован');
      // Здесь позже откроем модальное окно ModalAttention
      return;
    }
    
    // 2. Проверяем уже ли в избранном
    const isFavorite = favorites.includes(noticeId);
    
    if (isFavorite) {
      // Уже в избранном - удаляем
      console.log('➖ Удаляем из избранного');
      const result = await noticesApi.removeFromFavorites(noticeId);
      
      if (result.success) {
        // Удаляем ID из массива favorites
        setFavorites(prev => prev.filter(id => id !== noticeId));
      }
    } else {
      // Не в избранном - добавляем
      console.log('➕ Добавляем в избранное');
      const result = await noticesApi.addToFavorites(noticeId);
      
      if (result.success) {
        // Добавляем ID в массив favorites
        setFavorites(prev => [...prev, noticeId]);
      }
    }
  };
  
  // 🎯 ФУНКЦИЯ 5: Обработка поиска
  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
    setCurrentPage(1);
  };
  
  // 🎯 ФУНКЦИЯ 6: Обработка изменения фильтра
  const handleFilterChange = (filterName, value) => {
    console.log(`🎛️ Изменен фильтр ${filterName}:`, value);
    
    // Особый случай для сортировки
    if (['byDate', 'byPrice', 'byPopularity'].includes(filterName)) {
      setActiveFilters(prev => ({
        ...prev,
        byDate: filterName === 'byDate' ? value : false,
        byPrice: filterName === 'byPrice' ? value : false,
        byPopularity: filterName === 'byPopularity' ? value : false
      }));
    } else {
      // Обычные фильтры
      setActiveFilters(prev => ({
        ...prev,
        [filterName]: value
      }));
    }
    
    setCurrentPage(1);
  };
  
  // 🎯 ФУНКЦИЯ 7: Сброс всех фильтров
  const handleResetFilters = () => {
    console.log('🔄 Сброс всех фильтров');
    
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
  
  // 🎯 ФУНКЦИЯ 8: Обработка пагинации
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Плавная прокрутка вверх
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // =============== АВТОМАТИЧЕСКИЕ ДЕЙСТВИЯ ===============
  
  // 🎯 ЭФФЕКТ 1: Загрузка объявлений при изменении данных
  useEffect(() => {
    fetchNotices();
  }, [fetchNotices]);
  
  // 🎯 ЭФФЕКТ 2: Загрузка данных фильтров один раз при загрузке
  useEffect(() => {
    fetchFiltersData();
  }, [fetchFiltersData]);
  
  // =============== ГЕНЕРАЦИЯ КНОПОК ПАГИНАЦИИ ===============
  
  const paginationButtons = Array.from(
    { length: totalPages },
    (_, i) => i + 1
  );
  
  // =============== ОТОБРАЖЕНИЕ СТРАНИЦЫ ===============
  
  return (
    // 🎯 СЕКЦИЯ СТРАНИЦЫ
    <section className={styles.page}>
      
      {/* 🎯 КОНТЕЙНЕР ДЛЯ ЦЕНТРИРОВАНИЯ */}
      <div className={styles.container}>
        
        {/* 🎯 ЗАГОЛОВОК СТРАНИЦЫ */}
        <Title children="Find pet" />
        
        
        {/* 🎯 ПАНЕЛЬ ФИЛЬТРОВ */}
        <NoticesFilters
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
          onReset={handleResetFilters}
          filtersData={filtersData}
        />
        
        {/* =============== СОСТОЯНИЯ =============== */}
        
        {/* 🎯 СОСТОЯНИЕ 1: ЗАГРУЗКА */}
        {loading && (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Loading notices...</p>
          </div>
        )}
        
        {/* 🎯 СОСТОЯНИЕ 2: ОШИБКА */}
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
        
        {/* 🎯 СОСТОЯНИЕ 3: УСПЕШНАЯ ЗАГРУЗКА */}
        {!loading && !error && (
          <>
            {/* 🎯 ИНФОРМАЦИЯ О РЕЗУЛЬТАТАХ */}
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
            
            {/* 🎯 СПИСОК ОБЪЯВЛЕНИЙ */}
            {/* Здесь теперь используем NoticesList вместо ul/li */}
            <NoticesList
              notices={notices}
              onLearnMore={handleLearnMore}
              onToggleFavorite={handleToggleFavorite}
              favorites={favorites}
            />
            
            {/* 🎯 ПАГИНАЦИЯ (если больше 1 страницы) */}
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
        
        {/* 🎯 СОСТОЯНИЕ 4: ПУСТОЙ РЕЗУЛЬТАТ */}
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
  );
};

// 🎯 ЭКСПОРТ КОМПОНЕНТА
export default NoticesPage;