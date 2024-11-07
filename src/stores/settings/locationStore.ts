import { produce } from 'immer';
import { StateCreator } from 'zustand';
import { LocationState } from '../../interfaces/StateInterfaces';
import storeCreator from '../core/storeCreator';

const stateCreator: StateCreator<LocationState, [], [], LocationState> = (set) => ({
  location: undefined,
  locations: [],
  setLocation: (location) =>
    set(produce((state: LocationState) => {
      state.location = location;
    })),
  setLocations: (locations) =>
    set(produce((state: LocationState) => {
      state.locations = locations;
    })),
});


const storageName = 'location-storage';
export default storeCreator(stateCreator, storageName);
