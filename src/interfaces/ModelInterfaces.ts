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
  type: string; // 'emergency' | 'normal'; // Asumiendo que puede haber otros tipos
  status: string; // 'to_do' | 'in_progress' | 'done'; // Asumiendo que puede haber otros estados
  priority: string; // 'highest' | 'high' | 'medium' | 'low' | 'lowest'; // Asumiendo que puede haber otros niveles de prioridad
  created_by: number | Partial<User>;
  responsible: number | Partial<User>;
  team: number[] | Partial<User>[];
  categories: number[] | Partial<Category>[];
  plan?: number; // Plan
  issue?: number;
  scheduled: number; //TODO ANALIZAR
  createdAt: Date | null; //
  updatedAt: Date | null; //
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
  type: string;
  color: string;
  relations: number[];
}

