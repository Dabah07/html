"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { motion } from "framer-motion";
import { fetchProducts } from "../../store/slices/productSlice";
import ProductCard from "../products/ProductCard";

export default function FeaturedProducts() {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    console.log('FeaturedProducts: Dispatching fetchProducts...');
    dispatch(fetchProducts());
  }, [dispatch]);

  console.log('FeaturedProducts render:', { products: products?.length, loading, error });

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-8xl mx-auto px-12 sm:px-16 lg:px-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Collection</h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg animate-pulse">
                <div className="h-80 bg-gray-300 rounded-t-lg"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-6 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-8xl mx-auto px-12 sm:px-16 lg:px-24 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Products</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => dispatch(fetchProducts())}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  // Get only first 6 products for featured section
  const featuredProducts = products.slice(0, 6);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-8xl mx-auto px-12 sm:px-16 lg:px-24">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Collection</h2>
          <div className="w-24 h-1 bg-[#B8860B] mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our handpicked selection of exceptional timepieces, each representing 
            the pinnacle of Swiss craftsmanship and sophisticated design.
          </p>
        </motion.div>

        {/* Products Grid - 3 Columns for Larger Cards */}
        {featuredProducts.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="w-full"
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <div className="text-center py-16">
            <div className="mb-8">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Products Available</h3>
              <p className="text-gray-500">Our collection is being updated. Please check back soon.</p>
            </div>
          </div>
        )}

        {/* View All Button */}
        {/* <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link 
            href="/collections"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#B8860B] to-[#DAA520] hover:from-[#DAA520] hover:to-[#B8860B] text-white py-4 px-8 rounded-xl transition-all duration-300 font-medium uppercase tracking-wider shadow-lg hover:shadow-xl hover:scale-105"
          >
            <span>View All Collection</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div> */}
      </div>
    </section>
  );
}
