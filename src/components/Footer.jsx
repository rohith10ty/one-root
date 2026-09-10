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
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com',
      svg: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
    },
    {
      name: 'Facebook',
      href: 'https://facebook.com',
      svg: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com',
      svg: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-forest-950 text-white relative overflow-hidden border-t border-emerald-950">
      
      {/* Top Value Banner */}
      <div className="border-b border-emerald-900/40 py-10 bg-forest-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
          <div className="flex items-center gap-4 justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">30-Day Guarantee</h4>
              <p className="text-xs text-stone-400 mt-0.5">Free replacement if your plant wilts</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <TreePine className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Carbon Negative</h4>
              <p className="text-xs text-stone-400 mt-0.5">1 Tree planted for each adoption</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">100% Organically Raised</h4>
              <p className="text-xs text-stone-400 mt-0.5">Zero toxic chemicals or synthetic sprays</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Lifetime Support</h4>
              <p className="text-xs text-stone-400 mt-0.5">Chat directly with master botanists</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          
          {/* Brand & Nursery Info */}
          <div className="lg:col-span-4">
            <a href="#hero" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-forest-950 font-bold shadow-md shadow-emerald-900/40">
                <Sprout className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-serif font-bold text-white tracking-tight">
                Verdant<span className="text-emerald-400 font-sans font-light">Oasis</span>
              </span>
            </a>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm mb-6">
              A certified organic horticultural collective dedicated to restoring green harmony into urban sanctuaries through ethically cultivated flora, clean air, and living design.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((soc, i) => (
                <a
                  key={i}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={soc.name}
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-emerald-600 text-stone-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                >
                  {soc.svg}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-stone-400">
              <li><a href="#hero" className="hover:text-emerald-300 transition-colors">Home</a></li>
              <li><a href="#plants-catalog" className="hover:text-emerald-300 transition-colors">Featured Plants</a></li>
              <li><a href="#categories" className="hover:text-emerald-300 transition-colors">Categories</a></li>
              <li><a href="#about" className="hover:text-emerald-300 transition-colors">About Nursery</a></li>
              <li><a href="#why-us" className="hover:text-emerald-300 transition-colors">Why Choose Us</a></li>
              <li><a href="#care-tips" className="hover:text-emerald-300 transition-colors">Care Guides</a></li>
              <li><a href="#reviews" className="hover:text-emerald-300 transition-colors">Testimonials</a></li>
            </ul>
          </div>

          {/* Botanical Collections */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-4">
              Plant Categories
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-stone-400">
              <li>
                <button onClick={() => handleCategoryClick('indoor')} className="hover:text-emerald-300 transition-colors cursor-pointer">
                  Indoor Houseplants
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('outdoor')} className="hover:text-emerald-300 transition-colors cursor-pointer">
                  Outdoor Garden Botanicals
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('flowering')} className="hover:text-emerald-300 transition-colors cursor-pointer">
                  Year-Round Flowering
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('succulents')} className="hover:text-emerald-300 transition-colors cursor-pointer">
                  Drought-Hardy Succulents
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('medicinal')} className="hover:text-emerald-300 transition-colors cursor-pointer">
                  Medicinal & Herbal Teas
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('decorative')} className="hover:text-emerald-300 transition-colors cursor-pointer">
                  Decorative Statement Foliage
                </button>
              </li>
            </ul>
          </div>

          {/* Greenhouse Location & Hours */}
          <div className="lg:col-span-3 text-xs sm:text-sm text-stone-400 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-4">
              Conservatory Contact
            </h4>
            <p className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>742 Botanical Way, Portland, OR 97201</span>
            </p>
            <p className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>+1 (800) 492-7688</span>
            </p>
            <p className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>botanist@verdantoasis.com</span>
            </p>
            <p className="flex items-start gap-2.5 pt-1 text-stone-400">
              <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Tue – Sun: 9:00 AM – 6:30 PM (PST)</span>
            </p>

            <button
              onClick={() => setIsContactOpen(true)}
              className="mt-3 px-4 py-2 rounded-xl bg-white/10 hover:bg-emerald-600 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Open Direct Contact Desk
            </button>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Pledges */}
        <div className="mt-16 pt-8 border-t border-emerald-900/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Verdant Oasis Nursery Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#hero" className="hover:text-stone-400 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#hero" className="hover:text-stone-400 transition-colors">Terms of Growth</a>
            <span>•</span>
            <span className="text-emerald-400 flex items-center gap-1">
              🌱 Green Powered Servers
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
