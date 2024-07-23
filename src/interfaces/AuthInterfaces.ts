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
}


export interface User2 {
  id: number;
  username: string; // cedula
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  cellphone?: string;
}

export interface Role {
  id: number;
  name: string;
  description: string;
  settings: object;
  menu: object;
}

export interface Setting {
  id: number;
  name: string;
  description: string;
  is_active: boolean
}

export interface Token {
  refresh?: string;
  access?: string;
}