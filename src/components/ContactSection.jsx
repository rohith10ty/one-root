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
          <div className="inline-flex items-center gap-1.5 text-[10.5px] uppercase font-bold tracking-wider text-[#445D48] bg-[#445D48]/15 border border-[#445D48]/20 px-2.5 py-0.5 rounded-full mb-3">
            <MessageSquare className="w-3 h-3 text-[#445D48]" /> Get in Touch
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#001524] tracking-tight">
            Visit Our Greenhouse or Talk with a Botanist
          </h2>

          <p className="mt-2.5 text-[#001524]/75 text-xs sm:text-sm leading-relaxed">
            Have questions regarding repotting, rare variegation, or custom office terrarium builds? Our horticulturalists are on call daily.
          </p>

          <div className="mt-5 space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-[#FDE5D4]/30 border border-[#D6CC99]/40">
              <div className="w-8 h-8 rounded-lg bg-[#445D48] text-[#D6CC99] flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-[11px] font-bold uppercase text-[#001524]">Greenhouse Location</h4>
                <p className="text-xs text-[#001524]/75 mt-0.5">
                  742 Botanical Way, Conservatory District, Portland, OR 97201
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-[#FDE5D4]/30 border border-[#D6CC99]/40">
              <div className="w-8 h-8 rounded-lg bg-[#445D48] text-[#D6CC99] flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-[11px] font-bold uppercase text-[#001524]">Visiting Hours</h4>
                <p className="text-xs text-[#001524]/75 mt-0.5">
                  Tue – Sun: 9:00 AM – 6:30 PM (Mon: Closed for Propagation)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-[#FDE5D4]/30 border border-[#D6CC99]/40">
              <div className="w-8 h-8 rounded-lg bg-[#445D48] text-[#D6CC99] flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-[11px] font-bold uppercase text-[#001524]">Phone & Hotline</h4>
                <p className="text-xs text-[#001524]/75 mt-0.5">
                  +1 (800) 492-7688 / botanist@onerootnursery.com
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#D6CC99]/30 text-[11px] text-[#001524]/60">
          🌱 Plant consultations are 100% free of charge for all customers.
        </div>
      </div>

      {/* Interactive Form */}
      <div className="lg:col-span-7">
        <div className="bg-[#FDE5D4]/20 rounded-2xl p-5 sm:p-7 border border-[#D6CC99]/50 shadow-xs">
          {submitted ? (
            <div className="py-10 text-center">
              <div className="w-12 h-12 rounded-full bg-[#445D48]/15 text-[#445D48] flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#001524]">Message Dispatched!</h3>
              <p className="text-[#001524]/75 text-xs mt-1 max-w-xs mx-auto">
                Thank you, {formData.name}. Dr. Vane will respond shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#001524]/80 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Clara Oswald"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#D6CC99]/60 focus:border-[#445D48] outline-none text-xs text-[#001524]"
                  />
                  {errors.name && <p className="text-[10px] text-rose-500 mt-0.5">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#001524]/80 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="clara@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#D6CC99]/60 focus:border-[#445D48] outline-none text-xs text-[#001524]"
                  />
                  {errors.email && <p className="text-[10px] text-rose-500 mt-0.5">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#001524]/80 mb-1">
                  Subject / Topic
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#D6CC99]/60 focus:border-[#445D48] outline-none text-xs text-[#001524] cursor-pointer"
                >
                  <option value="Plant Care Advice">Plant Care & Watering Advice</option>
                  <option value="Order Status">Order Tracking & Delivery Status</option>
                  <option value="Rare Plant Request">Rare / Variegated Botanical Sourcing</option>
                  <option value="Corporate Gifting">Office / Bulk Interior Plants</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#001524]/80 mb-1">
                  Your Message *
                </label>
                <textarea
                  rows="3"
                  placeholder="Describe your plant inquiry, lighting, or question..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#D6CC99]/60 focus:border-[#445D48] outline-none text-xs text-[#001524] resize-none"
                ></textarea>
                {errors.message && <p className="text-[10px] text-rose-500 mt-0.5">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#001524] hover:bg-[#445D48] text-[#FDE5D4] font-semibold text-xs transition-all cursor-pointer shadow-xs"
              >
                <Send className="w-3.5 h-3.5 text-[#D6CC99]" />
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
      <section id="contact" className="py-12 sm:py-16 bg-white border-t border-[#D6CC99]/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {formContent}
        </div>
      </section>

      {isContactOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#001524]/80 backdrop-blur-md animate-in fade-in"
          onClick={() => setIsContactOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-3xl w-full p-5 sm:p-8 shadow-2xl border border-[#D6CC99]/40 relative animate-in zoom-in-95 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsContactOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#FDE5D4]/60 hover:bg-[#D6CC99]/40 flex items-center justify-center text-[#001524] transition-colors cursor-pointer z-10"
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
