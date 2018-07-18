// NOTE: the value will ALWAYS be a string if you read from an item.
// Therefore: Don't try to save booleans. Write strings.
const set = (key, value) => localStorage.setItem(key, value);

// NOTE: the value will ALWAYS be a string if you read from an item.
const get = key => localStorage.getItem(key);

const remove = key => localStorage.removeItem(key);

const setInSession = (key, value) => sessionStorage.setItem(key, value);

const getFromSession = key => sessionStorage.getItem(key);

const removeFromSession = key => sessionStorage.removeItem(key);

// type 'localStorage' or 'sessionStorage'
const isStorageAvailable = (type) => {
  let storage;
  try {
    storage = window[type];
    const test = 'test';
    storage.setItem(test, test);
    storage.removeItem(test);
    return true;
  } catch (e) {
    return (e instanceof DOMException) && (
      e.name === 'QuotaExceededError' ||
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      storage.length !== 0;
  }
};

export {
  isStorageAvailable,
  set,
  get,
  remove,
  setInSession,
  getFromSession,
  removeFromSession,
};
