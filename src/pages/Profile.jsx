import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, MapPin, Mail, Save, Loader, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getUserProfile, saveUserProfile } from '../services/userService';
import './Profile.css';

const Profile = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState('');
    
    const [formData, setFormData] = useState({
        displayName: '',
        phone: '',
        address: ''
    });

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
            return;
        }

        const fetchProfile = async () => {
            setLoading(true);
            try {
                const profile = await getUserProfile(currentUser.uid);
                if (profile) {
                    setFormData({
                        displayName: profile.displayName || currentUser.displayName || '',
                        phone: profile.phone || '',
                        address: profile.address || ''
                    });
                } else {
                    setFormData({
                        displayName: currentUser.displayName || '',
                        phone: '',
                        address: ''
                    });
                }
            } catch (err) {
                console.error('Error fetching profile:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [currentUser, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setSaved(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSaving(true);

        try {
            await saveUserProfile(currentUser.uid, {
                displayName: formData.displayName,
                phone: formData.phone,
                address: formData.address,
                email: currentUser.email
            });
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (err) {
            setError('Có lỗi xảy ra, vui lòng thử lại!');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="profile-page">
                <div className="container">
                    <div className="loading-state">
                        <Loader size={40} className="spin" />
                        <p>Đang tải thông tin...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-page">
            <div className="container">
                <div className="profile-header">
                    <h1>Thông Tin Tài Khoản</h1>
                    <p>Quản lý thông tin cá nhân của bạn</p>
                </div>

                <div className="profile-content">
                    <div className="profile-avatar-section">
                        <div className="profile-avatar">
                            {currentUser?.photoURL ? (
                                <img src={currentUser.photoURL} alt="Avatar" />
                            ) : (
                                <User size={48} />
                            )}
                        </div>
                        <div className="profile-email">
                            <Mail size={16} />
                            {currentUser?.email}
                        </div>
                    </div>

                    <form className="profile-form" onSubmit={handleSubmit}>
                        {error && <div className="error-message">{error}</div>}
                        {saved && (
                            <div className="success-message">
                                <Check size={18} />
                                Đã lưu thông tin thành công!
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="displayName">
                                <User size={18} />
                                Họ và tên
                            </label>
                            <input
                                type="text"
                                id="displayName"
                                name="displayName"
                                value={formData.displayName}
                                onChange={handleChange}
                                placeholder="Nhập họ và tên"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">
                                <Phone size={18} />
                                Số điện thoại
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Nhập số điện thoại"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="address">
                                <MapPin size={18} />
                                Địa chỉ giao hàng
                            </label>
                            <textarea
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Nhập địa chỉ giao hàng"
                                rows={3}
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="btn btn-primary btn-lg save-btn"
                            disabled={saving}
                        >
                            {saving ? (
                                <>
                                    <Loader size={20} className="spin" />
                                    Đang lưu...
                                </>
                            ) : (
                                <>
                                    <Save size={20} />
                                    Lưu thông tin
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
