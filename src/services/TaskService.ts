import { Task } from '../interfaces/ModelInterfaces';
import BaseCrudService from './BaseCrudService';

export class TaskService extends BaseCrudService<Task> {
  private static instance: TaskService;

  private constructor() {
    super(`/api/management/task/`);
  }

  public static getInstance(): TaskService {
    if (!TaskService.instance) {
      TaskService.instance = new TaskService();
    }
    return TaskService.instance;
  }

}

export default TaskService.getInstance();
