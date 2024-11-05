import { useCallback, useState } from 'react';

import DataAnalyticsService from '../../services/analytics/DataAnalyticsService';
import dataAnalyticsStore from '../../stores/analytics/dataAnalyticsStore';
import { methodData } from '../../types/methodTypes';


export const useDataAnalytics = () => {

  const { taskStatus, issueStatus, taskCategories, issueCategories } = dataAnalyticsStore()
  const { setTaskStatus, setIssueStatus, setTaskCategories, setIssueCategories } = dataAnalyticsStore()
  const [method, setMethod] = useState<methodData | undefined>()
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const fetchData = useCallback(async (filters: { [key: string]: any } = {}) => {
    setMethod('fetchData');
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const resp = await DataAnalyticsService.getData(filters);
      setTaskStatus(resp.taskStatus);
      setIssueStatus(resp.issueStatus);
      setTaskCategories(resp.taskCategories);
      setIssueCategories(resp.issueCategories);
      setSuccess(true);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  }, []);


  return {
    taskStatus,
    issueStatus,
    taskCategories,
    issueCategories,
    loading,
    error,
    success,
    method,
    fetchData,
  };
};
