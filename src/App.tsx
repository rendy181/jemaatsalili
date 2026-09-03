import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { ChurchProvider, useChurch } from './context/ChurchContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutVisionSection } from './components/AboutVisionSection';
import { ScheduleSection } from './components/ScheduleSection';
import { ArticlesSection } from './components/ArticlesSection';
import { PrayerRequestSection } from './components/PrayerRequestSection';
import { BankDonationSection } from './components/BankDonationSection';
import { PastoralCareSection } from './components/PastoralCareSection';
import { LeadersSection } from './components/LeadersSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboard } from './components/AdminDashboard';
import { CheckCircle2, Heart, Sparkles } from 'lucide-react';

// ===== HALAMAN UTAMA (BERANDA) =====
function HomePage() {
  const { toastMessage, isAdminLoggedIn } = useChurch();
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('beranda');
  const navigate = useNavigate();

  // Track active section for navbar highlight
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'beranda',
        'visi-misi',
        'jadwal',
        'artikel',
        'doa',
        'persembahan',
        'pengurus',
        'lokasi',
      ];
      const scrollPos = window.scrollY + 140;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleOpenDashboard = () => {
    if (isAdminLoggedIn) {
      navigate('/admin');
    } else {
      setIsAdminModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-purple-200 selection:text-purple-900 flex flex-col relative">
      
      <Navbar
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
        onOpenAdminDashboard={handleOpenDashboard}
        activeSection={activeSection}
      />

      <main className="flex-1">
        <HeroSection
          onNavigate={navigateToSection}
          onOpenPrayerModal={() => navigateToSection('doa')}
        />
        <AboutVisionSection />
        <ScheduleSection />
        <ArticlesSection />
        <PrayerRequestSection />
        <PastoralCareSection />
        <BankDonationSection />
        <LeadersSection />
        <LocationSection />
      </main>

      <Footer onOpenAdminModal={() => setIsAdminModalOpen(true)} />

      <AdminLoginModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onSuccess={() => {
          setIsAdminModalOpen(false);
          navigate('/admin');
        }}
      />

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900/95 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-purple-500/30 backdrop-blur-md flex items-center gap-3 animate-fadeIn text-xs sm:text-sm font-medium">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

// ===== HALAMAN ADMIN =====
function AdminPage() {
  const { isAdminLoggedIn, logoutAdmin } = useChurch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdminLoggedIn) {
      navigate('/');
    }
  }, [isAdminLoggedIn, navigate]);

  if (!isAdminLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <AdminDashboard 
        onClose={() => {
          logoutAdmin();
          navigate('/');
        }} 
      />
    </div>
  );
}

// ===== APP UTAMA =====
export default function App() {
  return (
    <BrowserRouter>
      <ChurchProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </ChurchProvider>
    </BrowserRouter>
  );
}