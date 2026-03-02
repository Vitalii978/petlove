import React, { useState, useCallback, useEffect, useRef } from 'react';
import useUser from '../../hooks/useUser';
import toast from 'react-hot-toast';
import noticesApi from '../../services/noticesApi';
import NoticesItem from '../Notices/NoticeItem/NoticeItem';
import ModalAttention from '../ModalAttention/ModalAttention';
import ModalNotice from '../ModalNotice/ModalNotice';
import styles from './FavoritesList.module.css';

const FavoritesList = () => {
  const { favorites, refreshUser } = useUser();

  const [localFavorites, setLocalFavorites] = useState(favorites);
  const prevFavoritesRef = useRef(favorites);

  const [isModalAttention, setIsModalAttention] = useState(false);
  const [isModalOneFriend, setIsModalOneFriend] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [processingIds, setProcessingIds] = useState(new Set());

  const token = localStorage.getItem('token');

  const closeModalAttention = () => setIsModalAttention(false);
  const closeModalOneFriend = () => setIsModalOneFriend(false);

  useEffect(() => {
    const prevFavorites = prevFavoritesRef.current;
    const currentFavorites = favorites;

    if (prevFavorites.length !== currentFavorites.length) {
      setLocalFavorites(currentFavorites);
      prevFavoritesRef.current = currentFavorites;
      return;
    }

    const prevIds = prevFavorites
      .map(f => f._id)
      .sort()
      .join(',');
    const currentIds = currentFavorites
      .map(f => f._id)
      .sort()
      .join(',');

    if (prevIds !== currentIds) {
      setLocalFavorites(currentFavorites);
      prevFavoritesRef.current = currentFavorites;
    }
  }, [favorites]);

  const handleOpenModal = notice => {
    const noticeWithFavorite = { ...notice, isFavorite: true };
    setSelectedNotice(noticeWithFavorite);

    if (token) {
      setIsModalOneFriend(true);
    } else {
      setIsModalAttention(true);
    }
  };

  const handleRemoveFromFavorites = useCallback(
    async id => {
      if (processingIds.has(id)) return;

      try {
        setProcessingIds(prev => {
          const newSet = new Set(prev);
          newSet.add(id);
          return newSet;
        });

        setLocalFavorites(prev => prev.filter(item => item._id !== id));

        const response = await noticesApi.removeFromFavorites(id);

        if (response.success) {
          toast.success(`✅ Removed from favorites`, { duration: 3000 });
          await refreshUser();
          closeModalOneFriend();
        } else {
          setLocalFavorites(favorites);
        }
      } catch {
        setLocalFavorites(favorites);
      } finally {
        setProcessingIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      }
    },
    [processingIds, refreshUser, favorites]
  );

  const handleDeleteFromCard = useCallback(
    async id => {
      if (processingIds.has(id)) return;

      try {
        setProcessingIds(prev => {
          const newSet = new Set(prev);
          newSet.add(id);
          return newSet;
        });

        setLocalFavorites(prev => prev.filter(item => item._id !== id));

        const response = await noticesApi.removeFromFavorites(id);

        if (response.success) {
          toast.success(`✅ Removed from favorites`, { duration: 3000 });
          await refreshUser();
        } else {
          setLocalFavorites(favorites);
        }
      } catch {
        setLocalFavorites(favorites);
      } finally {
        setProcessingIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      }
    },
    [processingIds, refreshUser, favorites]
  );

  if (!localFavorites || localFavorites.length === 0) {
    return (
      <p className={styles.noFavorites}>
        Oops,{' '}
        <span className={styles.colorNoFavorites}>
          looks like there aren't any furries
        </span>{' '}
        on our adorable page yet. Do not worry! View your pets on the "find your
        favorite pet" page and add them to your favorites.
      </p>
    );
  }

  return (
    <div className="favorites-page">
      <ModalAttention isOpen={isModalAttention} onClose={closeModalAttention} />
      {selectedNotice && (
        <ModalNotice
          isOpen={isModalOneFriend}
          onClose={closeModalOneFriend}
          notice={selectedNotice}
          onAdd={handleRemoveFromFavorites}
          onRemove={handleRemoveFromFavorites}
          isFavorite={true}
        />
      )}
      <ul className={styles.noticesList}>
        {localFavorites.map(notice => (
          <li key={notice._id} className={styles.oneCard}>
            <NoticesItem
              id={notice._id}
              imgURL={notice.imgURL}
              title={notice.title}
              name={notice.name}
              birthday={notice.birthday}
              gender={notice.sex}
              species={notice.species}
              category={notice.category}
              comment={notice.comment}
              price={notice.price}
              popularity={notice.popularity}
              onOpenModal={() => handleOpenModal(notice)}
              isFavorite={true}
              boxFavorite={true}
              onDelete={handleDeleteFromCard}
              isDisabled={processingIds.has(notice._id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesList;
