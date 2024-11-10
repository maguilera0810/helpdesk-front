import { produce } from 'immer';
import { StateCreator } from 'zustand';
import { LocationInfoState } from '../../interfaces/StateInterfaces';
import storeCreator from '../core/storeCreator';

const stateCreator: StateCreator<LocationInfoState, [], [], LocationInfoState> = (set) => ({
  location: undefined,
  locationData: undefined,
  locations: [],
  position: undefined,
  setLocation: (value) =>
    set(produce((state: LocationInfoState) => {
      state.location = value;
    })),
  setLocationData: (value) =>
    set(produce((state: LocationInfoState) => {
      state.locationData = value;
    })),
  setLocations: (value) =>
    set(produce((state: LocationInfoState) => {
      state.locations = value;
    })),
  setPosition: (value) =>
    set(produce((state: LocationInfoState) => {
      state.position = value;
    })),
  clearState: () =>
    set(produce((state: LocationInfoState) => {
      state.position = undefined;
      state.location = undefined;
    })),
});


const storageName = 'location-storage';
export default storeCreator(stateCreator, storageName);
