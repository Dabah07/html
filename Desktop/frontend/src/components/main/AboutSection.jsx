export default function AboutSection() {
  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Content */}
          <div>
            <h2 className="text-yellow-400 text-lg font-medium mb-4 tracking-wider uppercase">
              Our Heritage
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Crafting Time Since 1848
            </h3>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              For over 175 years, we have been at the forefront of watchmaking innovation, 
              combining traditional Swiss craftsmanship with cutting-edge technology to create 
              timepieces that transcend generations.
            </p>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Each watch in our collection tells a story of precision, elegance, and timeless 
              design. From our master watchmakers' workshops to your wrist, every detail is 
              meticulously crafted to perfection.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">175+</div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">Years of Excellence</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">50+</div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">Master Craftsmen</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">1M+</div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">Satisfied Customers</div>
              </div>
            </div>

            <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-8 transition-all duration-300 uppercase tracking-wider">
              Discover Our Story
            </button>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1594534475808-b18fc33b045e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Master Craftsman at Work"
                className="w-full h-96 object-cover rounded-lg shadow-2xl"
              />
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-8 -left-8 w-full h-full border-2 border-yellow-500/30 rounded-lg z-0"></div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-yellow-500/20 to-transparent rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
