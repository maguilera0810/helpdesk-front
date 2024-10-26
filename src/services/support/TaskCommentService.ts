import { TaskComment } from '../../interfaces/ModelInterfaces';
import BaseCrudService from '../core/BaseCrudService';


export class TaskCommentService extends BaseCrudService<TaskComment> {
  private static instance: TaskCommentService;

  private constructor() {
    super(`/api/management/task-comment/`);
  }

  public static getInstance(): TaskCommentService {
    if (!TaskCommentService.instance) {
      TaskCommentService.instance = new TaskCommentService();
    }
    return TaskCommentService.instance;
  }

}

export default TaskCommentService.getInstance();
