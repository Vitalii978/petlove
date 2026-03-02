import { useState } from 'react';
import sprite from '../../../assets/icon/icon-sprite.svg';
import ModalEditUser from '../../ModalEditUser/ModalEditUser';
import styles from './EditUserBtn.module.css';
import toast from 'react-hot-toast';

const EditUserBtn = ({ user, onUpdate }) => {
  const [showModal, setShowModal] = useState(false);

  const handleEditClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleUpdate = updatedUser => {
    onUpdate(updatedUser);
    toast.success('✅ Profile updated successfully', {
      duration: 3000,
    });
  };

  return (
    <>
      <ul className={styles.editUserBtn}>
        <li className={styles.nameIconWrapper}>
          <p className={styles.userName}>{user.name || 'User'}</p>
          <svg className={styles.userIcon}>
            <use href={`${sprite}#icon-user-white`} />
          </svg>
        </li>
        <li>
          <button
            className={styles.editButton}
            onClick={handleEditClick}
            type="button"
            aria-label="Edit profile information"
          >
            <svg width={18} height={18}>
              <use href={`${sprite}#icon-pencil`} />
            </svg>
          </button>
        </li>
      </ul>

      {showModal && (
        <ModalEditUser
          user={user}
          onSave={handleUpdate}
          onClose={handleModalClose}
        />
      )}
    </>
  );
};

export default EditUserBtn;
