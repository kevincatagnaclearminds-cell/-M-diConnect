/**
 * Hook personalizado para manejar autenticación
 */

import { useCallback } from 'react';
import { useAuthStore } from '../store/authStore';
import { authService } from '../services/authService';
import type { LoginCredentials, RegisterData } from '../types';

export const useAuth = () => {
  const {
    user,
    token,
    isAuthenticated,
    isLoading,
    login: setLogin,
    logout: setLogout,
    setLoading,
  } = useAuthStore();

  /**
   * Login con email y contraseña
   */
  const login = useCallback(
    async (credentials: LoginCredentials) => {
      try {
        setLoading(true);
        const response = await authService.login(credentials);
        setLogin(response.user, response.token);
        return { success: true };
      } catch (error) {
        setLoading(false);
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Error al iniciar sesión',
        };
      }
    },
    [setLogin, setLoading]
  );

  /**
   * Registro de nuevo usuario
   */
  const register = useCallback(
    async (data: RegisterData) => {
      try {
        setLoading(true);
        const response = await authService.register(data);
        setLogin(response.user, response.token);
        return { success: true };
      } catch (error) {
        setLoading(false);
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Error al registrarse',
        };
      }
    },
    [setLogin, setLoading]
  );

  /**
   * Login con Google
   */
  const loginWithGoogle = useCallback(
    async (googleToken: string) => {
      try {
        setLoading(true);
        const response = await authService.loginWithGoogle(googleToken);
        setLogin(response.user, response.token);
        return { success: true };
      } catch (error) {
        setLoading(false);
        return {
          success: false,
          error:
            error instanceof Error
              ? error.message
              : 'Error al iniciar sesión con Google',
        };
      }
    },
    [setLogin, setLoading]
  );

  /**
   * Solicitar recuperación de contraseña
   */
  const requestPasswordReset = useCallback(
    async (email: string) => {
      try {
        const response = await authService.requestPasswordReset({ email });
        return { 
          success: true,
          message: response.message,
        };
      } catch (error) {
        return {
          success: false,
          error:
            error instanceof Error
              ? error.message
              : 'Error al solicitar recuperación de contraseña',
        };
      }
    },
    []
  );

  /**
   * Cerrar sesión
   */
  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      setLogout();
    }
  }, [setLogout]);

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    register,
    loginWithGoogle,
    requestPasswordReset,
    logout,
  };
};

