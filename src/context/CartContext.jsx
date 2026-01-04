import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const saved = localStorage.getItem('drinkshop-cart');
        return saved ? JSON.parse(saved) : [];
    });
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('drinkshop-cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, quantity = 1, size = 'M', toppings = []) => {
        setCartItems(prev => {
            const existingIndex = prev.findIndex(
                item => item.id === product.id && item.size === size &&
                    JSON.stringify(item.toppings) === JSON.stringify(toppings)
            );

            if (existingIndex > -1) {
                const updated = [...prev];
                updated[existingIndex].quantity += quantity;
                return updated;
            }

            return [...prev, {
                ...product,
                quantity,
                size,
                toppings,
                cartId: Date.now()
            }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (cartId) => {
        setCartItems(prev => prev.filter(item => item.cartId !== cartId));
    };

    const updateQuantity = (cartId, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(cartId);
            return;
        }
        setCartItems(prev =>
            prev.map(item =>
                item.cartId === cartId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => {
            const sizePrice = item.size === 'L' ? 10000 : item.size === 'S' ? -5000 : 0;
            const toppingsPrice = item.toppings?.reduce((sum, t) => sum + t.price, 0) || 0;
            return total + (item.price + sizePrice + toppingsPrice) * item.quantity;
        }, 0);
    };

    const getCartCount = () => {
        return cartItems.reduce((count, item) => count + item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            isCartOpen,
            setIsCartOpen,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            getCartTotal,
            getCartCount
        }}>
            {children}
        </CartContext.Provider>
    );
};
