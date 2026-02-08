import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Briefcase, LogOut, User } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import Button from './Button';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/');
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
                                {location.pathname !== '/dashboard' && (
                                    <Link to="/dashboard">
                                        <Button variant="ghost" className="text-slate-600 hover:text-[#162c44]">Dashboard</Button>
                                    </Link>
                                )}
                                <div className="flex items-center gap-3 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-100">
                                    <div className="bg-[#162c44]/10 p-1 rounded-full text-[#162c44]">
                                        <User className="h-4 w-4" />
                                    </div>
                                    <span className="font-medium text-slate-700 text-sm hidden sm:block pr-1">{user.name}</span>
                                </div>
                                <Button variant="ghost" onClick={handleLogout} className="text-slate-500 hover:!text-red-600 hover:!bg-red-50 group">
                                    <LogOut className="h-5 w-5 group-hover:text-red-600 transition-colors" />
                                </Button>
                            </>
                        ) : (
                            <div className="flex gap-3">
                                <Link to="/login"><Button variant="ghost">Sign In</Button></Link>
                                <Link to="/register"><Button className="shadow-md shadow-slate-200">Get Started</Button></Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
