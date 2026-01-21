// src/pages/RegisterPage.jsx
import './RegisterPage.css';
import { Link } from 'react-router-dom'; // Импортируем Link для перехода на Login

function RegisterPage() {
  // Пока что функция просто выводит данные в консоль
  const handleSubmit = (event) => {
    event.preventDefault(); // ОСТАНОВИТЬ перезагрузку страницы!
    
    // Получаем данные из формы
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    console.log('Данные для регистрации:', data);
    // Здесь позже будет запрос на бэкенд
  };

  return (
    <div className="register-page">
      <h1>Create Your Account 🐶</h1>
      <p>Join Petlove to find your new friend.</p>

      {/* Простая HTML-форма */}
      <form className="register-form" onSubmit={handleSubmit}>
        <label>
          Your Name:
          <input type="text" name="name" required />
        </label>

        <label>
          Email:
          <input type="email" name="email" required />
        </label>

        <label>
          Password:
          <input type="password" name="password" minLength="7" required />
        </label>

        <label>
          Confirm Password:
          <input type="password" name="confirmPassword" minLength="7" required />
        </label>

        <button type="submit">Register</button>
      </form>

      {/* Ссылка на страницу логина, как в ТЗ */}
      <p className="login-link">
        Already have an account? <Link to="/login">Log in here</Link>.
      </p>

      {/* PetBlock - заглушка, как в ТЗ */}
      <div className="pet-block">
        <div className="pet-image-placeholder">Image</div>
        <p>Your future friend is waiting!</p>
      </div>
    </div>
  );
}

export default RegisterPage;