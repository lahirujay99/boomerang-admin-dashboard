import React from 'react';

const BoomerangLogo = () => (
    <div style={{
        width: '40px',
        height: '40px',
        border: '3px solid #2563eb',
        borderRadius: '50% 50% 0 50%',
        transform: 'rotate(-45deg)'
    }}></div>
);

const Login = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-bg-primary px-4">
            <div className="w-full max-w-md mx-auto">
                <div className="bg-bg-secondary rounded-xl shadow-lg p-8 md:p-10">
                    <div className="flex flex-col items-center space-y-6">
                        <div className="flex flex-col items-center space-y-2">
                            <BoomerangLogo />
                            <h1 className="text-2xl font-bold tracking-tight text-text-primary">Admin Portal</h1>
                        </div>
                        {/* The form will go here */}
                         <p className="text-text-secondary">Login form will be functional soon.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;