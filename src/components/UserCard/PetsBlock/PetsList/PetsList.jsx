// // src/components/UserCard/PetsBlock/PetsList/PetsList.jsx

// import PetsItem from '../PetsItem/PetsItem';
// import styles from './PetsList.module.css';

// const PetsList = ({ pets = [], onDeletePet }) => {
  
//   if (!pets || pets.length === 0) {
//     return (
//       <div className={styles.emptyList}>
//         <p className={styles.emptyText}>No pets to display</p>
//       </div>
//     );
//   }

//   return (
//     <ul 
//       className={styles.petsList} 
//       role="list"
//       aria-label="List of user's pets"
//     >
      
//       {pets.map((pet, index) => (
//         // 🎯 ИСПРАВЛЕНО: используем index вместо Date.now()
//         <li 
//           key={pet._id || `pet-${index}-${pet.name}`} 
//           className={styles.petsListItem}
//         >
          
//           <PetsItem 
//             pet={pet} 
//             onDelete={() => onDeletePet(pet._id)}
//           />
          
//         </li>
//       ))}
      
//     </ul>
//   );
// };

// export default PetsList;




// 📁 src/components/UserCard/PetsBlock/PetsList/PetsList.jsx
// 🎯 СПИСОК ПИТОМЦЕВ - ПОЛНАЯ ВЕРСИЯ

import PetsItem from '../PetsItem/PetsItem';
import styles from './PetsList.module.css';

const PetsList = ({ pets = [], onDeletePet }) => {
  
  console.log('📋 PetsList получил питомцев:', pets);
  console.log('🗑️ onDeletePet есть?', !!onDeletePet);
  
  if (!pets || pets.length === 0) {
    return (
      <div className={styles.emptyList}>
        <p className={styles.emptyText}>No pets to display</p>
      </div>
    );
  }

  return (
    <ul className={styles.petsList} role="list" aria-label="List of user's pets">
      
      {pets.map((pet, index) => (
        <li key={pet._id || `pet-${index}`} className={styles.petsListItem}>
          {/* ✅ ПЕРЕДАЕМ onDeletePet ДАЛЬШЕ */}
          <PetsItem 
            pet={pet} 
            onDelete={() => {
              console.log('🖱️ Клик по удалению для:', pet.name);
              if (typeof onDeletePet === 'function') {
                onDeletePet(pet._id);
              } else {
                console.error('❌ onDeletePet не функция!');
              }
            }}
          />
        </li>
      ))}
      
    </ul>
  );
};

export default PetsList;