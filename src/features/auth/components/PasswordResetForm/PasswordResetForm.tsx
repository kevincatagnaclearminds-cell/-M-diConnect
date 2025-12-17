/**
 * Formulario para solicitar recuperación de contraseña
 */

import { useState, FormEvent } from 'react';
import { Input } from '@components/ui/Input';
import { Button } from '@components/ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { FaEnvelope } from 'react-icons/fa';
import './PasswordResetForm.css';

export const PasswordResetForm = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { requestPasswordReset } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!email) {
      setError('El correo electrónico es requerido');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('El correo electrónico no es válido');
      return;
    }

    const result = await requestPasswordReset(email);
    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.error || 'Error al solicitar recuperación de contraseña');
    }
  };

  if (success) {
    return (
      <div className="password-reset-success">
        <h3>Correo enviado</h3>
        <p>
          Hemos enviado un enlace de recuperación a <strong>{email}</strong>
        </p>
        <p className="success-note">
          Por favor, revisa tu bandeja de entrada y sigue las instrucciones del correo.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="password-reset-form">
      <Input
        type="email"
        label="Correo electrónico"
        placeholder="tu@ejemplo.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={error}
        icon={<FaEnvelope />}
      />
      <Button type="submit" variant="primary" className="reset-button">
        Enviar enlace de recuperación
      </Button>
    </form>
  );
};

