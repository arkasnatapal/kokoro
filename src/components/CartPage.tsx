import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag, Sparkles, Zap, CreditCard, Tag, Search } from 'lucide-react';

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

interface CartPageProps {
  cartItems: CartItem[];
  updateQuantity: (id: number, newQuantity: number, color?: string, size?: string) => void;
  removeItem: (id: number, color?: string, size?: string) => void;
  clearCart: () => void;
}

export default function CartPage({ cartItems, updateQuantity, removeItem, clearCart }: CartPageProps) {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      const sections = document.querySelectorAll('.cart-animate');
      sections.forEach((section, index) => {
        setTimeout(() => {
          section.classList.add('animate-fade-in-up');
        }, index * 100);
      });
    }, 100);
  }, []);

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'kokoro20') {
      setAppliedPromo('KOKORO20');
      setPromoCode('');
    } else if (promoCode.toLowerCase() === 'anime10') {
      setAppliedPromo('ANIME10');
      setPromoCode('');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const originalTotal = cartItems.reduce((sum, item) => sum + ((item.originalPrice || item.price) * item.quantity), 0);
  const savings = originalTotal - subtotal;
  
  const promoDiscount = cartItems.length > 0 && appliedPromo === 'KOKORO20' ? subtotal * 0.2 : 
                       cartItems.length > 0 && appliedPromo === 'ANIME10' ? subtotal * 0.1 : 0;
  
  const shipping = cartItems.length > 0 && subtotal > 0 && subtotal < 100 ? 15 : 0;
  const total = cartItems.length > 0 ? subtotal - promoDiscount + shipping : 0;

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen pt-16 px-4 pb-8 bg-gradient-to-br from-black via-purple-900/20 to-pink-900/20 relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="particle absolute top-20 left-10 w-2 h-2 bg-pink-500 rounded-full opacity-60"></div>
        <div className="particle absolute top-40 right-20 w-3 h-3 bg-purple-500 rounded-full opacity-40" style={{animationDelay: '1s'}}></div>
        <div className="particle absolute bottom-40 left-1/4 w-2 h-2 bg-cyan-500 rounded-full opacity-50" style={{animationDelay: '2s'}}></div>
        <div className="particle absolute top-60 right-1/3 w-1 h-1 bg-yellow-500 rounded-full opacity-70" style={{animationDelay: '3s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="cart-animate flex items-center justify-between mb-8 pt-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/products')}
              className="p-3 bg-gray-900/50 hover:bg-purple-500/20 rounded-xl transition-all duration-300 hover:scale-110 group"
            >
              <ArrowLeft className="w-5 h-5 text-gray-300 group-hover:text-purple-400" />
            </button>
            <div>
              <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent font-orbitron">
                Shopping Cart
              </h1>
              <p className="text-gray-400 font-inter">
                {cartItems.length === 0 ? 'Your cart is empty' : `${totalItems} ${totalItems === 1 ? 'item' : 'items'} ready to make you legendary ✨`}
              </p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-400 font-orbitron">Rs. {total.toFixed(2)}</div>
              <div className="text-sm text-gray-400 font-inter">Total</div>
            </div>
            <ShoppingBag className="w-8 h-8 text-purple-400" />
          </div>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="text-center py-20">
            <div className="cart-animate mb-8">
              <div className="text-8xl mb-6 animate-bounce">🛒</div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-orbitron">
                No Products Found
              </h2>
              <p className="text-xl text-gray-300 mb-2 font-inter">
                Add something awesome to your cart!
              </p>
              <p className="text-gray-400 mb-8 font-inter max-w-md mx-auto">
                Your cart is feeling lonely. Time to fill it with some fire anime gear and make it legendary! ✨
              </p>
            </div>

            <div className="cart-animate flex flex-col items-center space-y-6 mb-12">
              {/* Fun suggestions */}
              {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl">
                <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-xl p-4 text-center">
                  <div className="text-2xl mb-2">👘</div>
                  <p className="text-sm text-gray-300 font-inter">Anime Hoodies</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-xl p-4 text-center">
                  <div className="text-2xl mb-2">🤖</div>
                  <p className="text-sm text-gray-300 font-inter">Cool Figures</p>
                </div>
                <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl p-4 text-center">
                  <div className="text-2xl mb-2">💡</div>
                  <p className="text-sm text-gray-300 font-inter">RGB Tech</p>
                </div>
                <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl p-4 text-center">
                  <div className="text-2xl mb-2">💍</div>
                  <p className="text-sm text-gray-300 font-inter">Aesthetic Accessories</p>
                </div>
              </div> */}

              <button
                onClick={() => navigate('/products')}
                className="px-12 py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-full text-white font-bold text-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 font-inter group flex items-center space-x-3"
              >
                <Search className="w-5 h-5 group-hover:animate-bounce" />
                <span>Shop Now</span>
                <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
              </button>
            </div>

            {/* Empty cart order summary with $0 values */}
            {/* <div className="cart-animate max-w-md mx-auto">
              <div className="bg-gradient-to-br from-gray-900/80 to-black/90 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20">
                <h3 className="text-xl font-bold text-white mb-4 font-orbitron flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5 text-pink-400" />
                  <span>Order Summary</span>
                </h3>

                <div className="space-y-3 text-gray-400 font-inter">
                  <div className="flex justify-between">
                    <span>Subtotal (0 items)</span>
                    <span>Rs. 0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Rs. 0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Promo discount</span>
                    <span>Rs. 0.00</span>
                  </div>
                  <div className="border-t border-gray-700 pt-3">
                    <div className="flex justify-between text-xl font-bold text-white font-orbitron">
                      <span>Total</span>
                      <span>Rs. 0.00</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center space-x-2 text-gray-500">
                    <span className="text-sm">🔒</span>
                    <span className="text-sm font-inter">Secure checkout ready</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-500">
                    <span className="text-sm">🚚</span>
                    <span className="text-sm font-inter">Free shipping over Rs. 100</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-500">
                    <span className="text-sm">🎁</span>
                    <span className="text-sm font-inter">Free gift with every order</span>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item, index) => (
                <div
                  key={`${item.id}-${item.color}-${item.size}`}
                  className="cart-animate group bg-gradient-to-br from-gray-900/80 to-black/90 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-500"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Product Image */}
                    <div className="w-full md:w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-300 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-pink-500/10 animate-pulse"></div>
                      <span className="relative z-10">{item.image}</span>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors font-orbitron">
                            {item.name}
                          </h3>
                          <p className="text-gray-300 font-inter">{item.description}</p>
                          
                          {/* Product Details */}
                          <div className="flex flex-wrap gap-2 mt-2">
                            {item.color && item.color !== 'default' && (
                              <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-inter">
                                {item.color}
                              </span>
                            )}
                            {item.size && (
                              <span className="px-2 py-1 bg-pink-500/20 text-pink-300 rounded-full text-xs font-inter">
                                Size: {item.size}
                              </span>
                            )}
                          </div>
                        </div>

                        <button
                          onClick={() => removeItem(item.id, item.color, item.size)}
                          className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Price and Quantity Controls */}
                      <div className="flex justify-between items-center">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text font-orbitron">
                              Rs. {item.price}
                            </span>
                            {item.originalPrice && (
                              <span className="text-sm text-gray-500 line-through font-inter">
                                Rs. {item.originalPrice}
                              </span>
                            )}
                          </div>
                          {item.originalPrice && (
                            <div className="text-xs text-green-400 font-inter font-bold">
                              {Math.round((1 - item.price / item.originalPrice) * 100)}% OFF 🔥
                            </div>
                          )}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1, item.color, item.size)}
                            className="w-8 h-8 bg-gray-800 hover:bg-purple-500/20 rounded-lg flex items-center justify-center transition-colors"
                          >
                            <Minus className="w-4 h-4 text-gray-300" />
                          </button>
                          
                          <span className="w-12 text-center font-bold text-white font-inter">{item.quantity}</span>
                          
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1, item.color, item.size)}
                            className="w-8 h-8 bg-gray-800 hover:bg-purple-500/20 rounded-lg flex items-center justify-center transition-colors"
                          >
                            <Plus className="w-4 h-4 text-gray-300" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="cart-animate bg-gradient-to-br from-gray-900/80 to-black/90 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20 h-fit sticky top-24">
              <h2 className="text-2xl font-bold text-white mb-6 font-orbitron flex items-center space-x-2">
                <Sparkles className="w-6 h-6 text-pink-400" />
                <span>Order Summary</span>
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-300 font-inter">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>Rs. {subtotal.toFixed(2)}</span>
                </div>
                
                {savings > 0 && (
                  <div className="flex justify-between text-green-400 font-inter">
                    <span>You saved</span>
                    <span>-Rs. {savings.toFixed(2)}</span>
                  </div>
                )}

                {promoDiscount > 0 && (
                  <div className="flex justify-between text-green-400 font-inter">
                    <span>Promo ({appliedPromo})</span>
                    <span>-Rs. {promoDiscount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-300 font-inter">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE 🎉' : `$${shipping.toFixed(2)}`}</span>
                </div>

                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between text-xl font-bold text-white font-orbitron">
                    <span>Total</span>
                    <span>Rs.{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2 font-inter">
                  Promo Code
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors font-inter"
                  />
                  <button
                    onClick={applyPromoCode}
                    className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500 rounded-lg transition-all duration-300 text-purple-400 hover:text-white font-inter"
                  >
                    Apply
                  </button>
                </div>
                
                {appliedPromo && (
                  <div className="mt-2 flex items-center space-x-2 text-green-400">
                    <Tag className="w-4 h-4" />
                    <span className="text-sm font-inter">Code {appliedPromo} applied!</span>
                  </div>
                )}
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => setShowCheckout(true)}
                className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-xl text-white font-bold text-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 font-inter group"
              >
                <CreditCard className="w-5 h-5 group-hover:animate-bounce" />
                <span>Checkout Now</span>
                <Zap className="w-5 h-5 group-hover:animate-pulse" />
              </button>

              {/* Security & Benefits */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center space-x-2 text-green-400">
                  <span className="text-sm">🔒</span>
                  <span className="text-sm font-inter">Secure checkout</span>
                </div>
                <div className="flex items-center space-x-2 text-blue-400">
                  <span className="text-sm">🚚</span>
                  <span className="text-sm font-inter">Free shipping over Rs. 100</span>
                </div>
                <div className="flex items-center space-x-2 text-yellow-400">
                  <span className="text-sm">🎁</span>
                  <span className="text-sm font-inter">Free gift with every order</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recommended Products */}
        {cartItems.length > 0 && (
          <div className="mt-16">
            <h2 className="cart-animate text-2xl font-bold text-white mb-8 font-orbitron">
              You might also like ✨
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: 'Anime Sticker Pack', price: 'Rs. 15', image: '🌸' },
                { name: 'LED Strip Lights', price: 'Rs. 45', image: '💡' },
                { name: 'Kawaii Keychain', price: 'Rs. 12', image: '🔑' },
                { name: 'Gaming Mouse Pad', price: 'Rs. 25', image: '🖱️' }
              ].map((product, index) => (
                <div
                  key={index}
                  className="cart-animate group bg-gradient-to-br from-gray-900/50 to-black/70 rounded-xl p-4 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 cursor-pointer"
                  style={{ animationDelay: `${(index + 3) * 100}ms` }}
                >
                  <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {product.image}
                  </div>
                  <h4 className="font-medium text-white text-sm mb-1 font-inter">{product.name}</h4>
                  <p className="text-pink-400 font-bold font-orbitron">{product.price}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Checkout Success Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 max-w-md w-full border border-purple-500/30 animate-scale-up text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-white mb-2 font-orbitron">Order Placed!</h3>
            <p className="text-gray-300 mb-6 font-inter">
              Your legendary anime gear is on its way! Check your email for tracking details.
            </p>
            <button
              onClick={() => {
                setShowCheckout(false);
                clearCart();
                navigate('/');
              }}
              className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl text-white font-bold transition-all duration-300 hover:scale-105 font-inter"
            >
              Continue Shopping 🛍️
            </button>
          </div>
        </div>
      )}
    </div>
  );
}