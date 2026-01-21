// src/components/Header.jsx
import { Link } from "react-router-dom";
import "./Header.css";

// Шаг 1: Создаем компонент Header
const Header = () => {
    return (
    <header className="header">
      <div className="logo">
        <Link to="/">Petlove 🐾</Link> {/* ← Link вместо обычной ссылки */}
      </div>
      <nav className="nav">
        {/* Заменяем все <a> на <Link> */}
        <Link to="/news">News</Link>
        <Link to="/notices">Notices</Link>
        <Link to="/friends">Friends</Link>
      </nav>
    </header>
  );
};

// Шаг 3: Даем возможность использовать этот компонент в других файлах
export default Header;