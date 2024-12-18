import { Dayjs } from 'dayjs';
import { LatLng } from 'leaflet';
import { Token } from '../interfaces/AuthInterfaces';
import { Issue, IssueComment, LocationInfo, Permission, Priority, Role, Schedule, Task, TaskComment, User, UserTask } from '../interfaces/ModelInterfaces';
import { IssueStatusDataType, TaskStatusDataType } from '../types/dataTypes';
import { GroupedPermission, GroupedPermissionType } from '../types/groupTypes';
import { ReloadType } from '../types/methodTypes';
import { modeType } from '../types/uiTypes';
import { LocationData } from './GlobalInterfaces';
import { Category } from "./ModelInterfaces";


interface BaseState {
  clearState?: () => void
}

interface ICallback {
  callback?: (fn: any) => void
  setCallback?: (callback: (fn: any) => void) => void
}

export interface TaskState extends BaseState, ICallback {
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
export interface TaskCommentState extends BaseState {
  task?: Task;
  taskComment?: TaskComment;
  taskComments: TaskComment[];
  setTask: (task: Task) => void;
  setTaskComment: (taskComment?: TaskComment) => void;
  setTaskComments: (taskComments: TaskComment[]) => void;
}
export interface IssueCommentState extends BaseState {
  issue?: Issue;
  issueComment?: IssueComment;
  issueComments: IssueComment[];
  setIssue: (issue: Issue) => void;
  setIssueComment: (issueComment?: IssueComment) => void;
  setIssueComments: (issueComments: IssueComment[]) => void;
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
export interface LocationInfoState extends BaseState {
  location?: LocationInfo;
  setLocation: (value?: LocationInfo) => void;
  locationData?: LocationData;
  setLocationData: (value?: LocationData) => void;
  locations: LocationInfo[];
  setLocations: (value: LocationInfo[]) => void;
  position?: LatLng;
  setPosition: (value?: LatLng) => void;
}

export interface PermissionState extends BaseState {
  permission?: Permission;
  permissions: Permission[];
  setPermission: (permission?: Permission) => void;
  setPermissions: (permissions: Permission[]) => void;
}


export interface GroupedPermissionState extends BaseState {
  groupedPermissions?: GroupedPermission;
  getFlatPermissions: () => Permission[];
  getGroupedPermission: (group: GroupedPermissionType) => Permission[];
  setGroupedPermission: (group: GroupedPermissionType, permissions: Permission[]) => void;
  setGroupedPermissions: (groupPermissions?: GroupedPermission) => void;
}

export interface RoleState extends BaseState {
  role?: Role;
  roles: Role[];
  setRole: (role?: Role) => void;
  setRoles: (roles: Role[]) => void;
}
export interface GlobalDataState extends
  BaseState,
  Pick<UserState, 'lightUsers' | 'setLightUsers'>,
  Pick<PriorityState, 'priorities' | 'setPriorities'>,
  Pick<CategoryState, 'categories' | 'setCategories'>,
  Pick<GroupedPermissionState, 'groupedPermissions' | 'getFlatPermissions' | 'setGroupedPermissions' | 'getGroupedPermission'> {
  reload: boolean;
  reloadUser: boolean;
  reloadPriority: boolean;
  reloadCategory: boolean;
  reloadPermission: boolean;
  setReload: (reload: boolean, reloadType?: ReloadType) => void;
}

export interface IAuthState extends BaseState {
  user: User | null;
  token: Token | null;
  setUser: (user: User | null) => void;
  setToken: (token: Token | null) => void;
  logout: () => void;
}

export interface UserState extends BaseState {
  user: User | null;
  users: User[];
  lightUsers: Partial<User>[];
  setUser: (user: User | null) => void;
  setUsers: (users: User[]) => void;
  setLightUsers: (lightUsers: Partial<User>[]) => void;
}


export interface IFilterState extends BaseState {
  filters: { [key: string]: any };
  setFilters: (filters: { [key: string]: any }) => void;
  clearFilters: () => void;
}

export interface UIState extends BaseState {
  isDrawerOpen: boolean;
  mode: modeType;
  toggleDrawer: () => void;
  setMode: (mode: modeType) => void;
  toggleMode: () => void;
}


export interface NavbarState {
  expandedItems: string[];
  toggleItem: (item: string) => void;
  isItemExpanded: (item: string) => boolean;
}


export interface DataAnalyticsState extends BaseState {
  taskStatus?: TaskStatusDataType;
  issueStatus?: IssueStatusDataType;
  taskCategories: (Partial<Category> & { value: number })[];
  issueCategories: (Partial<Category> & { value: number })[];
  setTaskStatus: (value: TaskStatusDataType) => void;
  setIssueStatus: (value: IssueStatusDataType) => void;
  setTaskCategories: (value: (Partial<Category> & { value: number })[]) => void;
  setIssueCategories: (value: (Partial<Category> & { value: number })[]) => void;
}
