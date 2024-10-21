import { produce } from 'immer';
import { StateCreator } from 'zustand';
import { GlobalDataState } from '../interfaces/StateInterfaces';
import storeCreator from './core/storeCreator';


const stateCreator: StateCreator<GlobalDataState, [], [], GlobalDataState> = (set, get) => ({
  reload: false,
  reloadUser: false,
  reloadPriority: false,
  reloadCategory: false,
  reloadPermission: false,
  reloadTaskStatus: false,
  reloadIssueStatus: false,
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
      } else if (reloadType === 'user') {
        state.reloadUser = reload;
      }
    })),

  groupedPermissions: undefined,
  getFlatPermissions() {
    const groupedPermissions = get().groupedPermissions;
    return groupedPermissions ? Object.values(groupedPermissions).flat() : [];

  },
  getGroupedPermission(group) {
    return get().groupedPermissions?.[group] || [];
  },
  setGroupedPermissions: (groupedPermissions) =>
    set(produce((state: GlobalDataState) => {
      state.groupedPermissions = groupedPermissions;
    })),

  lightUsers: [],
  setLightUsers: (lightUsers) =>
    set(produce((state: GlobalDataState) => {
      state.lightUsers = lightUsers;
    })),

  priorities: [],
  setPriorities: (priorities) =>
    set(produce((state: GlobalDataState) => {
      state.priorities = priorities;
    })),

  categories: [],
  setCategories: (categories) =>
    set(produce((state: GlobalDataState) => {
      state.categories = categories;
    })),

  taskStatuses: [],
  setTaskStatuses: (statuses) =>
    set(produce((state: GlobalDataState) => {
      state.taskStatuses = statuses;
    })),
  issueStatuses: [],
  setIssueStatuses: (statuses) =>
    set(produce((state: GlobalDataState) => {
      state.taskStatuses = statuses;
    })),
});

const storageName = 'global-data-storage';
export default storeCreator(stateCreator, storageName);
