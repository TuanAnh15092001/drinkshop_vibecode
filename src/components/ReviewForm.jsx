import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { addReview } from '../services/reviewService';
import StarRating from './StarRating';
import './ReviewForm.css';
import { Send } from 'lucide-react';

const ReviewForm = ({ productId, onReviewAdded }) => {
    const { currentUser } = useAuth();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!currentUser) {
            setError('Vui lòng đăng nhập để đánh giá.');
            return;
        }

        if (rating === 0) {
            setError('Vui lòng chọn số sao.');
            return;
        }

        if (!comment.trim()) {
            setError('Vui lòng nhập nội dung đánh giá.');
            return;
        }

        setLoading(true);
        try {
            await addReview(productId, {
                userId: currentUser.uid,
                userName: currentUser.displayName || currentUser.email.split('@')[0],
                rating,
                comment
            });
            
            // Reset form
            setRating(0);
            setComment('');
            if (onReviewAdded) onReviewAdded();
        } catch (err) {
            console.error(err);
            setError('Có lỗi xảy ra, vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    if (!currentUser) {
        return (
            <div className="review-login-prompt">
                <p>Vui lòng <a href="/login">đăng nhập</a> để viết đánh giá.</p>
            </div>
        );
    }

    return (
        <form className="review-form" onSubmit={handleSubmit}>
            <h3>Viết đánh giá của bạn</h3>
            
            {error && <div className="error-message">{error}</div>}
            
            <div className="form-group">
                <label>Đánh giá:</label>
                <div className="rating-input">
                    <StarRating rating={rating} setRating={setRating} />
                    <span className="rating-text">{rating > 0 ? `${rating} sao` : 'Chọn sao'}</span>
                </div>
            </div>

            <div className="form-group">
                <label>Nhận xét:</label>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Chia sẻ cảm nhận của bạn về sản phẩm..."
                    rows={4}
                    disabled={loading}
                />
            </div>

            <button type="submit" className="btn btn-primary submit-btn" disabled={loading}>
                {loading ? 'Đang gửi...' : (
                    <>
                        <Send size={18} />
                        Gửi đánh giá
                    </>
                )}
            </button>
        </form>
    );
};

export default ReviewForm;
