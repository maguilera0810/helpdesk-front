import { produce } from 'immer';
import { create, StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import { IAuthState } from '../interfaces/StateInterfaces';
import { decryptData, encryptData } from '../utils/cryptoUtil';


const persistOptions: PersistOptions<IAuthState> = {
  name: 'auth-storage',
  getStorage: () => localStorage,
  serialize: encryptData,
  deserialize: decryptData,
};

const stateCreator: StateCreator<IAuthState, [], [], IAuthState> = (set) => ({
  user: null,
  token: null,
  setUser: (user) =>
    set(produce((state: IAuthState) => {
      state.user = user;
    })),
  setToken: (token) =>
    set(produce((state: IAuthState) => {
      state.token = token;
    })),
  logout: () => {
    set(produce((state: IAuthState) => {
      state.token = null;
      state.user = null;
    }));
    localStorage.clear();
  },
});

const useAuthStore = create<IAuthState>()(
  persist(stateCreator, persistOptions)
);

export default useAuthStore;
