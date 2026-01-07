import { Star } from 'lucide-react';
import './StarRating.css';

const StarRating = ({ rating, setRating, max = 5, size = 20, readOnly = false }) => {
  return (
    <div className="star-rating">
      {[...Array(max)].map((_, i) => {
        const starValue = i + 1;
        const isFilled = starValue <= (rating || 0);
        
        return (
          <button
            key={i}
            type="button"
            className={`star-btn ${readOnly ? 'readonly' : ''} ${isFilled ? 'filled' : ''}`}
            onClick={() => !readOnly && setRating && setRating(starValue)}
            disabled={readOnly}
          >
            <Star 
              size={size} 
              fill={isFilled ? "currentColor" : "none"} 
              strokeWidth={readOnly ? 1.5 : 2}
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
