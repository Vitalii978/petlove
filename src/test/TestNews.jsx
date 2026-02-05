// src/test/TestNews.jsx
import { useState, useEffect } from 'react';
import newsApi from '../services/newsApi';

export default function TestNews() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const testAPI = async () => {
      console.log('🧪 Начинаем тест API...');
      
      // Тест 1: Загрузка без поиска
      const test1 = await newsApi.getNews({
        page: 1,
        limit: 6,
        query: '',
      });
      console.log('📊 Тест 1 (без поиска):', test1);
      
      // Тест 2: Загрузка с поиском "dog"
      const test2 = await newsApi.getNews({
        page: 1,
        limit: 6,
        query: 'dog',
      });
      console.log('📊 Тест 2 (поиск "dog"):', test2);
      
      // Тест 3: Загрузка с поиском "фыввцфавцй"
      const test3 = await newsApi.getNews({
        page: 1,
        limit: 6,
        query: 'фыввцфавцй',
      });
      console.log('📊 Тест 3 (поиск рандом):', test3);
      
      setResult({ test1, test2, test3 });
      setLoading(false);
    };
    
    testAPI();
  }, []);

  if (loading) return <div>Тестируем API...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Результаты теста API:</h2>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}