// // src/components/FavoritesList/FavoritesList.jsx

// import React, { useState } from 'react';
// import useUser from '../../hooks/useUser'; // 👈 ДОБАВЛЯЕМ ЭТУ СТРОКУ
// import noticesApi from '../../services/noticesApi';
// import NoticesItem from '../Notices/NoticeItem/NoticeItem';
// import ModalAttention from '../ModalAttention/ModalAttention';
// import ModalNotice from '../ModalNotice/ModalNotice';
// import styles from './FavoritesList.module.css';

// const FavoritesList = () => {
//   // ВРЕМЕННО: заменим старый источник данных на новый
//   const { favorites, refreshUser } = useUser();
  
//   // А старый источник закомментируем
//   // const dispatch = useDispatch();
//   // const data = useSelector(selectFavorites);
  
//   const [isModalAttention, setIsModalAttention] = useState(false);
//   const [isModalOneFriend, setIsModalOneFriend] = useState(false);
//   const [selectedNotice, setSelectedNotice] = useState(null);

//   const token = localStorage.getItem('token');

//   const closeModalAttention = () => setIsModalAttention(false);
//   const closeModalOneFriend = () => setIsModalOneFriend(false);

//   const handleOpenModal = (notice) => {
//     setSelectedNotice(notice);
//     if (token) {
//       setIsModalOneFriend(true);
//     } else {
//       setIsModalAttention(true);
//     }
//   };

//   const handleAddToFavorites = async (id) => {
//     try {
//       const response = await noticesApi.addToFavorites(id);
//       if (response.success) {
//         await refreshUser();
//         closeModalOneFriend();
//       }
//     } catch (error) {
//       console.error('Ошибка:', error);
//     }
//   };

//   const handleRemoveFromFavorites = async (id) => {
//     try {
//       const response = await noticesApi.removeFromFavorites(id);
//       if (response.success) {
//         await refreshUser();
//         closeModalOneFriend();
//       }
//     } catch (error) {
//       console.error('Ошибка:', error);
//     }
//   };

//   if (!favorites || favorites.length === 0) {
//     return (
//       <div className={styles.noFavorites}>
//         <p>Нет избранных объявлений</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       <ModalAttention 
//         isOpen={isModalAttention} 
//         onClose={closeModalAttention} 
//       />
      
//       {selectedNotice && (
//         <ModalNotice
//           isOpen={isModalOneFriend}
//           onClose={closeModalOneFriend}
//           notice={selectedNotice}
//           onAdd={handleAddToFavorites}
//           onRemove={handleRemoveFromFavorites}
//         />
//       )}

//       {/* <ul className={styles.noticesList}>
//         {favorites.map((notice) => (
//           <li key={notice._id} className={styles.oneCard}>
//             <NoticesItem
//               id={notice._id}
//               imgURL={notice.imgURL}
//               title={notice.title}
//               name={notice.name}
//               birthday={notice.birthday}
//               gender={notice.sex}
//               species={notice.species}
//               category={notice.category}
//               comment={notice.comment}
//               price={notice.price}
//               popularity={notice.popularity}
//               onOpenModal={() => handleOpenModal(notice)}
//               favorites={true}
//               boxFavorite={false}
//             />
//           </li>
//         ))}
//       </ul> */}
//       <ul className={styles.noticesList}>
//   {favorites.map((notice) => {
//     // 👇 ВРЕМЕННО: логируем каждое объявление
//     console.log('📦 Данные избранного:', {
//       _id: notice._id,
//       imgURL: notice.imgURL,
//       title: notice.title,
//       // проверяем структуру notice
//       keys: Object.keys(notice)
//     });
    
//     return (
//       <li key={notice._id} className={styles.oneCard}>
//         <NoticesItem
//           id={notice._id}
//           imgURL={notice.imgURL}
//           title={notice.title}
//           name={notice.name}
//           birthday={notice.birthday}
//           gender={notice.sex}
//           species={notice.species}
//           category={notice.category}
//           comment={notice.comment}
//           price={notice.price}
//           popularity={notice.popularity}
//           onOpenModal={() => handleOpenModal(notice)}
//           favorites={true}
//           boxFavorite={false}
//         />
//       </li>
//     );
//   })}
// </ul>
//     </>
//   );
// };

// export default FavoritesList;







// src/components/FavoritesList/FavoritesList.jsx
// 🎯 ЭТО КОМПОНЕНТ ДЛЯ ОТОБРАЖЕНИЯ ИЗБРАННЫХ ОБЪЯВЛЕНИЙ

import React, { useState } from 'react';
// 👇 ИСПОЛЬЗУЕМ НАШ НОВЫЙ ХУК - ОН ДАЕТ НАМ favorites И refreshUser
import useUser from '../../hooks/useUser';
import noticesApi from '../../services/noticesApi';
import NoticesItem from '../Notices/NoticeItem/NoticeItem';
import ModalAttention from '../ModalAttention/ModalAttention';
import ModalNotice from '../ModalNotice/ModalNotice';
import styles from './FavoritesList.module.css';

const FavoritesList = () => {
  // 🎯 ПОЛУЧАЕМ ДАННЫЕ ИЗ ХУКА useUser
  // favorites - массив избранных объявлений
  // refreshUser - функция для обновления данных пользователя
  const { favorites, refreshUser } = useUser();
  
  // 🎯 СОСТОЯНИЯ ДЛЯ МОДАЛЬНЫХ ОКОН
  const [isModalAttention, setIsModalAttention] = useState(false);  // Модалка для неавторизованных
  const [isModalOneFriend, setIsModalOneFriend] = useState(false);  // Модалка с деталями
  const [selectedNotice, setSelectedNotice] = useState(null);       // Выбранное объявление

  // 🎯 ПРОВЕРЯЕМ, ЕСТЬ ЛИ ТОКЕН (авторизован ли пользователь)
  const token = localStorage.getItem('token');

  // 🎯 ФУНКЦИИ ЗАКРЫТИЯ МОДАЛЬНЫХ ОКОН
  const closeModalAttention = () => setIsModalAttention(false);
  const closeModalOneFriend = () => setIsModalOneFriend(false);

  // 🎯 ОБРАБОТЧИК ОТКРЫТИЯ МОДАЛЬНОГО ОКНА
  // Когда пользователь кликает на карточку объявления
  const handleOpenModal = (notice) => {
    setSelectedNotice(notice);  // Запоминаем, какое объявление выбрали
    
    if (token) {
      // Если авторизован - показываем детальную модалку
      setIsModalOneFriend(true);
    } else {
      // Если нет - показываем предупреждение "зарегистрируйтесь"
      setIsModalAttention(true);
    }
  };

  // 🎯 ДОБАВЛЕНИЕ В ИЗБРАННОЕ
  const handleAddToFavorites = async (id) => {
    try {
      // Отправляем запрос на сервер
      const response = await noticesApi.addToFavorites(id);
      if (response.success) {
        // 🎯 ВАЖНО: Обновляем данные пользователя
        // refreshUser загрузит свежие данные с сервера
        await refreshUser();
        closeModalOneFriend();  // Закрываем модалку
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  // 🎯 УДАЛЕНИЕ ИЗ ИЗБРАННОГО
  const handleRemoveFromFavorites = async (id) => {
    try {
      const response = await noticesApi.removeFromFavorites(id);
      if (response.success) {
        // 🎯 ВАЖНО: Обновляем данные - карточка исчезнет из списка
        await refreshUser();
        closeModalOneFriend();
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  // 🎯 СОСТОЯНИЕ: НЕТ ИЗБРАННЫХ
  if (!favorites || favorites.length === 0) {
    return (
      <div className={styles.noFavorites}>
        <p>Нет избранных объявлений</p>
      </div>
    );
  }

  // 🎯 ОСНОВНОЙ РЕНДЕР: ЕСТЬ ИЗБРАННЫЕ
  return (
    <>
      {/* Модальное окно для неавторизованных */}
      <ModalAttention 
        isOpen={isModalAttention} 
        onClose={closeModalAttention} 
      />
      
      {/* Модальное окно с деталями объявления */}
      {selectedNotice && (
        <ModalNotice
          isOpen={isModalOneFriend}
          onClose={closeModalOneFriend}
          notice={selectedNotice}
          onAdd={handleAddToFavorites}
          onRemove={handleRemoveFromFavorites}
        />
      )}

      {/* 🎯 СПИСОК ИЗБРАННЫХ ОБЪЯВЛЕНИЙ */}
      <ul className={styles.noticesList}>
        {favorites.map((notice) => (
          <li key={notice._id} className={styles.oneCard}>
            <NoticesItem
              id={notice._id}
              imgURL={notice.imgURL}
              title={notice.title}
              name={notice.name}
              birthday={notice.birthday}
              gender={notice.sex}
              species={notice.species}
              category={notice.category}
              comment={notice.comment}
              price={notice.price}
              popularity={notice.popularity}
              onOpenModal={() => handleOpenModal(notice)}
              favorites={true}
              boxFavorite={false}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default FavoritesList;