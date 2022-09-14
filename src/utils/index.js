import API_URLS from "./constants";

const LOCAL_STORAGE_TOKEN_KEY = "__tweet_app__";

const TOAST_CONFIG = {
  position: "top-right",
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  // theme:'dark'
};

const setItemInLocalStorage = (key, value) => {
  if (!key || !value) {
    return new console.error("setTokenInLocalStorage: key and value required");
  }
  const valueToStore =
    typeof value !== "string" ? JSON.stringify(value) : value;
  localStorage.setItem(key, valueToStore);
};

const removeItemInLocalStorage = (key) => {
  if (!key) {
    return console.error("Cannot remove item: key not found");
  }
  localStorage.removeItem(key);
};

const getItemFromLocalStorage = (key) => {
  if (!key) {
    return console.error("Cannot get item: item not key not found");
  }
  return localStorage.getItem(key);
};

export {
  API_URLS,
  LOCAL_STORAGE_TOKEN_KEY,
  TOAST_CONFIG,
  getItemFromLocalStorage,
  setItemInLocalStorage,
  removeItemInLocalStorage,
};
