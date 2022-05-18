const utils = {
  setLocalStorage: (key, data) => localStorage.setItem(key, data),
  getLocalStorage: (key) => localStorage.getItem(key),
  removeLocalStorage: (key) => localStorage.removeItem(key),
  getImg:(name) => process.env.PUBLIC_URL + `/images/${name}`
}
export default utils;