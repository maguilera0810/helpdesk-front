import { Category } from "./ModelInterfaces";

export interface ICategoryState {
  category: Category | null;
  categories: Category[];
  setCategory: (category: Category | null) => void;
  setCategories: (categories: Category[]) => void;
}