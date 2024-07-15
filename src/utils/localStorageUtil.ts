import { encryptData, decryptData } from './cryptoUtil';

export const saveToLocalStorage = (key: string, value: any, isSecure: boolean = false) => {
  const currVValue = isSecure ? encryptData(value) : JSON.stringify(value);
  localStorage.setItem(key, currVValue);
};

export const loadFromLocalStorage = (key: string, isSecure: boolean = false) => {
  if (typeof window !== 'undefined') {
    const currVValue = localStorage.getItem(key);
    if (currVValue) {
      return isSecure ? decryptData(currVValue) : JSON.parse(currVValue);
    }
  }
  return null;
};