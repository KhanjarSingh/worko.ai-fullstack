import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Trash2, FileText, Phone, Mail, User, Briefcase } from 'lucide-react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';

const Dashboard = () => {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [stats, setStats] = useState(null);

    const fetchCandidates = async () => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams();
            if (search) queryParams.append('search', search);
            if (statusFilter) queryParams.append('status', statusFilter);

            const { data } = await api.get(`/candidates?${queryParams.toString()}`);
            setCandidates(data.candidates);

            const statsRes = await api.get('/candidates/stats');
            setStats(statsRes.data);
        } catch (error) {
            console.error('Error fetching candidates:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCandidates();
    }, [search, statusFilter]);

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await api.put(`/candidates/${id}/status`, { status: newStatus });
            fetchCandidates();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this candidate?')) {
            try {
                await api.delete(`/candidates/${id}`);
                fetchCandidates();
            } catch (error) {
                console.error('Error deleting candidate:', error);
            }
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Reviewed': return 'bg-blue-100 text-blue-800';
            case 'Hired': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
                    <p className="text-slate-500 mt-2">Manage your candidate pipeline efficiently.</p>
                </div>
                <Link to="/create-candidate">
                    <Button className="flex items-center gap-2 shadow-indigo-300 shadow-lg hover:shadow-xl hover:shadow-indigo-300 transform transition-all hover:-translate-y-0.5">
                        <Plus className="h-5 w-5" />
                        Refer Candidate
                    </Button>
                </Link>
            </div>

            {stats && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                    <Card className="flex items-center justify-between p-6">
                        <div>
                            <p className="text-slate-500 text-sm font-medium">Total Candidates</p>
                            <p className="text-3xl font-bold text-slate-900 mt-1">{stats.total}</p>
                        </div>
                        <div className="bg-indigo-50 p-3 rounded-xl text-indigo-600">
                            <User className="h-6 w-6" />
                        </div>
                    </Card>
                    <Card className="flex items-center justify-between p-6">
                        <div>
                            <p className="text-slate-500 text-sm font-medium">Pending</p>
                            <p className="text-3xl font-bold text-slate-900 mt-1">{stats.pending}</p>
                        </div>
                        <div className="bg-yellow-50 p-3 rounded-xl text-yellow-600">
                            <Briefcase className="h-6 w-6" />
                        </div>
                    </Card>
                    <Card className="flex items-center justify-between p-6">
                        <div>
                            <p className="text-slate-500 text-sm font-medium">Reviewed</p>
                            <p className="text-3xl font-bold text-slate-900 mt-1">{stats.reviewed}</p>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
                            <Search className="h-6 w-6" />
                        </div>
                    </Card>
                    <Card className="flex items-center justify-between p-6">
                        <div>
                            <p className="text-slate-500 text-sm font-medium">Hired</p>
                            <p className="text-3xl font-bold text-slate-900 mt-1">{stats.hired}</p>
                        </div>
                        <div className="bg-green-50 p-3 rounded-xl text-green-600">
                            <User className="h-6 w-6" />
                        </div>
                    </Card>
                </div>
            )}

            <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row gap-2 items-center">
                <div className="relative flex-grow w-full md:w-auto">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search candidates by name, email, or role..."
                        className="pl-11 w-full px-4 py-3 bg-transparent border-none rounded-xl focus:ring-0 text-slate-900 placeholder-slate-400"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="h-8 w-px bg-slate-200 hidden md:block"></div>
                <select
                    className="w-full md:w-auto px-6 py-3 bg-transparent border-none focus:ring-0 text-slate-700 font-medium cursor-pointer"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Reviewed">Reviewed</option>
                    <option value="Hired">Hired</option>
                </select>
            </div>

            {loading ? (
                <div className="text-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-slate-500">Loading candidates...</p>
                </div>
            ) : candidates.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                    <User className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-900">No candidates found</h3>
                    <p className="text-slate-500">Try adjusting your search or filters.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {candidates.map((candidate) => (
                        <Card key={candidate._id} className="flex flex-col h-full group">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg">
                                            {candidate.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900 leading-tight">{candidate.name}</h3>
                                            <p className="text-slate-500 text-sm">{candidate.jobTitle}</p>
                                        </div>
                                    </div>
                                </div>
                                <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wide ${getStatusColor(candidate.status)}`}>
                                    {candidate.status}
                                </span>
                            </div>

                            <div className="space-y-3 mb-8 flex-grow">
                                <div className="flex items-center text-sm text-slate-600 bg-slate-50 p-2 rounded-lg">
                                    <Mail className="h-4 w-4 mr-3 text-slate-400" />
                                    <span className="truncate">{candidate.email}</span>
                                </div>
                                <div className="flex items-center text-sm text-slate-600 bg-slate-50 p-2 rounded-lg">
                                    <Phone className="h-4 w-4 mr-3 text-slate-400" />
                                    {candidate.phone}
                                </div>
                            </div>

                            <div className="mt-auto space-y-4">
                                {candidate.resumeUrl ? (
                                    <a
                                        href={candidate.resumeUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full"
                                    >
                                        <Button variant="secondary" className="w-full flex items-center justify-center gap-2 group-hover:border-indigo-200 group-hover:text-indigo-600 transition-colors">
                                            <FileText className="h-4 w-4" />
                                            View Resume
                                        </Button>
                                    </a>
                                ) : (
                                    <div className="text-center text-sm text-slate-400 italic py-2">No Resume Available</div>
                                )}

                                <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                                    <select
                                        className="flex-grow text-sm border-slate-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 py-1.5 bg-slate-50"
                                        value={candidate.status}
                                        onChange={(e) => handleStatusUpdate(candidate._id, e.target.value)}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Reviewed">Reviewed</option>
                                        <option value="Hired">Hired</option>
                                    </select>
                                    <button
                                        onClick={() => handleDelete(candidate._id)}
                                        className="text-slate-400 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors"
                                        title="Delete Candidate"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
