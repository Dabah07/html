import { useState } from "react";
import { Eye, Edit, Trash2, Search, Filter } from "lucide-react";

export default function ViewProductsContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBrand, setFilterBrand] = useState('');
  
  // Sample data - in real app this would come from API
  const [products] = useState([
    {
      id: 1,
      name: "Rolex Submariner",
      brand: "Rolex",
      price: 8500,
      stock: 5,
      category: "Diving",
      image: "/api/placeholder/50/50"
    },
    {
      id: 2,
      name: "Omega Speedmaster",
      brand: "Omega",
      price: 6200,
      stock: 3,
      category: "Sport",
      image: "/api/placeholder/50/50"
    },
    {
      id: 3,
      name: "Patek Philippe Calatrava",
      brand: "Patek Philippe",
      price: 25000,
      stock: 2,
      category: "Dress",
      image: "/api/placeholder/50/50"
    },
    {
      id: 4,
      name: "Audemars Piguet Royal Oak",
      brand: "Audemars Piguet",
      price: 32000,
      stock: 1,
      category: "Luxury",
      image: "/api/placeholder/50/50"
    }
  ]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = filterBrand === '' || product.brand === filterBrand;
    return matchesSearch && matchesBrand;
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      console.log('Delete product:', id);
      // Here you would call your API to delete the product
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">All Products</h3>
            <p className="text-gray-400">Manage your product inventory</p>
          </div>
          <div className="mt-4 md:mt-0">
            <span className="text-yellow-500 font-medium">
              Total Products: {filteredProducts.length}
            </span>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={filterBrand}
              onChange={(e) => setFilterBrand(e.target.value)}
              className="pl-10 pr-8 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
            >
              <option value="">All Brands</option>
              <option value="Rolex">Rolex</option>
              <option value="Omega">Omega</option>
              <option value="Patek Philippe">Patek Philippe</option>
              <option value="Audemars Piguet">Audemars Piguet</option>
            </select>
          </div>
        </div>

        {/* Products Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="pb-3 text-yellow-500">Image</th>
                <th className="pb-3 text-yellow-500">Product Name</th>
                <th className="pb-3 text-yellow-500">Brand</th>
                <th className="pb-3 text-yellow-500">Category</th>
                <th className="pb-3 text-yellow-500">Price</th>
                <th className="pb-3 text-yellow-500">Stock</th>
                <th className="pb-3 text-yellow-500">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b border-gray-800 hover:bg-gray-800/30">
                  <td className="py-3">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover bg-gray-700"
                    />
                  </td>
                  <td className="py-3 font-medium">{product.name}</td>
                  <td className="py-3">{product.brand}</td>
                  <td className="py-3">
                    <span className="px-2 py-1 bg-blue-900/30 text-blue-300 rounded-md text-sm">
                      {product.category}
                    </span>
                  </td>
                  <td className="py-3 font-bold">${product.price.toLocaleString()}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-md text-sm ${
                      product.stock > 5 ? 'bg-green-900/30 text-green-300' :
                      product.stock > 0 ? 'bg-yellow-900/30 text-yellow-300' :
                      'bg-red-900/30 text-red-300'
                    }`}>
                      {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex space-x-2">
                      <button 
                        className="text-blue-400 hover:text-blue-300 p-1"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        className="text-green-400 hover:text-green-300 p-1"
                        title="Edit Product"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="text-red-400 hover:text-red-300 p-1"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-400">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
