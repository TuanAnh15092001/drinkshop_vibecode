import { 
  collection, 
  doc, 
  addDoc, 
  getDocs,
  query,
  where,
  orderBy,
  updateDoc
} from 'firebase/firestore';
import { db } from '../firebase';

const ORDERS_COLLECTION = 'orders';

// Create new order
export const createOrder = async (orderData, userId) => {
  try {
    const order = {
      ...orderData,
      userId,
      status: 'pending', // pending, confirmed, preparing, delivering, completed, cancelled
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const docRef = await addDoc(collection(db, ORDERS_COLLECTION), order);
    return { id: docRef.id, ...order };
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// Get orders by user
export const getOrdersByUser = async (userId) => {
  try {
    const q = query(
      collection(db, ORDERS_COLLECTION),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting orders:', error);
    throw error;
  }
};

// Update order status (for admin)
export const updateOrderStatus = async (orderId, status) => {
  try {
    const docRef = doc(db, ORDERS_COLLECTION, orderId);
    await updateDoc(docRef, {
      status,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating order status:', error);
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
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting all orders:', error);
    throw error;
  }
};
