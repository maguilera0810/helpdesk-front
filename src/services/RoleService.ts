import { Role } from '../interfaces/ModelInterfaces';
import BaseCrudService from './core/BaseCrudService';

export class RoleService extends BaseCrudService<Role> {
  private static instance: RoleService;

  private constructor() {
    super(`/api/auth/role/`);
  }

  public static getInstance(): RoleService {
    if (!RoleService.instance) {
      RoleService.instance = new RoleService();
    }
    return RoleService.instance;
  }

}

export default RoleService.getInstance();
