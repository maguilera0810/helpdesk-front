import { produce } from 'immer';
import { create, StateCreator } from 'zustand';
import { ITaskState } from '../interfaces/StateInterfaces';


const stateCreator: StateCreator<ITaskState, [], [], ITaskState> = (set) => ({
  task: null,
  schedule: null,
  tasks: [],
  userTasks: [],
  currDate: null,
  startAt: null,
  endAt: null,
  setTask: (task) =>
    set(produce((state: ITaskState) => {
      state.task = task;
    })),
  setTasks: (tasks) =>
    set(produce((state: ITaskState) => {
      state.tasks = tasks;
    })),
  setUserTasks: (userTasks) =>
    set(produce((state: ITaskState) => {
      state.userTasks = userTasks;
    })),
  setSchedule: (schedule) =>
    set(produce((state: ITaskState) => {
      state.schedule = schedule;
    })),
  setCurrDate: (currDate) =>
    set(produce((state: ITaskState) => {
      state.currDate = currDate;
    })),
  setStartAt: (startAt) =>
    set(produce((state: ITaskState) => {
      state.startAt = startAt;
    })),
  setEndAt: (endAt) =>
    set(produce((state: ITaskState) => {
      state.endAt = endAt;
    })),
  clearTaks: () =>
    set(produce((state: ITaskState) => {
      state.tasks = [];
    })),
  clearState: () =>
    set(produce((state: ITaskState) => {
      state.task = null;
      state.tasks = [];
      state.userTasks = [];
      state.schedule = null
      state.currDate = null;
      state.startAt = null;
      state.endAt = null;
    })),
});

const useTaskStore = create<ITaskState>()(stateCreator);

export default useTaskStore;
