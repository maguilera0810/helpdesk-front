import { produce } from 'immer';
import { StateCreator } from 'zustand';
import { PermissionState } from '../../interfaces/StateInterfaces';
import storeCreator from '../core/storeCreator';


const stateCreator: StateCreator<PermissionState, [], [], PermissionState> = (set) => ({
  permission: undefined,
  permissions: [],
  setPermission: (permission) =>
    set(produce((state: PermissionState) => {
      state.permission = permission;
    })),
  setPermissions: (permissions) =>
    set(produce((state: PermissionState) => {
      state.permissions = permissions;
    })),
  clearState: () =>
    set(produce((state: PermissionState) => {
      state.permission = undefined;
      state.permissions = [];
    })),

});

const storageName = 'permission-storage';
export default storeCreator(stateCreator, storageName);
