import axios from 'axios';
import { Token, User } from '../interfaces/AuthInterfaces';
import useAuthStore from '../stores/useAuthStore';
import { keysToCamel } from '../utils/caseUtils';
import Environment from './../environments/Environment';

const { apiUrl, apiKey } = Environment;

class AuthService {
  private static instance: AuthService;
  private apiKey: string;
  private url: string;

  private constructor() {
    this.url = `${apiUrl}/api/auth`;
    this.apiKey = apiKey;
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private getSavedToken(): string | null {
    // Obtener el token desde el store de Zustand
    return useAuthStore.getState().token?.access || null;
  }

  private getAuthHeaders() {
    const token = this.getSavedToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  public async getToken(user: Partial<User>): Promise<Token | null> {
    const headers = { 'API-KEY': this.apiKey };
    try {
      const response = await axios.post<Token>(`${this.url}/token/`, user, { headers });
      return response.data;
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      return null;
    }
  }

  public async fetchUser(): Promise<User | null> {
    try {
      const headers = this.getAuthHeaders();
      const response = await axios.get<User>(`${this.url}/user/info/`, { headers });
      return keysToCamel(response.data);
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
      return null;
    }
  }

  public async refreshToken(): Promise<Token | null> {
    const headers = this.getAuthHeaders();
    try {
      const response = await axios.post<Token>(
        `${this.url}/token/refresh/`,
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
      await axios.post(`${this.url}/token/verify/`,
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
