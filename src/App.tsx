import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";  // ❌ no Router import
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import ProductPage from "./components/ProductPage";
import CartPage from "./components/CartPage";

interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  quantity: number;
  color?: string;
  size?: string;
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    document.body.classList.add("dark");

    const savedCart = localStorage.getItem("kokoro-cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
      }
    }

    setTimeout(() => {
      const loader = document.querySelector(".loader");
      if (loader) {
        loader.classList.add("fade-out");
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    }, 2000);

    return () => {
      document.body.classList.remove("dark");
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("kokoro-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Omit<CartItem, "quantity">, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) =>
          item.id === product.id &&
          item.color === product.color &&
          item.size === product.size
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id &&
          item.color === product.color &&
          item.size === product.size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const updateCartItemQuantity = (
    id: number,
    newQuantity: number,
    color?: string,
    size?: string
  ) => {
    if (newQuantity === 0) {
      removeFromCart(id, color, size);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.color === color && item.size === size
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (id: number, color?: string, size?: string) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) => !(item.id === id && item.color === color && item.size === size)
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  if (isLoading) {
    return (
      <div className="loader fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="text-center">
          <div className="text-6xl font-bold text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text mb-4 animate-pulse">
            心
          </div>
          <div className="text-2xl text-white font-light tracking-widest font-orbitron">
            KOKORO
          </div>
          <div className="mt-8">
            <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar cartItemCount={getCartItemCount()} />
      <main className="relative">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/products"
            element={<ProductPage addToCart={addToCart} />}
          />
          <Route
            path="/cart"
            element={
              <CartPage
                cartItems={cartItems}
                updateQuantity={updateCartItemQuantity}
                removeItem={removeFromCart}
                clearCart={clearCart}
              />
            }
          />
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </main>
    </div>
  );
}
