import { produce } from 'immer';
import { StateCreator } from 'zustand';
import { LocationDetailState } from '../../interfaces/StateInterfaces';
import storeCreator from '../core/storeCreator';

const stateCreator: StateCreator<LocationDetailState, [], [], LocationDetailState> = (set) => ({
  location: undefined,
  locations: [],
  setLocation: (location) =>
    set(produce((state: LocationDetailState) => {
      state.location = location;
    })),
  setLocations: (locations) =>
    set(produce((state: LocationDetailState) => {
      state.locations = locations;
    })),
});


const storageName = 'location-storage';
export default storeCreator(stateCreator, storageName);
