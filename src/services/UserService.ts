import axios from 'axios';
import { User } from '../interfaces/AuthInterfaces';
import Environment from '../environments/Environment';
import useAuthStore from '../stores/useAuthStore';

import { keysToCamel, keysToSnake } from '../utils/caseUtils';

const { apiUrl } = Environment;

export class UserService {
  private static instance: UserService;
  private url: string;

  private constructor() {
    this.url = `${apiUrl}/api/auth/admin-user/`;
  }

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  private getSavedToken(): string | null {
    // Obtener el token desde el store de Zustand
    return useAuthStore.getState().token?.access || null;
  }

  private getAuthHeaders() {
    const token = this.getSavedToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  public async list(): Promise<User[]> {
    try {
      const response = await axios.get<User[]>(this.url, { headers: this.getAuthHeaders() });
      return keysToCamel(response.data);
    } catch (error) {
      console.error('SERVICE: Error fetching users:', error);
      throw error;
    }
  }

  public async retrieve(userId: number): Promise<User> {
    try {
      const response = await axios.get<User>(`${this.url}${userId}`, { headers: this.getAuthHeaders() });
      return keysToCamel(response.data);
    } catch (error) {
      console.error(`SERVICE: Error fetching user with id ${userId}:`, error);
      throw error;
    }
  }

  public async create(user: Partial<User>): Promise<User> {
    try {
      const response = await axios.post<User>(this.url, keysToSnake(user), { headers: this.getAuthHeaders() });
      return keysToCamel(response.data);
    } catch (error) {
      console.error('SERVICE: Error creating user:', error);
      throw error;
    }
  }

  public async update(userId: number, user: Partial<User>): Promise<User> {
    try {
      const response = await axios.put<User>(`${this.url}${userId}`, keysToSnake(user), { headers: this.getAuthHeaders() });
      return keysToCamel(response.data);
    } catch (error) {
      console.error(`SERVICE: Error updating user with id ${userId}:`, error);
      throw error;
    }
  }

  public async destroy(userId: number): Promise<void> {
    try {
      await axios.delete(`${this.url}${userId}`, { headers: this.getAuthHeaders() });
    } catch (error) {
      console.error(`SERVICE: Error deleting user with id ${userId}:`, error);
      throw error;
    }
  }
}

export default UserService.getInstance();
