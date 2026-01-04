import { useEffect, useState } from 'react';
import { ShoppingBag, Star, DollarSign, Package } from 'lucide-react';
import { getAllProducts } from '../../services/productService';
import { formatPrice } from '../../data/products';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalProducts: 0,
        avgRating: 0,
        totalReviews: 0,
        lowestPrice: 0,
        highestPrice: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            const products = await getAllProducts();
            if (products.length === 0) return;

            const total = products.length;
            const avgRating = products.reduce((acc, p) => acc + (p.rating || 0), 0) / total;
            const totalReviews = products.reduce((acc, p) => acc + (p.reviews || 0), 0);
            const prices = products.map(p => p.price);

            setStats({
                totalProducts: total,
                avgRating: avgRating.toFixed(1),
                totalReviews,
                lowestPrice: Math.min(...prices),
                highestPrice: Math.max(...prices)
            });
        };
        fetchStats();
    }, []);

    const cards = [
        {
            title: 'Tổng sản phẩm',
            val: stats.totalProducts,
            icon: Package,
            color: 'blue'
        },
        {
            title: 'Đánh giá trung bình',
            val: stats.avgRating,
            icon: Star,
            color: 'yellow'
        },
        {
            title: 'Giá thấp nhất',
            val: formatPrice(stats.lowestPrice),
            icon: DollarSign,
            color: 'green'
        },
        {
            title: 'Giá cao nhất',
            val: formatPrice(stats.highestPrice),
            icon: DollarSign,
            color: 'purple'
        }
    ];

    return (
        <div className="admin-dashboard">
            <div className="dashboard-grid">
                {cards.map((card, idx) => (
                    <div key={idx} className={`stat-card ${card.color}`}>
                        <div className="stat-icon">
                            <card.icon size={24} />
                        </div>
                        <div className="stat-info">
                            <h3>{card.val}</h3>
                            <p>{card.title}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="dashboard-welcome">
                <h2>Chào mừng trở lại!</h2>
                <p>Chọn các mục từ menu bên trái để quản lý cửa hàng của bạn.</p>
            </div>
        </div>
    );
};

export default AdminDashboard;
