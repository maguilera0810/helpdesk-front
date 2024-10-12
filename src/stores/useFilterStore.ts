import { produce } from 'immer';
import { StateCreator } from 'zustand';
import { IFilterState } from '../interfaces/StateInterfaces';
import storeCreator from './core/storeCreator';


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


export default storeCreator(stateCreator);