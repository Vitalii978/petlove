const STORAGE_KEYS = {
  VIEWED: 'petlove_viewed',
};

const storage = {
  getViewed: () => {
    try {
      const viewed = localStorage.getItem(STORAGE_KEYS.VIEWED);
      return viewed ? JSON.parse(viewed) : [];
    } catch {
      return [];
    }
  },

  addToViewed: noticeId => {
    try {
      const viewed = storage.getViewed();

      if (!viewed.includes(noticeId)) {
        viewed.push(noticeId);
        localStorage.setItem(STORAGE_KEYS.VIEWED, JSON.stringify(viewed));
        return true;
      }

      return false;
    } catch {
      return false;
    }
  },

  clearViewed: () => {
    localStorage.removeItem(STORAGE_KEYS.VIEWED);
  },
};

export default storage;
