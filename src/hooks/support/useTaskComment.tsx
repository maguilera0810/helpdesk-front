import { useCallback, useState } from 'react';

import { TaskComment } from '../../interfaces/ModelInterfaces';
import TaskCommentService from '../../services/support/TaskCommentService';
import { methodTaskComment } from '../../types/methodTypes';


export const useTaskComment = () => {
  const [taskComment, setTaskComment] = useState<TaskComment | undefined>();
  const [taskComments, setTaskComments] = useState<TaskComment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [method, setMethod] = useState<methodTaskComment | undefined>();
  const [success, setSuccess] = useState<boolean | null>(null);

  const fetchTaskComments = useCallback(async (filters: { [key: string]: any } = {}) => {
    setMethod("fetchTaskComments");
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const taskCommentList = await TaskCommentService.list(filters);
      setTaskComments(taskCommentList);
      setSuccess(true);
    } catch (error) {
      setSuccess(false)
      console.error('Error fetching taskComments:', error);
      setError('Error fetching taskComments');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTaskComment = async (taskCommentId: number) => {
    setMethod("fetchTaskComment");
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const taskComment = await TaskCommentService.retrieve(taskCommentId);
      setTaskComment(taskComment);
      setSuccess(true);
      return taskComment;
    } catch (error) {
      setSuccess(false)
      console.error(`Error fetching taskComment with id ${taskCommentId}:`, error);
      setError('Error fetching taskComment');
    } finally {
      setLoading(false);
    }
  };

  const createTaskComment = async (taskComment: Partial<TaskComment>) => {
    setMethod("createTaskComment");
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const newTaskComment = await TaskCommentService.create(taskComment);
      setTaskComment(newTaskComment);
      setSuccess(true);
    } catch (error) {
      setSuccess(false)
      console.error('Error creating taskComment:', error);
      setError('Error creating taskComment');
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  };

  const updateTaskComment = async (taskCommentId: number, taskComment: Partial<TaskComment>) => {
    setMethod("updateTaskComment");
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const updatedTaskComment = await TaskCommentService.update(taskCommentId, taskComment);
      setTaskComment(updatedTaskComment);
      setSuccess(true);
    } catch (error) {
      setSuccess(false)
      console.error(`Error updating taskComment with id ${taskCommentId}:`, error);
      setError('Error updating taskComment');
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  };

  const deleteTaskComment = async (taskCommentId: number) => {
    setMethod("deleteTaskComment");
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await TaskCommentService.destroy(taskCommentId);
      setSuccess(true);
    } catch (error) {
      setSuccess(false)
      console.error(`Error deleting taskComment with id ${taskCommentId}:`, error);
      setError('Error deleting taskComment');
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    taskComment,
    taskComments,
    loading,
    error,
    success,
    method,
    fetchTaskComment,
    fetchTaskComments,
    createTaskComment,
    updateTaskComment,
    deleteTaskComment,
  };
};
