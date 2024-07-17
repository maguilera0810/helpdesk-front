import { produce } from 'immer';
import { create, StateCreator } from 'zustand';


interface IFilterState {
  filters: { [key: string]: any };
  setFilters: (filters: { [key: string]: any }) => void;
  clearFilters: () => void;
}

const stateCreator: StateCreator<IFilterState, [], [], IFilterState> = (set) => ({
  filters: {},
  setFilters: (filters) =>
    set(produce((state: IFilterState) => {
      state.filters = filters
    })),
  clearFilters: () =>
    set(produce((state: IFilterState) => {
      state.filters = {}
    })),
});

const useFilterStore = create<IFilterState>()(stateCreator);
export default useFilterStore;
