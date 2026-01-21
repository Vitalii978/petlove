// src/pages/LoginPage.jsx
import './LoginPage.css';
import { Link } from 'react-router-dom';

function LoginPage() {
  const handleSubmit = (event) => {
    event.preventDefault(); // Не забываем остановить перезагрузку!

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    console.log('Данные для входа:', data);
    // Здесь позже будет запрос на бэкенд и сохранение токена
  };

  return (
    <div className="login-page">
      <h1>Welcome Back! 🐱</h1>
      <p>Log in to access your profile and favorite pets.</p>

      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" name="email" required />
        </label>

        <label>
          Password:
          <input type="password" name="password" minLength="7" required />
        </label>

        <button type="submit">Log In</button>
      </form>

      <p className="register-link">
        Don't have an account? <Link to="/register">Register here</Link>.
      </p>

      <div className="pet-block">
        <div className="pet-image-placeholder">Image</div>
        <p>Your pets are waiting for you!</p>
      </div>
    </div>
  );
}

export default LoginPage;
