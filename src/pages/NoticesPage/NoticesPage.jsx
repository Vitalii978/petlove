// src/pages/NoticesPage/NoticesPage.jsx

import { useState, useEffect, useCallback } from 'react';
import Title from '../../components/Title/Title';
import NoticesFilters from '../../components/Notices/NoticesFilters/NoticesFilters';
import Pagination from '../../components/Pagination/Pagination';
import noticesApi from '../../services/noticesApi';
import styles from './NoticesPage.module.css';

export const NoticesPage = () => {
  // 🎯 СОСТОЯНИЯ ДАННЫХ
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filtersData, setFiltersData] = useState({});
  
  // 🎯 СОСТОЯНИЯ ФИЛЬТРОВ (ПРАВИЛЬНЫЕ ИМЕНА)
  const [activeFilters, setActiveFilters] = useState({
    category: '',
    sex: '',
    species: '',
    locationId: '',
    byDate: false,
    byPrice: false,
    byPopularity: false
  });
  
  // 🎯 ФУНКЦИЯ ЗАГРУЗКИ ОБЪЯВЛЕНИЙ
 // src/pages/NoticesPage/NoticesPage.jsx
// В функции fetchNotices:

const fetchNotices = useCallback(async () => {
  try {
    setLoading(true);
    setError(null);
    
    console.log('🔍 НАЧАЛО fetchNotices для страницы', currentPage);
    console.log('🔍 Состояние до запроса:', {
      текущаяСтраница: currentPage,
      активныеФильтры: activeFilters,
      поисковыйЗапрос: searchKeyword
    });
    
    const result = await noticesApi.getNotices({
      page: currentPage,
      limit: 12,
      keyword: searchKeyword,
      ...activeFilters
    });
    
    console.log('📊 Ответ от API для страницы', currentPage, ':', {
      успех: result.success,
      получено_данных: result.data.length,
      данные: result.data.slice(0, 3).map(n => ({id: n._id, title: n.title})),
      все_id: result.data.map(n => n._id)
    });
    
    if (result.success) {
      console.log('✅ Устанавливаем notices:', result.data.length, 'элементов');
      setNotices(result.data);
      setTotalPages(result.pagination.totalPages);
      
      // 🎯 ПРОВЕРКА: что действительно установилось
      console.log('🔍 После setNotices - проверим в следующем рендере');
    } else {
      console.error('❌ Ошибка API:', result.error);
      setError(result.error);
      setNotices([]);
      setTotalPages(1);
    }
    
  } catch (err) {
    console.error('❌ Неожиданная ошибка:', err);
    setError('Произошла ошибка');
    setNotices([]);
    setTotalPages(1);
  } finally {
    setLoading(false);
    console.log('🔚 КОНЕЦ fetchNotices для страницы', currentPage);
  }
}, [currentPage, searchKeyword, activeFilters]);
  // 🎯 ФУНКЦИЯ ЗАГРУЗКИ ДАННЫХ ФИЛЬТРОВ
  const fetchFiltersData = useCallback(async () => {
    console.log('🔄 Загружаем данные для фильтров...');
    const result = await noticesApi.getFiltersData();
    
    if (result.success) {
      setFiltersData(result.data);
      console.log('✅ Данные фильтров загружены:', {
        categories: result.data.categories.length,
        sex: result.data.sex.length,
        species: result.data.species.length,
        cities: result.data.cities.length
      });
    } else {
      console.warn('⚠️ Не удалось загрузить данные фильтров:', result.error);
      setFiltersData({
        categories: [],
        sex: [],
        species: [],
        cities: []
      });
    }
  }, []);
  
  // 🎯 ЭФФЕКТ ДЛЯ ЗАГРУЗКИ ДАННЫХ
  useEffect(() => {
    fetchNotices();
  }, [fetchNotices]);
  
  // 🎯 ЭФФЕКТ ДЛЯ ЗАГРУЗКИ ДАННЫХ ФИЛЬТРОВ (только при монтировании)
  useEffect(() => {
    fetchFiltersData();
  }, [fetchFiltersData]);
  
  // 🎯 ОБРАБОТЧИК ПОИСКА
  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
    setCurrentPage(1);
  };
  
  // 🎯 ОБРАБОТЧИК ИЗМЕНЕНИЯ ФИЛЬТРА
  const handleFilterChange = (filterName, value) => {
    console.log(`🎛️ Изменен фильтр ${filterName}:`, value);
    
    // 🎯 ОСОБАЯ ОБРАБОТКА ДЛЯ СОРТИРОВКИ
    if (['byDate', 'byPrice', 'byPopularity'].includes(filterName)) {
      setActiveFilters(prev => ({
        ...prev,
        byDate: filterName === 'byDate' ? value : false,
        byPrice: filterName === 'byPrice' ? value : false,
        byPopularity: filterName === 'byPopularity' ? value : false
      }));
    } else {
      // 🎯 ОБЫЧНЫЕ ФИЛЬТРЫ
      setActiveFilters(prev => ({
        ...prev,
        [filterName]: value
      }));
    }
    
    setCurrentPage(1);
  };
  
  // 🎯 ОБРАБОТЧИК СБРОСА ФИЛЬТРОВ
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
  
  // 🎯 ОБРАБОТЧИК ПАГИНАЦИИ
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // 🎯 ГЕНЕРАЦИЯ КНОПОК ПАГИНАЦИИ
  const paginationButtons = Array.from(
    { length: totalPages },
    (_, i) => i + 1
  );
  
  // 🎯 ФОРМАТИРОВАНИЕ ДАТЫ
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };
  
  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <Title text="Find pet" />
        
        {/* 🎯 КОМПОНЕНТ ФИЛЬТРОВ */}
        <NoticesFilters
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
          onReset={handleResetFilters}
          filtersData={filtersData}
        />
        
        {/* 🎯 СОСТОЯНИЕ ЗАГРУЗКИ */}
        {loading && (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Loading notices...</p>
          </div>
        )}
        
        {/* 🎯 СОСТОЯНИЕ ОШИБКИ */}
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
        
        {/* 🎯 УСПЕШНАЯ ЗАГРУЗКА */}
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
            
            {/* 🎯 СПИСОК ОБЪЯВЛЕНИЙ (ЗАГЛУШКА) */}
           {notices.length > 0 ? (
              <ul className={styles.noticesList}>
                {notices.map((notice) => (
                  <li key={notice._id} className={styles.noticeItem}>
        <div className={styles.noticeImage}>
          <img 
            src={notice.imgURL || 'https://placehold.co/300x200/cccccc/666666?text=No+Image'} 
            alt={notice.title}
            loading="lazy"
          />
        </div>
        <div className={styles.noticeContent}>
          <h3>{notice.title}</h3>
          <p><strong>Name:</strong> {notice.name}</p>
          <p><strong>Species:</strong> {notice.species}</p>
          <p><strong>Category:</strong> {notice.category}</p>
          <p><strong>Sex:</strong> {notice.sex}</p>
          {notice.price && <p><strong>Price:</strong> ${notice.price}</p>}
          <p><strong>Added:</strong> {formatDate(notice.createdAt)}</p>
          <p><strong>Popularity:</strong> {notice.popularity || 0}</p>
        </div>
                  </li>
                ))}
              </ul>
            ) : (
        <div className={styles.emptyState}>
          <p>No notices found</p>
          <p className={styles.emptySubtext}>
            Try changing your search criteria or filters
          </p>
        </div>
)}
            
            {/* 🎯 ПАГИНАЦИЯ */}
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
      </div>
    </section>
  );
};

export default NoticesPage;