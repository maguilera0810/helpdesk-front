import { IssueComment } from '../../interfaces/ModelInterfaces';
import BaseCrudService from '../core/BaseCrudService';


export class IssueCommentService extends BaseCrudService<IssueComment> {
  private static instance: IssueCommentService;

  private constructor() {
    super(`/api/management/task-comment/`);
  }

  public static getInstance(): IssueCommentService {
    if (!IssueCommentService.instance) {
      IssueCommentService.instance = new IssueCommentService();
    }
    return IssueCommentService.instance;
  }

}

export default IssueCommentService.getInstance();
