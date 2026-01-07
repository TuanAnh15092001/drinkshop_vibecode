import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  getDocs,
  getDoc,
  doc,
  updateDoc,
  serverTimestamp,
  increment
} from 'firebase/firestore';
import { db } from '../firebase';

const REVIEWS_COLLECTION = 'reviews';
const PRODUCTS_COLLECTION = 'products';

// Add a new review
export const addReview = async (productId, reviewData) => {
  try {
    // 1. Add the review document
    const reviewRef = await addDoc(collection(db, REVIEWS_COLLECTION), {
      productId,
      userId: reviewData.userId,
      userName: reviewData.userName,
      rating: Number(reviewData.rating), // Ensure number
      comment: reviewData.comment,
      createdAt: serverTimestamp()
    });

    // 2. Update product stats
    const productRef = doc(db, PRODUCTS_COLLECTION, productId);
    const productSnap = await getDoc(productRef);
    
    if (productSnap.exists()) {
      const productData = productSnap.data();
      const currentReviews = productData.reviews || 0;
      const currentRating = productData.rating || 0;
      
      const newReviewsCount = currentReviews + 1;
      // valid implementation: ((current * count) + new) / (count + 1)
      const newRating = ((currentRating * currentReviews) + Number(reviewData.rating)) / newReviewsCount;
      
      await updateDoc(productRef, {
        reviews: newReviewsCount,
        rating: Number(newRating.toFixed(1)) // Keep 1 decimal place
      });
    }

    return reviewRef.id;
    

  } catch (error) {
    console.error('Error adding review:', error);
    throw error;
  }
};

// Get reviews for a product
export const getReviewsByProductId = async (productId) => {
  try {
    const q = query(
      collection(db, REVIEWS_COLLECTION),
      where('productId', '==', productId)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      // Convert timestamp to Date object if needed, or keep as is
      createdAt: doc.data().createdAt?.toDate() || new Date()
    }));
  } catch (error) {
    console.error('Error getting reviews:', error);
    throw error;
  }
};
