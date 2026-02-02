import React, { useState } from 'react';
import NewsList from '../components/News/NewsList/NewsList';
import NewsItem from '../components/News/NewsItem/NewsItem';
import Title from '../components/Title/Title';

// 🎯 ПРАВИЛЬНО ИМПОРТИРУЕМ SearchField
// Убедитесь что путь соответствует вашей структуре:
import SearchField from '../components/SearchField/SearchField';

// Если путь выше не работает, попробуйте один из этих:
// import SearchField from '../../components/SearchField/SearchField';
// import SearchField from '../../../components/SearchField/SearchField';

import styles from './TestNewsComponents.module.css';

const TestNewsComponents = () => {
  const [testState, setTestState] = useState('withData');
  const [searchQuery, setSearchQuery] = useState('');
  
  const mockNewsData = [
    {
      id: 1,
      title: "Как правильно ухаживать за хомяками",
      description: "Хомяки требуют особого ухода...",
      date: "15/01/2024",
      imageUrl: "https://images.unsplash.com/photo-1506891536236-3e07892564b7?w=400&h=300&fit=crop",
      readMoreUrl: "https://example.com/hamster-care"
    },
    // ... остальные новости
  ];
  
  // 🎯 ФУНКЦИЯ ДЛЯ ПОИСКА
  const handleSearch = (query) => {
    console.log('Search query:', query);
    setSearchQuery(query);
    alert(`Вы искали: "${query}"`);
    
    // Фильтрация новостей по поисковому запросу
    const filtered = mockNewsData.filter(news => 
      news.title.toLowerCase().includes(query.toLowerCase()) ||
      news.description.toLowerCase().includes(query.toLowerCase())
    );
    
    console.log('Найдено новостей:', filtered.length);
  };
  
  const getTestData = () => {
    switch(testState) {
      case 'loading':
        return { news: [], isLoading: true, error: null };
      case 'error':
        return { news: [], isLoading: false, error: 'Failed to load news' };
      case 'empty':
        return { news: [], isLoading: false, error: null };
      default:
        return { news: mockNewsData, isLoading: false, error: null };
    }
  };
  
  const testData = getTestData();
  
  return (
    <div className={styles.testContainer}>
      <Title>Тестирование компонентов News</Title>
      
      {/* 🎯 ПАНЕЛЬ УПРАВЛЕНИЯ */}
      <div className={styles.controlPanel}>
        <h3>Выберите тестовое состояние:</h3>
        <div className={styles.buttons}>
          {['withData', 'loading', 'error', 'empty'].map((state) => (
            <button
              key={state}
              className={`${styles.stateButton} ${testState === state ? styles.active : ''}`}
              onClick={() => setTestState(state)}
            >
              {state === 'withData' ? 'С данными' : 
               state === 'loading' ? 'Загрузка' : 
               state === 'error' ? 'Ошибка' : 'Пусто'}
            </button>
          ))}
        </div>
      </div>
      
      {/* 🎯 ТЕСТ SearchField - ТЕПЕРЬ РАБОТАЕТ */}
      <div className={styles.testSection}>
        <h3>1. Тест SearchField компонента:</h3>
        
        {/* 🎯 ВОТ ОН - SearchField КОМПОНЕНТ */}
        <SearchField 
          onSearch={handleSearch}
          placeholder="Поиск новостей о животных..."
        />
        
        <div style={{
          marginTop: '20px',
          padding: '15px',
          background: '#f0f8ff',
          borderRadius: '10px',
          fontSize: '14px',
          color: '#333'
        }}>
          <p><strong>Проверьте:</strong></p>
          <ul>
            <li>Введите текст → должен появиться крестик</li>
            <li>Клик на крестик → очищает поле</li>
            <li>Клик на лупу или Enter → показывает alert с текстом поиска</li>
            <li>Текущий запрос: <strong>{searchQuery || '(пусто)'}</strong></li>
          </ul>
        </div>
      </div>
      
      {/* 🎯 ТЕСТ NewsItem */}
      <div className={styles.testSection}>
        <h3>2. Тест одной карточки NewsItem:</h3>
        <div className={styles.singleItemTest}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, width: '100%' }}>
            <NewsItem
              key={1}
              id={1}
              title="Тестовая новость"
              description="Это тестовое описание новости для проверки работы компонента."
              date="22/01/2024"
              imageUrl="https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop"
              readMoreUrl="https://example.com/test"
            />
          </ul>
        </div>
      </div>
      
      {/* 🎯 ТЕСТ NewsList */}
      <div className={styles.testSection}>
        <h3>3. Тест списка NewsList:</h3>
        <NewsList {...testData} />
      </div>
    </div>
  );
};

export default TestNewsComponents;