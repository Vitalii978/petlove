// Хук для определения типа страницы (на какой странице мы находимся)
// useLocation импортируется внутри хука, но не экспортируется наружу - это нормально
import { useLocation } from 'react-router-dom';

export const usePageType = () => {
  // useLocation используется внутри хука
  const location = useLocation();

  // Проверяем, находимся ли мы на главной странице
  const isHomePage = location.pathname === '/';

  // Возвращаем объект с информацией о странице
  return {
    isHomePage,
    // Можно добавить другие страницы позже
    pageType: isHomePage ? 'home' : 'other',
  };
};
