// // src/pages/ProfilePage/ProfilePage.jsx
// // 🎯 ВИПРАВЛЕНО: прибрали зайвий Outlet

// import { useState, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// // ✅ МЕНЯЕМ ИМПОРТ - добавляем getCurrentUserFull!
// import { getCurrentUserFull, logout } from '../../utils/auth';  // ← ИЗМЕНИЛОСЬ!
// import Title from '../../components/Title/Title';
// import UserCard from '../../components/UserCard/UserCard';
// import MyNotices from '../../components/MyNotices/MyNotices';
// import styles from './ProfilePage.module.css';

// const ProfilePage = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [activeTab, setActiveTab] = useState('favorites');

//   const loadUserData = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError('');

//       console.log('🔄 Загружаем ПОЛНЫЕ данные профиля с питомцами...');

//       // ✅ МЕНЯЕМ ВЫЗОВ - используем getCurrentUserFull вместо getCurrentUser!
//       const result = await getCurrentUserFull();  // ← ИЗМЕНИЛОСЬ!

//       if (result.success) {
//         console.log('✅ Данные пользователя загружены:', {
//           имя: result.user.name,
//           email: result.user.email,
//           питомцев: result.user.pets?.length || 0  // ← ТЕПЕРЬ ЗДЕСЬ БУДУТ ПИТОМЦЫ!
//         });

//         // 🟢 Проверяем, есть ли питомцы
//         if (result.user.pets && result.user.pets.length > 0) {
//           console.log('🐕 СПИСОК ПИТОМЦЕВ:', result.user.pets);
//         } else {
//           console.log('🐕 У пользователя пока нет питомцев');
//         }

//         setUser(result.user);
//       } else {
//         setError(result.error || 'Failed to load profile');
//         setUser(null);
//       }
//     } catch (error) {
//       console.error('❌ Ошибка при загрузке профиля:', error);
//       setError('Something went wrong. Please try again.');
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     loadUserData();
//   }, [loadUserData]);

//   const handleUserUpdate = (updatedUser) => {
//     setUser(updatedUser);
//     console.log('✅ Профиль обновлен:', updatedUser.name);
//   };

//   const handleAddPet = () => {
//     navigate('/add-pet');
//   };

//   const handleLogout = async () => {
//     try {
//       await logout();
//       console.log('✅ Пользователь вышел из системы');
//       navigate('/');
//       window.location.reload();
//     } catch (error) {
//       console.error('❌ Ошибка при выходе:', error);
//     }
//   };

//   const handleRetry = () => {
//     loadUserData();
//   };

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//   };

//   if (loading) {
//     return (
//       <section className={styles.page}>
//         <div className={styles.container}>
//           <div className={styles.loadingState}>
//             <div className={styles.spinner}></div>
//             <p className={styles.loadingText}>Loading your profile...</p>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (error) {
//     return (
//       <section className={styles.page}>
//         <div className={styles.container}>
//           <Title text="My Profile" />
//           <div className={styles.errorState}>
//             <h3 className={styles.errorTitle}>Unable to load profile</h3>
//             <p className={styles.errorText}>{error}</p>
//             <button
//               className={styles.retryButton}
//               onClick={handleRetry}
//               type="button"
//             >
//               Try Again
//             </button>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (!user) {
//     return (
//       <section className={styles.page}>
//         <div className={styles.container}>
//           <Title text="My Profile" />
//           <div className={styles.emptyState}>
//             <h3 className={styles.emptyTitle}>No profile data</h3>
//             <p className={styles.emptyText}>
//               Please log in to view your profile
//             </p>
//             <button
//               className={styles.loginButton}
//               onClick={() => navigate('/login')}
//               type="button"
//             >
//               Go to Login
//             </button>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className={styles.page}>
//       <div className={styles.container}>

//         <Title text="My Profile" />

//         <div className={styles.profileContent}>

//           <UserCard
//             userData={user}  // ← В user УЖЕ ЕСТЬ pets!
//             onUserUpdate={handleUserUpdate}
//             onAddPet={handleAddPet}
//             onLogout={handleLogout}
//           />

//           <MyNotices
//             activeTab={activeTab}
//             onTabChange={handleTabChange}
//             userId={user._id}
//           />

//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProfilePage;

// 📁 src/pages/ProfilePage/ProfilePage.jsx
// 🎯 СТРАНИЦА ПРОФИЛЯ - ПОЛНАЯ ВЕРСИЯ

import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUserFull, logout } from '../../utils/auth';
import Title from '../../components/Title/Title';
import UserCard from '../../components/UserCard/UserCard';
import MyNotices from '../../components/MyNotices/MyNotices';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('favorites');

  const loadUserData = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      console.log('🔄 Загружаем ПОЛНЫЕ данные профиля...');

      const result = await getCurrentUserFull();

      if (result.success) {
        console.log('✅ Данные пользователя загружены:', {
          имя: result.user.name,
          питомцев: result.user.pets?.length || 0,
        });

        if (result.user.pets && result.user.pets.length > 0) {
          console.log('🐕 СПИСОК ПИТОМЦЕВ:', result.user.pets);
        }

        setUser(result.user);
      } else {
        setError(result.error || 'Failed to load profile');
        setUser(null);
      }
    } catch (error) {
      console.error('❌ Ошибка:', error);
      setError('Something went wrong');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  const handleUserUpdate = updatedUser => {
    setUser(updatedUser);
  };

  const handleAddPet = () => {
    navigate('/add-pet');
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error('❌ Ошибка:', error);
    }
  };

  const handleRetry = () => {
    loadUserData();
  };

  const handleTabChange = tab => {
    setActiveTab(tab);
  };

  if (loading) {
    return (
      <section className={styles.page}>
        <div className={styles.container}>
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            <p className={styles.loadingText}>Loading your profile...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.page}>
        <div className={styles.container}>
          <Title text="My Profile" />
          <div className={styles.errorState}>
            <h3 className={styles.errorTitle}>Unable to load profile</h3>
            <p className={styles.errorText}>{error}</p>
            <button
              className={styles.retryButton}
              onClick={handleRetry}
              type="button"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (!user) {
    return (
      <section className={styles.page}>
        <div className={styles.container}>
          <Title text="My Profile" />
          <div className={styles.emptyState}>
            <h3 className={styles.emptyTitle}>No profile data</h3>
            <p className={styles.emptyText}>
              Please log in to view your profile
            </p>
            <button
              className={styles.loginButton}
              onClick={() => navigate('/login')}
              type="button"
            >
              Go to Login
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <Title text="My Profile" />

        <div className={styles.profileContent}>
          <UserCard
            userData={user}
            onUserUpdate={handleUserUpdate}
            onAddPet={handleAddPet}
            onLogout={handleLogout}
          />

          <MyNotices
            activeTab={activeTab}
            onTabChange={handleTabChange}
            userId={user._id}
          />
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
