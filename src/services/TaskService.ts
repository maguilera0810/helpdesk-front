import { User } from '../interfaces/ModelInterfaces';
import BaseCrudService from './BaseCrudService';

export class TaskService extends BaseCrudService<User> {
  private static instance: TaskService;

  private constructor() {
    super(`/api/auth/admin-user/`);
  }

  public static getInstance(): TaskService {
    if (!TaskService.instance) {
      TaskService.instance = new TaskService();
    }
    return TaskService.instance;
  }

}

export default TaskService.getInstance();
