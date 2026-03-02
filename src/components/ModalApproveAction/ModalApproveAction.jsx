import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ModalApproveAction.module.css';
import sprite from '../../assets/icon/icon-sprite.svg';
import authApi from '../../services/authApi';

const ModalApproveAction = ({
  isOpen,
  onClose,
  title = 'Already leaving?',
  confirmText = 'Yes',
  cancelText = 'Cancel',
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleEscape = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleLogout = async () => {
    try {
      setLoading(true);
      setError('');

      await authApi.logout();

      localStorage.removeItem('token');

      onClose();
      navigate('/');
      window.location.reload();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to logout');

      localStorage.removeItem('token');
      onClose();
      navigate('/');
      window.location.reload();
    } finally {
      setLoading(false);
    }
  };

  const handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={styles.modal}>
        <button
          onClick={onClose}
          className={styles.closeButton}
          disabled={loading}
          aria-label="Close modal"
        >
          <svg className={styles.closeIcon} width={24} height={24}>
            <use href={`${sprite}#icon-close`} />
          </svg>
        </button>

        <div className={styles.modalApproveAction}>
          <div className={styles.imageWrapper}>
            <img src="/🐈.png" alt="cat" className={styles.catImage} />
          </div>

          <h2 className={styles.title} id="modal-title">
            {title}
          </h2>

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.buttonsWrapper}>
            <button
              type="button"
              onClick={handleLogout}
              className={styles.confirmButton}
              disabled={loading}
            >
              {loading ? 'Loading...' : confirmText}
            </button>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
              disabled={loading}
            >
              {cancelText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalApproveAction;
