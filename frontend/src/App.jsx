import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Sales from './pages/Sales';

// A component that protects routes that require authentication
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        // If no token is found, redirect to the login page
        return <Navigate to="/login" replace />;
    }
    return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* This <Route> now acts as the guardian for all nested routes */}
        <Route 
            path="/" 
            element={
                <ProtectedRoute>
                    <Layout />
                </ProtectedRoute>
            }
        >
          {/* These routes can only be accessed if the user is authenticated */}
          <Route index element={<Dashboard />} />
          <Route path="customers" element={<Customers />} />
          <Route path="sales" element={<Sales />} />
        </Route>
        
        {/* A catch-all route that redirects unknown paths to the main page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;