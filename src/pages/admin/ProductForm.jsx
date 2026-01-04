import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Plus, Trash2, Save, Loader } from 'lucide-react';
import { getProductById, addProduct, updateProduct } from '../../services/productService';
import { categories } from '../../data/products';
import { SIZE_PRICES, TOPPING_DEFAULT_PRICE } from '../../constants/priceDefaults';
import './ProductForm.css';

const ProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        category: 'tra-sua',
        price: '',
        description: '',
        image: '',
        sizes: [
            { name: 'S', price: -5000 },
            { name: 'M', price: 0 },
            { name: 'L', price: 10000 }
        ],
        toppings: [],
        rating: 5,
        reviews: 0,
        isNew: true,
        isBestSeller: false
    });

    useEffect(() => {
        if (isEditMode) {
            const fetchProduct = async () => {
                setLoading(true);
                try {
                    const product = await getProductById(id);
                    if (product) {
                        setFormData({
                            ...product,
                            price: product.price || '',
                        });
                    }
                } catch (error) {
                    console.error('Error fetching product:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchProduct();
        }
    }, [id, isEditMode]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // --- Array Handling for Sizes ---
    const handleSizeChange = (index, field, value) => {
        const newSizes = [...formData.sizes];
        newSizes[index][field] = field === 'price' ? Number(value) : value;
        setFormData({ ...formData, sizes: newSizes });
    };

    const addSize = () => {
        setFormData({
            ...formData,
            sizes: [...formData.sizes, { name: '', price: 0 }]
        });
    };

    const removeSize = (index) => {
        setFormData({
            ...formData,
            sizes: formData.sizes.filter((_, i) => i !== index)
        });
    };

    // --- Array Handling for Toppings ---
    const handleToppingChange = (index, field, value) => {
        const newToppings = [...formData.toppings];
        newToppings[index][field] = field === 'price' ? Number(value) : value;
        setFormData({ ...formData, toppings: newToppings });
    };

    const addTopping = () => {
        setFormData({
            ...formData,
            toppings: [...formData.toppings, { id: Date.now(), name: '', price: TOPPING_DEFAULT_PRICE }]
        });
    };

    const removeTopping = (index) => {
        setFormData({
            ...formData,
            toppings: formData.toppings.filter((_, i) => i !== index)
        });
    };

    // --- Submit ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const productData = {
                ...formData,
                price: Number(formData.price),
                categoryName: categories.find(c => c.id === formData.category)?.name || 'Khác',
                // Filter out empty items
                sizes: formData.sizes.filter(s => s.name.trim() !== ''),
                toppings: formData.toppings.filter(t => t.name.trim() !== '')
            };

            if (isEditMode) {
                await updateProduct(id, productData);
            } else {
                await addProduct(productData);
            }
            navigate('/admin/products');
        } catch (error) {
            console.error('Error saving product:', error);
            alert('Có lỗi xảy ra khi lưu sản phẩm');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return (
        <div className="product-form-loading">
            <Loader className="spin" size={32} />
        </div>
    );

    return (
        <div className="product-form-page">
            <div className="form-header">
                <button className="btn-back" onClick={() => navigate('/admin/products')}>
                    <ChevronLeft size={20} />
                    Quay lại
                </button>
                <h2>{isEditMode ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</h2>
            </div>

            <form onSubmit={handleSubmit} className="product-form">
                <div className="form-grid">
                    {/* Left Column: Basic Info */}
                    <div className="form-section">
                        <h3>Thông tin cơ bản</h3>

                        <div className="form-group">
                            <label>Tên sản phẩm</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Danh mục</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                >
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Giá cơ bản (VNĐ)</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Mô tả</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                            />
                        </div>

                        <div className="form-group">
                            <label>Link hình ảnh</label>
                            <input
                                type="url"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="https://..."
                            />
                        </div>
                        {formData.image && (
                            <div className="image-preview">
                                <img src={formData.image} alt="Preview" />
                            </div>
                        )}

                        <div className="form-row">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="isNew"
                                    checked={formData.isNew}
                                    onChange={handleChange}
                                />
                                Sản phẩm mới
                            </label>

                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="isBestSeller"
                                    checked={formData.isBestSeller}
                                    onChange={handleChange}
                                />
                                Bán chạy
                            </label>
                        </div>
                    </div>

                    {/* Right Column: Sizes & Toppings */}
                    <div className="form-section">
                        <h3>Cấu hình thêm</h3>

                        {/* Usage: Sizes */}
                        <div className="array-section">
                            <div className="section-header-small">
                                <label>Kích thước (Size)</label>
                                <button type="button" className="btn-small" onClick={addSize}>
                                    <Plus size={16} /> Thêm Size
                                </button>
                            </div>
                            {formData.sizes.map((size, index) => (
                                <div key={index} className="array-item">
                                    <input
                                        type="text"
                                        placeholder="Tên (S, M, L)"
                                        value={size.name}
                                        onChange={(e) => handleSizeChange(index, 'name', e.target.value)}
                                        className="input-small"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Giá (+/-)"
                                        value={size.price}
                                        onChange={(e) => handleSizeChange(index, 'price', e.target.value)}
                                        className="input-small"
                                    />
                                    <button
                                        type="button"
                                        className="btn-icon-small delete"
                                        onClick={() => removeSize(index)}
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Usage: Toppings */}
                        <div className="array-section">
                            <div className="section-header-small">
                                <label>Toppings</label>
                                <button type="button" className="btn-small" onClick={addTopping}>
                                    <Plus size={16} /> Thêm Topping
                                </button>
                            </div>
                            {formData.toppings.map((item, index) => (
                                <div key={index} className="array-item">
                                    <input
                                        type="text"
                                        placeholder="Tên topping"
                                        value={item.name}
                                        onChange={(e) => handleToppingChange(index, 'name', e.target.value)}
                                        className="input-small"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Giá"
                                        value={item.price}
                                        onChange={(e) => handleToppingChange(index, 'price', e.target.value)}
                                        className="input-small"
                                    />
                                    <button
                                        type="button"
                                        className="btn-icon-small delete"
                                        onClick={() => removeTopping(index)}
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn btn-primary btn-save" disabled={submitting}>
                        {submitting ? (
                            <>
                                <Loader size={20} className="spin" />
                                Đang lưu...
                            </>
                        ) : (
                            <>
                                <Save size={20} />
                                Lưu sản phẩm
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

// Simple X icon for size buttons since I forgot to import it
const X = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

export default ProductForm;
