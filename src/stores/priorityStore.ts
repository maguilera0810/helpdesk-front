import { produce } from 'immer';
import { StateCreator } from 'zustand';
import { PriorityState } from '../interfaces/StateInterfaces';
import storeCreator from './storeCreator';

const stateCreator: StateCreator<PriorityState, [], [], PriorityState> = (set) => ({
  priority: undefined,
  priorities: [],
  setPriority: (priority) =>
    set(produce((state: PriorityState) => {
      state.priority = priority;
    })),
  setPriorities: (priorities) =>
    set(produce((state: PriorityState) => {
      state.priorities = priorities;
    })),
});


const storageName = 'priority-storage';
export default storeCreator(stateCreator, storageName);
