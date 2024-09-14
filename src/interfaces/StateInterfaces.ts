import { Token } from '../interfaces/AuthInterfaces';
import { Task, User } from '../interfaces/ModelInterfaces';
import { Category } from "./ModelInterfaces";


interface IBaseState {
  clearState?: () => void
}

interface ICallback {
  callback?: (fn: any) => void
  setCallback?: (callback: (fn: any) => void) => void
}

export interface ITaskState extends IBaseState, ICallback {
  task: Task | null;
  tasks: Task[];
  setTask: (task: Task | null) => void;
  setTasks: (tasks: Task[]) => void;
  clearTaks: () => void;
}

export interface ICategoryState extends IBaseState {
  category: Category | null;
  categories: Category[];
  setCategory: (category: Category | null) => void;
  setCategories: (categories: Category[]) => void;
}

export interface IAuthState extends IBaseState {
  user: User | null;
  token: Token | null;
  setUser: (user: User | null) => void;
  setToken: (token: Token | null) => void;
  logout: () => void;
}

export interface IUserState extends IBaseState {
  user: User | null;
  users: User[];
  setUser: (user: User | null) => void;
  setUsers: (users: User[]) => void;
}


export interface IFilterState extends IBaseState {
  filters: { [key: string]: any };
  setFilters: (filters: { [key: string]: any }) => void;
  clearFilters: () => void;
}

export interface IUIState extends IBaseState {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
}