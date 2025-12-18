/**
 * Formulario de login
 */

import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@components/ui/Input';
import { Button } from '@components/ui/Button';
import { GoogleButton } from '../GoogleButton';
import { useAuth } from '../../hooks/useAuth';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import './LoginForm.css';

export const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const { login, loginWithGoogle, isLoading } = useAuth();

  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'El correo electrónico no es válido';
    }

    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const result = await login({ email, password });
    if (result.success) {
      navigate('/home');
    } else {
      setErrors({ password: result.error });
    }
  };

  const handleGoogleLogin = async () => {
    // En producción, aquí integrarías con Google OAuth
    // Por ahora, simulamos el login con Google
    try {
      // Simular token de Google (en producción usarías la librería real)
      const mockGoogleToken = 'mock-google-token-' + Date.now();
      const result = await loginWithGoogle(mockGoogleToken);
      
      if (!result.success) {
        setErrors({ password: result.error });
      }
    } catch (error) {
      console.error('Error en login con Google:', error);
      setErrors({ password: 'Error al iniciar sesión con Google' });
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <GoogleButton onClick={handleGoogleLogin} isLoading={isLoading} />

        <div className="separator">
          <span className="separator-line"></span>
          <span className="separator-text">o</span>
          <span className="separator-line"></span>
        </div>

        <Input
          type="email"
          label="Correo electrónico"
          placeholder="tu@ejemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          icon={<FaEnvelope />}
          disabled={isLoading}
        />

        <Input 
          type="password"
          label="Contraseña"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          icon={<FaLock />}
          disabled={isLoading}
        />

        <Button
          type="submit"
          variant="primary"
          className="login-button"
          disabled={isLoading}
        >
          {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </Button>
      </form>
    </div>
  );
};

