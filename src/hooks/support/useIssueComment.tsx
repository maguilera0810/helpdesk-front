import { useCallback, useState } from 'react';

import { IssueComment } from '../../interfaces/ModelInterfaces';
import IssueCommentService from '../../services/support/IssueCommentService';
import { methodIssueComment } from '../../types/methodTypes';


export const useIssueComment = () => {
  const [issueComment, setIssueComment] = useState<IssueComment | undefined>();
  const [issueComments, setIssueComments] = useState<IssueComment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [method, setMethod] = useState<methodIssueComment | undefined>();
  const [success, setSuccess] = useState<boolean | null>(null);

  const fetchIssueComments = useCallback(async (filters: { [key: string]: any } = {}) => {
    setMethod("fetchIssueComments");
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const issueCommentList = await IssueCommentService.list(filters);
      setIssueComments(issueCommentList);
      setSuccess(true);
    } catch (error) {
      setSuccess(false)
      console.error('Error fetching issueComments:', error);
      setError('Error fetching issueComments');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchIssueComment = async (issueCommentId: number) => {
    setMethod("fetchIssueComment");
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const issueComment = await IssueCommentService.retrieve(issueCommentId);
      setIssueComment(issueComment);
      setSuccess(true);
      return issueComment;
    } catch (error) {
      setSuccess(false)
      console.error(`Error fetching issueComment with id ${issueCommentId}:`, error);
      setError('Error fetching issueComment');
    } finally {
      setLoading(false);
    }
  };

  const createIssueComment = async (issueComment: Partial<IssueComment>) => {
    setMethod("createIssueComment");
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const newIssueComment = await IssueCommentService.create(issueComment);
      setIssueComment(newIssueComment);
      setSuccess(true);
    } catch (error) {
      setSuccess(false)
      console.error('Error creating issueComment:', error);
      setError('Error creating issueComment');
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  };

  const updateIssueComment = async (issueCommentId: number, issueComment: Partial<IssueComment>) => {
    setMethod("updateIssueComment");
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const updatedIssueComment = await IssueCommentService.update(issueCommentId, issueComment);
      setIssueComment(updatedIssueComment);
      setSuccess(true);
    } catch (error) {
      setSuccess(false)
      console.error(`Error updating issueComment with id ${issueCommentId}:`, error);
      setError('Error updating issueComment');
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  };

  const deleteIssueComment = async (issueCommentId: number) => {
    setMethod("deleteIssueComment");
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await IssueCommentService.destroy(issueCommentId);
      setSuccess(true);
    } catch (error) {
      setSuccess(false)
      console.error(`Error deleting issueComment with id ${issueCommentId}:`, error);
      setError('Error deleting issueComment');
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    issueComment,
    issueComments,
    loading,
    error,
    success,
    method,
    fetchIssueComment,
    fetchIssueComments,
    createIssueComment,
    updateIssueComment,
    deleteIssueComment,
  };
};
