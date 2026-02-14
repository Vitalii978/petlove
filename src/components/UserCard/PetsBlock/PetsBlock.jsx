// // src/components/UserCard/PetsBlock/PetsBlock.jsx

// // 🎯 ИМПОРТЫ
// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import api from '../../../services/api'; // ✅ Используем Axios
// import PetsList from './PetsList/PetsList';
// import styles from './PetsBlock.module.css';
// import sprite from '../../../assets/icon/icon-sprite.svg';

// // 🎯 КОМПОНЕНТ PETSBLOCK: Блок с питомцами пользователя
// // Props:
// // - pets: массив питомцев (может быть пустым)
// // - onAddPet: функция при клике на добавление питомца
// const PetsBlock = ({ pets: initialPets = [], onAddPet }) => {
//   // 🎯 СОСТОЯНИЯ КОМПОНЕНТА
//   const [pets, setPets] = useState(initialPets);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   // 🎯 ЗАГРУЗКА ПИТОМЦЕВ ПРИ МОНТИРОВАНИИ
//   useEffect(() => {
//     if (initialPets.length === 0) {
//       loadPets();
//     }
//   }, []);

//   // 🎯 ФУНКЦИЯ ЗАГРУЗКИ ПИТОМЦЕВ С API
// // 🎯 ИСПРАВЛЕННЫЙ КОД ЗАГРУЗКИ ПИТОМЦЕВ
// const loadPets = async () => {
//   try {
//     setLoading(true);
//     setError('');
    
//     console.log('🔄 Загружаем данные пользователя с питомцами...');
    
//     // 🎯 ПРАВИЛЬНО: Запрашиваем данные пользователя
//     // Питомцы приходят в поле pets ответа
//     const response = await api.get('/users/current');
    
//     console.log('✅ Данные пользователя получены:', {
//       есть_питомцы: !!response.data.pets,
//       количество_питомцев: response.data.pets?.length || 0
//     });
    
//     // 🎯 Получаем питомцев из ответа
//     const userPets = response.data.pets || [];
//     setPets(userPets);
    
//     if (userPets.length === 0) {
//       setError('No pets found in your profile');
//     }
    
//   } catch (error) {
//     console.error('❌ Ошибка при загрузке данных пользователя:', error);
    
//     // 🎯 ОБРАБОТКА ОШИБОК
//     if (error.response) {
//       if (error.response.status === 404) {
//         setError('User data not found');
//       } else if (error.response.status === 401) {
//         setError('Please log in to view pets');
//       } else {
//         setError(`Server error: ${error.response.status}`);
//       }
//     } else if (error.request) {
//       setError('No connection to server');
//     } else {
//       setError('Failed to load pets');
//     }
    
//     setPets([]);
//   } finally {
//     setLoading(false);
//   }
// };

//   // 🎯 ФУНКЦИЯ УДАЛЕНИЯ ПИТОМЦА
//  // 🎯 ИСПРАВЛЕННАЯ ФУНКЦИЯ УДАЛЕНИЯ ПИТОМЦА
// const handleDeletePet = async (petId) => {
//   try {
//     console.log('🗑️ Удаляем питомца с ID:', petId);
    
//     // 🎯 ПОДТВЕРЖДЕНИЕ УДАЛЕНИЯ
//     if (!window.confirm('Are you sure you want to delete this pet?')) {
//       return;
//     }
    
//     // 🎯 ПРАВИЛЬНЫЙ ЭНДПОИНТ ДЛЯ УДАЛЕНИЯ
//     const response = await api.delete(`/users/current/pets/remove/${petId}`);
    
//     console.log('✅ Питомец удален:', response.data);
    
//     // 🎯 ОБНОВЛЯЕМ СПИСОК БЕЗ ПЕРЕЗАГРУЗКИ
//     setPets(prevPets => prevPets.filter(pet => pet._id !== petId));
    
//     // 🎯 УВЕДОМЛЕНИЕ ОБ УСПЕХЕ
//     alert('Pet deleted successfully');
    
//   } catch (error) {
//     console.error('❌ Ошибка при удалении питомца:', error);
    
//     // 🎯 ДЕТАЛЬНАЯ ОБРАБОТКА ОШИБОК УДАЛЕНИЯ
//     let errorMessage = 'Failed to delete pet';
    
//     if (error.response) {
//       if (error.response.status === 404) {
//         errorMessage = 'Pet not found';
//       } else if (error.response.status === 409) {
//         errorMessage = 'You are not the owner of this pet';
//       } else if (error.response.status === 400) {
//         errorMessage = 'Invalid pet ID';
//       } else {
//         errorMessage = `Server error: ${error.response.status}`;
//       }
//     }
    
//     alert(errorMessage);
//   }
// };



//   // 🎯 ОБРАБОТЧИК КЛИКА НА ДОБАВЛЕНИЕ ПИТОМЦА
//   const handleAddPetClick = () => {
//     if (onAddPet) {
//       onAddPet();
//     }
//   };

//   // 🎯 РЕНДЕР КОМПОНЕНТА
//   return (
//     <section className={styles.petsBlock}>
      
//       {/* 🎯 ЗАГОЛОВОК БЛОКА */}
//       <header className={styles.blockHeader}>
//         <h3 className={styles.blockTitle}>My Pets</h3>
        
//         {/* 🎯 КНОПКА ДОБАВЛЕНИЯ ПИТОМЦА */}
//         <Link 
//           to="/add-pet" 
//           className={styles.addPetButton}
//           onClick={handleAddPetClick}
//           aria-label="Add new pet"
//         >
//           <svg className={styles.addIcon}>
//             <use href={`${sprite}#icon-plus`} />
//           </svg>
//           Add pet
//         </Link>
//       </header>

//       {/* 🎯 СОДЕРЖИМОЕ БЛОКА */}
//       <div className={styles.blockContent}>
        
//         {/* 🎯 СОСТОЯНИЕ ЗАГРУЗКИ */}
//         {loading && (
//           <div className={styles.loadingState}>
//             <div className={styles.spinner}></div>
//             <p>Loading pets...</p>
//           </div>
//         )}

//         {/* 🎯 СОСТОЯНИЕ ОШИБКИ */}
//         {error && !loading && (
//           <div className={styles.errorState}>
//             <svg className={styles.errorIcon}>
//               <use href={`${sprite}#icon-alert`} />
//             </svg>
//             <p>{error}</p>
//             <button 
//               className={styles.retryButton}
//               onClick={loadPets}
//               type="button"
//             >
//               Try again
//             </button>
//           </div>
//         )}

//         {/* 🎯 ПУСТОЙ СПИСОК ПИТОМЦЕВ */}
//         {!loading && !error && pets.length === 0 && (
//           <div className={styles.emptyState}>
//             <svg className={styles.emptyIcon}>
//               <use href={`${sprite}#icon-paw`} />
//             </svg>
//             <h4 className={styles.emptyTitle}>No pets yet</h4>
//             <p className={styles.emptyText}>
//               Add your first pet to keep track of their information
//             </p>
//             <Link 
//               to="/add-pet" 
//               className={styles.emptyAddButton}
//               onClick={handleAddPetClick}
//             >
//               Add Your First Pet
//             </Link>
//           </div>
//         )}

//         {/* 🎯 СПИСОК ПИТОМЦЕВ */}
//         {!loading && !error && pets.length > 0 && (
//           <>
//             {/* 🎯 ИНФОРМАЦИЯ О КОЛИЧЕСТВЕ */}
//             <div className={styles.petsInfo}>
//               <p className={styles.petsCount}>
//                 You have <strong>{pets.length}</strong> pet{pets.length !== 1 ? 's' : ''}
//               </p>
//             </div>
            
//             {/* 🎯 КОМПОНЕНТ СПИСКА ПИТОМЦЕВ */}
//             <PetsList 
//               pets={pets} 
//               onDeletePet={handleDeletePet}
//             />
//           </>
//         )}
//       </div>
//     </section>
//   );
// };

// export default PetsBlock;



// 📁 src/components/UserCard/PetsBlock/PetsBlock.jsx
// 🎯 ТЗ: PetsBlock містить AddPet та PetsList
// 🎯 ТЗ: Click по іконці-смітнику відкриває ModalApproveAction

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../services/api';
import PetsList from './PetsList/PetsList';
import ModalApproveAction from '../../ModalApproveAction/ModalApproveAction';
import styles from './PetsBlock.module.css';
import sprite from '../../../assets/icon/icon-sprite.svg';

const PetsBlock = ({ pets: initialPets = [], onAddPet }) => {
  // 🎯 СТАН: список пітомців
  const [pets, setPets] = useState(initialPets);
  
  // 🎯 СТАН: завантаження
  const [loading, setLoading] = useState(false);
  
  // 🎯 СТАН: помилка
  const [error, setError] = useState('');
  
  // 🎯 СТАН: модалка видалення
  const [petToDelete, setPetToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // 🎯 Завантаження пітомців з API при монтуванні
  useEffect(() => {
    if (initialPets.length === 0) {
      loadPets();
    }
  }, []);

  // 🎯 ФУНКЦІЯ: завантажити пітомців з бекенду
  const loadPets = async () => {
    try {
      setLoading(true);
      setError('');

      console.log('🔄 Завантажуємо пітомців...');

      const response = await api.get('/users/current');
      const userPets = response.data.pets || [];
      
      console.log(`✅ Завантажено ${userPets.length} пітомців`);
      setPets(userPets);
    } catch (error) {
      console.error('❌ Помилка завантаження пітомців:', error);

      if (error.response?.status === 401) {
        setError('Будь ласка, увійдіть в акаунт');
      } else {
        setError('Не вдалося завантажити пітомців');
      }
    } finally {
      setLoading(false);
    }
  };

  // 🎯 ФУНКЦІЯ: відкрити модалку підтвердження видалення
  const handleDeleteClick = (petId) => {
    console.log('🗑️ Вибрано пітомця для видалення:', petId);
    setPetToDelete(petId);
    setShowDeleteModal(true);
  };

  // 🎯 ФУНКЦІЯ: підтвердити видалення
  const handleDeleteConfirm = async () => {
    if (!petToDelete) return;

    try {
      console.log('🔄 Відправляємо запит на видалення...');

      // 🎯 DELETE запит на бекенд
      await api.delete(`/users/current/pets/remove/${petToDelete}`);

      // 🎯 Оновлюємо стан (видаляємо з масиву)
      setPets((prevPets) => prevPets.filter((pet) => pet._id !== petToDelete));

      console.log('✅ Пітомець успішно видалений');

      // 🎯 Закриваємо модалку
      setShowDeleteModal(false);
      setPetToDelete(null);
    } catch (error) {
      console.error('❌ Помилка видалення пітомця:', error);

      if (error.response?.status === 404) {
        setError('Пітомець не знайдений');
      } else if (error.response?.status === 409) {
        setError('Ви не є власником цього пітомця');
      } else {
        setError('Не вдалося видалити пітомця');
      }

      setShowDeleteModal(false);
    }
  };

  // 🎯 ФУНКЦІЯ: скасувати видалення
  const handleDeleteCancel = () => {
    console.log('❌ Видалення скасовано');
    setShowDeleteModal(false);
    setPetToDelete(null);
  };

  // 🎯 ФУНКЦІЯ: додати пітомця
  const handleAddPetClick = () => {
    if (onAddPet) {
      onAddPet();
    }
  };

  // 🎯 РЕНДЕР: стан завантаження
  if (loading) {
    return (
      <section className={styles.petsBlock}>
        <div className={styles.loadingState}>
          <div className={styles.spinner}></div>
          <p>Завантаження пітомців...</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.petsBlock}>
      {/* 🎯 ЗАГОЛОВОК БЛОКУ */}
      <header className={styles.blockHeader}>
        <h3 className={styles.blockTitle}>Мої улюбленці</h3>

        {/* 🎯 ТЗ: AddPet містить посилання на /add-pet */}
        <Link
          to="/add-pet"
          className={styles.addPetButton}
          onClick={handleAddPetClick}
          aria-label="Додати нового пітомця"
        >
          <svg className={styles.addIcon}>
            <use href={`${sprite}#icon-plus`} />
          </svg>
          Додати пітомця
        </Link>
      </header>

      {/* 🎯 ВІДОБРАЖЕННЯ ПОМИЛКИ */}
      {error && (
        <div className={styles.errorState}>
          <svg className={styles.errorIcon}>
            <use href={`${sprite}#icon-alert`} />
          </svg>
          <p>{error}</p>
          <button className={styles.retryButton} onClick={loadPets} type="button">
            Спробувати знову
          </button>
        </div>
      )}

      {/* 🎯 ПУСТИЙ СТАН - немає пітомців */}
      {!error && pets.length === 0 && (
        <div className={styles.emptyState}>
          <svg className={styles.emptyIcon}>
            <use href={`${sprite}#icon-paw`} />
          </svg>
          <h4 className={styles.emptyTitle}>Ще немає улюбленців</h4>
          <p className={styles.emptyText}>
            Додайте свого першого улюбленця, щоб відстежувати його інформацію
          </p>
          <Link to="/add-pet" className={styles.emptyAddButton} onClick={handleAddPetClick}>
            Додати першого пітомця
          </Link>
        </div>
      )}

      {/* 🎯 СПИСОК ПІТОМЦІВ */}
      {!error && pets.length > 0 && (
        <>
          <div className={styles.petsInfo}>
            <p className={styles.petsCount}>
              У вас <strong>{pets.length}</strong> пітомець
              {pets.length !== 1 ? 'ів' : ''}
            </p>
          </div>

          {/* 🎯 ТЗ: PetsList містить список пітомців */}
          <PetsList pets={pets} onDeleteClick={handleDeleteClick} />
        </>
      )}

      {/* 🎯 ТЗ: ModalApproveAction для підтвердження видалення */}
      {showDeleteModal && (
        <ModalApproveAction
          title="Видалити пітомця"
          message="Ви впевнені, що хочете видалити цього пітомця? Цю дію неможливо скасувати."
          confirmText="Так, видалити"
          cancelText="Скасувати"
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
          onClose={handleDeleteCancel}
        />
      )}
    </section>
  );
};

export default PetsBlock;