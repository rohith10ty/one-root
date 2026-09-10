import React, { useState } from 'react';
import { ShopProvider } from './context/ShopContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import PlantCatalog from './components/PlantCatalog';
import AboutSection from './components/AboutSection';
import WhyChooseUs from './components/WhyChooseUs';
import CareTips from './components/CareTips';
import Reviews from './components/Reviews';
import Newsletter from './components/Newsletter';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import SearchModal from './components/SearchModal';
import PlantModal from './components/PlantModal';
import CheckoutModal from './components/CheckoutModal';
import ToastContainer from './components/ToastContainer';
import { useLenis } from './hooks/useLenis';

function NurseryApp() {
  useLenis();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FDE5D4]/30 text-[#001524] flex flex-col selection:bg-[#D6CC99] selection:text-[#001524]">
      {/* Navigation */}
      <Navbar />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* 1. Hero Section with Floating Leaf Canvas & Metrics */}
        <Hero />

        {/* 2. Plant Categories (6 Cards with filter triggers) */}
        <Categories />

        {/* 3. Featured Plants Grid with Search, Sort, Badges */}
        <PlantCatalog />

        {/* 4. About Nursery & Permaculture Philosophy */}
        <AboutSection />

        {/* 6. Why Choose Us (5 Benefit Cards & Eco Packaging) */}
        <WhyChooseUs />

        {/* 7. Plant Care Guides & Interactive Doctor Plant Symptom Checker */}
        <CareTips />

        {/* 8. Customer Reviews & Testimonials Carousel */}
        <Reviews />

        {/* 9. Newsletter Section with Validation & Coupon Reward */}
        <Newsletter />

        {/* 10. Contact Section & Greenhouse Visiting Hours */}
        <ContactSection />
      </main>

      {/* 11. Footer */}
      <Footer />

      {/* Modals & Interactive Overlays */}
      <SearchModal />
      <PlantModal />
      <CartDrawer onOpenCheckout={() => setIsCheckoutOpen(true)} />
      <WishlistDrawer />
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <NurseryApp />
    </ShopProvider>
  );
}
