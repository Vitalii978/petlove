// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { register } from '../../utils/auth';
// import Title from '../../components/Title/Title';
// import PetBlock from '../../components/PetBlock/PetBlock';
// import styles from './RegisterPage.module.css';

// const RegisterPage = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleChange = e => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value,
//     }));
//     setError('');
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();

//     if (!formData.name.trim()) {
//       setError('Please enter your name');
//       return;
//     }

//     if (!formData.email.trim()) {
//       setError('Please enter your email');
//       return;
//     }

//     if (formData.password.length < 7) {
//       setError('Password must be at least 7 characters');
//       return;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     setLoading(true);
//     setError('');

//     try {
//       const result = await register({
//         name: formData.name.trim(),
//         email: formData.email.trim(),
//         password: formData.password,
//       });

//       if (result.success) {
//         navigate('/profile');
//       } else {
//         setError(result.error);
//       }
//     } catch {
//       // 🎯 ИСПРАВЛЕНО: убрал параметр err, так как он не используется
//       setError('Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className={styles.page}>
//       <div className={styles.container}>
//         {/* 🎯 PetBlock - один компонент, позиционируется стилями */}
//         <div className={styles.petBlockWrapper}>
//           <PetBlock>
//             <source
//               srcSet="/catRegisterMob_1x.png 1x, /catRegisterMob_2x.png 2x"
//               media="(max-width: 767px)"
//             />
//             <source
//               srcSet="/catRegisterTab_1x.png 1x, /catRegisterTab_2x.png 2x"
//               media="(min-width: 768px) and (max-width: 1279.5px)"
//             />
//             <source
//               srcSet="/catRegisterPC_1x.png 1x, /catRegisterPC_2x.png 2x"
//               media="(min-width: 1280px)"
//             />

//             <img src="/catRegisterMob_1x.png" alt="cat" />
//           </PetBlock>
//         </div>

//         {/* 🎯 Форма регистрации */}
//         <div className={styles.formSection}>
//           <Title text="Registration" />

//           {error && (
//             <div className={styles.error}>
//               <p>{error}</p>
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className={styles.form}>
//             <div className={styles.formGroup}>
//               <label className={styles.label}>Name *</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className={styles.input}
//                 placeholder="Enter your name"
//                 disabled={loading}
//                 required
//               />
//             </div>

//             <div className={styles.formGroup}>
//               <label className={styles.label}>Email *</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className={styles.input}
//                 placeholder="Enter your email"
//                 disabled={loading}
//                 required
//               />
//             </div>

//             <div className={styles.formGroup}>
//               <label className={styles.label}>Password *</label>
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className={styles.input}
//                 placeholder="Min 7 characters"
//                 disabled={loading}
//                 required
//               />
//             </div>

//             <div className={styles.formGroup}>
//               <label className={styles.label}>Confirm Password *</label>
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 className={styles.input}
//                 placeholder="Confirm password"
//                 disabled={loading}
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               className={styles.submitButton}
//               disabled={loading}
//             >
//               {loading ? 'Registering...' : 'Register'}
//             </button>
//           </form>

//           <div className={styles.loginLink}>
//             <p className={styles.loginText}>
//               Already have an account?{' '}
//               <Link to="/login" className={styles.link}>
//                 Log In
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default RegisterPage;

// src/pages/RegisterPage/RegisterPage.jsx
// 🎯 СТРАНИЦА РЕГИСТРАЦИИ - АДАПТИРОВАНА ПОД ДИЗАЙН ИЗ FIGMA
// ====================================================
// Что делает эта страница:
// 1. Отображает форму регистрации с полями name, email, password, confirmPassword
// 2. Валидирует данные: name - любой, email - формат, password - минимум 7 символов
// 3. Проверяет совпадение паролей через alert
// 4. При успехе - перенаправляет на профиль /profile/favorites
// 5. При ошибке - показывает сообщение пользователю
// ====================================================

// 🎯 ИМПОРТЫ REACT ХУКОВ
// useState - для хранения данных формы и ошибок
import { useState } from 'react';

// 🎯 ИМПОРТЫ ДЛЯ НАВИГАЦИИ
// Link - для ссылки на вход
// useNavigate - для перенаправления после успешной регистрации
import { Link, useNavigate } from 'react-router-dom';

// 🎯 ИМПОРТЫ НАШИХ УТИЛИТ И КОМПОНЕНТОВ
// register - функция для отправки запроса на сервер
import { register } from '../../utils/auth';
// Title - универсальный компонент заголовка
import Title from '../../components/Title/Title';
// PetBlock - компонент с картинкой кота (адаптивная)
import PetBlock from '../../components/PetBlock/PetBlock';
// RegistrationForm - компонент формы (валидация, иконки, поля)
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm.jsx';

// 🎯 ИМПОРТЫ СТИЛЕЙ
// Используем CSS модули для изоляции стилей
import styles from './RegisterPage.module.css';

// 🎯 КОМПОНЕНТ СТРАНИЦЫ РЕГИСТРАЦИИ
// Экспортируем по умолчанию для использования в маршрутизации
const RegisterPage = () => {
  // =============== 🟢 СОЗДАНИЕ СОСТОЯНИЙ ===============

  // 🟢 navigate - хук для перенаправления на другие страницы
  // Используется после успешной регистрации: navigate('/profile/favorites')
  const navigate = useNavigate();

  // 🟢 userData - состояние для хранения данных из формы
  // Приходит из RegistrationForm через setUserData
  // Структура: { name: 'John', email: 'user@mail.com', password: '1234567' }
  const [userData, setUserData] = useState({});

  // 🟢 error - состояние для хранения текста ошибки
  // Если ошибка есть - показываем красное сообщение
  // Если ошибки нет - пустая строка (ничего не показываем)
  const [error, setError] = useState('');

  // =============== 🟢 ЭФФЕКТ ДЛЯ ОТПРАВКИ ФОРМЫ ===============
  // 🟢 useEffect срабатывает КАЖДЫЙ РАЗ, когда меняется userData
  // То есть когда пользователь отправляет форму (setUserData в RegistrationForm)
  useState(() => {
    // 🟢 ШАГ 1: Проверяем, есть ли данные
    // Если name, email или password пустые - ничего не делаем
    // Это защита от первого рендера, когда данные еще не пришли
    if (!userData.name || !userData.email || !userData.password) return;

    // 🟢 ШАГ 2: Создаем асинхронную функцию для отправки запроса
    // Нельзя сделать сам useEffect асинхронным, поэтому создаем внутреннюю функцию
    const handleRegister = async () => {
      console.log('🔄 Начинаем регистрацию...', userData);

      // 🟢 ШАГ 3: Очищаем предыдущую ошибку (если была)
      setError('');

      try {
        // 🟢 ШАГ 4: Отправляем запрос на сервер
        // register - функция из utils/auth.js
        // Отправляет POST запрос на /users/signup
        const result = await register({
          name: userData.name.trim(), // Убираем лишние пробелы
          email: userData.email.trim(),
          password: userData.password,
        });

        // 🟢 ШАГ 5: Обрабатываем ответ от сервера
        if (result.success) {
          // ✅ Успех! Сервер создал пользователя и вернул токен
          console.log('✅ Регистрация успешна! Переходим в профиль...');
          // Перенаправляем пользователя на страницу профиля (вкладка избранное)
          navigate('/profile/favorites');
        } else {
          // ❌ Ошибка от сервера (email уже существует, и т.д.)
          setError(result.error || 'Registration failed');
        }
      } catch (err) {
        // ❌ Критическая ошибка (нет интернета, сервер упал)
        console.error('❌ Ошибка при регистрации:', err);
        setError('Something went wrong. Please try again.');
      }
    };

    // 🟢 ШАГ 6: Вызываем функцию
    handleRegister();

    // 🟢 ЗАВИСИМОСТИ useEffect:
    // - userData: эффект срабатывает когда появляются новые данные из формы
    // - navigate: стабильная функция из react-router (никогда не меняется)
  }, [userData, navigate]);

  // =============== 🟢 РЕНДЕР СТРАНИЦЫ ===============
  // Возвращаем JSX разметку - то, что увидит пользователь

  return (
    // 🟢 Основная секция страницы
    // Используем семантический тег <section>
    <section className={styles.registrationSection}>
      {/* 🟢 СПИСОК ИЗ ДВУХ ЭЛЕМЕНТОВ (КАК В FIGMA) */}
      {/* Используем <ul> для семантики - это список */}
      <ul className={styles.registration}>
        {/* 🟢 ЛЕВЫЙ ЭЛЕМЕНТ - КАРТИНКА */}
        {/* <li> потому что это элемент списка */}
        <li className={styles.petBlock}>
          {/* 🟢 PetBlock - готовый компонент с картинкой */}
          {/* Внутри него - <picture> для адаптивных изображений */}
          {/* style={"cat"} - указываем, что это кот (для стилей) */}
          <PetBlock style={'cat'}>
            {/* 🟢 Картинки для мобильных телефонов (до 767px) */}
            {/* srcSet: 1x для обычных экранов, 2x для retina */}
            <source
              srcSet="/catRegisterMob_1x.png 1x, /catRegisterMob_2x.png 2x"
              media="(max-width: 767px)"
            />

            {/* 🟢 Картинки для планшетов (768px - 1279px) */}
            <source
              srcSet="/catRegisterTab_1x.png 1x, /catRegisterTab_2x.png 2x"
              media="(min-width: 768px) and (max-width: 1279.5px)"
            />

            {/* 🟢 Картинки для компьютеров (от 1280px) */}
            <source
              srcSet="/catRegisterPC_1x.png 1x, /catRegisterPC_2x.png 2x"
              media="(min-width: 1280px)"
            />

            {/* 🟢 Фолбэк картинка (если ничего не подошло) */}
            <img src="/catRegisterMob_1x.png" alt="cat" />
          </PetBlock>
        </li>

        {/* 🟢 ПРАВЫЙ ЭЛЕМЕНТ - ФОРМА РЕГИСТРАЦИИ */}
        <li className={styles.boxRegistration}>
          {/* 🟢 ЗАГОЛОВОК СТРАНИЦЫ */}
          {/* Компонент Title - универсальный, можно передавать текст */}
          <Title>Registration</Title>

          {/* 🟢 СООБЩЕНИЕ ОБ ОШИБКЕ (условный рендеринг) */}
          {/* Показываем только если error не пустая строка */}
          {error && (
            <div className={styles.error} role="alert">
              <p>{error}</p>
            </div>
          )}

          {/* 🟢 КОМПОНЕНТ ФОРМЫ РЕГИСТРАЦИИ */}
          {/* Передаем setUserData - функция для получения данных из формы */}
          {/* Когда пользователь нажмет Submit, RegistrationForm вызовет эту функцию */}
          <RegistrationForm setUserData={setUserData} />

          {/* 🟢 ССЫЛКА НА ВХОД */}
          {/* Для пользователей, у которых уже есть аккаунт */}
          <div className={styles.loginLink}>
            <p className={styles.loginText}>
              Already have an account?{' '}
              {/* Link из react-router - переход без перезагрузки страницы */}
              <Link to="/login" className={styles.link}>
                Log In
              </Link>
            </p>
          </div>
        </li>
      </ul>
    </section>
  );
};

// 🟢 Экспортируем компонент для использования в App.jsx
export default RegisterPage;
