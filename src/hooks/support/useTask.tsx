import { useCallback, useState } from 'react';
import { Schedule, Task, UserTask } from '../../interfaces/ModelInterfaces';
import { TaskScheduleRequest, TrackingTasksRequest } from '../../interfaces/RequestInterfaces';
import TaskService from '../../services/support/TaskService';
import { methodTask } from '../../types/methodTypes';



export const useTask = () => {
  const [task, setTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [method, setMethod] = useState<methodTask | undefined>();
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
    }
  }, []);

  const fetchSchedule = useCallback(async (body: TaskScheduleRequest) => {
    setMethod("fetchTasks");
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const resp = await TaskService.retrieveSchedules(body);
      setSchedule(resp);
      setSuccess(true);
    } catch (error) {
      setSuccess(false)
      console.error('Error fetching user tasks:', error);
      setError('Error fetching user tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTrackingTasks = useCallback(async (body: TrackingTasksRequest) => {
    setMethod("fetchTrackingTasks");
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const resp = await TaskService.trackingTasks(body);
      setSchedule(resp);
      setSuccess(true);
    } catch (error) {
      setSuccess(false)
      console.error('Error fetching user tasks:', error);
      setError('Error fetching user tasks');
    } finally {
      setLoading(false);
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
      setLoading(false);
    }
  };

  return {
    task,
    tasks,
    schedule,
    loading,
    error,
    success,
    method,
    fetchTask,
    fetchTasks,
    fetchSchedule,
    fetchTrackingTasks,
    setSchedule,
    createTask,
    updateTask,
    deleteTask,
  };
};
