import React from 'react';
import { NavLink } from 'react-router-dom'; // Using NavLink for active styling
import { ChartPieIcon, UsersIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

const BoomerangLogo = () => (
    <div className="flex items-center gap-3">
        <div className="w-8 h-8 flex items-center justify-center">
             <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_6_330)">
                    <path clipRule="evenodd" d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z" fill="currentColor" fillRule="evenodd"></path>
                </g>
                <defs><clipPath id="clip0_6_330"><rect fill="white" height="48" width="48"></rect></clipPath></defs>
            </svg>
        </div>
        <h1 className="text-xl font-bold text-white">Boomerang</h1>
    </div>
);

const Sidebar = () => {
    // This function will conditionally apply styles to the active link
    const navLinkClasses = ({ isActive }) => 
        isActive 
          ? 'flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium text-white bg-accent-primary' 
          : 'flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium text-text-secondary hover:bg-bg-tertiary hover:text-white transition-colors';

    return (
        <aside className="w-64 flex-shrink-0 bg-bg-secondary p-6 hidden md:block">
            <div className="flex flex-col h-full">
                <div className="mb-10">
                    <BoomerangLogo />
                </div>
                <nav className="flex flex-col gap-4">
                   
                    <NavLink to="/" className={navLinkClasses}>
                        <ChartPieIcon className="h-6 w-6" /> Dashboard
                    </NavLink>
                    <NavLink to="/customers" className={navLinkClasses}>
                        <UsersIcon className="h-6 w-6" /> Customers
                    </NavLink>
                    <NavLink to="/sales" className={navLinkClasses}>
                        <ShoppingCartIcon className="h-6 w-6" /> Sales History
                    </NavLink>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;