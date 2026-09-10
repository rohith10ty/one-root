import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, AlertCircle, Info, Heart, ShoppingBag, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useShop();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let colorClasses = 'border-[#D6CC99]/40 bg-[#001524]/95 text-[#FDE5D4] shadow-botanical';

        if (toast.type === 'error') {
          Icon = AlertCircle;
          colorClasses = 'border-rose-500/40 bg-[#001524]/95 text-rose-200 shadow-rose-950/30';
        } else if (toast.type === 'info') {
          Icon = Info;
          colorClasses = 'border-[#D6CC99]/30 bg-[#001524]/95 text-[#FDE5D4] shadow-botanical';
        }

        if (toast.icon === 'Heart') Icon = Heart;
        if (toast.icon === 'ShoppingBag') Icon = ShoppingBag;

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3.5 p-4 rounded-2xl border backdrop-blur-xl shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-3 ${colorClasses}`}
          >
            <div className="p-2 rounded-xl bg-[#445D48]/30 text-[#D6CC99] shrink-0">
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0 pr-1">
              <h4 className="text-sm font-semibold text-[#FDE5D4] tracking-wide">{toast.title}</h4>
              <p className="text-xs text-[#D6CC99]/85 mt-0.5 leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#D6CC99]/60 hover:text-[#FDE5D4] transition-colors p-1 -mr-1 -mt-1 rounded-lg cursor-pointer"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
