

export interface User {
  id: number;
  username: string; // cedula
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  cellphone?: string;
  role?: Role;
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