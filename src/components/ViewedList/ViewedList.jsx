// // src/components/ViewedList/ViewedList.jsx
// // 🎯 ИСПРАВЛЕНО: правильная передача onDelete и onToggleFavorite

// import React, { useState, useCallback, useEffect, useRef } from 'react';
// import useUser from '../../hooks/useUser';
// import noticesApi from '../../services/noticesApi';
// import NoticesItem from '../Notices/NoticeItem/NoticeItem';
// import ModalAttention from '../ModalAttention/ModalAttention';
// import ModalNotice from '../ModalNotice/ModalNotice';
// import styles from './ViewedList.module.css';

// const ViewedList = () => {
//   console.log('🔥 ViewedList рендерится');

//   const { viewed, refreshUser, favorites } = useUser();

//   // 🟢 ЛОКАЛЬНОЕ СОСТОЯНИЕ
//   const [localViewed, setLocalViewed] = useState(viewed);
//   const [localFavorites, setLocalFavorites] = useState(favorites);

//   // 🟢 useRef для отслеживания предыдущих значений
//   const prevViewedRef = useRef(viewed);
//   const prevFavoritesRef = useRef(favorites);

//   // 🟢 ИСПРАВЛЕННЫЙ useEffect для viewed
//   useEffect(() => {
//     const prevViewed = prevViewedRef.current;
//     const currentViewed = viewed;

//     if (prevViewed.length !== currentViewed.length) {
//       console.log('🔄 viewed изменился по длине');
//       setLocalViewed(currentViewed);
//       prevViewedRef.current = currentViewed;
//       return;
//     }

//     const prevIds = prevViewed.map(n => n._id).sort().join(',');
//     const currentIds = currentViewed.map(n => n._id).sort().join(',');

//     if (prevIds !== currentIds) {
//       console.log('🔄 viewed изменился по содержимому');
//       setLocalViewed(currentViewed);
//       prevViewedRef.current = currentViewed;
//     }
//   }, [viewed]);

//   // 🟢 ИСПРАВЛЕННЫЙ useEffect для favorites
//   useEffect(() => {
//     const prevFavorites = prevFavoritesRef.current;
//     const currentFavorites = favorites;

//     if (prevFavorites.length !== currentFavorites.length) {
//       console.log('🔄 favorites изменился по длине');
//       setLocalFavorites(currentFavorites);
//       prevFavoritesRef.current = currentFavorites;
//       return;
//     }

//     const prevIds = prevFavorites.map(f => f?._id || f).sort().join(',');
//     const currentIds = currentFavorites.map(f => f?._id || f).sort().join(',');

//     if (prevIds !== currentIds) {
//       console.log('🔄 favorites изменился по содержимому');
//       setLocalFavorites(currentFavorites);
//       prevFavoritesRef.current = currentFavorites;
//     }
//   }, [favorites]);

//   const [isModalAttention, setIsModalAttention] = useState(false);
//   const [isModalOneFriend, setIsModalOneFriend] = useState(false);
//   const [selectedNotice, setSelectedNotice] = useState(null);
//   const [processingIds, setProcessingIds] = useState(new Set());

//   const token = localStorage.getItem('token');

//   const closeModalAttention = () => setIsModalAttention(false);
//   const closeModalOneFriend = () => setIsModalOneFriend(false);

//   // 🟢 ФУНКЦИЯ ПРОВЕРКИ
//   const isNoticeFavorite = useCallback((noticeId) => {
//     if (!noticeId || !localFavorites) return false;

//     const result = localFavorites.some(fav => {
//       if (typeof fav === 'object' && fav !== null) {
//         return fav._id === noticeId;
//       }
//       return fav === noticeId;
//     });

//     console.log(`🔍 Проверка ID ${noticeId}: ${result ? 'В избранном' : 'Не в избранном'}`);
//     return result;
//   }, [localFavorites]);

//   const handleOpenModal = (notice) => {
//     console.log('🔍 Открываем модалку для:', notice.title);
//     const isFavorite = isNoticeFavorite(notice._id);
//     const noticeWithFavorite = {
//       ...notice,
//       isFavorite
//     };
//     setSelectedNotice(noticeWithFavorite);

//     if (token) {
//       setIsModalOneFriend(true);
//     } else {
//       setIsModalAttention(true);
//     }
//   };

//   // 🟢 ДОБАВЛЕНИЕ В ИЗБРАННОЕ (из модалки)
//   const handleAddToFavorites = useCallback(async (id) => {
//     console.log('➕ handleAddToFavorites для ID:', id);

//     if (processingIds.has(id)) return;

//     try {
//       setProcessingIds(prev => {
//         const newSet = new Set(prev);
//         newSet.add(id);
//         return newSet;
//       });

//       const noticeToAdd = localViewed.find(n => n._id === id);

//       if (noticeToAdd) {
//         setLocalFavorites(prev => {
//           const exists = prev.some(f => {
//             if (typeof f === 'object') return f._id === id;
//             return f === id;
//           });

//           if (exists) {
//             console.log('⚠️ Уже есть в localFavorites');
//             return prev;
//           }

//           console.log('✅ Добавляем в localFavorites:', noticeToAdd.title);
//           return [...prev, noticeToAdd];
//         });
//       }

//       const response = await noticesApi.addToFavorites(id);

//       if (response.success) {
//         console.log('✅ Успешно добавлено на сервер');
//         await refreshUser();
//         closeModalOneFriend();
//       } else {
//         console.log('❌ Ошибка сервера, откатываем');
//         setLocalFavorites(favorites);
//       }
//     } catch (error) {
//       console.error('❌ Ошибка при добавлении:', error);

//       if (error.response?.status === 409) {
//         console.log('⚠️ Уже в избранном (409)');
//         await refreshUser();
//         closeModalOneFriend();
//       } else {
//         setLocalFavorites(favorites);
//       }
//     } finally {
//       setProcessingIds(prev => {
//         const newSet = new Set(prev);
//         newSet.delete(id);
//         return newSet;
//       });
//     }
//   }, [processingIds, refreshUser, localViewed, favorites]);

//   // 🟢 УДАЛЕНИЕ ИЗ ИЗБРАННОГО (из карточки)
//   const handleDeleteFromCard = useCallback(async (id) => {
//     console.log('🗑️ handleDeleteFromCard для ID:', id);

//     if (processingIds.has(id)) return;

//     try {
//       setProcessingIds(prev => {
//         const newSet = new Set(prev);
//         newSet.add(id);
//         return newSet;
//       });

//       // 🔥 Оптимистично удаляем
//       setLocalFavorites(prev => prev.filter(item => {
//         if (typeof item === 'object') return item._id !== id;
//         return item !== id;
//       }));

//       const response = await noticesApi.removeFromFavorites(id);

//       if (response.success) {
//         console.log('✅ Успешно удалено с сервера');
//         await refreshUser();
//       } else {
//         console.log('❌ Ошибка сервера, откатываем');
//         setLocalFavorites(favorites);
//       }
//     } catch (error) {
//       console.error('❌ Ошибка при удалении из карточки:', error);

//       if (error.response?.status === 409) {
//         console.log('⚠️ Уже удалено');
//         await refreshUser();
//       } else {
//         setLocalFavorites(favorites);
//       }
//     } finally {
//       setProcessingIds(prev => {
//         const newSet = new Set(prev);
//         newSet.delete(id);
//         return newSet;
//       });
//     }
//   }, [processingIds, refreshUser, favorites]);

//   // 🟢 ДОБАВЛЕНИЕ ИЗ КАРТОЧКИ (сердечко)
//   const handleAddFromCard = useCallback(async (id) => {
//     console.log('❤️ handleAddFromCard для ID:', id);

//     if (processingIds.has(id)) return;

//     try {
//       setProcessingIds(prev => {
//         const newSet = new Set(prev);
//         newSet.add(id);
//         return newSet;
//       });

//       const noticeToAdd = localViewed.find(n => n._id === id);

//       if (noticeToAdd) {
//         setLocalFavorites(prev => {
//           const exists = prev.some(f => {
//             if (typeof f === 'object') return f._id === id;
//             return f === id;
//           });

//           if (exists) {
//             console.log('⚠️ Уже есть в localFavorites');
//             return prev;
//           }

//           console.log('✅ Добавляем в localFavorites из карточки');
//           return [...prev, noticeToAdd];
//         });
//       }

//       const response = await noticesApi.addToFavorites(id);

//       if (response.success) {
//         console.log('✅ Успешно добавлено на сервер');
//         await refreshUser();
//       } else {
//         console.log('❌ Ошибка сервера, откатываем');
//         setLocalFavorites(favorites);
//       }
//     } catch (error) {
//       console.error('❌ Ошибка при добавлении из карточки:', error);

//       if (error.response?.status === 409) {
//         console.log('⚠️ Уже в избранном (409)');
//         await refreshUser();
//       } else {
//         setLocalFavorites(favorites);
//       }
//     } finally {
//       setProcessingIds(prev => {
//         const newSet = new Set(prev);
//         newSet.delete(id);
//         return newSet;
//       });
//     }
//   }, [processingIds, refreshUser, localViewed, favorites]);

//   // 🟢 УДАЛЕНИЕ ИЗ ИЗБРАННОГО (из модалки)
//   const handleRemoveFromFavorites = useCallback(async (id) => {
//     console.log('🗑️ handleRemoveFromFavorites для ID:', id);

//     if (processingIds.has(id)) return;

//     try {
//       setProcessingIds(prev => {
//         const newSet = new Set(prev);
//         newSet.add(id);
//         return newSet;
//       });

//       setLocalFavorites(prev => prev.filter(item => {
//         if (typeof item === 'object') return item._id !== id;
//         return item !== id;
//       }));

//       const response = await noticesApi.removeFromFavorites(id);

//       if (response.success) {
//         console.log('✅ Успешно удалено с сервера');
//         await refreshUser();

//         if (selectedNotice) {
//           setSelectedNotice({
//             ...selectedNotice,
//             isFavorite: false
//           });
//         }

//         closeModalOneFriend();
//       } else {
//         setLocalFavorites(favorites);
//       }
//     } catch (error) {
//       console.error('❌ Ошибка при удалении:', error);

//       if (error.response?.status === 409) {
//         console.log('⚠️ Уже удалено');
//         await refreshUser();
//         closeModalOneFriend();
//       } else {
//         setLocalFavorites(favorites);
//       }
//     } finally {
//       setProcessingIds(prev => {
//         const newSet = new Set(prev);
//         newSet.delete(id);
//         return newSet;
//       });
//     }
//   }, [processingIds, refreshUser, selectedNotice, favorites]);

//   if (!localViewed || localViewed.length === 0) {
//     return (
//       <div className={styles.noViewed}>
//         <p className={styles.message}>
//           You haven't viewed any notices yet.
//           Browse our <a href="/notices" className={styles.link}>notices page</a> to find your perfect pet!
//         </p>
//       </div>
//     );
//   }

//   return (
//     <>
//       <ModalAttention
//         isOpen={isModalAttention}
//         onClose={closeModalAttention}
//       />

//       {selectedNotice && (
//         <ModalNotice
//           isOpen={isModalOneFriend}
//           onClose={closeModalOneFriend}
//           notice={selectedNotice}
//           onAdd={handleAddToFavorites}
//           onRemove={handleRemoveFromFavorites}
//           isFavorite={selectedNotice.isFavorite}
//         />
//       )}

//       <ul className={styles.noticesList}>
//         {localViewed.map((notice) => {
//           const isFavorite = isNoticeFavorite(notice._id);

//           return (
//             <li key={notice._id} className={styles.oneCard}>
//               <NoticesItem
//                 id={notice._id}
//                 imgURL={notice.imgURL}
//                 title={notice.title}
//                 name={notice.name}
//                 birthday={notice.birthday}
//                 gender={notice.sex}
//                 species={notice.species}
//                 category={notice.category}
//                 comment={notice.comment}
//                 price={notice.price}
//                 popularity={notice.popularity}
//                 onOpenModal={() => handleOpenModal(notice)}
//                 isFavorite={isFavorite}
//                 boxFavorite={true}
//                 // 🔥 ВАЖНО: передаем правильные функции
//                 onToggleFavorite={!isFavorite ? handleAddFromCard : undefined}
//                 onDelete={isFavorite ? handleDeleteFromCard : undefined}
//                 isDisabled={processingIds.has(notice._id)}
//               />
//             </li>
//           );
//         })}
//       </ul>
//     </>
//   );
// };

// export default ViewedList;

// src/components/ViewedList/ViewedList.jsx
// 🎯 КОМПОНЕНТ ДЛЯ ОТОБРАЖЕНИЯ ПРОСМОТРЕННЫХ ОБЪЯВЛЕНИЙ
// ✅ ИСПРАВЛЕНО: правильная передача onDelete и onToggleFavorite

import React, { useState, useCallback, useEffect, useRef } from 'react';
// useState     - для хранения локальных данных
// useCallback  - для стабильных функций
// useEffect    - для синхронизации с useUser
// useRef       - для сравнения предыдущих значений

import useUser from '../../hooks/useUser';
// useUser - дает нам viewed, favorites, refreshUser

import noticesApi from '../../services/noticesApi';
// noticesApi - для отправки запросов на сервер

import NoticesItem from '../Notices/NoticeItem/NoticeItem';
import ModalAttention from '../ModalAttention/ModalAttention';
import ModalNotice from '../ModalNotice/ModalNotice';
import styles from './ViewedList.module.css';

const ViewedList = () => {
  console.log('🔥 ViewedList рендерится');

  // 🎯 ПОЛУЧАЕМ ДАННЫЕ ИЗ ХУКА useUser
  const { viewed, refreshUser, favorites } = useUser();
  console.log('📦 viewed из useUser:', viewed?.length || 0, 'элементов');
  console.log('📦 favorites из useUser:', favorites?.length || 0, 'элементов');

  // 🟢 ЛОКАЛЬНОЕ СОСТОЯНИЕ для мгновенного обновления
  const [localViewed, setLocalViewed] = useState(viewed);
  const [localFavorites, setLocalFavorites] = useState(favorites);

  // 🟢 useRef для отслеживания предыдущих значений
  const prevViewedRef = useRef(viewed);
  const prevFavoritesRef = useRef(favorites);

  // 🟢 СОСТОЯНИЯ ДЛЯ МОДАЛЬНЫХ ОКОН
  const [isModalAttention, setIsModalAttention] = useState(false);
  const [isModalOneFriend, setIsModalOneFriend] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);

  // 🟢 СОСТОЯНИЕ ДЛЯ БЛОКИРОВКИ КНОПОК
  const [processingIds, setProcessingIds] = useState(new Set());

  const token = localStorage.getItem('token');

  const closeModalAttention = () => setIsModalAttention(false);
  const closeModalOneFriend = () => setIsModalOneFriend(false);

  // =============== 🟢 СИНХРОНИЗАЦИЯ С useUser (viewed) ===============
  useEffect(() => {
    const prevViewed = prevViewedRef.current;
    const currentViewed = viewed;

    if (prevViewed.length !== currentViewed.length) {
      console.log('🔄 viewed изменился по длине');
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
      console.log('🔄 viewed изменился по содержимому');
      setLocalViewed(currentViewed);
      prevViewedRef.current = currentViewed;
    }
  }, [viewed]);

  // =============== 🟢 СИНХРОНИЗАЦИЯ С useUser (favorites) ===============
  useEffect(() => {
    const prevFavorites = prevFavoritesRef.current;
    const currentFavorites = favorites;

    if (prevFavorites.length !== currentFavorites.length) {
      console.log('🔄 favorites изменился по длине');
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
      console.log('🔄 favorites изменился по содержимому');
      setLocalFavorites(currentFavorites);
      prevFavoritesRef.current = currentFavorites;
    }
  }, [favorites]);

  // =============== 🟢 ФУНКЦИЯ ПРОВЕРКИ: В ИЗБРАННОМ ЛИ ОБЪЯВЛЕНИЕ ===============
  const isNoticeFavorite = useCallback(
    noticeId => {
      if (!noticeId || !localFavorites) return false;

      const result = localFavorites.some(fav => {
        if (typeof fav === 'object' && fav !== null) {
          return fav._id === noticeId;
        }
        return fav === noticeId;
      });

      console.log(
        `🔍 Проверка ID ${noticeId}: ${result ? 'В избранном' : 'Не в избранном'}`
      );
      return result;
    },
    [localFavorites]
  ); // 👈 ВАЖНО: зависимость от localFavorites!

  // =============== 🟢 ОБРАБОТЧИК ОТКРЫТИЯ МОДАЛКИ ===============
  const handleOpenModal = notice => {
    console.log('🔍 Открываем модалку для:', notice.title);
    const isFavorite = isNoticeFavorite(notice._id);
    const noticeWithFavorite = {
      ...notice,
      isFavorite,
    };
    setSelectedNotice(noticeWithFavorite);

    if (token) {
      setIsModalOneFriend(true);
    } else {
      setIsModalAttention(true);
    }
  };

  // =============== 🟢 ДОБАВЛЕНИЕ В ИЗБРАННОЕ (из модалки) ===============
  const handleAddToFavorites = useCallback(
    async id => {
      console.log('➕ handleAddToFavorites для ID:', id);

      if (processingIds.has(id)) return;

      try {
        setProcessingIds(prev => {
          const newSet = new Set(prev);
          newSet.add(id);
          return newSet;
        });

        // Находим объявление в localViewed
        const noticeToAdd = localViewed.find(n => n._id === id);

        // 🔥 ОПТИМИСТИЧНОЕ ДОБАВЛЕНИЕ - добавляем в localFavorites СРАЗУ!
        if (noticeToAdd) {
          setLocalFavorites(prev => {
            // Проверяем, нет ли уже такого ID
            const exists = prev.some(f => {
              if (typeof f === 'object') return f._id === id;
              return f === id;
            });

            if (exists) {
              console.log('⚠️ Уже есть в localFavorites');
              return prev;
            }

            console.log('✅ Добавляем в localFavorites:', noticeToAdd.title);
            return [...prev, noticeToAdd];
          });
        }

        const response = await noticesApi.addToFavorites(id);

        if (response.success) {
          console.log('✅ Успешно добавлено на сервер');
          await refreshUser();
          closeModalOneFriend();
        } else {
          console.log('❌ Ошибка сервера, откатываем');
          setLocalFavorites(favorites);
        }
      } catch (error) {
        console.error('❌ Ошибка при добавлении:', error);

        if (error.response?.status === 409) {
          console.log('⚠️ Уже в избранном (409)');
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

  // =============== 🟢 ДОБАВЛЕНИЕ ИЗ КАРТОЧКИ (сердечко) ===============
  const handleAddFromCard = useCallback(
    async id => {
      console.log('❤️ handleAddFromCard для ID:', id);

      if (processingIds.has(id)) return;

      try {
        setProcessingIds(prev => {
          const newSet = new Set(prev);
          newSet.add(id);
          return newSet;
        });

        const noticeToAdd = localViewed.find(n => n._id === id);

        // 🔥 ОПТИМИСТИЧНОЕ ДОБАВЛЕНИЕ
        if (noticeToAdd) {
          setLocalFavorites(prev => {
            const exists = prev.some(f => {
              if (typeof f === 'object') return f._id === id;
              return f === id;
            });

            if (exists) {
              console.log('⚠️ Уже есть в localFavorites');
              return prev;
            }

            console.log('✅ Добавляем в localFavorites из карточки');
            return [...prev, noticeToAdd];
          });
        }

        const response = await noticesApi.addToFavorites(id);

        if (response.success) {
          console.log('✅ Успешно добавлено на сервер');
          await refreshUser();
        } else {
          console.log('❌ Ошибка сервера, откатываем');
          setLocalFavorites(favorites);
        }
      } catch (error) {
        console.error('❌ Ошибка при добавлении из карточки:', error);

        if (error.response?.status === 409) {
          console.log('⚠️ Уже в избранном (409)');
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

  // =============== 🟢 УДАЛЕНИЕ ИЗ ИЗБРАННОГО (из карточки) ===============
  const handleDeleteFromCard = useCallback(
    async id => {
      console.log('🗑️ handleDeleteFromCard для ID:', id);

      if (processingIds.has(id)) return;

      try {
        setProcessingIds(prev => {
          const newSet = new Set(prev);
          newSet.add(id);
          return newSet;
        });

        // 🔥 ОПТИМИСТИЧНОЕ УДАЛЕНИЕ
        setLocalFavorites(prev =>
          prev.filter(item => {
            if (typeof item === 'object') return item._id !== id;
            return item !== id;
          })
        );

        const response = await noticesApi.removeFromFavorites(id);

        if (response.success) {
          console.log('✅ Успешно удалено с сервера');
          await refreshUser();
        } else {
          console.log('❌ Ошибка сервера, откатываем');
          setLocalFavorites(favorites);
        }
      } catch (error) {
        console.error('❌ Ошибка при удалении из карточки:', error);

        if (error.response?.status === 409) {
          console.log('⚠️ Уже удалено');
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

  // =============== 🟢 УДАЛЕНИЕ ИЗ ИЗБРАННОГО (из модалки) ===============
  const handleRemoveFromFavorites = useCallback(
    async id => {
      console.log('🗑️ handleRemoveFromFavorites для ID:', id);

      if (processingIds.has(id)) return;

      try {
        setProcessingIds(prev => {
          const newSet = new Set(prev);
          newSet.add(id);
          return newSet;
        });

        setLocalFavorites(prev =>
          prev.filter(item => {
            if (typeof item === 'object') return item._id !== id;
            return item !== id;
          })
        );

        const response = await noticesApi.removeFromFavorites(id);

        if (response.success) {
          console.log('✅ Успешно удалено с сервера');
          await refreshUser();

          if (selectedNotice) {
            setSelectedNotice({
              ...selectedNotice,
              isFavorite: false,
            });
          }

          closeModalOneFriend();
        } else {
          setLocalFavorites(favorites);
        }
      } catch (error) {
        console.error('❌ Ошибка при удалении:', error);

        if (error.response?.status === 409) {
          console.log('⚠️ Уже удалено');
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

  // =============== 🟢 СОСТОЯНИЕ: НЕТ ПРОСМОТРЕННЫХ ===============
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

  // =============== 🟢 ОСНОВНОЙ РЕНДЕР ===============
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
                // 🔥 ВАЖНО: правильные функции в зависимости от состояния
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
