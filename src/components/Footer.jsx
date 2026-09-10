import React from 'react';
import { useShop } from '../context/ShopContext';
import { 
  Sprout, 
  Mail, 
  MapPin, 
  Phone, 
  Clock, 
  ShieldCheck, 
  TreePine, 
  Heart
} from 'lucide-react';

export default function Footer() {
  const { setSelectedCategory, setIsContactOpen } = useShop();

  const handleCategoryClick = (catSlug) => {
    setSelectedCategory(catSlug);
    const el = document.getElementById('plants-catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://instagram.com',
      svg: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com',
      svg: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
    },
    {
      name: 'Facebook',
      href: 'https://facebook.com',
      svg: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com',
      svg: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-[#001524] text-[#FDE5D4] relative overflow-hidden border-t border-[#D6CC99]/20">
      
      {/* Top Value Banner */}
      <div className="border-b border-[#D6CC99]/20 py-6 sm:py-8 bg-[#001524]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center sm:text-left">
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-9 h-9 rounded-xl bg-[#445D48]/35 text-[#D6CC99] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4.5 h-4.5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#FDE5D4]">30-Day Guarantee</h4>
              <p className="text-[10.5px] text-[#D6CC99]/70">Free replacement</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-9 h-9 rounded-xl bg-[#445D48]/35 text-[#D6CC99] flex items-center justify-center shrink-0">
              <TreePine className="w-4.5 h-4.5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#FDE5D4]">Carbon Negative</h4>
              <p className="text-[10.5px] text-[#D6CC99]/70">1 Tree planted per order</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-9 h-9 rounded-xl bg-[#445D48]/35 text-[#D6CC99] flex items-center justify-center shrink-0">
              <Sprout className="w-4.5 h-4.5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#FDE5D4]">100% Organically Raised</h4>
              <p className="text-[10.5px] text-[#D6CC99]/70">Zero toxic sprays</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-9 h-9 rounded-xl bg-[#445D48]/35 text-[#D6CC99] flex items-center justify-center shrink-0">
              <Heart className="w-4.5 h-4.5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#FDE5D4]">Lifetime Support</h4>
              <p className="text-[10.5px] text-[#D6CC99]/70">Chat with botanists</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Brand */}
          <div className="lg:col-span-4">
            <a href="#hero" className="flex items-center gap-2 mb-3 group">
              <div className="w-8 h-8 rounded-xl bg-[#445D48] flex items-center justify-center text-[#FDE5D4] font-bold shadow-xs">
                <Sprout className="w-4.5 h-4.5 text-[#D6CC99]" />
              </div>
              <span className="text-lg sm:text-xl font-serif font-bold text-[#FDE5D4] tracking-tight">
                One<span className="text-[#D6CC99] font-sans font-light">Root</span>
              </span>
            </a>

            <p className="text-xs text-[#FDE5D4]/75 leading-relaxed max-w-sm mb-4">
              A certified organic horticultural collective restoring green harmony into homes through living botanicals and zero-plastic care.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2">
              {socialLinks.map((soc, i) => (
                <a
                  key={i}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={soc.name}
                  className="w-7 h-7 rounded-lg bg-white/10 hover:bg-[#445D48] text-[#D6CC99] hover:text-[#FDE5D4] flex items-center justify-center transition-all cursor-pointer"
                >
                  {soc.svg}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#D6CC99] mb-3">
              Explore
            </h4>
            <ul className="space-y-1.5 text-xs text-[#FDE5D4]/70">
              <li><a href="#hero" className="hover:text-[#D6CC99] transition-colors">Home</a></li>
              <li><a href="#plants-catalog" className="hover:text-[#D6CC99] transition-colors">Featured Plants</a></li>
              <li><a href="#categories" className="hover:text-[#D6CC99] transition-colors">Categories</a></li>
              <li><a href="#about" className="hover:text-[#D6CC99] transition-colors">About Nursery</a></li>
              <li><a href="#why-us" className="hover:text-[#D6CC99] transition-colors">Why Choose Us</a></li>
              <li><a href="#care-tips" className="hover:text-[#D6CC99] transition-colors">Care Guides</a></li>
              <li><a href="#reviews" className="hover:text-[#D6CC99] transition-colors">Testimonials</a></li>
            </ul>
          </div>

          {/* Botanical Collections */}
          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#D6CC99] mb-3">
              Categories
            </h4>
            <ul className="space-y-1.5 text-xs text-[#FDE5D4]/70">
              <li>
                <button onClick={() => handleCategoryClick('indoor')} className="hover:text-[#D6CC99] transition-colors cursor-pointer">
                  Indoor Houseplants
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('outdoor')} className="hover:text-[#D6CC99] transition-colors cursor-pointer">
                  Outdoor Garden Botanicals
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('flowering')} className="hover:text-[#D6CC99] transition-colors cursor-pointer">
                  Year-Round Flowering
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('succulents')} className="hover:text-[#D6CC99] transition-colors cursor-pointer">
                  Drought-Hardy Succulents
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('medicinal')} className="hover:text-[#D6CC99] transition-colors cursor-pointer">
                  Medicinal & Herbal
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('decorative')} className="hover:text-[#D6CC99] transition-colors cursor-pointer">
                  Decorative Statement Foliage
                </button>
              </li>
            </ul>
          </div>

          {/* Conservatory Contact */}
          <div className="lg:col-span-3 text-xs text-[#FDE5D4]/75 space-y-2">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#D6CC99] mb-3">
              Contact
            </h4>
            <p className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#D6CC99] shrink-0 mt-0.5" />
              <span>742 Botanical Way, Portland, OR 97201</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#D6CC99] shrink-0" />
              <span>+1 (800) 492-7688</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#D6CC99] shrink-0" />
              <span>botanist@onerootnursery.com</span>
            </p>
            <p className="flex items-start gap-2 pt-0.5 text-[#FDE5D4]/60">
              <Clock className="w-3.5 h-3.5 text-[#D6CC99] shrink-0 mt-0.5" />
              <span>Tue – Sun: 9:00 AM – 6:30 PM</span>
            </p>

            <button
              onClick={() => setIsContactOpen(true)}
              className="mt-2 px-3 py-1.5 rounded-lg bg-[#445D48] hover:bg-[#D6CC99] hover:text-[#001524] text-[#FDE5D4] text-[11px] font-semibold transition-colors cursor-pointer"
            >
              Open Contact Desk
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-[#D6CC99]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#D6CC99]/70">
          <p>© {new Date().getFullYear()} One Root Nursery Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#hero" className="hover:text-[#D6CC99] transition-colors">Privacy</a>
            <span>•</span>
            <a href="#hero" className="hover:text-[#D6CC99] transition-colors">Terms</a>
            <span>•</span>
            <span className="text-[#D6CC99] flex items-center gap-1">
              🌱 Green Powered Servers
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
