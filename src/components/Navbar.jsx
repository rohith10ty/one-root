import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  Sprout, 
  Search, 
  Heart, 
  ShoppingBag, 
  Menu, 
  X 
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
      if (el) {
        if (window.lenis) window.lenis.scrollTo(el);
        else el.scrollIntoView({ behavior: 'smooth' });
      } else {
        setIsContactOpen(true);
      }
      return;
    }
    const el = document.querySelector(href);
    if (el) {
      if (window.lenis) window.lenis.scrollTo(el);
      else el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Main navigation revealed after hero effect */}
      <header
        style={{ transform: 'translateY(-100%)', opacity: 0, pointerEvents: 'none' }}
        className={`site-navbar fixed top-0 left-0 right-0 z-50 transition-colors duration-300 will-change-[transform,opacity] ${
          isScrolled
            ? 'bg-[#FDE5D4]/95 backdrop-blur-xl shadow-sm border-b border-[#D6CC99] py-2.5'
            : 'bg-[#FDE5D4]/90 backdrop-blur-md border-b border-[#D6CC99]/60 py-3'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              if (window.lenis) window.lenis.scrollTo(0);
              else window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-[#445D48] flex items-center justify-center text-[#FDE5D4] shadow-sm group-hover:scale-105 transition-all">
              <Sprout className="w-4.5 h-4.5 text-[#D6CC99]" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-sans font-bold text-[#001524] tracking-tight flex items-center gap-1">
                One<span className="text-[#445D48] font-sans font-normal">Root</span>
              </span>
              <span className="hidden sm:block text-[9.5px] uppercase font-bold tracking-widest text-[#445D48] -mt-0.5">
                Botanical Sanctuary
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
                className="text-xs font-medium text-[#001524] hover:text-[#445D48] transition-colors py-1"
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
              className="p-2 rounded-full text-[#001524] hover:text-[#445D48] hover:bg-[#D6CC99]/30 transition-all cursor-pointer relative group"
              aria-label="Search plants"
              title="Search plants (Ctrl+K)"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Wishlist Trigger */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-2 rounded-full text-[#001524] hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer relative group"
              aria-label="View Wishlist"
              title="View saved plants"
            >
              <Heart className={`w-4 h-4 transition-transform ${wishlist.length ? 'fill-rose-500 text-rose-500' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center ring-2 ring-[#FDE5D4]">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-[#001524] hover:bg-[#445D48] text-[#FDE5D4] shadow-sm transition-all cursor-pointer group"
              aria-label="View Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-[#D6CC99]" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#D6CC99] text-[#001524] text-[9px] font-extrabold rounded-full w-3.5 h-3.5 flex items-center justify-center ring-1 ring-[#001524]">
                    {cartItemsCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-semibold tracking-wide text-[#FDE5D4]">
                Cart
              </span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-lg text-[#001524] hover:bg-[#D6CC99]/30 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-full bg-[#FDE5D4]/98 backdrop-blur-2xl border-b border-[#D6CC99] shadow-xl p-5 transition-all z-50 max-h-[85vh] overflow-y-auto">
            <div className="flex flex-col gap-3">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-[#445D48] absolute left-3 top-3" />
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsSearchOpen(true);
                  }}
                  className="w-full text-left pl-9 pr-3 py-2 bg-white/80 rounded-xl text-xs text-[#001524]/70 border border-[#D6CC99]"
                >
                  Search plant catalog...
                </button>
              </div>

              <div className="grid grid-cols-2 gap-1.5 pt-1">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.href)}
                    className="flex items-center gap-2 p-2.5 text-left text-xs font-semibold text-[#001524] hover:bg-[#D6CC99]/40 hover:text-[#445D48] rounded-xl transition-colors cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#445D48]"></span>
                    {link.name}
                  </button>
                ))}
              </div>

              <div className="pt-3 border-t border-[#D6CC99]/50 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsContactOpen(true);
                  }}
                  className="w-full py-2.5 px-3 bg-[#001524] hover:bg-[#445D48] text-[#FDE5D4] font-medium rounded-xl text-center text-xs shadow-sm transition-colors"
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
