import FriendsItem from '../FriendsItem/FriendsItem';
import styles from './FriendsList.module.css';

const FriendsList = ({ friends = [] }) => {
  if (!friends || friends.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <p>No partners found</p>
      </div>
    );
  }

  return (
    <ul className={styles.friendsList}>
      {friends.map((friend, index) => (
        <FriendsItem key={friend._id || friend.id || index} friend={friend} />
      ))}
    </ul>
  );
};

export default FriendsList;
