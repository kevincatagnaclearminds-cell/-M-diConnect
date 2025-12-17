import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '@pages/Login';
import { Home } from '@pages/Home';
import { useAuthStore } from '@features/auth';
import '@styles/App.css';

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
