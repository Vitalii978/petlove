import { useState, useEffect } from 'react';
import Title from '../../components/Title/Title';
import SearchField from '../../components/SearchField/SearchField';
import NewsList from '../../components/News/NewsList/NewsList';
import Pagination from '../../components/Pagination/Pagination';
import newsApi from '../../services/newsApi';
import styles from './NewsPage.module.css';

export const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);

      try {
        const result = await newsApi.getNews({
          page: currentPage,
          limit: 6,
          keyword: searchKeyword,
        });

        if (result.success) {
          setNews(result.data);
          setTotalPages(result.pagination.totalPages);
        } else {
          setNews([]);
          setTotalPages(1);
        }
      } catch {
        setNews([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [currentPage, searchKeyword]);

  const handleSearch = keyword => {
    setSearchKeyword(keyword);
    setCurrentPage(1);
  };

  const handlePageChange = page => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const paginationButtons = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <section className={styles.sectionNews}>
      {loading ? (
        <div className={styles.loader}>Загрузка...</div>
      ) : (
        <ul className={styles.newsContainer}>
          <li className={styles.titleAndSearch}>
            <Title children="News" />
            <SearchField onSearch={handleSearch} />
          </li>

          <li className={styles.noticesList}>
            <NewsList news={news} />
          </li>

          <li className={styles.pagination}>
            {totalPages > 1 && (
              <Pagination
                numberOfPages={paginationButtons}
                totalPages={totalPages}
                setToPage={handlePageChange}
                toPage={currentPage}
              />
            )}
          </li>
        </ul>
      )}
    </section>
  );
};

export default NewsPage;
