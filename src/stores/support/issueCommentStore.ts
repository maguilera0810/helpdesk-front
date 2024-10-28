import { produce } from 'immer';
import { StateCreator } from 'zustand';
import { IssueCommentState } from '../../interfaces/StateInterfaces';
import storeCreator from '../core/storeCreator';


const stateCreator: StateCreator<IssueCommentState, [], [], IssueCommentState> = (set) => ({
  issue: undefined,
  issueComment: undefined,
  issueComments: [],
  setIssue: (issue) =>
    set(produce((state: IssueCommentState) => {
      state.issue = issue;
    })),
  setIssueComment: (issueComment) =>
    set(produce((state: IssueCommentState) => {
      state.issueComment = issueComment;
    })),
  setIssueComments: (issueComments) =>
    set(produce((state: IssueCommentState) => {
      state.issueComments = issueComments;
    })),

  clearState: () =>
    set(produce((state: IssueCommentState) => {
      state.issue = undefined;
      state.issueComment = undefined;
      state.issueComments = [];
    })),
});

export default storeCreator(stateCreator, 'issue-comment-store');
