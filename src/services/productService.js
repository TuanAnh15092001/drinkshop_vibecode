import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  limit
} from 'firebase/firestore';
import { db } from '../firebase';

const PRODUCTS_COLLECTION = 'products';

// Get all products
export const getAllProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting products:', error);
    throw error;
  }
};

// Get product by ID
export const getProductById = async (id) => {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting product:', error);
    throw error;
  }
};

// Get products by category
export const getProductsByCategory = async (category) => {
  try {
    const q = query(
      collection(db, PRODUCTS_COLLECTION),
      where('category', '==', category)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting products by category:', error);
    throw error;
  }
};

// Get best sellers
export const getBestSellers = async (limitCount = 4) => {
  try {
    const q = query(
      collection(db, PRODUCTS_COLLECTION),
      where('isBestSeller', '==', true),
      limit(limitCount)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting best sellers:', error);
    throw error;
  }
};

// Get new products
export const getNewProducts = async (limitCount = 4) => {
  try {
    const q = query(
      collection(db, PRODUCTS_COLLECTION),
      where('isNew', '==', true),
      limit(limitCount)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting new products:', error);
    throw error;
  }
};

// Add new product (for admin)
export const addProduct = async (productData) => {
  try {
    const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), {
      ...productData,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

// Update product (for admin)
export const updateProduct = async (id, productData) => {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    await updateDoc(docRef, {
      ...productData,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// Delete product (for admin)
export const deleteProduct = async (id) => {
  try {
    await deleteDoc(doc(db, PRODUCTS_COLLECTION, id));
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// Seed initial products to Firestore (run once)
export const seedProducts = async (products) => {
  try {
    const batch = [];
    for (const product of products) {
      const { id: _id, ...productData } = product;
      batch.push(addDoc(collection(db, PRODUCTS_COLLECTION), productData));
    }
    await Promise.all(batch);
    console.log('Products seeded successfully!');
  } catch (error) {
    console.error('Error seeding products:', error);
    throw error;
  }
};
