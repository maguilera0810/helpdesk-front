import { Permission } from '../interfaces/ModelInterfaces';
import BaseCrudService from './core/BaseCrudService';

export class PermissionService extends BaseCrudService<Permission> {
  private static instance: PermissionService;

  private constructor() {
    super(`/api/auth/permission/`);
  }

  public static getInstance(): PermissionService {
    if (!PermissionService.instance) {
      PermissionService.instance = new PermissionService();
    }
    return PermissionService.instance;
  }

}

export default PermissionService.getInstance();
