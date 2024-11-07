import { IssueStatusDataType, TaskStatusDataType } from "../types/dataTypes";
import { GroupedPermissionType } from "../types/groupTypes";
import { BaseInfoModel, BaseModel } from "./CoreInterfaces";


export interface UserProfile extends BaseModel {
  document: string;
  documentType: string;
  phone: string;
  address: string;
  isAvailable: boolean;
}
export interface User extends BaseModel {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  profile: Partial<UserProfile>;
  password?: string;
  groups: number[];
  roles?: number[]; // controlar 
}
export interface Role extends BaseInfoModel {
  id: number;
  users: number[];
  permissions: number[];
  key: string;
}
export interface Permission extends BaseInfoModel {
  id: number;
  permissions: number[];
  group: GroupedPermissionType;
}

export interface Task extends BaseInfoModel {
  id: number;
  code: string;
  type: string;
  status: string;
  priority: number;
  createdBy: number;
  responsible: number;
  team: number[];
  categories: number[] | Partial<Category>[];
  plan?: number;
  issue?: number;
  createdAt: Date | null;
  updatedAt: Date | null;
  startAt: Date | null;
  endAt: Date | null;
  location?: number | Location;
}
export interface Priority extends BaseInfoModel {
  id: number;
  color: string;
  order: number;
  icon: string;
}
export interface ScheduleTask extends Task {
  hasCollision?: boolean;
}
export interface Issue extends BaseInfoModel {
  code: string;
  status: string;
  contactEmail: string;
  contactPhone: string;
  requestingUnit: number;
  task?: number;
  categories: number[];
  createdBy: number;
  createdAt: Date | null;
  updatedAt: Date | null;
  location?: number | Location;
}
export interface Comment extends BaseInfoModel {
  files: string[];
  createdBy: number | Partial<User>;
  createdAt: Date | null;
  updatedAt: Date | null;
}
export interface TaskComment extends Comment {
  task: number;
}
export interface IssueComment extends Comment {
  issue: number;
}

export interface Category extends BaseInfoModel {
  id: number;
  code: string;
  type: number;
  color: string;
  relations: number[];
}
export interface CategoryType extends BaseInfoModel {
  id: number;
}
export interface UserTask {
  userId: number;
  tasks: ScheduleTask[];
}
export interface Schedule {
  hasCollision?: boolean;
  minTime?: Date;
  maxTime?: Date;
  userTasks: UserTask[];
}

export interface Location extends BaseInfoModel {
  postalCode: string;
  lat: number;
  long: number;
  address: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}

// ANALYTICS

export interface DataAnalytics {
  taskStatus: TaskStatusDataType;
  issueStatus: IssueStatusDataType;
  taskCategories: (Partial<Category> & { value: number })[];
  issueCategories: (Partial<Category> & { value: number })[];
}
