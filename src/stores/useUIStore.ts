import { produce } from 'immer';
import { create, StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import { IUIState } from '../interfaces/StateInterfaces';
import { decryptData, encryptData } from '../utils/cryptoUtil';



const persistOptions: PersistOptions<IUIState> = {
  name: 'auth-storage',
  getStorage: () => localStorage,
  serialize: encryptData,
  deserialize: decryptData,
};

const stateCreator: StateCreator<IUIState, [], [], IUIState> = (set) => ({
  isDrawerOpen: true,
  toggleDrawer: () =>
    set(produce((state: IUIState) => {
      state.isDrawerOpen = !state.isDrawerOpen
    })),
});

const useUIStore = create<IUIState>()(
  persist(stateCreator, persistOptions)
);

export default useUIStore;
