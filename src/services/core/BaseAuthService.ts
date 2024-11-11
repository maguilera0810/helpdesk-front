import axios, { AxiosInstance } from 'axios';
import Environment from '../../environments/Environment';
import authStore from '../../stores/auth/authStore';
import AuthService from '../auth/AuthService';

const { API_URL } = Environment;

abstract class BaseAuthService {
  protected axiosInstance: AxiosInstance;

  constructor(path: string) {
    this.axiosInstance = axios.create({
      baseURL: `${API_URL}${path}`,
    });
    this.setupToken();
    // this.setupInterceptors();
  }
  private setupToken() {
    this.axiosInstance.interceptors.request.use((config) => {
      const token = this.getSavedToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  private setupInterceptors() { // TODO FALTA IMPLEMENTAR, ESTO ES PARA RENOVAR LOS TOKENS
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const newToken = await AuthService.refreshToken();
          if (newToken) {
            originalRequest.headers['Authorization'] = `Bearer ${newToken.access}`;
            return this.axiosInstance(originalRequest);
          }
          authStore.getState().logout();
          window.location.href = '/auth/login';
        }
        return Promise.reject(error);
      }
    );
  }
  protected getSavedToken(): string | null {
    return authStore.getState().token?.access || null;
  }

  protected getAuthHeaders() {
    const token = this.getSavedToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
}

export default BaseAuthService;
