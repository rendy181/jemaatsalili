import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import { WorshipSchedule } from '../types/church';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Radio,
  Sparkles,
  Info,
  CheckCircle,
} from 'lucide-react';

export const ScheduleSection: React.FC = () => {
  const { schedules, isLoading } = useChurch();
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const categories = ['Semua', 'Sabat', 'Tengah Minggu', 'Pemuda', 'Doa'];

  const filteredSchedules =
    selectedCategory === 'Semua'
      ? schedules
      : schedules.filter((s) => s.category === selectedCategory);

  // ===== TAMPILKAN LOADING SAAT DATA BELUM SIAP =====
  if (isLoading) {
    return (
      <section id="jadwal" className="py-20 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="min-h-[300px] flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-slate-500 text-lg font-medium">Memuat jadwal ibadah...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="jadwal" className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold tracking-wider uppercase">
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
            <span>Jadwal Kebaktian & Persekutuan</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Waktu Ibadah GMAHK Salili
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Kami menyambut dengan sukacita kehadiran anggota jemaat, sahabat, dan tamu yang ingin beribadah bersama kami memuliakan Tuhan.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-blue-700 to-indigo-700 text-white shadow-md shadow-blue-600/30'
                  : 'bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-800 border border-slate-200'
              }`}
            >
              {cat === 'Semua' ? 'Semua Jadwal' : `Kategori ${cat}`}
            </button>
          ))}
        </div>

        {/* Schedules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchedules.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-blue-100/80 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div className="space-y-4">
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                      item.category === 'Sabat'
                        ? 'bg-blue-100 text-blue-800'
                        : item.category === 'Pemuda'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-indigo-100 text-indigo-800'
                    }`}
                  >
                    {item.day}
                  </span>
                  {item.isLiveStreamed && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
                      <Radio className="w-3 h-3 animate-pulse" />
                      <span>Live Hybrid</span>
                    </span>
                  )}
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {item.title}
                  </h3>
                </div>

                {/* Time & Location */}
                <div className="space-y-2 bg-blue-50/50 p-3.5 rounded-xl border border-blue-100/50 text-xs">
                  <div className="flex items-center gap-2 font-bold text-blue-900">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span>{item.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    <span>{item.location}</span>
                  </div>
                  {item.leader && (
                    <div className="flex items-center gap-2 text-slate-600 pt-1 border-t border-blue-100">
                      <User className="w-4 h-4 text-blue-500" />
                      <span>Koordinator: {item.leader}</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Card Footer Tag */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Terbuka Untuk Umum</span>
                <span className="text-blue-600 font-semibold">GMAHK Salili</span>
              </div>
            </div>
          ))}
        </div>

        {/* Sabbath Welcome Note Card */}
        <div className="mt-12 bg-gradient-to-r from-blue-900 via-blue-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>Apakah Anda Tamu atau Pertama Kali Berkunjung?</span>
            </h3>
            <p className="text-xs sm:text-sm text-blue-200 max-w-xl">
              Kami menyambut Anda dengan tangan terbuka. Jemaat kami menyediakan buku nyanyian, penuntun Sekolah Sabat, dan jamuan kasih potluck bersama setiap hari Sabat.
            </p>
          </div>
          <div className="shrink-0 bg-white/10 px-5 py-3 rounded-2xl border border-white/20 text-center">
            <span className="text-xs text-blue-200 uppercase tracking-wider block font-semibold">Pakaian Ibadah</span>
            <span className="text-sm font-bold text-white">Sopan & Rapi</span>
          </div>
        </div>

      </div>
    </section>
  );
};