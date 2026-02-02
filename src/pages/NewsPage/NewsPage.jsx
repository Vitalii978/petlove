// src/pages/NewsPage.jsx
import './NewsPage.css';
import { useState } from 'react';
import Pagination from '../../components/Pagination/Pagination.jsx';

function NewsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(10);

  const totalPages = 10;

    // Массив всех страниц [1, 2, 3, ..., 10]
  const allPages = Array.from({ length: totalPages }, (_, i) => i + 1);

  

    return (
    <div className="news-page">
      <h1>📰 Pet News</h1>
      <p>Latest news about pets and adoption</p>
      
      <div className="news-list">
        <div className="news-item">
          <h3>How to care for a new puppy</h3>
          <p>Learn the basics of puppy care in our new article...</p>
          <button>Read more</button>
        </div>
        
        <div className="news-item">
          <h3>Cat adoption event this weekend</h3>
          <p>Local shelter organizes free adoption day...</p>
          <button>Read more</button>
        </div>
        
        <div className="news-item">
          <h3>New pet food regulations</h3>
          <p>Government introduces new standards for pet food...</p>
          <button>Read more</button>
        </div>
      </div>
      <Pagination
        numberOfPages={allPages} // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        totalPages={totalPages}  // 10
        setToPage={setCurrentPage} // Функция изменения страницы
        toPage={currentPage}     // Текущая страница
      />
    </div>
    );
}

export default NewsPage;