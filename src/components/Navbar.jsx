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
      setIsScrolled(window.scrollY > 20);
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
      <div className="bg-forest-950 text-emerald-100 text-xs py-2 px-4 border-b border-emerald-900/40 relative z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>🌿 <strong>Spring Eco Sale:</strong> Use code <code className="bg-emerald-900/80 text-emerald-300 px-1.5 py-0.5 rounded font-mono font-bold">PLANTLOVE15</code> for 15% OFF</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-[11px] text-emerald-200/80">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 30-Day Survival Guarantee</span>
            <span className="flex items-center gap-1.5"><Sun className="w-3.5 h-3.5 text-amber-400" /> 100% Organically Grown</span>
            <button 
              onClick={() => setIsContactOpen(true)}
              className="flex items-center gap-1 text-emerald-300 hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
            >
              <Phone className="w-3 h-3" /> Nursery Support
            </button>
          </div>
        </div>
      </div>

      {/* Main sticky navigation */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-botanical border-b border-emerald-100/80 py-3'
            : 'bg-cream-50/80 backdrop-blur-md border-b border-forest-100/60 py-4.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-600 to-forest-800 flex items-center justify-center text-white shadow-md shadow-emerald-900/20 group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
              <Sprout className="w-6 h-6 text-emerald-200" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-serif font-bold text-forest-950 tracking-tight flex items-center gap-1">
                Verdant<span className="text-emerald-600 font-sans font-light">Oasis</span>
              </span>
              <span className="hidden sm:block text-[10px] uppercase font-bold tracking-widest text-emerald-700/80 -mt-1">
                Botanical Nursery
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-sm font-medium text-forest-900 hover:text-emerald-600 transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-emerald-500 hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 rounded-full text-forest-800 hover:text-emerald-600 hover:bg-emerald-50 transition-all cursor-pointer relative group"
              aria-label="Search plants"
              title="Search plants (Ctrl+K)"
            >
              <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="hidden xl:inline-block ml-1.5 text-xs text-stone-400 font-mono bg-stone-100 px-1.5 py-0.5 rounded border border-stone-200">
                ⌘K
              </span>
            </button>

            {/* Wishlist Trigger */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-2.5 rounded-full text-forest-800 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer relative group"
              aria-label="View Wishlist"
              title="View saved plants"
            >
              <Heart className={`w-5 h-5 transition-transform group-hover:scale-110 ${wishlist.length ? 'fill-rose-500 text-rose-500' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center ring-2 ring-white animate-in zoom-in-50">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2.5 py-2 px-3.5 rounded-full bg-forest-900 hover:bg-forest-800 text-white shadow-md shadow-forest-950/20 hover:shadow-lg hover:shadow-forest-900/30 transition-all duration-300 cursor-pointer group"
              aria-label="View Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-emerald-300 group-hover:rotate-6 transition-transform" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-emerald-500 text-forest-950 text-[11px] font-extrabold rounded-full w-4.5 h-4.5 flex items-center justify-center ring-2 ring-forest-900">
                    {cartItemsCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline-block text-xs font-semibold tracking-wide">
                Cart
              </span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-forest-900 hover:bg-forest-100 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-[102px] bg-white/95 backdrop-blur-2xl border-b border-emerald-100 shadow-2xl p-6 transition-all animate-in slide-in-from-top-4 duration-300 z-50 max-h-[85vh] overflow-y-auto">
            <div className="flex flex-col gap-4">
              <div className="relative mb-2">
                <Search className="w-4 h-4 text-emerald-600 absolute left-3 top-3.5" />
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsSearchOpen(true);
                  }}
                  className="w-full text-left pl-10 pr-4 py-2.5 bg-forest-50/80 rounded-xl text-sm text-stone-500 border border-emerald-100"
                >
                  Search plant catalog...
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.href)}
                    className="flex items-center gap-2 p-3 text-left text-sm font-semibold text-forest-900 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl transition-colors cursor-pointer"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    {link.name}
                  </button>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-stone-100 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsContactOpen(true);
                  }}
                  className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl text-center text-sm shadow-md transition-colors"
                >
                  Visit Greenhouse & Contact Us
                </button>
                <div className="text-center text-xs text-stone-400">
                  🌿 100% Organically Grown Botanicals
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
