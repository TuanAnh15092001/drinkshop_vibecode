import { 
  doc, 
  getDoc, 
  setDoc,
  updateDoc,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase';

const USERS_COLLECTION = 'users';

// Get user profile from Firestore
export const getUserProfile = async (userId) => {
  try {
    const docRef = doc(db, USERS_COLLECTION, userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

// Create or update user profile
export const saveUserProfile = async (userId, profileData) => {
  try {
    const docRef = doc(db, USERS_COLLECTION, userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      // Update existing
      await updateDoc(docRef, {
        ...profileData,
        updatedAt: serverTimestamp()
      });
    } else {
      // Create new
      await setDoc(docRef, {
        ...profileData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    }
    return true;
  } catch (error) {
    console.error('Error saving user profile:', error);
    throw error;
  }
};
