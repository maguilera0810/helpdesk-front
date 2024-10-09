import { Priority } from '../interfaces/ModelInterfaces';
import BaseCrudService from './BaseCrudService';

export class PriorityService extends BaseCrudService<Priority> {
  private static instance: PriorityService;

  private constructor() {
    super(`/api/common/priority/`);
  }

  public static getInstance(): PriorityService {
    if (!PriorityService.instance) {
      PriorityService.instance = new PriorityService();
    }
    return PriorityService.instance;
  }

}

export default PriorityService.getInstance();
