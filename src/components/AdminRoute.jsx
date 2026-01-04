import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader } from 'lucide-react';

const AdminRoute = ({ children }) => {
    const { currentUser, loading } = useAuth();
    const location = useLocation();

    // List of allowed admin emails
    // In a real app, this should be a custom claim or a role in Firestore user document
    const ADMIN_EMAILS = ['admin@gmail.com', 'admin@drinkshop.com'];

    if (loading) {
        return (
            <div style={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#0f172a'
            }}>
                <Loader className="spin" size={40} color="#fb923c" />
            </div>
        );
    }

    // Check if user is logged in
    if (!currentUser) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Check if user is admin (Simple email check for MVP)
    // You can temporarily comment this out to allow any logged-in user to access admin for testing
    if (!ADMIN_EMAILS.includes(currentUser.email)) {
        return (
            <div style={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#0f172a',
                color: 'white',
                gap: '20px'
            }}>
                <h2>Truy cập bị từ chối</h2>
                <p>Tài khoản {currentUser.email} không có quyền truy cập trang này.</p>
                <button
                    onClick={() => window.location.href = '/'}
                    style={{
                        padding: '10px 20px',
                        background: '#fb923c',
                        border: 'none',
                        borderRadius: '8px',
                        color: 'white',
                        cursor: 'pointer'
                    }}
                >
                    Về Trang Chủ
                </button>
            </div>
        );
    }

    return children;
};

export default AdminRoute;
