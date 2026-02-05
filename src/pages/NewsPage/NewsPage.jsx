
// src/pages/NewsPage/NewsPage.jsx
import { useState, useEffect, useMemo } from 'react';
import Title from '../../components/Title/Title';
import SearchField from '../../components/SearchField/SearchField';
import NewsList from '../../components/News/NewsList/NewsList';
import Pagination from '../../components/Pagination/Pagination';
import newsApi from '../../services/newsApi';
import styles from './NewsPage.module.css';

export const NewsPage = () => {
  const [allNews, setAllNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const itemsPerPage = 6;

  // 🎯 Загрузка всех новостей один раз
  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      const result = await newsApi.getNews({ page: 1, limit: 100 });
      if (result.success) setAllNews(result.data);
      setLoading(false);
    };
    loadNews();
  }, []);

  // 🎯 Фильтрация новостей при поиске (useMemo для оптимизации)
  const filteredNews = useMemo(() => {
    if (!searchQuery.trim()) return allNews;
    
    const query = searchQuery.toLowerCase();
    return allNews.filter(news => 
      news.title?.toLowerCase().includes(query) || 
      news.text?.toLowerCase().includes(query)
    );
  }, [allNews, searchQuery]);

  // 🎯 Новости для текущей страницы
  const currentPageNews = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredNews.slice(start, end);
  }, [filteredNews, currentPage, itemsPerPage]);

  // 🎯 Общее количество страниц
  const totalPages = useMemo(() => 
    Math.ceil(filteredNews.length / itemsPerPage) || 1,
    [filteredNews.length, itemsPerPage]
  );

  // 🎯 Обработчик поиска
  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Сбрасываем на первую страницу
  };

  // 🎯 Обработчик пагинации
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <Title text="News" />
        <SearchField onSearch={handleSearch} />
        
        {/* 🎯 Информация о поиске */}
        {searchQuery && (
          <div className={styles.searchInfo}>
            <p>
              {filteredNews.length === 0 ? (
                <>По запросу "<strong>{searchQuery}</strong>" ничего не найдено</>
              ) : (
                <>Найдено: <strong>{filteredNews.length}</strong> новостей</>
              )}
            </p>
          </div>
        )}
        
        {loading && <div className={styles.loading}>Загрузка...</div>}
        
        {!loading && (
          <>
            <NewsList news={currentPageNews} />
            
            {totalPages > 1 && (
              <div className={styles.paginationWrapper}>
                <Pagination
                  toPage={currentPage}
                  totalPages={totalPages}
                  setToPage={handlePageChange}
                  numberOfPages={Array.from({length: totalPages}, (_, i) => i + 1)}
                />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default NewsPage;