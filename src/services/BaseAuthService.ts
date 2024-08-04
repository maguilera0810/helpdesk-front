import axios, { AxiosInstance } from 'axios';
import Environment from '../environments/Environment';
import useAuthStore from '../stores/useAuthStore';
import AuthService from './AuthService';

const { apiUrl } = Environment;

abstract class BaseAuthService {
  protected axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    console.log(`${apiUrl}${baseURL}`);

    this.axiosInstance = axios.create({
      baseURL: `${apiUrl}${baseURL}`,
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
          useAuthStore.getState().logout();
          window.location.href = '/auth/login';
        }
        return Promise.reject(error);
      }
    );
  }
  protected getSavedToken(): string | null {
    return useAuthStore.getState().token?.access || null;
  }

  protected getAuthHeaders() {
    const token = this.getSavedToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
}

export default BaseAuthService;
