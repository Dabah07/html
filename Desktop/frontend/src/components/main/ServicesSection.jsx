export default function ServicesSection() {
  const services = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Lifetime Warranty",
      description: "Every timepiece comes with our comprehensive lifetime warranty covering all manufacturing defects."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Expert Servicing",
      description: "Our certified watchmakers provide professional maintenance and repair services to keep your watch running perfectly."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4-8-4m16 0v10l-8 4-8-4V7" />
        </svg>
      ),
      title: "Worldwide Shipping",
      description: "Secure, insured delivery to over 100 countries with tracking and signature confirmation."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "Authenticity Guarantee",
      description: "Each watch comes with a certificate of authenticity and is registered in our global database."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: "Personalization",
      description: "Customize your timepiece with engraving services and bespoke leather straps crafted to your preferences."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      ),
      title: "24/7 Support",
      description: "Our dedicated customer service team is available around the clock to assist with any inquiries."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Exceptional Service</h2>
          <div className="w-24 h-1 bg-yellow-500 mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Beyond creating exceptional timepieces, we're committed to providing 
            unparalleled service and support throughout your ownership experience.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="group">
              <div className="bg-white p-8 rounded-lg shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2 h-full">
                
                {/* Icon */}
                <div className="w-16 h-16 bg-yellow-500 rounded-lg flex items-center justify-center text-black mb-6 group-hover:bg-yellow-400 transition-colors">
                  {service.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-yellow-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-black text-white py-16 px-8 rounded-lg">
            <h3 className="text-3xl font-bold mb-4">Experience Excellence</h3>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Ready to discover your perfect timepiece? Our watch specialists are here to 
              guide you through our collection and help you find the watch that matches your style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-8 transition-colors uppercase tracking-wider">
                Book Consultation
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-black font-bold py-3 px-8 transition-colors uppercase tracking-wider">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
