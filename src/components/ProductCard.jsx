import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product, 1, 'M', []);
    };

    return (
        <Link to={`/product/${product.id}`} className="product-card">
            {product.isNew && <span className="badge badge-new">Mới</span>}
            {product.isBestSeller && !product.isNew && (
                <span className="badge badge-bestseller">Best Seller</span>
            )}

            <div className="product-image">
                <img src={product.image} alt={product.name} loading="lazy" />
                <div className="product-actions">
                    <button
                        className="action-btn"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        aria-label="Yêu thích"
                    >
                        <Heart size={18} />
                    </button>
                    <button
                        className="action-btn primary"
                        onClick={handleAddToCart}
                        aria-label="Thêm vào giỏ"
                    >
                        <ShoppingCart size={18} />
                    </button>
                </div>
            </div>

            <div className="product-content">
                <span className="product-category">{product.categoryName}</span>
                <h3 className="product-title">{product.name}</h3>

                <div className="product-rating">
                    <div className="product-stars">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={14}
                                fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                            />
                        ))}
                    </div>
                    <span className="product-rating-text">
                        {product.rating} ({product.reviews})
                    </span>
                </div>

                <div className="product-footer">
                    <span className="product-price">{formatPrice(product.price)}</span>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
