import React from 'react';
import { useChurch } from '../context/ChurchContext';
import { MapPin, Church, Clock, Phone, Mail, Globe, Heart } from 'lucide-react';

export const LocationSection: React.FC = () => {
  const { profile, isLoading } = useChurch();

  if (isLoading) {
    return (
      <section id="lokasi" className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="min-h-[300px] flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-slate-500 text-lg font-medium">Memuat lokasi...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="lokasi" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold tracking-wider uppercase">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span>Lokasi & Alamat Jemaat</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Temukan Kami di Kampung Salili
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            GMAHK Salili terletak di jantung komunitas Siau Tengah, Sitaro. Kami mengundang Anda untuk beribadah dan bergabung dalam persekutuan kami.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left: Map / Location Info */}
          <div className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
            <div className="relative h-64 bg-slate-200 flex items-center justify-center">
              {/* Simulasi Google Maps (placeholder) */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <MapPin className="w-12 h-12 text-blue-700 mx-auto" />
                  <p className="text-sm font-bold text-slate-800">GMAHK Salili</p>
                  <p className="text-xs text-slate-600">Kampung Salili, Siau Tengah</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-white border-t border-slate-200">
              <a
                href="https://maps.google.com/maps?q=Salili+Siau+Tengah"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span>Buka di Google Maps</span>
              </a>
            </div>
          </div>

          {/* Right: Address & Contact Info */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900">Informasi Alamat</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900">Alamat Jemaat</p>
                    <p className="text-slate-600">
                      Kampung Salili, Kec. Siau Tengah,<br />
                      Kab. Sitaro, Sulawesi Utara
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Church className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900">Gedung Gereja</p>
                    <p className="text-slate-600">
                      GMAHK Jemaat Salili
                    </p>
                  </div>
                </div>

                {profile?.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-900">Telepon</p>
                      <p className="text-slate-600">{profile.phone}</p>
                    </div>
                  </div>
                )}

                {profile?.email && (
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-900">Email</p>
                      <p className="text-slate-600">{profile.email}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900">Waktu Ibadah</p>
                    <p className="text-slate-600">
                      Sabtu: 09:00 WITA (Sekolah Sabat)<br />
                      Sabtu: 10:30 WITA (Khotbah)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-3xl border border-blue-100 shadow-sm text-center space-y-2">
              <Heart className="w-6 h-6 text-pink-500 mx-auto" />
              <h4 className="text-sm font-bold text-slate-900">Anda Ditunggu!</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Setiap hari Sabat, kami menyambut Anda dengan sukacita. Mari beribadah bersama kami di GMAHK Salili.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};