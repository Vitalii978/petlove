// src/pages/RegisterPage/RegisterPage.jsx

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../utils/auth'; // Импортируем нашу функцию
import Title from '../../components/Title/Title';
import styles from './RegisterPage.module.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  
  // 🎯 СОСТОЯНИЯ
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // 🎯 ОБРАБОТЧИК ИЗМЕНЕНИЯ ПОЛЕЙ
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Очищаем ошибку
  };
  
  // 🎯 ОБРАБОТЧИК ОТПРАВКИ
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 🎯 ПРОВЕРКА ДАННЫХ
    if (!formData.name.trim()) {
      setError('Please enter your name');
      return;
    }
    
    if (!formData.email.trim()) {
      setError('Please enter your email');
      return;
    }
    
    if (formData.password.length < 7) {
      setError('Password must be at least 7 characters');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // 🎯 ВЫЗЫВАЕМ НАШУ ФУНКЦИЮ register
      const result = await register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });
      
      console.log('📊 Результат регистрации:', result);
      
      if (result.success) {
        console.log('✅ Успешная регистрация!');
        // Переходим на профиль
        navigate('/profile');
      } else {
        setError(result.error);
      }
    } catch (err) {
      console.error('❌ Ошибка:', err);
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <Title text="Registration" />
        
        <div className={styles.card}>
          {error && (
            <div className={styles.error}>
              <p>❌ {error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label>Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                disabled={loading}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                disabled={loading}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Min 7 characters"
                disabled={loading}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Confirm Password *</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                disabled={loading}
                required
              />
            </div>
            
            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
          
          <div className={styles.loginLink}>
            <p>
              Already have an account?{' '}
              <Link to="/login" className={styles.link}>
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;