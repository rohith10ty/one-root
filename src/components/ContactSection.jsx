import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Send, 
  CheckCircle2, 
  X, 
  MessageSquare
} from 'lucide-react';

export default function ContactSection() {
  const { isContactOpen, setIsContactOpen, showToast } = useShop();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Plant Care Advice',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Valid email is required';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please share at least 10 characters so we can help.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitted(true);
    showToast(
      'Message Received!',
      'Our master botanist will review your plant inquiry within 4 business hours.',
      'success'
    );

    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: 'Plant Care Advice',
        message: '',
      });
      if (isContactOpen) setIsContactOpen(false);
    }, 2500);
  };

  const formContent = (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
      
      {/* Contact Details & Greenhouse Visit */}
      <div className="lg:col-span-5 flex flex-col justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[10.5px] uppercase font-bold tracking-wider text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full mb-3">
            <MessageSquare className="w-3 h-3" /> Get in Touch
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-forest-950 tracking-tight">
            Visit Our Greenhouse or Talk with a Botanist
          </h2>

          <p className="mt-2.5 text-stone-500 text-xs sm:text-sm leading-relaxed">
            Have questions regarding repotting, rare variegation, or custom office terrarium builds? Our horticulturalists are on call daily.
          </p>

          <div className="mt-5 space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-forest-50/70 border border-emerald-100">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-[11px] font-bold uppercase text-forest-950">Greenhouse Location</h4>
                <p className="text-xs text-stone-600 mt-0.5">
                  742 Botanical Way, Conservatory District, Portland, OR 97201
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-forest-50/70 border border-emerald-100">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-[11px] font-bold uppercase text-forest-950">Visiting Hours</h4>
                <p className="text-xs text-stone-600 mt-0.5">
                  Tue – Sun: 9:00 AM – 6:30 PM (Mon: Closed for Propagation)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-forest-50/70 border border-emerald-100">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-[11px] font-bold uppercase text-forest-950">Phone & Hotline</h4>
                <p className="text-xs text-stone-600 mt-0.5">
                  +1 (800) 492-7688 / botanist@verdantoasis.com
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-stone-200 text-[11px] text-stone-400">
          🌱 Plant consultations are 100% free of charge for all customers.
        </div>
      </div>

      {/* Interactive Form */}
      <div className="lg:col-span-7">
        <div className="bg-[#fafaf7] rounded-2xl p-5 sm:p-7 border border-stone-200/90 shadow-xs">
          {submitted ? (
            <div className="py-10 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-forest-950">Message Dispatched!</h3>
              <p className="text-stone-500 text-xs mt-1 max-w-xs mx-auto">
                Thank you, {formData.name}. Dr. Vane will respond shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Clara Oswald"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-stone-200 focus:border-emerald-500 outline-none text-xs text-forest-950"
                  />
                  {errors.name && <p className="text-[10px] text-rose-500 mt-0.5">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="clara@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-stone-200 focus:border-emerald-500 outline-none text-xs text-forest-950"
                  />
                  {errors.email && <p className="text-[10px] text-rose-500 mt-0.5">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                  Subject / Topic
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-stone-200 focus:border-emerald-500 outline-none text-xs text-forest-950 cursor-pointer"
                >
                  <option value="Plant Care Advice">Plant Care & Watering Advice</option>
                  <option value="Order Status">Order Tracking & Delivery Status</option>
                  <option value="Rare Plant Request">Rare / Variegated Botanical Sourcing</option>
                  <option value="Corporate Gifting">Office / Bulk Interior Plants</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                  Your Message *
                </label>
                <textarea
                  rows="3"
                  placeholder="Describe your plant inquiry, lighting, or question..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-stone-200 focus:border-emerald-500 outline-none text-xs text-forest-950 resize-none"
                ></textarea>
                {errors.message && <p className="text-[10px] text-rose-500 mt-0.5">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-semibold text-xs transition-all cursor-pointer shadow-xs"
              >
                <Send className="w-3.5 h-3.5 text-emerald-300" />
                <span>Send Botanical Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>

    </div>
  );

  return (
    <>
      <section id="contact" className="py-12 sm:py-16 bg-white border-t border-stone-200/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {formContent}
        </div>
      </section>

      {isContactOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-950/70 backdrop-blur-md animate-in fade-in"
          onClick={() => setIsContactOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-3xl w-full p-5 sm:p-8 shadow-2xl border border-stone-200 relative animate-in zoom-in-95 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsContactOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-forest-900 transition-colors cursor-pointer z-10"
              aria-label="Close contact modal"
            >
              <X className="w-4 h-4" />
            </button>
            {formContent}
          </div>
        </div>
      )}
    </>
  );
}
