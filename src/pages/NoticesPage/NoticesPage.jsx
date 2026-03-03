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
    byPopularity: false,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [isModalAttention, setIsModalAttention] = useState(false);

  const { favorites: userFavorites, addToViewed, refreshUser } = useUser();
  const [favoriteIds, setFavoriteIds] = useState(new Set());

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

  const sortNotices = (data, filters) => {
    if (!data || data.length === 0) return data;

    let sortedData = [...data];

    if (filters.byPopularity === 'popular') {
      sortedData.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    } else if (filters.byPopularity === 'unpopular') {
      sortedData.sort((a, b) => (a.popularity || 0) - (b.popularity || 0));
    }

    if (filters.byPrice === 'expensive') {
      sortedData.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (filters.byPrice === 'cheap') {
      sortedData.sort((a, b) => (a.price || 0) - (b.price || 0));
    }

    if (filters.byDate) {
      sortedData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return sortedData;
  };

  const fetchAllNotices = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await noticesApi.getAllNotices(100);

      if (result.success && result.data) {
        let filteredData = [...result.data];

        if (searchKeyword.trim()) {
          const keyword = searchKeyword.toLowerCase().trim();
          filteredData = filteredData.filter(item => {
            const titleMatch = item.title?.toLowerCase().includes(keyword);
            const descMatch = item.description?.toLowerCase().includes(keyword);
            const commentMatch = item.comment?.toLowerCase().includes(keyword);

            let speciesMatch = false;
            if (typeof item.species === 'string') {
              speciesMatch = item.species?.toLowerCase().includes(keyword);
            } else if (item.species?.name) {
              speciesMatch = item.species.name?.toLowerCase().includes(keyword);
            }

            const nameMatch = item.name?.toLowerCase().includes(keyword);

            let locationMatch = false;
            if (typeof item.location === 'string') {
              locationMatch = item.location?.toLowerCase().includes(keyword);
            } else if (item.location?.city) {
              locationMatch = item.location.city
                ?.toLowerCase()
                .includes(keyword);
            } else if (item.location?.cityEn) {
              locationMatch = item.location.cityEn
                ?.toLowerCase()
                .includes(keyword);
            }

            const typeMatch = item.type?.toLowerCase().includes(keyword);
            const breedMatch = item.breed?.toLowerCase().includes(keyword);
            const animalTypeMatch = item.animalType
              ?.toLowerCase()
              .includes(keyword);
            const categoryMatch = item.category
              ?.toLowerCase()
              .includes(keyword);
            const sexMatch = item.sex?.toLowerCase().includes(keyword);

            return (
              titleMatch ||
              descMatch ||
              commentMatch ||
              speciesMatch ||
              nameMatch ||
              locationMatch ||
              typeMatch ||
              breedMatch ||
              animalTypeMatch ||
              categoryMatch ||
              sexMatch
            );
          });
        }

        if (activeFilters.category) {
          filteredData = filteredData.filter(
            item => item.category === activeFilters.category
          );
        }

        if (activeFilters.sex) {
          filteredData = filteredData.filter(
            item => item.sex === activeFilters.sex
          );
        }

        if (activeFilters.species) {
          filteredData = filteredData.filter(
            item => item.species === activeFilters.species
          );
        }

        if (activeFilters.locationId) {
          filteredData = filteredData.filter(item => {
            if (item.locationId) {
              return item.locationId === activeFilters.locationId;
            } else if (item.location && item.location._id) {
              return item.location._id === activeFilters.locationId;
            } else if (item.location && typeof item.location === 'string') {
              return item.location === activeFilters.locationId;
            }
            return false;
          });
        }

        const sortedData = sortNotices(filteredData, activeFilters);

        setNotices(sortedData);
        setTotalPages(Math.ceil(sortedData.length / 6));
        setCurrentPage(1);
      } else {
        setError('Не удалось загрузить объявления');
        setNotices([]);
        setTotalPages(1);
      }
    } catch {
      setError('Произошла ошибка');
      setNotices([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [searchKeyword, activeFilters]);

  const getCurrentPageNotices = () => {
    if (!notices.length) return [];
    const start = (currentPage - 1) * 6;
    const end = start + 6;
    return notices.slice(start, end);
  };

  const isNoticeFavorite = useCallback(
    noticeId => favoriteIds.has(noticeId),
    [favoriteIds]
  );

  const handleLearnMore = useCallback(
    async notice => {
      if (!notice || !notice._id) return;
      const token = localStorage.getItem('token');
      if (token) {
        addToViewed(notice._id);
        const isFavorite = isNoticeFavorite(notice._id);
        setSelectedNotice({ ...notice, isFavorite });
        setIsModalOpen(true);
      } else {
        setSelectedNotice(notice);
        setIsModalAttention(true);
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

  const handleAddToFavorites = async id => {
    const result = await noticesApi.addToFavorites(id);
    if (result.success) {
      setFavoriteIds(prev => {
        const newSet = new Set(prev);
        newSet.add(id);
        return newSet;
      });

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

  const handleRemoveFromFavorites = async id => {
    const result = await noticesApi.removeFromFavorites(id);
    if (result.success) {
      setFavoriteIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });

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

  const handleToggleFavorite = async noticeId => {
    const token = localStorage.getItem('token');
    if (!token) {
      const notice = notices.find(n => n._id === noticeId);
      if (notice) setSelectedNotice(notice);
      setIsModalAttention(true);
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

  const fetchFiltersData = useCallback(async () => {
    const result = await noticesApi.getFiltersData();
    if (result.success) {
      setFiltersData(result.data);
    } else {
      setFiltersData({ categories: [], sex: [], species: [], cities: [] });
    }
  }, []);

  const handleSearch = useCallback(keyword => {
    setSearchKeyword(keyword);
  }, []);

  const handleFilterChange = useCallback((filterName, value) => {
    if (filterName === 'byPopularity') {
      setActiveFilters(prev => ({ ...prev, byPopularity: value }));
    } else if (filterName === 'byPrice') {
      setActiveFilters(prev => ({ ...prev, byPrice: value }));
    } else {
      setActiveFilters(prev => ({ ...prev, [filterName]: value }));
    }
  }, []);

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

  const handlePageChange = useCallback(page => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    fetchAllNotices();
  }, [fetchAllNotices]);

  useEffect(() => {
    fetchFiltersData();
  }, [fetchFiltersData]);

  const currentNotices = getCurrentPageNotices();
  const paginationButtons = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <>
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

      <ModalAttention
        isOpen={isModalAttention}
        onClose={handleCloseAttention}
      />

      <section className={styles.pageNotices}>
        <div className={styles.container}>
          <Title children="Find your favorite pet" />

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
                onClick={fetchAllNotices}
                type="button"
              >
                Try again
              </button>
            </div>
          )}

          {!loading && !error && (
            <>
              <NoticesList
                notices={currentNotices}
                onLearnMore={handleLearnMore}
                onToggleFavorite={handleToggleFavorite}
                favorites={Array.from(favoriteIds)}
              />

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
