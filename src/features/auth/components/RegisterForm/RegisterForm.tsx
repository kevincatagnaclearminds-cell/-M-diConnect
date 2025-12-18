/**
 * Formulario de registro
 */

import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@components/ui/Input';
import { Button } from '@components/ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import './RegisterForm.css';

export const RegisterForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const { register, isLoading } = useAuth();

  const validateForm = (): boolean => {
    const newErrors: {
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!email) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'El correo electrónico no es válido';
    }

    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Por favor confirma tu contraseña';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Extraer nombre del email (parte antes del @)
    const name = email.split('@')[0];

    const result = await register({
      email,
      password,
      name,
    });

    if (result.success) {
      navigate('/home');
    } else {
      setErrors({ email: result.error });
    }
  };

  return (
    <div className="register-form">
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          label="Email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          icon={<FaEnvelope />}
          disabled={isLoading}
        />

        <Input
          type="password"
          label="Password"
          placeholder="Min. 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          icon={<FaLock />}
          disabled={isLoading}
        />

        <Input
          type="password"
          label="Confirm Password"
          placeholder="Re-enter password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
          icon={<FaLock />}
          disabled={isLoading}
        />

        <Button
          type="submit"
          variant="primary"
          className="register-button"
          disabled={isLoading}
        >
          {isLoading ? 'Creando cuenta...' : 'Create account'}
        </Button>
      </form>
    </div>
  );
};

