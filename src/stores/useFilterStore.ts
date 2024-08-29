import { produce } from 'immer';
import { create, StateCreator } from 'zustand';
import { IFilterState } from '../interfaces/StateInterfaces';


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
