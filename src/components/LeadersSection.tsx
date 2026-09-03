import React from 'react';
import { useChurch } from '../context/ChurchContext';
import {
  Users,
  ShieldCheck,
  Award,
  Phone,
  Calendar,
} from 'lucide-react';

export const LeadersSection: React.FC = () => {
  const { leaders } = useChurch();

  return (
    <section id="pengurus" className="py-20 bg-gradient-to-b from-blue-50/40 via-white to-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold tracking-wider uppercase">
            <Users className="w-3.5 h-3.5 text-blue-600" />
            <span>Majelis & Pelayan Jemaat</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Pengurus Gereja GMAHK Salili
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Hamba-hamba Tuhan yang dipercayakan melayani perbaktian, administrasi, perbendaharaan, dan departemen jemaat.
          </p>
        </div>

        {/* Leaders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {leaders.map((leader) => (
            <div
              key={leader.id}
              className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-blue-100 flex flex-col justify-between space-y-4 group hover:-translate-y-1 hover:border-blue-300"
            >
              <div className="space-y-4">
                {/* Photo & Period */}
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <img
                      src={leader.photoUrl}
                      alt={leader.name}
                      className="w-20 h-20 rounded-2xl object-cover border-2 border-blue-200 shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-blue-700 text-white p-1 rounded-lg">
                      <Award className="w-3 h-3" />
                    </div>
                  </div>

                  <div className="space-y-1 flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                      {leader.department}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {leader.name}
                    </h3>
                    <span className="text-xs font-semibold text-blue-900 block">
                      {leader.role}
                    </span>
                  </div>
                </div>

                {/* Bio & Period */}
                {leader.bio && (
                  <p className="text-xs text-slate-600 leading-relaxed italic bg-slate-50 p-3 rounded-xl border border-slate-100">
                    "{leader.bio}"
                  </p>
                )}
              </div>

              {/* Footer info */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-blue-600" />
                  Periode {leader.period}
                </span>
                {leader.phone && (
                  <span className="text-blue-700 font-semibold">{leader.phone}</span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
