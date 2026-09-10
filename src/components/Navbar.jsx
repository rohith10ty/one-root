import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  Sprout, 
  Search, 
  Heart, 
  ShoppingBag, 
  Menu, 
  X, 
  Phone, 
  Sun,
  ShieldCheck
} from 'lucide-react';

export default function Navbar() {
  const { 
    cartItemsCount, 
    wishlist, 
    setIsCartOpen, 
    setIsWishlistOpen, 
    setIsSearchOpen,
    setIsContactOpen
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Categories', href: '#categories' },
    { name: 'Plants', href: '#plants-catalog' },
    { name: 'About Us', href: '#about' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Care Tips', href: '#care-tips' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href) => {
    setMobileMenuOpen(false);
    if (href === '#contact') {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else setIsContactOpen(true);
      return;
    }
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top micro-announcement banner */}
      <div className="bg-forest-950 text-emerald-100 text-[11px] py-1.5 px-4 border-b border-emerald-900/40 relative z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[10.5px] sm:text-[11px]">
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>🌿 <strong>Spring Eco Code:</strong> <code className="bg-emerald-900/80 text-emerald-300 px-1 py-0.5 rounded font-mono text-[10px] font-bold">PLANTLOVE15</code> for 15% OFF</span>
          </div>
          <div className="hidden md:flex items-center gap-5 text-[10.5px] text-emerald-200/80">
            <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-emerald-400" /> 30-Day Guarantee</span>
            <span className="flex items-center gap-1"><Sun className="w-3 h-3 text-amber-400" /> 100% Organic</span>
            <button 
              onClick={() => setIsContactOpen(true)}
              className="flex items-center gap-1 text-emerald-300 hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
            >
              <Phone className="w-2.5 h-2.5" /> Support
            </button>
          </div>
        </div>
      </div>

      {/* Main sticky navigation */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-stone-200/80 py-2.5'
            : 'bg-cream-50/90 backdrop-blur-md border-b border-forest-100/50 py-3'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-600 to-forest-800 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-all">
              <Sprout className="w-4.5 h-4.5 text-emerald-200" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-serif font-bold text-forest-950 tracking-tight flex items-center gap-1">
                One<span className="text-emerald-600 font-sans font-light">Root</span>
              </span>
              <span className="hidden sm:block text-[9px] uppercase font-bold tracking-widest text-emerald-700/80 -mt-1">
                Botanical Nursery
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-xs font-medium text-forest-900/90 hover:text-emerald-600 transition-colors py-1"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full text-forest-800 hover:text-emerald-600 hover:bg-emerald-50 transition-all cursor-pointer relative group"
              aria-label="Search plants"
              title="Search plants (Ctrl+K)"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Wishlist Trigger */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-2 rounded-full text-forest-800 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer relative group"
              aria-label="View Wishlist"
              title="View saved plants"
            >
              <Heart className={`w-4 h-4 transition-transform ${wishlist.length ? 'fill-rose-500 text-rose-500' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center ring-2 ring-white">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-forest-900 hover:bg-forest-800 text-white shadow-sm transition-all cursor-pointer group"
              aria-label="View Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-emerald-300" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-forest-950 text-[9px] font-extrabold rounded-full w-3.5 h-3.5 flex items-center justify-center ring-1 ring-forest-900">
                    {cartItemsCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-semibold tracking-wide">
                Cart
              </span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-lg text-forest-900 hover:bg-forest-100 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-[88px] bg-white/95 backdrop-blur-2xl border-b border-emerald-100 shadow-xl p-5 transition-all z-50 max-h-[85vh] overflow-y-auto">
            <div className="flex flex-col gap-3">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-emerald-600 absolute left-3 top-3" />
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsSearchOpen(true);
                  }}
                  className="w-full text-left pl-9 pr-3 py-2 bg-forest-50/80 rounded-xl text-xs text-stone-500 border border-emerald-100"
                >
                  Search plant catalog...
                </button>
              </div>

              <div className="grid grid-cols-2 gap-1.5 pt-1">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.href)}
                    className="flex items-center gap-2 p-2.5 text-left text-xs font-semibold text-forest-900 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl transition-colors cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    {link.name}
                  </button>
                ))}
              </div>

              <div className="pt-3 border-t border-stone-100 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsContactOpen(true);
                  }}
                  className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl text-center text-xs shadow-sm transition-colors"
                >
                  Visit Greenhouse & Contact Us
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
