import React from 'react';
import { useChurch } from '../context/ChurchContext';
import {
  PhoneCall,
  MessageCircle,
  Clock,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export const PastoralCareSection: React.FC = () => {
  const { pastoralContacts, isLoading } = useChurch(); // ← TAMBAHKAN isLoading!

  // ===== TAMPILKAN LOADING SAAT DATA BELUM SIAP =====
  if (isLoading) {
    return (
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="min-h-[300px] flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-slate-500 text-lg font-medium">Memuat kontak pastoral...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold tracking-wider uppercase">
            <MessageCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>Konseling & Pendampingan Rohani</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Kontak Pelayanan Pastoral WhatsApp
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Butuh teman berbincang, konseling keluarga, bimbingan baptisan, atau perlawatan doa di rumah? Hubungi para pelayan Tuhan GMAHK Salili langsung melalui WhatsApp.
          </p>
        </div>

        {/* Pastoral Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pastoralContacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-300 border border-blue-100 flex flex-col justify-between space-y-5 group hover:-translate-y-1 hover:border-blue-300"
            >
              <div className="space-y-4">
                {/* Avatar & Header Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={contact.photoUrl}
                    alt={contact.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-500 shadow-md shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                      {contact.name}
                    </h3>
                    <span className="text-xs text-blue-700 font-semibold block">
                      {contact.role}
                    </span>
                  </div>
                </div>

                {/* Focus of Service */}
                <div className="bg-blue-50/60 p-3.5 rounded-2xl border border-blue-100 text-xs text-slate-700 space-y-1">
                  <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider block">
                    Fokus Pelayanan
                  </span>
                  <p className="leading-relaxed">{contact.serviceFocus}</p>
                </div>

                {/* Available Hours */}
                <div className="flex items-start gap-2 text-xs text-slate-500">
                  <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>{contact.availableHours}</span>
                </div>
              </div>

              {/* Direct WhatsApp Action Button */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
                    contact.welcomeMessage
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Hubungi via WhatsApp</span>
                  <ExternalLink className="w-3 h-3 text-emerald-200" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};