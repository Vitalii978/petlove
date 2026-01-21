import './FriendsPage.css';

function FriendsPage() {
            // Массив данных - список наших "друзей" (приютов/партнеров)
    const friends = [
         { 
      name: "Happy Paws Shelter", 
      email: "contact@happypaws.org",
      phone: "+380441234567",
      address: "Kyiv, Shevchenko str. 15",
      schedule: "Mon-Fri: 9:00-18:00"
    },
        { 
      name: "Animal Rescue Kyiv", 
      email: "help@arkyiv.org",
      phone: "+380442345678", 
      address: "Kyiv, Khreschatyk str. 22",
      schedule: "Mon-Sun: 8:00-20:00"
    },
    { 
      name: "Little Friends Clinic", 
      email: "clinic@littlefriends.ua",
      phone: "+380443456789",
      address: "Lviv, Franka str. 8",
      schedule: "Mon-Sat: 10:00-19:00"
    }
    ];


  return (
    <div className="friends-page">
      {/* Title - как сказано в ТЗ */}
      <h1>🐾 Our Friends & Partners</h1>
      <p>These shelters help us find homes for pets every day.</p>

      {/* FriendsList - оборачиваем в <ul> для семантики */}
      <ul className="friends-list">
        {friends.map((friend, index) => (
          // Обязательный key для каждого элемента списка
          <li key={index} className="friend-item">
            <h3>{friend.name}</h3>
            <p><strong>Address:</strong> {friend.address}</p>
            <p><strong>Phone:</strong> {friend.phone}</p>
            {/* Кнопка "View on Map" - по ТЗ это должна быть ссылка на карты */}
            <a 
              href={`https://maps.google.com/?q=${friend.address}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="map-link"
            >
              View on Map
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}


export default FriendsPage;