import { Issue } from '../interfaces/ModelInterfaces';
import BaseCrudService from './BaseCrudService';

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

}

export default IssueService.getInstance();
