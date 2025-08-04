"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Search, User, Menu, X } from "lucide-react";
import { toggleCart } from "../../store/slices/cartSlice";
import { logout } from "../../store/slices/authSlice";


export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const dispatch = useDispatch();
  const { items: cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Check if user is admin
  const isAdmin = user?.role === 'admin' || user?.isAdmin || false;

  // Ensure cartItems is always an array
  const safeCartItems = Array.isArray(cartItems) ? cartItems : [];
  const totalItems = safeCartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);

  useEffect(() => {
    setIsClient(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleCartToggle = () => {
    dispatch(toggleCart());
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-black/95 backdrop-blur-md shadow-2xl' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent"
            >
              LUXURY WATCHES
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="text-white hover:text-yellow-400 transition-colors font-medium relative group">
              Products
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/collections" className="text-white hover:text-yellow-400 transition-colors font-medium relative group">
              Collections
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/new-arrivals" className="text-white hover:text-yellow-400 transition-colors font-medium relative group">
              New Arrivals
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/heritage" className="text-white hover:text-yellow-400 transition-colors font-medium relative group">
              Heritage
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/about" className="text-white hover:text-yellow-400 transition-colors font-medium relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all group-hover:w-full"></span>
            </Link>
            {isAuthenticated && isAdmin && (
              <Link href="/admin" className="text-orange-400 hover:text-orange-300 transition-colors font-medium relative group">
                Admin
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-400 transition-all group-hover:w-full"></span>
              </Link>
            )}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            
            {/* Search */}
            <div className="relative">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-white hover:text-yellow-400 transition-colors p-2"
              >
                <Search className="w-5 h-5" />
              </motion.button>
              
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    className="absolute right-0 top-full mt-2 w-80 bg-black/95 backdrop-blur-md rounded-lg border border-yellow-500/20 p-4"
                  >
                    <input
                      type="text"
                      placeholder="Search luxury watches..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      autoFocus
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Account */}
            <div className="relative group">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-white hover:text-yellow-400 transition-colors p-2"
              >
                <User className="w-5 h-5" />
              </motion.button>
              
              {/* User Dropdown */}
              <div className="absolute right-0 top-full mt-2 w-48 bg-black/95 backdrop-blur-md rounded-lg border border-yellow-500/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                {isClient && (
                  <>
                    {isAuthenticated ? (
                      <div className="p-4 space-y-2">
                        <div className="text-white text-sm font-medium border-b border-gray-700 pb-2">
                          Welcome, {user?.name || 'User'}
                        </div>
                        <Link href="/profile" className="block text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                          My Profile
                        </Link>
                        <Link href="/orders" className="block text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                          My Orders
                        </Link>
                        {isAdmin && (
                          <Link href="/admin" className="block text-orange-400 hover:text-orange-300 transition-colors text-sm font-medium">
                            Admin Panel
                          </Link>
                        )}
                        <button 
                          onClick={handleLogout}
                          className="block w-full text-left text-red-400 hover:text-red-300 transition-colors text-sm"
                        >
                          Logout
                        </button>
                      </div>
                    ) : (
                      <div className="p-4 space-y-2">
                        <Link href="/login" className="block text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                          Login
                        </Link>
                        <Link href="/signup" className="block text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                          Sign Up
                        </Link>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Shopping Cart */}
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCartToggle}
              className="text-white hover:text-yellow-400 transition-colors relative p-2"
            >
              <ShoppingCart className="w-5 h-5" />
              {isClient && totalItems > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-yellow-500 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold"
                >
                  {totalItems}
                </motion.span>
              )}
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white hover:text-yellow-400 transition-colors p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/95 backdrop-blur-md border-t border-yellow-500/20"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link href="/products" className="block px-3 py-2 text-white hover:text-yellow-400 transition-colors">
                  Products
                </Link>
                <Link href="/collections" className="block px-3 py-2 text-white hover:text-yellow-400 transition-colors">
                  Collections
                </Link>
                <Link href="/new-arrivals" className="block px-3 py-2 text-white hover:text-yellow-400 transition-colors">
                  New Arrivals
                </Link>
                <Link href="/heritage" className="block px-3 py-2 text-white hover:text-yellow-400 transition-colors">
                  Heritage
                </Link>
                <Link href="/about" className="block px-3 py-2 text-white hover:text-yellow-400 transition-colors">
                  About
                </Link>
                {isAuthenticated ? (
                  <>
                    {isAdmin && (
                      <Link href="/admin" className="block px-3 py-2 text-orange-400 hover:text-orange-300 transition-colors font-medium">
                        Admin Panel
                      </Link>
                    )}
                    <Link href="/profile" className="block px-3 py-2 text-white hover:text-yellow-400 transition-colors">
                      My Profile
                    </Link>
                    <Link href="/orders" className="block px-3 py-2 text-white hover:text-yellow-400 transition-colors">
                      My Orders
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-2 text-red-400 hover:text-red-300 transition-colors"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="block px-3 py-2 text-white hover:text-yellow-400 transition-colors">
                      Login
                    </Link>
                    <Link href="/signup" className="block px-3 py-2 text-white hover:text-yellow-400 transition-colors">
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
