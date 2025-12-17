/**
 * Servicio base para llamadas API
 * Con soporte para modo mock cuando no hay backend
 */

import type { ApiResponse } from '@types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true' || !import.meta.env.VITE_API_BASE_URL;

class ApiService {
  private baseURL: string;
  private useMock: boolean;

  constructor(baseURL: string, useMock = false) {
    this.baseURL = baseURL;
    this.useMock = useMock;
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    // Si está en modo mock, usar mocks
    if (this.useMock) {
      return this.mockRequest<T>(endpoint, options);
    }

    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      // Verificar si hay contenido antes de parsear JSON
      const contentType = response.headers.get('content-type');
      const hasJsonContent = contentType && contentType.includes('application/json');
      
      // Si la respuesta está vacía o no es JSON, lanzar error controlado
      if (!hasJsonContent || response.status === 204) {
        if (response.ok) {
          return { data: {} as T, success: true };
        }
        throw new Error('Error en la petición: respuesta vacía o inválida');
      }

      // Intentar parsear JSON
      let data;
      const text = await response.text();
      
      if (!text) {
        if (response.ok) {
          return { data: {} as T, success: true };
        }
        throw new Error('Error en la petición: respuesta vacía');
      }

      try {
        data = JSON.parse(text);
      } catch (parseError) {
        throw new Error('Error al parsear respuesta del servidor');
      }

      if (!response.ok) {
        throw new Error(data.message || `Error ${response.status}: ${response.statusText}`);
      }

      return data;
    } catch (error) {
      // Si falla la conexión, usar mocks automáticamente
      if (error instanceof TypeError && error.message.includes('fetch')) {
        console.warn('Backend no disponible, usando modo mock');
        return this.mockRequest<T>(endpoint, options);
      }
      throw error;
    }
  }

  /**
   * Simula respuestas del backend para desarrollo
   */
  private async mockRequest<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock de login
    if (endpoint === '/auth/login' && options?.method === 'POST') {
      const body = options.body ? JSON.parse(options.body as string) : {};
      if (body.email && body.password) {
        return {
          data: {
            user: {
              id: '1',
              email: body.email,
              name: body.email.split('@')[0],
              provider: 'email' as const,
            },
            token: 'mock-jwt-token-' + Date.now(),
          } as T,
          success: true,
        };
      }
      throw new Error('Credenciales inválidas');
    }

    // Mock de registro
    if (endpoint === '/auth/register' && options?.method === 'POST') {
      const body = options.body ? JSON.parse(options.body as string) : {};
      return {
        data: {
          user: {
            id: '1',
            email: body.email,
            name: body.name,
            provider: 'email' as const,
          },
          token: 'mock-jwt-token-' + Date.now(),
        } as T,
        success: true,
      };
    }

    // Mock de Google login
    if (endpoint === '/auth/google' && options?.method === 'POST') {
      return {
        data: {
          user: {
            id: '1',
            email: 'user@gmail.com',
            name: 'Usuario Google',
            provider: 'google' as const,
          },
          token: 'mock-jwt-token-google-' + Date.now(),
        } as T,
        success: true,
      };
    }

    // Mock de recuperación de contraseña
    if (endpoint === '/auth/password-reset/request' && options?.method === 'POST') {
      const body = options.body ? JSON.parse(options.body as string) : {};
      const email = body.email || '';
      
      // Generar token de recuperación (se "envía" al correo, no se muestra en la UI)
      const resetToken = `reset-token-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const resetUrl = `${window.location.origin}/reset-password?token=${resetToken}`;
      
      // En modo mock, simular que se envió el correo
      // En producción, el backend enviaría el correo con el enlace
      console.log(`[MOCK] Email de recuperación enviado a: ${email}`);
      console.log(`[MOCK] Enlace de recuperación: ${resetUrl}`);
      console.log(`[MOCK] Token: ${resetToken}`);
      
      // Siempre devolver solo el mensaje de éxito
      return {
        data: {
          message: 'Se ha enviado un enlace de recuperación a tu correo electrónico',
        } as T,
        success: true,
      };
    }

    // Mock de logout
    if (endpoint === '/auth/logout' && options?.method === 'POST') {
      return {
        data: {} as T,
        success: true,
      };
    }

    // Mock por defecto
    return {
      data: {} as T,
      success: true,
    };
  }

  async get<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET', ...options });
  }

  async post<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  async put<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const apiService = new ApiService(API_BASE_URL, USE_MOCK);
