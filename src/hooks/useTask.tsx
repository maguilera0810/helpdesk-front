import { useCallback, useState } from 'react';
import { Task } from '../interfaces/ModelInterfaces';
import TaskService from '../services/TaskService';


export const useTask = () => {
  const [task, setTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [method, setMethod] = useState<"fetchTasks" | "fetchTask" | "createTask" | "updateTask" | "deleteTask" | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);

  const fetchTasks = useCallback(async (filters: { [key: string]: any } = {}) => {
    setMethod("fetchTasks");
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const taskList = await TaskService.list(filters);
      setTasks(taskList);
      setSuccess(true);
    } catch (error) {
      setSuccess(false)
      console.error('Error fetching tasks:', error);
      setError('Error fetching tasks');
    } finally {
      setLoading(false);
      setMethod(null);
    }
  }, []);

  const fetchTask = async (taskId: number) => {
    setMethod("fetchTask");
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const task = await TaskService.retrieve(taskId);
      setTask(task);
      setSuccess(true);
      return task;
    } catch (error) {
      setSuccess(false)
      console.error(`Error fetching task with id ${taskId}:`, error);
      setError('Error fetching task');
    } finally {
      setMethod(null);
      setLoading(false);
    }
  };

  const createTask = async (task: Partial<Task>) => {
    setMethod("createTask");
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const newTask = await TaskService.create(task);
      setTask(newTask);
      setSuccess(true);
    } catch (error) {
      setSuccess(false)
      console.error('Error creating task:', error);
      setError('Error creating task');
      setSuccess(null);
    } finally {
      setMethod(null);
      setLoading(false);
    }
  };

  const updateTask = async (taskId: number, task: Partial<Task>) => {
    setMethod("updateTask");
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const updatedTask = await TaskService.update(taskId, task);
      setTask(updatedTask);
      setSuccess(true);
    } catch (error) {
      setSuccess(false)
      console.error(`Error updating task with id ${taskId}:`, error);
      setError('Error updating task');
      setSuccess(null);
    } finally {
      setMethod(null);
      setLoading(false);
    }
  };

  const deleteTask = async (taskId: number) => {
    setMethod("deleteTask");
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await TaskService.destroy(taskId);
      setSuccess(true);
    } catch (error) {
      setSuccess(false)
      console.error(`Error deleting task with id ${taskId}:`, error);
      setError('Error deleting task');
      setSuccess(null);
    } finally {
      setMethod(null);
      setLoading(false);
    }
  };

  return {
    task,
    tasks,
    loading,
    error,
    success,
    method,
    fetchTasks,
    fetchTask,
    createTask,
    updateTask,
    deleteTask,
  };
};
