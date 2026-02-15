// // src/components/ViewedList/ViewedList.jsx

// import React, { useState } from 'react';
// import useUser from '../../hooks/useUser'; // 👈 ИЗМЕНИТЬ ИМПОРТ
// import noticesApi from '../../services/noticesApi';
// import NoticesItem from '../Notices/NoticeItem/NoticeItem';
// import ModalAttention from '../ModalAttention/ModalAttention';
// import ModalNotice from '../ModalNotice/ModalNotice';
// import styles from './ViewedList.module.css';

// const ViewedList = () => {
//   const { viewed, refreshUser } = useUser(); // 👈 ТЕПЕРЬ ИЗ ХУКА
  
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
//       console.error('Ошибка добавления в избранное:', error);
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
//       console.error('Ошибка удаления из избранного:', error);
//     }
//   };

//   if (!viewed || viewed.length === 0) {
//     return (
//       <div className={styles.noViewed}>
//         <p className={styles.message}>
//           You haven't viewed any notices yet. 
//           Browse our <a href="/notices" className={styles.link}>notices page</a> to find your perfect pet!
//         </p>
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

//       <ul className={styles.noticesList}>
//         {viewed.map((notice) => (
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
//       </ul>
//     </>
//   );
// };

// export default ViewedList;



// // src/components/ViewedList/ViewedList.jsx 15.02

// import React, { useState } from 'react';
// import useUser from '../../hooks/useUser'; // 👈 ИЗМЕНИТЬ ИМПОРТ
// import noticesApi from '../../services/noticesApi';
// import NoticesItem from '../Notices/NoticeItem/NoticeItem';
// import ModalAttention from '../ModalAttention/ModalAttention';
// import ModalNotice from '../ModalNotice/ModalNotice';
// import styles from './ViewedList.module.css';

// const ViewedList = () => {
// console.log('🔥 ViewedList: компонент рендерится');

//   const { viewed, refreshUser } = useUser(); // 👈 ТЕПЕРЬ ИЗ ХУКА
  
  
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
//       console.error('Ошибка добавления в избранное:', error);
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
//       console.error('Ошибка удаления из избранного:', error);
//     }
//   };

//   if (!viewed || viewed.length === 0) {
//     return (
//       <div className={styles.noViewed}>
//         <p className={styles.message}>
//           You haven't viewed any notices yet. 
//           Browse our <a href="/notices" className={styles.link}>notices page</a> to find your perfect pet!
//         </p>
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

//       <ul className={styles.noticesList}>
//         {viewed.map((notice) => (
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
//       </ul>
//     </>
//   );
// };

// export default ViewedList;



// src/components/ViewedList/ViewedList.jsx
// 🎯 КОМПОНЕНТ ДЛЯ ОТОБРАЖЕНИЯ ПРОСМОТРЕННЫХ ОБЪЯВЛЕНИЙ

import React, { useState } from 'react';
import useUser from '../../hooks/useUser';      // Дает нам viewed
import noticesApi from '../../services/noticesApi';
import NoticesItem from '../Notices/NoticeItem/NoticeItem';
import ModalAttention from '../ModalAttention/ModalAttention';
import ModalNotice from '../ModalNotice/ModalNotice';
import styles from './ViewedList.module.css';

const ViewedList = () => {
  // 🎯 ПОЛУЧАЕМ viewed ИЗ ХУКА useUser
  const { viewed, refreshUser } = useUser();
  
  // 🎯 СОСТОЯНИЯ ДЛЯ МОДАЛЬНЫХ ОКОН (как в FavoritesList)
  const [isModalAttention, setIsModalAttention] = useState(false);
  const [isModalOneFriend, setIsModalOneFriend] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);

  const token = localStorage.getItem('token');

  const closeModalAttention = () => setIsModalAttention(false);
  const closeModalOneFriend = () => setIsModalOneFriend(false);

  // 🎯 ОБРАБОТЧИК ОТКРЫТИЯ МОДАЛКИ
  const handleOpenModal = (notice) => {
    setSelectedNotice(notice);
    if (token) {
      setIsModalOneFriend(true);
    } else {
      setIsModalAttention(true);
    }
  };

  // 🎯 ДОБАВЛЕНИЕ В ИЗБРАННОЕ (из просмотренных)
  const handleAddToFavorites = async (id) => {
    try {
      const response = await noticesApi.addToFavorites(id);
      if (response.success) {
        // 🎯 ВАЖНО: Обновляем данные - карточка появится в избранном
        await refreshUser();
        closeModalOneFriend();
      }
    } catch (error) {
      console.error('Ошибка добавления в избранное:', error);
    }
  };

  // 🎯 УДАЛЕНИЕ ИЗ ИЗБРАННОГО
  const handleRemoveFromFavorites = async (id) => {
    try {
      const response = await noticesApi.removeFromFavorites(id);
      if (response.success) {
        await refreshUser();
        closeModalOneFriend();
      }
    } catch (error) {
      console.error('Ошибка удаления из избранного:', error);
    }
  };

  // 🎯 СОСТОЯНИЕ: НЕТ ПРОСМОТРЕННЫХ
  if (!viewed || viewed.length === 0) {
    return (
      <div className={styles.noViewed}>
        <p className={styles.message}>
          You haven't viewed any notices yet. 
          Browse our <a href="/notices" className={styles.link}>notices page</a> to find your perfect pet!
        </p>
      </div>
    );
  }

  // 🎯 ОСНОВНОЙ РЕНДЕР: ЕСТЬ ПРОСМОТРЕННЫЕ
  return (
    <>
      <ModalAttention 
        isOpen={isModalAttention} 
        onClose={closeModalAttention} 
      />
      
      {selectedNotice && (
        <ModalNotice
          isOpen={isModalOneFriend}
          onClose={closeModalOneFriend}
          notice={selectedNotice}
          onAdd={handleAddToFavorites}
          onRemove={handleRemoveFromFavorites}
        />
      )}

      {/* 🎯 СПИСОК ПРОСМОТРЕННЫХ ОБЪЯВЛЕНИЙ */}
      <ul className={styles.noticesList}>
        {viewed.map((notice) => (
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

export default ViewedList;