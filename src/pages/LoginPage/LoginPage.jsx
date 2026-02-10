// src/pages/LoginPage/LoginPage.jsx

// 🎯 Импорты React хуков
import { useState } from 'react';

// 🎯 Импорты для навигации
import { Link, useNavigate } from 'react-router-dom';

// 🎯 Импорты наших утилит и компонентов
import { login } from '../../utils/auth'; // ✅ Используем исправленную функцию
import Title from '../../components/Title/Title';
import PetBlock from '../../components/PetBlock/PetBlock';

// 🎯 Импорты стилей
import styles from './LoginPage.module.css';

// 🎯 КОМПОНЕНТ СТРАНИЦЫ ВХОДА
const LoginPage = () => {
  // 🎯 useNavigate - для перехода на другие страницы
  const navigate = useNavigate();
  
  // =============== СОЗДАНИЕ СОСТОЯНИЙ ===============
  
  // 🎯 Состояние для данных формы
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  // 🎯 Состояние для ошибок
  const [error, setError] = useState('');
  
  // 🎯 Состояние для загрузки
  const [loading, setLoading] = useState(false);
  
  // =============== ОБРАБОТЧИКИ СОБЫТИЙ ===============
  
  // 🎯 Обработчик изменения полей ввода
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Обновляем только одно поле, остальные оставляем как были
    setFormData(prev => ({
      ...prev,        // Берем все предыдущие значения
      [name]: value   // Меняем только одно поле
    }));
    
    // Очищаем ошибку при изменении поля
    setError('');
  };
  
  // 🎯 Обработчик отправки формы
  const handleSubmit = async (e) => {
    // Предотвращаем стандартное поведение формы (перезагрузку страницы)
    e.preventDefault();
    
    console.log('🔄 Начинаем вход...');
    
    // 🎯 ПРОВЕРКА ВАЛИДНОСТИ НА КЛИЕНТЕ
    if (!formData.email.trim()) {
      setError('Please enter your email');
      return;
    }
    
    if (!formData.password.trim()) {
      setError('Please enter your password');
      return;
    }
    
    if (formData.password.length < 7) {
      setError('Password must be at least 7 characters');
      return;
    }
    
    // 🎯 ВКЛЮЧАЕМ ЗАГРУЗКУ
    setLoading(true);
    setError('');
    
    try {
      // 🎯 ВЫЗЫВАЕМ ФУНКЦИЮ ВХОДА ИЗ auth.js
      const result = await login({
        email: formData.email.trim(),
        password: formData.password,
      });
      
      console.log('📊 Результат login:', {
        успех: result.success,
        ошибка: result.error
      });
      
      // 🎯 ПРОВЕРЯЕМ РЕЗУЛЬТАТ
      if (result.success) {
        console.log('✅ Вход успешен! Переходим в профиль...');
        // Переходим на страницу профиля
        navigate('/profile');
      } else {
        // Показываем ошибку от сервера
        setError(result.error || 'Login failed');
      }
      
    } catch (err) {
      // Неожиданная ошибка
      console.error('❌ Неожиданная ошибка при входе:', err);
      setError('Something went wrong. Please try again.');
      
    } finally {
      // 🎯 ВСЕГДА ВЫКЛЮЧАЕМ ЗАГРУЗКУ
      setLoading(false);
    }
  };
  
  // =============== РЕНДЕР СТРАНИЦЫ ===============
  
  return (
    // 🎯 section - семантический тег для секции страницы
    <section className={styles.page}>
      
      {/* 🎯 Контейнер для центрирования контента */}
      <div className={styles.container}>
        
        {/* 🎯 КОМПОНЕНТ С КАРТИНКОЙ ПИТОМЦА */}
        {/* PetBlock - один компонент, позиционируется стилями */}
        <div className={styles.petBlockWrapper}>
          <PetBlock>
            {/* 🎯 Картинки для разных размеров экрана */}
            <source
              srcSet="/dogLoginMob_1x.png 1x, /dogLoginMob_2x.png 2x"
              media="(max-width: 767px)"
            />
            <source
              srcSet="/dogLoginTab_1x.png 1x, /dogLoginTab_2x.png 2x"
              media="(min-width: 768px) and (max-width: 1279.5px)"
            />
            <source
              srcSet="/dogLoginPc_1x.png 1x, /dogLoginPc_2x.png 2x"
              media="(min-width: 1280px)"
            />

            {/* 🎯 Фолбэк картинка (если браузер не поддерживает picture) */}
            <img src="/dogLoginMob_1x.png" alt="dog" />
            
          </PetBlock>
        </div>
        
        {/* 🎯 СЕКЦИЯ С ФОРМОЙ */}
        <div className={styles.formSection}>
          
          {/* 🎯 ЗАГОЛОВОК СТРАНИЦЫ */}
          <Title text="Log In" />
          
          {/* 🎯 СООБЩЕНИЕ ОБ ОШИБКЕ (если есть) */}
          {error && (
            <div className={styles.error}>
              <p>{error}</p>
            </div>
          )}
          
          {/* 🎯 ФОРМА ВХОДА */}
          <form onSubmit={handleSubmit} className={styles.form}>
            
            {/* 🎯 ПОЛЕ ДЛЯ EMAIL */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Email *
              </label>
              <input
                type="email"
                name="email" // 🎯 Важно: name должен совпадать с полем в formData
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
                placeholder="Enter your email"
                disabled={loading} // 🎯 Блокируем при загрузке
                required
                autoComplete="email" // 🎯 Помогаем браузеру запомнить email
              />
            </div>
            
            {/* 🎯 ПОЛЕ ДЛЯ ПАРОЛЯ */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Password *
              </label>
              <input
                type="password"
                name="password" // 🎯 Важно: name должен совпадать с полем в formData
                value={formData.password}
                onChange={handleChange}
                className={styles.input}
                placeholder="Enter your password"
                disabled={loading} // 🎯 Блокируем при загрузке
                required
                autoComplete="current-password" // 🎯 Помогаем браузеру запомнить пароль
              />
              <p className={styles.passwordHint}>
                Min 7 characters
              </p>
            </div>
            
            {/* 🎯 КНОПКА ОТПРАВКИ */}
            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={loading} // 🎯 Блокируем при загрузке
            >
              {/* 🎯 Меняем текст кнопки при загрузке */}
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
          
          {/* 🎯 ССЫЛКА НА РЕГИСТРАЦИЮ */}
          <div className={styles.registerLink}>
            <p className={styles.registerText}>
              Don't have an account?{' '}
              <Link to="/register" className={styles.link}>
                Register
              </Link>
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
};

// 🎯 ЭКСПОРТ КОМПОНЕНТА
export default LoginPage;