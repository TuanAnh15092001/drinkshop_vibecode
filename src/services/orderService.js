import { 
  collection, 
  addDoc, 
  serverTimestamp,
  query,
  where,
  orderBy,
  getDocs
} from 'firebase/firestore';
import { db } from '../firebase';

const ORDERS_COLLECTION = 'orders';

// Create a new order
export const createOrder = async (orderData) => {
  try {
    const docRef = await addDoc(collection(db, ORDERS_COLLECTION), {
      ...orderData,
      status: 'pending', // pending, confirmed, completed, cancelled
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// Get orders by user ID
export const getOrdersByUserId = async (userId) => {
  try {
    const q = query(
      collection(db, ORDERS_COLLECTION),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date()
    }));
  } catch (error) {
    console.error('Error getting orders:', error);
    throw error;
  }
};

// Get all orders (for admin)
export const getAllOrders = async () => {
  try {
    const q = query(
      collection(db, ORDERS_COLLECTION),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date()
    }));
  } catch (error) {
    console.error('Error getting all orders:', error);
    throw error;
  }
};
