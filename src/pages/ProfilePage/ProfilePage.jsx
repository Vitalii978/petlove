// src/pages/ProfilePage/ProfilePage.jsx

// 🎯 ИМПОРТЫ
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../../utils/auth';
// import api from '../../services/api';
import Title from '../../components/Title/Title';
import UserCard from '../../components/UserCard/UserCard';
// import MyNotices from '../../components/MyNotices/MyNotices';
import styles from './ProfilePage.module.css';

// 🎯 КОМПОНЕНТ СТРАНИЦЫ ПРОФИЛЯ
const ProfilePage = () => {
  // 🎯 ХУК ДЛЯ НАВИГАЦИИ
  const navigate = useNavigate();

  // 🎯 СОСТОЯНИЯ КОМПОНЕНТА
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
//   const [activeTab, setActiveTab] = useState('favorites'); // Для MyNotices

  // 🎯 ФУНКЦИЯ ЗАГРУЗКИ ДАННЫХ ПОЛЬЗОВАТЕЛЯ
  const loadUserData = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      
      console.log('🔄 Загружаем данные профиля...');
      
      const result = await getCurrentUser();
      
      if (result.success) {
        console.log('✅ Данные пользователя загружены:', {
          имя: result.user.name,
          email: result.user.email,
          питомцев: result.user.pets?.length || 0
        });
        
        setUser(result.user);
      } else {
        setError(result.error || 'Failed to load profile');
        setUser(null);
      }
    } catch (error) {
      console.error('❌ Ошибка при загрузке профиля:', error);
      setError('Something went wrong. Please try again.');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // 🎯 ЗАГРУЗКА ДАННЫХ ПРИ МОНТИРОВАНИИ
  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  // 🎯 ОБРАБОТЧИК ОБНОВЛЕНИЯ ПОЛЬЗОВАТЕЛЯ
  const handleUserUpdate = (updatedUser) => {
    setUser(updatedUser);
    console.log('✅ Профиль обновлен:', updatedUser.name);
  };

  // 🎯 ОБРАБОТЧИК ДОБАВЛЕНИЯ ПИТОМЦА
  const handleAddPet = () => {
    navigate('/add-pet');
  };

  // 🎯 ОБРАБОТЧИК ВЫХОДА
  const handleLogout = async () => {
    try {
      await logout();
      console.log('✅ Пользователь вышел из системы');
      navigate('/');
      window.location.reload(); // Обновляем страницу для обновления хедера
    } catch (error) {
      console.error('❌ Ошибка при выходе:', error);
    }
  };

  // 🎯 ОБРАБОТЧИК ПОВТОРНОЙ ЗАГРУЗКИ
  const handleRetry = () => {
    loadUserData();
  };

//   // 🎯 ОБРАБОТЧИК ИЗМЕНЕНИЯ ТАБОВ
//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//   };

  // 🎯 СОСТОЯНИЕ ЗАГРУЗКИ
  if (loading) {
    return (
      <section className={styles.page}>
        <div className={styles.container}>
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            <p className={styles.loadingText}>Loading your profile...</p>
          </div>
        </div>
      </section>
    );
  }

  // 🎯 СОСТОЯНИЕ ОШИБКИ
  if (error) {
    return (
      <section className={styles.page}>
        <div className={styles.container}>
          <Title text="My Profile" />
          <div className={styles.errorState}>
            <h3 className={styles.errorTitle}>Unable to load profile</h3>
            <p className={styles.errorText}>{error}</p>
            <button 
              className={styles.retryButton}
              onClick={handleRetry}
              type="button"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  // 🎯 СОСТОЯНИЕ "НЕТ ДАННЫХ"
  if (!user) {
    return (
      <section className={styles.page}>
        <div className={styles.container}>
          <Title text="My Profile" />
          <div className={styles.emptyState}>
            <h3 className={styles.emptyTitle}>No profile data</h3>
            <p className={styles.emptyText}>
              Please log in to view your profile
            </p>
            <button 
              className={styles.loginButton}
              onClick={() => navigate('/login')}
              type="button"
            >
              Go to Login
            </button>
          </div>
        </div>
      </section>
    );
  }

  // 🎯 ОСНОВНОЙ РЕНДЕР
  return (
    <section className={styles.page}>
      <div className={styles.container}>
        
        {/* 🎯 ЗАГОЛОВОК СТРАНИЦЫ */}
        <Title text="My Profile" />
        
        {/* 🎯 ОСНОВНОЕ СОДЕРЖИМОЕ */}
        <div className={styles.profileContent}>
          
          {/* 🎯 КАРТОЧКА ПОЛЬЗОВАТЕЛЯ (USERCARD) */}
          <UserCard 
            userData={user}
            onUserUpdate={handleUserUpdate}
            onAddPet={handleAddPet}
            onLogout={handleLogout}
          />
          
          {/* 🎯 КОМПОНЕНТ С ОБЪЯВЛЕНИЯМИ (MYNOTICES) */}
          {/* <MyNotices 
            activeTab={activeTab}
            onTabChange={handleTabChange}
            userId={user._id}
          /> */}
          
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;