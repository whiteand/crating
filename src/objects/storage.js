
const getFromLocalStorage = key => localStorage.getItem(key);

export const storage = {
  getItem(key) {
    const fromLocalStorage = getFromLocalStorage(key);
    return fromLocalStorage;
  },
  setItem(key, value) {
    window.localStorage.setItem(key, value);
  }
};
