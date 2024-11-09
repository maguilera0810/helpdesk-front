import { LocationInfo } from '../../interfaces/ModelInterfaces';
import BaseCrudService from '../core/BaseCrudService';

export class LocationService extends BaseCrudService<LocationInfo> {
  private static instance: LocationService;

  private constructor() {
    super(`/api/common/location/`);
  }

  public static getInstance(): LocationService {
    if (!LocationService.instance) {
      LocationService.instance = new LocationService();
    }
    return LocationService.instance;
  }
}

export default LocationService.getInstance();


