import { produce } from 'immer';
import { StateCreator } from 'zustand';
import { TaskStatusState } from '../../interfaces/StateInterfaces';
import storeCreator from '../core/storeCreator';

const stateCreator: StateCreator<TaskStatusState, [], [], TaskStatusState> = (set) => ({
  taskStatuses: [],
  setTaskStatuses: (taskStatuses) =>
    set(produce((state: TaskStatusState) => {
      state.taskStatuses = taskStatuses;
    })),
  clearState: () =>
    set(produce((state: TaskStatusState) => {
      state.taskStatuses = [];
    })),
});


const storageName = 'task-status-storage';
export default storeCreator(stateCreator, storageName);
