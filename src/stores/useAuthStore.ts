import { produce } from 'immer';
import { create, StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import { Token, User } from '../interfaces/AuthInterfaces';
import { decryptData, encryptData } from '../utils/cryptoUtil';

interface AuthState {
  token: Token | null;
  user: User | null;
  setUser: (user: User | null) => void;
  setToken: (token: Token | null) => void;
  logout: () => void;
}

const persistOptions: PersistOptions<AuthState> = {
  name: 'auth-storage',
  getStorage: () => localStorage,
  serialize: (state) => encryptData(state),
  deserialize: (state) => decryptData(state),
};

const stateCreator: StateCreator<AuthState, [], [], AuthState> = (set) => ({
  token: null,
  user: null,
  setUser: (user) =>
    set(produce((state: AuthState) => {
      state.user = user;
    })),
  setToken: (token) =>
    set(produce((state: AuthState) => {
      state.token = token;
    })),
  logout: () => {
    set(produce((state: AuthState) => {
      state.token = null;
      state.user = null;
    }));
    localStorage.clear();
  },
});

const useAuthStore = create<AuthState>()(
  persist(stateCreator, persistOptions)
);

export default useAuthStore;
