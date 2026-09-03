import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import {
  HeartHandshake,
  Send,
  Heart,
  CheckCircle,
  Lock,
  Globe,
  Sparkles,
  MessageSquare,
  ShieldCheck,
  User,
  Phone,
} from 'lucide-react';

export const PrayerRequestSection: React.FC = () => {
  const { prayerRequests, addPrayerRequest, incrementPrayerCount, showToast, isLoading } = useChurch(); // ← TAMBAHKAN isLoading!

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState<
    'Kesehatan / Kesembuhan' | 'Keluarga' | 'Pekerjaan & Usaha' | 'Studi / Pendidikan' | 'Pertumbuhan Rohani' | 'Ucapan Syukur' | 'Lainnya'
  >('Kesehatan / Kesembuhan');
  const [isPrivate, setIsPrivate] = useState(false);
  const [content, setContent] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // ===== TAMPILKAN LOADING SAAT DATA BELUM SIAP =====
  if (isLoading) {
    return (
      <section id="doa" className="py-20 bg-gradient-to-b from-blue-50/40 via-white to-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="min-h-[400px] flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-slate-500 text-lg font-medium">Memuat permohonan doa...</p>
          </div>
        </div>
      </section>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) {
      showToast('Silakan isi nama dan pokok doa Anda');
      return;
    }

    addPrayerRequest({
      name: name.trim(),
      phone: phone.trim() || '-',
      category,
      isPrivate,
      content: content.trim(),
    });

    setHasSubmitted(true);
    setName('');
    setPhone('');
    setContent('');
    setTimeout(() => setHasSubmitted(false), 6000);
  };

  const publicPrayers = prayerRequests.filter((p) => !p.isPrivate);

  return (
    <section id="doa" className="py-20 bg-gradient-to-b from-blue-50/40 via-white to-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold tracking-wider uppercase">
            <HeartHandshake className="w-3.5 h-3.5 text-blue-600" />
            <span>Pelayanan Permohonan Doa</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Bersatu dalam Doa & Penguatan Iman
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            "Sebab di mana dua atau tiga orang berkumpul dalam nama-Ku, di situ Aku ada di tengah-tengah mereka." — <span className="font-semibold text-blue-900">Matius 18:20</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Interactive Prayer Request Form */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-blue-500/5 border border-blue-100">
            <div className="space-y-2 mb-6">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Send className="w-5 h-5 text-blue-600" />
                <span>Kirim Pokok Doa Anda</span>
              </h3>
              <p className="text-xs text-slate-600">
                Tim Doa Syafaat & Penggembalaan GMAHK Salili akan mendoakan pergumulan Anda dalam persekutuan doa jemaat.
              </p>
            </div>

            {hasSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-emerald-900">Permohonan Doa Diterima</h4>
                <p className="text-xs text-emerald-700 leading-relaxed">
                  Terima kasih telah mempercayakan permohonan doa Anda. Kiranya damai sejahtera Allah beserta Anda dan keluarga senantiasa.
                </p>
                <button
                  onClick={() => setHasSubmitted(false)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors"
                >
                  Kirim Doa Lainnya
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nama Anda / Keluarga *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Keluarga Bpk. Derek / Anonim"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nomor WhatsApp / Kontak (Opsional)
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      placeholder="Contoh: 081234567890 (Untuk dikunjungi/dihubungi)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Kategori Pergumulan Doa
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                  >
                    <option value="Kesehatan / Kesembuhan">Kesehatan / Kesembuhan</option>
                    <option value="Keluarga">Keluarga & Rumah Tangga</option>
                    <option value="Pekerjaan & Usaha">Pekerjaan & Usaha / Panen</option>
                    <option value="Studi / Pendidikan">Studi / Pendidikan / Ujian</option>
                    <option value="Pertumbuhan Rohani">Pertumbuhan Rohani & Baptisan</option>
                    <option value="Ucapan Syukur">Ucapan Syukur / Kesaksian</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Isi Pokok Doa *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tuliskan pokok doa, pergumulan rohani, atau ucapan syukur Anda dengan singkat dan jelas..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                  />
                </div>

                {/* Privacy Toggle */}
                <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {isPrivate ? (
                      <Lock className="w-4 h-4 text-blue-700 shrink-0" />
                    ) : (
                      <Globe className="w-4 h-4 text-blue-700 shrink-0" />
                    )}
                    <div className="text-[11px]">
                      <span className="font-bold text-slate-900 block">
                        {isPrivate ? 'Doa Bersifat Rahasia (Privat)' : 'Tampilkan di Dinding Doa Jemaat'}
                      </span>
                      <span className="text-slate-500">
                        {isPrivate ? 'Hanya diketahui Gembala & Tim Pastoral' : 'Anggota jemaat lain dapat ikut mendoakan'}
                      </span>
                    </div>
                  </div>

                  <input
                    type="checkbox"
                    id="privacy-toggle"
                    checked={isPrivate}
                    onChange={(e) => setIsPrivate(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white text-xs font-bold shadow-md shadow-blue-600/30 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Permohonan Doa</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Public Prayer Wall (Dinding Doa Jemaat) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span>Dinding Doa Jemaat GMAHK Salili</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Mari saling mendukung dalam doa. Klik tombol "Amin / Doakan" sebagai tanda persekutuan.
                </p>
              </div>
              <span className="text-xs font-bold bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                {publicPrayers.length} Pokok Doa
              </span>
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
              {publicPrayers.length === 0 ? (
                <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
                  <p className="text-xs text-slate-500">Belum ada pokok doa publik saat ini.</p>
                </div>
              ) : (
                publicPrayers.map((prayer) => (
                  <div
                    key={prayer.id}
                    className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow border border-blue-100 flex flex-col justify-between space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{prayer.name}</span>
                        <span className="text-[10px] bg-blue-50 text-blue-700 font-semibold px-2.5 py-0.5 rounded-full border border-blue-100">
                          {prayer.category}
                        </span>
                      </div>

                      <span className="text-[10px] text-slate-400">
                        {new Date(prayer.createdAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed italic bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                      "{prayer.content}"
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                            prayer.status === 'answered'
                              ? 'bg-emerald-100 text-emerald-800'
                              : prayer.status === 'prayed'
                              ? 'bg-indigo-100 text-indigo-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {prayer.status === 'answered'
                            ? '✨ Jawaban Doa Disyukuri'
                            : prayer.status === 'prayed'
                            ? '✓ Sedang Didoakan Bersama'
                            : '⏳ Dalam Pergumulan'}
                        </span>
                      </div>

                      <button
                        onClick={() => incrementPrayerCount(prayer.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-700 text-xs font-bold border border-pink-200 transition-all active:scale-95"
                      >
                        <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
                        <span>Amin ({prayer.prayerCount})</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};