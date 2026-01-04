import { createContext, useContext, useState, useEffect } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    FacebookAuthProvider,
    signInWithPopup,
    updateProfile,
    sendPasswordResetEmail
} from 'https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js';
import { auth } from '../firebase/index.js';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Listen to auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    // Sign up with email and password
    const signup = async (email, password, displayName) => {
        try {
            setError(null);
            const result = await createUserWithEmailAndPassword(auth, email, password);

            // Update profile with display name
            if (displayName) {
                await updateProfile(result.user, { displayName });
            }

            return result.user;
        } catch (err) {
            setError(getErrorMessage(err.code));
            throw err;
        }
    };

    // Sign in with email and password
    const login = async (email, password) => {
        try {
            setError(null);
            const result = await signInWithEmailAndPassword(auth, email, password);
            return result.user;
        } catch (err) {
            setError(getErrorMessage(err.code));
            throw err;
        }
    };

    // Sign out
    const logout = async () => {
        try {
            setError(null);
            await signOut(auth);
        } catch (err) {
            setError(getErrorMessage(err.code));
            throw err;
        }
    };

    // Sign in with Google
    const signInWithGoogle = async () => {
        try {
            setError(null);
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            return result.user;
        } catch (err) {
            setError(getErrorMessage(err.code));
            throw err;
        }
    };

    // Sign in with Facebook
    const signInWithFacebook = async () => {
        try {
            setError(null);
            const provider = new FacebookAuthProvider();
            const result = await signInWithPopup(auth, provider);
            return result.user;
        } catch (err) {
            setError(getErrorMessage(err.code));
            throw err;
        }
    };

    // Reset password
    const resetPassword = async (email) => {
        try {
            setError(null);
            await sendPasswordResetEmail(auth, email);
        } catch (err) {
            setError(getErrorMessage(err.code));
            throw err;
        }
    };

    // Get Vietnamese error messages
    const getErrorMessage = (code) => {
        const messages = {
            'auth/email-already-in-use': 'Email này đã được sử dụng',
            'auth/invalid-email': 'Email không hợp lệ',
            'auth/operation-not-allowed': 'Phương thức đăng nhập không được phép',
            'auth/weak-password': 'Mật khẩu quá yếu (tối thiểu 6 ký tự)',
            'auth/user-disabled': 'Tài khoản đã bị vô hiệu hóa',
            'auth/user-not-found': 'Không tìm thấy tài khoản với email này',
            'auth/wrong-password': 'Mật khẩu không chính xác',
            'auth/invalid-credential': 'Thông tin đăng nhập không hợp lệ',
            'auth/too-many-requests': 'Quá nhiều lần thử, vui lòng thử lại sau',
            'auth/popup-closed-by-user': 'Đã đóng cửa sổ đăng nhập',
            'auth/network-request-failed': 'Lỗi kết nối mạng'
        };
        return messages[code] || 'Đã xảy ra lỗi, vui lòng thử lại';
    };

    const value = {
        currentUser,
        loading,
        error,
        setError,
        signup,
        login,
        logout,
        signInWithGoogle,
        signInWithFacebook,
        resetPassword
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
