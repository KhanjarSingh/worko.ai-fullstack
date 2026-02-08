import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Users, BarChart3, Shield } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
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

            {/* Features Section */}
            <div className="bg-slate-50 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-[#162c44]">Why choose Worko.ai?</h2>
                        <p className="text-slate-500 mt-2">Everything you need to manage your hiring pipeline.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card className="p-8 border-none shadow-md">
                            <div className="h-12 w-12 bg-[#162c44]/10 rounded-xl flex items-center justify-center text-[#162c44] mb-6">
                                <Users className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold text-[#162c44] mb-3">Candidate Tracking</h3>
                            <p className="text-slate-500">
                                Organized dashboard to view all your candidates in one place. Filter by status, role, and more.
                            </p>
                        </Card>
                        <Card className="p-8 border-none shadow-md">
                            <div className="h-12 w-12 bg-[#162c44]/10 rounded-xl flex items-center justify-center text-[#162c44] mb-6">
                                <BarChart3 className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold text-[#162c44] mb-3">Insightful Metrics</h3>
                            <p className="text-slate-500">
                                Real-time statistics on your hiring pipeline. Know exactly how many candidates are pending or hired.
                            </p>
                        </Card>
                        <Card className="p-8 border-none shadow-md">
                            <div className="h-12 w-12 bg-[#162c44]/10 rounded-xl flex items-center justify-center text-[#162c44] mb-6">
                                <Shield className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold text-[#162c44] mb-3">Secure & Reliable</h3>
                            <p className="text-slate-500">
                                Your data is safe with us. Built with industry-standard security and reliable cloud storage.
                            </p>
                        </Card>
                    </div>
                </div>
            </div>

            <footer className="bg-white border-t border-slate-100 py-10 text-center text-slate-400 text-sm">
                <p>&copy; {new Date().getFullYear()} Worko.ai. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
