// // 📁 src/components/UserCard/PetsBlock/PetsBlock.jsx
// // 🎯 ТЗ: PetsBlock містить AddPet та PetsList
// // 🎯 ТЗ: Click по іконці-смітнику відкриває ModalApproveAction

// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import api from '../../../services/api';
// import PetsList from './PetsList/PetsList';
// import ModalApproveAction from '../../ModalApproveAction/ModalApproveAction';
// import styles from './PetsBlock.module.css';
// import sprite from '../../../assets/icon/icon-sprite.svg';

// const PetsBlock = ({ pets: initialPets = [], onAddPet }) => {
//   // 🎯 СТАН: список пітомців
//   const [pets, setPets] = useState(initialPets);
  
//   // 🎯 СТАН: завантаження
//   const [loading, setLoading] = useState(false);
  
//   // 🎯 СТАН: помилка
//   const [error, setError] = useState('');
  
//   // 🎯 СТАН: модалка видалення
//   const [petToDelete, setPetToDelete] = useState(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);

//   // 🎯 Завантаження пітомців з API при монтуванні
//   useEffect(() => {
//     if (initialPets.length === 0) {
//       loadPets();
//     }
//   }, []);

//   // 🎯 ФУНКЦІЯ: завантажити пітомців з бекенду
//   const loadPets = async () => {
//     try {
//       setLoading(true);
//       setError('');

//       console.log('🔄 Завантажуємо пітомців...');

//       const response = await api.get('/users/current');
//       const userPets = response.data.pets || [];
      
//       console.log(`✅ Завантажено ${userPets.length} пітомців`);
//       setPets(userPets);
//     } catch (error) {
//       console.error('❌ Помилка завантаження пітомців:', error);

//       if (error.response?.status === 401) {
//         setError('Будь ласка, увійдіть в акаунт');
//       } else {
//         setError('Не вдалося завантажити пітомців');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🎯 ФУНКЦІЯ: відкрити модалку підтвердження видалення
//   const handleDeleteClick = (petId) => {
//     console.log('🗑️ Вибрано пітомця для видалення:', petId);
//     setPetToDelete(petId);
//     setShowDeleteModal(true);
//   };

//   // 🎯 ФУНКЦІЯ: підтвердити видалення
//   const handleDeleteConfirm = async () => {
//     if (!petToDelete) return;

//     try {
//       console.log('🔄 Відправляємо запит на видалення...');

//       // 🎯 DELETE запит на бекенд
//       await api.delete(`/users/current/pets/remove/${petToDelete}`);

//       // 🎯 Оновлюємо стан (видаляємо з масиву)
//       setPets((prevPets) => prevPets.filter((pet) => pet._id !== petToDelete));

//       console.log('✅ Пітомець успішно видалений');

//       // 🎯 Закриваємо модалку
//       setShowDeleteModal(false);
//       setPetToDelete(null);
//     } catch (error) {
//       console.error('❌ Помилка видалення пітомця:', error);

//       if (error.response?.status === 404) {
//         setError('Пітомець не знайдений');
//       } else if (error.response?.status === 409) {
//         setError('Ви не є власником цього пітомця');
//       } else {
//         setError('Не вдалося видалити пітомця');
//       }

//       setShowDeleteModal(false);
//     }
//   };

//   // 🎯 ФУНКЦІЯ: скасувати видалення
//   const handleDeleteCancel = () => {
//     console.log('❌ Видалення скасовано');
//     setShowDeleteModal(false);
//     setPetToDelete(null);
//   };

//   // 🎯 ФУНКЦІЯ: додати пітомця
//   const handleAddPetClick = () => {
//     if (onAddPet) {
//       onAddPet();
//     }
//   };

//   // 🎯 РЕНДЕР: стан завантаження
//   if (loading) {
//     return (
//       <section className={styles.petsBlock}>
//         <div className={styles.loadingState}>
//           <div className={styles.spinner}></div>
//           <p>Завантаження пітомців...</p>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className={styles.petsBlock}>
//       {/* 🎯 ЗАГОЛОВОК БЛОКУ */}
//       <header className={styles.blockHeader}>
//         <h3 className={styles.blockTitle}>Мої улюбленці</h3>

//         {/* 🎯 ТЗ: AddPet містить посилання на /add-pet */}
//         <Link
//           to="/add-pet"
//           className={styles.addPetButton}
//           onClick={handleAddPetClick}
//           aria-label="Додати нового пітомця"
//         >
//           <svg className={styles.addIcon}>
//             <use href={`${sprite}#icon-plus`} />
//           </svg>
//           Додати пітомця
//         </Link>
//       </header>

//       {/* 🎯 ВІДОБРАЖЕННЯ ПОМИЛКИ */}
//       {error && (
//         <div className={styles.errorState}>
//           <svg className={styles.errorIcon}>
//             <use href={`${sprite}#icon-alert`} />
//           </svg>
//           <p>{error}</p>
//           <button className={styles.retryButton} onClick={loadPets} type="button">
//             Спробувати знову
//           </button>
//         </div>
//       )}

//       {/* 🎯 ПУСТИЙ СТАН - немає пітомців */}
//       {!error && pets.length === 0 && (
//         <div className={styles.emptyState}>
//           <svg className={styles.emptyIcon}>
//             <use href={`${sprite}#icon-paw`} />
//           </svg>
//           <h4 className={styles.emptyTitle}>Ще немає улюбленців</h4>
//           <p className={styles.emptyText}>
//             Додайте свого першого улюбленця, щоб відстежувати його інформацію
//           </p>
//           <Link to="/add-pet" className={styles.emptyAddButton} onClick={handleAddPetClick}>
//             Додати першого пітомця
//           </Link>
//         </div>
//       )}

//       {/* 🎯 СПИСОК ПІТОМЦІВ */}
//       {!error && pets.length > 0 && (
//         <>
//           <div className={styles.petsInfo}>
//             <p className={styles.petsCount}>
//               У вас <strong>{pets.length}</strong> пітомець
//               {pets.length !== 1 ? 'ів' : ''}
//             </p>
//           </div>

//           {/* 🎯 ТЗ: PetsList містить список пітомців */}
//           <PetsList pets={pets} onDeleteClick={handleDeleteClick} />
//         </>
//       )}

//       {/* 🎯 ТЗ: ModalApproveAction для підтвердження видалення */}
//       {showDeleteModal && (
//         <ModalApproveAction
//           title="Видалити пітомця"
//           message="Ви впевнені, що хочете видалити цього пітомця? Цю дію неможливо скасувати."
//           confirmText="Так, видалити"
//           cancelText="Скасувати"
//           onConfirm={handleDeleteConfirm}
//           onCancel={handleDeleteCancel}
//           onClose={handleDeleteCancel}
//         />
//       )}
//     </section>
//   );
// };

// export default PetsBlock;





// 📁 src/components/UserCard/PetsBlock/PetsBlock.jsx
// 🎯 БЛОК С ПИТОМЦАМИ - ПОЛНАЯ ВЕРСИЯ

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../services/api';
import PetsList from './PetsList/PetsList';
import styles from './PetsBlock.module.css';
import sprite from '../../../assets/icon/icon-sprite.svg';

const PetsBlock = ({ pets: initialPets = [], onAddPet }) => {
  const [pets, setPets] = useState(initialPets);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  console.log('🐕 PetsBlock получил питомцев:', initialPets);
  console.log('➕ onAddPet есть?', !!onAddPet);

  // Загружаем питомцев если они не пришли через пропсы
  useEffect(() => {
    if (initialPets.length > 0) {
      console.log('✅ Используем питомцев из пропсов');
      setPets(initialPets);
    } else {
      console.log('🔄 Питомцев нет в пропсах, загружаем с сервера');
      loadPets();
    }
  }, [initialPets]);

  // Загрузка питомцев с сервера
  const loadPets = async () => {
    try {
      setLoading(true);
      setError('');
      
      console.log('🔄 Загружаем питомцев с сервера...');
      const response = await api.get('/users/current/full');
      
      console.log('✅ Данные получены:', response.data);
      const userPets = response.data.pets || [];
      console.log('🐕 Питомцы загружены:', userPets);
      
      setPets(userPets);
      
    } catch (error) {
      console.error('❌ Ошибка загрузки:', error);
      setError('Failed to load pets');
    } finally {
      setLoading(false);
    }
  };

  // ✅ ФУНКЦИЯ УДАЛЕНИЯ ПИТОМЦА
  const handleDeletePet = async (petId) => {
    try {
      console.log('🗑️ Удаляем питомца с ID:', petId);
      
      if (!window.confirm('Are you sure you want to delete this pet?')) {
        return;
      }
      
      const response = await api.delete(`/users/current/pets/remove/${petId}`);
      
      console.log('✅ Питомец удален:', response.data);
      
      // Обновляем список, убирая удаленного питомца
      setPets(prevPets => prevPets.filter(pet => pet._id !== petId));
      
      alert('Pet deleted successfully');
      
    } catch (error) {
      console.error('❌ Ошибка при удалении питомца:', error);
      alert('Failed to delete pet');
    }
  };

  const handleAddPetClick = () => {
    if (onAddPet) {
      onAddPet();
    }
  };

  return (
    <section className={styles.petsBlock}>
      
      <header className={styles.blockHeader}>
        <h3 className={styles.blockTitle}>My Pets</h3>
        
        <Link 
          to="/add-pet" 
          className={styles.addPetButton}
          onClick={handleAddPetClick}
          aria-label="Add new pet"
        >
          <svg className={styles.addIcon}>
            <use href={`${sprite}#icon-plus`} />
          </svg>
          Add pet
        </Link>
      </header>

      <div className={styles.blockContent}>
        
        {loading && (
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            <p>Loading pets...</p>
          </div>
        )}

        {error && !loading && (
          <div className={styles.errorState}>
            <p>{error}</p>
            <button 
              className={styles.retryButton}
              onClick={loadPets}
              type="button"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && pets.length === 0 && (
          <div className={styles.emptyState}>
            <svg className={styles.emptyIcon}>
              <use href={`${sprite}#icon-paw`} />
            </svg>
            <h4 className={styles.emptyTitle}>No pets yet</h4>
            <p className={styles.emptyText}>
              Add your first pet to keep track of their information
            </p>
            <Link 
              to="/add-pet" 
              className={styles.emptyAddButton}
              onClick={handleAddPetClick}
            >
              Add Your First Pet
            </Link>
          </div>
        )}

        {!loading && !error && pets.length > 0 && (
          <>
            <div className={styles.petsInfo}>
              <p className={styles.petsCount}>
                You have <strong>{pets.length}</strong> pet{pets.length !== 1 ? 's' : ''}
              </p>
            </div>
            
            {/* ✅ ПЕРЕДАЕМ handleDeletePet ВНИЗ */}
            <PetsList 
              pets={pets} 
              onDeletePet={handleDeletePet}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default PetsBlock;