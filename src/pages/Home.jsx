import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Coffee, Award, Truck } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { getBestSellers, categories } from '../data/products';
import './Home.css';

const Home = () => {
    const bestSellers = getBestSellers().slice(0, 4);

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <div className="hero-content">
                        <span className="hero-badge">
                            <Sparkles size={16} />
                            Ưu đãi đặc biệt 20%
                        </span>
                        <h1 className="hero-title">
                            Thưởng Thức Hương Vị <span className="text-gradient">Tuyệt Vời</span>
                        </h1>
                        <p className="hero-description">
                            Khám phá bộ sưu tập đồ uống cao cấp của chúng tôi - từ trà sữa thơm ngon
                            đến cà phê đậm đà, mang đến cho bạn những giây phút thư giãn tuyệt vời nhất.
                        </p>
                        <div className="hero-actions">
                            <Link to="/products" className="btn btn-primary btn-lg">
                                Khám Phá Ngay
                                <ArrowRight size={20} />
                            </Link>
                            <Link to="/products?category=ca-phe" className="btn btn-secondary btn-lg">
                                Xem Menu
                            </Link>
                        </div>
                    </div>
                    <div className="hero-image">
                        <img
                            src="https://images.unsplash.com/photo-1558857563-b371033873b8?w=600"
                            alt="Trà sữa thơm ngon"
                        />
                        <div className="hero-float-card">
                            <Coffee size={24} />
                            <div>
                                <strong>50+</strong>
                                <span>Loại đồ uống</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="features">
                <div className="container">
                    <div className="features-grid">
                        <div className="feature-item">
                            <div className="feature-icon">
                                <Award size={28} />
                            </div>
                            <h3>Chất Lượng Cao</h3>
                            <p>Nguyên liệu tươi ngon, nhập khẩu chính hãng</p>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">
                                <Truck size={28} />
                            </div>
                            <h3>Giao Hàng Nhanh</h3>
                            <p>Miễn phí giao hàng cho đơn từ 100K</p>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">
                                <Coffee size={28} />
                            </div>
                            <h3>Đa Dạng Menu</h3>
                            <p>50+ loại đồ uống độc đáo, hấp dẫn</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="section categories-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-subtitle">Danh Mục</span>
                        <h2 className="section-title">Khám Phá Theo Loại</h2>
                    </div>
                    <div className="categories-grid">
                        {categories.map(category => (
                            <Link
                                key={category.id}
                                to={`/products?category=${category.id}`}
                                className="category-card"
                            >
                                <img src={category.image} alt={category.name} />
                                <div className="category-content">
                                    <h3 className="category-title">{category.name}</h3>
                                    <span className="category-count">{category.count} sản phẩm</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Best Sellers */}
            <section className="section bestsellers-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-subtitle">Bán Chạy Nhất</span>
                        <h2 className="section-title">Được Yêu Thích</h2>
                        <p className="section-description">
                            Những thức uống được khách hàng ưa chuộng nhất tại DrinkShop
                        </p>
                    </div>
                    <div className="products-grid">
                        {bestSellers.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                    <div className="section-footer">
                        <Link to="/products" className="btn btn-outline btn-lg">
                            Xem Tất Cả Sản Phẩm
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-content">
                        <h2>Đăng Ký Nhận Ưu Đãi</h2>
                        <p>Nhận ngay voucher giảm 30% cho đơn hàng đầu tiên!</p>
                        <form className="cta-form">
                            <input
                                type="email"
                                placeholder="Nhập email của bạn"
                                className="cta-input"
                            />
                            <button type="submit" className="btn btn-primary">
                                Đăng Ký
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
