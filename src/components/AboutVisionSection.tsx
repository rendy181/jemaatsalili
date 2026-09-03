import React from 'react';
import { useChurch } from '../context/ChurchContext';
import { Target, Compass, BookOpen, Heart, Sparkles } from 'lucide-react';

export const AboutVisionSection: React.FC = () => {
  const { visiMisi, isLoading } = useChurch();

  // ===== TAMPILKAN LOADING SAAT DATA BELUM SIAP =====
  if (isLoading) {
    return (
      <section id="visi-misi" className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="min-h-[300px] flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-slate-500 text-lg font-medium">Memuat data...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="visi-misi" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold tracking-wider uppercase">
            <Target className="w-3.5 h-3.5 text-blue-600" />
            <span>Visi & Misi Jemaat GMAHK Salili</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Visi, Misi & Motto Pelayanan
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Kami bergerak dalam panggilan ilahi untuk memberitakan Injil kekal, mempersiapkan umat menyambut kedatangan Tuhan Yesus Kristus yang segera.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Visi Card */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100/40 p-7 rounded-3xl border border-blue-200 shadow-sm flex flex-col items-center text-center space-y-4 hover:shadow-md transition-all hover:-translate-y-1">
            <div className="w-14 h-14 rounded-full bg-blue-600/20 border border-blue-600/30 flex items-center justify-center">
              <Compass className="w-7 h-7 text-blue-700" />
            </div>
            <div>
              <h3 className="text-base font-bold text-blue-900">Visi Jemaat</h3>
              <p className="text-sm text-slate-700 leading-relaxed mt-2 italic">
                "{visiMisi?.visi || 'Menjadi Gereja yang Bertumbuh dalam Kasih Karunia dan Kebenaran Firman Tuhan'}"
              </p>
            </div>
          </div>

          {/* Misi Cards */}
          <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center text-center space-y-4 hover:shadow-md transition-all hover:-translate-y-1">
            <div className="w-14 h-14 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center">
              <Target className="w-7 h-7 text-amber-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Misi Jemaat</h3>
              <ul className="text-xs text-slate-600 space-y-2 mt-2 text-left list-disc list-inside">
                {visiMisi?.misi && Array.isArray(visiMisi.misi) ? (
                  visiMisi.misi.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))
                ) : (
                  <>
                    <li>Memberitakan Injil Keselamatan kepada segala bangsa</li>
                    <li>Memuridkan dan membina jemaat dalam kebenaran Alkitab</li>
                    <li>Melayani sesama dengan kasih Kristus yang nyata</li>
                  </>
                )}
              </ul>
            </div>
          </div>

          {/* Motto Card */}
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/40 p-7 rounded-3xl border border-indigo-200 shadow-sm flex flex-col items-center text-center space-y-4 hover:shadow-md transition-all hover:-translate-y-1">
            <div className="w-14 h-14 rounded-full bg-indigo-600/20 border border-indigo-600/30 flex items-center justify-center">
              <Heart className="w-7 h-7 text-indigo-700" />
            </div>
            <div>
              <h3 className="text-base font-bold text-indigo-900">Motto Pelayanan</h3>
              <p className="text-sm text-slate-700 leading-relaxed mt-2 font-medium italic">
                "{visiMisi?.motto || 'Mewartakan Kasih Karunia dan Pengharapan Kedatangan Yesus yang Segera'}"
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};