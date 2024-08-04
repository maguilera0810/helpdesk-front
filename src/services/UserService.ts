import Environment from '../environments/Environment';
import { User } from '../interfaces/AuthInterfaces';
import { keysToCamel, keysToSnake } from '../utils/caseUtils';
import BaseService from './BaseService';

const { apiUrl } = Environment;

export class UserService extends BaseService {
  private static instance: UserService;

  private constructor() {
    super(`${apiUrl}/api/auth/admin-user/`);
  }

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  public async list(filters: { [key: string]: any } = {}): Promise<User[]> {
    try {
      const response = await this.axiosInstance.get<User[]>('', {
        headers: this.getAuthHeaders(),
        params: keysToSnake(filters),
      });
      return keysToCamel(response.data);
    } catch (error) {
      console.error('SERVICE: Error fetching users:', error);
      throw error;
    }
  }

  public async retrieve(userId: number): Promise<User> {
    try {
      const response = await this.axiosInstance.get<User>(`${userId}`,
        { headers: this.getAuthHeaders() });
      return keysToCamel(response.data);
    } catch (error) {
      console.error(`SERVICE: Error fetching user with id ${userId}:`, error);
      throw error;
    }
  }

  public async create(user: Partial<User>): Promise<User> {
    try {
      const response = await this.axiosInstance.post<User>('', keysToSnake(user),
        { headers: this.getAuthHeaders() });
      return keysToCamel(response.data);
    } catch (error) {
      console.error('SERVICE: Error creating user:', error);
      throw error;
    }
  }

  public async update(userId: number, user: Partial<User>): Promise<User> {
    try {
      const response = await this.axiosInstance.put<User>(`${userId}`, keysToSnake(user),
        { headers: this.getAuthHeaders() });
      return keysToCamel(response.data);
    } catch (error) {
      console.error(`SERVICE: Error updating user with id ${userId}:`, error);
      throw error;
    }
  }

  public async destroy(userId: number): Promise<void> {
    try {
      await this.axiosInstance.delete(`${userId}`, { headers: this.getAuthHeaders() });
    } catch (error) {
      console.error(`SERVICE: Error deleting user with id ${userId}:`, error);
      throw error;
    }
  }
}

export default UserService.getInstance();
