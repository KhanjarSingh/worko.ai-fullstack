import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, LogOut, User } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import Button from './Button';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link to="/" className="flex items-center gap-2 group">
                        <img src="/Worko.ai.png" alt="Worko.ai" className="h-8 w-auto object-contain transition-transform group-hover:scale-105" />
                    </Link>

                    <div className="flex items-center gap-4">
                        {user ? (
                            <>
                                <div className="flex items-center gap-3 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-100">
                                    <div className="bg-indigo-100 p-1 rounded-full text-indigo-600">
                                        <User className="h-4 w-4" />
                                    </div>
                                    <span className="font-medium text-slate-700 text-sm hidden sm:block pr-1">{user.name}</span>
                                </div>
                                <Button variant="ghost" onClick={handleLogout} className="text-slate-500 hover:text-red-600 hover:bg-red-50">
                                    <LogOut className="h-5 w-5" />
                                </Button>
                            </>
                        ) : (
                            <div className="flex gap-3">
                                <Link to="/login"><Button variant="ghost">Sign In</Button></Link>
                                <Link to="/register"><Button className="shadow-indigo-200 shadow-md">Get Started</Button></Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
