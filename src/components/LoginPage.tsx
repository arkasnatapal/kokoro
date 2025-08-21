import { useEffect, useRef, useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    // Entrance animation
    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.classList.add('animate-scale-up');
      }
      const loginTitles = document.querySelectorAll('.login-title');
      const loginFormItems = document.querySelectorAll('.login-form-item');
      
      loginTitles.forEach((title, index) => {
        setTimeout(() => {
          title.classList.add('animate-fade-in-up');
        }, index * 100);
      });
      
      loginFormItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('animate-fade-in-up');
        }, (index + 2) * 100);
      });
    }, 200);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        navigate('/'); // go back to home page after login
      }, 500);
    }, 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-16 px-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-pink-900/20 to-black" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }} />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div ref={containerRef} className="relative z-10 w-full max-w-md">
        <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/20 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="login-title text-4xl mb-2">心</div>
            <h2 className="login-title text-2xl font-bold text-white mb-2 font-orbitron">LOGIN</h2>
            <p className="login-title text-gray-400 font-inter">Welcome to KOKORO</p>
          </div>

          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="login-form-item">
              <label className="block text-sm text-gray-300 mb-2 font-inter">
                <Mail className="inline w-4 h-4 mr-2" />
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 font-inter"
                placeholder="your@email.com"
                required
              />
            </div>

            {/* Password Field */}
            <div className="login-form-item">
              <label className="block text-sm text-gray-300 mb-2 font-inter">
                <Lock className="inline w-4 h-4 mr-2" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 bg-gray-900/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 font-inter"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="login-form-item flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-300 font-inter">
                <input type="checkbox" className="mr-2 accent-purple-500" />
                Remember me
              </label>
              <button type="button" className="text-purple-400 hover:text-purple-300 transition-colors font-inter">
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="login-form-item login-button w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl text-white font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 font-inter"
            >
              {isLoading ? (
                <>
                  <div className="loading-spinner w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Login</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Social Login */}
          <div className="login-form-item mt-6 pt-6 border-t border-gray-700">
            <div className="text-center text-gray-400 text-sm mb-4 font-inter">Or sign in with</div>
            <div className="grid grid-cols-2 gap-3">
              <button className="py-2 px-4 bg-gray-800 hover:bg-gray-700 rounded-lg text-white text-sm transition-colors flex items-center justify-center space-x-2 font-inter">
                <span>🌸</span>
                <span>Google</span>
              </button>
              <button className="py-2 px-4 bg-gray-800 hover:bg-gray-700 rounded-lg text-white text-sm transition-colors flex items-center justify-center space-x-2 font-inter">
                <span>🎌</span>
                <span>Discord</span>
              </button>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="login-form-item text-center mt-6">
            <p className="text-gray-400 text-sm font-inter">
              Don&apos;t have an account?{' '}
              <button
                onClick={() => navigate('/signup')}
                className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
