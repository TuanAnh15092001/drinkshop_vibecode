import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, LogOut, Home, Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './AdminLayout.css';
import { useState } from 'react';

const AdminLayout = () => {
    const { logout, currentUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    const navItems = [
        { path: '/admin', icon: LayoutDashboard, label: 'Tổng quan' },
        { path: '/admin/products', icon: ShoppingBag, label: 'Sản phẩm' },
        // { path: '/admin/orders', icon: ShoppingBag, label: 'Đơn hàng' },
    ];

    return (
        <div className="admin-layout">
            <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="admin-sidebar-header">
                    <h2>Admin Panel</h2>
                    <p className="admin-email">{currentUser?.email}</p>
                </div>

                <nav className="admin-nav">
                    {navItems.map(item => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`admin-nav-item ${location.pathname === item.path ? 'active' : ''}`}
                            onClick={() => setSidebarOpen(false)}
                        >
                            <item.icon size={20} />
                            <span>{item.label}</span>
                        </Link>
                    ))}

                    <div className="admin-nav-divider"></div>

                    <Link to="/" className="admin-nav-item">
                        <Home size={20} />
                        <span>Xem trang chủ</span>
                    </Link>

                    <button onClick={handleLogout} className="admin-nav-item logout-btn">
                        <LogOut size={20} />
                        <span>Đăng xuất</span>
                    </button>
                </nav>
            </aside>

            <div className="admin-main">
                <header className="admin-header">
                    <button
                        className="admin-menu-toggle"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        <Menu size={24} />
                    </button>
                    <h3>{navItems.find(i => i.path === location.pathname)?.label || 'Dashboard'}</h3>
                </header>

                <main className="admin-content">
                    <Outlet />
                </main>
            </div>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="admin-overlay"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}
        </div>
    );
};

export default AdminLayout;
