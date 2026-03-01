// src/pages/NoticesPage/NoticesPage.jsx
// 🎯 ГЛАВНАЯ СТРАНИЦА ОБЪЯВЛЕНИЙ
// ====================================================
// Что делает этот компонент:
// 1. Управляет состоянием фильтров и поиска
// 2. Загружает все данные с сервера (100 карточек)
// 3. Фильтрует на фронтенде по выбранным параметрам
// 4. Сортирует на фронтенде (Popular, Unpopular, Cheap, Expensive)
// 5. Управляет пагинацией
// 6. Открывает модальные окна
// ====================================================

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
import toast from 'react-hot-toast';

export const NoticesPage = () => {
  // =============== СОСТОЯНИЯ (STATE) ===============

  // 📦 notices - массив ВСЕХ отфильтрованных и отсортированных объявлений
  const [notices, setNotices] = useState([]);

  // ⏳ loading - флаг загрузки (показываем спиннер)
  const [loading, setLoading] = useState(false);

  // ❌ error - текст ошибки, если что-то пошло не так
  const [error, setError] = useState(null);

  // 🔍 searchKeyword - текст поиска
  const [searchKeyword, setSearchKeyword] = useState('');

  // 📄 currentPage - текущая страница (для пагинации)
  const [currentPage, setCurrentPage] = useState(1);

  // 🔢 totalPages - всего страниц (вычисляется из длины массива / 6)
  const [totalPages, setTotalPages] = useState(1);

  // 🎛️ filtersData - данные для выпадающих списков (категории, пол, типы, города)
  const [filtersData, setFiltersData] = useState({});

  // 🎯 activeFilters - активные фильтры (что выбрал пользователь)
  const [activeFilters, setActiveFilters] = useState({
    category: '', // Категория
    sex: '', // Пол
    species: '', // Вид животного
    locationId: '', // ID локации
    byDate: false, // Сортировка по дате
    byPrice: false, // Сортировка по цене (false, 'cheap', 'expensive')
    byPopularity: false, // Сортировка по популярности (false, 'popular', 'unpopular')
  });

  // =============== МОДАЛКИ ===============
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [isModalAttention, setIsModalAttention] = useState(false);

  // =============== ДАННЫЕ ПОЛЬЗОВАТЕЛЯ ===============
  const { favorites: userFavorites, addToViewed, refreshUser } = useUser();
  const [favoriteIds, setFavoriteIds] = useState(new Set());

  // 🔄 Синхронизируем избранные ID с данными из useUser
  useEffect(() => {
    if (userFavorites && userFavorites.length > 0) {
      const ids = new Set();
      userFavorites.forEach(fav => {
        if (typeof fav === 'object' && fav !== null) {
          if (fav._id) ids.add(fav._id);
          if (fav.id) ids.add(fav.id);
        } else {
          ids.add(fav);
        }
      });
      setFavoriteIds(ids);
    } else {
      setFavoriteIds(new Set());
    }
  }, [userFavorites]);

  // =============== 🎯 ФУНКЦИЯ СОРТИРОВКИ НА ФРОНТЕНДЕ ===============
  // 🔥 ВАЖНО: сортируем ТОЛЬКО 4 кнопки (Popular, Unpopular, Cheap, Expensive)
  // Все остальные фильтры (category, sex, species, locationId) работают до сортировки
  const sortNotices = (data, filters) => {
    if (!data || data.length === 0) return data;

    let sortedData = [...data];

    // 📊 Сортировка по популярности
    if (filters.byPopularity === 'popular') {
      console.log('📊 Сортировка Popular (от большего к меньшему)');
      // b.popularity - a.popularity = от большего к меньшему
      sortedData.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    } else if (filters.byPopularity === 'unpopular') {
      console.log('📊 Сортировка Unpopular (от меньшего к большему)');
      // a.popularity - b.popularity = от меньшего к большему
      sortedData.sort((a, b) => (a.popularity || 0) - (b.popularity || 0));
    }

    // 💰 Сортировка по цене
    if (filters.byPrice === 'expensive') {
      console.log('📊 Сортировка Expensive (от большей к меньшей)');
      sortedData.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (filters.byPrice === 'cheap') {
      console.log('📊 Сортировка Cheap (от меньшей к большей)');
      sortedData.sort((a, b) => (a.price || 0) - (b.price || 0));
    }

    // 📅 Сортировка по дате
    if (filters.byDate) {
      console.log('📊 Сортировка Date');
      sortedData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return sortedData;
  };

  // =============== ЗАГРУЗКА ВСЕХ ОБЪЯВЛЕНИЙ ===============
  const fetchAllNotices = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('📤 Запрос ВСЕХ объявлений с параметрами:', {
        keyword: searchKeyword,
        ...activeFilters,
      });

      // 🔥 Загружаем ВСЕ объявления (лимит 100)
      // Это единственный запрос к серверу - все остальное делаем на фронтенде
      const result = await noticesApi.getAllNotices(100);

      if (result.success && result.data) {
        // 🎯 ШАГ 1: Фильтруем по поиску и другим параметрам
        let filteredData = [...result.data];

        // Фильтр по ключевому слову (поиск)
        if (searchKeyword.trim()) {
          const keyword = searchKeyword.toLowerCase().trim();
          filteredData = filteredData.filter(
            item =>
              item.title?.toLowerCase().includes(keyword) ||
              item.description?.toLowerCase().includes(keyword) ||
              item.comment?.toLowerCase().includes(keyword)
          );
        }

        // Фильтр по категории (sell/free/lost/found)
        if (activeFilters.category) {
          filteredData = filteredData.filter(
            item => item.category === activeFilters.category
          );
        }

        // Фильтр по полу (male/female/multiple/unknown)
        if (activeFilters.sex) {
          filteredData = filteredData.filter(
            item => item.sex === activeFilters.sex
          );
        }

        // Фильтр по виду животного (dog/cat/bird и т.д.)
        if (activeFilters.species) {
          filteredData = filteredData.filter(
            item => item.species === activeFilters.species
          );
        }

        // 🔥 ИСПРАВЛЕНО: фильтр по локации (работает с разными структурами данных)
        if (activeFilters.locationId) {
          filteredData = filteredData.filter(item => {
            // Вариант 1: есть прямое поле locationId
            if (item.locationId) {
              return item.locationId === activeFilters.locationId;
            }
            // Вариант 2: location - это объект с полем _id
            else if (item.location && item.location._id) {
              return item.location._id === activeFilters.locationId;
            }
            // Вариант 3: location - это строка (ID)
            else if (item.location && typeof item.location === 'string') {
              return item.location === activeFilters.locationId;
            }
            // Вариант 4: нет данных о локации
            return false;
          });
        }

        console.log(
          '📊 Данные ДО сортировки:',
          filteredData.length,
          'элементов'
        );

        // 🎯 ШАГ 2: Применяем сортировку ко ВСЕМ данным
        const sortedData = sortNotices(filteredData, activeFilters);

        console.log(
          '📊 Данные ПОСЛЕ сортировки:',
          sortedData.length,
          'элементов'
        );

        // Показываем первые 5 для проверки (для отладки)
        if (sortedData.length > 0) {
          console.log('Первые 5 элементов после сортировки:');
          sortedData.slice(0, 5).forEach((item, index) => {
            console.log(`  ${index + 1}.`, {
              title: item.title,
              popularity: item.popularity,
              price: item.price,
              location: item.location || item.locationId,
            });
          });
        }

        // Сохраняем ВСЕ отсортированные данные
        setNotices(sortedData);
        setTotalPages(Math.ceil(sortedData.length / 6)); // 6 карточек на страницу

        // Сбрасываем на первую страницу
        setCurrentPage(1);
      } else {
        setError('Не удалось загрузить объявления');
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
  }, [searchKeyword, activeFilters]);

  // =============== ПОЛУЧЕНИЕ ТЕКУЩЕЙ СТРАНИЦЫ ===============
  // Из ВСЕГО массива notices берем только 6 элементов для текущей страницы
  const getCurrentPageNotices = () => {
    if (!notices.length) return [];
    const start = (currentPage - 1) * 6;
    const end = start + 6;
    return notices.slice(start, end);
  };

  // =============== ОСТАЛЬНЫЕ ФУНКЦИИ ===============

  // Проверка, находится ли объявление в избранном
  const isNoticeFavorite = useCallback(
    noticeId => favoriteIds.has(noticeId),
    [favoriteIds]
  );

  // Открытие модалки с деталями
  const handleLearnMore = useCallback(
    async notice => {
      if (!notice || !notice._id) return;
      const token = localStorage.getItem('token');
      if (token) {
        // ✅ Авторизован - показываем детальную модалку
        addToViewed(notice._id);
        const isFavorite = isNoticeFavorite(notice._id);
        setSelectedNotice({ ...notice, isFavorite });
        setIsModalOpen(true);
      } else {
        // 🔥 Не авторизован - показываем модалку внимания
        setSelectedNotice(notice);
        setIsModalAttention(true); //👈 ОТКРЫВАЕМ ModalAttention
      }
    },
    [addToViewed, isNoticeFavorite]
  );

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNotice(null);
  };

  const handleCloseAttention = () => {
    setIsModalAttention(false);
    setSelectedNotice(null);
  };

  // 🟢 Добавление в избранное из модалки
  const handleAddToFavorites = async id => {
    const result = await noticesApi.addToFavorites(id);
    if (result.success) {
      // Мгновенно обновляем локальный кэш
      setFavoriteIds(prev => {
        const newSet = new Set(prev);
        newSet.add(id);
        return newSet;
      });

      // 🟢 ПОВІДОМЛЕННЯ ПРО ДОДАВАННЯ
      toast.success('✅ Added to favorites', {
        duration: 3000,
      });

      await refreshUser();
      if (selectedNotice) {
        setSelectedNotice({ ...selectedNotice, isFavorite: true });
      }
      handleCloseModal();
    }
  };

  // Удаление из избранного
  const handleRemoveFromFavorites = async id => {
    const result = await noticesApi.removeFromFavorites(id);
    if (result.success) {
      setFavoriteIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });

      // 🟢 ПОВІДОМЛЕННЯ ПРО ВИДАЛЕННЯ
      toast.success('✅ Removed from favorites', {
        duration: 3000,
      });

      await refreshUser();
      if (selectedNotice) {
        setSelectedNotice({ ...selectedNotice, isFavorite: false });
      }
      handleCloseModal();
    }
  };

  // Переключение избранного (сердечко в карточке)
  const handleToggleFavorite = async noticeId => {
    const token = localStorage.getItem('token');
    if (!token) {
      // 🔥 Не авторизован - показываем модалку внимания
      const notice = notices.find(n => n._id === noticeId);
      if (notice) setSelectedNotice(notice);
      setIsModalAttention(true); // 👈 ОТКРЫВАЕМ ModalAttention
      return;
    }

    try {
      const isFavorite = isNoticeFavorite(noticeId);
      if (isFavorite) {
        const result = await noticesApi.removeFromFavorites(noticeId);
        if (result.success) {
          setFavoriteIds(prev => {
            const newSet = new Set(prev);
            newSet.delete(noticeId);
            return newSet;
          });

          // 🟢 ПОВІДОМЛЕННЯ ПРО ВИДАЛЕННЯ
          toast.success('✅ Removed from favorites', {
            duration: 3000,
          });

          await refreshUser();
        }
      } else {
        const result = await noticesApi.addToFavorites(noticeId);
        if (result.success) {
          setFavoriteIds(prev => {
            const newSet = new Set(prev);
            newSet.add(noticeId);
            return newSet;
          });

          // 🟢 ПОВІДОМЛЕННЯ ПРО ДОДАВАННЯ
          toast.success('✅ Added to favorites', {
            duration: 3000,
          });

          await refreshUser();
        }
      }
    } catch (error) {
      console.error('❌ Ошибка:', error);
    }
  };

  // Загрузка данных для фильтров
  const fetchFiltersData = useCallback(async () => {
    const result = await noticesApi.getFiltersData();
    if (result.success) {
      setFiltersData(result.data);
    } else {
      setFiltersData({ categories: [], sex: [], species: [], cities: [] });
    }
  }, []);

  // Обработка поиска
  const handleSearch = useCallback(keyword => {
    setSearchKeyword(keyword);
  }, []);

  // Обработка изменения фильтра
  const handleFilterChange = useCallback((filterName, value) => {
    console.log(`🎯 Фильтр изменен: ${filterName} = ${value}`);

    if (filterName === 'byPopularity') {
      setActiveFilters(prev => ({ ...prev, byPopularity: value }));
    } else if (filterName === 'byPrice') {
      setActiveFilters(prev => ({ ...prev, byPrice: value }));
    } else {
      setActiveFilters(prev => ({ ...prev, [filterName]: value }));
    }
  }, []);

  // Сброс всех фильтров
  const handleResetFilters = useCallback(() => {
    setSearchKeyword('');
    setActiveFilters({
      category: '',
      sex: '',
      species: '',
      locationId: '',
      byDate: false,
      byPrice: false,
      byPopularity: false,
    });
  }, []);

  // Обработка смены страницы
  const handlePageChange = useCallback(page => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // =============== ЭФФЕКТЫ ===============

  // Загружаем данные при изменении фильтров
  useEffect(() => {
    fetchAllNotices();
  }, [fetchAllNotices]);

  // Загружаем данные для фильтров один раз при монтировании
  useEffect(() => {
    fetchFiltersData();
  }, [fetchFiltersData]);

  // Логируем изменение фильтров (для отладки)
  useEffect(() => {
    console.log('🔄 Фильтры изменились, загружаем все данные...');
    console.log('  → byPopularity:', activeFilters.byPopularity);
    console.log('  → byPrice:', activeFilters.byPrice);
    console.log('  → byDate:', activeFilters.byDate);
    console.log('  → category:', activeFilters.category);
    console.log('  → sex:', activeFilters.sex);
    console.log('  → species:', activeFilters.species);
    console.log('  → locationId:', activeFilters.locationId);
  }, [activeFilters]);

  // =============== РЕНДЕР ===============

  const currentNotices = getCurrentPageNotices();
  const paginationButtons = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <>
      {/* Модальное окно с деталями объявления */}
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

      <section className={styles.pageNotices}>
        <div className={styles.container}>
          <Title children="Find your favorite pet" />

          {/* Компонент с фильтрами */}
          <NoticesFilters
            onFilterChange={handleFilterChange}
            onSearch={handleSearch}
            onReset={handleResetFilters}
            filtersData={filtersData}
          />

          {/* Состояние загрузки */}
          {loading && (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>Loading notices...</p>
            </div>
          )}

          {/* Состояние ошибки */}
          {error && !loading && (
            <div className={styles.error}>
              <p>{error}</p>
              <button
                className={styles.retryButton}
                onClick={fetchAllNotices}
                type="button"
              >
                Try again
              </button>
            </div>
          )}

          {/* Основной контент */}
          {!loading && !error && (
            <>
              {/* 🚫 ПАРАГРАФ УБРАН */}

              {/* Список объявлений */}
              <NoticesList
                notices={currentNotices}
                onLearnMore={handleLearnMore}
                onToggleFavorite={handleToggleFavorite}
                favorites={Array.from(favoriteIds)}
              />

              {/* Пагинация */}
              {totalPages > 1 && currentNotices.length > 0 && (
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
    </>
  );
};

export default NoticesPage;
