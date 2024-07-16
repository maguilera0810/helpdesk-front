import axios from 'axios';
import { Token, User } from '../interfaces/AuthInterfaces';
import useAuthStore from '../stores/useAuthStore';
import Environment from './../environments/Environment';

const { apiUrl, apiKey } = Environment;

class AuthService {
  private static instance: AuthService;
  private apiUrl: string;
  private apiKey: string;

  private constructor(apiUrl: string, apiKey: string) {
    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService(apiUrl, apiKey);
    }
    return AuthService.instance;
  }

  private getAuthHeaders() {
    const token = useAuthStore.getState().token?.access || null;
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  public async getToken(user: Partial<User>): Promise<Token | null> {
    const headers = { 'API-KEY': this.apiKey };
    try {
      const response = await axios.post<Token>(`${this.apiUrl}/api/auth/token/`, user, { headers });
      return response.data;
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      return null;
    }
  }

  public async fetchUser(): Promise<User | null> {
    try {
      const headers = this.getAuthHeaders();
      const response = await axios.get<User>(`${this.apiUrl}/api/auth/user/info/`, { headers });
      return response.data;
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
      return null;
    }
  }

  public async refreshToken(): Promise<Token | null> {
    const headers = this.getAuthHeaders();
    try {
      const response = await axios.post<Token>(
        `${this.apiUrl}/api/auth/token/refresh/`,
        {},
        { headers },
      );
      return response.data;
    } catch (error) {
      console.error('Error al renovar el token:', error);
      return null;
    }
  }

  public async verifyToken(): Promise<boolean> {
    const headers = this.getAuthHeaders();
    try {
      await axios.post(`${this.apiUrl}/api/auth/token/verify/`,
        {},
        { headers });
      return true;
    } catch (error) {
      console.error('El token no es válido:', error);
      return false;
    }
  }
}

export default AuthService.getInstance();
