import { produce } from 'immer';
import { StateCreator } from 'zustand';
import { UIState } from '../interfaces/StateInterfaces';
import storeCreator from './core/storeCreator';



const stateCreator: StateCreator<UIState, [], [], UIState> = (set) => ({
  isDrawerOpen: true,
  mode: 'light',
  toggleDrawer: () =>
    set(produce((state: UIState) => {
      state.isDrawerOpen = !state.isDrawerOpen
    })),
  toggleMode: () =>
    set(produce((state: UIState) => {
      if (state.mode === 'dark') {
        state.mode = 'light'
      } else {
        state.mode = 'dark'
      }
    })),
  setMode: (mode) =>
    set(produce((state: UIState) => {
      state.mode = mode
    })),
});


const storageName = 'ui-storage'
export default storeCreator(stateCreator, storageName);
