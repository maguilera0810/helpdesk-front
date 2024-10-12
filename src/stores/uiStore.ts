import { produce } from 'immer';
import { StateCreator } from 'zustand';
import { IUIState } from '../interfaces/StateInterfaces';
import storeCreator from './core/storeCreator';



const stateCreator: StateCreator<IUIState, [], [], IUIState> = (set) => ({
  isDrawerOpen: true,
  toggleDrawer: () =>
    set(produce((state: IUIState) => {
      state.isDrawerOpen = !state.isDrawerOpen
    })),
});


const storageName = 'ui-storage'
export default storeCreator(stateCreator, storageName);
