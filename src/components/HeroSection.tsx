import React, { useState, useEffect } from 'react';
import { useChurch } from '../context/ChurchContext';
import { GMAHKLogo } from './GMAHKLogo';
import {
  Calendar,
  Clock,
  HeartHandshake,
  BookOpen,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  PhoneCall,
  Flame,
  ArrowRight,
  Maximize2,
  Building,
} from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
  onOpenPrayerModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  onOpenPrayerModal,
}) => {
  const { profile, logoConfig, heroImages, schedules, pastoralContacts } = useChurch();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto rotate carousel every 6 seconds
  useEffect(() => {
    if (heroImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const activeImage = heroImages[currentSlide] || heroImages[0];
  const primaryPastor = pastoralContacts[0];

  return (
    <section id="beranda" className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-gradient-to-b from-slate-950 via-blue-950 to-slate-900">
      {/* Decorative Modern Blue Ambient Aura Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-[30rem] h-[30rem] bg-indigo-600/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Hero Column: Church Identity & Info */}
          <div className="lg:col-span-6 text-white space-y-6">
            
            {/* Badges & Official Banner */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 backdrop-blur-md text-xs font-bold text-blue-200 shadow-sm">
              <Flame className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{activeImage?.badgeText || 'Gereja Masehi Advent Hari Ketujuh'}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1" />
            </div>

            {/* Main Display Heading */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-tight text-white font-display">
                {profile.name}
              </h1>
              <p className="text-base sm:text-xl font-medium text-blue-200 max-w-xl leading-relaxed">
                {profile.tagline}
              </p>
            </div>

            {/* Description Paragraph */}
            <p className="text-sm sm:text-base text-slate-300 max-w-xl font-normal leading-relaxed">
              {profile.shortDescription}
            </p>

            {/* Location Pill */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-blue-200 bg-white/10 backdrop-blur-md py-2.5 px-4 rounded-2xl border border-white/15 w-fit shadow-sm">
              <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
              <span className="font-medium">
                {profile.village}, Kec. {profile.district}, Kab. {profile.regency}, {profile.province}
              </span>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="hero-jadwal-btn"
                onClick={() => onNavigate('jadwal')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-blue-600/30 transition-all duration-200 active:scale-95"
              >
                <Calendar className="w-4 h-4" />
                <span>Jadwal Ibadah Sabat</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-doa-btn"
                onClick={onOpenPrayerModal}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold border border-white/20 backdrop-blur-md transition-all duration-200 active:scale-95"
              >
                <HeartHandshake className="w-4 h-4 text-pink-300" />
                <span>Permohonan Doa</span>
              </button>

              {primaryPastor && (
                <a
                  id="hero-pastor-wa-btn"
                  href={`https://wa.me/${primaryPastor.whatsappNumber}?text=${encodeURIComponent(
                    primaryPastor.welcomeMessage
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold border border-emerald-400/30 backdrop-blur-md transition-all duration-200 active:scale-95 shadow-sm"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-200" />
                  <span>WA Pastoral</span>
                </a>
              )}
            </div>

            {/* Bible Verse Pill */}
            <div className="bg-gradient-to-r from-blue-950/60 to-indigo-950/60 backdrop-blur-md p-3.5 rounded-2xl border border-blue-400/20 text-xs text-blue-100 flex items-start gap-2.5 max-w-xl">
              <BookOpen className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p className="italic text-slate-200 text-[11px] sm:text-xs">
                "Kuduskanlah hari-hari Sabat-Ku, sehingga itu menjadi peringatan di antara Aku dan kamu..." — <span className="text-amber-300 font-bold not-italic">Yehezkiel 20:20</span>
              </p>
            </div>

          </div>

          {/* Right Hero Column: FOREGROUND Church Profile Photo & Gallery Showcase */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Foreground Church Photo Card */}
            <div className="relative rounded-3xl overflow-hidden bg-slate-900 border-2 border-blue-400/30 shadow-2xl shadow-blue-950/60 group">
              
              {/* Photo Display Window */}
              <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden bg-slate-950">
                {heroImages.map((img, idx) => (
                  <div
                    key={img.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                    }`}
                  >
                    <img
                      src={img.imageUrl}
                      alt={img.title}
                      className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}

                {/* Subtle Gradient Shadow for bottom caption */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent z-20 pointer-events-none" />

                {/* Top Floating Badges on Foreground Photo */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-30 pointer-events-none">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold shadow-md">
                    <Building className="w-3.5 h-3.5 text-blue-400" />
                    <span>Gedung GMAHK Salili</span>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-extrabold tracking-wider uppercase border border-blue-400/40 shadow-sm">
                    {currentSlide + 1} / {heroImages.length}
                  </span>
                </div>

                {/* Bottom Caption Overlay */}
                <div className="absolute bottom-4 left-4 right-4 z-30 space-y-1">
                  <h2 className="text-base sm:text-lg font-bold text-white leading-tight drop-shadow-md">
                    {activeImage?.title || 'Gedung Gereja GMAHK Jemaat Salili'}
                  </h2>
                  <p className="text-xs text-blue-200 line-clamp-1 drop-shadow-sm font-medium">
                    {activeImage?.subtitle || 'Kampung Salili, Siau Tengah — Sulawesi Utara'}
                  </p>
                </div>

                {/* Left / Right Carousel Controls */}
                {heroImages.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-slate-950/70 hover:bg-blue-600 text-white border border-white/20 transition-all backdrop-blur-md shadow-lg"
                      aria-label="Previous Photo"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentSlide((prev) => (prev + 1) % heroImages.length);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-slate-950/70 hover:bg-blue-600 text-white border border-white/20 transition-all backdrop-blur-md shadow-lg"
                      aria-label="Next Photo"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails Strip Selector in Foreground */}
              {heroImages.length > 1 && (
                <div className="p-3 bg-slate-950/90 border-t border-blue-900/40 flex items-center justify-between gap-2 overflow-x-auto">
                  <div className="flex items-center gap-2">
                    {heroImages.map((img, idx) => (
                      <button
                        key={img.id}
                        onClick={() => setCurrentSlide(idx)}
                        className={`relative rounded-xl overflow-hidden h-12 w-16 shrink-0 transition-all ${
                          idx === currentSlide
                            ? 'ring-2 ring-blue-400 scale-105 opacity-100 shadow-md'
                            : 'opacity-50 hover:opacity-80'
                        }`}
                      >
                        <img
                          src={img.imageUrl}
                          alt={img.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </button>
                    ))}
                  </div>

                  <span className="text-[10px] text-blue-300 font-semibold shrink-0 pr-1">
                    Klik untuk ganti foto
                  </span>
                </div>
              )}
            </div>

            {/* Quick Sabbath Schedule Box below Photo */}
            <div className="bg-white/10 backdrop-blur-xl p-4 sm:p-5 rounded-2xl border border-white/15 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-blue-300" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-300 block">
                    Ibadah Hari Sabat Ini
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-white">
                    09:00 WITA (Sekolah Sabat) • 10:30 WITA (Khotbah)
                  </p>
                </div>
              </div>

              <button
                onClick={() => onNavigate('jadwal')}
                className="shrink-0 px-4 py-2 rounded-xl bg-blue-600/90 hover:bg-blue-500 text-white text-xs font-bold transition-colors flex items-center gap-1 shadow-sm"
              >
                <span>Lihat Jadwal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
