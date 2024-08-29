import { produce } from 'immer';
import { create, StateCreator } from 'zustand';
import { ICategoryState } from '../interfaces/StateInterfaces';



const stateCreator: StateCreator<ICategoryState, [], [], ICategoryState> = (set) => ({
  category: null,
  categories: [],
  setCategory: (category) =>
    set(produce((state: ICategoryState) => {
      state.category = category;
    })),
  setCategories: (categories) =>
    set(produce((state: ICategoryState) => {
      state.categories = categories;
    })),
});

const useCategoryStore = create<ICategoryState>()(stateCreator);

export default useCategoryStore;
