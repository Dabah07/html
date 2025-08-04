"use client";
import Hero from '../components/main/Hero';
import FeaturedProducts from '../components/main/FeaturedProducts';
import AboutSection from '../components/main/AboutSection';
import ServicesSection from '../components/main/ServicesSection';
import NewsletterSection from '../components/main/NewsletterSection';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Hero />
      <FeaturedProducts />
      <AboutSection />
      <ServicesSection />
      <NewsletterSection />
    </div>
  );
}