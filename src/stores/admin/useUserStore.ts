import { produce } from 'immer';
import { StateCreator } from 'zustand';
import { IUserState } from '../../interfaces/StateInterfaces';
import storeCreator from '../core/storeCreator';

const stateCreator: StateCreator<IUserState, [], [], IUserState> = (set) => ({
  user: null,
  users: [],
  lightUsers: [],
  setUser: (user) =>
    set(produce((state: IUserState) => {
      state.user = user;
    })),
  setUsers: (users) =>
    set(produce((state: IUserState) => {
      state.users = users;
    })),
  setLightUsers: (lightUsers) =>
    set(produce((state: IUserState) => {
      state.lightUsers = lightUsers;
    })),
});

const storageName = 'user-storage'
export default storeCreator(stateCreator, storageName);
