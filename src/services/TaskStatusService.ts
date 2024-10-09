import { TaskStatus } from '../interfaces/ModelInterfaces';
import BaseCrudService from './BaseCrudService';

export class TaskStatusService extends BaseCrudService<TaskStatus> {
  private static instance: TaskStatusService;

  private constructor() {
    super(`/api/management/task-status/`);
  }

  public static getInstance(): TaskStatusService {
    if (!TaskStatusService.instance) {
      TaskStatusService.instance = new TaskStatusService();
    }
    return TaskStatusService.instance;
  }

}

export default TaskStatusService.getInstance();
