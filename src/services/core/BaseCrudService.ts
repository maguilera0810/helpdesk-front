import { keysToCamel, keysToSnake } from '../../utils/caseUtils';
import BaseAuthService from './BaseAuthService';


abstract class BaseCrudService<T> extends BaseAuthService {

  constructor(endpoint: string) {
    super(endpoint);
  }

  public async list(filters: { [key: string]: any } = {}): Promise<T[]> {
    try {
      const response = await this.axiosInstance.get<T[]>('',
        { params: keysToSnake(filters) });
      return keysToCamel(response.data);
    } catch (error) {
      console.error('Error fetching list:', error);
      throw error;
    }
  }

  public async retrieve(id: number): Promise<T> {
    try {
      const response = await this.axiosInstance.get<T>(`${id}/`);
      return keysToCamel(response.data);
    } catch (error) {
      console.error(`Error fetching item with id ${id}:`, error);
      throw error;
    }
  }

  public async create(item: Partial<T>): Promise<T> {
    try {
      const response = await this.axiosInstance.post<T>('', keysToSnake(item));
      return keysToCamel(response.data);
    } catch (error) {
      console.error('Error creating item:', error);
      throw error;
    }
  }

  public async update(id: number, item: Partial<T>): Promise<T> {
    try {
      const response = await this.axiosInstance.put<T>(`${id}/`, keysToSnake(item));
      return keysToCamel(response.data);
    } catch (error) {
      console.error(`Error updating item with id ${id}:`, error);
      throw error;
    }
  }

  public async destroy(id: number): Promise<void> {
    try {
      await this.axiosInstance.delete(`${id}/`);
    } catch (error) {
      console.error(`Error deleting item with id ${id}:`, error);
      throw error;
    }
  }
}

export default BaseCrudService;
