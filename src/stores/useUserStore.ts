import { produce } from 'immer';
import { create, StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import { IUserState } from '../interfaces/StateInterfaces';
import { decryptData, encryptData } from '../utils/cryptoUtil';


const persistOptions: PersistOptions<IUserState> = {
  name: 'auth-storage',
  getStorage: () => localStorage,
  serialize: encryptData,
  deserialize: decryptData,
};

const stateCreator: StateCreator<IUserState, [], [], IUserState> = (set) => ({
  user: null,
  users: [],
  setUser: (user) =>
    set(produce((state: IUserState) => {
      state.user = user;
    })),
  setUsers: (users) =>
    set(produce((state: IUserState) => {
      state.users = users;
    })),
});

const useUserStore = create<IUserState>()(
  persist(stateCreator, persistOptions)
);

export default useUserStore;
