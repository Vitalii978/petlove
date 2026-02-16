// src/pages/NoticesPage/NoticesPage.jsx
// 🎯 ИСПРАВЛЕНО: правильная работа с избранным и модалками

import { useState, useEffect, useCallback } from 'react';
import Title from '../../components/Title/Title';
import NoticesFilters from '../../components/Notices/NoticesFilters/NoticesFilters';
import NoticesList from '../../components/Notices/NoticesList/NoticesList';
import Pagination from '../../components/Pagination/Pagination';
import ModalNotice from '../../components/ModalNotice/ModalNotice';
import ModalAttention from '../../components/ModalAttention/ModalAttention';
import noticesApi from '../../services/noticesApi';
import useUser from '../../hooks/useUser';
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
  
  const { favorites: userFavorites, addToViewed, refreshUser } = useUser();
  
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
  
  // 🎯 Функция проверки, находится ли объявление в избранном
  const isNoticeFavorite = useCallback((noticeId) => {
    if (!noticeId || !userFavorites) return false;
    
    return userFavorites.some(fav => {
      if (typeof fav === 'object' && fav !== null) {
        return fav._id === noticeId || fav.id === noticeId;
      }
      return fav === noticeId;
    });
  }, [userFavorites]);
  
  // 🎯 Обработка открытия модалки с деталями
  const handleLearnMore = useCallback(async (notice) => {
    console.log('🔍 Открываем модалку для объявления:', notice.title);
    
    if (!notice || !notice._id) {
      console.error('❌ Нет данных объявления');
      return;
    }
    
    const token = localStorage.getItem('token');
    
    if (token) {
      // ✅ Добавляем в просмотренные
      addToViewed(notice._id);
      
      // ✅ Проверяем, в избранном ли это объявление
      const isFavorite = isNoticeFavorite(notice._id);
      
      // ✅ Добавляем флаг isFavorite в объект notice
      const noticeWithFavorite = {
        ...notice,
        isFavorite: isFavorite
      };
      
      setSelectedNotice(noticeWithFavorite);
      setIsModalOpen(true);
    } else {
      // Если не авторизован - показываем модалку внимания
      setSelectedNotice(notice);
      setIsModalAttention(true);
    }
  }, [addToViewed, isNoticeFavorite]);
  
  // 🎯 Закрытие модалки
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedNotice(null);
  }, []);
  
  // 🎯 Закрытие модалки внимания
  const handleCloseAttention = useCallback(() => {
    setIsModalAttention(false);
    setSelectedNotice(null);
  }, []);
  
  // 🎯 Добавление в избранное из модалки
  const handleAddToFavorites = useCallback(async (id) => {
    console.log('➕ Добавляем в избранное из модалки:', id);
    
    const result = await noticesApi.addToFavorites(id);
    if (result.success) {
      await refreshUser();
      
      // ✅ Обновляем выбранное объявление с новым флагом isFavorite
      if (selectedNotice) {
        setSelectedNotice({
          ...selectedNotice,
          isFavorite: true
        });
      }
      
      handleCloseModal();
    }
  }, [refreshUser, selectedNotice, handleCloseModal]);
  
  // 🎯 Удаление из избранного из модалки
  const handleRemoveFromFavorites = useCallback(async (id) => {
    console.log('🗑️ Удаляем из избранного из модалки:', id);
    
    const result = await noticesApi.removeFromFavorites(id);
    if (result.success) {
      await refreshUser();
      
      // ✅ Обновляем выбранное объявление с новым флагом isFavorite
      if (selectedNotice) {
        setSelectedNotice({
          ...selectedNotice,
          isFavorite: false
        });
      }
      
      handleCloseModal();
    }
  }, [refreshUser, selectedNotice, handleCloseModal]);
  
  // 🎯 Добавление/удаление из избранного (сердечко в карточке)
  const handleToggleFavorite = useCallback(async (noticeId) => {
    console.log('❤️ Пользователь кликнул на сердечко для ID:', noticeId);
    
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.log('👤 Пользователь не авторизован');
      
      // Находим объявление в списке
      const notice = notices.find(n => n._id === noticeId);
      if (notice) {
        setSelectedNotice(notice);
      }
      
      setIsModalAttention(true);
      return;
    }
    
    try {
      // Проверяем, есть ли уже это объявление в избранном
      const isFavorite = isNoticeFavorite(noticeId);
      
      console.log(`📊 Текущее состояние: ${isFavorite ? 'в избранном' : 'не в избранном'}`);
      
      if (isFavorite) {
        // ✅ Если уже в избранном - удаляем
        console.log('🗑️ Удаляем из избранного:', noticeId);
        const result = await noticesApi.removeFromFavorites(noticeId);
        if (result.success) {
          await refreshUser();
          console.log('✅ Удалено из избранного');
        }
      } else {
        // ✅ Если не в избранном - добавляем
        console.log('➕ Добавляем в избранное:', noticeId);
        const result = await noticesApi.addToFavorites(noticeId);
        if (result.success) {
          await refreshUser();
          console.log('✅ Добавлено в избранное');
        }
      }
    } catch (error) {
      console.error('❌ Ошибка при переключении избранного:', error);
    }
  }, [notices, isNoticeFavorite, refreshUser]);
  
  // 🎯 Обработка поиска
  const handleSearch = useCallback((keyword) => {
    setSearchKeyword(keyword);
    setCurrentPage(1);
  }, []);
  
  // 🎯 Обработка изменения фильтра
  const handleFilterChange = useCallback((filterName, value) => {
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
  }, []);
  
  // 🎯 Сброс всех фильтров
  const handleResetFilters = useCallback(() => {
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
  }, []);
  
  // 🎯 Обработка пагинации
  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  
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
          isFavorite={selectedNotice.isFavorite || false}
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
