import { create, StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import { decryptData, encryptData } from '../../utils/cryptoUtil';

const storeCreator = <T>(stateCreator: StateCreator<T, [], [], T>, name?: string) => {

  if (!name) {
    return create<T>()(stateCreator);
  }

  const persistOptions: PersistOptions<T> = {
    name,
    storage: {
      getItem: (name) => decryptData(localStorage.getItem(name) ?? ''),
      setItem: (name, value) => localStorage.setItem(name, encryptData(value)),
      removeItem: (name) => localStorage.removeItem(name),
    },
  };

  return create<T>()(persist(stateCreator, persistOptions));
};

export default storeCreator;
