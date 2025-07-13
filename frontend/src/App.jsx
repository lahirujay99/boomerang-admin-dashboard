import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import our main layout and all page components
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Sales from './pages/Sales'; // <-- This path is now corrected

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route for the login page, which does NOT use the main Layout */}
        <Route path="/login" element={<Login />} />
        
        {/* All main routes will now use the Layout component as a wrapper */}
        {/* The Layout's <Outlet /> will render the specific page component */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} /> {/* Default page at "/" */}
          <Route path="customers" element={<Customers />} /> {/* Page at "/customers" */}
          <Route path="sales" element={<Sales />} /> {/* Page at "/sales" */}
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;