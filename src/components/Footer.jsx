import { Link } from 'react-router-dom';
import { Coffee, Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <Link to="/" className="footer-logo">
                            <div className="footer-logo-icon">
                                <Coffee size={24} />
                            </div>
                            <span>Drink<span className="text-gradient">Shop</span></span>
                        </Link>
                        <p className="footer-description">
                            DrinkShop - Thương hiệu đồ uống hàng đầu Việt Nam. Chúng tôi mang đến cho bạn những thức uống
                            thơm ngon, tươi mát với nguyên liệu chất lượng cao.
                        </p>
                        <div className="footer-social">
                            <a href="#" aria-label="Facebook"><Facebook size={18} /></a>
                            <a href="#" aria-label="Instagram"><Instagram size={18} /></a>
                            <a href="#" aria-label="Twitter"><Twitter size={18} /></a>
                            <a href="#" aria-label="Youtube"><Youtube size={18} /></a>
                        </div>
                    </div>

                    <div className="footer-column">
                        <h4 className="footer-title">Sản Phẩm</h4>
                        <ul className="footer-links">
                            <li><Link to="/products?category=tra-sua" className="footer-link">Trà Sữa</Link></li>
                            <li><Link to="/products?category=ca-phe" className="footer-link">Cà Phê</Link></li>
                            <li><Link to="/products?category=sinh-to" className="footer-link">Sinh Tố</Link></li>
                            <li><Link to="/products?category=nuoc-ep" className="footer-link">Nước Ép</Link></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h4 className="footer-title">Hỗ Trợ</h4>
                        <ul className="footer-links">
                            <li><Link to="/about" className="footer-link">Về Chúng Tôi</Link></li>
                            <li><Link to="/contact" className="footer-link">Liên Hệ</Link></li>
                            <li><Link to="/faq" className="footer-link">FAQ</Link></li>
                            <li><Link to="/policy" className="footer-link">Chính Sách</Link></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h4 className="footer-title">Liên Hệ</h4>
                        <ul className="footer-contact">
                            <li>
                                <MapPin size={16} />
                                <span>123 Nguyễn Huệ, Q.1, TP.HCM</span>
                            </li>
                            <li>
                                <Phone size={16} />
                                <span>1900 1234 56</span>
                            </li>
                            <li>
                                <Mail size={16} />
                                <span>hello@drinkshop.vn</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="footer-copyright">
                        © 2024 DrinkShop. All rights reserved.
                    </p>
                    <div className="footer-payment">
                        <img src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png" alt="MoMo" height="24" />
                        <img src="https://vinadesign.vn/uploads/images/2023/05/vnpay-logo-vinadesign-25-12-57-55.jpg" alt="VNPay" height="24" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
