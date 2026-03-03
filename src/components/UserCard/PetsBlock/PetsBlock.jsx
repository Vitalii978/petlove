import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../services/api';
import PetsList from './PetsList/PetsList';
import styles from './PetsBlock.module.css';

import toast from 'react-hot-toast';

const PetsBlock = ({ pets: initialPets = [], onAddPet }) => {
  const [pets, setPets] = useState(initialPets);

  useEffect(() => {
    if (initialPets.length > 0) {
      setPets(initialPets);
    } else {
      loadPets();
    }
  }, [initialPets]);

  const loadPets = async () => {
    try {
      const response = await api.get('/users/current/full');
      setPets(response.data.pets || []);
    } catch {
      // console.error('❌ Ошибка загрузки:', error);
    } finally {
      // setLoading(false);
    }
  };

  const handleDeletePet = async petId => {
    try {
      if (!window.confirm('Are you sure you want to delete this pet?')) return;
      await api.delete(`/users/current/pets/remove/${petId}`);
      setPets(prevPets => prevPets.filter(pet => pet._id !== petId));

      toast.success('✅ Pet deleted successfully', {
        duration: 3000,
      });
    } catch {
      // console.error('❌ Ошибка при удалении питомца:', error);
    }
  };

  return (
    <ul className={styles.petsBlock}>
      <li className={styles.petsHeader}>
        <h2 className={styles.title}>My pets</h2>
        <Link to="/add-pet" className={styles.addPetLink} onClick={onAddPet}>
          Add pet +
        </Link>
      </li>

      <li>
        <PetsList pets={pets} onDeletePet={handleDeletePet} />
      </li>
    </ul>
  );
};

export default PetsBlock;
