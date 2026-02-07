import { createContext, useContext, useState, useMemo, useEffect } from "react";

// The context object itself
const CartContext = createContext();

// 1. The Provider Component
export const CartProvider = ({ children }) => {
  // Initialize state from LocalStorage to prevent data loss on refresh
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("atelier_cozy_cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Failed to parse cart from local storage:", error);
      return [];
    }
  });

  // Save to LocalStorage whenever the cart state changes
  useEffect(() => {
    localStorage.setItem("atelier_cozy_cart", JSON.stringify(cart));
  }, [cart]);

  const addToBag = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i._id === item._id);
      if (existing) {
        return prev.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const decreaseQuantity = (itemId) => {
    setCart((prev) => {
      const item = prev.find((i) => i._id === itemId);
      if (!item) return prev;
      if (item.quantity === 1) {
        return prev.filter((i) => i._id !== itemId);
      }
      return prev.map((i) =>
        i._id === itemId ? { ...i, quantity: i.quantity - 1 } : i
      );
    });
  };

  const removeFromBag = (itemId) => {
    setCart((prev) => prev.filter((item) => item._id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Memoize totals for performance and to provide a clean bill breakdown
  const totals = useMemo(() => {
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = subtotal * 0.05; // 5% GST
    const serviceCharge = subtotal > 0 ? 25 : 0; // Flat service fee if cart not empty
    
    return {
      subtotal,
      tax,
      serviceCharge,
      total: subtotal + tax + serviceCharge,
      count: cart.reduce((acc, item) => acc + item.quantity, 0)
    };
  }, [cart]);

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        addToBag, 
        decreaseQuantity, 
        removeFromBag, 
        clearCart, 
        totals 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

/**
 * 2. The useCart Hook
 * * The line below solves the "Fast refresh only works when a file only exports components" warning.
 * It tells Vite that this export is intentional and related to the component.
 */
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};