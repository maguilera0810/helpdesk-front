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

export interface Token {
  refresh?: string;
  access?: string;
}