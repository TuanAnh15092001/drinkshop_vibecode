import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Plus, Minus, ShoppingCart, Heart, ChevronLeft, Check, Loader } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getProductById, getAllProducts } from '../services/productService';
import { formatPrice } from '../data/products';
import ProductCard from '../components/ProductCard';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedToppings, setSelectedToppings] = useState([]);
    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        const fetchProductData = async () => {
            setLoading(true);
            try {
                const productData = await getProductById(id);
                if (productData) {
                    setProduct(productData);
                    // Set default size (prefer 'M' or first available)
                    const defaultSize = productData.sizes?.find(s => s.name === 'M') || productData.sizes?.[0] || { name: 'M', price: 0 };
                    setSelectedSize(defaultSize);

                    // Fetch related products
                    const allProd = await getAllProducts();
                    const related = allProd
                        .filter(p => p.category === productData.category && p.id !== productData.id)
                        .slice(0, 4);
                    setRelatedProducts(related);
                }
            } catch (error) {
                console.error('Error fetching product detail:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProductData();
    }, [id]);

    if (loading) {
        return (
            <div className="loading-container" style={{ textAlign: 'center', padding: '100px 0' }}>
                <Loader size={40} className="spin" color="var(--primary-400)" />
                <p style={{ marginTop: '20px' }}>Đang tải chi tiết sản phẩm...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="product-not-found">
                <h2>Không tìm thấy sản phẩm</h2>
                <Link to="/products" className="btn btn-primary">Quay lại danh sách</Link>
            </div>
        );
    }

    const handleToppingToggle = (topping) => {
        setSelectedToppings(prev => {
            const exists = prev.find(t => t.id === topping.id);
            if (exists) {
                return prev.filter(t => t.id !== topping.id);
            }
            return [...prev, topping];
        });
    };

    const calculatePrice = () => {
        const sizePriceAdjustment = Number(selectedSize?.price) || 0;
        const toppingsPrice = selectedToppings.reduce((sum, t) => sum + (Number(t.price) || 0), 0);
        return (Number(product.price || 0) + sizePriceAdjustment + toppingsPrice) * quantity;
    };

    const handleAddToCart = () => {
        addToCart(product, quantity, selectedSize?.name || 'M', selectedToppings);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div className="product-detail">
            <div className="container">
                {/* Breadcrumb */}
                <nav className="breadcrumb">
                    <Link to="/">Trang chủ</Link>
                    <span>/</span>
                    <Link to="/products">Sản phẩm</Link>
                    <span>/</span>
                    <span>{product.name}</span>
                </nav>

                <div className="product-detail-grid">
                    {/* Image */}
                    <div className="product-detail-image">
                        <img src={product.image} alt={product.name} />
                        {product.isNew && <span className="badge badge-new">Mới</span>}
                    </div>

                    {/* Info */}
                    <div className="product-detail-info">
                        <span className="product-detail-category">{product.categoryName || product.category}</span>
                        <h1 className="product-detail-title">{product.name}</h1>

                        <div className="product-detail-rating">
                            <div className="stars">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={18}
                                        fill={i < Math.floor(product.rating || 0) ? 'currentColor' : 'none'}
                                    />
                                ))}
                            </div>
                            <span>{product.rating || 0}</span>
                            <span className="reviews">({product.reviews || 0} đánh giá)</span>
                        </div>

                        <p className="product-detail-description">{product.description}</p>

                        {/* Size Selection */}
                        <div className="option-group">
                            <h4>Chọn size</h4>
                            <div className="size-options">
                                {(product.sizes && product.sizes.length > 0 ? product.sizes : [
                                    { name: 'S', price: -5000 },
                                    { name: 'M', price: 0 },
                                    { name: 'L', price: 10000 }
                                ]).map(size => (
                                    <button
                                        key={size.name}
                                        className={`size-btn ${selectedSize?.name === size.name ? 'active' : ''}`}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        <span className="size-name">{size.name}</span>
                                        <span className="size-price">
                                            {size.price > 0 ? `+${formatPrice(size.price)}` :
                                                size.price < 0 ? formatPrice(size.price) : 'Mặc định'}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Toppings */}
                        {product.toppings && product.toppings.length > 0 && (
                            <div className="option-group">
                                <h4>Topping thêm</h4>
                                <div className="topping-options">
                                    {product.toppings.map(topping => (
                                        <label
                                            key={topping.id}
                                            className={`topping-btn ${selectedToppings.find(t => t.id === topping.id) ? 'active' : ''}`}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={!!selectedToppings.find(t => t.id === topping.id)}
                                                onChange={() => handleToppingToggle(topping)}
                                            />
                                            <span className="topping-check">
                                                <Check size={14} />
                                            </span>
                                            <span className="topping-name">{topping.name}</span>
                                            <span className="topping-price">+{formatPrice(topping.price || 0)}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quantity & Price */}
                        <div className="product-detail-footer">
                            <div className="quantity-selector">
                                <button
                                    className="qty-btn"
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                >
                                    <Minus size={18} />
                                </button>
                                <span className="qty-value">{quantity}</span>
                                <button
                                    className="qty-btn"
                                    onClick={() => setQuantity(q => q + 1)}
                                >
                                    <Plus size={18} />
                                </button>
                            </div>

                            <div className="product-detail-price">
                                <span className="label">Tổng tiền</span>
                                <span className="price">{formatPrice(calculatePrice())}</span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="product-detail-actions">
                            <button className="btn btn-icon btn-secondary">
                                <Heart size={20} />
                            </button>
                            <button
                                className={`btn btn-primary btn-lg flex-1 ${isAdded ? 'added' : ''}`}
                                onClick={handleAddToCart}
                            >
                                {isAdded ? (
                                    <>
                                        <Check size={20} />
                                        Đã thêm vào giỏ
                                    </>
                                ) : (
                                    <>
                                        <ShoppingCart size={20} />
                                        Thêm vào giỏ hàng
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <section className="related-section">
                        <h2>Sản Phẩm Liên Quan</h2>
                        <div className="products-grid">
                            {relatedProducts.map(p => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;
