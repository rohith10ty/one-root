import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { PLANTS } from '../data/plantsData';

const ShopContext = createContext();

export function ShopProvider({ children }) {
  // Cart state with localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('verdant_cart');
      return saved ? JSON.parse(saved) : [
        { ...PLANTS[0], quantity: 1, size: 'Medium (6" Pot)' },
        { ...PLANTS[5], quantity: 2, size: 'Small (4" Pot)' }
      ];
    } catch {
      return [];
    }
  });

  // Wishlist state with localStorage
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('verdant_wishlist');
      return saved ? JSON.parse(saved) : ['monstera-deliciosa', 'snake-plant-laurentii'];
    } catch {
      return [];
    }
  });

  // UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [quickViewPlant, setQuickViewPlant] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Coupon / Discounts
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  // Notifications / Toast
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    try {
      localStorage.setItem('verdant_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('verdant_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  const showToast = (title, message, type = 'success', icon = null) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, title, message, type, icon }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (plant, quantity = 1, size = 'Medium (6" Pot)') => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === plant.id && item.size === size);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { ...plant, quantity, size }];
    });

    showToast(
      'Added to Nursery Cart',
      `${quantity}x ${plant.name} (${size}) is packed and waiting in your cart.`,
      'success',
      'ShoppingBag'
    );
  };

  const updateQuantity = (plantId, size, newQty) => {
    if (newQty <= 0) {
      removeFromCart(plantId, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === plantId && item.size === size ? { ...item, quantity: newQty } : item
      )
    );
  };

  const removeFromCart = (plantId, size) => {
    setCart((prev) => prev.filter((item) => !(item.id === plantId && (!size || item.size === size))));
  };

  const toggleWishlist = (plantId) => {
    const plant = PLANTS.find((p) => p.id === plantId);
    setWishlist((prev) => {
      const isFavorited = prev.includes(plantId);
      if (isFavorited) {
        showToast('Removed from Wishlist', `${plant?.name || 'Plant'} removed from your saved list.`, 'info', 'HeartOff');
        return prev.filter((id) => id !== plantId);
      } else {
        showToast('Saved to Wishlist', `${plant?.name || 'Plant'} added to your wishlist.`, 'success', 'Heart');
        return [...prev, plantId];
      }
    });
  };

  const isInWishlist = (plantId) => wishlist.includes(plantId);

  const applyCoupon = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'PLANTLOVE15' || clean === 'NATURE15') {
      setAppliedCoupon(clean);
      setDiscountPercent(15);
      showToast('Promo Code Applied!', '15% botanical discount applied to your order!', 'success', 'Sparkles');
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#10b981', '#34d399', '#fef08a', '#84cc16']
      });
      return true;
    } else if (clean === 'EARTH20') {
      setAppliedCoupon(clean);
      setDiscountPercent(20);
      showToast('Earth Month Special!', '20% eco discount applied!', 'success', 'Sparkles');
      return true;
    } else {
      showToast('Invalid Coupon', 'Try "PLANTLOVE15" for 15% off.', 'error', 'AlertCircle');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon('');
    setDiscountPercent(0);
  };

  // Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = (cartSubtotal * discountPercent) / 100;
  const freeShippingThreshold = 75;
  const shippingFee = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0 ? 0 : 9.99;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isSearchOpen,
        setIsSearchOpen,
        isContactOpen,
        setIsContactOpen,
        quickViewPlant,
        setQuickViewPlant,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        addToCart,
        updateQuantity,
        removeFromCart,
        toggleWishlist,
        isInWishlist,
        cartSubtotal,
        discountAmount,
        discountPercent,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        shippingFee,
        freeShippingThreshold,
        cartTotal,
        cartItemsCount,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
