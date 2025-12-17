/**
 * Servicio de autenticación
 * Maneja todas las llamadas API relacionadas con autenticación
 */

import { apiService } from '@services/api';
import type {
  LoginCredentials,
  RegisterData,
  AuthResponse,
  PasswordResetRequest,
  PasswordReset,
  PasswordResetResponse,
} from '../types';

class AuthService {
  /**
   * Login con email y contraseña
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>(
      '/auth/login',
      credentials
    );
    return response.data;
  }

  /**
   * Registro de nuevo usuario
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>(
      '/auth/register',
      data
    );
    return response.data;
  }

  /**
   * Login con Google
   */
  async loginWithGoogle(token: string): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>('/auth/google', {
      token,
    });
    return response.data;
  }

  /**
   * Solicitar recuperación de contraseña
   */
  async requestPasswordReset(
    data: PasswordResetRequest
  ): Promise<PasswordResetResponse> {
    const response = await apiService.post<PasswordResetResponse>(
      '/auth/password-reset/request',
      data
    );
    return response.data;
  }

  /**
   * Resetear contraseña con token
   */
  async resetPassword(data: PasswordReset): Promise<{ message: string }> {
    const response = await apiService.post<{ message: string }>(
      '/auth/password-reset',
      data
    );
    return response.data;
  }

  /**
   * Cerrar sesión
   */
  async logout(): Promise<void> {
    await apiService.post('/auth/logout', {});
  }

  /**
   * Verificar token
   */
  async verifyToken(token: string): Promise<{ valid: boolean }> {
    const response = await apiService.get<{ valid: boolean }>('/auth/verify', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
}

export const authService = new AuthService();

