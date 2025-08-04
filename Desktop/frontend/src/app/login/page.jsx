"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { apiPost, API_ENDPOINTS } from "../../lib/api";
import { setCredentials } from "../../store/slices/authSlice";
import { ADMIN_CONFIG } from "../../lib/adminConfig";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      const result = await apiPost(API_ENDPOINTS.LOGIN, {
        email: formData.email,
        password: formData.password
      });

      console.log('Login successful:', result);
      
      // Store the token in localStorage
      if (result.token) {
        localStorage.setItem('authToken', result.token);
        
        // Check if user should be admin using admin config
        const isUserAdmin = ADMIN_CONFIG.isAdmin(formData.email);
        
        const userWithRole = {
          ...result.user,
          ...(isUserAdmin ? ADMIN_CONFIG.defaultAdminRole : ADMIN_CONFIG.defaultUserRole)
        };
        
        localStorage.setItem('user', JSON.stringify(userWithRole));
        
        // Update Redux state
        dispatch(setCredentials({ 
          user: userWithRole, 
          token: result.token 
        }));
      }
      
      setMessage({ type: "success", text: "Login successful! Redirecting..." });
      
      // Redirect based on user role
      setTimeout(() => {
        if (ADMIN_CONFIG.isAdmin(formData.email)) {
          router.push('/admin');
        } else {
          router.push('/');
        }
      }, 1000);
      
    } catch (error) {
      console.error('Error during login:', error);
      setMessage({ type: "error", text: error.message || "Login failed" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900  py-12 px-6">
      <div className="max-w-6xl mx-auto mt-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Welcome Section */}
          <div className="text-center lg:text-left space-y-8">
            <div>
              <Link href="/" className="text-yellow-500 text-6xl font-bold font-mono hover:text-yellow-400 transition-colors block mb-6">
                Luxury Timepieces
              </Link>
              <h1 className="text-5xl font-bold text-white mb-4">Welcome Back</h1>
              <p className="text-xl text-gray-400 leading-relaxed">
                Sign in to access your account and explore our exclusive collection of luxury watches.
                Discover timepieces that define elegance and precision.
              </p>
            </div>

            {/* Features Section */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-yellow-500/20">
              <h3 className="text-yellow-500 font-bold text-2xl mb-6">Member Benefits</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <svg className="w-6 h-6 text-yellow-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">Exclusive Watch Collections</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-6 h-6 text-yellow-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">Order History & Tracking</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-6 h-6 text-yellow-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H4v-2l4.257-4.257A6 6 0 1118 8zm-6-2a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">Personal Recommendations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-6 h-6 text-yellow-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">VIP Customer Support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-6 h-6 text-yellow-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732L14.146 12.8l-1.179 4.456a1 1 0 01-1.934 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732L9.854 7.2l1.179-4.456A1 1 0 0112 2z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">Special Offers & Events</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-2">Sign In</h2>
              <p className="text-gray-400 text-lg">
                Don't have an account? <Link href="/signup" className="text-yellow-500 hover:text-yellow-400 font-medium">Create one here</Link>
              </p>
            </div>

            {/* Success/Error Message */}
            {message.text && (
              <div className={`p-4 rounded-lg text-center font-medium ${
                message.type === "success" 
                  ? "bg-green-900 text-green-300 border border-green-500" 
                  : "bg-red-900 text-red-300 border border-red-500"
              }`}>
                {message.text}
              </div>
            )}

            {/* Login Form */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-2xl p-10 border border-yellow-500/20">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-yellow-500 font-medium mb-3 text-lg">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-4 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-colors text-lg"
                    placeholder="Enter your email address..."
                  />
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-yellow-500 font-medium mb-3 text-lg">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="w-full px-6 py-4 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-colors pr-14 text-lg"
                      placeholder="Enter your password..."
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-500"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {showPassword ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464M14.12 14.12l1.415 1.415M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        )}
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember"
                      className="w-5 h-5 text-yellow-500 bg-gray-800 border-gray-600 rounded focus:ring-yellow-500 focus:ring-2"
                    />
                    <label htmlFor="remember" className="ml-2 text-gray-300">
                      Remember me
                    </label>
                  </div>
                  <Link href="/forgot-password" className="text-yellow-500 hover:text-yellow-400">
                    Forgot password?
                  </Link>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.email || !formData.password}
                  className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-4 px-8 rounded-lg disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors text-lg"
                >
                  {isSubmitting ? 'Signing In...' : 'Sign In'}
                </button>
              </form>
            </div>

            {/* Additional Links */}
            <div className="text-center space-y-3">
              <p className="text-gray-400 text-lg">
                Don't have an account? <Link href="/signup" className="text-yellow-500 hover:text-yellow-400 font-medium">Create one</Link>
              </p>
              <Link href="/" className="text-gray-500 hover:text-gray-400 block">
                Back to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}