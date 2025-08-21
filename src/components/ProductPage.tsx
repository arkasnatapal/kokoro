import React, { useEffect, useRef, useState } from 'react';
import { Heart, ShoppingCart, Star, Filter, Search, Grid, List, Zap, Flame, Sparkles, TrendingUp, Gift, Package, Plus, Leaf, PenTool, QrCode } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  color?: string;
  size?: string;
}

interface ProductPageProps {
  setCurrentPage: (page: string) => void;
  addToCart: (product: CartItem, quantity?: number) => void;
}

export default function ProductPage({ setCurrentPage, addToCart }: ProductPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedType, setSelectedType] = useState<'gift-box' | 'single' | 'addons'>('single');
  const [selectedCategory, setSelectedCategory] = useState('anime');
  const [selectedBoxType, setSelectedBoxType] = useState('theme-based');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('trending');
  const [addedToCart, setAddedToCart] = useState<number | null>(null);

  useEffect(() => {
    // Page entrance animation - reset and reapply animations when selectedType changes
    const animateElements = () => {
      const pageHeader = document.querySelector('.page-header');
      const sections = document.querySelectorAll('.section-animate');
      
      // Reset animation classes first
      if (pageHeader) {
        pageHeader.classList.remove('animate-fade-in-down');
        pageHeader.style.opacity = '0';
      }
      sections.forEach((section) => {
        section.classList.remove('animate-fade-in-up');
        (section as HTMLElement).style.opacity = '0';
      });
      
      // Apply animations after a short delay
      setTimeout(() => {
        if (pageHeader) {
          pageHeader.classList.add('animate-fade-in-down');
          pageHeader.style.opacity = '1';
        }
        sections.forEach((section, index) => {
          setTimeout(() => {
            section.classList.add('animate-fade-in-up');
            (section as HTMLElement).style.opacity = '1';
          }, index * 200);
        });
      }, 100);
    };

    animateElements();
  }, [selectedType]); // Re-run animation when selectedType changes

  const categories = [
    { id: 'goth-grunge', name: 'Goth & Grunge', icon: '🖤', color: 'from-gray-800 to-black' },
    { id: 'y2k', name: 'Y2K', icon: '💿', color: 'from-purple-500 to-pink-500' },
    { id: 'cottagecore', name: 'Cottagecore', icon: '🌸', color: 'from-green-400 to-yellow-400' },
    { id: 'minimalist', name: 'Minimalist', icon: '⚪', color: 'from-gray-400 to-white' },
    { id: 'vintage', name: 'Vintage', icon: '🕰️', color: 'from-amber-600 to-yellow-600' },
    { id: 'cyberpunk', name: 'Cyberpunk', icon: '🤖', color: 'from-cyan-500 to-purple-500' },
    { id: 'indie', name: 'Indie', icon: '🎨', color: 'from-orange-400 to-red-500' },
    { id: 'boho', name: 'Boho', icon: '🌙', color: 'from-purple-400 to-pink-400' },
    { id: 'special-request', name: 'Special Request', icon: '✨', color: 'from-indigo-500 to-purple-600' },
    { id: 'anime', name: 'Anime', icon: '🌟', color: 'from-pink-500 to-purple-500' },
  ];

  const oldCategories = [
    { id: 'all', name: 'All Vibes', icon: '✨', emoji: '🌟' },
    { id: 'figures', name: 'Figures', icon: '🗿', emoji: '🎎' },
    { id: 'apparel', name: 'Fits', icon: '👘', emoji: '🔥' },
    { id: 'accessories', name: 'Drip', icon: '💎', emoji: '💍' },
    { id: 'tech', name: 'Tech', icon: '📱', emoji: '⚡' },
    { id: 'collectibles', name: 'Rare', icon: '🏆', emoji: '💫' },
  ];

  const products = [
    {
      id: 1,
      name: 'Cyberpunk Neon Hoodie',
      description: 'That main character energy 💅',
      price: 89,
      originalPrice: 129,
      category: 'apparel',
      rating: 4.9,
      reviews: 234,
      image: '👘',
      tags: ['Limited', 'Fire', 'New Drop'],
      colors: ['black', 'pink', 'purple'],
      vibes: ['aesthetic', 'cyberpunk', 'cozy']
    },
    {
      id: 2,
      name: 'RGB Gaming Setup Kit',
      description: 'Your setup bout to be BUSSIN ✨',
      price: 154,
      originalPrice: null,
      category: 'tech',
      rating: 4.8,
      reviews: 89,
      image: '💡',
      tags: ['Popular', 'Gaming'],
      colors: ['multicolor'],
      vibes: ['gaming', 'rgb', 'epic']
    },
    {
      id: 3,
      name: 'Anime Art Collection Vol.1',
      description: 'Gorgeous prints that hit different 📚',
      price: 32,
      originalPrice: 45,
      category: 'collectibles',
      rating: 4.7,
      reviews: 156,
      image: '🎨',
      tags: ['Sale', 'Art'],
      colors: ['default'],
      vibes: ['aesthetic', 'art', 'vintage']
    },
    {
      id: 4,
      name: 'VR Headset Pro Max',
      description: 'Touch grass in the metaverse 🥽',
      price: 450,
      originalPrice: null,
      category: 'tech',
      rating: 4.9,
      reviews: 67,
      image: '🥽',
      tags: ['Premium', 'VR'],
      colors: ['white', 'black'],
      vibes: ['futuristic', 'immersive', 'premium']
    },
    {
      id: 5,
      name: 'Holographic Choker Set',
      description: 'Serving looks 24/7 no cap 💎',
      price: 28,
      originalPrice: 35,
      category: 'accessories',
      rating: 4.6,
      reviews: 203,
      image: '💍',
      tags: ['Trending', 'Cute'],
      colors: ['pink', 'blue', 'green', 'rainbow'],
      vibes: ['kawaii', 'sparkly', 'trendy']
    },
    {
      id: 6,
      name: 'Mecha Figure Limited Edition',
      description: 'Absolutely legendary piece fr 🤖',
      price: 189,
      originalPrice: null,
      category: 'figures',
      rating: 5.0,
      reviews: 45,
      image: '🤖',
      tags: ['Limited', 'Sold Out Soon'],
      colors: ['default'],
      vibes: ['legendary', 'collectible', 'rare']
    },
    {
      id: 7,
      name: 'Kawaii Cat Ear Headphones',
      description: 'Uwu energy with crisp audio 🎧',
      price: 79,
      originalPrice: 99,
      category: 'tech',
      rating: 4.8,
      reviews: 312,
      image: '🎧',
      tags: ['Kawaii', 'Audio'],
      colors: ['pink', 'white', 'black'],
      vibes: ['kawaii', 'audio', 'cute']
    },
    {
      id: 8,
      name: 'Aesthetic Phone Case Set',
      description: 'Protect your phone with style ✨',
      price: 25,
      originalPrice: 40,
      category: 'accessories',
      rating: 4.5,
      reviews: 189,
      image: '📱',
      tags: ['Bundle', 'Aesthetic'],
      colors: ['pastel', 'dark', 'gradient'],
      vibes: ['aesthetic', 'protective', 'stylish']
    }
  ];

  const [selectedOldCategory, setSelectedOldCategory] = useState('all');

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedOldCategory === 'all' || product.category === selectedOldCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.vibes.some(vibe => vibe.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch(sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'trending': return b.reviews - a.reviews;
      default: return 0;
    }
  });

  const getVibeColor = (vibe: string) => {
    const colors: { [key: string]: string } = {
      'aesthetic': 'bg-pink-500/20 text-pink-300',
      'cyberpunk': 'bg-cyan-500/20 text-cyan-300',
      'kawaii': 'bg-purple-500/20 text-purple-300',
      'gaming': 'bg-green-500/20 text-green-300',
      'futuristic': 'bg-blue-500/20 text-blue-300',
      'trendy': 'bg-yellow-500/20 text-yellow-300',
      'legendary': 'bg-red-500/20 text-red-300',
      'premium': 'bg-indigo-500/20 text-indigo-300'
    };
    return colors[vibe] || 'bg-gray-500/20 text-gray-300';
  };

  const handleAddToCart = (product: any) => {
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      category: product.category,
      color: product.colors?.[0] || 'default',
      size: 'M' // Default size
    };

    addToCart(cartItem, 1);
    setAddedToCart(product.id);
    
    // Reset the added state after animation
    setTimeout(() => {
      setAddedToCart(null);
    }, 2000);
  };

  const boxTypes = [
    { id: 'theme-based', name: 'Theme Based', description: 'Curated items matching your aesthetic', icon: '🎭' },
    { id: 'budget-flexible', name: 'Budget Flexible', description: 'Best value within your price range', icon: '💰' },
    { id: 'personalization', name: 'Personalization', description: 'Tailored to your preferences', icon: '💝' },
  ];

  const addons = [
    { id: 'eco-box', name: 'Eco-Friendly Gift Box', description: 'Reusable sustainable packaging', price: 15, icon: <Leaf className="w-6 h-6" /> },
    { id: 'handwritten-note', name: 'Handwritten Note', description: 'Personal message in beautiful calligraphy', price: 8, icon: <PenTool className="w-6 h-6" /> },
    { id: 'qr-playlist', name: 'QR Playlist', description: 'Personalized music playlist via QR code', price: 5, icon: <QrCode className="w-6 h-6" /> },
  ];

  const addonProducts = [
    {
      id: 'ap-1',
      name: 'Premium Gift Wrap Bundle',
      description: 'Make it extra special ✨',
      price: 12,
      originalPrice: 18,
      image: '🎀',
      category: 'addon',
      rating: 4.8,
      reviews: 124,
      tags: ['Popular'],
      colors: ['pink', 'purple', 'gold'],
      vibes: ['premium', 'aesthetic']
    },
    {
      id: 'ap-2',
      name: 'Anime Sticker Mega Pack',
      description: 'Over 100 kawaii stickers 💫',
      price: 18,
      originalPrice: null,
      image: '🌟',
      category: 'addon',
      rating: 4.9,
      reviews: 89,
      tags: ['Trending', 'Limited'],
      colors: ['multicolor'],
      vibes: ['kawaii', 'collectible']
    }
  ];

  const toggleAddon = (addonId: string) => {
    setSelectedAddons(prev => 
      prev.includes(addonId) 
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  const giftBoxProducts = [
    {
      id: 'gb-1',
      name: 'Anime Aesthetic Starter Pack',
      description: 'Perfect intro to anime culture ✨',
      price: 89,
      originalPrice: 120,
      items: ['Kawaii Stickers Pack', 'Anime Art Print', 'Chibi Keychain', 'Aesthetic Phone Case'],
      theme: selectedCategory,
      image: '🎁',
      rating: 4.9,
      reviews: 156
    },
    {
      id: 'gb-2',
      name: 'Ultimate Otaku Bundle',
      description: 'For the true anime connoisseur 🔥',
      price: 149,
      originalPrice: 200,
      items: ['Limited Figure', 'Manga Volume', 'Themed Apparel', 'Collectible Card Set', 'Premium Poster'],
      theme: selectedCategory,
      image: '📦',
      rating: 5.0,
      reviews: 89
    },
    {
      id: 'gb-3',
      name: 'Cozy Weeb Vibes Box',
      description: 'Comfort meets anime love 💜',
      price: 65,
      originalPrice: 85,
      items: ['Soft Plushie', 'Cozy Socks', 'Cute Mug', 'Mini Pillow'],
      theme: selectedCategory,
      image: '🧸',
      rating: 4.8,
      reviews: 203
    }
  ];

  return (
    <div className="min-h-screen pt-16 px-4 pb-8 relative overflow-hidden bg-black">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="particle absolute top-20 left-10 w-2 h-2 rounded-full opacity-60 bg-pink-500"></div>
        <div className="particle absolute top-40 right-20 w-3 h-3 rounded-full opacity-40 bg-purple-500" style={{animationDelay: '1s'}}></div>
        <div className="particle absolute bottom-40 left-1/4 w-2 h-2 rounded-full opacity-50 bg-cyan-500" style={{animationDelay: '2s'}}></div>
        <div className="particle absolute top-60 right-1/3 w-1 h-1 rounded-full opacity-70 bg-yellow-500" style={{animationDelay: '3s'}}></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Page Header */}
        <div className="page-header text-center mb-12 pt-8">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <Sparkles className="w-8 h-8 text-pink-400 animate-pulse" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent font-orbitron animate-gradient">
              KOKORO STORE
            </h1>
            <Sparkles className="w-8 h-8 text-cyan-400 animate-pulse" />
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-inter">
            Create your perfect anime-inspired collection ✨
          </p>
        </div>

        {/* Selection Type */}
        <div className="section-animate mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 font-orbitron text-center">Choose Your Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button
              onClick={() => setSelectedType('gift-box')}
              className={`p-6 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                selectedType === 'gift-box'
                  ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500'
                  : 'bg-gray-900/50 border-gray-700 hover:border-gray-500'
              }`}
            >
              <div className="text-center">
                <Gift className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                <h3 className="text-xl font-bold text-white mb-2 font-orbitron">Customized Gift Box</h3>
                <p className="text-gray-300 text-sm font-inter">Themed collection curated just for you</p>
              </div>
            </button>

            <button
              onClick={() => setSelectedType('single')}
              className={`p-6 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                selectedType === 'single'
                  ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500'
                  : 'bg-gray-900/50 border-gray-700 hover:border-gray-500'
              }`}
            >
              <div className="text-center">
                <Package className="w-12 h-12 mx-auto mb-4 text-cyan-400" />
                <h3 className="text-xl font-bold text-white mb-2 font-orbitron">Single Product</h3>
                <p className="text-gray-300 text-sm font-inter">Individual items for specific needs</p>
              </div>
            </button>

            <button
              onClick={() => setSelectedType('addons')}
              className={`p-6 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                selectedType === 'addons'
                  ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500'
                  : 'bg-gray-900/50 border-gray-700 hover:border-gray-500'
              }`}
            >
              <div className="text-center">
                <Plus className="w-12 h-12 mx-auto mb-4 text-pink-400" />
                <h3 className="text-xl font-bold text-white mb-2 font-orbitron">Add-ons</h3>
                <p className="text-gray-300 text-sm font-inter">Extra touches to make it special</p>
              </div>
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="section-animate mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 font-orbitron text-center">Select Your Aesthetic</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-xl border transition-all duration-300 hover:scale-105 ${
                  selectedCategory === category.id
                    ? `bg-gradient-to-br ${category.color}/20 border-purple-500`
                    : 'bg-gray-900/50 border-gray-700 hover:border-gray-500'
                }`}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <h4 className="text-sm font-bold text-white font-orbitron">{category.name}</h4>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Gift Box Options */}
        {selectedType === 'gift-box' && (
          <>
            <div className="section-animate mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 font-orbitron text-center">Choose Box Type</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {boxTypes.map((boxType) => (
                  <button
                    key={boxType.id}
                    onClick={() => setSelectedBoxType(boxType.id)}
                    className={`p-6 rounded-2xl border transition-all duration-300 hover:scale-105 text-left ${
                      selectedBoxType === boxType.id
                        ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500'
                        : 'bg-gray-900/50 border-gray-700 hover:border-gray-500'
                    }`}
                  >
                    <div className="text-3xl mb-4">{boxType.icon}</div>
                    <h3 className="text-lg font-bold text-white mb-2 font-orbitron">{boxType.name}</h3>
                    <p className="text-gray-300 text-sm font-inter">{boxType.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Gift Box Products */}
            <div className="section-animate mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 font-orbitron text-center">Available Gift Boxes</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {giftBoxProducts.map((box) => (
                  <div
                    key={box.id}
                    className="group bg-gradient-to-br from-gray-900/80 to-black/90 backdrop-blur-xl rounded-2xl border border-purple-500/20 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 overflow-hidden p-6"
                  >
                    {/* Box Image */}
                    <div className="aspect-square mb-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-pink-500/10 animate-pulse"></div>
                      <span className="relative z-10">{box.image}</span>
                      
                      {/* Theme Badge */}
                      <div className="absolute top-2 left-2 z-20">
                        <span className="inline-block px-2 py-1 text-xs rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold font-inter">
                          {categories.find(c => c.id === box.theme)?.name}
                        </span>
                      </div>
                    </div>

                    {/* Box Info */}
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-purple-400 uppercase tracking-wide font-inter font-bold">
                          GIFT BOX
                        </span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-xs text-white font-inter font-bold">{box.rating}</span>
                          <span className="text-xs text-gray-400 font-inter">({box.reviews})</span>
                        </div>
                      </div>
                      
                      <h4 className="text-white font-bold group-hover:text-purple-400 transition-colors font-orbitron">
                        {box.name}
                      </h4>
                      <p className="text-sm text-gray-300 font-inter">{box.description}</p>
                      
                      {/* Items List */}
                      <div className="space-y-2">
                        <h5 className="text-sm font-bold text-gray-300 font-inter">Includes:</h5>
                        <ul className="space-y-1">
                          {box.items.map((item, index) => (
                            <li key={index} className="text-xs text-gray-400 font-inter flex items-center">
                              <span className="text-pink-400 mr-2">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Price and Actions */}
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text font-orbitron">
                            ${box.price}
                          </span>
                          {box.originalPrice && (
                            <span className="text-sm text-gray-500 line-through font-inter">
                              ${box.originalPrice}
                            </span>
                          )}
                        </div>
                        {box.originalPrice && (
                          <div className="text-xs text-green-400 font-inter font-bold">
                            {Math.round((1 - box.price / box.originalPrice) * 100)}% OFF 🔥
                          </div>
                        )}
                      </div>
                      
                      <button 
                        onClick={() => handleAddToCart({...box, category: 'gift-box', colors: ['default'], vibes: ['curated']})}
                        className={`px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2 group font-inter ${
                          addedToCart === box.id 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500 hover:to-pink-500'
                        }`}
                      >
                        {addedToCart === box.id ? (
                          <>
                            <span className="text-sm font-bold">Added!</span>
                            <span className="text-white">✓</span>
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4 group-hover:animate-bounce" />
                            <span className="text-sm font-bold">Add Box</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Single Product Section */}
        {selectedType === 'single' && (
          <>
            {/* Search and Filters */}
            <div className="section-animate mb-8">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
                {/* Search Bar */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for that perfect vibe..."
                    className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors font-inter"
                  />
                </div>

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 bg-gray-900/50 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors font-inter"
                >
                  <option value="trending">🔥 Trending</option>
                  <option value="price-low">💰 Price: Low to High</option>
                  <option value="price-high">💎 Price: High to Low</option>
                  <option value="rating">⭐ Highest Rated</option>
                </select>

                {/* View Toggle */}
                <div className="flex items-center space-x-2 bg-gray-900/50 rounded-xl p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'grid' ? 'bg-purple-500 text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'list' ? 'bg-purple-500 text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Product Category Filters */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {oldCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedOldCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 flex items-center space-x-2 font-inter ${
                      selectedOldCategory === category.id
                        ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-purple-500/25'
                        : 'bg-gray-900/50 text-gray-300 hover:bg-gray-800 border border-gray-700'
                    }`}
                  >
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                    {selectedOldCategory === category.id && <span className="animate-pulse">{category.emoji}</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <div className={`section-animate grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {sortedProducts.map((product, index) => (
                <div
                  key={product.id}
                  className={`group bg-gradient-to-br from-gray-900/80 to-black/90 backdrop-blur-xl rounded-2xl border border-purple-500/20 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 overflow-hidden ${
                    viewMode === 'list' ? 'flex flex-row items-center p-4' : 'p-6'
                  }`}
                >
                  {/* Product Image */}
                  <div className={`${
                    viewMode === 'list' ? 'w-24 h-24 mr-6' : 'aspect-square mb-4'
                  } bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300 relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-pink-500/10 animate-pulse"></div>
                    <span className="relative z-10">{product.image}</span>
                    
                    {/* Tags */}
                    <div className="absolute top-2 left-2 z-20">
                      {product.tags.slice(0, 2).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className={`inline-block px-2 py-1 text-xs rounded-full mr-1 mb-1 font-bold font-inter ${
                            tag === 'Limited' ? 'bg-red-500 text-white animate-pulse' :
                            tag === 'Fire' || tag === 'New Drop' ? 'bg-gradient-to-r from-yellow-500 to-red-500 text-white' :
                            tag === 'Popular' ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white' :
                            tag === 'Sale' ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white animate-pulse' :
                            tag === 'Trending' ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white animate-pulse' :
                            'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Wishlist Button */}
                    <button className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-pink-500/50 rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-100 z-20">
                      <Heart className="w-4 h-4 text-white" />
                    </button>
                  </div>

                  <div className={`${viewMode === 'list' ? 'flex-1' : ''}`}>
                    {/* Product Info */}
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-purple-400 uppercase tracking-wide font-inter font-bold">
                          {oldCategories.find(c => c.id === product.category)?.name}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-xs text-white font-inter font-bold">{product.rating}</span>
                          <span className="text-xs text-gray-400 font-inter">({product.reviews})</span>
                        </div>
                      </div>
                      
                      <h4 className="text-white font-bold group-hover:text-purple-400 transition-colors font-orbitron">
                        {product.name}
                      </h4>
                      <p className="text-sm text-gray-300 font-inter">{product.description}</p>
                      
                      {/* Vibes Tags */}
                      <div className="flex flex-wrap gap-1">
                        {product.vibes.slice(0, 3).map((vibe, vibeIndex) => (
                          <span
                            key={vibeIndex}
                            className={`px-2 py-1 text-xs rounded-full font-inter font-medium ${getVibeColor(vibe)}`}
                          >
                            #{vibe}
                          </span>
                        ))}
                      </div>
                      
                      {/* Color Options */}
                      {product.colors.length > 1 && (
                        <div className="flex space-x-2">
                          {product.colors.map((color, colorIndex) => (
                            <div
                              key={colorIndex}
                              className={`w-5 h-5 rounded-full border-2 border-gray-500 hover:border-white transition-colors cursor-pointer ${
                                color === 'black' ? 'bg-black' :
                                color === 'white' ? 'bg-white' :
                                color === 'pink' ? 'bg-pink-500' :
                                color === 'purple' ? 'bg-purple-500' :
                                color === 'blue' ? 'bg-blue-500' :
                                color === 'green' ? 'bg-green-500' :
                                color === 'multicolor' || color === 'rainbow' ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500' :
                                color === 'pastel' ? 'bg-gradient-to-r from-pink-200 to-purple-200' :
                                color === 'dark' ? 'bg-gray-800' :
                                color === 'gradient' ? 'bg-gradient-to-r from-yellow-400 to-pink-400' :
                                'bg-gradient-to-r from-pink-500 to-purple-500'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Price and Actions */}
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text font-orbitron">
                            ${product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through font-inter">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                        {product.originalPrice && (
                          <div className="text-xs text-green-400 font-inter font-bold">
                            {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF 🔥
                          </div>
                        )}
                      </div>
                      
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleAddToCart(product)}
                          className={`px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2 group font-inter ${
                            addedToCart === product.id 
                              ? 'bg-green-500 text-white' 
                              : 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500 hover:to-pink-500'
                          }`}
                        >
                          {addedToCart === product.id ? (
                            <>
                              <span className="text-sm font-bold">Added!</span>
                              <span className="text-white">✓</span>
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="w-4 h-4 group-hover:animate-bounce" />
                              <span className="text-sm font-bold">Add to Cart</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {/* {sortedProducts.length > 0 && (
              <div className="section-animate text-center mt-12">
                <button className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-full text-white font-bold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 flex items-center space-x-3 mx-auto font-inter group">
                  <span>Load More Fire 🔥</span>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin group-hover:animate-pulse" />
                </button>
              </div>
            )} */}

            {/* No Results State */}
            {sortedProducts.length === 0 && (
              <div className="section-animate text-center py-16">
                <div className="text-6xl mb-4">😔</div>
                <h3 className="text-2xl font-bold text-white mb-2 font-orbitron">No vibes found</h3>
                <p className="text-gray-400 font-inter">Try adjusting your search or filters to find that perfect item</p>
              </div>
            )}
          </>
        )}

        {/* Add-ons Section */}
        {selectedType === 'addons' && (
          <>
            <div className="section-animate mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 font-orbitron text-center">Add Special Touches</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {addons.map((addon) => (
                  <div
                    key={addon.id}
                    className={`p-6 rounded-2xl border transition-all duration-300 hover:scale-105 cursor-pointer ${
                      selectedAddons.includes(addon.id)
                        ? 'bg-gradient-to-br from-green-500/20 to-blue-500/20 border-green-500'
                        : 'bg-gray-900/50 border-gray-700 hover:border-gray-500'
                    }`}
                    onClick={() => toggleAddon(addon.id)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-purple-400">{addon.icon}</div>
                      <span className="text-lg font-bold text-white font-orbitron">${addon.price}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 font-orbitron">{addon.name}</h3>
                    <p className="text-gray-300 text-sm font-inter">{addon.description}</p>
                    {selectedAddons.includes(addon.id) && (
                      <div className="mt-4 flex items-center text-green-400">
                        <span className="text-sm font-bold font-inter">✓ Added</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Addon Products */}
            <div className="section-animate mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 font-orbitron text-center">Premium Add-on Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {addonProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group bg-gradient-to-br from-gray-900/80 to-black/90 backdrop-blur-xl rounded-2xl border border-purple-500/20 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 overflow-hidden p-6"
                  >
                    {/* Product Image */}
                    <div className="aspect-square mb-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-pink-500/10 animate-pulse"></div>
                      <span className="relative z-10">{product.image}</span>
                      
                      {/* Tags */}
                      <div className="absolute top-2 left-2 z-20">
                        {product.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className={`inline-block px-2 py-1 text-xs rounded-full mr-1 mb-1 font-bold font-inter ${
                              tag === 'Limited' ? 'bg-red-500 text-white animate-pulse' :
                              tag === 'Popular' ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white' :
                              tag === 'Trending' ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white animate-pulse' :
                              'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Wishlist Button */}
                      <button className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-pink-500/50 rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-100 z-20">
                        <Heart className="w-4 h-4 text-white" />
                      </button>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-purple-400 uppercase tracking-wide font-inter font-bold">
                          ADD-ON
                        </span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-xs text-white font-inter font-bold">{product.rating}</span>
                          <span className="text-xs text-gray-400 font-inter">({product.reviews})</span>
                        </div>
                      </div>
                      
                      <h4 className="text-white font-bold group-hover:text-purple-400 transition-colors font-orbitron">
                        {product.name}
                      </h4>
                      <p className="text-sm text-gray-300 font-inter">{product.description}</p>
                      
                      {/* Vibes Tags */}
                      <div className="flex flex-wrap gap-1">
                        {product.vibes.map((vibe, vibeIndex) => (
                          <span
                            key={vibeIndex}
                            className={`px-2 py-1 text-xs rounded-full font-inter font-medium ${getVibeColor(vibe)}`}
                          >
                            #{vibe}
                          </span>
                        ))}
                      </div>
                      
                      {/* Color Options */}
                      {product.colors.length > 1 && (
                        <div className="flex space-x-2">
                          {product.colors.map((color, colorIndex) => (
                            <div
                              key={colorIndex}
                              className={`w-5 h-5 rounded-full border-2 border-gray-500 hover:border-white transition-colors cursor-pointer ${
                                color === 'pink' ? 'bg-pink-500' :
                                color === 'purple' ? 'bg-purple-500' :
                                color === 'gold' ? 'bg-yellow-500' :
                                color === 'multicolor' ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500' :
                                'bg-gradient-to-r from-pink-500 to-purple-500'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Price and Actions */}
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text font-orbitron">
                            ${product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through font-inter">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                        {product.originalPrice && (
                          <div className="text-xs text-green-400 font-inter font-bold">
                            {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF 🔥
                          </div>
                        )}
                      </div>
                      
                      <button 
                        onClick={() => handleAddToCart(product)}
                        className={`px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2 group font-inter ${
                          addedToCart === product.id 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500 hover:to-pink-500'
                        }`}
                      >
                        {addedToCart === product.id ? (
                          <>
                            <span className="text-sm font-bold">Added!</span>
                            <span className="text-white">✓</span>
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4 group-hover:animate-bounce" />
                            <span className="text-sm font-bold">Add to Cart</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Action Buttons */}
        <div className="section-animate text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* <button className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-full text-white font-bold hover:shadow-lg transition-all duration-300 hover:scale-105 font-inter">
              Add to Cart
            </button>
            <button className="px-8 py-4 border border-purple-500 text-purple-400 hover:bg-purple-500/10 rounded-full font-bold transition-all duration-300 hover:scale-105 font-inter">
              Save for Later
            </button> */}
          </div>
          
          <div className="mt-8 text-center">
            {/* <p className="text-gray-400 text-sm font-inter">
              Total: <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text font-orbitron">
                ${selectedAddons.reduce((total, addonId) => {
                  const addon = addons.find(a => a.id === addonId);
                  return total + (addon ? addon.price : 0);
                }, 0)}
              </span>
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
}