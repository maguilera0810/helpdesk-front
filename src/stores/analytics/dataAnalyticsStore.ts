import { produce } from 'immer';
import { StateCreator } from 'zustand';
import { DataAnalyticsState } from '../../interfaces/StateInterfaces';
import storeCreator from '../core/storeCreator';



const stateCreator: StateCreator<DataAnalyticsState, [], [], DataAnalyticsState> = (set) => ({
  taskStatus: undefined,
  issueStatus: undefined,
  taskCategories: [],
  issueCategories: [],
  setTaskStatus: (taskStatus) =>
    set(produce((state: DataAnalyticsState) => {
      state.taskStatus = taskStatus;
    })),
  setIssueStatus: (issueStatus) =>
    set(produce((state: DataAnalyticsState) => {
      state.issueStatus = issueStatus;
    })),
  setTaskCategories: (taskCategories) =>
    set(produce((state: DataAnalyticsState) => {
      state.taskCategories = taskCategories;
    })),
  setIssueCategories: (issueCategories) =>
    set(produce((state: DataAnalyticsState) => {
      state.issueCategories = issueCategories;
    })),
  clearState: () =>
    set(produce((state: DataAnalyticsState) => {
      state.taskStatus = undefined;
      state.issueStatus = undefined;
      state.taskCategories = [];
      state.issueCategories = [];
    })),
});


const storageName = 'data-analytics-storage'
export default storeCreator(stateCreator, storageName);
