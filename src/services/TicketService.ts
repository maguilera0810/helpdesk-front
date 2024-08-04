import { User } from '../interfaces/ModelInterfaces';
import BaseCrudService from './BaseCrudService';

export class TicketService extends BaseCrudService<User> {
  private static instance: TicketService;

  private constructor() {
    super(`/api/auth/admin-user/`);
  }

  public static getInstance(): TicketService {
    if (!TicketService.instance) {
      TicketService.instance = new TicketService();
    }
    return TicketService.instance;
  }

}

export default TicketService.getInstance();
