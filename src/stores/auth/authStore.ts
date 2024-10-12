import { produce } from 'immer';
import { StateCreator } from 'zustand';
import { IAuthState } from '../../interfaces/StateInterfaces';
import storeCreator from '../storeCreator';

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

const storageName = 'auth-storage';
export default storeCreator(stateCreator, storageName);
