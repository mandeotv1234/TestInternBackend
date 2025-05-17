import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserTable from './components/UserTable';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <div>
                <h1 className="text-xl font-bold mb-4">User Management</h1>
                <UserTable />
              </div>
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/users" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
