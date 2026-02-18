// // src/utils/storage.js

// /**
//  * 📦 УТИЛИТА ДЛЯ РАБОТЫ С LOCALSTORAGE
//  * Хранит ID просмотренных объявлений
//  */

// const STORAGE_KEYS = {
//   VIEWED: 'petlove_viewed'
// };

// const storage = {

//   // ========== ПРОСМОТРЕННЫЕ ==========

//   /**
//    * Получить все ID просмотренных объявлений
//    * @returns {Array} массив ID
//    */
//   getViewed: () => {
//     try {
//       const viewed = localStorage.getItem(STORAGE_KEYS.VIEWED);
//       console.log('📦 storage.getViewed:', viewed ? JSON.parse(viewed) : []);
//       return viewed ? JSON.parse(viewed) : [];
//     } catch (error) {
//       console.error('Ошибка при получении просмотренных:', error);
//       return [];
//     }
//   },

//   /**
//    * Добавить ID в просмотренные
//    * @param {string} noticeId - ID объявления
//    * @returns {boolean} успешно ли добавлено
//    */
//   addToViewed: (noticeId) => {
//     try {
//       const viewed = storage.getViewed();
//       if (!viewed.includes(noticeId)) {
//         viewed.push(noticeId);
//         localStorage.setItem(STORAGE_KEYS.VIEWED, JSON.stringify(viewed));
//         return true;
//       }
//       return false;
//     } catch (error) {
//       console.error('Ошибка при добавлении в просмотренные:', error);
//       return false;
//     }
//   },

//   /**
//    * Очистить все просмотренные
//    */
//   clearViewed: () => {
//     localStorage.removeItem(STORAGE_KEYS.VIEWED);
//   }
// };

// export default storage;

// // src/utils/storage.js    15.02

// /**
//  * 📦 УТИЛИТА ДЛЯ РАБОТЫ С LOCALSTORAGE
//  * Хранит ID просмотренных объявлений
//  */

// const STORAGE_KEYS = {
//   VIEWED: 'petlove_viewed'
// };

// const storage = {

//   // ========== ПРОСМОТРЕННЫЕ ==========

//   /**
//    * Получить все ID просмотренных объявлений
//    * @returns {Array} массив ID
//    */
//   getViewed: () => {
//     try {
//       const viewed = localStorage.getItem(STORAGE_KEYS.VIEWED);
//       console.log('📦 storage.getViewed:', viewed ? JSON.parse(viewed) : []);
//       return viewed ? JSON.parse(viewed) : [];
//     } catch (error) {
//       console.error('Ошибка при получении просмотренных:', error);
//       return [];
//     }
//   },

//   /**
//    * Добавить ID в просмотренные
//    * @param {string} noticeId - ID объявления
//    * @returns {boolean} успешно ли добавлено
//    */
//   addToViewed: (noticeId) => {
//     try {
//       const viewed = storage.getViewed();
//       if (!viewed.includes(noticeId)) {
//         viewed.push(noticeId);
//         localStorage.setItem(STORAGE_KEYS.VIEWED, JSON.stringify(viewed));
//         console.log('📦 storage.addToViewed: добавлен', noticeId);
//         return true;
//       }
//       console.log('📦 storage.addToViewed: уже есть', noticeId);
//       return false;
//     } catch (error) {
//       console.error('Ошибка при добавлении в просмотренные:', error);
//       return false;
//     }
//   },

//   /**
//    * Очистить все просмотренные
//    */
//   clearViewed: () => {
//     localStorage.removeItem(STORAGE_KEYS.VIEWED);
//     console.log('📦 storage.clearViewed: очищено');
//   }
// };

// export default storage;

// src/utils/storage.js
// 🎯 ЭТО НАШ "СЕЙФ" ДЛЯ ЛОКАЛЬНЫХ ДАННЫХ
// localStorage - это как карман в рюкзаке, данные не пропадают даже после закрытия браузера

/**
 * 📦 УТИЛИТА ДЛЯ РАБОТЫ С LOCALSTORAGE
 * Хранит ID просмотренных объявлений
 */

// 🎯 КЛЮЧИ ДЛЯ ХРАНЕНИЯ (как названия папок в шкафу)
const STORAGE_KEYS = {
  VIEWED: 'petlove_viewed', // Ключ для просмотренных объявлений
};

// 🎯 ОБЪЕКТ С МЕТОДАМИ ДЛЯ РАБОТЫ С ХРАНИЛИЩЕМ
const storage = {
  // ========== ПРОСМОТРЕННЫЕ ==========

  /**
   * Получить все ID просмотренных объявлений
   * @returns {Array} массив ID
   */
  getViewed: () => {
    try {
      // Пытаемся достать данные из localStorage
      const viewed = localStorage.getItem(STORAGE_KEYS.VIEWED);
      console.log('📦 storage.getViewed:', viewed ? JSON.parse(viewed) : []);

      // Если данные есть - парсим JSON, если нет - возвращаем пустой массив
      return viewed ? JSON.parse(viewed) : [];
    } catch (error) {
      // Если что-то пошло не так (например, испорчен JSON)
      console.error('Ошибка при получении просмотренных:', error);
      return [];
    }
  },

  /**
   * Добавить ID в просмотренные
   * @param {string} noticeId - ID объявления
   * @returns {boolean} успешно ли добавлено
   */
  addToViewed: noticeId => {
    try {
      // 🎯 ШАГ 1: Получаем текущий список просмотренных
      const viewed = storage.getViewed();

      // 🎯 ШАГ 2: Проверяем, нет ли уже такого ID
      if (!viewed.includes(noticeId)) {
        // 🎯 ШАГ 3: Добавляем новый ID в конец массива
        viewed.push(noticeId);

        // 🎯 ШАГ 4: Сохраняем обратно в localStorage
        // JSON.stringify - превращает массив в строку (localStorage хранит только строки)
        localStorage.setItem(STORAGE_KEYS.VIEWED, JSON.stringify(viewed));

        console.log('📦 storage.addToViewed: добавлен', noticeId);
        return true; // Успешно добавили
      }

      console.log('📦 storage.addToViewed: уже есть', noticeId);
      return false; // Уже было в списке
    } catch (error) {
      console.error('Ошибка при добавлении в просмотренные:', error);
      return false;
    }
  },

  /**
   * Очистить все просмотренные
   */
  clearViewed: () => {
    localStorage.removeItem(STORAGE_KEYS.VIEWED);
    console.log('📦 storage.clearViewed: очищено');
  },
};

export default storage;
