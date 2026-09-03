import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

// ============================================
// TIPE DATA
// ============================================

interface ChurchProfile {
  name: string;
  tagline: string;
  shortDescription: string;
  village: string;
  district: string;
  regency: string;
  province: string;
}

interface HeroImage {
  id: number;
  imageUrl: string;
  title: string;
  subtitle: string;
  badgeText: string;
  isPrimary?: boolean;
}

interface WorshipSchedule {
  id: number;
  hari: string;
  waktu: string;
  kegiatan: string;
}

interface ChurchArticle {
  id: number;
  judul: string;
  konten: string;
  gambar_url?: string;
  slug: string;
}

interface PrayerRequest {
  id: number;
  nama: string;
  permohonan: string;
  status: 'pending' | 'approved' | 'completed';
  prayerCount: number;
  pastoralNotes?: string;
}

interface ChurchLeader {
  id: number;
  nama: string;
  jabatan: string;
  foto_url?: string;
}

interface BankAccount {
  id: number;
  nama_bank: string;
  nomor_rekening: string;
  atas_nama: string;
}

interface PastoralContact {
  id: number;
  name: string;
  whatsappNumber: string;
  welcomeMessage: string;
}

// ============================================
// CONTEXT INTERFACE
// ============================================

interface ChurchContextType {
  profile: ChurchProfile;
  heroImages: HeroImage[];
  schedules: WorshipSchedule[];
  articles: ChurchArticle[];
  prayerRequests: PrayerRequest[];
  leaders: ChurchLeader[];
  bankAccounts: BankAccount[];
  pastoralContacts: PastoralContact[];
  isAdminLoggedIn: boolean;
  toastMessage: string | null;
  isLoading: boolean;
  refreshAllData: () => Promise<void>;
  showToast: (msg: string) => void;
  
  // Profile
  updateProfile: (data: ChurchProfile) => Promise<void>;
  
  // Hero Images
  addHeroImage: (image: Omit<HeroImage, 'id'>) => Promise<void>;
  deleteHeroImage: (id: number) => Promise<void>;
  
  // Schedules
  addSchedule: (schedule: Omit<WorshipSchedule, 'id'>) => Promise<void>;
  updateSchedule: (schedule: WorshipSchedule) => Promise<void>;
  deleteSchedule: (id: number) => Promise<void>;
  
  // Articles
  addArticle: (article: Omit<ChurchArticle, 'id' | 'slug'>) => Promise<void>;
  updateArticle: (article: ChurchArticle) => Promise<void>;
  deleteArticle: (id: number) => Promise<void>;
  
  // Prayer Requests
  addPrayerRequest: (req: Omit<PrayerRequest, 'id' | 'status' | 'prayerCount'>) => Promise<void>;
  incrementPrayerCount: (id: number) => Promise<void>;
  updatePrayerStatus: (id: number, status: PrayerRequest['status'], notes?: string) => Promise<void>;
  deletePrayerRequest: (id: number) => Promise<void>;
  
  // Leaders
  addLeader: (leader: Omit<ChurchLeader, 'id'>) => Promise<void>;
  updateLeader: (leader: ChurchLeader) => Promise<void>;
  deleteLeader: (id: number) => Promise<void>;
  
  // Bank Accounts
  addBankAccount: (acc: Omit<BankAccount, 'id'>) => Promise<void>;
  updateBankAccount: (acc: BankAccount) => Promise<void>;
  deleteBankAccount: (id: number) => Promise<void>;
  
  // Pastoral Contacts
  addPastoralContact: (contact: Omit<PastoralContact, 'id'>) => Promise<void>;
  updatePastoralContact: (contact: PastoralContact) => Promise<void>;
  deletePastoralContact: (id: number) => Promise<void>;
  
  // Admin Auth
  loginAdmin: (username: string, pass: string) => boolean;
  logoutAdmin: () => void;
}

// ============================================
// CONTEXT PROVIDER
// ============================================

const ChurchContext = createContext<ChurchContextType | undefined>(undefined);

export const ChurchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // ===== STATE =====
  const [profile, setProfile] = useState<ChurchProfile>({
    name: 'GMAHK Salili Siau Tengah',
    tagline: 'Mewartakan Kasih Karunia & Pengharapan Kedatangan Yesus',
    shortDescription: 'Gereja Masehi Advent Hari Ketujuh Jemaat Salili, Siau Tengah, Sitaro, Sulawesi Utara.',
    village: 'Salili',
    district: 'Siau Tengah',
    regency: 'Sitaro',
    province: 'Sulawesi Utara',
  });
  
  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);
  const [schedules, setSchedules] = useState<WorshipSchedule[]>([]);
  const [articles, setArticles] = useState<ChurchArticle[]>([]);
  const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>([]);
  const [leaders, setLeaders] = useState<ChurchLeader[]>([]);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [pastoralContacts, setPastoralContacts] = useState<PastoralContact[]>([]);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ===== FUNGSI AMBIL DATA DARI SUPABASE =====
  const fetchAllData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [profileRes, heroRes, scheduleRes, articleRes, prayerRes, leaderRes, bankRes, pastoralRes] = 
        await Promise.all([
          supabase.get('profile?limit=1'),
          supabase.get('hero_images?order=created_at.asc'),
          supabase.get('schedules?order=created_at.asc'),
          supabase.get('articles?order=created_at.desc'),
          supabase.get('prayer_requests?order=created_at.desc'),
          supabase.get('leaders?order=created_at.asc'),
          supabase.get('bank_accounts?order=created_at.asc'),
          supabase.get('pastoral_contacts?order=created_at.asc'),
        ]);

      if (profileRes && profileRes.length > 0) {
        setProfile(profileRes[0]);
      }

      if (heroRes && Array.isArray(heroRes)) {
        setHeroImages(heroRes);
      }

      if (scheduleRes && Array.isArray(scheduleRes)) {
        setSchedules(scheduleRes);
      }

      if (articleRes && Array.isArray(articleRes)) {
        setArticles(articleRes);
      }

      if (prayerRes && Array.isArray(prayerRes)) {
        setPrayerRequests(prayerRes);
      }

      if (leaderRes && Array.isArray(leaderRes)) {
        setLeaders(leaderRes);
      }

      if (bankRes && Array.isArray(bankRes)) {
        setBankAccounts(bankRes);
      }

      if (pastoralRes && Array.isArray(pastoralRes)) {
        setPastoralContacts(pastoralRes);
      }

      console.log('[ChurchContext] Data berhasil dimuat dari Supabase');
    } catch (error) {
      console.error('[ChurchContext] Gagal memuat data:', error);
      showToast('❌ Gagal memuat data dari database');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ===== LOAD DATA SAAT PERTAMA KALI =====
  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // ===== FUNGSI REFRESH =====
  const refreshAllData = async () => {
    await fetchAllData();
    showToast('✅ Data berhasil diperbarui!');
  };

  // ===== TOAST =====
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // ===== PROFILE =====
  const updateProfile = async (data: ChurchProfile) => {
    try {
      const existing = await supabase.get('profile?limit=1');
      if (existing && existing.length > 0) {
        await supabase.update('profile', existing[0].id, data);
      } else {
        await supabase.post('profile', data);
      }
      setProfile(data);
      showToast('✅ Profil berhasil diperbarui!');
      await refreshAllData();
    } catch (error) {
      showToast('❌ Gagal memperbarui profil');
    }
  };

  // ===== HERO IMAGES =====
  const addHeroImage = async (image: Omit<HeroImage, 'id'>) => {
    try {
      await supabase.post('hero_images', image);
      showToast('✅ Gambar banner berhasil ditambahkan!');
      await refreshAllData();
    } catch (error) {
      showToast('❌ Gagal menambahkan gambar');
    }
  };

  const deleteHeroImage = async (id: number) => {
    try {
      await supabase.delete('hero_images', String(id));
      showToast('✅ Gambar banner berhasil dihapus!');
      await refreshAllData();
    } catch (error) {
      showToast('❌ Gagal menghapus gambar');
    }
  };

  // ===== SCHEDULES =====
  const addSchedule = async (schedule: Omit<WorshipSchedule, 'id'>) => {
    try {
      await supabase.post('schedules', schedule);
      showToast('✅ Jadwal berhasil ditambahkan!');
      await refreshAllData();
    } catch (error) {
      showToast('❌ Gagal menambahkan jadwal');
    }
  };

  const updateSchedule = async (schedule: WorshipSchedule) => {
    try {
      await supabase.update('schedules', String(schedule.id), schedule);
      showToast('✅ Jadwal berhasil diperbarui!');
      await refreshAllData();
    } catch (error) {
      showToast('❌ Gagal memperbarui jadwal');
    }
  };

  const deleteSchedule = async (id: number) => {
    try {
      await supabase.delete('schedules', String(id));
      showToast('✅ Jadwal berhasil dihapus!');
      await refreshAllData();
    } catch (error) {
      showToast('❌ Gagal menghapus jadwal');
    }
  };

  // ===== ARTICLES =====
  const addArticle = async (article: Omit<ChurchArticle, 'id' | 'slug'>) => {
    try {
      const slug = article.judul
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      
      await supabase.post('articles', { ...article, slug });
      showToast('✅ Artikel berhasil diterbitkan!');
      await refreshAllData();
    } catch (error) {
      showToast('❌ Gagal menerbitkan artikel');
    }
  };

  const updateArticle = async (article: ChurchArticle) => {
    try {
      await supabase.update('articles', String(article.id), article);
      showToast('✅ Artikel berhasil diperbarui!');
      await refreshAllData();
    } catch (error) {
      showToast('❌ Gagal memperbarui artikel');
    }
  };

  const deleteArticle = async (id: number) => {
    try {
      await supabase.delete('articles', String(id));
      showToast('✅ Artikel berhasil dihapus!');
      await refreshAllData();
    } catch (error) {
      showToast('❌ Gagal menghapus artikel');
    }
  };

  // ===== PRAYER REQUESTS =====
  const addPrayerRequest = async (req: Omit<PrayerRequest, 'id' | 'status' | 'prayerCount'>) => {
    try {
      await supabase.post('prayer_requests', { ...req, status: 'pending', prayerCount: 1 });
      showToast('✅ Permohonan doa berhasil dikirim!');
      await refreshAllData();
    } catch (error) {
      showToast('❌ Gagal mengirim permohonan doa');
    }
  };

  const incrementPrayerCount = async (id: number) => {
    try {
      const prayer = prayerRequests.find(p => p.id === id);
      if (prayer) {
        await supabase.update('prayer_requests', String(id), { prayerCount: prayer.prayerCount + 1 });
        await refreshAllData();
      }
    } catch (error) {
      console.error('Gagal menambah doa');
    }
  };

  const updatePrayerStatus = async (id: number, status: PrayerRequest['status'], notes?: string) => {
    try {
      await supabase.update('prayer_requests', String(id), { status, pastoralNotes: notes });
      showToast('✅ Status doa berhasil diperbarui!');
      await refreshAllData();
    } catch (error) {
      showToast('❌ Gagal memperbarui status doa');
    }
  };

  const deletePrayerRequest = async (id: number) => {
    try {
      await supabase.delete('prayer_requests', String(id));
      showToast('✅ Permohonan doa berhasil dihapus!');
      await refreshAllData();
    } catch (error) {
      showToast('❌ Gagal menghapus permohonan doa');
    }
  };

  // ===== LEADERS =====
  const addLeader = async (leader: Omit<ChurchLeader, 'id'>) => {
    try {
      await supabase.post('leaders', leader);
      showToast('✅ Pengurus berhasil ditambahkan!');
      await refreshAllData();
    } catch (error) {
      showToast('❌ Gagal menambahkan pengurus');
    }
  };

  const updateLeader = async (leader: ChurchLeader) => {
    try {
      await supabase.update('leaders', String(leader.id), leader);
      showToast('✅ Pengurus berhasil diperbarui!');
      await refreshAllData();
    } catch (error) {
      showToast('❌ Gagal memperbarui pengurus');
    }
  };

  const deleteLeader = async (id: number) => {
    try {
      await supabase.delete('leaders', String(id));
      showToast('✅ Pengurus berhasil dihapus!');
      await refreshAllData();
    } catch (error) {
      showToast('❌ Gagal menghapus pengurus');
    }
  };

  // ===== BANK ACCOUNTS =====
  const addBankAccount = async (acc: Omit<BankAccount, 'id'>) => {
    try {
      await supabase.post('bank_accounts', acc);
      showToast('✅ Rekening donasi berhasil ditambahkan!');
      await refreshAllData();
    } catch (error) {
      showToast('❌ Gagal menambahkan rekening');
    }
  };

  const updateBankAccount = async (acc: BankAccount) => {
    try {
      await supabase.update('bank_accounts', String(acc.id), acc);
      showToast('✅ Rekening donasi berhasil diperbarui!');
      await refreshAllData();
    } catch (error) {
      showToast('❌ Gagal memperbarui rekening');
    }
  };

  const deleteBankAccount = async (id: number) => {
    try {
      await supabase.delete('bank_accounts', String(id));
      showToast('✅ Rekening donasi berhasil dihapus!');
      await refreshAllData();
    } catch (error) {
      showToast('❌ Gagal menghapus rekening');
    }
  };

  // ===== PASTORAL CONTACTS =====
  const addPastoralContact = async (contact: Omit<PastoralContact, 'id'>) => {
    try {
      await supabase.post('pastoral_contacts', contact);
      showToast('✅ Kontak pastoral berhasil ditambahkan!');
      await refreshAllData();
    } catch (error) {
      showToast('❌ Gagal menambahkan kontak pastoral');
    }
  };

  const updatePastoralContact = async (contact: PastoralContact) => {
    try {
      await supabase.update('pastoral_contacts', String(contact.id), contact);
      showToast('✅ Kontak pastoral berhasil diperbarui!');
      await refreshAllData();
    } catch (error) {
      showToast('❌ Gagal memperbarui kontak pastoral');
    }
  };

  const deletePastoralContact = async (id: number) => {
    try {
      await supabase.delete('pastoral_contacts', String(id));
      showToast('✅ Kontak pastoral berhasil dihapus!');
      await refreshAllData();
    } catch (error) {
      showToast('❌ Gagal menghapus kontak pastoral');
    }
  };

  // ===== ADMIN AUTH =====
  const loginAdmin = (username: string, pass: string): boolean => {
    if (username === 'admin' && pass === 'admin123') {
      setIsAdminLoggedIn(true);
      showToast('✅ Berhasil masuk ke Dashboard Admin');
      return true;
    }
    showToast('❌ Username atau password salah');
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    showToast('✅ Anda telah keluar dari Dashboard Admin');
  };

  return (
    <ChurchContext.Provider
      value={{
        profile,
        heroImages,
        schedules,
        articles,
        prayerRequests,
        leaders,
        bankAccounts,
        pastoralContacts,
        isAdminLoggedIn,
        toastMessage,
        isLoading,
        refreshAllData,
        showToast,
        updateProfile,
        addHeroImage,
        deleteHeroImage,
        addSchedule,
        updateSchedule,
        deleteSchedule,
        addArticle,
        updateArticle,
        deleteArticle,
        addPrayerRequest,
        incrementPrayerCount,
        updatePrayerStatus,
        deletePrayerRequest,
        addLeader,
        updateLeader,
        deleteLeader,
        addBankAccount,
        updateBankAccount,
        deleteBankAccount,
        addPastoralContact,
        updatePastoralContact,
        deletePastoralContact,
        loginAdmin,
        logoutAdmin,
      }}
    >
      {children}
    </ChurchContext.Provider>
  );
};

export const useChurch = () => {
  const context = useContext(ChurchContext);
  if (!context) {
    throw new Error('useChurch must be used within a ChurchProvider');
  }
  return context;
};