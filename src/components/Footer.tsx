import React from 'react';
import { useChurch } from '../context/ChurchContext';
import { 
  Facebook, 
  Instagram, 
  Youtube, 
  Music, 
  MessageCircle, 
  Heart, 
  MapPin, 
  Mail, 
  Phone 
} from 'lucide-react';

export const Footer: React.FC<{ onOpenAdminModal: () => void }> = ({ onOpenAdminModal }) => {
  const { profile, socialLinks, isLoading } = useChurch();

  if (isLoading) {
    return (
      <footer className="bg-slate-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm">Loading...</p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-slate-900 text-white border-t border-blue-900/30">
      
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Column */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white">{profile?.name || 'GMAHK Salili'}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              {profile?.shortDescription || 'Gereja Masehi Advent Hari Ketujuh Jemaat Salili, Siau Tengah, Sitaro, Sulawesi Utara.'}
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span>{profile?.village}, {profile?.district}, {profile?.regency}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Tautan Cepat</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#beranda" className="text-slate-400 hover:text-blue-400 transition-colors">Beranda</a></li>
              <li><a href="#jadwal" className="text-slate-400 hover:text-blue-400 transition-colors">Jadwal Ibadah</a></li>
              <li><a href="#artikel" className="text-slate-400 hover:text-blue-400 transition-colors">Artikel & Warta</a></li>
              <li><a href="#doa" className="text-slate-400 hover:text-blue-400 transition-colors">Permohonan Doa</a></li>
              <li><a href="#persembahan" className="text-slate-400 hover:text-blue-400 transition-colors">Persembahan</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Ikuti Kami</h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks?.facebook && (
                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" 
                   className="p-2.5 rounded-xl bg-slate-800 hover:bg-blue-600 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {socialLinks?.instagram && (
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" 
                   className="p-2.5 rounded-xl bg-slate-800 hover:bg-pink-600 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {socialLinks?.youtube && (
                <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" 
                   className="p-2.5 rounded-xl bg-slate-800 hover:bg-red-600 transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              )}
              {socialLinks?.tiktok && (
                <a href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer" 
                   className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-600 transition-colors">
                  <Music className="w-5 h-5" />
                </a>
              )}
              {socialLinks?.whatsappGroup && (
                <a href={socialLinks.whatsappGroup} target="_blank" rel="noopener noreferrer" 
                   className="p-2.5 rounded-xl bg-slate-800 hover:bg-emerald-600 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Contact & Admin */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Kontak</h4>
            <div className="space-y-2 text-sm text-slate-400">
              {profile?.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span>{profile.email}</span>
                </div>
              )}
              {profile?.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span>{profile.phone}</span>
                </div>
              )}
            </div>
            <button
              onClick={onOpenAdminModal}
              className="text-xs text-slate-500 hover:text-blue-400 transition-colors mt-2 block"
            >
              🔒 Login Admin
            </button>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} {profile?.name || 'GMAHK Salili'}. 
            <span className="hidden sm:inline"> All rights reserved.</span>
          </p>
          <p className="text-xs text-slate-500 flex items-center gap-1">
            <Heart className="w-3 h-3 text-pink-500 fill-pink-500" />
            <span>Mewartakan Kasih Karunia</span>
          </p>
        </div>
      </div>

    </footer>
  );
};