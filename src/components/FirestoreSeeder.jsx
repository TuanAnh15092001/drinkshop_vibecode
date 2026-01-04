import { useState, useEffect } from 'react';
import {
    collection,
    getDocs
} from 'firebase/firestore';
import { db } from '../firebase';
import { products } from '../data/products';
import { seedProducts } from '../services/productService';
import { Loader, Database, Check, AlertCircle } from 'lucide-react';

const FirestoreSeeder = () => {
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [count, setCount] = useState(0);

    useEffect(() => {
        const checkProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'products'));
                setCount(querySnapshot.size);
            } catch (error) {
                console.error('Error checking products:', error);
            }
        };
        checkProducts();
    }, []);

    const handleSeed = async () => {
        if (!window.confirm('Bạn có chắc chắn muốn nạp dữ liệu mẫu lên Firestore?')) return;

        setStatus('loading');
        try {
            await seedProducts(products);
            setStatus('success');
            const querySnapshot = await getDocs(collection(db, 'products'));
            setCount(querySnapshot.size);
        } catch (error) {
            console.error('Seed error:', error);
            setStatus('error');
        }
    };

    return (
        <div style={{
            padding: '20px',
            background: 'var(--bg-glass)',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            margin: '20px 0'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <Database size={24} color="var(--primary-400)" />
                <h3 style={{ margin: 0 }}>Firestore Data Manager</h3>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '20px' }}>
                Hiện tại có <strong>{count}</strong> sản phẩm trong Firestore.
            </p>

            {status === 'idle' && (
                <button
                    className="btn btn-secondary btn-block"
                    onClick={handleSeed}
                    disabled={count > 0}
                >
                    {count > 0 ? 'Dữ liệu đã có sẵn' : 'Nạp dữ liệu mẫu (Seed)'}
                </button>
            )}

            {status === 'loading' && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <Loader size={20} className="spin" />
                    <span>Đang nạp dữ liệu...</span>
                </div>
            )}

            {status === 'success' && (
                <div style={{ color: '#22c55e', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Check size={20} />
                    <span>Nạp dữ liệu thành công!</span>
                </div>
            )}

            {status === 'error' && (
                <div style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <AlertCircle size={20} />
                    <span>Có lỗi xảy ra. Kiểm tra Console!</span>
                </div>
            )}
        </div>
    );
};

export default FirestoreSeeder;
