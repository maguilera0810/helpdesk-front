import { Issue } from '../interfaces/ModelInterfaces';
import { keysToCamel } from '../utils/caseUtils';
import BaseCrudService from './core/BaseCrudService';

export class IssueService extends BaseCrudService<Issue> {
  private static instance: IssueService;

  private constructor() {
    super(`/api/management/issue/`);
  }

  public static getInstance(): IssueService {
    if (!IssueService.instance) {
      IssueService.instance = new IssueService();
    }
    return IssueService.instance;
  }

  public async createTask(id: number): Promise<number> {
    try {
      const response = await this.axiosInstance.post<number>(`${id}/create-task/`);
      return keysToCamel(response.data);
    } catch (error) {
      console.error('Error creating :', error);// TODO ONLY FOR DEVELOPMENT, DELETE ERROR LOGS
      throw error;
    }
  }

}

export default IssueService.getInstance();
