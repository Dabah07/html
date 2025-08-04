"use client";
import { useState, useEffect } from "react";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      id: 1,
      title: "Timeless Elegance",
      subtitle: "Discover Our Exclusive Collection",
      description: "Handcrafted precision meets luxury design in every timepiece",
      image: "/img4.avif",
      buttonText: "Explore Collection"
    },
    {
      id: 2,
      title: "Swiss Craftsmanship",
      subtitle: "Heritage of Excellence",
      description: "Since 1848, we've been creating watches that define perfection",
      image: "/img3.avif",
      buttonText: "Our Heritage"
    },
    {
      id: 3,
      title: "New Arrivals",
      subtitle: "The Future of Time",
      description: "Introducing our latest masterpieces with cutting-edge technology",
      image: "/img5.avif",
      buttonText: "Shop Now"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${
            index === currentSlide ? 'translate-x-0' : 
            index < currentSlide ? '-translate-x-full' : 'translate-x-full'
          }`}
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10"></div>
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${slide.image}')`
            }}
          ></div>
          
          {/* Content */}
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
              <div className="max-w-2xl">
                <h2 className="text-yellow-400 text-lg font-medium mb-4 tracking-wider uppercase">
                  {slide.subtitle}
                </h2>
                <h1 className="text-white text-5xl md:text-7xl font-bold mb-6 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-gray-300 text-xl mb-8 leading-relaxed">
                  {slide.description}
                </p>
                <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 px-8 transition-all duration-300 transform hover:scale-105 uppercase tracking-wider">
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-yellow-500 w-8' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 z-30 text-white hover:text-yellow-400 transition-colors"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 z-30 text-white hover:text-yellow-400 transition-colors"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-30 text-white animate-bounce">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
