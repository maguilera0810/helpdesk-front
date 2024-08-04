import { useCallback, useState } from 'react';
import { Task } from '../interfaces/ModelInterfaces';
import TaskService from '../services/TaskService';

export const useTask = () => {
  const [task, setTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const fetchTasks = useCallback(async (filters: { [key: string]: any } = {}) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const taskList = await TaskService.list(filters);
      setTasks(taskList);
      setSuccess(true);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError('Error fetching tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTask = async (taskId: number) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const task = await TaskService.retrieve(taskId);
      setTask(task);
      setSuccess(true);
      return task;
    } catch (error) {
      console.error(`Error fetching task with id ${taskId}:`, error);
      setError('Error fetching task');
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (task: Partial<Task>) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const newTask = await TaskService.create(task);
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setSuccess(true);
    } catch (error) {
      console.error('Error creating task:', error);
      setError('Error creating task');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (taskId: number, task: Partial<Task>) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const updatedTask = await TaskService.update(taskId, task);
      setTasks((prevTasks) =>
        prevTasks.map((u) => (u.id === taskId ? updatedTask : u))
      );
      setSuccess(true);
    } catch (error) {
      console.error(`Error updating task with id ${taskId}:`, error);
      setError('Error updating task');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (taskId: number) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await TaskService.destroy(taskId);
      setTasks((prevTasks) => prevTasks.filter((u) => u.id !== taskId));
      setSuccess(true);
    } catch (error) {
      console.error(`Error deleting task with id ${taskId}:`, error);
      setError('Error deleting task');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return {
    task,
    tasks,
    loading,
    error,
    success,
    fetchTasks,
    fetchTask,
    createTask,
    updateTask,
    deleteTask,
  };
};
