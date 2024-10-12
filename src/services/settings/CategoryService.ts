import { Category } from '../../interfaces/ModelInterfaces';
import BaseCrudService from '../core/BaseCrudService';

export class CategoryService extends BaseCrudService<Category> {
  private static instance: CategoryService;

  private constructor() {
    super(`/api/common/category/`);
  }

  public static getInstance(): CategoryService {
    if (!CategoryService.instance) {
      CategoryService.instance = new CategoryService();
    }
    return CategoryService.instance;
  }

}

export default CategoryService.getInstance();
