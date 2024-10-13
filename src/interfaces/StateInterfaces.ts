import { Dayjs } from 'dayjs';
import { Token } from '../interfaces/AuthInterfaces';
import { Permission, Priority, Role, Schedule, Task, User, UserTask } from '../interfaces/ModelInterfaces';
import { Category } from "./ModelInterfaces";


interface BaseState {
  clearState?: () => void
}

interface ICallback {
  callback?: (fn: any) => void
  setCallback?: (callback: (fn: any) => void) => void
}

export interface ITaskState extends BaseState, ICallback {
  task: Task | null;
  tasks: Task[];
  userTasks: UserTask[];
  schedule: Schedule | null;
  currDate: Dayjs | null;
  startAt: Dayjs | null;
  endAt: Dayjs | null;
  setTask: (task: Task | null) => void;
  setTasks: (tasks: Task[]) => void;
  setUserTasks: (userTasks: UserTask[]) => void;
  setSchedule: (schedule: Schedule | null) => void;
  setCurrDate: (date: Dayjs | null) => void;
  setStartAt: (date: Dayjs | null) => void;
  setEndAt: (date: Dayjs | null) => void;
  clearTaks: () => void;
}

export interface CategoryState extends BaseState {
  category: Category | null;
  categories: Category[];
  setCategory: (category: Category | null) => void;
  setCategories: (categories: Category[]) => void;
}
export interface PriorityState extends BaseState {
  priority?: Priority;
  priorities: Priority[];
  setPriority: (priority?: Priority) => void;
  setPriorities: (priorities: Priority[]) => void;
}

export interface PermissionState extends BaseState {
  permission?: Permission;
  permissions: Permission[];
  setPermission: (permission?: Permission) => void;
  setPermissions: (permissions: Permission[]) => void;
}

export interface RoleState extends BaseState {
  role?: Role;
  roles: Role[];
  setRole: (role?: Role) => void;
  setRoles: (roles: Role[]) => void;
}
export interface GlobalDataState extends PriorityState, CategoryState, PermissionState {
  reload: boolean;
  reloadPermission: boolean;
  reloadCategory: boolean;
  reloadPriority: boolean;
  setReload: (reload: boolean, reloadType?: 'permission' | 'category' | 'priority') => void;
}

export interface IAuthState extends BaseState {
  user: User | null;
  token: Token | null;
  setUser: (user: User | null) => void;
  setToken: (token: Token | null) => void;
  logout: () => void;
}

export interface IUserState extends BaseState {
  user: User | null;
  users: User[];
  setUser: (user: User | null) => void;
  setUsers: (users: User[]) => void;
}


export interface IFilterState extends BaseState {
  filters: { [key: string]: any };
  setFilters: (filters: { [key: string]: any }) => void;
  clearFilters: () => void;
}

export interface IUIState extends BaseState {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
}


export interface NavbarState {
  expandedItems: string[];
  toggleItem: (item: string) => void;
  isItemExpanded: (item: string) => boolean;
}