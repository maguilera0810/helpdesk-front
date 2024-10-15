import { useCallback, useState } from 'react';
import { Priority } from '../../interfaces/ModelInterfaces';
import PriorityService from '../../services/settings/PriorityService';

export const usePriority = () => {
  const [priority, setPriority] = useState<Priority | null>(null);
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [method, setMethod] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const fetchPriorities = useCallback(async (filters: { [key: string]: any } = {}) => {
    setMethod('fetchPriorities');
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const priorityList = await PriorityService.list(filters);
      setPriorities(priorityList);
      setSuccess(true);
    } catch (error) {
      console.error('Error fetching priorities:', error);
      setError('Error fetching priorities');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPriority = async (priorityId: number) => {
    setMethod('fetchPriority');
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const priority = await PriorityService.retrieve(priorityId);
      setPriority(priority);
      setSuccess(true);
      return priority;
    } catch (error) {
      console.error(`Error fetching priority with id ${priorityId}:`, error);
      setError('Error fetching priority');
    } finally {
      setLoading(false);
    }
  };

  const createPriority = async (priority: Partial<Priority>) => {
    setMethod('createPriority');
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const newPriority = await PriorityService.create(priority);
      setPriority(newPriority);
      setSuccess(true);
    } catch (error) {
      console.error('Error creating priority:', error);
      setError('Error creating priority');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const updatePriority = async (priorityId: number, priority: Partial<Priority>) => {
    setMethod('updatePriority');
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const updatedPriority = await PriorityService.update(priorityId, priority);
      setPriority(updatedPriority);
      setSuccess(true);
    } catch (error) {
      console.error(`Error updating priority with id ${priorityId}:`, error);
      setError('Error updating priority');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const deletePriority = async (priorityId: number) => {
    setMethod('deletePriority');
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await PriorityService.destroy(priorityId);
      setSuccess(true);
    } catch (error) {
      console.error(`Error deleting priority with id ${priorityId}:`, error);
      setError('Error deleting priority');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return {
    priority,
    priorities,
    loading,
    error,
    success,
    method,
    fetchPriorities,
    fetchPriority,
    createPriority,
    updatePriority,
    deletePriority,
  };
};
