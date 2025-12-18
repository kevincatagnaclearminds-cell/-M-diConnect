/**
 * Página de Registro
 */

import { Link } from 'react-router-dom';
import { RegisterForm } from '@features/auth/components/RegisterForm';
import './Register.css';

export const Register = () => {
  return (
    <div className="register-page">
      <div className="register-container">
        <Link to="/login" className="back-to-login-link">
          ← Back to sign in
        </Link>

        <div className="register-header">
          <h1 className="register-title">Create your account</h1>
        </div>

        <div className="register-content">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

