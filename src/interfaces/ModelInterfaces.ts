import { BaseInfo } from "./CoreInterfaces";


export interface UserProfile {
  document: string;
  documentType: string;
  phone: string;
  address: string;
  isAvailable: boolean;
}

export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  profile: Partial<UserProfile>;
  password?: string;
  groups: number[];
  roles?: number[]; // controlar 
}

export interface Role extends BaseInfo {
  id: number;
  permissions: number[];
}

export interface Permission extends BaseInfo {
  id: number;
  permissions: number[];
}


export interface Task extends BaseInfo {
  id: number;
  code: string;
  type: string;
  status: string;
  priority: string;
  created_by: number;
  responsible: number;
  team: number[];
  categories: number[] | Partial<Category>[];
  plan?: number;
  issue?: number;
  createdAt: Date | null;
  updatedAt: Date | null;
  startAt: Date | null;
  endAt: Date | null;
}
export interface Status extends BaseInfo {
  id: number;
  color: string;
}
export interface TaskStatus extends Status {
}
export interface IssueStatus extends Status {
}
export interface Priority extends BaseInfo {
  id: number;
  color: string;
  value: number;
  icon: string;
}

export interface ScheduleTask extends Task {
  hasCollision?: boolean;
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


export interface Issue extends BaseInfo {
  id?: number;
  code: string;
  status: string; // 'to_do' | 'in_progress' | 'done'; // Asumiendo que puede haber otros estados
  contactEmail: string;
  contactPhone: string;
  requestingUnit: number;
  task?: number;
  categories: number[];
  createdBy: number;
  createdAt: Date | null; //
  updatedAt: Date | null; //
}

export interface Category extends BaseInfo {
  id: number;
  code: string;
  type: number;
  color: string;
  relations: number[];
}

export interface CategoryType extends BaseInfo {
  id: number;
}

