// src/pages/NewsPage.jsx

import './NewsPage.css';

function NewsPage() {
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
    </div>
    );
}

export default NewsPage;