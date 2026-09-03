import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import {
  CreditCard,
  Copy,
  Check,
  Heart,
  ShieldCheck,
  Coins,
  Sparkles,
  Building,
} from 'lucide-react';

export const BankDonationSection: React.FC = () => {
  const { bankAccounts, showToast, isLoading } = useChurch(); // ← TAMBAHKAN isLoading!
  const [isCopied, setIsCopied] = useState(false);

  // ===== TAMPILKAN LOADING SAAT DATA BELUM SIAP =====
  if (isLoading) {
    return (
      <section id="persembahan" className="py-20 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="min-h-[300px] flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-slate-500 text-lg font-medium">Memuat rekening donasi...</p>
          </div>
        </div>
      </section>
    );
  }

  // User requirement: display only 1 bank account, centered
  const primaryAccount = bankAccounts[0] || {
    id: '1',
    bankName: 'Bank BRI (Bank Rakyat Indonesia)',
    accountNumber: '5123-0102-3456-538',
    accountHolder: 'GMAHK JEMAAT SALILI / BENDAHARA',
    purpose: 'Perpuluhan, Persembahan & Pembangunan Gedung',
    instructions: 'Mohon cantumkan berita transfer: Perpuluhan / Persembahan / Pembangunan',
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(primaryAccount.accountNumber.replace(/[^0-9]/g, ''));
    setIsCopied(true);
    showToast(`Nomor rekening ${primaryAccount.bankName} berhasil disalin!`);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  return (
    <section id="persembahan" className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold tracking-wider uppercase">
            <Coins className="w-3.5 h-3.5 text-blue-600" />
            <span>Penatalayanan & Persembahan</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Rekening Perpuluhan & Persembahan Gereja
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            "Bawalah seluruh persembahan persepuluhan itu ke dalam rumah perbendaharaan, supaya ada persediaan makanan di rumah-Ku..." — <span className="font-semibold text-blue-900">Maleakhi 3:10</span>
          </p>
        </div>

        {/* Single Centered Bank Account Card */}
        <div className="max-w-xl mx-auto mb-14">
          <div className="bg-white rounded-3xl p-7 sm:p-9 shadow-xl shadow-blue-500/10 border-2 border-blue-100 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:border-blue-300">
            {/* Top Blue Gradient Strip */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600" />

            <div className="space-y-6">
              {/* Purpose & Verified Badge */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 uppercase tracking-wider">
                  {primaryAccount.purpose}
                </span>
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Rekening Resmi</span>
                </div>
              </div>

              {/* Bank Name */}
              <div>
                <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider block">
                  Nama Bank Penampung
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                  {primaryAccount.bankName}
                </h3>
              </div>

              {/* Account Number Box (Prominent & High Contrast) */}
              <div className="bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 p-5 sm:p-6 rounded-2xl border border-blue-900/50 shadow-inner text-white space-y-2">
                <div className="flex items-center justify-between text-xs text-blue-300 font-semibold">
                  <span className="tracking-wider uppercase">Nomor Rekening Tujuan</span>
                  <CreditCard className="w-4 h-4 text-blue-400" />
                </div>
                
                <div className="flex items-center justify-between gap-3 pt-1">
                  <span className="text-xl sm:text-2xl font-mono font-extrabold text-amber-300 tracking-wider">
                    {primaryAccount.accountNumber}
                  </span>
                  
                  <button
                    onClick={handleCopy}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 shrink-0 active:scale-95 ${
                      isCopied
                        ? 'bg-emerald-500 text-white shadow-md'
                        : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30'
                    }`}
                    title="Salin Nomor Rekening"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Salin No. Rekening</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Account Holder Name */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Atas Nama Rekening</span>
                  <span className="font-extrabold text-slate-900 text-sm sm:text-base">{primaryAccount.accountHolder}</span>
                </div>
                <Building className="w-6 h-6 text-blue-600 shrink-0" />
              </div>

              {/* Instructions */}
              <div className="bg-blue-50/60 p-4 rounded-2xl border border-blue-100 text-xs text-slate-700 leading-relaxed">
                <span className="font-bold text-blue-900 block mb-1">Petunjuk Pengiriman:</span>
                <p className="italic">{primaryAccount.instructions}</p>
              </div>
            </div>

            {/* Copy Action Full Button */}
            <div className="pt-6 mt-6 border-t border-slate-100">
              <button
                onClick={handleCopy}
                className={`w-full py-3.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  isCopied
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg shadow-blue-600/25'
                }`}
              >
                {isCopied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-700" />
                    <span>Nomor Rekening Berhasil Disalin ke Papan Klip</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Salin Nomor Rekening Sekarang</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Stewardship Note Box */}
        <div className="bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden border border-blue-900/50">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-300 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Akuntabilitas & Transparansi Jemaat</span>
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Prinsip Penatalayanan Umat Advent
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Seluruh dana perpuluhan diteruskan kepada Organisasi Konferens / Daerah Misi untuk pemeliharaan hamba-hamba Tuhan dan penginjilan dunia. Persembahan jemaat lokal digunakan untuk operasional, pemeliharaan gedung gereja, dan pelayanan diakonia di Kampung Salili.
              </p>
            </div>

            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 text-center space-y-2">
              <span className="text-xs text-blue-200">Konfirmasi Transfer / Warta Syukur:</span>
              <p className="text-sm font-bold text-white">Bendahara Jemaat GMAHK Salili</p>
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-400/30">
                Bukti transfer dapat diteruskan via WhatsApp
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};