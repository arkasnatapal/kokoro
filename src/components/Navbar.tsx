import { useEffect, useRef, useState } from "react";
import {
  Menu,
  ShoppingCart,
  Search,
  X,
  User,
  LogIn,
  UserPlus,
  ChevronDown,
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

interface NavbarProps {
  cartItemCount: number;
}

export default function Navbar({ cartItemCount }: NavbarProps) {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  const navigate = useNavigate();

  useEffect(() => {
    // Navbar entrance animation
    setTimeout(() => {
      if (navRef.current) {
        navRef.current.classList.add("animate-slide-down");
      }
      const navItems = document.querySelectorAll(".nav-item");
      navItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add("animate-fade-in", "nav-item-visible");
        }, index * 100);
      });
    }, 100);

    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node)
      ) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
  ];

  return (
    <nav
      ref={navRef}
      className="fixed top-0 w-full z-40 bg-black/80 backdrop-blur-md border-b border-purple-500/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            ref={logoRef}
            className="nav-item nav-item-visible flex items-center space-x-3 cursor-pointer  transition-all duration-300"
          >
            <div className="text-3xl">
              <img src={logo} alt="KOKORO Logo" className="w-10 h-10" />
              </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent font-orbitron">
                KOKORO
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `nav-item nav-item-visible flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-purple-500/20 hover:scale-105 font-inter ${
                    isActive
                      ? "bg-purple-500/20 text-purple-400"
                      : "text-gray-300"
                  }`
                }
              >
                <span className="font-medium">{item.name}</span>
              </NavLink>
            ))}
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <button className="nav-item nav-item-visible p-2 rounded-lg hover:bg-purple-500/20 transition-all duration-300 hover:scale-110">
              <Search className="w-5 h-5 text-gray-300" />
            </button>

            <button
              onClick={() => navigate("/cart")}
              className="nav-item nav-item-visible p-2 rounded-lg hover:bg-purple-500/20 transition-all duration-300 hover:scale-110 relative"
            >
              <ShoppingCart className="w-5 h-5 text-gray-300" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-xs rounded-full w-5 h-5 flex items-center justify-center font-inter text-white animate-pulse">
                  {cartItemCount > 99 ? "99+" : cartItemCount}
                </span>
              )}
            </button>

            {/* User Profile Dropdown */}
            <div className="relative" ref={userDropdownRef}>
              <button
                className="nav-item nav-item-visible p-2 rounded-lg hover:bg-purple-500/20 transition-all duration-300 hover:scale-110 flex items-center space-x-1"
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              >
                <User className="w-5 h-5 text-gray-300" />
                <ChevronDown
                  className={`w-3 h-3 text-gray-300 transition-transform duration-200 ${
                    isUserDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown */}
              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-black/90 backdrop-blur-xl rounded-2xl border border-purple-500/20 shadow-2xl animate-fade-in-down overflow-hidden">
                  {/* Toggle Header */}
                  <div className="p-4 border-b border-gray-700">
                    <div className="flex items-center justify-center">
                      <div className="flex bg-gray-800 rounded-full p-1">
                        <button
                          onClick={() => setAuthMode("login")}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 font-inter ${
                            authMode === "login"
                              ? "bg-purple-500 text-white"
                              : "text-gray-400 hover:text-white"
                          }`}
                        >
                          Login
                        </button>
                        <button
                          onClick={() => setAuthMode("signup")}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 font-inter ${
                            authMode === "signup"
                              ? "bg-pink-500 text-white"
                              : "text-gray-400 hover:text-white"
                          }`}
                        >
                          Sign Up
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Auth Content */}
                  <div className="p-4">
                    {authMode === "login" ? (
                      <div className="space-y-4">
                        <div className="text-center">
                          <LogIn className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                          <h3 className="font-semibold text-white font-orbitron">
                            Welcome Back!
                          </h3>
                          <p className="text-sm text-gray-400 font-inter">
                            Sign in to your account
                          </p>
                        </div>
                        <Link
                          to="/login"
                          onClick={() => setIsUserDropdownOpen(false)}
                          className="block w-full py-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl text-center text-white font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 font-inter"
                        >
                          <LogIn className="inline-block w-4 h-4 mr-2" />
                          Go to Login
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="text-center">
                          <UserPlus className="w-8 h-8 text-pink-400 mx-auto mb-2" />
                          <h3 className="font-semibold text-white font-orbitron">
                            Join KOKORO!
                          </h3>
                          <p className="text-sm text-gray-400 font-inter">
                            Create your account today
                          </p>
                        </div>
                        <Link
                          to="/signup"
                          onClick={() => setIsUserDropdownOpen(false)}
                          className="block w-full py-3 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl text-center text-white font-medium hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300 hover:scale-105 font-inter"
                        >
                          <UserPlus className="inline-block w-4 h-4 mr-2" />
                          Go to Sign Up
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu button */}
            <button
              className="nav-item nav-item-visible md:hidden p-2 rounded-lg hover:bg-purple-500/20 transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-300" />
              ) : (
                <Menu className="w-5 h-5 text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black/90 backdrop-blur-xl border-t border-purple-500/20 animate-fade-in-down">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `w-full text-left flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-300 hover:bg-purple-500/20 font-inter ${
                      isActive
                        ? "bg-purple-500/20 text-purple-400"
                        : "text-gray-300"
                    }`
                  }
                >
                  <span className="font-medium">{item.name}</span>
                </NavLink>
              ))}

              {/* Mobile Auth Buttons */}
              <div className="pt-4 border-t border-gray-700 space-y-2">
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-300 hover:bg-purple-500/20 text-gray-300 font-inter"
                >
                  <LogIn className="w-5 h-5" />
                  <span className="font-medium">Login</span>
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-300 hover:bg-pink-500/20 text-gray-300 font-inter"
                >
                  <UserPlus className="w-5 h-5" />
                  <span className="font-medium">Sign Up</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
