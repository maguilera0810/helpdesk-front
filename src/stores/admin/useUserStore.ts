import { produce } from 'immer';
import { StateCreator } from 'zustand';
import { UserState } from '../../interfaces/StateInterfaces';
import storeCreator from '../core/storeCreator';

const stateCreator: StateCreator<UserState, [], [], UserState> = (set) => ({
  user: null,
  users: [],
  lightUsers: [],
  setUser: (user) =>
    set(produce((state: UserState) => {
      state.user = user;
    })),
  setUsers: (users) =>
    set(produce((state: UserState) => {
      state.users = users;
    })),
  setLightUsers: (lightUsers) =>
    set(produce((state: UserState) => {
      state.lightUsers = lightUsers;
    })),
});

const storageName = 'user-storage'
export default storeCreator(stateCreator, storageName);
