import { useNavigate } from 'react-router-dom';
import { useAuth } from '@features/auth';

export default function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  }

  return (
    <header className="bg-white shadow-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="font-bold text-blue-600">💙 Medify</div>

        <button onClick={handleLogout} className="text-sm text-gray-500">
          Cerrar sesión
        </button>
      </div>
    </header>
  )
}
