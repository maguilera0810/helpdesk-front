import { produce } from 'immer';
import { StateCreator } from 'zustand';
import { CategoryState } from '../../interfaces/StateInterfaces';
import storeCreator from '../core/storeCreator';


const stateCreator: StateCreator<CategoryState, [], [], CategoryState> = (set) => ({
  category: null,
  categories: [],
  setCategory: (category) =>
    set(produce((state: CategoryState) => {
      state.category = category;
    })),
  setCategories: (categories) =>
    set(produce((state: CategoryState) => {
      state.categories = categories;
    })),
});


export default storeCreator(stateCreator);
