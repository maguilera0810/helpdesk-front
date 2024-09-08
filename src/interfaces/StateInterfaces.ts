import { Token } from '../interfaces/AuthInterfaces';
import { Task, User } from '../interfaces/ModelInterfaces';
import { Category } from "./ModelInterfaces";


export interface ITaskState {
  task: Task | null;
  tasks: Task[];
  setTask: (task: Task | null) => void;
  setTasks: (tasks: Task[]) => void;
  clearTaks: () => void;
}

export interface ICategoryState {
  category: Category | null;
  categories: Category[];
  setCategory: (category: Category | null) => void;
  setCategories: (categories: Category[]) => void;
}

export interface IAuthState {
  token: Token | null;
  user: User | null;
  setUser: (user: User | null) => void;
  setToken: (token: Token | null) => void;
  logout: () => void;
}

export interface IFilterState {
  filters: { [key: string]: any };
  setFilters: (filters: { [key: string]: any }) => void;
  clearFilters: () => void;
}

export interface IUIState {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
}