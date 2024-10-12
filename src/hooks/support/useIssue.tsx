import { useCallback, useState } from 'react';
import { Issue } from '../../interfaces/ModelInterfaces';
import IssueService from '../../services/support/IssueService';

export const useIssue = () => {
  const [issue, setIssue] = useState<Issue | null>(null);
  const [createdTask, setCreatedTask] = useState<number | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [successCreateTask, setSuccessCreateTask] = useState<boolean>(false);

  const fetchIssues = useCallback(async (filters: { [key: string]: any } = {}) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const issueList = await IssueService.list(filters);
      setIssues(issueList);
      setSuccess(true);
    } catch (error) {
      console.error('Error fetching issues:', error);
      setError('Error fetching issues');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchIssue = async (issueId: number) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const issue = await IssueService.retrieve(issueId);
      setIssue(issue);
      setSuccess(true);
      return issue;
    } catch (error) {
      console.error(`Error fetching issue with id ${issueId}:`, error);
      setError('Error fetching issue');
    } finally {
      setLoading(false);
    }
  };

  const createIssue = async (issue: Partial<Issue>) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const newIssue = await IssueService.create(issue);
      setIssue(newIssue)
      setSuccess(true);
    } catch (error) {
      console.error('Error creating issue:', error);
      setError('Error creating issue');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (id: number) => {
    setLoading(true);
    setError(null);
    setSuccessCreateTask(false);
    try {
      const taskId = await IssueService.createTask(id);
      setCreatedTask(taskId)
      setSuccessCreateTask(true);
    } catch (error) {
      console.error('Error creating issue:', error);
      setError('Error creating issue');
      setSuccessCreateTask(false);
    } finally {
      setLoading(false);
    }
  };

  const updateIssue = async (issueId: number, issue: Partial<Issue>) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const updatedIssue = await IssueService.update(issueId, issue);
      setIssue(updatedIssue);
      setSuccess(true);
    } catch (error) {
      console.error(`Error updating issue with id ${issueId}:`, error);
      setError('Error updating issue');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const deleteIssue = async (issueId: number) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await IssueService.destroy(issueId);
      setIssue(null);
      setSuccess(true);
    } catch (error) {
      console.error(`Error deleting issue with id ${issueId}:`, error);
      setError('Error deleting issue');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    success,
    successCreateTask,
    issue,
    issues,
    createdTask,
    fetchIssues,
    fetchIssue,
    createIssue,
    createTask,
    updateIssue,
    deleteIssue,
  };
};
