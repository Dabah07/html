"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { apiPost, API_ENDPOINTS } from "../../lib/api";
import { setCredentials } from "../../store/slices/authSlice";
import { ADMIN_CONFIG } from "../../lib/adminConfig";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: ""
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

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match" });
      setIsSubmitting(false);
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setMessage({ type: "error", text: "Password must be at least 6 characters long" });
      setIsSubmitting(false);
      return;
    }

    try {
      // Send to backend API using axios
      const result = await apiPost(API_ENDPOINTS.REGISTER, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        address: formData.address,
        type: 'user' // Default user type
      });

      console.log('User registered:', result);
      
      // Check if user should be admin (even for registration, check admin config)
      const isUserAdmin = ADMIN_CONFIG.isAdmin(formData.email);
      
      // Store user data and login automatically
      if (result.token) {
        localStorage.setItem('authToken', result.token);
        
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
      
      setMessage({ type: "success", text: "Registration successful! Redirecting..." });
      
      // Redirect based on user role
      setTimeout(() => {
        if (isUserAdmin) {
          router.push('/admin');
        } else {
          router.push('/');
        }
      }, 1000);
      
    } catch (error) {
      console.error('Error creating account:', error);
      setMessage({ type: "error", text: error.message || "Server connection error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-12 px-6">
      <div className="max-w-7xl mx-auto mt-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 ">
          
          {/* Left Side - Welcome Section */}
          <div className="text-center lg:text-left space-y-8 mt-30">
            <div>
              <Link href="/" className="text-yellow-500 text-6xl font-bold font-mono hover:text-yellow-400 transition-colors block mb-6">
                Luxury Timepieces
              </Link>
              <h1 className="text-5xl font-bold text-white mb-4">Join Our Community</h1>
              <p className="text-xl text-gray-400 leading-relaxed">
                Create your account and discover the world's finest collection of luxury watches. 
                Swiss precision meets timeless elegance.
              </p>
            </div>

            {/* Features Section */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-yellow-500/20">
              <h3 className="text-yellow-500 font-bold text-2xl mb-6">Why Join Us?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <svg className="w-6 h-6 text-yellow-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">Authentic Timepieces</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-6 h-6 text-yellow-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">Exclusive Collections</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-6 h-6 text-yellow-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">Free Worldwide Shipping</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-6 h-6 text-yellow-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">Lifetime Warranty</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-6 h-6 text-yellow-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">Expert Service</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-6 h-6 text-yellow-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">Secure Payments</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Signup Form */}
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-2">Create Account</h2>
              <p className="text-gray-400 text-lg">
                Already have an account? <Link href="/login" className="text-yellow-500 hover:text-yellow-400 font-medium">Sign in here</Link>
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

            {/* Signup Form */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-yellow-500/20">
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Username */}
                <div>
                  <label htmlFor="username" className="block text-yellow-500 font-medium mb-2 text-lg">
                    Username *
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-colors text-lg"
                    placeholder="Enter your username..."
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-yellow-500 font-medium mb-2 text-lg">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-colors text-lg"
                    placeholder="Enter your email address..."
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-yellow-500 font-medium mb-2 text-lg">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-6 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-colors text-lg"
                    placeholder="Enter your phone number..."
                  />
                </div>

                {/* Address */}
                <div>
                  <label htmlFor="address" className="block text-yellow-500 font-medium mb-2 text-lg">
                    Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-6 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-colors resize-none text-lg"
                    placeholder="Enter your address..."
                  />
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-yellow-500 font-medium mb-2 text-lg">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      minLength="6"
                      className="w-full px-6 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-colors pr-14 text-lg"
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
                  <p className="text-gray-400 text-sm mt-2">Password must be at least 6 characters long</p>
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-yellow-500 font-medium mb-2 text-lg">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-colors text-lg"
                    placeholder="Confirm your password..."
                  />
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="w-5 h-5 text-yellow-500 bg-gray-800 border-gray-600 rounded focus:ring-yellow-500 focus:ring-2 mt-1"
                  />
                  <label htmlFor="terms" className="text-gray-300">
                    I agree to the <Link href="/terms" className="text-yellow-500 hover:text-yellow-400 underline">Terms and Conditions</Link>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.username || !formData.email || !formData.password || !formData.confirmPassword}
                  className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-4 px-8 rounded-lg disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors text-lg"
                >
                  {isSubmitting ? 'Creating Account...' : 'Create Account'}
                </button>
              </form>
            </div>

            {/* Additional Links */}
            <div className="text-center space-y-3">
              <p className="text-gray-400 text-lg">
                Already have an account? <Link href="/login" className="text-yellow-500 hover:text-yellow-400 font-medium">Sign in</Link>
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