import { produce } from 'immer';
import { StateCreator } from 'zustand';
import { TaskState } from '../../interfaces/StateInterfaces';
import storeCreator from '../core/storeCreator';


const stateCreator: StateCreator<TaskState, [], [], TaskState> = (set) => ({
  task: null,
  schedule: null,
  tasks: [],
  userTasks: [],
  currDate: null,
  startAt: null,
  endAt: null,
  setTask: (task) =>
    set(produce((state: TaskState) => {
      state.task = task;
    })),
  setTasks: (tasks) =>
    set(produce((state: TaskState) => {
      state.tasks = tasks;
    })),
  setUserTasks: (userTasks) =>
    set(produce((state: TaskState) => {
      state.userTasks = userTasks;
    })),
  setSchedule: (schedule) =>
    set(produce((state: TaskState) => {
      state.schedule = schedule;
    })),
  setCurrDate: (currDate) =>
    set(produce((state: TaskState) => {
      state.currDate = currDate;
    })),
  setStartAt: (startAt) =>
    set(produce((state: TaskState) => {
      state.startAt = startAt;
    })),
  setEndAt: (endAt) =>
    set(produce((state: TaskState) => {
      state.endAt = endAt;
    })),
  clearTaks: () =>
    set(produce((state: TaskState) => {
      state.tasks = [];
    })),
  clearState: () =>
    set(produce((state: TaskState) => {
      state.task = null;
      state.tasks = [];
      state.userTasks = [];
      state.schedule = null
      state.currDate = null;
      state.startAt = null;
      state.endAt = null;
    })),
});

export default storeCreator(stateCreator);
