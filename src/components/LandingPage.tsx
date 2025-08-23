import React, { useEffect, useRef, useState } from 'react';
import { Star, ArrowRight, Zap, Heart, Sparkles, Target, Users, Rocket, Mail, Twitter, Github, Instagram, X, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';


export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  // const featuredRef = useRef<HTMLDivElement>(null);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [subscriptionEmail, setSubscriptionEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // Simple entrance animations with CSS
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroDescription = document.querySelector('.hero-description');
    const heroButtons = document.querySelector('.hero-buttons');
    const heroStats = document.querySelectorAll('.hero-stat');

    // Animate elements on load
    setTimeout(() => {
      if (heroTitle) heroTitle.classList.add('animate-fade-in-up');
      setTimeout(() => {
        if (heroSubtitle) heroSubtitle.classList.add('animate-fade-in-up');
      }, 200);
      setTimeout(() => {
        if (heroDescription) heroDescription.classList.add('animate-fade-in-up');
      }, 400);
      setTimeout(() => {
        if (heroButtons) heroButtons.classList.add('animate-fade-in-up');
      }, 600);
      setTimeout(() => {
        heroStats.forEach((stat, index) => {
          setTimeout(() => {
            stat.classList.add('animate-fade-in-up');
          }, index * 100);
        });
      }, 800);
    }, 500);

    // Section animations on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
        }
      });
    });

    const animatedElements = document.querySelectorAll('.section-animate');
    animatedElements.forEach((item) => observer.observe(item));

    return () => {
      animatedElements.forEach((item) => observer.unobserve(item));
    };
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (subscriptionEmail.trim()) {
      setIsSubscribed(true);
      setTimeout(() => {
        setShowSubscriptionModal(false);
        setIsSubscribed(false);
        setSubscriptionEmail('');
      }, 2000);
    }
  };

  // const featuredProducts = [
  //   { id: 1, name: 'Cyberpunk Hoodie', price: '$89', category: 'Fashion', rating: 4.9 },
  //   { id: 2, name: 'Neon LED Lights', price: '$125', category: 'Home Decor', rating: 4.8 },
  //   { id: 3, name: 'Anime Art Book', price: '$32', category: 'Books', rating: 4.7 },
  //   { id: 4, name: 'VR Headset', price: '$450', category: 'Tech', rating: 4.9 },
  // ];

  const creators = [
    {
      name: 'Reedhy ',
      role: 'Founder & CEO',
      description: 'Visionary leader on a mission to redefine recent culture. ',
      avatar: '👩‍💻',
      social: { twitter: 'none', github: 'none' },
      vibe: 'Visionary'
    },
    {
      name: 'Arkasnata',
      role: 'Lead Developer',
      description: 'Building the future of kokoro with cutting-edge tech.',
      avatar: '🧙‍♂️',
      social: { twitter: 'none', github: 'none' },
      vibe: 'Code Ninja'
    },
    {
      name: 'Biswanath',
      role: 'Design Director',
      description: 'UX/UI designer obsessed with creating magical user experiences.',
      avatar: '🎨',
      social: { twitter: 'none', instagram: 'none' },
      vibe: 'Creative Soul'
    },
    {
      name: 'Snehasish',
      role: 'Community Manager',
      description: 'Building bridges between creators and fans. Always online, always hyped.',
      avatar: '🎮',
      social: { twitter: 'none', instagram: 'none' },
      vibe: 'Hype Master'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Floating Particles Background */}
      <div ref={particlesRef} className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-16 px-4 bg-gradient-to-br from-black via-purple-900/20 to-pink-900/20">
        {/* Background Elements */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-spin" style={{ animationDuration: '20s' }} />
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
        
        <div className="relative z-10 text-center max-w-6xl mx-auto">
          {/* Main Title */}
          <div className="hero-title mb-6">
            <img src={logo} alt="KOKORO Logo" className="w-50 h-50 mx-auto mb-4" />
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-2 font-orbitron">
              KOKORO
            </h2>
          </div>

          <div className="hero-subtitle text-xl md:text-2xl text-gray-300 mb-4 font-light font-inter">
           Handmade with Heart
          </div>

          <div className="hero-description text-lg text-gray-400 mb-8 max-w-2xl mx-auto font-inter">
            Discover the ultimate collection. From exclusive figures to modern apparel 
            find everything that speaks to your crazy soul.
          </div>

          {/* CTA Buttons */}
          <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="group px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white font-medium text-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 font-inter" onClick= {() => navigate('/products')}>
              <Sparkles className="w-5 h-5" />
              <span>Browse Collection</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            {/* <button className="px-8 py-4 border-2 border-purple-500 rounded-full text-purple-400 font-medium text-lg hover:bg-purple-500/10 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 font-inter">
              <Heart className="w-5 h-5" />
              <span>Wishlist</span>
            </button> */}
          </div>

          {/* Stats */}
          <div className="hero-stats grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="hero-stat">
              <div className="text-3xl font-bold text-pink-400 font-orbitron">10K+</div>
              <div className="text-gray-400 font-inter">Products</div>
            </div>
            <div className="hero-stat">
              <div className="text-3xl font-bold text-purple-400 font-orbitron">50K+</div>
              <div className="text-gray-400 font-inter">Users</div>
            </div>
            <div className="hero-stat">
              <div className="text-3xl font-bold text-cyan-400 font-orbitron">99%</div>
              <div className="text-gray-400 font-inter">Satisfaction</div>
            </div>
            <div className="hero-stat">
              <div className="text-3xl font-bold text-yellow-400 font-orbitron">24/7</div>
              <div className="text-gray-400 font-inter">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products
      <section ref={featuredRef} className="py-20 px-4 relative bg-gradient-to-br from-pink-900/20 via-purple-900/20 to-cyan-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="section-animate text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4 font-orbitron">
              <span className="text-pink-500">Featured</span> Products
            </h3>
            <p className="text-gray-400 text-lg font-inter">This week's trending items</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="section-animate group bg-gradient-to-br from-gray-900/80 to-black/90 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
              >
                <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl mb-4 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300">
                  {index % 4 === 0 ? '👕' : index % 4 === 1 ? '💡' : index % 4 === 2 ? '📚' : '🥽'}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-purple-400 uppercase tracking-wide font-inter font-bold">{product.category}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-400 font-inter">{product.rating}</span>
                    </div>
                  </div>
                  
                  <h4 className="text-white font-medium group-hover:text-purple-400 transition-colors font-inter">
                    {product.name}
                  </h4>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-pink-400 font-orbitron">{product.price}</span>
                    <button className="p-2 bg-purple-500/20 rounded-lg hover:bg-purple-500/40 transition-colors">
                      <ArrowRight className="w-4 h-4 text-purple-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* About KOKORO Section */}
      <section className="relative z-10 min-h-screen flex items-center bg-gradient-to-br from-cyan-900/20 via-purple-900/20 to-pink-900/20">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="section-animate text-center mb-16">
            <div className="flex items-center justify-center space-x-4 mb-8">
              <Sparkles className="w-12 h-12 text-pink-400 animate-pulse" />
              <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent font-orbitron animate-gradient">
                Why KOKORO?
              </h2>
              <Sparkles className="w-12 h-12 text-cyan-400 animate-pulse" />
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-inter leading-relaxed">
              More than just a store - we're building the ultimate lifestyle brand for the next generation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="section-animate group bg-gradient-to-br from-gray-900/80 to-black/90 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/20 hover:border-pink-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-10 h-10 text-pink-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 font-orbitron">Our Mission</h3>
                <p className="text-gray-300 font-inter leading-relaxed">
                  To create a space where anime culture thrives and every fan feels at home. We curate the dopest merch and build genuine connections within the community.
                </p>
              </div>
            </div>

            <div className="section-animate group bg-gradient-to-br from-gray-900/80 to-black/90 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/20 hover:border-cyan-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-10 h-10 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 font-orbitron">Our Community</h3>
                <p className="text-gray-300 font-inter leading-relaxed">
                  We're not just selling products - we're building a family. Every item tells a story, every purchase supports creators, and every customer becomes part of our journey.
                </p>
              </div>
            </div>

            <div className="section-animate group bg-gradient-to-br from-gray-900/80 to-black/90 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/20 hover:border-yellow-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/20">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Rocket className="w-10 h-10 text-yellow-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 font-orbitron">Our Vision</h3>
                <p className="text-gray-300 font-inter leading-relaxed">
                  To become the global hub for an amazing lifestyle, where creativity meets commerce and dreams become reality. The future is bright, and it's animated.
                </p>
              </div>
            </div>
          </div>

          <div className="section-animate text-center mt-16">
            <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-xl rounded-full px-8 py-4 border border-purple-500/30">
              <Heart className="w-6 h-6 text-pink-400" />
              <span className="text-lg font-inter text-white">Built with love for the GenZ community</span>
              <Heart className="w-6 h-6 text-pink-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Creators Section */}
      <section className="relative z-10 min-h-screen flex items-center bg-gradient-to-br from-pink-900/20 via-purple-900/20 to-blue-900/20">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="section-animate text-center mb-16">
            <div className="flex items-center justify-center space-x-4 mb-8">
              <Star className="w-10 h-10 text-yellow-400 animate-pulse" />
              <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent font-orbitron animate-gradient">
                Meet the Squad
              </h2>
              <Star className="w-10 h-10 text-yellow-400 animate-pulse" />
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-inter">
              The legends behind KOKORO - passionate creators building the future of the TRENDY culture
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {creators.map((creator, index) => (
              <div
                key={index}
                className="section-animate group bg-gradient-to-br from-gray-900/80 to-black/90 backdrop-blur-xl rounded-3xl p-6 border border-purple-500/20 hover:border-pink-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 text-4xl">
                    {creator.avatar}
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-1 font-orbitron">{creator.name}</h3>
                    <p className="text-pink-400 font-medium font-inter">{creator.role}</p>
                    <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-inter mt-2">
                      {creator.vibe}
                    </span>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4 font-inter leading-relaxed">
                    {creator.description}
                  </p>
                  
                  <div className="flex justify-center space-x-3">
                    {creator.social.twitter && (
                      <button className="p-2 bg-blue-500/20 hover:bg-blue-500/40 rounded-lg transition-colors">
                        <Twitter className="w-4 h-4 text-blue-400" />
                      </button>
                    )}
                    {creator.social.github && (
                      <button className="p-2 bg-gray-500/20 hover:bg-gray-500/40 rounded-lg transition-colors">
                        <Github className="w-4 h-4 text-gray-400" />
                      </button>
                    )}
                    {creator.social.instagram && (
                      <button className="p-2 bg-pink-500/20 hover:bg-pink-500/40 rounded-lg transition-colors">
                        <Instagram className="w-4 h-4 text-pink-400" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="section-animate text-center mt-16">
            <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-yellow-500/20 to-pink-500/20 backdrop-blur-xl rounded-full px-8 py-4 border border-yellow-500/30">
              <Zap className="w-6 h-6 text-yellow-400" />
              <span className="text-lg font-inter text-white">Powered by passion, driven by community</span>
              <Zap className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Stay Updated Section */}
      <section className="relative z-10 min-h-screen flex items-center bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-green-900/20">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <div className="section-animate mb-16">
            <div className="flex items-center justify-center space-x-4 mb-8">
              <Mail className="w-12 h-12 text-cyan-400 animate-pulse" />
              <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent font-orbitron animate-gradient">
                Stay in the Loop
              </h2>
              <Mail className="w-12 h-12 text-cyan-400 animate-pulse" />
            </div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto font-inter mb-8">
              Get the freshest drops, exclusive deals, and behind-the-scenes content delivered straight to your inbox ✨
            </p>
          </div>

          <div className="section-animate bg-gradient-to-br from-gray-900/80 to-black/90 backdrop-blur-xl rounded-3xl p-12 border border-cyan-500/20">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500/20 to-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔥</span>
                </div>
                <h4 className="font-bold text-white mb-2 font-orbitron">New Drops</h4>
                <p className="text-gray-300 text-sm font-inter">Be the first to know about fresh releases</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💎</span>
                </div>
                <h4 className="font-bold text-white mb-2 font-orbitron">Exclusive Deals</h4>
                <p className="text-gray-300 text-sm font-inter">Subscriber-only discounts and offers</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✨</span>
                </div>
                <h4 className="font-bold text-white mb-2 font-orbitron">Behind the Scenes</h4>
                <p className="text-gray-300 text-sm font-inter">Creator stories and community highlights</p>
              </div>
            </div>

            <button
              onClick={() => setShowSubscriptionModal(true)}
              className="px-12 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-full text-white font-bold text-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105 font-inter group"
            >
              <span className="flex items-center space-x-3">
                <Mail className="w-5 h-5 group-hover:animate-bounce" />
                <span>Subscribe for Updates</span>
                <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
              </span>
            </button>

            <p className="text-gray-400 text-sm mt-4 font-inter">
              Join 50,000+ trend lovers getting the latest updates • No spam, just vibes
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gradient-to-br from-green-900/20 via-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Logo & Description */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="text-4xl">心</div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent font-orbitron">
                    KOKORO
                  </span>
                  <span className="text-sm text-gray-400 -mt-1 font-inter">Your daily gifting buddy</span>
                </div>
              </div>
              <p className="text-gray-300 font-inter leading-relaxed mb-6 max-w-md">
                Building the ultimate lifestyle brand for the next generation. Join our community of passionate creators and fans.
              </p>
              <div className="flex space-x-4">
                <button className="p-3 bg-blue-500/20 hover:bg-blue-500/40 rounded-xl transition-colors">
                  <Twitter className="w-5 h-5 text-blue-400" />
                </button>
                <button className="p-3 bg-pink-500/20 hover:bg-pink-500/40 rounded-xl transition-colors">
                  <Instagram className="w-5 h-5 text-pink-400" />
                </button>
                <button className="p-3 bg-gray-500/20 hover:bg-gray-500/40 rounded-xl transition-colors">
                  <Github className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-white mb-4 font-orbitron">Quick Links</h4>
              <ul className="space-y-2 font-inter">
                <li><a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">Shop</a></li>
                <li><a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">Collections</a></li>
                <li><a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">New Arrivals</a></li>
                <li><a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">Sale</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-bold text-white mb-4 font-orbitron">Support</h4>
              <ul className="space-y-2 font-inter">
                <li><a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">Shipping Info</a></li>
                <li><a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">Returns</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-400 font-inter">
              © 2024 KOKORO. Made with ❤️ for the GenZ community. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Subscription Modal */}
      {showSubscriptionModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 max-w-md w-full border border-purple-500/30 animate-scale-up">
            {!isSubscribed ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-white font-orbitron">Stay Updated! ✨</h3>
                  <button
                    onClick={() => setShowSubscriptionModal(false)}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <p className="text-gray-300 mb-6 font-inter">
                  Join our community and get exclusive access to new drops, deals, and anime culture content!
                </p>
                
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <input
                    type="email"
                    value={subscriptionEmail}
                    onChange={(e) => setSubscriptionEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors font-inter"
                    required
                  />
                  
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-xl text-white font-bold transition-all duration-300 hover:scale-105 font-inter"
                  >
                    Subscribe Now 🚀
                  </button>
                </form>
                
                <p className="text-xs text-gray-400 mt-4 text-center font-inter">
                  No spam, just the good stuff. Unsubscribe anytime.
                </p>
              </>
            ) : (
              <div className="text-center">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2 font-orbitron">You're In! 🎉</h3>
                <p className="text-gray-300 font-inter">
                  Welcome to the KOKORO family! Check your inbox for a special welcome gift.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}