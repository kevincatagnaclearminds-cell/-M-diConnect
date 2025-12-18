import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@features/auth';

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}
