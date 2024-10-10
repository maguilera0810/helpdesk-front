import { produce } from 'immer';
import { StateCreator } from 'zustand';
import { GlobalDataState } from '../interfaces/StateInterfaces';
import storeCreator from './storeCreator';


const stateCreator: StateCreator<GlobalDataState, [], [], GlobalDataState> = (set) => ({
  reload: false,
  setReload: (reload) =>
    set(produce((state: GlobalDataState) => {
      state.reload = reload;
    })),
  priority: undefined,
  setPriority: (priority) =>
    set(produce((state: GlobalDataState) => {
      state.priority = priority;
    })),
  priorities: [],
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

});

const storageName = 'global-data-storage';
export default storeCreator(stateCreator, storageName);
