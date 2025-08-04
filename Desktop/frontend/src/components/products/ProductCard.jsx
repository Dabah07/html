"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { Eye, Heart, ShoppingCart, Edit, Trash2 } from "lucide-react";
import { addToCart } from "../../store/slices/cartSlice";
import toast from "react-hot-toast";

const ProductCard = ({ product, onEdit, onDelete, isAdmin = false, viewMode = "grid" }) => {
  const dispatch = useDispatch();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    }));
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  const getImageSrc = () => {
    if (imageError || !product.image) {
      return '/api/placeholder/400/400';
    }
    // استخدام الرابط الكامل الذي يأتي من الباك إند مباشرة
    return product.image;
  };

  // Omega-style product card - Matching omegawatches.com design
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white overflow-hidden transition-all duration-300 group w-full max-w-sm mx-auto"
    >
      {/* Image Container - Clean Omega Style */}
      <div className="relative overflow-hidden bg-white">
        <div className="aspect-square p-8 bg-gradient-to-br from-gray-50 to-white">
          <img
            src={getImageSrc()}
            alt={product.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        
        {/* Hover Actions - Minimalist */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex flex-col gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleWishlist}
              className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full shadow-sm flex items-center justify-center hover:bg-white transition-all duration-200"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-500'}`} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full shadow-sm flex items-center justify-center hover:bg-white transition-all duration-200"
            >
              <Eye className="w-4 h-4 text-gray-500" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Content Section - Omega Style */}
      <div className="p-6 space-y-4">
        {/* Product Name - Clean Typography */}
        <div className="text-center">
          <h3 className="text-lg font-normal text-gray-900 leading-tight mb-1">
            {product.name}
          </h3>
         
        </div>

        {/* Price - Where specifications used to be */}
        <div className="text-center">
          <p className="text-base text-gray-700 font-medium">
            ${product.price?.toLocaleString()}
          </p>
        </div>

        {/* Buy Button - Instead of Details */}
        <div className="text-center pt-2">
          {!isAdmin ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="w-full bg-black text-white py-3 px-6 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors duration-300"
            >
              Buy
            </motion.button>
          ) : (
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onEdit(product)}
                className="flex-1 bg-blue-50 text-blue-600 py-2 px-3 text-sm hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onDelete(product._id)}
                className="flex-1 bg-red-50 text-red-600 py-2 px-3 text-sm hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
