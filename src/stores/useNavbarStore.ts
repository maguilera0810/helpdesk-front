import { produce } from 'immer';
import { StateCreator } from 'zustand';
import { NavbarState } from '../interfaces/StateInterfaces';
import storeCreator from './storeCreator';

const stateCreator: StateCreator<NavbarState, [], [], NavbarState> = (set, get) => ({
  expandedItems: [],
  toggleItem: (item) =>
    set(produce((state: NavbarState) => {
      if (state.expandedItems.includes(item)) {
        state.expandedItems = state.expandedItems.filter(i => i !== item);
      } else {
        state.expandedItems.push(item);
      }
    })),
  isItemExpanded: (item) => get().expandedItems.includes(item),
});


const storageName = 'navbar-storage'
export default storeCreator(stateCreator, storageName);