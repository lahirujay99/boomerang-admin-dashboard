import React from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet
import Sidebar from './Sidebar'; // Import the real Sidebar
import Header from './Header';   // Import the real Header

const Layout = () => {
    return (
        <div className="flex min-h-screen bg-bg-primary text-text-primary">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 p-8">
                    <Outlet /> 
                </main>
            </div>
        </div>
    );
};

export default Layout;