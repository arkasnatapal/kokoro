import React, { useEffect, useRef, useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, Sparkles, ArrowRight, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Entrance animation
    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.classList.add('animate-bounce-in');
      }
      const signupTitles = document.querySelectorAll('.signup-title');
      const signupFormItems = document.querySelectorAll('.signup-form-item');
      
      signupTitles.forEach((title, index) => {
        setTimeout(() => {
          title.classList.add('animate-fade-in-up');
        }, index * 100);
      });
      
      signupFormItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('animate-fade-in-left');
        }, (index + 3) * 150);
      });
    }, 200);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      // Add shake animation for error
      if (formRef.current) {
        formRef.current.classList.add('animate-shake');
        setTimeout(() => {
          formRef.current?.classList.remove('animate-shake');
        }, 500);
      }
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        navigate('/home'); // ✅ replaced setCurrentPage with navigate
      }, 500);
    }, 3500);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  return (
    <div className="min-h-screen flex items-center justify-center pt-16 px-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-pink-900/30 via-purple-900/20 to-cyan-900/10" />
      
      {/* Glowing Elements */}
      <div className="absolute top-10 right-20 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 left-20 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-cyan-500/15 rounded-full blur-2xl animate-spin" style={{ animationDuration: '20s' }} />

      {/* Animated particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          >
            {i % 3 === 0 ? '✨' : i % 3 === 1 ? '💫' : '🌸'}
          </div>
        ))}
      </div>

      <div ref={containerRef} className="relative z-10 w-full max-w-lg">
        <div className="bg-black/50 backdrop-blur-xl rounded-3xl p-8 border border-pink-500/20 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="signup-title text-5xl mb-3 animate-pulse">🌸</div>
            <h2 className="signup-title text-3xl font-bold text-white mb-2 font-orbitron">SIGN UP</h2>
            <p className="signup-title text-gray-400 font-inter">Join the KOKORO family</p>
          </div>

          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
            {/* Username Field */}
            <div className="signup-form-item">
              <label className="block text-sm text-gray-300 mb-2 font-inter">
                <User className="inline w-4 h-4 mr-2 text-pink-400" />
                Username
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                className="w-full px-4 py-3 bg-gray-900/60 border border-pink-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300 font-inter"
                placeholder="Your username"
                required
              />
            </div>

            {/* Email Field */}
            <div className="signup-form-item">
              <label className="block text-sm text-gray-300 mb-2 font-inter">
                <Mail className="inline w-4 h-4 mr-2 text-purple-400" />
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-3 bg-gray-900/60 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 font-inter"
                placeholder="your@email.com"
                required
              />
            </div>

            {/* Password Field */}
            <div className="signup-form-item">
              <label className="block text-sm text-gray-300 mb-2 font-inter">
                <Lock className="inline w-4 h-4 mr-2 text-cyan-400" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full px-4 py-3 pr-12 bg-gray-900/60 border border-cyan-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 font-inter"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="signup-form-item">
              <label className="block text-sm text-gray-300 mb-2 font-inter">
                <Lock className="inline w-4 h-4 mr-2 text-yellow-400" />
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="w-full px-4 py-3 pr-12 bg-gray-900/60 border border-yellow-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 font-inter"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="signup-form-item">
              <label className="flex items-start text-sm text-gray-300 font-inter">
                <input type="checkbox" className="mr-3 mt-1 accent-pink-500" required />
                <span>
                  I agree to the{' '}
                  <a href="#" className="text-pink-400 hover:text-pink-300">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-purple-400 hover:text-purple-300">Privacy Policy</a>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="signup-form-item signup-button w-full py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-xl text-white font-medium hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 relative overflow-hidden font-inter"
            >
              {isLoading ? (
                <>
                  <div className="loading-hearts flex space-x-1">
                    <Heart className="w-5 h-5 text-pink-300 animate-bounce" />
                    <Heart className="w-5 h-5 text-purple-300 animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <Heart className="w-5 h-5 text-cyan-300 animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Create Account</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Social Signup */}
          <div className="signup-form-item mt-6 pt-6 border-t border-gray-700">
            <div className="text-center text-gray-400 text-sm mb-4 font-inter">Or sign up with</div>
            <div className="grid grid-cols-2 gap-3">
              <button className="py-3 px-4 bg-gradient-to-r from-pink-600/20 to-pink-600/10 hover:from-pink-600/30 hover:to-pink-600/20 rounded-lg text-white text-sm transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 border border-pink-500/20 font-inter">
                <span>🌸</span>
                <span>Google</span>
              </button>
              <button className="py-3 px-4 bg-gradient-to-r from-purple-600/20 to-purple-600/10 hover:from-purple-600/30 hover:to-purple-600/20 rounded-lg text-white text-sm transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 border border-purple-500/20 font-inter">
                <span>🎌</span>
                <span>Discord</span>
              </button>
            </div>
          </div>

          {/* Login Link */}
          <div className="signup-form-item text-center mt-6">
            <p className="text-gray-400 text-sm font-inter">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-pink-400 hover:text-pink-300 transition-colors font-medium"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}