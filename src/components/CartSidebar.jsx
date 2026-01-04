import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import './CartSidebar.css';

const CartSidebar = () => {
    const {
        cartItems,
        isCartOpen,
        setIsCartOpen,
        updateQuantity,
        removeFromCart,
        getCartTotal
    } = useCart();

    const calculateItemPrice = (item) => {
        const sizePrice = item.size === 'L' ? 10000 : item.size === 'S' ? -5000 : 0;
        const toppingsPrice = item.toppings?.reduce((sum, t) => sum + t.price, 0) || 0;
        return (item.price + sizePrice + toppingsPrice) * item.quantity;
    };

    return (
        <>
            <div
                className={`cart-overlay ${isCartOpen ? 'open' : ''}`}
                onClick={() => setIsCartOpen(false)}
            />

            <aside className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
                <div className="cart-header">
                    <h2 className="cart-title">
                        <ShoppingBag size={24} />
                        Giỏ hàng ({cartItems.length})
                    </h2>
                    <button
                        className="cart-close"
                        onClick={() => setIsCartOpen(false)}
                        aria-label="Đóng"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="cart-items">
                    {cartItems.length === 0 ? (
                        <div className="cart-empty">
                            <ShoppingBag size={64} strokeWidth={1} />
                            <p>Giỏ hàng trống</p>
                            <Link
                                to="/products"
                                className="btn btn-primary"
                                onClick={() => setIsCartOpen(false)}
                            >
                                Mua sắm ngay
                            </Link>
                        </div>
                    ) : (
                        cartItems.map(item => (
                            <div key={item.cartId} className="cart-item">
                                <div className="cart-item-image">
                                    <img src={item.image} alt={item.name} />
                                </div>
                                <div className="cart-item-info">
                                    <h4 className="cart-item-name">{item.name}</h4>
                                    <p className="cart-item-variant">
                                        Size {item.size}
                                        {item.toppings?.length > 0 && (
                                            <> • {item.toppings.map(t => t.name).join(', ')}</>
                                        )}
                                    </p>
                                    <div className="cart-item-bottom">
                                        <div className="cart-item-qty">
                                            <button
                                                className="qty-btn"
                                                onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                                                aria-label="Giảm"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="qty-value">{item.quantity}</span>
                                            <button
                                                className="qty-btn"
                                                onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                                                aria-label="Tăng"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                        <span className="cart-item-price">
                                            {formatPrice(calculateItemPrice(item))}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    className="cart-item-remove"
                                    onClick={() => removeFromCart(item.cartId)}
                                    aria-label="Xóa"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="cart-footer">
                        <div className="cart-summary">
                            <div className="cart-summary-row">
                                <span>Tạm tính</span>
                                <span>{formatPrice(getCartTotal())}</span>
                            </div>
                            <div className="cart-summary-row">
                                <span>Phí vận chuyển</span>
                                <span>Miễn phí</span>
                            </div>
                            <div className="cart-summary-row total">
                                <span>Tổng cộng</span>
                                <span className="amount">{formatPrice(getCartTotal())}</span>
                            </div>
                        </div>
                        <Link
                            to="/cart"
                            className="btn btn-primary btn-lg btn-block"
                            onClick={() => setIsCartOpen(false)}
                        >
                            Thanh toán
                        </Link>
                    </div>
                )}
            </aside>
        </>
    );
};

export default CartSidebar;
