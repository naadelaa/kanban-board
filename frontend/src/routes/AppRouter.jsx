import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import TaskDetail from '../pages/TaskDetail';
import NotFound from '../pages/NotFound';

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />

                {/* Protected Routes */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/tasks/:taskId"
                    element={
                        <ProtectedRoute>
                            <TaskDetail />
                        </ProtectedRoute>
                    }
                />

                {/* 404 Page */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;