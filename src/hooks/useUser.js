import { useState, useEffect, useCallback, useMemo } from 'react';
import { getCurrentUser } from '../utils/auth';
import noticesApi from '../services/noticesApi';
import storage from '../utils/storage';

const useUser = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [viewedIds, setViewedIds] = useState([]);
  const [allNotices, setAllNotices] = useState([]);
  const [isMounted, setIsMounted] = useState(true);

  const loadUser = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setCurrentUser(null);
      return;
    }

    setIsLoading(true);

    try {
      const userResponse = await getCurrentUser();

      if (userResponse.success && isMounted) {
        const newUser = {
          ...userResponse.user,
          noticesFavorites: userResponse.user.noticesFavorites
            ? [...userResponse.user.noticesFavorites]
            : [],
        };

        setCurrentUser(newUser);

        const storedViewedIds = storage.getViewed();
        setViewedIds(storedViewedIds);

        const noticesResponse = await noticesApi.getNotices({ limit: 100 });
        if (noticesResponse.success && isMounted) {
          setAllNotices(noticesResponse.data);
        }
      }
    } catch (error) {
      console.error('❌ Ошибка в useUser:', error);
    } finally {
      if (isMounted) {
        setIsLoading(false);
      }
    }
  }, [isMounted]);

  useEffect(() => {
    return () => {
      setIsMounted(false);
      setCurrentUser(null);
      setAllNotices([]);
      setViewedIds([]);
    };
  }, []);

  const addToViewed = noticeId => {
    const added = storage.addToViewed(noticeId);
    if (added) {
      setViewedIds(storage.getViewed());
    }
    return added;
  };

  const getViewedNotices = useCallback(() => {
    if (!viewedIds.length || !allNotices.length) return [];
    return allNotices.filter(notice => viewedIds.includes(notice._id));
  }, [viewedIds, allNotices]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const favorites = useMemo(() => {
    if (!currentUser?.noticesFavorites) {
      return [];
    }
    return [...currentUser.noticesFavorites];
  }, [currentUser?.noticesFavorites]);

  return {
    currentUser,
    isLoading,
    favorites,
    viewed: getViewedNotices(),
    viewedIds,
    addToViewed,
    refreshUser: loadUser,
  };
};

export default useUser;
