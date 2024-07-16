import { create, StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import { produce } from 'immer';
import { decryptData, encryptData } from '../utils/cryptoUtil';

interface NavbarState {
  expandedItems: string[];
  toggleItem: (item: string) => void;
  isItemExpanded: (item: string) => boolean;
}

const persistOptions: PersistOptions<NavbarState> = {
  name: 'navbar-storage',
  getStorage: () => localStorage,
  serialize: encryptData,
  deserialize: decryptData,
};

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

const useNavbarStore = create<NavbarState>()(
  persist(stateCreator, persistOptions)
);

export default useNavbarStore;
