import { atom } from 'recoil';
import { User, Token } from '../interfaces/AuthInterfaces';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/localStorageUtil';

export const authTokenState = atom<Token | null>({
  key: 'authTokenState',
  default: loadFromLocalStorage('authTokenState', true),
  effects: [
    ({ onSet }) => {
      onSet(newValue => {
        saveToLocalStorage('authTokenState', newValue, true);
      });
    },
  ],
});

export const userState = atom<User | null>({
  key: 'userState',
  default: loadFromLocalStorage('userState', true),
  effects: [
    ({ onSet }) => {
      onSet(newValue => {
        saveToLocalStorage('userState', newValue, true);
      });
    },
  ],
});
