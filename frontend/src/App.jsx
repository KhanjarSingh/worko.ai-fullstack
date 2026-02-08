import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateCandidate from './pages/CreateCandidate';
import LandingPage from './pages/LandingPage';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return children;
};

const PublicRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

const App = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <Routes>
                <Route path="/" element={
                    <PublicRoute>
                        <LandingPage />
                    </PublicRoute>
                } />
                <Route path="/login" element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                } />
                <Route path="/register" element={
                    <PublicRoute>
                        <Register />
                    </PublicRoute>
                } />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/create-candidate"
                    element={
                        <ProtectedRoute>
                            <CreateCandidate />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </div>
    );
};

export default App;