// 📁 src/components/UserCard/PetsBlock/PetsList/PetsList.jsx

import PetsItem from '../PetsItem/PetsItem';
import styles from './PetsList.module.css';

const PetsList = ({ pets = [], onDeletePet }) => {
  if (!pets || pets.length === 0) return null;

  return (
    <ul className={styles.petsList}>
      {pets.map(pet => (
        <li key={pet._id} className={styles.petCard}>
          <PetsItem pet={pet} onDelete={() => onDeletePet(pet._id)} />
        </li>
      ))}
    </ul>
  );
};

export default PetsList;
