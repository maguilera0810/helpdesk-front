import { create, StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import { decryptData, encryptData } from '../utils/cryptoUtil';

const storeCreator = <T>(stateCreator: StateCreator<T, [], [], T>, name?: string) => {

  if (!name) {
    return create<T>()(stateCreator);
  }

  const persistOptions: PersistOptions<T> = {
    name,
    getStorage: () => localStorage,
    serialize: encryptData,
    deserialize: decryptData,
  };

  return create<T>()(persist(stateCreator, persistOptions));
};

export default storeCreator;
