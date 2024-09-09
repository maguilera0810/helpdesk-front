import { produce } from 'immer';
import { create, StateCreator } from 'zustand';
import { ITaskState } from '../interfaces/StateInterfaces';


const stateCreator: StateCreator<ITaskState, [], [], ITaskState> = (set) => ({
  task: null,
  tasks: [],
  setTask: (task) =>
    set(produce((state: ITaskState) => {
      state.task = task;
    })),
  setTasks: (tasks) =>
    set(produce((state: ITaskState) => {
      state.tasks = tasks;
    })),
  clearTaks: () =>
    set(produce((state: ITaskState) => {
      state.tasks = [];
    })),
});

const useTaskStore = create<ITaskState>()(stateCreator);

export default useTaskStore;
