import { CategoryType } from '../../interfaces/ModelInterfaces';
import BaseCrudService from '../core/BaseCrudService';

export class CategoryTypeService extends BaseCrudService<CategoryType> {
  private static instance: CategoryTypeService;

  private constructor() {
    super(`/api/common/category-type/`);
  }

  public static getInstance(): CategoryTypeService {
    if (!CategoryTypeService.instance) {
      CategoryTypeService.instance = new CategoryTypeService();
    }
    return CategoryTypeService.instance;
  }

}

export default CategoryTypeService.getInstance();
