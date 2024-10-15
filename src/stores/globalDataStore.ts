import { produce } from 'immer';
import { StateCreator } from 'zustand';
import { GlobalDataState } from '../interfaces/StateInterfaces';
import storeCreator from './core/storeCreator';


const stateCreator: StateCreator<GlobalDataState, [], [], GlobalDataState> = (set, get) => ({
  reload: false,
  reloadCategory: false,
  reloadPermission: false,
  reloadPriority: false,
  setReload: (reload, reloadType?) =>
    set(produce((state: GlobalDataState) => {
      if (!reloadType) {
        state.reload = reload;
      } else if (reloadType === 'category') {
        state.reloadCategory = reload;
      } else if (reloadType === 'permission') {
        state.reloadPermission = reload;
      } else if (reloadType === 'priority') {
        state.reloadPriority = reload;
      }
    })),
  priority: undefined,
  priorities: [],
  setPriority: (priority) =>
    set(produce((state: GlobalDataState) => {
      state.priority = priority;
    })),
  setPriorities: (priorities) =>
    set(produce((state: GlobalDataState) => {
      state.priorities = priorities;
    })),
  category: null,
  categories: [],
  setCategory: (category) =>
    set(produce((state: GlobalDataState) => {
      state.category = category;
    })),
  setCategories: (categories) =>
    set(produce((state: GlobalDataState) => {
      state.categories = categories;
    })),
  groupedPermissions: undefined,
  getFlatPermissions() {
    const groupedPermissions = get().groupedPermissions;
    return groupedPermissions ? Object.values(groupedPermissions).flat() : [];

  },
  getGroupedPermission(group) {
    return get().groupedPermissions?.[group] || [];
  },
  setGroupedPermissions: (groupPermissions) =>
    set(produce((state: GlobalDataState) => {
      state.groupedPermissions = groupPermissions;
    })),
  setGroupedPermission: (group, permissions) =>
    set(produce((state: GlobalDataState) => {
      if (state.groupedPermissions) {
        state.groupedPermissions[group] = permissions;
      }
    })),

});

const storageName = 'global-data-storage';
export default storeCreator(stateCreator, storageName);
