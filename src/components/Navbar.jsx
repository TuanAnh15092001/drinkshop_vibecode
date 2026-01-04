import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Coffee, LogOut, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { getCartCount, setIsCartOpen } = useCart();
    const { currentUser, logout } = useAuth();
    const userMenuRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsUserMenuOpen(false);
    }, [location.pathname]);

    // Close user menu on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setIsUserMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const navLinks = [
        { path: '/', label: 'Trang Chủ' },
        { path: '/products', label: 'Sản Phẩm' },
        { path: '/products?category=tra-sua', label: 'Trà Sữa' },
        { path: '/products?category=ca-phe', label: 'Cà Phê' },
    ];

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container navbar-container">
                <Link to="/" className="navbar-logo">
                    <div className="navbar-logo-icon">
                        <Coffee size={24} />
                    </div>
                    <span>Drink<span className="text-gradient">Shop</span></span>
                </Link>

                <ul className={`navbar-nav ${isMobileMenuOpen ? 'open' : ''}`}>
                    {navLinks.map(link => (
                        <li key={link.path}>
                            <Link
                                to={link.path}
                                className={`navbar-link ${location.pathname === link.path ? 'active' : ''}`}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="navbar-actions">
                    {currentUser ? (
                        <div className="user-menu" ref={userMenuRef}>
                            <button
                                className="user-menu-trigger"
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                            >
                                <div className="user-avatar">
                                    {currentUser.photoURL ? (
                                        <img src={currentUser.photoURL} alt={currentUser.displayName} />
                                    ) : (
                                        <User size={18} />
                                    )}
                                </div>
                                <span className="user-name hide-mobile">
                                    {currentUser.displayName || currentUser.email?.split('@')[0]}
                                </span>
                                <ChevronDown size={16} className={`chevron ${isUserMenuOpen ? 'open' : ''}`} />
                            </button>

                            {isUserMenuOpen && (
                                <div className="user-dropdown">
                                    <div className="user-dropdown-header">
                                        <div className="user-dropdown-avatar">
                                            {currentUser.photoURL ? (
                                                <img src={currentUser.photoURL} alt={currentUser.displayName} />
                                            ) : (
                                                <User size={24} />
                                            )}
                                        </div>
                                        <div className="user-dropdown-info">
                                            <span className="user-dropdown-name">
                                                {currentUser.displayName || 'Người dùng'}
                                            </span>
                                            <span className="user-dropdown-email">{currentUser.email}</span>
                                        </div>
                                    </div>
                                    <div className="user-dropdown-divider"></div>
                                    <Link to="/orders" className="user-dropdown-item">
                                        Đơn hàng của tôi
                                    </Link>
                                    <Link to="/profile" className="user-dropdown-item">
                                        Tài khoản
                                    </Link>
                                    <div className="user-dropdown-divider"></div>
                                    <button className="user-dropdown-item logout" onClick={handleLogout}>
                                        <LogOut size={16} />
                                        Đăng xuất
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="btn btn-secondary btn-sm">
                            <User size={18} />
                            <span className="hide-mobile">Đăng nhập</span>
                        </Link>
                    )}

                    <button
                        className="btn btn-icon cart-icon"
                        onClick={() => setIsCartOpen(true)}
                        aria-label="Giỏ hàng"
                    >
                        <ShoppingCart size={20} />
                        {getCartCount() > 0 && (
                            <span className="cart-count">{getCartCount()}</span>
                        )}
                    </button>

                    <button
                        className="navbar-menu-btn"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Menu"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="mobile-menu-overlay" onClick={() => setIsMobileMenuOpen(false)} />
            )}
        </nav>
    );
};

export default Navbar;
