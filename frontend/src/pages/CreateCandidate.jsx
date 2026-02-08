import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X } from 'lucide-react';
import api from '../api/axios';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';

const CreateCandidate = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', jobTitle: '' });
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });
    const handleFileChange = (e) => setResume(e.target.files[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        if (resume) data.append('resume', resume);

        try {
            await api.post('/candidates', data, { headers: { 'Content-Type': 'multipart/form-data' } });
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Error creating candidate');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Refer a Candidate</h1>
            <p className="text-slate-500 mb-8">Add a new candidate to your tracking pipeline.</p>

            <Card className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg font-medium">{error}</div>}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input label="Full Name" id="name" value={formData.name} onChange={handleChange} required placeholder="Parth Tandalwade" />
                        <Input label="Job Title" id="jobTitle" value={formData.jobTitle} onChange={handleChange} required placeholder="Software Engineer" />
                        <Input label="Email Address" id="email" type="email" value={formData.email} onChange={handleChange} required placeholder="parth@example.com" />
                        <Input label="Phone Number" id="phone" value={formData.phone} onChange={handleChange} required placeholder="1234567890" maxLength="10" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Resume (PDF)</label>
                        <div className={`mt-1 border-2 border-dashed rounded-xl transition-all ${resume ? 'border-indigo-300 bg-indigo-50/50' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}>
                            {resume ? (
                                <div className="p-6 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                                            <Upload className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">{resume.name}</p>
                                            <p className="text-xs text-slate-500">{(resume.size / 1024 / 1024).toFixed(2)} MB</p>
                                        </div>
                                    </div>
                                    <button onClick={() => setResume(null)} type="button" className="p-1 hover:bg-white rounded-full text-slate-400 hover:text-red-500 transition-colors">
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>
                            ) : (
                                <div className="p-8 text-center">
                                    <div className="mx-auto h-12 w-12 text-slate-300 mb-3">
                                        <Upload className="h-full w-full" />
                                    </div>
                                    <div className="flex text-sm text-slate-600 justify-center mb-1">
                                        <label htmlFor="resume" className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none">
                                            <span>Upload a file</span>
                                            <input id="resume" name="resume" type="file" className="sr-only" accept=".pdf" onChange={handleFileChange} />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-slate-400">PDF up to 5MB</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                        <Button variant="ghost" onClick={() => navigate('/')} type="button">Cancel</Button>
                        <Button type="submit" disabled={loading} className="min-w-[140px]">
                            {loading ? 'Submitting...' : 'Submit Referral'}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default CreateCandidate;
