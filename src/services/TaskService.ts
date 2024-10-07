import { Schedule, Task } from '../interfaces/ModelInterfaces';
import { TaskScheduleRequest, TrackingTasksRequest } from '../interfaces/RequestInterfaces';
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

  public async retrieveSchedules(item: TaskScheduleRequest): Promise<Schedule> {
    try {
      const response = await this.axiosInstance.post<Schedule>(`schedule/`, keysToSnake(item));
      return keysToCamel(response.data);
    } catch (error) {
      console.error('Error retrieveSchedules :', error);// TODO ONLY FOR DEVELOPMENT, DELETE ERROR LOGS
      throw error;
    }
  }

  public async trackingTasks(item: TrackingTasksRequest): Promise<Schedule> {
    try {
      const response = await this.axiosInstance.post<Schedule>(`tracking/`, keysToSnake(item));
      return keysToCamel(response.data);
    } catch (error) {
      console.error('Error trackingTasks :', error);// TODO ONLY FOR DEVELOPMENT, DELETE ERROR LOGS
      throw error;
    }
  }
}

export default TaskService.getInstance();
