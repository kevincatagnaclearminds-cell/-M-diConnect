/**
 * Página de Login
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LoginForm } from '@features/auth/components/LoginForm';
import { PasswordResetForm } from '@features/auth/components/PasswordResetForm';
import './Login.css';

export const Login = () => {
  const [showPasswordReset, setShowPasswordReset] = useState(false);

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1 className="login-title">Bienvenido a MédiConnect</h1>
          <p className="login-subtitle">Inicia sesión para continuar</p>
        </div>

        {showPasswordReset ? (
          <div className="login-content">
            <PasswordResetForm />
            <button
              className="back-to-login"
              onClick={() => setShowPasswordReset(false)}
            >
              ← Volver al inicio de sesión
            </button>
          </div>
        ) : (
          <div className="login-content">
            <LoginForm />
            <div className="login-footer">
              <button
                className="forgot-password"
                onClick={() => setShowPasswordReset(true)}
              >
                ¿Has olvidado tu contraseña?
              </button>
              <div className="register-link">
                <span>¿Necesitas una cuenta? </span>
                <Link to="/register" className="register-button">
                  Regístrate
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

