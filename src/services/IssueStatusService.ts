import { IssueStatus } from '../interfaces/ModelInterfaces';
import BaseCrudService from './BaseCrudService';

export class IssueStatusService extends BaseCrudService<IssueStatus> {
  private static instance: IssueStatusService;

  private constructor() {
    super(`/api/management/issue-status/`);
  }

  public static getInstance(): IssueStatusService {
    if (!IssueStatusService.instance) {
      IssueStatusService.instance = new IssueStatusService();
    }
    return IssueStatusService.instance;
  }

}

export default IssueStatusService.getInstance();
