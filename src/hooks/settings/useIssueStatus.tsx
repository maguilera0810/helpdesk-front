import { useCallback, useState } from 'react';

import { IssueStatus } from '../../interfaces/ModelInterfaces';
import IssueStatusService from '../../services/settings/IssueStatusService';
import { methodIssueStatus } from '../../types/methodTypes';

export const useIssueStatus = () => {
  const [issueStatus, setIssueStatus] = useState<IssueStatus | undefined>();
  const [issueStatuses, setIssueStatuses] = useState<IssueStatus[]>([]);
  const [method, setMethod] = useState<methodIssueStatus | undefined>()
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const fetchIssueStatuses = useCallback(async (filters: { [key: string]: any } = {}) => {
    setMethod('fetchIssueStatuses');
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const issueStatusList = await IssueStatusService.list(filters);
      setIssueStatuses(issueStatusList);
      setSuccess(true);
    } catch (error) {
      console.error('Error fetching issueStatuses:', error);
      setError('Error fetching issueStatuses');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchIssueStatus = async (issueStatusId: number) => {
    setMethod('fetchIssueStatus');
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const issueStatus = await IssueStatusService.retrieve(issueStatusId);
      setIssueStatus(issueStatus);
      setSuccess(true);
      return issueStatus;
    } catch (error) {
      console.error(`Error fetching issueStatus with id ${issueStatusId}:`, error);
      setError('Error fetching issueStatus');
    } finally {
      setLoading(false);
    }
  };

  const createIssueStatus = async (issueStatus: Partial<IssueStatus>) => {
    setMethod('createIssueStatus');
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const newIssueStatus = await IssueStatusService.create(issueStatus);
      setIssueStatus(newIssueStatus);
      setSuccess(true);
    } catch (error) {
      console.error('Error creating issueStatus:', error);
      setError('Error creating issueStatus');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const updateIssueStatus = async (issueStatusId: number, issueStatus: Partial<IssueStatus>) => {
    setMethod('updateIssueStatus');
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const updatedIssueStatus = await IssueStatusService.update(issueStatusId, issueStatus);
      setIssueStatus(updatedIssueStatus);
      setSuccess(true);
    } catch (error) {
      console.error(`Error updating issueStatus with id ${issueStatusId}:`, error);
      setError('Error updating issueStatus');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const deleteIssueStatus = async (issueStatusId: number) => {
    setMethod('deleteIssueStatus');
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await IssueStatusService.destroy(issueStatusId);
      setSuccess(true);
    } catch (error) {
      console.error(`Error deleting issueStatus with id ${issueStatusId}:`, error);
      setError('Error deleting issueStatus');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return {
    issueStatus,
    issueStatuses,
    loading,
    error,
    success,
    method,
    fetchIssueStatuses,
    fetchIssueStatus,
    createIssueStatus,
    updateIssueStatus,
    deleteIssueStatus,
  };
};
