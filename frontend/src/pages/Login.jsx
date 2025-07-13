import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/apiClient'; 
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
const navigate = useNavigate();
const [email, setEmail] = useState('admin@test.com');
const [password, setPassword] = useState('password');
const [error, setError] = useState('');
const [isLoading, setIsLoading] = useState(false);
const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
        const response = await apiClient.post('/auth/login', { email, password });
        const token = response.data.token;
        localStorage.setItem('authToken', token); // Store token
        navigate('/'); // Navigate to dashboard
    } catch (err) {
        setError('Invalid credentials or server error.');
        console.error("Login error:", err);
    } finally {
        setIsLoading(false);
    }
};

return (
    <div className="flex items-center justify-center min-h-screen bg-bg-primary px-4">
        <div className="w-full max-w-md mx-auto">
            <div className="bg-bg-secondary rounded-xl shadow-lg p-8 md:p-10">
                <div className="flex flex-col items-center space-y-6">
                    <div className="flex flex-col items-center space-y-2">
                        <BoomerangLogo />
                        <h1 className="text-2xl font-bold tracking-tight text-text-primary">Admin Portal</h1>
                    </div>

                    {error && <div className="bg-red-500/20 text-red-300 text-sm p-3 rounded-lg w-full text-center">{error}</div>}

                    <form onSubmit={handleLogin} className="w-full space-y-6">
                        <div>
                            <label className="sr-only" htmlFor="email">Email Address</label>
                            <input
                                className="form-input w-full px-4 py-3 bg-bg-tertiary border-transparent rounded-lg text-text-primary"
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="sr-only" htmlFor="password">Password</label>
                            <input
                                className="form-input w-full px-4 py-3 bg-bg-tertiary border-transparent rounded-lg text-text-primary"
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            className="w-full py-3 text-base font-semibold text-white bg-accent-primary rounded-lg hover:bg-accent-hover disabled:bg-bg-tertiary"
                            type="submit"
                            disabled={isLoading}>
                            {isLoading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
);
};

export default Login;