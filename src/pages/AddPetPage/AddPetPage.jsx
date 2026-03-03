import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../utils/auth';
import PetBlock from '../../components/PetBlock/PetBlock';
import AddPetForm from '../../components/AddPetForm/AddPetForm';
import styles from './AddPetPage.module.css';

const AddPetPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <section className={styles.sectionAddPet}>
      <ul className={styles.addPet}>
        <li>
          <PetBlock addPet="addPet">
            <source
              srcSet="/addPets_mob_1x.png 1x, /addPets_mob_2x.png 2x"
              media="(max-width: 767px)"
            />
            <source
              srcSet="/addPets_tab_1x.png 1x, /addPets_tab_2x.png 2x"
              media="(min-width: 768px) and (max-width: 1279.5px)"
            />
            <source
              srcSet="/addPets_desk_1x.png 1x, /addPets_desk_2x.png 2x"
              media="(min-width: 1280px)"
            />
            <img src="/addPets_mob_1x.png" alt="dog" />
          </PetBlock>
        </li>

        <li className={styles.boxAddPetForm}>
          <AddPetForm />
        </li>
      </ul>
    </section>
  );
};

export default AddPetPage;
