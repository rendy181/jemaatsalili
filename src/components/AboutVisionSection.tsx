import React from 'react';
import { useChurch } from '../context/ChurchContext';
import {
  BookOpen,
  Sun,
  HeartHandshake,
  Sparkles,
  Target,
  Compass,
  CheckCircle2,
  Church,
  ShieldCheck,
  Flame,
} from 'lucide-react';

export const AboutVisionSection: React.FC = () => {
  const { profile, visiMisi } = useChurch();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen':
        return <BookOpen className="w-6 h-6 text-blue-600" />;
      case 'Sun':
        return <Sun className="w-6 h-6 text-amber-500" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-blue-500" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-cyan-600" />;
      default:
        return <Flame className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <section id="visi-misi" className="py-20 bg-gradient-to-b from-blue-50/40 via-white to-slate-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold tracking-wider uppercase">
            <Church className="w-3.5 h-3.5 text-blue-600" />
            <span>Profil & Identitas Gereja</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Visi, Misi & Komitmen Rohani
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Membangun persekutuan yang berakar kuat pada Kitab Suci, memelihara hukum Tuhan, dan menjadi berkat nyata bagi masyarakat di Siau Tengah.
          </p>
        </div>

        {/* Church Overview & History Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-blue-500/5 border border-blue-100 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-blue-700 font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Gereja Masehi Advent Hari Ketujuh Jemaat Salili</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                Sejarah Singkat & Pelayanan di Kepulauan Sitaro
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {profile.fullHistory}
              </p>
              
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-700">
                <div className="flex items-center gap-2 bg-blue-50 px-3.5 py-2 rounded-xl border border-blue-100">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  <span>Konferens / Daerah: {profile.conference}</span>
                </div>
                <div className="flex items-center gap-2 bg-indigo-50 px-3.5 py-2 rounded-xl border border-indigo-100">
                  <span className="w-2 h-2 rounded-full bg-indigo-600" />
                  <span>Wilayah: Kepulauan Siau, Sulawesi Utara</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-gradient-to-br from-blue-900 via-blue-950 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 space-y-4 shadow-lg shadow-blue-900/20">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Flame className="w-4 h-4" />
                <span>Motto Jemaat</span>
              </div>
              <blockquote className="text-base sm:text-lg font-bold text-blue-100 italic leading-snug">
                "{visiMisi.motto}"
              </blockquote>
              
              <div className="border-t border-blue-700/60 pt-4 space-y-2">
                <span className="text-[11px] uppercase tracking-wider text-blue-300 font-semibold block">
                  Dasar Alkitabiah Sabat
                </span>
                <p className="text-xs text-slate-200 italic leading-relaxed">
                  "{visiMisi.bibleVerse.text}"
                </p>
                <p className="text-xs font-bold text-amber-300 text-right">
                  — {visiMisi.bibleVerse.reference}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Vision & Mission Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Vision Card */}
          <div className="bg-gradient-to-br from-blue-900 via-blue-950 to-indigo-950 text-white rounded-3xl p-8 shadow-xl border border-blue-800/40 relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-300" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-300">
                Visi Jemaat Salili
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white leading-relaxed">
                "{visiMisi.visi}"
              </h3>
            </div>
            <div className="pt-6 mt-6 border-t border-blue-800/50 flex items-center justify-between text-xs text-blue-200">
              <span>Fokus Pelayanan</span>
              <span className="font-semibold text-amber-300">Siau Tengah & Sitaro</span>
            </div>
          </div>

          {/* Mission Card */}
          <div className="bg-white rounded-3xl p-8 shadow-xl shadow-blue-500/5 border border-blue-100 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-blue-700">
                  Misi Pelayanan
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  Langkah & Panggilan Pelayanan Kami
                </h3>
              </div>

              <ul className="space-y-3 pt-2">
                {visiMisi.misi.map((m, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* 4 Core Pillars of Faith */}
        <div className="space-y-6">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Pilar Kepercayaan & Praktik
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              Nilai-Nilai Utama Umat Advent
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visiMisi.coreValues.map((val, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-blue-50 hover:border-blue-200 flex flex-col space-y-3"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                  {getIcon(val.icon)}
                </div>
                <h4 className="text-base font-bold text-slate-900">{val.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{val.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
