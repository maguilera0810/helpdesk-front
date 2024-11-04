import { keysToCamel, keysToSnake } from '../../utils/caseUtils';
import BaseAuthService from '../core/BaseAuthService';


export class DataService extends BaseAuthService {
  private static instance: DataService;

  private constructor() {
    super(`/api/analytics/data/`);
  }

  public static getInstance(): DataService {
    if (!DataService.instance) {
      DataService.instance = new DataService();
    }
    return DataService.instance;
  }

  public async getData(filters: { [key: string]: any } = {}): Promise<any> {
    try {
      const response = await this.axiosInstance.get<any>('',
        { params: keysToSnake(filters) });
      return keysToCamel(response.data);
    } catch (error) {
      console.error('Error fetching kpis:', error);
      throw error;
    }
  }

}

export default DataService.getInstance();
