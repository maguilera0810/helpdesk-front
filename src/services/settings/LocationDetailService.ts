import { LocationDetail } from '../../interfaces/ModelInterfaces';
import BaseCrudService from '../core/BaseCrudService';

export class LocationDetailService extends BaseCrudService<LocationDetail> {
  private static instance: LocationDetailService;

  private constructor() {
    super(`/api/common/location/`);
  }

  public static getInstance(): LocationDetailService {
    if (!LocationDetailService.instance) {
      LocationDetailService.instance = new LocationDetailService();
    }
    return LocationDetailService.instance;
  }
}

export default LocationDetailService.getInstance();


