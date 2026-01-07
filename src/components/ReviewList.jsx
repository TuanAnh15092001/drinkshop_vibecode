import { useState, useEffect } from 'react';
import { getReviewsByProductId } from '../services/reviewService';
import StarRating from './StarRating';
import { User, Clock } from 'lucide-react';
import './ReviewList.css';

const ReviewList = ({ productId, refreshTrigger }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);
            try {
                const data = await getReviewsByProductId(productId);
                // Sort by date desc (newest first)
                const sortedData = data.sort((a, b) => b.createdAt - a.createdAt);
                setReviews(sortedData);
            } catch (error) {
                console.error('Failed to load reviews', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [productId, refreshTrigger]);

    if (loading) {
        return <div className="reviews-loading">Đang tải đánh giá...</div>;
    }

    if (reviews.length === 0) {
        return (
            <div className="no-reviews">
                <p>Chưa có đánh giá nào. Hãy là người đầu tiên đánh giá sản phẩm này!</p>
            </div>
        );
    }

    // Format date helper
    const formatDate = (date) => {
        if (!date) return '';
        // If it's a Firestore timestamp (has toDate method)
        const d = date.toDate ? date.toDate() : new Date(date);
        return d.toLocaleDateString('vi-VN', {
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="review-list">
            <h3 className="section-title">Đánh giá từ khách hàng ({reviews.length})</h3>
            <div className="reviews-container">
                {reviews.map((review) => (
                    <div key={review.id} className="review-item">
                        <div className="review-header">
                            <div className="review-avatar">
                                <User size={20} />
                            </div>
                            <div className="review-meta">
                                <span className="review-author">{review.userName || 'Người dùng ẩn danh'}</span>
                                <div className="review-rating-row">
                                    <StarRating rating={review.rating} readOnly size={14} />
                                    <span className="review-date">
                                        <Clock size={12} />
                                        {formatDate(review.createdAt)}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="review-content">
                            <p>{review.comment}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewList;
