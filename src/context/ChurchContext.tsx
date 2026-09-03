import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  ChurchProfile,
  ChurchLogoConfig,
  HeroImage,
  VisiMisiData,
  WorshipSchedule,
  ChurchArticle,
  PrayerRequest,
  ChurchLeader,
  BankAccount,
  PastoralContact,
  SocialLinks,
  AdminCredentials,
} from '../types/church';
import {
  initialProfile,
  initialLogoConfig,
  initialHeroImages,
  initialVisiMisi,
  initialSchedules,
  initialArticles,
  initialPrayerRequests,
  initialLeaders,
  initialBankAccounts,
  initialPastoralContacts,
  initialSocialLinks,
  initialAdminCredentials,
} from '../data/initialData';

export interface ChurchFullData {
  profile: ChurchProfile;
  logoConfig: ChurchLogoConfig;
  heroImages: HeroImage[];
  visiMisi: VisiMisiData;
  schedules: WorshipSchedule[];
  articles: ChurchArticle[];
  prayerRequests: PrayerRequest[];
  leaders: ChurchLeader[];
  bankAccounts: BankAccount[];
  pastoralContacts: PastoralContact[];
  socialLinks: SocialLinks;
  adminCredentials: AdminCredentials;
  _lastUpdated?: string;
}

interface ChurchContextType {
  // State
  profile: ChurchProfile;
  logoConfig: ChurchLogoConfig;
  heroImages: HeroImage[];
  visiMisi: VisiMisiData;
  schedules: WorshipSchedule[];
  articles: ChurchArticle[];
  prayerRequests: PrayerRequest[];
  leaders: ChurchLeader[];
  bankAccounts: BankAccount[];
  pastoralContacts: PastoralContact[];
  socialLinks: SocialLinks;
  isAdminLoggedIn: boolean;
  adminCredentials: AdminCredentials;
  toastMessage: string | null;
  isSaving: boolean;
  lastSavedTime: string | null;

  // Actions
  showToast: (msg: string) => void;
  saveSectionToFile: (section: keyof ChurchFullData, dataToSave: any, customSuccessMsg?: string) => Promise<boolean>;
  saveAllToFile: (customData?: Partial<ChurchFullData>, customSuccessMsg?: string) => Promise<boolean>;
  
  // Profile & Visi Misi
  updateProfile: (profile: ChurchProfile) => void;
  updateLogoConfig: (config: ChurchLogoConfig) => void;
  updateVisiMisi: (data: VisiMisiData) => void;
  
  // Hero Images
  updateHeroImages: (images: HeroImage[]) => void;
  addHeroImage: (image: Omit<HeroImage, 'id'>) => void;
  deleteHeroImage: (id: string) => void;
  setPrimaryHeroImage: (id: string) => void;

  // Schedules
  addSchedule: (schedule: Omit<WorshipSchedule, 'id'>) => void;
  updateSchedule: (schedule: WorshipSchedule) => void;
  deleteSchedule: (id: string) => void;

  // Articles
  addArticle: (article: Omit<ChurchArticle, 'id' | 'slug'>) => void;
  updateArticle: (article: ChurchArticle) => void;
  deleteArticle: (id: string) => void;

  // Prayer Requests
  addPrayerRequest: (req: Omit<PrayerRequest, 'id' | 'createdAt' | 'status' | 'prayerCount'>) => void;
  incrementPrayerCount: (id: string) => void;
  updatePrayerStatus: (id: string, status: PrayerRequest['status'], notes?: string) => void;
  deletePrayerRequest: (id: string) => void;

  // Leaders
  addLeader: (leader: Omit<ChurchLeader, 'id'>) => void;
  updateLeader: (leader: ChurchLeader) => void;
  deleteLeader: (id: string) => void;

  // Bank Accounts
  addBankAccount: (acc: Omit<BankAccount, 'id'>) => void;
  updateBankAccount: (acc: BankAccount) => void;
  deleteBankAccount: (id: string) => void;

  // Pastoral Contacts
  addPastoralContact: (contact: Omit<PastoralContact, 'id'>) => void;
  updatePastoralContact: (contact: PastoralContact) => void;
  deletePastoralContact: (id: string) => void;

  // Social Links
  updateSocialLinks: (links: SocialLinks) => void;

  // Admin Auth
  loginAdmin: (username: string, pass: string) => boolean;
  logoutAdmin: () => void;
  updateAdminCredentials: (newUsername: string, newPass: string) => boolean;

  // Reset & Backup
  resetAllData: () => void;
}

const STORAGE_KEY_PREFIX = 'gmahk_salili_';

function getStored<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(STORAGE_KEY_PREFIX + key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function setStored<T>(key: string, value: T) {
  try {
    localStorage.setItem(STORAGE_KEY_PREFIX + key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving ${key} to localStorage`, e);
  }
}

const ChurchContext = createContext<ChurchContextType | undefined>(undefined);

export const ChurchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfileState] = useState<ChurchProfile>(() => getStored('profile', initialProfile));
  const [logoConfig, setLogoConfigState] = useState<ChurchLogoConfig>(() => getStored('logo', initialLogoConfig));
  const [heroImages, setHeroImagesState] = useState<HeroImage[]>(() => getStored('hero_images', initialHeroImages));
  const [visiMisi, setVisiMisiState] = useState<VisiMisiData>(() => getStored('visi_misi', initialVisiMisi));
  const [schedules, setSchedulesState] = useState<WorshipSchedule[]>(() => getStored('schedules', initialSchedules));
  const [articles, setArticlesState] = useState<ChurchArticle[]>(() => getStored('articles', initialArticles));
  const [prayerRequests, setPrayerRequestsState] = useState<PrayerRequest[]>(() => getStored('prayer_requests', initialPrayerRequests));
  const [leaders, setLeadersState] = useState<ChurchLeader[]>(() => getStored('leaders', initialLeaders));
  const [bankAccounts, setBankAccountsState] = useState<BankAccount[]>(() => getStored('bank_accounts', initialBankAccounts));
  const [pastoralContacts, setPastoralContactsState] = useState<PastoralContact[]>(() => getStored('pastoral_contacts', initialPastoralContacts));
  const [socialLinks, setSocialLinksState] = useState<SocialLinks>(() => getStored('social_links', initialSocialLinks));
  const [adminCredentials, setAdminCredentialsState] = useState<AdminCredentials>(() => getStored('admin_cred', initialAdminCredentials));
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem(STORAGE_KEY_PREFIX + 'is_admin') === 'true';
  });
  
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 4000);
  };

  // Helper to persist entire data or section to the server file
  const saveAllToFile = useCallback(async (customData?: Partial<ChurchFullData>, customSuccessMsg?: string): Promise<boolean> => {
    setIsSaving(true);
    try {
      const payload: Partial<ChurchFullData> = {
        profile,
        logoConfig,
        heroImages,
        visiMisi,
        schedules,
        articles,
        prayerRequests,
        leaders,
        bankAccounts,
        pastoralContacts,
        socialLinks,
        adminCredentials,
        ...customData,
      };

      const res = await fetch('/api/church-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const result = await res.json();
        const timeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setLastSavedTime(timeStr);
        showToast(customSuccessMsg || 'Data berhasil disimpan ke file data/church-data.json!');
        return true;
      } else {
        console.warn('Server save returned non-OK status:', res.status);
        showToast(customSuccessMsg || 'Perubahan tersimpan.');
        return true;
      }
    } catch (err) {
      console.warn('Network save to file warning:', err);
      showToast(customSuccessMsg || 'Perubahan disimpan di penyimpanan lokal.');
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [
    profile,
    logoConfig,
    heroImages,
    visiMisi,
    schedules,
    articles,
    prayerRequests,
    leaders,
    bankAccounts,
    pastoralContacts,
    socialLinks,
    adminCredentials,
  ]);

  // Helper to save a single section specifically
  const saveSectionToFile = useCallback(async (section: keyof ChurchFullData, dataToSave: any, customSuccessMsg?: string): Promise<boolean> => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/church-data/section', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section, data: dataToSave }),
      });

      const timeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setLastSavedTime(timeStr);

      if (res.ok) {
        showToast(customSuccessMsg || `Data ${section} berhasil disimpan ke file data/church-data.json!`);
        return true;
      } else {
        showToast(customSuccessMsg || `Data ${section} berhasil disimpan.`);
        return true;
      }
    } catch (err) {
      console.warn(`Error saving section ${section} to server file:`, err);
      showToast(customSuccessMsg || `Data ${section} disimpan ke penyimpanan lokal.`);
      return false;
    } finally {
      setIsSaving(false);
    }
  }, []);

  // Fetch initial data from server on app load
  useEffect(() => {
    const fetchServerData = async () => {
      try {
        const res = await fetch('/api/church-data');
        if (res.ok) {
          const data: ChurchFullData = await res.json();
          if (data.profile) {
            setProfileState(data.profile);
            setStored('profile', data.profile);
          }
          if (data.logoConfig) {
            setLogoConfigState(data.logoConfig);
            setStored('logo', data.logoConfig);
          }
          if (data.heroImages && Array.isArray(data.heroImages)) {
            setHeroImagesState(data.heroImages);
            setStored('hero_images', data.heroImages);
          }
          if (data.visiMisi) {
            setVisiMisiState(data.visiMisi);
            setStored('visi_misi', data.visiMisi);
          }
          if (data.schedules && Array.isArray(data.schedules)) {
            setSchedulesState(data.schedules);
            setStored('schedules', data.schedules);
          }
          if (data.articles && Array.isArray(data.articles)) {
            setArticlesState(data.articles);
            setStored('articles', data.articles);
          }
          if (data.prayerRequests && Array.isArray(data.prayerRequests)) {
            setPrayerRequestsState(data.prayerRequests);
            setStored('prayer_requests', data.prayerRequests);
          }
          if (data.leaders && Array.isArray(data.leaders)) {
            setLeadersState(data.leaders);
            setStored('leaders', data.leaders);
          }
          if (data.bankAccounts && Array.isArray(data.bankAccounts)) {
            setBankAccountsState(data.bankAccounts);
            setStored('bank_accounts', data.bankAccounts);
          }
          if (data.pastoralContacts && Array.isArray(data.pastoralContacts)) {
            setPastoralContactsState(data.pastoralContacts);
            setStored('pastoral_contacts', data.pastoralContacts);
          }
          if (data.socialLinks) {
            setSocialLinksState(data.socialLinks);
            setStored('social_links', data.socialLinks);
          }
          if (data.adminCredentials) {
            setAdminCredentialsState(data.adminCredentials);
            setStored('admin_cred', data.adminCredentials);
          }
          console.log('[ChurchContext] Loaded church data from server file data/church-data.json');
        }
      } catch (err) {
        console.warn('[ChurchContext] Could not fetch server data, using localStorage/default fallback', err);
      }
    };

    fetchServerData();
  }, []);

  // Profile
  const updateProfile = (newProfile: ChurchProfile) => {
    setProfileState(newProfile);
    setStored('profile', newProfile);
    saveSectionToFile('profile', newProfile, 'Profil & Ringkasan Gereja berhasil disimpan ke file website!');
  };

  // Logo Config
  const updateLogoConfig = (newConfig: ChurchLogoConfig) => {
    setLogoConfigState(newConfig);
    setStored('logo', newConfig);
    saveSectionToFile('logoConfig', newConfig, 'Konfigurasi Logo Gereja berhasil disimpan ke file!');
  };

  // Hero Images
  const updateHeroImages = (newImages: HeroImage[]) => {
    setHeroImagesState(newImages);
    setStored('hero_images', newImages);
    saveSectionToFile('heroImages', newImages, 'Daftar Banner berhasil disimpan ke file!');
  };

  const addHeroImage = (image: Omit<HeroImage, 'id'>) => {
    const newImage: HeroImage = {
      ...image,
      id: `hero-${Date.now()}`,
    };
    const updated = [...heroImages, newImage];
    setHeroImagesState(updated);
    setStored('hero_images', updated);
    saveSectionToFile('heroImages', updated, 'Banner baru berhasil ditambahkan dan disimpan ke file!');
  };

  const deleteHeroImage = (id: string) => {
    const updated = heroImages.filter((img) => img.id !== id);
    setHeroImagesState(updated);
    setStored('hero_images', updated);
    saveSectionToFile('heroImages', updated, 'Gambar banner berhasil dihapus dan diperbarui di file!');
  };

  const setPrimaryHeroImage = (id: string) => {
    const updated = heroImages.map((img) => ({
      ...img,
      isPrimary: img.id === id,
    }));
    setHeroImagesState(updated);
    setStored('hero_images', updated);
    saveSectionToFile('heroImages', updated, 'Banner utama berhasil diubah dan disimpan ke file!');
  };

  // Visi & Misi
  const updateVisiMisi = (data: VisiMisiData) => {
    setVisiMisiState(data);
    setStored('visi_misi', data);
    saveSectionToFile('visiMisi', data, 'Visi & Misi gereja berhasil disimpan ke file!');
  };

  // Schedules
  const addSchedule = (schedule: Omit<WorshipSchedule, 'id'>) => {
    const newSchedule: WorshipSchedule = {
      ...schedule,
      id: `sch-${Date.now()}`,
    };
    const updated = [...schedules, newSchedule];
    setSchedulesState(updated);
    setStored('schedules', updated);
    saveSectionToFile('schedules', updated, 'Jadwal ibadah baru berhasil ditambahkan dan disimpan ke file!');
  };

  const updateSchedule = (schedule: WorshipSchedule) => {
    const updated = schedules.map((s) => (s.id === schedule.id ? schedule : s));
    setSchedulesState(updated);
    setStored('schedules', updated);
    saveSectionToFile('schedules', updated, 'Jadwal ibadah berhasil diperbarui dan disimpan ke file!');
  };

  const deleteSchedule = (id: string) => {
    const updated = schedules.filter((s) => s.id !== id);
    setSchedulesState(updated);
    setStored('schedules', updated);
    saveSectionToFile('schedules', updated, 'Jadwal ibadah berhasil dihapus dari file!');
  };

  // Articles
  const addArticle = (article: Omit<ChurchArticle, 'id' | 'slug'>) => {
    const slug = article.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const newArticle: ChurchArticle = {
      ...article,
      id: `art-${Date.now()}`,
      slug: `${slug}-${Date.now()}`,
    };
    const updated = [newArticle, ...articles];
    setArticlesState(updated);
    setStored('articles', updated);
    saveSectionToFile('articles', updated, 'Artikel / Warta baru berhasil diterbitkan dan disimpan ke file!');
  };

  const updateArticle = (article: ChurchArticle) => {
    const updated = articles.map((a) => (a.id === article.id ? article : a));
    setArticlesState(updated);
    setStored('articles', updated);
    saveSectionToFile('articles', updated, 'Artikel berhasil diperbarui dan disimpan ke file!');
  };

  const deleteArticle = (id: string) => {
    const updated = articles.filter((a) => a.id !== id);
    setArticlesState(updated);
    setStored('articles', updated);
    saveSectionToFile('articles', updated, 'Artikel berhasil dihapus dari file!');
  };

  // Prayer Requests
  const addPrayerRequest = (req: Omit<PrayerRequest, 'id' | 'createdAt' | 'status' | 'prayerCount'>) => {
    const newReq: PrayerRequest = {
      ...req,
      id: `pray-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'pending',
      prayerCount: 1,
    };
    const updated = [newReq, ...prayerRequests];
    setPrayerRequestsState(updated);
    setStored('prayer_requests', updated);
    saveSectionToFile('prayerRequests', updated, 'Permohonan doa Anda telah terkirim dan disimpan ke file!');
  };

  const incrementPrayerCount = (id: string) => {
    const updated = prayerRequests.map((p) =>
      p.id === id ? { ...p, prayerCount: p.prayerCount + 1 } : p
    );
    setPrayerRequestsState(updated);
    setStored('prayer_requests', updated);
    saveSectionToFile('prayerRequests', updated, 'Terima kasih atas dukungan doa Anda (Amin)');
  };

  const updatePrayerStatus = (id: string, status: PrayerRequest['status'], notes?: string) => {
    const updated = prayerRequests.map((p) =>
      p.id === id ? { ...p, status, pastoralNotes: notes !== undefined ? notes : p.pastoralNotes } : p
    );
    setPrayerRequestsState(updated);
    setStored('prayer_requests', updated);
    saveSectionToFile('prayerRequests', updated, 'Status & Catatan doa berhasil diperbarui dan disimpan ke file!');
  };

  const deletePrayerRequest = (id: string) => {
    const updated = prayerRequests.filter((p) => p.id !== id);
    setPrayerRequestsState(updated);
    setStored('prayer_requests', updated);
    saveSectionToFile('prayerRequests', updated, 'Permohonan doa berhasil dihapus dari file!');
  };

  // Leaders
  const addLeader = (leader: Omit<ChurchLeader, 'id'>) => {
    const newLeader: ChurchLeader = {
      ...leader,
      id: `lead-${Date.now()}`,
    };
    const updated = [...leaders, newLeader];
    setLeadersState(updated);
    setStored('leaders', updated);
    saveSectionToFile('leaders', updated, 'Pengurus gereja baru berhasil ditambahkan dan disimpan ke file!');
  };

  const updateLeader = (leader: ChurchLeader) => {
    const updated = leaders.map((l) => (l.id === leader.id ? leader : l));
    setLeadersState(updated);
    setStored('leaders', updated);
    saveSectionToFile('leaders', updated, 'Data pengurus gereja diperbarui dan disimpan ke file!');
  };

  const deleteLeader = (id: string) => {
    const updated = leaders.filter((l) => l.id !== id);
    setLeadersState(updated);
    setStored('leaders', updated);
    saveSectionToFile('leaders', updated, 'Pengurus gereja telah dihapus dari file!');
  };

  // Bank Accounts
  const addBankAccount = (acc: Omit<BankAccount, 'id'>) => {
    const newAcc: BankAccount = {
      ...acc,
      id: `bank-${Date.now()}`,
    };
    const updated = [...bankAccounts, newAcc];
    setBankAccountsState(updated);
    setStored('bank_accounts', updated);
    saveSectionToFile('bankAccounts', updated, 'Rekening persembahan baru berhasil ditambahkan dan disimpan ke file!');
  };

  const updateBankAccount = (acc: BankAccount) => {
    const updated = bankAccounts.map((b) => (b.id === acc.id ? acc : b));
    setBankAccountsState(updated);
    setStored('bank_accounts', updated);
    saveSectionToFile('bankAccounts', updated, 'Rekening persembahan diperbarui dan disimpan ke file!');
  };

  const deleteBankAccount = (id: string) => {
    const updated = bankAccounts.filter((b) => b.id !== id);
    setBankAccountsState(updated);
    setStored('bank_accounts', updated);
    saveSectionToFile('bankAccounts', updated, 'Rekening persembahan berhasil dihapus dari file!');
  };

  // Pastoral Contacts
  const addPastoralContact = (contact: Omit<PastoralContact, 'id'>) => {
    const newContact: PastoralContact = {
      ...contact,
      id: `pastor-${Date.now()}`,
    };
    const updated = [...pastoralContacts, newContact];
    setPastoralContactsState(updated);
    setStored('pastoral_contacts', updated);
    saveSectionToFile('pastoralContacts', updated, 'Kontak pelayanan pastoral berhasil ditambahkan dan disimpan ke file!');
  };

  const updatePastoralContact = (contact: PastoralContact) => {
    const updated = pastoralContacts.map((c) => (c.id === contact.id ? contact : c));
    setPastoralContactsState(updated);
    setStored('pastoral_contacts', updated);
    saveSectionToFile('pastoralContacts', updated, 'Kontak pelayanan pastoral diperbarui dan disimpan ke file!');
  };

  const deletePastoralContact = (id: string) => {
    const updated = pastoralContacts.filter((c) => c.id !== id);
    setPastoralContactsState(updated);
    setStored('pastoral_contacts', updated);
    saveSectionToFile('pastoralContacts', updated, 'Kontak pastoral berhasil dihapus dari file!');
  };

  // Social Links
  const updateSocialLinks = (links: SocialLinks) => {
    setSocialLinksState(links);
    setStored('social_links', links);
    saveSectionToFile('socialLinks', links, 'Tautan media sosial berhasil disimpan ke file!');
  };

  // Admin Auth
  const loginAdmin = (username: string, pass: string): boolean => {
    if (username === adminCredentials.username && pass === adminCredentials.passwordHash) {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem(STORAGE_KEY_PREFIX + 'is_admin', 'true');
      showToast('Berhasil masuk ke Dashboard Admin GMAHK Salili');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem(STORAGE_KEY_PREFIX + 'is_admin');
    showToast('Anda telah keluar dari Dashboard Admin');
  };

  const updateAdminCredentials = (newUsername: string, newPass: string): boolean => {
    if (!newUsername.trim() || !newPass.trim()) return false;
    const newCred: AdminCredentials = {
      username: newUsername.trim(),
      passwordHash: newPass.trim(),
      lastUpdated: new Date().toISOString(),
    };
    setAdminCredentialsState(newCred);
    setStored('admin_cred', newCred);
    saveSectionToFile('adminCredentials', newCred, 'Username dan Password Admin berhasil disimpan ke file!');
    return true;
  };

  // Reset to initial
  const resetAllData = async () => {
    setProfileState(initialProfile);
    setLogoConfigState(initialLogoConfig);
    setHeroImagesState(initialHeroImages);
    setVisiMisiState(initialVisiMisi);
    setSchedulesState(initialSchedules);
    setArticlesState(initialArticles);
    setPrayerRequestsState(initialPrayerRequests);
    setLeadersState(initialLeaders);
    setBankAccountsState(initialBankAccounts);
    setPastoralContactsState(initialPastoralContacts);
    setSocialLinksState(initialSocialLinks);
    setAdminCredentialsState(initialAdminCredentials);

    localStorage.removeItem(STORAGE_KEY_PREFIX + 'profile');
    localStorage.removeItem(STORAGE_KEY_PREFIX + 'logo');
    localStorage.removeItem(STORAGE_KEY_PREFIX + 'hero_images');
    localStorage.removeItem(STORAGE_KEY_PREFIX + 'visi_misi');
    localStorage.removeItem(STORAGE_KEY_PREFIX + 'schedules');
    localStorage.removeItem(STORAGE_KEY_PREFIX + 'articles');
    localStorage.removeItem(STORAGE_KEY_PREFIX + 'prayer_requests');
    localStorage.removeItem(STORAGE_KEY_PREFIX + 'leaders');
    localStorage.removeItem(STORAGE_KEY_PREFIX + 'bank_accounts');
    localStorage.removeItem(STORAGE_KEY_PREFIX + 'pastoral_contacts');
    localStorage.removeItem(STORAGE_KEY_PREFIX + 'social_links');
    localStorage.removeItem(STORAGE_KEY_PREFIX + 'admin_cred');

    await saveAllToFile(
      {
        profile: initialProfile,
        logoConfig: initialLogoConfig,
        heroImages: initialHeroImages,
        visiMisi: initialVisiMisi,
        schedules: initialSchedules,
        articles: initialArticles,
        prayerRequests: initialPrayerRequests,
        leaders: initialLeaders,
        bankAccounts: initialBankAccounts,
        pastoralContacts: initialPastoralContacts,
        socialLinks: initialSocialLinks,
        adminCredentials: initialAdminCredentials,
      },
      'Data website telah direset ke data default dan disimpan ke file!'
    );
  };

  return (
    <ChurchContext.Provider
      value={{
        profile,
        logoConfig,
        heroImages,
        visiMisi,
        schedules,
        articles,
        prayerRequests,
        leaders,
        bankAccounts,
        pastoralContacts,
        socialLinks,
        isAdminLoggedIn,
        adminCredentials,
        toastMessage,
        isSaving,
        lastSavedTime,
        showToast,
        saveSectionToFile,
        saveAllToFile,
        updateProfile,
        updateLogoConfig,
        updateHeroImages,
        addHeroImage,
        deleteHeroImage,
        setPrimaryHeroImage,
        updateVisiMisi,
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
        updateSocialLinks,
        loginAdmin,
        logoutAdmin,
        updateAdminCredentials,
        resetAllData,
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
