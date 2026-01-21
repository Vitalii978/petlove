// src/pages/NoticesPage.jsx
import './NoticesPage.css';

function NoticesPage() {
    const pets = [
        {name: "Max", type: "dog", age: "2 years", location: "Kyiv "},
        {name: "Whiskers", type: "cat", age: "1 year", location: "Lviv"},
        {name: "Buddy", type: "dog", age: "3 years", location: "Odessa"},   
    ];

    return (
 <div className="notices-page">
      <h1>🐕 Pets for Adoption</h1>
      <p>Find your new best friend from our list</p>
      
      <div className="search-box">
        <input type="text" placeholder="Search pets..." />
        <button>Search</button>
      </div>
      
      <ul className="notices-list">
        {pets.map((pet, index) => (
          // ИЗМЕНЕНИЕ: <li> вместо <div>
          <li key={index} className="notice-item">
            <div className="pet-image">
              {pet.type === "dog" ? "🐶" : "🐈"}
            </div>
            <div className="pet-info">
              <h3>{pet.name}</h3>
              <p><strong>Type:</strong> {pet.type}</p>
              <p><strong>Age:</strong> {pet.age}</p>
              <p><strong>Location:</strong> {pet.location}</p>
              <button className="learn-more">Learn more</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
    );
}

export default NoticesPage;