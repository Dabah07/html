import { useState } from "react";
import axios from "axios";

export default function AddProductContent() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description1: '',
    description2: '',
    description3: '',
    description4: '',
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    brand: '',
    quantity: '',
    primaryImageIndex: 1,
    primaryDescriptionIndex: 1
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [imagePreviews, setImagePreviews] = useState({
    image1: '',
    image2: '',
    image3: '',
    image4: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e, imageNumber) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        setMessage('Please choose a valid image');
        return;
      }
      
      // Check file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setMessage('Image size must be less than 5 MB');
        return;
      }

      setFormData(prev => ({
        ...prev,
        [`image${imageNumber}`]: file
      }));

      // Create image preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviews(prev => ({
          ...prev,
          [`image${imageNumber}`]: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Check for all required images
      const missingImages = [];
      for (let i = 1; i <= 4; i++) {
        if (!formData[`image${i}`]) {
          missingImages.push(i);
        }
      }
      
      if (missingImages.length > 0) {
        setMessage(`Please add the following images: ${missingImages.join(', ')}`);
        setLoading(false);
        return;
      }

      // Create FormData compatible with backend
      const formDataToSend = new FormData();
      
      // Basic data
      formDataToSend.append('name', formData.name.trim());
      formDataToSend.append('price', formData.price);
      formDataToSend.append('brand', formData.brand.trim());
      formDataToSend.append('quantity', formData.quantity);
      
      // Primary description (from selected primary description)
      const primaryDescription = formData[`description${formData.primaryDescriptionIndex}`];
      formDataToSend.append('description', primaryDescription.trim());

      // Add images as a single array (as expected by backend)
      const images = [];
      for (let i = 1; i <= 4; i++) {
        if (formData[`image${i}`]) {
          formDataToSend.append('images', formData[`image${i}`]);
          images.push(i);
        }
      }

      // Add additional image information
      const imageAlts = images.map((_, index) => `Product image ${index + 1}`);
      formDataToSend.append('imageAlts', JSON.stringify(imageAlts));

      // Add detailed description as JSON
      const detailedDescriptions = {
        features: [
          { title: 'First Description', content: formData.description1.trim() },
          { title: 'Second Description', content: formData.description2.trim() },
          { title: 'Third Description', content: formData.description3.trim() },
          { title: 'Fourth Description', content: formData.description4.trim() }
        ].filter(desc => desc.content), // Remove empty descriptions
        specifications: [],
        additionalInfo: `Primary image: ${formData.primaryImageIndex}, Primary description: ${formData.primaryDescriptionIndex}`
      };

      formDataToSend.append('features', JSON.stringify(detailedDescriptions.features));
      formDataToSend.append('additionalInfo', detailedDescriptions.additionalInfo);

      const response = await axios.post('/api/products', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setMessage('✅ Product added successfully!');
      
      // Reset form
      setFormData({
        name: '', price: '', description1: '', description2: '', description3: '', description4: '',
        image1: null, image2: null, image3: null, image4: null, brand: '', quantity: '',
        primaryImageIndex: 1, primaryDescriptionIndex: 1
      });
      setImagePreviews({
        image1: '', image2: '', image3: '', image4: ''
      });
      
    } catch (error) {
      console.error('Error adding product:', error);
      const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
      setMessage('❌ ' + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-4 border border-yellow-500/20">
      <h3 className="text-lg font-bold text-white mb-3">Add New Product</h3>
      
      {message && (
        <div className={`mb-3 p-2 rounded-lg text-sm ${message.includes('successfully') ? 'bg-green-900/20 border border-green-500/30 text-green-300' : 'bg-red-900/20 border border-red-500/30 text-red-300'}`}>
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-yellow-500 font-medium mb-1 text-sm">Product Name *</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Product name..."
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/20 text-sm"
              required
            />
          </div>
          
          <div>
            <label className="block text-yellow-500 font-medium mb-1 text-sm">Price ($) *</label>
            <input 
              type="number" 
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Price..."
              step="0.01"
              min="0"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/20 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-yellow-500 font-medium mb-1 text-sm">Brand *</label>
            <input 
              type="text" 
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
              placeholder="Brand..."
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/20 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-yellow-500 font-medium mb-1 text-sm">Quantity *</label>
            <input 
              type="number" 
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              placeholder="Quantity..."
              min="0"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/20 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-yellow-500 font-medium mb-1 text-sm">Primary Image</label>
            <select 
              name="primaryImageIndex"
              value={formData.primaryImageIndex}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/20 text-sm"
            >
              <option value={1}>First</option>
              <option value={2}>Second</option>
              <option value={3}>Third</option>
              <option value={4}>Fourth</option>
            </select>
          </div>

          <div>
            <label className="block text-yellow-500 font-medium mb-1 text-sm">Primary Description</label>
            <select 
              name="primaryDescriptionIndex"
              value={formData.primaryDescriptionIndex}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/20 text-sm"
            >
              <option value={1}>First</option>
              <option value={2}>Second</option>
              <option value={3}>Third</option>
              <option value={4}>Fourth</option>
            </select>
          </div>
        </div>

        {/* Product Images */}
        <div className="mt-6">
          <h4 className="text-lg font-semibold text-white mb-3">Product Images (4 images required)</h4>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="space-y-2">
                <label className="block text-yellow-500 font-medium mb-1 text-sm">
                  Image {num} {formData.primaryImageIndex == num && <span className="text-green-400">★</span>}
                </label>
                
                {/* Image upload area */}
                <div className="relative">
                  <input 
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, num)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    required
                  />
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center bg-gray-800 hover:border-yellow-500 transition-colors">
                    {imagePreviews[`image${num}`] ? (
                      <div className="relative">
                        <img 
                          src={imagePreviews[`image${num}`]} 
                          alt={`Preview ${num}`}
                          className="w-full h-20 object-cover rounded"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity rounded flex items-center justify-center">
                          <span className="text-white text-xs">Change Image</span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-gray-400 text-xs">
                        <div className="mb-1">📷</div>
                        <div>Choose Image {num}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Descriptions */}
        <div className="mt-6">
          <h4 className="text-lg font-semibold text-white mb-3">Product Descriptions (4 descriptions required)</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((num) => (
              <div key={num}>
                <label className="block text-yellow-500 font-medium mb-1 text-sm">
                  Description {num} {formData.primaryDescriptionIndex == num && <span className="text-green-400">★</span>}
                </label>
                <textarea 
                  name={`description${num}`}
                  value={formData[`description${num}`]}
                  onChange={handleInputChange}
                  rows="2"
                  placeholder={`Description ${num}...`}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/20 text-sm resize-none"
                  required
                ></textarea>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex gap-3 mt-4">
          <button 
            type="submit"
            disabled={loading}
            className="bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
          >
            {loading ? 'Adding...' : 'Add Product'}
          </button>
          <button 
            type="button"
            onClick={() => {
              setFormData({
                name: '', price: '', description1: '', description2: '', description3: '', description4: '',
                image1: null, image2: null, image3: null, image4: null, brand: '', quantity: '',
                primaryImageIndex: 1, primaryDescriptionIndex: 1
              });
              setImagePreviews({
                image1: '', image2: '', image3: '', image4: ''
              });
              setMessage('');
            }}
            className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}
