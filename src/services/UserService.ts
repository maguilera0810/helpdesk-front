import { User } from '../interfaces/ModelInterfaces';
import BaseCrudService from './BaseCrudService';


export class UserService extends BaseCrudService<User> {
  private static instance: UserService;

  private constructor() {
    super(`/api/auth/admin-user/`);
  }

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

}

export default UserService.getInstance();
