import { useState } from 'react';
import sprite from '../../../assets/icon/icon-sprite.svg';
import { uploadPhotoToCloudinary } from '../../../utils/cloudinary';
import styles from './UserBlock.module.css';

const UserBlock = ({ user, onUpdate }) => {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(user.avatar || '');

  const { name = 'User', email = 'No email', phone = 'Not specified' } = user;

  const formatPhone = phoneNumber => {
    if (!phoneNumber || phoneNumber === 'Not specified') return 'Not specified';
    const digits = phoneNumber.replace(/\D/g, '');
    if (digits.length === 12 && digits.startsWith('38')) {
      return `+${digits.slice(0, 2)} (${digits.slice(2, 5)}) ${digits.slice(5, 8)}-${digits.slice(8, 10)}-${digits.slice(10, 12)}`;
    }
    return phoneNumber;
  };

  const handleFileChange = async e => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);

      const localUrl = URL.createObjectURL(file);
      setPreviewUrl(localUrl);

      const imageUrl = await uploadPhotoToCloudinary(file);

      if (onUpdate) {
        onUpdate({ ...user, avatar: imageUrl });
      }
    } catch (error) {
      console.error('❌ Ошибка загрузки фото:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <ul className={styles.userBlock}>
      <li className={styles.imgIcon}>
        {previewUrl ? (
          <img src={previewUrl} alt={name} className={styles.imgUser} />
        ) : (
          <div className={styles.boxIcon}>
            <svg className={styles.iconUser}>
              <use href={`${sprite}#icon-user`} />
            </svg>

            <input
              type="file"
              id="avatar-upload"
              accept="image/*"
              className={styles.fileInput}
              onChange={handleFileChange}
              disabled={uploading}
            />

            <label htmlFor="avatar-upload" className={styles.buttonImg}>
              {uploading ? 'Uploading...' : 'Upload photo'}
            </label>
          </div>
        )}
      </li>

      <h2 className={styles.title}>My information</h2>

      <li className={styles.boxInput}>
        <input
          type="text"
          defaultValue={name}
          className={styles.input}
          readOnly
        />

        <input
          type="text"
          defaultValue={email}
          className={styles.input}
          readOnly
        />

        <input
          type="text"
          defaultValue={formatPhone(phone)}
          className={styles.input}
          readOnly
        />
      </li>
    </ul>
  );
};

export default UserBlock;
