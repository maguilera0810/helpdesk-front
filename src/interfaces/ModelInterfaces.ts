// AUTHENTICATION


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
}

export interface Task {
  id: number;
  title: string;
  description: string;
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


export interface Issue {
  id?: number;
  code: string;
  title: string;
  description: string;
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

export interface Category {
  id: number;
  title: string;
  description: string;
  code: string;
  type: number;
  color: string;
  relations: number[];
}

export interface CategoryType {
  id: number;
  title: string;
  description: string;
}

