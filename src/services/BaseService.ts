import axios, { AxiosInstance } from 'axios';
import useAuthStore from '../stores/useAuthStore';
import AuthService from './AuthService';

abstract class BaseService {
  protected axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({ baseURL });
    this.setupInterceptors();
  }

  private setupInterceptors() {
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

export default BaseService;
