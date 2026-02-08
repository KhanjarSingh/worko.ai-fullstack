import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-[#162c44]">
                        Welcome back
                    </h2>
                    <p className="mt-2 text-sm text-slate-500">
                        Enter your credentials to access your account
                    </p>
                </div>
                <Card className="mt-8 space-y-6 p-8 border border-slate-100 shadow-xl shadow-slate-200/50">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="p-3 rounded-md bg-red-50 border border-red-100 text-sm text-red-600 font-medium">
                                {error}
                            </div>
                        )}
                        <div className="space-y-4">
                            <Input
                                label="Email"
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="focus:ring-[#162c44] focus:border-[#162c44]"
                            />
                            <div className="space-y-1">
                                <Input
                                    label="Password"
                                    id="password"
                                    type="password"
                                    placeholder="********"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="focus:ring-[#162c44] focus:border-[#162c44]"
                                />
                            </div>
                        </div>

                        <Button type="submit" disabled={loading} className="w-full flex justify-center py-3 text-base shadow-lg shadow-[#162c44]/20 hover:shadow-[#162c44]/30 disabled:opacity-70 disabled:cursor-not-allowed">
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing In...
                                </span>
                            ) : 'Sign In'}
                        </Button>

                        <div className="text-center text-sm">
                            <span className="text-slate-500">Don't have an account? </span>
                            <Link to="/register" className="font-semibold text-[#162c44] hover:text-[#1b3a5b] transition-colors">
                                Sign up
                            </Link>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default Login;
