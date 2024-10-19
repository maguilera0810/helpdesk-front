import { useCallback, useState } from 'react';

import { TaskStatus } from '../../interfaces/ModelInterfaces';
import TaskStatusService from '../../services/settings/TaskStatusService';
import { methodTaskStatus } from '../../types/methodTypes';


export const useTaskStatus = () => {
  const [taskStatus, setTaskStatus] = useState<TaskStatus | null>(null);
  const [taskStatuses, setTaskStatuses] = useState<TaskStatus[]>([]);
  const [method, setMethod] = useState<methodTaskStatus | undefined>()
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const fetchTaskStatuses = useCallback(async (filters: { [key: string]: any } = {}) => {
    setMethod('fetchTaskStatuses');
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const taskStatusList = await TaskStatusService.list(filters);
      setTaskStatuses(taskStatusList);
      setSuccess(true);
    } catch (error) {
      console.error('Error fetching taskStatuses:', error);
      setError('Error fetching taskStatuses');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTaskStatus = async (taskStatusId: number) => {
    setMethod('fetchTaskStatus');
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const taskStatus = await TaskStatusService.retrieve(taskStatusId);
      setTaskStatus(taskStatus);
      setSuccess(true);
      return taskStatus;
    } catch (error) {
      console.error(`Error fetching taskStatus with id ${taskStatusId}:`, error);
      setError('Error fetching taskStatus');
    } finally {
      setLoading(false);
    }
  };

  const createTaskStatus = async (taskStatus: Partial<TaskStatus>) => {
    setMethod('createTaskStatus');
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const newTaskStatus = await TaskStatusService.create(taskStatus);
      setTaskStatus(newTaskStatus);
      setSuccess(true);
    } catch (error) {
      console.error('Error creating taskStatus:', error);
      setError('Error creating taskStatus');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const updateTaskStatus = async (taskStatusId: number, taskStatus: Partial<TaskStatus>) => {
    setMethod('updateTaskStatus');
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const updatedTaskStatus = await TaskStatusService.update(taskStatusId, taskStatus);
      setTaskStatus(updatedTaskStatus);
      setSuccess(true);
    } catch (error) {
      console.error(`Error updating taskStatus with id ${taskStatusId}:`, error);
      setError('Error updating taskStatus');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const deleteTaskStatus = async (taskStatusId: number) => {
    setMethod('deleteTaskStatus');
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await TaskStatusService.destroy(taskStatusId);
      setSuccess(true);
    } catch (error) {
      console.error(`Error deleting taskStatus with id ${taskStatusId}:`, error);
      setError('Error deleting taskStatus');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return {
    taskStatus,
    taskStatuses,
    loading,
    error,
    success,
    method,
    fetchTaskStatuses,
    fetchTaskStatus,
    createTaskStatus,
    updateTaskStatus,
    deleteTaskStatus,
  };
};
