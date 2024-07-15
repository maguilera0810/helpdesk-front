import {
  User,
  Token
} from './ModelInterfaces';

export interface GlobalState {
  isMenuOpen: boolean;
  subMenuIndices: number[];
  subSubMenuIndices: number[];
}



interface AuthState {
  token: string | null;
  user: User | null;
  setToken: (token: Token | null) => void;
  setUser: (user: User | null) => void;
}

