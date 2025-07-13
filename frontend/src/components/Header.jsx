import React from 'react';
import { MagnifyingGlassIcon, BellIcon } from '@heroicons/react/24/outline';

const Header = () => {
    return (
        <header className="flex h-20 items-center justify-between border-b border-border-color bg-bg-secondary px-8">
            <h1 className="text-2xl font-bold text-text-primary hidden sm:block">Dashboard</h1>
            <div className="flex items-center gap-6">
                <div className="relative w-full max-w-xs hidden lg:block">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <MagnifyingGlassIcon className="h-5 w-5 text-text-secondary" />
                    </div>
                    <input 
                        type="text" 
                        placeholder="Search..."
                        className="form-input block w-full rounded-md border-0 bg-bg-primary py-2 pl-10 pr-3 text-white ring-1 ring-inset ring-border-color placeholder:text-text-secondary focus:ring-2 focus:ring-inset focus:ring-accent-primary sm:text-sm" 
                    />
                </div>
                <button className="relative rounded-full p-2 text-text-secondary hover:bg-bg-tertiary hover:text-white">
                    <BellIcon className="h-6 w-6" />
                    <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-accent-primary border-2 border-bg-secondary"></span>
                </button>
                <div 
                    className="h-10 w-10 rounded-full bg-cover bg-center" 
                    style={{ backgroundImage: `url("https://images.unsplash.com/photo-1535713875002-d1d0cf377fDE?q=80&w=2080&auto=format&fit=crop")` }}
                ></div>
            </div>
        </header>
    );
};

export default Header;