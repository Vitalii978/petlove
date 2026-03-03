import { useState, useEffect, useCallback } from 'react';
import Title from '../../components/Title/Title';
import FriendsList from '../../components/Friends/FriendsList/FriendsList';
import friendsApi from '../../services/friendsApi';
import styles from './FriendsPage.module.css';

export const FriendsPage = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFriends = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await friendsApi.getFriends();

      if (result.success) {
        if (!result.data || !Array.isArray(result.data)) {
          setFriends([]);
          setError('Invalid data received from server');
        } else {
          const validData = result.data.filter(item => item !== null);
          setFriends(validData);
        }
      } else {
        setError(result.error);
        setFriends([]);
      }
    } catch {
      setError('An error occurred while loading');
      setFriends([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFriends();
  }, [fetchFriends]);

  const handleRetry = () => {
    fetchFriends();
  };

  return (
    <section className={styles.page}>
      <Title children="Our friends" />

      {loading && (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading our partners...</p>
        </div>
      )}

      {error && !loading && (
        <div className={styles.error}>
          <p>{error}</p>
          <button
            className={styles.retryButton}
            onClick={handleRetry}
            type="button"
          >
            Try again
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          <FriendsList friends={friends} />
        </>
      )}

      {!loading && !error && friends.length === 0 && (
        <div className={styles.empty}>
          <p>No partners found at the moment</p>
          <p className={styles.emptySubtext}>
            Please check back later or contact us to become a partner
          </p>
        </div>
      )}
    </section>
  );
};

export default FriendsPage;
