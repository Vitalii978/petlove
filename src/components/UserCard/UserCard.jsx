import { useState } from 'react';
import EditUserBtn from './EditUserBtn/EditUserBtn';
import UserBlock from './UserBlock/UserBlock';
import PetsBlock from './PetsBlock/PetsBlock';
import LogOutBtn from '../LogOutBtn/LogOutBtn';
import styles from './UserCard.module.css';

const UserCard = ({ userData, onUserUpdate, onAddPet, onLogout }) => {
  const [user, setUser] = useState(userData);

  const handleUserUpdate = updatedUser => {
    setUser(updatedUser);
    if (onUserUpdate) {
      onUserUpdate(updatedUser);
    }
  };

  const handleAddPet = () => {
    if (onAddPet) {
      onAddPet();
    }
  };

  return (
    <ul className={styles.userCard}>
      <li>
        <EditUserBtn user={user} onUpdate={handleUserUpdate} />
        <UserBlock user={user} onUpdate={handleUserUpdate} />
      </li>

      <li>
        <PetsBlock pets={user?.pets || []} onAddPet={handleAddPet} />
      </li>

      <li>
        <LogOutBtn
          onLogout={onLogout}
          outsideTheHeader={true}
          isHomePage={false}
          location="userCard"
        />
      </li>
    </ul>
  );
};

export default UserCard;
