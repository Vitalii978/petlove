import React, { useState, useCallback, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import useUser from '../../hooks/useUser';
import noticesApi from '../../services/noticesApi';
import NoticesItem from '../Notices/NoticeItem/NoticeItem';
import ModalAttention from '../ModalAttention/ModalAttention';
import ModalNotice from '../ModalNotice/ModalNotice';
import styles from './ViewedList.module.css';

const ViewedList = () => {
  const { viewed, refreshUser, favorites } = useUser();

  const [localViewed, setLocalViewed] = useState(viewed);
  const [localFavorites, setLocalFavorites] = useState(favorites);

  const prevViewedRef = useRef(viewed);
  const prevFavoritesRef = useRef(favorites);

  const [isModalAttention, setIsModalAttention] = useState(false);
  const [isModalOneFriend, setIsModalOneFriend] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);

  const [processingIds, setProcessingIds] = useState(new Set());

  const token = localStorage.getItem('token');

  const closeModalAttention = () => setIsModalAttention(false);
  const closeModalOneFriend = () => setIsModalOneFriend(false);

  useEffect(() => {
    const prevViewed = prevViewedRef.current;
    const currentViewed = viewed;

    if (prevViewed.length !== currentViewed.length) {
      setLocalViewed(currentViewed);
      prevViewedRef.current = currentViewed;
      return;
    }

    const prevIds = prevViewed
      .map(n => n._id)
      .sort()
      .join(',');
    const currentIds = currentViewed
      .map(n => n._id)
      .sort()
      .join(',');

    if (prevIds !== currentIds) {
      setLocalViewed(currentViewed);
      prevViewedRef.current = currentViewed;
    }
  }, [viewed]);

  useEffect(() => {
    const prevFavorites = prevFavoritesRef.current;
    const currentFavorites = favorites;

    if (prevFavorites.length !== currentFavorites.length) {
      setLocalFavorites(currentFavorites);
      prevFavoritesRef.current = currentFavorites;
      return;
    }

    const prevIds = prevFavorites
      .map(f => f?._id || f)
      .sort()
      .join(',');
    const currentIds = currentFavorites
      .map(f => f?._id || f)
      .sort()
      .join(',');

    if (prevIds !== currentIds) {
      setLocalFavorites(currentFavorites);
      prevFavoritesRef.current = currentFavorites;
    }
  }, [favorites]);

  const isNoticeFavorite = useCallback(
    noticeId => {
      if (!noticeId || !localFavorites) return false;

      return localFavorites.some(fav => {
        if (typeof fav === 'object' && fav !== null) {
          return fav._id === noticeId;
        }
        return fav === noticeId;
      });
    },
    [localFavorites]
  );

  const handleOpenModal = notice => {
    const isFavorite = isNoticeFavorite(notice._id);
    setSelectedNotice({ ...notice, isFavorite });

    if (token) {
      setIsModalOneFriend(true);
    } else {
      setIsModalAttention(true);
    }
  };

  const handleAddToFavorites = useCallback(
    async id => {
      if (processingIds.has(id)) return;

      try {
        setProcessingIds(prev => new Set(prev).add(id));

        const noticeToAdd = localViewed.find(n => n._id === id);

        if (noticeToAdd) {
          setLocalFavorites(prev => {
            const exists = prev.some(f => {
              if (typeof f === 'object') return f._id === id;
              return f === id;
            });
            if (exists) return prev;
            return [...prev, noticeToAdd];
          });
        }

        const response = await noticesApi.addToFavorites(id);

        if (response.success) {
          toast.success(`✅ Added to favorites`, { duration: 3000 });
          await refreshUser();
          closeModalOneFriend();
        } else {
          setLocalFavorites(favorites);
        }
      } catch (error) {
        if (error.response?.status === 409) {
          await refreshUser();
          closeModalOneFriend();
        } else {
          setLocalFavorites(favorites);
        }
      } finally {
        setProcessingIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      }
    },
    [processingIds, refreshUser, localViewed, favorites]
  );

  const handleAddFromCard = useCallback(
    async id => {
      if (processingIds.has(id)) return;

      try {
        setProcessingIds(prev => new Set(prev).add(id));

        const noticeToAdd = localViewed.find(n => n._id === id);

        if (noticeToAdd) {
          setLocalFavorites(prev => {
            const exists = prev.some(f => {
              if (typeof f === 'object') return f._id === id;
              return f === id;
            });
            if (exists) return prev;
            return [...prev, noticeToAdd];
          });
        }

        const response = await noticesApi.addToFavorites(id);

        if (response.success) {
          toast.success(`✅ Added to favorites`, { duration: 3000 });
          await refreshUser();
        } else {
          setLocalFavorites(favorites);
        }
      } catch (error) {
        if (error.response?.status === 409) {
          await refreshUser();
        } else {
          setLocalFavorites(favorites);
        }
      } finally {
        setProcessingIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      }
    },
    [processingIds, refreshUser, localViewed, favorites]
  );

  const handleDeleteFromCard = useCallback(
    async id => {
      if (processingIds.has(id)) return;

      try {
        setProcessingIds(prev => new Set(prev).add(id));

        setLocalFavorites(prev =>
          prev.filter(item => {
            if (typeof item === 'object') return item._id !== id;
            return item !== id;
          })
        );

        const response = await noticesApi.removeFromFavorites(id);

        toast.success(`✅ Removed from favorites`, { duration: 3000 });

        if (response.success) {
          await refreshUser();
        } else {
          setLocalFavorites(favorites);
        }
      } catch (error) {
        if (error.response?.status === 409) {
          await refreshUser();
        } else {
          setLocalFavorites(favorites);
        }
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

  const handleRemoveFromFavorites = useCallback(
    async id => {
      if (processingIds.has(id)) return;

      try {
        setProcessingIds(prev => new Set(prev).add(id));

        setLocalFavorites(prev =>
          prev.filter(item => {
            if (typeof item === 'object') return item._id !== id;
            return item !== id;
          })
        );

        const response = await noticesApi.removeFromFavorites(id);

        if (response.success) {
          toast.success(`✅ Removed from favorites`, { duration: 3000 });
          await refreshUser();

          if (selectedNotice) {
            setSelectedNotice({ ...selectedNotice, isFavorite: false });
          }

          closeModalOneFriend();
        } else {
          setLocalFavorites(favorites);
        }
      } catch (error) {
        if (error.response?.status === 409) {
          await refreshUser();
          closeModalOneFriend();
        } else {
          setLocalFavorites(favorites);
        }
      } finally {
        setProcessingIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      }
    },
    [processingIds, refreshUser, selectedNotice, favorites]
  );

  if (!localViewed || localViewed.length === 0) {
    return (
      <div className={styles.noViewed}>
        <p className={styles.message}>
          You haven't viewed any notices yet. Browse our{' '}
          <a href="/notices" className={styles.link}>
            notices page
          </a>{' '}
          to find your perfect pet!
        </p>
      </div>
    );
  }

  return (
    <>
      <ModalAttention isOpen={isModalAttention} onClose={closeModalAttention} />

      {selectedNotice && (
        <ModalNotice
          isOpen={isModalOneFriend}
          onClose={closeModalOneFriend}
          notice={selectedNotice}
          onAdd={handleAddToFavorites}
          onRemove={handleRemoveFromFavorites}
          isFavorite={selectedNotice.isFavorite}
        />
      )}

      <ul className={styles.noticesList}>
        {localViewed.map(notice => {
          const isFavorite = isNoticeFavorite(notice._id);

          return (
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
                isFavorite={isFavorite}
                boxFavorite={true}
                onToggleFavorite={!isFavorite ? handleAddFromCard : undefined}
                onDelete={isFavorite ? handleDeleteFromCard : undefined}
                isDisabled={processingIds.has(notice._id)}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ViewedList;
