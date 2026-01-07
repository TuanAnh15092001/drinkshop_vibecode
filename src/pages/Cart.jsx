import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../data/products';
import PaymentMethodModal from '../components/PaymentMethodModal';
import './Cart.css';

const Cart = () => {
    const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const handleCheckout = () => {
        if (!currentUser) {
            // Chưa đăng nhập, chuyển đến trang login
            navigate('/login', { state: { from: '/cart', message: 'Vui lòng đăng nhập để tiến hành thanh toán' } });
            return;
        }
        setShowPaymentModal(true);
    };

    const calculateItemPrice = (item) => {
        const sizePrice = item.size === 'L' ? 10000 : item.size === 'S' ? -5000 : 0;
        const toppingsPrice = item.toppings?.reduce((sum, t) => sum + t.price, 0) || 0;
        return (item.price + sizePrice + toppingsPrice) * item.quantity;
    };

    if (cartItems.length === 0) {
        return (
            <div className="cart-page">
                <div className="container">
                    <div className="cart-empty-page">
                        <ShoppingBag size={80} strokeWidth={1} />
                        <h2>Giỏ hàng trống</h2>
                        <p>Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm</p>
                        <Link to="/products" className="btn btn-primary btn-lg">
                            Khám phá sản phẩm
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="container">
                <h1 className="cart-page-title">Giỏ Hàng</h1>

                <div className="cart-layout">
                    {/* Cart Items */}
                    <div className="cart-items-list">
                        <div className="cart-list-header">
                            <span>Sản phẩm ({cartItems.length})</span>
                            <button className="clear-cart" onClick={clearCart}>
                                Xóa tất cả
                            </button>
                        </div>

                        {cartItems.map(item => (
                            <div key={item.cartId} className="cart-list-item">
                                <div className="cart-list-image">
                                    <img src={item.image} alt={item.name} />
                                </div>

                                <div className="cart-list-info">
                                    <Link to={`/product/${item.id}`} className="cart-list-name">
                                        {item.name}
                                    </Link>
                                    <p className="cart-list-variant">
                                        Size {item.size}
                                        {item.toppings?.length > 0 && (
                                            <> • {item.toppings.map(t => t.name).join(', ')}</>
                                        )}
                                    </p>
                                </div>

                                <div className="cart-list-quantity">
                                    <button
                                        className="qty-btn"
                                        onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        className="qty-btn"
                                        onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>

                                <div className="cart-list-price">
                                    {formatPrice(calculateItemPrice(item))}
                                </div>

                                <button
                                    className="cart-list-remove"
                                    onClick={() => removeFromCart(item.cartId)}
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="order-summary">
                        <h3>Tóm Tắt Đơn Hàng</h3>

                        <div className="summary-rows">
                            <div className="summary-row">
                                <span>Tạm tính</span>
                                <span>{formatPrice(getCartTotal())}</span>
                            </div>
                            <div className="summary-row">
                                <span>Phí vận chuyển</span>
                                <span className="free">Miễn phí</span>
                            </div>
                            <div className="summary-row">
                                <span>Giảm giá</span>
                                <span>-{formatPrice(0)}</span>
                            </div>
                        </div>

                        <div className="summary-total">
                            <span>Tổng cộng</span>
                            <span className="total-price">{formatPrice(getCartTotal())}</span>
                        </div>

                        <div className="promo-code">
                            <input
                                type="text"
                                placeholder="Nhập mã giảm giá"
                                className="promo-input"
                            />
                            <button className="btn btn-secondary">Áp dụng</button>
                        </div>

                        <button 
                            className="btn btn-primary btn-lg btn-block checkout-btn"
                            onClick={handleCheckout}
                        >
                            <CreditCard size={20} />
                            Tiến hành thanh toán
                        </button>

                        <div className="payment-methods">
                            <span>Hỗ trợ thanh toán:</span>
                            <div className="payment-icons">
                                <img src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png" alt="MoMo" />
                                <img src="https://vinadesign.vn/uploads/images/2023/05/vnpay-logo-vinadesign-25-12-57-55.jpg" alt="VNPay" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <PaymentMethodModal 
                isOpen={showPaymentModal} 
                onClose={() => setShowPaymentModal(false)} 
                totalAmount={getCartTotal()}
                cartItems={cartItems}
                onPaymentSuccess={() => {
                    clearCart();
                    setShowPaymentModal(false);
                }}
            />
        </div>
    );
};

export default Cart;
