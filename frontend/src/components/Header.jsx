import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon, BellIcon, ArrowRightOnRectangleIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

const Header = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    return (
        <header className="relative z-20 flex h-20 items-center justify-between border-b border-border-color bg-bg-secondary px-8">
            <h1 className="text-2xl font-bold text-text-primary hidden sm:block">Dashboard</h1>
            <div className="flex items-center gap-6">
                <div className="relative w-full max-w-xs hidden lg:block">
                     <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <MagnifyingGlassIcon className="h-5 w-5 text-text-secondary" />
                    </div>
                    <input type="text" placeholder="Search..." className="form-input block w-full rounded-md border-0 bg-bg-primary py-2 pl-10 pr-3 text-white ring-1 ring-inset ring-border-color" />
                </div>
                <button className="relative rounded-full p-2 text-text-secondary hover:bg-bg-tertiary hover:text-white">
                    <BellIcon className="h-6 w-6" />
                    <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-accent-primary border-2 border-bg-secondary"></span>
                </button>
                
                
                <div className="relative">
                    
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)} 
                        className="flex items-center gap-3 rounded-lg p-1 transition-colors hover:bg-bg-tertiary"
                    >
                        <div 
                            className="h-9 w-9 rounded-full bg-cover bg-center" 
                            style={{ backgroundImage: `url("https://images.unsplash.com/photo-1535713875002-d1d0cf377fDE?q=80&w=2080&auto=format&fit=crop")` }}
                        ></div>
                        <span className="hidden font-medium text-text-primary md:inline">Admin User</span>
                       
                        <ChevronDownIcon className={`h-5 w-5 text-text-secondary transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                 
                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-bg-tertiary rounded-lg shadow-lg py-1">
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 w-full px-4 py-2 text-sm text-text-primary hover:bg-accent-primary"
                            >
                                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                                <span>Logout</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;