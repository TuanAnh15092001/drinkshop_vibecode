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
import { SIZE_PRICES, TOPPING_DEFAULT_PRICE } from '../constants/priceDefaults';

const PRODUCTS_COLLECTION = 'products';

// Utility to normalize product data from Firestore
const mapProduct = (doc) => {
  const data = doc.data();
  return {
    id: doc.id,
    ...data,
    // Map imageUrl to image for compatibility with existing components
    image: data.imageUrl || data.image || 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=400',
    // Ensure numeric values
    price: Number(data.price) || 0,
    rating: Number(data.rating) || 0,
    reviews: Number(data.reviews) || 0,
    // Ensure arrays exist and handle both string and object formats
    // Ensure arrays exist and handle both string and object formats
    sizes: Array.isArray(data.sizes) ? data.sizes.map(s => {
      const name = typeof s === 'string' ? s : (s.name || s.label || '?');
      let price = typeof s === 'string' ? 0 : (Number(s.price) || 0);
      
      // Apply default pricing logic if price is 0
      if (price === 0 && SIZE_PRICES[name] !== undefined) {
        price = SIZE_PRICES[name];
      }
      
      return { name, price };
    }) : [],
    toppings: Array.isArray(data.toppings) ? data.toppings.map((t, index) => {
      if (typeof t === 'string') return { id: `t-${index}`, name: t, price: TOPPING_DEFAULT_PRICE }; // Default price for string toppings
      return { 
        id: t.id || `topping-${index}`, 
        ...t, 
        name: t.name || t.label || 'Topping',
        price: Number(t.price) || 0 
      };
    }) : []
  };
};

// Get all products
export const getAllProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
    return querySnapshot.docs.map(mapProduct);
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
      return mapProduct(docSnap);
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
    return querySnapshot.docs.map(mapProduct);
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
    return querySnapshot.docs.map(mapProduct);
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
    return querySnapshot.docs.map(mapProduct);
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
