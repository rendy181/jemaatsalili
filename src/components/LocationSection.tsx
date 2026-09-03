import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import {
  MapPin,
  Phone,
  Mail,
  Navigation,
  Send,
  CheckCircle,
  ExternalLink,
  Compass,
  Bus,
  Ship,
} from 'lucide-react';

export const LocationSection: React.FC = () => {
  const { profile, showToast } = useChurch();
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !message) {
      showToast('Harap isi nama dan pesan Anda.');
      return;
    }
    setSubmitted(true);
    showToast('Pesan Anda berhasil dikirim ke Sekretariat GMAHK Salili!');
    setTimeout(() => {
      setSubmitted(false);
      setSenderName('');
      setSenderEmail('');
      setSenderPhone('');
      setMessage('');
    }, 4000);
  };

  return (
    <section id="lokasi" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold tracking-wider uppercase">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span>Lokasi & Kontak Jemaat</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Kunjungi Rumah Tuhan GMAHK Salili
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Berada di lingkungan asri Kampung Salili, Kecamatan Siau Tengah, Kabupaten Kepulauan Siau Tagulandang Biaro (SITARO), Sulawesi Utara.
          </p>
        </div>

        {/* Map & Address Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Map Container */}
          <div className="lg:col-span-7 bg-slate-100 rounded-3xl overflow-hidden border border-blue-100 shadow-lg min-h-[380px] relative flex flex-col">
            <iframe
              title="Google Maps Lokasi GMAHK Salili Siau Tengah"
              src={profile.googleMapsEmbedUrl}
              className="w-full h-full min-h-[380px] border-0 flex-1"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="p-4 bg-white/95 backdrop-blur-md border-t border-blue-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-700">
                <Compass className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="font-semibold">Koordinat: {profile.coordinates.lat}, {profile.coordinates.lng}</span>
              </div>
              <a
                href={profile.googleMapsDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white text-xs font-bold shadow-sm transition-all"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Petunjuk Arah Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Address & Travel Details */}
          <div className="lg:col-span-5 bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between space-y-6 border border-blue-900/40">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-300">
                Alamat Resmi Gereja
              </span>
              <h3 className="text-xl font-bold text-white leading-snug">
                {profile.name}
              </h3>

              <div className="space-y-3 text-xs text-blue-100 bg-white/10 p-4 rounded-2xl border border-white/15">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Alamat Lengkap:</span>
                    <p>{profile.address}</p>
                    <p>{profile.village}, Kec. {profile.district}</p>
                    <p>{profile.regency}</p>
                    <p>{profile.province} — Kode Pos {profile.postalCode}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                  <Phone className="w-4 h-4 text-amber-300 shrink-0" />
                  <div>
                    <span className="text-slate-300 block text-[10px]">Telepon / Hotline:</span>
                    <span className="font-bold text-white">{profile.phone}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                  <Mail className="w-4 h-4 text-amber-300 shrink-0" />
                  <div>
                    <span className="text-slate-300 block text-[10px]">Email Sekretariat:</span>
                    <span className="font-bold text-white">{profile.email}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Travel / Accessibility Tips */}
            <div className="space-y-2 pt-2 border-t border-blue-800/60">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block flex items-center gap-1.5">
                <Ship className="w-4 h-4" />
                <span>Akses Transportasi ke Siau</span>
              </span>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Dari Manado: Kapal Cepat / Feri menuju Pelabuhan Ulu Siau / Pehe. Dilanjutkan dengan perjalanan darat (mobil angkutan / ojek) sekitar 25-35 menit menuju Kampung Salili, Siau Tengah.
              </p>
            </div>
          </div>

        </div>

        {/* Contact Message Form Card */}
        <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                Kirim Pesan / Pertanyaan ke Pengurus Gereja
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Punya pertanyaan mengenai jadwal, permohonan surat jemaat, atau bimbingan Alkitab? Silakan kirim pesan Anda di bawah ini.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-emerald-900">Pesan Terkirim</h4>
                <p className="text-xs text-emerald-700">Sekretariat GMAHK Salili akan merespons pesan Anda secepatnya.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap *</label>
                    <input
                      type="text"
                      required
                      placeholder="Nama Anda"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Nomor WhatsApp / HP</label>
                    <input
                      type="tel"
                      placeholder="081234..."
                      value={senderPhone}
                      onChange={(e) => setSenderPhone(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email</label>
                    <input
                      type="email"
                      placeholder="email@anda.com"
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Pesan / Keperluan *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Tuliskan pesan, pertanyaan atau permohonan Anda..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white text-xs font-bold shadow-md shadow-blue-600/30 transition-all active:scale-95"
                  >
                    <Send className="w-4 h-4" />
                    <span>Kirim Pesan ke Gereja</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
