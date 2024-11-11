import axios from 'axios';
import Environment from '../../environments/Environment';
import { Token } from '../../interfaces/AuthInterfaces';
import { User } from '../../interfaces/ModelInterfaces';
import authStore from '../../stores/auth/authStore';
import { keysToCamel } from '../../utils/caseUtils';

const { API_URL, API_KEY } = Environment;

class AuthService {
  private static instance: AuthService;
  private apiKey: string;
  private url: string;

  private constructor() {
    this.url = `${API_URL}/api/auth`;
    this.apiKey = API_KEY;
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private getSavedToken(): string | null {
    // Obtener el token desde el store de Zustand
    return authStore.getState().token?.access || null;
  }
  private getRefreshToken(): string | null {
    return authStore.getState().token?.refresh || null;
  }

  private clearAuth(): void {
    authStore.getState().logout();
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
    // TODO terminar este servicio
    // const token = this.getRefreshToken();

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
      this.clearAuth();
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
