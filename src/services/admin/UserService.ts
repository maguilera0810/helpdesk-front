import { User } from '../../interfaces/ModelInterfaces';
import { keysToCamel, keysToSnake } from '../../utils/caseUtils';
import BaseCrudService from '../core/BaseCrudService';


export class UserService extends BaseCrudService<User> {
  private static instance: UserService;

  private constructor() {
    super(`/api/auth/user/`);
  }

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  public async listLight(filters: { [key: string]: any } = {}): Promise<Partial<User>[]> {
    try {
      const response = await this.axiosInstance.get<Partial<User>[]>('',
        { params: keysToSnake(filters) });
      return keysToCamel(response.data);
    } catch (error) {
      console.error('Error fetching list light:', error);
      throw error;
    }
  }

  public async userInfo(): Promise<User> {
    const response = await this.axiosInstance.get<User>(`info/`);
    return keysToCamel(response.data);
  }


}

export default UserService.getInstance();
