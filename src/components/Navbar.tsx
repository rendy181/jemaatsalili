import React, { useState, useEffect } from 'react';
import { useChurch } from '../context/ChurchContext';
import { GMAHKLogo } from './GMAHKLogo';
import {
  Menu,
  X,
  Lock,
  PhoneCall,
  Calendar,
  HeartHandshake,
  BookOpen,
  MapPin,
  CreditCard,
  Users,
  ShieldCheck,
  LogOut,
  ExternalLink,
} from 'lucide-react';

interface NavbarProps {
  onOpenAdminModal: () => void;
  onOpenAdminDashboard: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAdminModal,
  onOpenAdminDashboard,
  activeSection,
}) => {
  const { logoConfig, pastoralContacts, isAdminLoggedIn, logoutAdmin } = useChurch();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'visi-misi', label: 'Profil & Visi' },
    { id: 'jadwal', label: 'Jadwal Ibadah' },
    { id: 'artikel', label: 'Warta & Renungan' },
    { id: 'doa', label: 'Permohonan Doa' },
    { id: 'persembahan', label: 'Rekening / Tithe' },
    { id: 'pengurus', label: 'Pengurus' },
    { id: 'lokasi', label: 'Lokasi & Kontak' },
  ];

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const primaryPastor = pastoralContacts[0];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md shadow-blue-500/5 py-2.5 border-b border-blue-100'
          : 'bg-gradient-to-b from-slate-950/85 via-blue-950/60 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <button
            id="nav-logo-btn"
            onClick={() => scrollToSection('beranda')}
            className="flex items-center text-left focus:outline-none group transition-transform active:scale-95"
          >
            <GMAHKLogo
              config={logoConfig}
              size="md"
              variant={isScrolled ? 'color' : 'light'}
            />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                    isActive
                      ? isScrolled
                        ? 'bg-blue-600 text-white shadow-sm shadow-blue-400/30'
                        : 'bg-white text-blue-900 shadow-md font-bold'
                      : isScrolled
                      ? 'text-slate-700 hover:text-blue-700 hover:bg-blue-50'
                      : 'text-blue-100 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Quick Pastoral WhatsApp Hotline */}
            {primaryPastor && (
              <a
                id="nav-pastoral-wa-btn"
                href={`https://wa.me/${primaryPastor.whatsappNumber}?text=${encodeURIComponent(
                  primaryPastor.welcomeMessage
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-sm transition-all duration-200 active:scale-95 ${
                  isScrolled
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20'
                    : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                }`}
                title="Hubungi Pelayanan Pastoral via WhatsApp"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>WA Pastoral</span>
              </a>
            )}

            {/* Admin Access Button */}
            {isAdminLoggedIn ? (
              <div className="flex items-center gap-1.5">
                <button
                  id="nav-admin-dashboard-btn"
                  onClick={onOpenAdminDashboard}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-blue-700 hover:bg-blue-800 text-white shadow-md shadow-blue-600/30 transition-transform active:scale-95"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-200" />
                  <span>Dashboard Admin</span>
                </button>
                <button
                  id="nav-admin-logout-btn"
                  onClick={logoutAdmin}
                  title="Keluar Admin"
                  className="p-1.5 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                id="nav-admin-login-trigger"
                onClick={onOpenAdminModal}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  isScrolled
                    ? 'border-blue-200 text-blue-700 hover:bg-blue-50'
                    : 'border-white/30 text-blue-100 hover:bg-white/10'
                }`}
                title="Masuk Pengurus Gereja"
              >
                <Lock className="w-3 h-3" />
                <span>Admin</span>
              </button>
            )}
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            {primaryPastor && (
              <a
                id="nav-mobile-wa-btn"
                href={`https://wa.me/${primaryPastor.whatsappNumber}?text=${encodeURIComponent(
                  primaryPastor.welcomeMessage
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-emerald-600 text-white text-xs"
              >
                <PhoneCall className="w-4 h-4" />
              </a>
            )}

            <button
              id="nav-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${
                isScrolled
                  ? 'text-slate-700 hover:bg-blue-50'
                  : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer-menu"
          className="lg:hidden bg-white border-b border-blue-100 shadow-xl px-4 pt-3 pb-6 space-y-1 animate-fadeIn"
        >
          <div className="px-2 py-1 mb-2 border-b border-blue-50 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-900">
              Menu Gereja Salili
            </span>
            <span className="text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-medium">
              Siau Tengah
            </span>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => scrollToSection(item.id)}
                className={`text-left px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 ${
                  activeSection === item.id
                    ? 'bg-blue-600 text-white font-bold'
                    : 'text-slate-700 hover:bg-blue-50 hover:text-blue-900'
                }`}
              >
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-blue-100 flex flex-col gap-2 mt-3">
            {primaryPastor && (
              <a
                id="mobile-nav-wa-link"
                href={`https://wa.me/${primaryPastor.whatsappNumber}?text=${encodeURIComponent(
                  primaryPastor.welcomeMessage
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-sm"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Konsultasi Pastoral via WhatsApp</span>
              </a>
            )}

            {isAdminLoggedIn ? (
              <div className="grid grid-cols-2 gap-2">
                <button
                  id="mobile-nav-admin-dashboard"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdminDashboard();
                  }}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-blue-700 text-white text-xs font-bold"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Dashboard Admin</span>
                </button>
                <button
                  id="mobile-nav-admin-logout"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logoutAdmin();
                  }}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-red-50 text-red-600 text-xs font-semibold"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Keluar Admin</span>
                </button>
              </div>
            ) : (
              <button
                id="mobile-nav-admin-login"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdminModal();
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-200"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Login Pengurus / Admin</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
