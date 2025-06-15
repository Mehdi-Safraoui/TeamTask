import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardUser from './pages/DashboardUser';
import DashboardAdmin from './pages/DashboardAdmin';

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Routes>
        {/* Route d'inscription */}
        <Route path="/register" element={<Register />} />

        {/* Route de connexion */}
        <Route path="/login" element={<Login />} />

        {/* Routes protégées */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              {user?.role === 'manager' ? <DashboardAdmin /> : <DashboardUser />}
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;