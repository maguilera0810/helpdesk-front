import { DataAnalytics } from '../../interfaces/ModelInterfaces';
import { keysToCamel } from '../../utils/caseUtils';
import { encodeBase64 } from '../../utils/cryptoUtil';
import BaseAuthService from '../core/BaseAuthService';

export class DataAnalyticsService extends BaseAuthService {
  private static instance: DataAnalyticsService;

  private constructor() {
    super(`/api/analytics/data/`);
  }

  public static getInstance(): DataAnalyticsService {
    if (!DataAnalyticsService.instance) {
      DataAnalyticsService.instance = new DataAnalyticsService();
    }
    return DataAnalyticsService.instance;
  }

  public async getData(filters: { [key: string]: any } = {}): Promise<DataAnalytics> {
    try {
      const response = await this.axiosInstance.get<DataAnalytics>('',
        { params: { "q": encodeBase64(filters, 2) } });
      return keysToCamel(response.data);
    } catch (error) {
      console.error('Error fetching DataAnalytics:', error);
      throw error;
    }
  }

}

export default DataAnalyticsService.getInstance();
