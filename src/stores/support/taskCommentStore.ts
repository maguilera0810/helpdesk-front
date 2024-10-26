import { produce } from 'immer';
import { StateCreator } from 'zustand';
import { TaskCommentState } from '../../interfaces/StateInterfaces';
import storeCreator from '../core/storeCreator';


const stateCreator: StateCreator<TaskCommentState, [], [], TaskCommentState> = (set) => ({
  taskComment: undefined,
  taskComments: [],
  setTaskComment: (taskComment) =>
    set(produce((state: TaskCommentState) => {
      state.taskComment = taskComment;
    })),
  setTaskComments: (taskComments) =>
    set(produce((state: TaskCommentState) => {
      state.taskComments = taskComments;
    })),

  clearState: () =>
    set(produce((state: TaskCommentState) => {
      state.taskComment = undefined;
      state.taskComments = [];
    })),
});

export default storeCreator(stateCreator, 'task-comment-store');
