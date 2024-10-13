import { produce } from 'immer';
import { StateCreator } from 'zustand';
import { RoleState } from '../../interfaces/StateInterfaces';
import storeCreator from '../core/storeCreator';


const stateCreator: StateCreator<RoleState, [], [], RoleState> = (set) => ({
  role: undefined,
  roles: [],
  setRole: (role) => set(produce((state: RoleState) => {
    state.role = role;
  })),
  setRoles: (roles) => set(produce((state: RoleState) => {
    state.roles = roles;
  })),
  clearState: () => set(produce((state: RoleState) => {
    state.role = undefined;
    state.roles = [];
  })),

});

const storageName = 'role-storage';
export default storeCreator(stateCreator, storageName);
