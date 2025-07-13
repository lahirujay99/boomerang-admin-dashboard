import React from 'react';

const Sidebar = () => <aside className="w-64 flex-shrink-0 bg-bg-secondary p-6">Sidebar Placeholder</aside>;
const Header = () => <header className="h-20 border-b border-border-color bg-bg-secondary px-8">Header Placeholder</header>;

const Layout = () => {
    return (
        <div className="flex min-h-screen bg-bg-primary text-text-primary">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 p-8">
                    <h1 className="text-2xl font-bold">Main Content Area</h1>
                </main>
            </div>
        </div>
    );
};

export default Layout;