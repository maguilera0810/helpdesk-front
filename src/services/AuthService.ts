import axios from 'axios';
import { User, Token } from '../interfaces/AuthInterfaces';
import Environment from './../environments/Environment';
const { apiUrl, apiKey } = Environment;


export class AuthService {

  async getToken(user: Partial<User>): Promise<Token | null> {
    console.log("getToken   - 1");
    console.table(user);
    const headers = { 'API-KEY': apiKey };
    console.log("getToken   - 2");
    return await axios.post<Token>(`${apiUrl}/api/auth/token/`, user, { headers }).then((response: any) => {
      console.log(response.data);
      return response.data;
    }).catch((error: any) => {
      console.error('Error en el inicio de sesión:', error);
      return null;
    });
  }

  async fetchUser(token: string): Promise<User | null> {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get<User>(`${apiUrl}/api/auth/user/info/`, { headers });
      return response.data;
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
      return null;
    }
  }

  async refreshToken(token: string): Promise<Token | null> {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.post<Token>(
        `${apiUrl}/api/auth/token/refresh/`,
        {},
        { headers },
      );
      return response.data;
    } catch (error) {
      console.error('Error al renovar el token:', error);
      return null;
    }
  }

  async verifyToken(token: string): Promise<boolean> {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      await axios.post(`${apiUrl}/api/auth/token/verify/`,
        {},
        { headers });
      return true;
    } catch (error) {
      console.error('El token no es válido:', error);
      return false;
    }
  }
}

export default new AuthService();
