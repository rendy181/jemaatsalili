import React from 'react';
import { useChurch } from '../context/ChurchContext';
import { GMAHKLogo } from './GMAHKLogo';
import {
  Facebook,
  Instagram,
  Youtube,
  Phone,
  Mail,
  MapPin,
  Heart,
  ExternalLink,
  ShieldCheck,
  Flame,
  ArrowUp,
} from 'lucide-react';

interface FooterProps {
  onOpenAdminModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdminModal }) => {
  const { profile, logoConfig, socialLinks, pastoralContacts } = useChurch();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-blue-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Col 1: Brand & Adventist Emblem (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <GMAHKLogo config={logoConfig} size="md" variant="light" />
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Gereja Masehi Advent Hari Ketujuh Jemaat Salili, Kecamatan Siau Tengah, Kabupaten Kepulauan SITARO, Sulawesi Utara. Berdiri teguh memelihara hukum Allah dan iman kepada Yesus Kristus.
            </p>

            {/* Social Media Links with FB, IG, YouTube, TikTok */}
            <div className="pt-2 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-300 block">
                Media Sosial Resmi Gereja
              </span>
              <div className="flex items-center gap-3">
                {socialLinks.facebook && (
                  <a
                    id="footer-social-fb"
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-slate-900 border border-slate-700/80 hover:border-blue-500 hover:bg-blue-900/40 text-slate-300 hover:text-white flex items-center justify-center transition-all"
                    title="Facebook GMAHK Salili"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                )}
                {socialLinks.instagram && (
                  <a
                    id="footer-social-ig"
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-slate-900 border border-slate-700/80 hover:border-pink-500 hover:bg-pink-900/40 text-slate-300 hover:text-white flex items-center justify-center transition-all"
                    title="Instagram GMAHK Salili"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
                {socialLinks.youtube && (
                  <a
                    id="footer-social-yt"
                    href={socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-slate-900 border border-slate-700/80 hover:border-red-500 hover:bg-red-900/40 text-slate-300 hover:text-white flex items-center justify-center transition-all"
                    title="YouTube Channel GMAHK Salili"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                )}
                {socialLinks.tiktok && (
                  <a
                    id="footer-social-tiktok"
                    href={socialLinks.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-slate-900 border border-slate-700/80 hover:border-cyan-400 hover:bg-cyan-950/40 text-slate-300 hover:text-white flex items-center justify-center transition-all"
                    title="TikTok GMAHK Salili"
                  >
                    {/* Custom SVG TikTok Icon */}
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.27 6.27 0 0 0 1.96-4.57V8.62a8.28 8.28 0 0 0 4.81 1.52v-3.45z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-300 block">
              Navigasi Halaman
            </span>
            <ul className="space-y-2">
              <li>
                <a href="#visi-misi" className="hover:text-blue-300 transition-colors">
                  Profil & Visi Misi
                </a>
              </li>
              <li>
                <a href="#jadwal" className="hover:text-blue-300 transition-colors">
                  Jadwal Ibadah Sabat
                </a>
              </li>
              <li>
                <a href="#artikel" className="hover:text-blue-300 transition-colors">
                  Artikel & Renungan Rohani
                </a>
              </li>
              <li>
                <a href="#doa" className="hover:text-blue-300 transition-colors">
                  Layanan Permohonan Doa
                </a>
              </li>
              <li>
                <a href="#persembahan" className="hover:text-blue-300 transition-colors">
                  Perpuluhan & Persembahan
                </a>
              </li>
              <li>
                <a href="#pengurus" className="hover:text-blue-300 transition-colors">
                  Majelis & Pengurus Gereja
                </a>
              </li>
              <li>
                <a href="#lokasi" className="hover:text-blue-300 transition-colors">
                  Peta Lokasi Google Maps
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Pastoral Hotline (4 cols) */}
          <div className="lg:col-span-4 space-y-3 text-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-300 block">
              Sekretariat & Pelayanan Pastoral
            </span>
            <div className="space-y-2 text-slate-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{profile.address}, {profile.village}, {profile.district}, {profile.regency}, {profile.province}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{profile.phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{profile.email}</span>
              </p>
            </div>

            <div className="pt-3">
              <button
                onClick={onOpenAdminModal}
                className="text-[11px] text-slate-400 hover:text-blue-300 underline transition-colors"
              >
                Area Pengurus / Login Admin Website
              </button>
            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} {profile.name}. Hak Cipta Dilindungi.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[11px] text-slate-400">
              Maranatha — Tuhan Yesus Segera Datang
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-blue-900/60 hover:bg-blue-800 text-blue-200 transition-colors"
              title="Kembali ke Atas"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
