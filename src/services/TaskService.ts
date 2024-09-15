import { Task, UserTask } from '../interfaces/ModelInterfaces';
import { TaskScheduleRequest } from '../interfaces/RequestInterfaces';
import { keysToCamel, keysToSnake } from '../utils/caseUtils';
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

  public async retrieveSchedules(item: TaskScheduleRequest): Promise<UserTask[]> {
    try {
      const response = await this.axiosInstance.post<UserTask[]>(`schedules/`, keysToSnake(item));
      return keysToCamel(response.data);
    } catch (error) {
      console.error('Error creating :', error);// TODO ONLY FOR DEVELOPMENT, DELETE ERROR LOGS
      throw error;
    }
  }

}

export default TaskService.getInstance();
