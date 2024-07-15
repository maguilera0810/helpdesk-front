import { create } from 'zustand';

interface UIState {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
}

const useUIStore = create<UIState>()((set) => ({
  isDrawerOpen: true,
  toggleDrawer: () =>
    set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
}));

export default useUIStore;
