import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '../components/Button';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col justify-center items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-5xl md:text-6xl font-bold text-[#162c44] tracking-tight mb-6">
                    Hiring, simplified settings.
                </h1>
                <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10">
                    Streamline your recruitment process with our intuitive candidate tracking system.
                    Manage referrals, track status, and hire the best talent effortlessly.
                </p>
                <div className="flex justify-center gap-4">
                    <Link to="/register">
                        <Button className="flex items-center gap-2 px-8 py-4 text-lg shadow-xl shadow-[#162c44]/20">
                            Start Hiring <ArrowRight className="h-5 w-5" />
                        </Button>
                    </Link>
                    <Link to="/login">
                        <Button variant="secondary" className="px-8 py-4 text-lg">
                            Log In
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
