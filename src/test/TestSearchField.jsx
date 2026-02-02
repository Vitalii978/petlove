// src/test/TestSearchField.jsx
import React, { useState } from 'react';
import SearchField from '../components/SearchField/SearchField';

const TestSearchField = () => {
  const [searchResult, setSearchResult] = useState('');

  const handleSearch = (query) => {
    console.log('Search query:', query);
    setSearchResult(`Вы искали: "${query}"`);
  };

  return (
    <div style={{ padding: '50px' }}>
      <h2>Тест SearchField компонента</h2>
      
      <SearchField 
        onSearch={handleSearch}
        placeholder="Поиск новостей..."
      />
      
      <div style={{ marginTop: '20px', color: '#f6b83d', fontWeight: 'bold' }}>
        {searchResult}
      </div>
      
      <div style={{ marginTop: '30px', fontSize: '14px', color: '#666' }}>
        <p>Что проверить:</p>
        <ul>
          <li>Введите текст - должна появиться кнопка крестика</li>
          <li>Клик на крестик - очищает поле</li>
          <li>Клик на лупу или Enter - вызывает поиск</li>
          <li>Плейсхолдер отображается правильно</li>
        </ul>
      </div>
    </div>
  );
};

export default TestSearchField;