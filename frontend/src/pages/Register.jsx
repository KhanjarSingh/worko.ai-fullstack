import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const { name, email, password, confirmPassword } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            await register(name, email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-[#162c44]">
                        Create an account
                    </h2>
                    <p className="mt-2 text-sm text-slate-500">
                        Enter your details to get started
                    </p>
                </div>
                <Card className="mt-8 space-y-6 p-8 border border-slate-100 shadow-xl shadow-slate-200/50">
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {error && (
                            <div className="p-3 rounded-md bg-red-50 border border-red-100 text-sm text-red-600 font-medium">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <Input
                                label="Full Name"
                                id="name"
                                value={name}
                                onChange={onChange}
                                required
                                placeholder="Enter your full name"
                                className="focus:ring-[#162c44] focus:border-[#162c44]"
                            />
                            <Input
                                label="Email"
                                id="email"
                                type="email"
                                value={email}
                                onChange={onChange}
                                required
                                placeholder="name@example.com"
                                className="focus:ring-[#162c44] focus:border-[#162c44]"
                            />
                            <Input
                                label="Password"
                                id="password"
                                type="password"
                                value={password}
                                onChange={onChange}
                                required
                                minLength="6"
                                placeholder="********"
                                className="focus:ring-[#162c44] focus:border-[#162c44]"
                            />
                            <Input
                                label="Confirm Password"
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={onChange}
                                required
                                minLength="6"
                                placeholder="••••••••"
                                className="focus:ring-[#162c44] focus:border-[#162c44]"
                            />
                        </div>

                        <Button type="submit" disabled={loading} className="w-full flex justify-center py-3 text-base shadow-lg shadow-[#162c44]/20 hover:shadow-[#162c44]/30 disabled:opacity-70 disabled:cursor-not-allowed">
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating Account...
                                </span>
                            ) : 'Create Account'}
                        </Button>

                        <div className="text-center text-sm">
                            <span className="text-slate-500">Already have an account? </span>
                            <Link to="/login" className="font-semibold text-[#162c44] hover:text-[#1b3a5b] transition-colors">
                                Sign in
                            </Link>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default Register;
