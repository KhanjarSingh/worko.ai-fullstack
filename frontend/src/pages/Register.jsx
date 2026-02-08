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

        try {
            await register(name, email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900">
                        Create an account
                    </h2>
                    <p className="mt-2 text-sm text-slate-600">
                        Enter your details to get started
                    </p>
                </div>
                <Card className="mt-8 space-y-6 p-8">
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
                                placeholder="John Doe"
                            />
                            <Input
                                label="Email"
                                id="email"
                                type="email"
                                value={email}
                                onChange={onChange}
                                required
                                placeholder="name@example.com"
                            />
                            <Input
                                label="Password"
                                id="password"
                                type="password"
                                value={password}
                                onChange={onChange}
                                required
                                minLength="6"
                                placeholder="••••••••"
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
                            />
                        </div>

                        <Button type="submit" className="w-full flex justify-center py-2.5">
                            Create Account
                        </Button>

                        <div className="text-center text-sm">
                            <span className="text-slate-600">Already have an account? </span>
                            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
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
