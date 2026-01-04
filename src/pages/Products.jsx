import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';
import './Products.css';

const Products = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
    const [sortBy, setSortBy] = useState('default');
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        let result = [...products];

        // Filter by category
        if (selectedCategory && selectedCategory !== 'all') {
            result = result.filter(p => p.category === selectedCategory);
        }

        // Filter by search term
        if (searchTerm) {
            result = result.filter(p =>
                p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Sort
        switch (sortBy) {
            case 'price-asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                result.sort((a, b) => b.rating - a.rating);
                break;
            case 'name':
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                break;
        }

        setFilteredProducts(result);
    }, [selectedCategory, searchTerm, sortBy]);

    useEffect(() => {
        const category = searchParams.get('category');
        if (category) {
            setSelectedCategory(category);
        }
    }, [searchParams]);

    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);
        if (categoryId === 'all') {
            searchParams.delete('category');
        } else {
            searchParams.set('category', categoryId);
        }
        setSearchParams(searchParams);
    };

    return (
        <div className="products-page">
            <div className="container">
                {/* Header */}
                <div className="products-header">
                    <div>
                        <h1>Tất Cả Sản Phẩm</h1>
                        <p>{filteredProducts.length} sản phẩm</p>
                    </div>
                </div>

                {/* Controls */}
                <div className="products-controls">
                    <div className="search-box">
                        <Search size={20} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm sản phẩm..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                        {searchTerm && (
                            <button
                                className="search-clear"
                                onClick={() => setSearchTerm('')}
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>

                    <div className="controls-right">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="sort-select"
                        >
                            <option value="default">Sắp xếp</option>
                            <option value="price-asc">Giá: Thấp → Cao</option>
                            <option value="price-desc">Giá: Cao → Thấp</option>
                            <option value="rating">Đánh giá cao nhất</option>
                            <option value="name">Tên A-Z</option>
                        </select>

                        <button
                            className="filter-toggle"
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            <SlidersHorizontal size={20} />
                            <span>Lọc</span>
                        </button>
                    </div>
                </div>

                <div className="products-layout">
                    {/* Sidebar Filters */}
                    <aside className={`filters-sidebar ${showFilters ? 'open' : ''}`}>
                        <div className="filters-header">
                            <h3>Bộ lọc</h3>
                            <button
                                className="filters-close"
                                onClick={() => setShowFilters(false)}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="filter-group">
                            <h4>Danh mục</h4>
                            <div className="filter-options">
                                <label className="filter-option">
                                    <input
                                        type="radio"
                                        name="category"
                                        checked={selectedCategory === 'all'}
                                        onChange={() => handleCategoryChange('all')}
                                    />
                                    <span className="checkmark"></span>
                                    <span>Tất cả</span>
                                </label>
                                {categories.map(cat => (
                                    <label key={cat.id} className="filter-option">
                                        <input
                                            type="radio"
                                            name="category"
                                            checked={selectedCategory === cat.id}
                                            onChange={() => handleCategoryChange(cat.id)}
                                        />
                                        <span className="checkmark"></span>
                                        <span>{cat.name}</span>
                                        <span className="count">({cat.count})</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Products Grid */}
                    <div className="products-content">
                        {filteredProducts.length === 0 ? (
                            <div className="no-products">
                                <p>Không tìm thấy sản phẩm nào</p>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                        setSearchTerm('');
                                        setSelectedCategory('all');
                                    }}
                                >
                                    Xóa bộ lọc
                                </button>
                            </div>
                        ) : (
                            <div className="products-grid">
                                {filteredProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
