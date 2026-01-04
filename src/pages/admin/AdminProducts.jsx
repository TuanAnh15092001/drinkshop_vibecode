import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Search, Loader, AlertCircle } from 'lucide-react';
import { getAllProducts, deleteProduct, seedProducts } from '../../services/productService';
import { formatPrice, categories } from '../../data/products';
import { sampleProducts } from '../../data/seedData';
import './AdminProducts.css';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [deleteId, setDeleteId] = useState(null);
    const [seeding, setSeeding] = useState(false);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const data = await getAllProducts();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSeedData = async () => {
        if (!window.confirm('Bạn có chắc muốn thêm 20 sản phẩm mẫu vào Database?')) return;
        setSeeding(true);
        try {
            await seedProducts(sampleProducts);
            await fetchProducts();
            alert('Đã thêm dữ liệu mẫu thành công!');
        } catch (error) {
            console.error('Error seeding products:', error);
            alert('Lỗi khi thêm dữ liệu mẫu');
        } finally {
            setSeeding(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async () => {
        if (!deleteId) return;
        try {
            await deleteProduct(deleteId);
            setProducts(products.filter(p => p.id !== deleteId));
            setDeleteId(null);
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Có lỗi xảy ra khi xóa sản phẩm');
        }
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getCategoryName = (catId) => {
        const cat = categories.find(c => c.id === catId);
        return cat ? cat.name : catId;
    };

    if (loading) return (
        <div className="admin-loading">
            <Loader className="spin" size={32} />
        </div>
    );

    return (
        <div className="admin-products">
            <div className="admin-page-header">
                <h2>Quản lý sản phẩm</h2>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        onClick={handleSeedData}
                        className="btn btn-secondary"
                        disabled={seeding}
                    >
                        {seeding ? (
                            <>
                                <Loader size={20} className="spin" />
                                Đang thêm...
                            </>
                        ) : (
                            <>
                                <Plus size={20} />
                                Thêm dữ liệu mẫu
                            </>
                        )}
                    </button>
                    <Link to="/admin/products/new" className="btn btn-primary">
                        <Plus size={20} />
                        Thêm mới
                    </Link>
                </div>
            </div>

            <div className="admin-toolbar">
                <div className="search-box">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Tìm kiếm sản phẩm..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Ảnh</th>
                            <th>Tên sản phẩm</th>
                            <th>Danh mục</th>
                            <th>Giá gốc</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map(product => (
                            <tr key={product.id}>
                                <td>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="table-img"
                                    />
                                </td>
                                <td className="font-medium">{product.name}</td>
                                <td>
                                    <span className="badge-category">
                                        {getCategoryName(product.category)}
                                    </span>
                                </td>
                                <td>{formatPrice(product.price)}</td>
                                <td>
                                    <div className="action-buttons">
                                        <Link
                                            to={`/admin/products/edit/${product.id}`}
                                            className="btn-icon btn-edit"
                                            title="Sửa"
                                        >
                                            <Edit size={18} />
                                        </Link>
                                        <button
                                            className="btn-icon btn-delete"
                                            onClick={() => setDeleteId(product.id)}
                                            title="Xóa"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filteredProducts.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center">Không tìm thấy sản phẩm nào</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Delete Confirmation Modal */}
            {deleteId && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <AlertCircle size={32} className="text-danger" />
                            <h3>Xác nhận xóa</h3>
                        </div>
                        <p>Bạn có chắc chắn muốn xóa sản phẩm này không? Hành động này không thể hoàn tác.</p>
                        <div className="modal-actions">
                            <button
                                className="btn btn-secondary"
                                onClick={() => setDeleteId(null)}
                            >
                                Hủy
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={handleDelete}
                            >
                                Xóa
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProducts;
