import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import { GMAHKLogo } from './GMAHKLogo';
import { ImageUploadField } from './ImageUploadField';
import {
  ChurchArticle,
  HeroImage,
  ChurchLeader,
  BankAccount,
  PastoralContact,
  WorshipSchedule,
  ChurchProfile,
  ChurchLogoConfig,
  VisiMisiData,
  SocialLinks,
} from '../types/church';
import {
  LayoutDashboard,
  FileText,
  Image,
  Flame,
  Users,
  Share2,
  CreditCard,
  PhoneCall,
  HeartHandshake,
  Calendar,
  Compass,
  KeyRound,
  LogOut,
  Plus,
  Trash2,
  Edit3,
  Check,
  X,
  ExternalLink,
  ShieldCheck,
  Save,
  RotateCcw,
  Sparkles,
  Eye,
  Lock,
  Upload,
  Database,
  CheckCircle2,
  FolderSync,
  RefreshCw,
  FileJson,
  Server,
} from 'lucide-react';

interface AdminDashboardProps {
  onClose: () => void;
}

type TabType =
  | 'overview'
  | 'articles'
  | 'images'
  | 'logo'
  | 'leaders'
  | 'social'
  | 'banks'
  | 'pastoral'
  | 'prayers'
  | 'schedules'
  | 'profile'
  | 'security';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const {
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
    logoutAdmin,
    showToast,
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
    updatePrayerStatus,
    deletePrayerRequest,
    updateAdminCredentials,
    resetAllData,
    saveSectionToFile,
    saveAllToFile,
    isSaving,
    lastSavedTime,
    refreshAllData,
  } = useChurch();

  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // --- Articles State ---
  const [editingArticle, setEditingArticle] = useState<ChurchArticle | null>(null);
  const [isCreatingArticle, setIsCreatingArticle] = useState(false);
  const [articleForm, setArticleForm] = useState({
    title: '',
    category: 'Renungan' as ChurchArticle['category'],
    summary: '',
    content: '',
    author: '',
    authorRole: '',
    publishDate: new Date().toISOString().split('T')[0],
    imageUrl: '',
    readTime: '4 menit',
    tags: 'Renungan, Sabat',
    isFeatured: false,
  });

  // --- Hero Images State ---
  const [isAddingImage, setIsAddingImage] = useState(false);
  const [imageForm, setImageForm] = useState({
    title: '',
    subtitle: '',
    imageUrl: '',
    badgeText: 'GMAHK Salili',
  });

  // --- Logo Config State ---
  const [logoForm, setLogoForm] = useState<ChurchLogoConfig>(logoConfig);

  // --- Leaders State ---
  const [editingLeader, setEditingLeader] = useState<ChurchLeader | null>(null);
  const [isAddingLeader, setIsAddingLeader] = useState(false);
  const [leaderForm, setLeaderForm] = useState({
    name: '',
    role: '',
    department: '',
    period: '2024 - 2026',
    phone: '',
    photoUrl: '',
    bio: '',
  });

  // --- Bank Account State ---
  const [editingBank, setEditingBank] = useState<BankAccount | null>(null);
  const [isAddingBank, setIsAddingBank] = useState(false);
  const [bankForm, setBankForm] = useState({
    bankName: '',
    accountNumber: '',
    accountHolder: '',
    purpose: 'Perpuluhan' as BankAccount['purpose'],
    instructions: '',
  });

  // --- Pastoral Contact State ---
  const [editingPastor, setEditingPastor] = useState<PastoralContact | null>(null);
  const [isAddingPastor, setIsAddingPastor] = useState(false);
  const [pastorForm, setPastorForm] = useState({
    name: '',
    role: '',
    whatsappNumber: '',
    photoUrl: '',
    serviceFocus: '',
    availableHours: '',
    welcomeMessage: '',
  });

  // --- Social Links State ---
  const [socialForm, setSocialForm] = useState<SocialLinks>(socialLinks);

  // --- Schedule State ---
  const [editingSchedule, setEditingSchedule] = useState<WorshipSchedule | null>(null);
  const [isAddingSchedule, setIsAddingSchedule] = useState(false);
  const [scheduleForm, setScheduleForm] = useState({
    title: '',
    day: '',
    time: '',
    category: 'Sabat' as WorshipSchedule['category'],
    location: 'Gedung Gereja GMAHK Salili',
    description: '',
    leader: '',
    isLiveStreamed: false,
  });

  // --- Profile & Visi Misi State ---
  const [profileForm, setProfileForm] = useState<ChurchProfile>(profile);
  const [visiMisiForm, setVisiMisiForm] = useState<VisiMisiData>(visiMisi);

  // --- Security State (Admin Username & Password) ---
  const [newUsername, setNewUsername] = useState(adminCredentials.username);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Handle Article Save
  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    const tagArray = articleForm.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    if (editingArticle) {
      await updateArticle({
        ...editingArticle,
        title: articleForm.title,
        category: articleForm.category,
        summary: articleForm.summary,
        content: articleForm.content,
        author: articleForm.author,
        authorRole: articleForm.authorRole,
        publishDate: articleForm.publishDate,
        imageUrl: articleForm.imageUrl || 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1000&q=80',
        readTime: articleForm.readTime,
        tags: tagArray,
        isFeatured: articleForm.isFeatured,
      });
      setEditingArticle(null);
    } else {
      await addArticle({
        title: articleForm.title,
        category: articleForm.category,
        summary: articleForm.summary,
        content: articleForm.content,
        author: articleForm.author,
        authorRole: articleForm.authorRole,
        publishDate: articleForm.publishDate,
        imageUrl: articleForm.imageUrl || 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1000&q=80',
        readTime: articleForm.readTime,
        tags: tagArray,
        isFeatured: articleForm.isFeatured,
      });
      setIsCreatingArticle(false);
    }
    await refreshAllData();
  };

  const startEditArticle = (art: ChurchArticle) => {
    setEditingArticle(art);
    setIsCreatingArticle(false);
    setArticleForm({
      title: art.title,
      category: art.category,
      summary: art.summary,
      content: art.content,
      author: art.author,
      authorRole: art.authorRole,
      publishDate: art.publishDate,
      imageUrl: art.imageUrl,
      readTime: art.readTime,
      tags: art.tags.join(', '),
      isFeatured: Boolean(art.isFeatured),
    });
  };

  // Handle Hero Image Add
  const handleAddHeroImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageForm.imageUrl.trim()) {
      showToast('Gambar harus diupload atau URL gambar harus diisi');
      return;
    }
    await addHeroImage({
      title: imageForm.title || 'GMAHK Salili Siau Tengah',
      subtitle: imageForm.subtitle || 'Persekutuan Umat Advent di Kepulauan Sitaro',
      imageUrl: imageForm.imageUrl,
      badgeText: imageForm.badgeText || 'GMAHK Salili',
      isPrimary: heroImages.length === 0,
    });
    setIsAddingImage(false);
    setImageForm({
      title: '',
      subtitle: '',
      imageUrl: '',
      badgeText: 'GMAHK Salili',
    });
    await refreshAllData();
  };

  // Handle Logo Save
  const handleSaveLogo = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateLogoConfig(logoForm);
    await refreshAllData();
  };

  // Handle Leader Save
  const handleSaveLeader = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingLeader) {
      await updateLeader({
        ...editingLeader,
        ...leaderForm,
      });
      setEditingLeader(null);
    } else {
      await addLeader({
        ...leaderForm,
        photoUrl: leaderForm.photoUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
      });
      setIsAddingLeader(false);
    }
    setLeaderForm({
      name: '',
      role: '',
      department: '',
      period: '2024 - 2026',
      phone: '',
      photoUrl: '',
      bio: '',
    });
    await refreshAllData();
  };

  // Handle Bank Save
  const handleSaveBank = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBank) {
      await updateBankAccount({
        ...editingBank,
        ...bankForm,
      });
      setEditingBank(null);
    } else {
      await addBankAccount({
        ...bankForm,
      });
      setIsAddingBank(false);
    }
    setBankForm({
      bankName: '',
      accountNumber: '',
      accountHolder: '',
      purpose: 'Perpuluhan',
      instructions: '',
    });
    await refreshAllData();
  };

  // Handle Pastoral Contact Save
  const handleSavePastoral = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanWA = pastorForm.whatsappNumber.replace(/[^0-9]/g, '');
    if (editingPastor) {
      await updatePastoralContact({
        ...editingPastor,
        ...pastorForm,
        whatsappNumber: cleanWA,
      });
      setEditingPastor(null);
    } else {
      await addPastoralContact({
        ...pastorForm,
        whatsappNumber: cleanWA,
        photoUrl: pastorForm.photoUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      });
      setIsAddingPastor(false);
    }
    setPastorForm({
      name: '',
      role: '',
      whatsappNumber: '',
      photoUrl: '',
      serviceFocus: '',
      availableHours: '',
      welcomeMessage: '',
    });
    await refreshAllData();
  };

  // Handle Social Links Save
  const handleSaveSocial = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSocialLinks(socialForm);
    await refreshAllData();
  };

  // Handle Schedule Save
  const handleSaveSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSchedule) {
      await updateSchedule({
        ...editingSchedule,
        ...scheduleForm,
      });
      setEditingSchedule(null);
    } else {
      await addSchedule({
        ...scheduleForm,
      });
      setIsAddingSchedule(false);
    }
    setScheduleForm({
      title: '',
      day: '',
      time: '',
      category: 'Sabat',
      location: 'Gedung Gereja GMAHK Salili',
      description: '',
      leader: '',
      isLiveStreamed: false,
    });
    await refreshAllData();
  };

  // Handle Security Password Update
  const handleUpdateSecurity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername.trim()) {
      showToast('Username tidak boleh kosong');
      return;
    }
    if (newPassword && newPassword !== confirmPassword) {
      showToast('Konfirmasi password tidak cocok');
      return;
    }
    const finalPassword = newPassword.trim() || adminCredentials.passwordHash;
    const ok = await updateAdminCredentials(newUsername.trim(), finalPassword);
    if (ok) {
      setNewPassword('');
      setConfirmPassword('');
      await refreshAllData();
    }
  };

  // Handle Profile Save
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile(profileForm);
    await updateVisiMisi(visiMisiForm);
    await refreshAllData();
  };

  const menuItems: { id: TabType; label: string; icon: any; count?: number }[] = [
    { id: 'overview', label: 'Ringkasan', icon: LayoutDashboard },
    { id: 'articles', label: 'Artikel & Warta', icon: FileText, count: articles.length },
    { id: 'images', label: 'Gambar & Banner', icon: Image, count: heroImages.length },
    { id: 'logo', label: 'Logo Gereja', icon: Flame },
    { id: 'leaders', label: 'Pengurus Gereja', icon: Users, count: leaders.length },
    { id: 'social', label: 'Media Sosial', icon: Share2 },
    { id: 'banks', label: 'Rekening Jemaat', icon: CreditCard, count: bankAccounts.length },
    { id: 'pastoral', label: 'Kontak WA Pastoral', icon: PhoneCall, count: pastoralContacts.length },
    { id: 'prayers', label: 'Permohonan Doa', icon: HeartHandshake, count: prayerRequests.length },
    { id: 'schedules', label: 'Jadwal Ibadah', icon: Calendar, count: schedules.length },
    { id: 'profile', label: 'Profil & Visi Misi', icon: Compass },
    { id: 'security', label: 'Ubah User & Password', icon: KeyRound },
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-100 overflow-hidden animate-fadeIn">
      
      {/* Top Header Bar */}
      <header className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white px-6 py-3.5 flex items-center justify-between shadow-md border-b border-blue-900/40">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-blue-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-white font-display">Dashboard Admin GMAHK Salili</h1>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/30">
                Online
              </span>
            </div>
            <p className="text-[11px] text-blue-200">Siau Tengah, Sitaro — Panel Pengelolaan Website & Media Jemaat</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-blue-100 border border-white/20 transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span>Lihat Website</span>
          </button>

          <button
            onClick={() => {
              logoutAdmin();
              onClose();
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-xs font-semibold text-red-200 border border-red-400/30 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar Admin</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar Navigation */}
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between overflow-y-auto shrink-0 shadow-sm">
          <div className="p-3 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1 block">
              Menu Layanan Admin
            </span>

            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`admin-tab-${item.id}`}
                  onClick={() => {
                    setActiveTab(item.id);
                    setEditingArticle(null);
                    setIsCreatingArticle(false);
                    setEditingLeader(null);
                    setIsAddingLeader(false);
                    setEditingBank(null);
                    setIsAddingBank(false);
                    setEditingPastor(null);
                    setIsAddingPastor(false);
                    setEditingSchedule(null);
                    setIsAddingSchedule(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30 font-bold'
                      : 'text-slate-700 hover:bg-blue-50 hover:text-blue-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-blue-600'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-slate-100 bg-slate-50 space-y-2">
            <div className="text-[11px] text-slate-500">
              <span>Admin: </span>
              <strong className="text-slate-800">{adminCredentials.username}</strong>
            </div>
            <button
              onClick={() => {
                if (window.confirm('Reset semua data ke konfigurasi awal GMAHK Salili?')) {
                  resetAllData();
                }
              }}
              className="w-full flex items-center justify-center gap-1.5 text-[10px] text-slate-500 hover:text-red-600 py-1.5 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Data Default</span>
            </button>
          </div>
        </aside>

        {/* Right Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-8 bg-slate-100">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6 max-w-6xl">
              <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-lg border border-blue-900/60 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="max-w-2xl space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-blue-300 flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-blue-400" />
                    <span>Panel Pengurus & Penyimpanan File Website</span>
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold font-display">
                    {profile.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
                    Data website tersimpan langsung ke file <code className="bg-white/10 px-2 py-0.5 rounded text-blue-200 font-mono">data/church-data.json</code> di dalam folder website. Setiap perubahan di dashboard otomatis tersimpan dan dapat disinkronkan secara permanen.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shrink-0 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-semibold text-white">Status File: Aktif & Tersinkron</span>
                  </div>
                  <div className="text-[11px] text-blue-200">
                    Terakhir disimpan: {lastSavedTime ? new Date(lastSavedTime).toLocaleTimeString('id-ID') : 'Tersinkron'}
                  </div>
                  <button
                    onClick={() => saveAllToFile()}
                    disabled={isSaving}
                    className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold shadow transition-all active:scale-95 disabled:opacity-50"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{isSaving ? 'Menyimpan...' : 'Simpan Semua Data ke File'}</span>
                  </button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div
                  onClick={() => setActiveTab('articles')}
                  className="bg-white p-5 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-2 group"
                >
                  <FileText className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-2xl font-extrabold text-slate-900">{articles.length}</span>
                    <span className="text-xs text-slate-500 block font-medium">Artikel & Warta</span>
                  </div>
                </div>

                <div
                  onClick={() => setActiveTab('prayers')}
                  className="bg-white p-5 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-2 group"
                >
                  <HeartHandshake className="w-6 h-6 text-pink-600 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-2xl font-extrabold text-slate-900">{prayerRequests.length}</span>
                    <span className="text-xs text-slate-500 block font-medium">Permohonan Doa</span>
                  </div>
                </div>

                <div
                  onClick={() => setActiveTab('leaders')}
                  className="bg-white p-5 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-2 group"
                >
                  <Users className="w-6 h-6 text-indigo-600 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-2xl font-extrabold text-slate-900">{leaders.length}</span>
                    <span className="text-xs text-slate-500 block font-medium">Pengurus / Majelis</span>
                  </div>
                </div>

                <div
                  onClick={() => setActiveTab('pastoral')}
                  className="bg-white p-5 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-2 group"
                >
                  <PhoneCall className="w-6 h-6 text-emerald-600 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-2xl font-extrabold text-slate-900">{pastoralContacts.length}</span>
                    <span className="text-xs text-slate-500 block font-medium">Hotline WhatsApp</span>
                  </div>
                </div>
              </div>

              {/* Tool Ringkasan & Profil Cepat */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-blue-900 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span>Tool Ringkasan Profil & Visi Misi Gereja</span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      Ubah ringkasan informasi utama dan simpan langsung ke file website.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      updateProfile(profileForm);
                      updateVisiMisi(visiMisiForm);
                      saveSectionToFile('profile', profileForm, 'Ringkasan profil jemaat berhasil disimpan ke file!');
                      saveSectionToFile('visiMisi', visiMisiForm);
                    }}
                    disabled={isSaving}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow transition-all active:scale-95 disabled:opacity-50 shrink-0"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Simpan Ringkasan ke File</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Nama Jemaat</label>
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Tagline Jemaat</label>
                    <input
                      type="text"
                      value={profileForm.tagline}
                      onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Alamat (Kampung)</label>
                    <input
                      type="text"
                      value={profileForm.village}
                      onChange={(e) => setProfileForm({ ...profileForm, village: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Kecamatan</label>
                    <input
                      type="text"
                      value={profileForm.district}
                      onChange={(e) => setProfileForm({ ...profileForm, district: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Kabupaten</label>
                    <input
                      type="text"
                      value={profileForm.regency}
                      onChange={(e) => setProfileForm({ ...profileForm, regency: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Visi Jemaat</label>
                  <textarea
                    rows={2}
                    value={visiMisiForm.visi}
                    onChange={(e) => setVisiMisiForm({ ...visiMisiForm, visi: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                  />
                </div>
              </div>

              {/* Quick Actions Card */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-4 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-blue-900">
                  Aksi Cepat Pengelolaan
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => {
                      setActiveTab('articles');
                      setIsCreatingArticle(true);
                    }}
                    className="p-4 rounded-2xl bg-blue-50/60 hover:bg-blue-100/70 border border-blue-100 text-left transition-colors flex items-center gap-3"
                  >
                    <Plus className="w-5 h-5 text-blue-700 shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Buat Artikel Baru</span>
                      <span className="text-[11px] text-slate-500">Tulis renungan atau warta sabat</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab('images')}
                    className="p-4 rounded-2xl bg-blue-50/60 hover:bg-blue-100/70 border border-blue-100 text-left transition-colors flex items-center gap-3"
                  >
                    <Image className="w-5 h-5 text-blue-700 shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Upload Gambar & Banner</span>
                      <span className="text-[11px] text-slate-500">Upload file foto gedung & kegiatan</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab('security')}
                    className="p-4 rounded-2xl bg-blue-50/60 hover:bg-blue-100/70 border border-blue-100 text-left transition-colors flex items-center gap-3"
                  >
                    <KeyRound className="w-5 h-5 text-blue-700 shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Ubah Password Admin</span>
                      <span className="text-[11px] text-slate-500">Perbarui username & password</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ARTICLES MANAGEMENT */}
          {activeTab === 'articles' && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Manajemen Artikel & Warta Jemaat</h2>
                  <p className="text-xs text-slate-500">Buat, edit, atau hapus renungan rohani dan warta sabat (tersimpan di file website).</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => saveSectionToFile('articles', articles, 'Seluruh data artikel berhasil disimpan ke file!')}
                    disabled={isSaving}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold border border-blue-200 transition-all active:scale-95 disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    <span>Simpan Artikel ke File</span>
                  </button>
                  {!isCreatingArticle && !editingArticle && (
                    <button
                      onClick={() => {
                        setIsCreatingArticle(true);
                        setArticleForm({
                          title: '',
                          category: 'Renungan',
                          summary: '',
                          content: '',
                          author: profile.name,
                          authorRole: 'Majelis Jemaat',
                          publishDate: new Date().toISOString().split('T')[0],
                          imageUrl: '',
                          readTime: '4 menit',
                          tags: 'Renungan, Sabat',
                          isFeatured: false,
                        });
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Tulis Artikel Baru</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Form Create / Edit */}
              {(isCreatingArticle || editingArticle) && (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-blue-200 shadow-md space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h3 className="text-base font-bold text-slate-900">
                      {editingArticle ? 'Edit Artikel' : 'Tulis Artikel Rohani Baru'}
                    </h3>
                    <button
                      onClick={() => {
                        setIsCreatingArticle(false);
                        setEditingArticle(null);
                      }}
                      className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveArticle} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1">Judul Artikel *</label>
                        <input
                          type="text"
                          required
                          placeholder="Contoh: Menikmati Damai Sabat Sejati..."
                          value={articleForm.title}
                          onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Kategori</label>
                        <select
                          value={articleForm.category}
                          onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value as any })}
                          className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                        >
                          <option value="Renungan">Renungan</option>
                          <option value="Warta Sabat">Warta Sabat</option>
                          <option value="Kesehatan">Kesehatan (NEWSTART)</option>
                          <option value="Pemuda Advent">Pemuda Advent</option>
                          <option value="Berita Jemaat">Berita Jemaat</option>
                          <option value="Sekolah Sabat">Sekolah Sabat</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Ringkasan Singkat *</label>
                      <textarea
                        required
                        rows={2}
                        placeholder="Ringkasan 1-2 kalimat..."
                        value={articleForm.summary}
                        onChange={(e) => setArticleForm({ ...articleForm, summary: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Isi Lengkap Artikel *</label>
                      <textarea
                        required
                        rows={7}
                        placeholder="Tuliskan renungan, pesan firman Tuhan, atau pengumuman warta secara lengkap..."
                        value={articleForm.content}
                        onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })}
                        className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none font-sans"
                      />
                    </div>

                    {/* Image Upload for Article */}
                    <ImageUploadField
                      label="Foto Sampul / Gambar Header Artikel"
                      value={articleForm.imageUrl}
                      onChange={(url) => setArticleForm({ ...articleForm, imageUrl: url })}
                      recommendedSize="1200 x 630 px (Rasio 16:9)"
                      helpText="Upload file gambar artikel langsung dari komputer/HP Anda atau masukkan link gambar."
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Nama Penulis</label>
                        <input
                          type="text"
                          required
                          value={articleForm.author}
                          onChange={(e) => setArticleForm({ ...articleForm, author: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Jabatan Penulis</label>
                        <input
                          type="text"
                          placeholder="Gembala / Majelis Jemaat"
                          value={articleForm.authorRole}
                          onChange={(e) => setArticleForm({ ...articleForm, authorRole: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Tanggal Publikasi</label>
                        <input
                          type="date"
                          value={articleForm.publishDate}
                          onChange={(e) => setArticleForm({ ...articleForm, publishDate: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Tags (Pisahkan dengan koma)</label>
                        <input
                          type="text"
                          placeholder="Sabat, Doa, Kesehatan"
                          value={articleForm.tags}
                          onChange={(e) => setArticleForm({ ...articleForm, tags: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                      <div className="flex items-center gap-2 pt-6">
                        <input
                          type="checkbox"
                          id="featured-check"
                          checked={articleForm.isFeatured}
                          onChange={(e) => setArticleForm({ ...articleForm, isFeatured: e.target.checked })}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <label htmlFor="featured-check" className="text-xs font-semibold text-slate-700">
                          Jadikan Artikel Pilihan (Featured)
                        </label>
                      </div>
                    </div>

                    <div className="pt-3 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsCreatingArticle(false);
                          setEditingArticle(null);
                        }}
                        className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm"
                      >
                        {editingArticle ? 'Simpan Perubahan' : 'Terbitkan Artikel'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* List of Articles */}
              <div className="space-y-3">
                {articles.map((art) => (
                  <div
                    key={art.id}
                    className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={art.imageUrl}
                        alt={art.title}
                        className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md">
                            {art.category}
                          </span>
                          <span className="text-[11px] text-slate-400">{art.publishDate}</span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{art.title}</h4>
                        <span className="text-xs text-slate-500">Oleh: {art.author}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <button
                        onClick={() => startEditArticle(art)}
                        className="p-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors text-xs font-semibold flex items-center gap-1"
                        title="Edit Artikel"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Hapus artikel "${art.title}"?`)) {
                            deleteArticle(art.id);
                          }
                        }}
                        className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                        title="Hapus Artikel"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: IMAGES & BANNER */}
          {activeTab === 'images' && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Tampilan Gambar & Banner Website</h2>
                  <p className="text-xs text-slate-500">
                    Upload gambar gedung gereja langsung dari file komputer/HP Anda atau gunakan link URL (tersimpan di file website).
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => saveSectionToFile('heroImages', heroImages, 'Pengaturan banner website berhasil disimpan ke file!')}
                    disabled={isSaving}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold border border-blue-200 transition-all active:scale-95 disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    <span>Simpan Banner ke File</span>
                  </button>
                  {!isAddingImage && (
                    <button
                      onClick={() => setIsAddingImage(true)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Upload Banner Baru</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Add Image Form */}
              {isAddingImage && (
                <div className="bg-white rounded-3xl p-6 border border-blue-200 shadow-md space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Upload className="w-4 h-4 text-blue-600" />
                      <span>Upload & Tambah Gambar Banner Baru</span>
                    </h3>
                    <button
                      onClick={() => setIsAddingImage(false)}
                      className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form onSubmit={handleAddHeroImage} className="space-y-4">
                    {/* File Upload Field with Live Local Storage Persistence */}
                    <ImageUploadField
                      label="Pilih File Gambar Banner"
                      value={imageForm.imageUrl}
                      onChange={(url) => setImageForm({ ...imageForm, imageUrl: url })}
                      required={true}
                      recommendedSize="1920 x 1080 px (Landscape / Rasio 16:9)"
                      helpText="Gambar akan disimpan ke penyimpanan lokal website dan langsung tayang pada slider beranda."
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Judul Teks Banner</label>
                        <input
                          type="text"
                          placeholder="GMAHK Salili Siau Tengah"
                          value={imageForm.title}
                          onChange={(e) => setImageForm({ ...imageForm, title: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Label Badge Banner</label>
                        <input
                          type="text"
                          placeholder="Selamat Datang di GMAHK Salili"
                          value={imageForm.badgeText}
                          onChange={(e) => setImageForm({ ...imageForm, badgeText: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Subjudul / Deskripsi Banner</label>
                      <input
                        type="text"
                        placeholder="Persekutuan Umat Advent di Kepulauan Sitaro..."
                        value={imageForm.subtitle}
                        onChange={(e) => setImageForm({ ...imageForm, subtitle: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsAddingImage(false)}
                        className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm"
                      >
                        Simpan & Tampilkan Banner
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Images Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {heroImages.map((img) => (
                  <div
                    key={img.id}
                    className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between hover:border-blue-300 transition-all group"
                  >
                    <div className="relative h-48 bg-slate-100">
                      <img
                        src={img.imageUrl}
                        alt={img.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      {img.isPrimary && (
                        <span className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          <span>Utama (Active Primary)</span>
                        </span>
                      )}
                    </div>
                    <div className="p-4 space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 block">
                        {img.badgeText}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{img.title}</h4>
                      <p className="text-xs text-slate-500 line-clamp-2">{img.subtitle}</p>
                    </div>
                    <div className="p-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                      {!img.isPrimary ? (
                        <button
                          onClick={() => setPrimaryHeroImage(img.id)}
                          className="text-xs text-blue-700 font-bold hover:underline"
                        >
                          Jadikan Gambar Utama
                        </button>
                      ) : (
                        <span className="text-[11px] text-emerald-600 font-semibold">Tampil Pertama</span>
                      )}
                      {heroImages.length > 1 && (
                        <button
                          onClick={() => {
                            if (window.confirm('Hapus gambar banner ini?')) {
                              deleteHeroImage(img.id);
                            }
                          }}
                          className="text-xs text-red-600 hover:text-red-700 p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                          title="Hapus Banner"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: LOGO CONFIG */}
          {activeTab === 'logo' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Pengaturan Logo Website Gereja</h2>
                <p className="text-xs text-slate-500">
                  Pilih antara Logo Resmi GMAHK (Vector Emblem Alkitab & Salib) atau Upload Gambar Logo Sendiri dari file komputer/HP.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                {/* Live Dual Preview Box (Light & Dark) */}
                <div className="space-y-2">
                  <span className="text-[11px] uppercase font-bold text-slate-500 tracking-wider block">
                    Preview Langsung Logo Website (Navbar & Footer)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Dark Preview */}
                    <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white flex flex-col items-center justify-center gap-2 border border-blue-900/60 shadow-inner">
                      <span className="text-[10px] text-blue-300 font-semibold uppercase tracking-wider">Preview di Navbar / Header Gelap</span>
                      <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20">
                        <GMAHKLogo config={logoForm} size="md" variant="light" />
                      </div>
                    </div>
                    {/* Light Preview */}
                    <div className="p-5 rounded-2xl bg-white text-slate-900 flex flex-col items-center justify-center gap-2 border border-blue-200 shadow-inner">
                      <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Preview di Latar Belakang Terang</span>
                      <div className="p-3 bg-blue-50/60 rounded-2xl border border-blue-100">
                        <GMAHKLogo config={logoForm} size="md" variant="dark" />
                      </div>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSaveLogo} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">Pilihan Tipe Logo</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setLogoForm({ ...logoForm, activeType: 'official_gmahk' })}
                        className={`p-4 rounded-2xl border text-left transition-all ${
                          logoForm.activeType === 'official_gmahk'
                            ? 'border-blue-600 bg-blue-50/80 text-blue-950 font-bold ring-2 ring-blue-500/20'
                            : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <span className="block text-sm">Logo Resmi GMAHK (SVG)</span>
                        <span className="text-[11px] text-slate-500 font-normal mt-0.5 block">
                          Lambang Alkitab Terbuka, Salib Kristus & Tiga Lidah Api Roh Kudus (Rekomendasi Organisasi)
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setLogoForm({ ...logoForm, activeType: 'custom' })}
                        className={`p-4 rounded-2xl border text-left transition-all ${
                          logoForm.activeType === 'custom'
                            ? 'border-blue-600 bg-blue-50/80 text-blue-950 font-bold ring-2 ring-blue-500/20'
                            : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <span className="block text-sm">Upload File Logo Sendiri / Custom Logo</span>
                        <span className="text-[11px] text-slate-500 font-normal mt-0.5 block">
                          Upload file gambar logo khusus jemaat dari komputer/HP atau gunakan URL
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* File Upload Field for Custom Logo */}
                  {logoForm.activeType === 'custom' && (
                    <div className="p-4 bg-blue-50/40 rounded-2xl border border-blue-100 space-y-3">
                      <ImageUploadField
                        label="Upload File Gambar Logo Gereja"
                        value={logoForm.customLogoUrl || ''}
                        onChange={(url) => setLogoForm({ ...logoForm, customLogoUrl: url })}
                        recommendedSize="512 x 512 px (Format PNG Transparan / Square 1:1)"
                        helpText="File gambar logo akan disimpan di penyimpanan website dan digunakan di seluruh halaman."
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Teks Nama Logo</label>
                      <input
                        type="text"
                        value={logoForm.logoText}
                        onChange={(e) => setLogoForm({ ...logoForm, logoText: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Subteks Lokasi Logo</label>
                      <input
                        type="text"
                        value={logoForm.logoSubtitle}
                        onChange={(e) => setLogoForm({ ...logoForm, logoSubtitle: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="show-text-check"
                      checked={logoForm.showText}
                      onChange={(e) => setLogoForm({ ...logoForm, showText: e.target.checked })}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <label htmlFor="show-text-check" className="text-xs font-semibold text-slate-700">
                      Tampilkan Nama Teks di Samping Lambang Logo
                    </label>
                  </div>

                  <div className="pt-3">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm"
                    >
                      Simpan Pengaturan Logo
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* TAB 5: LEADERS (PENGURUS) */}
          {activeTab === 'leaders' && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Manajemen Pengurus Gereja</h2>
                  <p className="text-xs text-slate-500">Tambah, ubah data, upload foto, atau hapus majelis jemaat (tersimpan di file website).</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => saveSectionToFile('leaders', leaders, 'Data pengurus jemaat berhasil disimpan ke file!')}
                    disabled={isSaving}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold border border-blue-200 transition-all active:scale-95 disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    <span>Simpan Pengurus ke File</span>
                  </button>
                  {!isAddingLeader && !editingLeader && (
                    <button
                      onClick={() => {
                        setIsAddingLeader(true);
                        setLeaderForm({
                          name: '',
                          role: '',
                          department: 'Majelis Jemaat',
                          period: '2024 - 2026',
                          phone: '',
                          photoUrl: '',
                          bio: '',
                        });
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Tambah Pengurus</span>
                    </button>
                  )}
                </div>
              </div>

              {(isAddingLeader || editingLeader) && (
                <div className="bg-white rounded-3xl p-6 border border-blue-200 shadow-md space-y-4">
                  <h3 className="text-sm font-bold text-slate-900">
                    {editingLeader ? 'Edit Data Pengurus' : 'Tambah Pengurus Gereja Baru'}
                  </h3>
                  <form onSubmit={handleSaveLeader} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap *</label>
                        <input
                          type="text"
                          required
                          placeholder="Nama lengkap beserta gelar..."
                          value={leaderForm.name}
                          onChange={(e) => setLeaderForm({ ...leaderForm, name: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Jabatan / Role *</label>
                        <input
                          type="text"
                          required
                          placeholder="Contoh: Ketua Jemaat / Sekretaris"
                          value={leaderForm.role}
                          onChange={(e) => setLeaderForm({ ...leaderForm, role: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Departemen</label>
                        <input
                          type="text"
                          placeholder="Majelis / Diakonat / Pemuda"
                          value={leaderForm.department}
                          onChange={(e) => setLeaderForm({ ...leaderForm, department: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Periode Pelayanan</label>
                        <input
                          type="text"
                          value={leaderForm.period}
                          onChange={(e) => setLeaderForm({ ...leaderForm, period: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Nomor Telepon / HP</label>
                        <input
                          type="text"
                          value={leaderForm.phone}
                          onChange={(e) => setLeaderForm({ ...leaderForm, phone: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Upload Photo for Leader */}
                    <ImageUploadField
                      label="Upload Foto Pengurus Gereja"
                      value={leaderForm.photoUrl}
                      onChange={(url) => setLeaderForm({ ...leaderForm, photoUrl: url })}
                      recommendedSize="400 x 400 px (Square / Pas Foto)"
                    />

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Bio Singkat / Visi Pelayanan</label>
                      <textarea
                        rows={2}
                        value={leaderForm.bio}
                        onChange={(e) => setLeaderForm({ ...leaderForm, bio: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingLeader(false);
                          setEditingLeader(null);
                        }}
                        className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold"
                      >
                        Simpan Pengurus
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {leaders.map((lead) => (
                  <div
                    key={lead.id}
                    className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={lead.photoUrl}
                        alt={lead.name}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{lead.name}</h4>
                        <span className="text-[11px] text-blue-700 font-semibold block">{lead.role}</span>
                        <span className="text-[10px] text-slate-400">{lead.department} ({lead.period})</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => {
                          setEditingLeader(lead);
                          setLeaderForm({
                            name: lead.name,
                            role: lead.role,
                            department: lead.department,
                            period: lead.period,
                            phone: lead.phone,
                            photoUrl: lead.photoUrl,
                            bio: lead.bio || '',
                          });
                        }}
                        className="p-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100"
                        title="Edit"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Hapus pengurus ${lead.name}?`)) {
                            deleteLeader(lead.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                        title="Hapus"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: SOCIAL MEDIA LINKS */}
          {activeTab === 'social' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Pengaturan Tautan Media Sosial</h2>
                <p className="text-xs text-slate-500">Ubah link Facebook, Instagram, YouTube, TikTok, dan Grup Komunitas jemaat.</p>
              </div>

              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                <form onSubmit={handleSaveSocial} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Link Facebook</label>
                    <input
                      type="url"
                      placeholder="https://facebook.com/..."
                      value={socialForm.facebook}
                      onChange={(e) => setSocialForm({ ...socialForm, facebook: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Link Instagram</label>
                    <input
                      type="url"
                      placeholder="https://instagram.com/..."
                      value={socialForm.instagram}
                      onChange={(e) => setSocialForm({ ...socialForm, instagram: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Link YouTube Channel</label>
                    <input
                      type="url"
                      placeholder="https://youtube.com/@..."
                      value={socialForm.youtube}
                      onChange={(e) => setSocialForm({ ...socialForm, youtube: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Link TikTok</label>
                    <input
                      type="url"
                      placeholder="https://tiktok.com/@..."
                      value={socialForm.tiktok}
                      onChange={(e) => setSocialForm({ ...socialForm, tiktok: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Link Grup Komunitas WhatsApp</label>
                    <input
                      type="url"
                      placeholder="https://chat.whatsapp.com/..."
                      value={socialForm.whatsappGroup || ''}
                      onChange={(e) => setSocialForm({ ...socialForm, whatsappGroup: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="pt-3">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm"
                    >
                      Simpan Link Media Sosial
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* TAB 7: BANK ACCOUNTS (REKENING JEMAAT) */}
          {activeTab === 'banks' && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Rekening Persembahan & Perpuluhan</h2>
                  <p className="text-xs text-slate-500">Tambah, edit, atau hapus nomor rekening bank persembahan (tersimpan di file website).</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => saveSectionToFile('bankAccounts', bankAccounts, 'Pengaturan rekening bank berhasil disimpan ke file!')}
                    disabled={isSaving}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold border border-blue-200 transition-all active:scale-95 disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    <span>Simpan Rekening ke File</span>
                  </button>
                  {!isAddingBank && !editingBank && (
                    <button
                      onClick={() => {
                        setIsAddingBank(true);
                        setBankForm({
                          bankName: '',
                          accountNumber: '',
                          accountHolder: profile.name,
                          purpose: 'Perpuluhan',
                          instructions: '',
                        });
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Tambah Rekening Bank</span>
                    </button>
                  )}
                </div>
              </div>

              {(isAddingBank || editingBank) && (
                <div className="bg-white rounded-3xl p-6 border border-blue-200 shadow-md space-y-4">
                  <h3 className="text-sm font-bold text-slate-900">
                    {editingBank ? 'Edit Data Rekening' : 'Tambah Rekening Bank Baru'}
                  </h3>
                  <form onSubmit={handleSaveBank} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Nama Bank *</label>
                        <input
                          type="text"
                          required
                          placeholder="Bank BRI / SulutGo / Mandiri..."
                          value={bankForm.bankName}
                          onChange={(e) => setBankForm({ ...bankForm, bankName: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Peruntukan Dana</label>
                        <select
                          value={bankForm.purpose}
                          onChange={(e) => setBankForm({ ...bankForm, purpose: e.target.value as any })}
                          className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                        >
                          <option value="Perpuluhan">Perpuluhan</option>
                          <option value="Persembahan Jemaat">Persembahan Jemaat</option>
                          <option value="Pembangunan Gedung Gereja">Pembangunan Gedung Gereja</option>
                          <option value="Kas Diakonat / Kemanusiaan">Kas Diakonat / Kemanusiaan</option>
                          <option value="Umum">Umum</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Nomor Rekening *</label>
                        <input
                          type="text"
                          required
                          placeholder="5123-01-..."
                          value={bankForm.accountNumber}
                          onChange={(e) => setBankForm({ ...bankForm, accountNumber: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Atas Nama *</label>
                        <input
                          type="text"
                          required
                          placeholder="GMAHK JEMAAT SALILI..."
                          value={bankForm.accountHolder}
                          onChange={(e) => setBankForm({ ...bankForm, accountHolder: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Petunjuk / Keterangan Transfer</label>
                      <textarea
                        rows={2}
                        placeholder="Petunjuk khusus atau keterangan..."
                        value={bankForm.instructions}
                        onChange={(e) => setBankForm({ ...bankForm, instructions: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingBank(false);
                          setEditingBank(null);
                        }}
                        className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold"
                      >
                        Simpan Rekening
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="space-y-3">
                {bankAccounts.map((b) => (
                  <div
                    key={b.id}
                    className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md">
                          {b.purpose}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900">{b.bankName}</h4>
                      </div>
                      <p className="text-base font-mono font-bold text-blue-900 mt-1">{b.accountNumber}</p>
                      <span className="text-xs text-slate-500">A/N: {b.accountHolder}</span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                      <button
                        onClick={() => {
                          setEditingBank(b);
                          setBankForm({
                            bankName: b.bankName,
                            accountNumber: b.accountNumber,
                            accountHolder: b.accountHolder,
                            purpose: b.purpose,
                            instructions: b.instructions,
                          });
                        }}
                        className="p-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-semibold flex items-center gap-1"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Hapus rekening ${b.bankName}?`)) {
                            deleteBankAccount(b.id);
                          }
                        }}
                        className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: PASTORAL CONTACTS (WHATSAPP HOTLINE) */}
          {activeTab === 'pastoral' && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Kontak Pelayanan Pastoral WhatsApp</h2>
                  <p className="text-xs text-slate-500">
                    Kelola kontak langsung pendeta dan pengurus yang terhubung ke WhatsApp (tersimpan di file website).
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => saveSectionToFile('pastoralContacts', pastoralContacts, 'Kontak pelayanan pastoral berhasil disimpan ke file!')}
                    disabled={isSaving}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-bold border border-emerald-200 transition-all active:scale-95 disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    <span>Simpan Kontak ke File</span>
                  </button>
                  {!isAddingPastor && !editingPastor && (
                    <button
                      onClick={() => {
                        setIsAddingPastor(true);
                        setPastorForm({
                          name: '',
                          role: 'Pendeta Jemaat',
                          whatsappNumber: '62812...',
                          photoUrl: '',
                          serviceFocus: 'Konseling & Doa',
                          availableHours: '08.00 - 18.00 WITA',
                          welcomeMessage: 'Halo salam damai Sabat, saya ingin berkonsultasi...',
                        });
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Tambah Kontak Pastoral</span>
                    </button>
                  )}
                </div>
              </div>

              {(isAddingPastor || editingPastor) && (
                <div className="bg-white rounded-3xl p-6 border border-emerald-200 shadow-md space-y-4">
                  <h3 className="text-sm font-bold text-slate-900">
                    {editingPastor ? 'Edit Kontak Pastoral' : 'Tambah Kontak Pastoral WhatsApp Baru'}
                  </h3>
                  <form onSubmit={handleSavePastoral} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap *</label>
                        <input
                          type="text"
                          required
                          placeholder="Pdt. / Bpk. ..."
                          value={pastorForm.name}
                          onChange={(e) => setPastorForm({ ...pastorForm, name: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Jabatan / Peran Pastoral *</label>
                        <input
                          type="text"
                          required
                          placeholder="Pendeta Jemaat / Ketua Jemaat"
                          value={pastorForm.role}
                          onChange={(e) => setPastorForm({ ...pastorForm, role: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Nomor WhatsApp (Awali 62 tanpa + atau spasi) *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="6281244558899"
                          value={pastorForm.whatsappNumber}
                          onChange={(e) => setPastorForm({ ...pastorForm, whatsappNumber: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Jam Pelayanan</label>
                        <input
                          type="text"
                          placeholder="Setiap hari (08.00 - 18.00 WITA)"
                          value={pastorForm.availableHours}
                          onChange={(e) => setPastorForm({ ...pastorForm, availableHours: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Fokus Pelayanan</label>
                      <input
                        type="text"
                        placeholder="Konseling pernikahan, doa syafaat, bimbingan baptisan..."
                        value={pastorForm.serviceFocus}
                        onChange={(e) => setPastorForm({ ...pastorForm, serviceFocus: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Template Pesan WhatsApp Otomatis</label>
                      <input
                        type="text"
                        placeholder="Halo salam damai Sabat..."
                        value={pastorForm.welcomeMessage}
                        onChange={(e) => setPastorForm({ ...pastorForm, welcomeMessage: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>

                    {/* Upload Photo for Pastor */}
                    <ImageUploadField
                      label="Upload Foto Pelayan Pastoral"
                      value={pastorForm.photoUrl}
                      onChange={(url) => setPastorForm({ ...pastorForm, photoUrl: url })}
                      recommendedSize="400 x 400 px (Square / Pas Foto)"
                    />

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingPastor(false);
                          setEditingPastor(null);
                        }}
                        className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
                      >
                        Simpan Kontak Pastoral
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pastoralContacts.map((c) => (
                  <div
                    key={c.id}
                    className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={c.photoUrl}
                        alt={c.name}
                        className="w-12 h-12 rounded-xl object-cover border border-emerald-300 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{c.name}</h4>
                        <span className="text-[11px] text-emerald-700 font-semibold block">{c.role}</span>
                        <span className="text-[10px] text-slate-500 font-mono">WA: +{c.whatsappNumber}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => {
                          setEditingPastor(c);
                          setPastorForm({
                            name: c.name,
                            role: c.role,
                            whatsappNumber: c.whatsappNumber,
                            photoUrl: c.photoUrl,
                            serviceFocus: c.serviceFocus,
                            availableHours: c.availableHours,
                            welcomeMessage: c.welcomeMessage,
                          });
                        }}
                        className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Hapus kontak ${c.name}?`)) {
                            deletePastoralContact(c.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: PRAYER REQUESTS MANAGEMENT */}
          {activeTab === 'prayers' && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Kelola Permohonan Doa Jemaat</h2>
                  <p className="text-xs text-slate-500">Tinjau pokok doa yang masuk dari jemaat dan perbarui status pendoaan (tersimpan di file website).</p>
                </div>
                <div>
                  <button
                    onClick={() => saveSectionToFile('prayerRequests', prayerRequests, 'Data permohonan doa berhasil disimpan ke file!')}
                    disabled={isSaving}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-pink-50 text-pink-700 hover:bg-pink-100 text-xs font-bold border border-pink-200 transition-all active:scale-95 disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    <span>Simpan Pokok Doa ke File</span>
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {prayerRequests.map((prayer) => (
                  <div
                    key={prayer.id}
                    className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">{prayer.name}</span>
                        <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">
                          {prayer.category}
                        </span>
                        {prayer.isPrivate && (
                          <span className="text-[10px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Lock className="w-2.5 h-2.5" />
                            <span>Privat Pastoral</span>
                          </span>
                        )}
                      </div>

                      <span className="text-xs text-slate-400">
                        {new Date(prayer.createdAt).toLocaleDateString('id-ID', { dateStyle: 'medium' })}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed italic">
                      "{prayer.content}"
                    </p>

                    {prayer.phone && prayer.phone !== '-' && (
                      <div className="text-[11px] text-slate-500">
                        Kontak WhatsApp: <strong className="text-slate-800">{prayer.phone}</strong>
                      </div>
                    )}

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-slate-600">Ubah Status:</span>
                        <button
                          onClick={async () => {
                            await updatePrayerStatus(prayer.id, 'pending');
                            await refreshAllData();
                          }}
                          className={`text-[10px] px-2.5 py-1 rounded-full font-bold transition-colors ${
                            prayer.status === 'pending'
                              ? 'bg-amber-500 text-white'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          Pergumulan
                        </button>
                        <button
                          onClick={async () => {
                            await updatePrayerStatus(prayer.id, 'prayed');
                            await refreshAllData();
                          }}
                          className={`text-[10px] px-2.5 py-1 rounded-full font-bold transition-colors ${
                            prayer.status === 'prayed'
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          Sedang Didoakan
                        </button>
                        <button
                          onClick={async () => {
                            await updatePrayerStatus(prayer.id, 'answered');
                            await refreshAllData();
                          }}
                          className={`text-[10px] px-2.5 py-1 rounded-full font-bold transition-colors ${
                            prayer.status === 'answered'
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          Jawaban Doa ✨
                        </button>
                      </div>

                      <button
                        onClick={async () => {
                          if (window.confirm('Hapus permohonan doa ini?')) {
                            await deletePrayerRequest(prayer.id);
                            await refreshAllData();
                          }
                        }}
                        className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Hapus</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 10: WORSHIP SCHEDULES */}
          {activeTab === 'schedules' && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Jadwal Kebaktian & Persekutuan</h2>
                  <p className="text-xs text-slate-500">Kelola jam dan rincian acara ibadah sabat dan doa (tersimpan di file website).</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => saveSectionToFile('schedules', schedules, 'Jadwal ibadah jemaat berhasil disimpan ke file!')}
                    disabled={isSaving}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold border border-blue-200 transition-all active:scale-95 disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    <span>Simpan Jadwal ke File</span>
                  </button>
                  {!isAddingSchedule && !editingSchedule && (
                    <button
                      onClick={() => {
                        setIsAddingSchedule(true);
                        setScheduleForm({
                          title: '',
                          day: 'Hari Sabat (Sabtu)',
                          time: '09:00 WITA',
                          category: 'Sabat',
                          location: 'Gedung Gereja GMAHK Salili',
                          description: '',
                          leader: '',
                          isLiveStreamed: false,
                        });
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Tambah Jadwal Ibadah</span>
                    </button>
                  )}
                </div>
              </div>

              {(isAddingSchedule || editingSchedule) && (
                <div className="bg-white rounded-3xl p-6 border border-blue-200 shadow-md space-y-4">
                  <h3 className="text-sm font-bold text-slate-900">
                    {editingSchedule ? 'Edit Jadwal Kebaktian' : 'Tambah Jadwal Baru'}
                  </h3>
                  <form onSubmit={handleSaveSchedule} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Nama Kebaktian *</label>
                        <input
                          type="text"
                          required
                          placeholder="Sekolah Sabat..."
                          value={scheduleForm.title}
                          onChange={(e) => setScheduleForm({ ...scheduleForm, title: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Hari *</label>
                        <input
                          type="text"
                          required
                          placeholder="Hari Sabat (Sabtu)"
                          value={scheduleForm.day}
                          onChange={(e) => setScheduleForm({ ...scheduleForm, day: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Jam Waktu *</label>
                        <input
                          type="text"
                          required
                          placeholder="09:00 - 10:15 WITA"
                          value={scheduleForm.time}
                          onChange={(e) => setScheduleForm({ ...scheduleForm, time: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Lokasi</label>
                        <input
                          type="text"
                          value={scheduleForm.location}
                          onChange={(e) => setScheduleForm({ ...scheduleForm, location: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Pemimpin / Koordinator</label>
                        <input
                          type="text"
                          placeholder="Pemimpin Sekolah Sabat / Majelis"
                          value={scheduleForm.leader}
                          onChange={(e) => setScheduleForm({ ...scheduleForm, leader: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Deskripsi Kegiatan</label>
                      <textarea
                        rows={2}
                        value={scheduleForm.description}
                        onChange={(e) => setScheduleForm({ ...scheduleForm, description: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="live-check"
                        checked={scheduleForm.isLiveStreamed}
                        onChange={(e) => setScheduleForm({ ...scheduleForm, isLiveStreamed: e.target.checked })}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                      <label htmlFor="live-check" className="text-xs font-semibold text-slate-700">
                        Tersedia Siaran Langsung (Live Stream Hybrid)
                      </label>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingSchedule(false);
                          setEditingSchedule(null);
                        }}
                        className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold"
                      >
                        Simpan Jadwal
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="space-y-3">
                {schedules.map((sch) => (
                  <div
                    key={sch.id}
                    className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full">
                          {sch.day}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900">{sch.title}</h4>
                      </div>
                      <span className="text-xs font-bold text-blue-700 block mt-1">{sch.time}</span>
                      <span className="text-[11px] text-slate-500">{sch.location}</span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => {
                          setEditingSchedule(sch);
                          setScheduleForm({
                            title: sch.title,
                            day: sch.day,
                            time: sch.time,
                            category: sch.category,
                            location: sch.location,
                            description: sch.description,
                            leader: sch.leader || '',
                            isLiveStreamed: Boolean(sch.isLiveStreamed),
                          });
                        }}
                        className="p-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-semibold"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Hapus jadwal "${sch.title}"?`)) {
                            deleteSchedule(sch.id);
                          }
                        }}
                        className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 11: PROFILE & VISI MISI */}
          {activeTab === 'profile' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Profil Gereja, Visi & Misi</h2>
                <p className="text-xs text-slate-500">Ubah alamat, kontak kantor, deskripsi sejarah, dan visi misi jemaat.</p>
              </div>

              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Nama Jemaat *</label>
                      <input
                        type="text"
                        required
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Tagline Jemaat</label>
                      <input
                        type="text"
                        value={profileForm.tagline}
                        onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Deskripsi Singkat</label>
                    <textarea
                      rows={2}
                      value={profileForm.shortDescription}
                      onChange={(e) => setProfileForm({ ...profileForm, shortDescription: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Kampung / Desa</label>
                      <input
                        type="text"
                        value={profileForm.village}
                        onChange={(e) => setProfileForm({ ...profileForm, village: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Kecamatan</label>
                      <input
                        type="text"
                        value={profileForm.district}
                        onChange={(e) => setProfileForm({ ...profileForm, district: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Kabupaten</label>
                      <input
                        type="text"
                        value={profileForm.regency}
                        onChange={(e) => setProfileForm({ ...profileForm, regency: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Nomor Telepon Sekretariat</label>
                      <input
                        type="text"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Email Jemaat</label>
                      <input
                        type="email"
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Visi Jemaat</label>
                    <textarea
                      rows={2}
                      value={visiMisiForm.visi}
                      onChange={(e) => setVisiMisiForm({ ...visiMisiForm, visi: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Motto Jemaat</label>
                    <input
                      type="text"
                      value={visiMisiForm.motto}
                      onChange={(e) => setVisiMisiForm({ ...visiMisiForm, motto: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="pt-3">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm"
                    >
                      Simpan Profil & Visi Misi
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* TAB 12: SECURITY / CHANGE USERNAME & PASSWORD */}
          {activeTab === 'security' && (
            <div className="space-y-6 max-w-xl">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Ubah Username & Password Admin</h2>
                <p className="text-xs text-slate-500">
                  Amankan dashboard pengurus dengan memperbarui kredensial masuk admin sesuai kebutuhan Anda.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
                <form onSubmit={handleUpdateSecurity} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Username Admin *</label>
                    <input
                      type="text"
                      required
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Password Baru</label>
                    <input
                      type="password"
                      placeholder="Masukkan password baru"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Konfirmasi Password Baru</label>
                    <input
                      type="password"
                      placeholder="Ulangi password baru"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="bg-blue-50 p-3.5 rounded-xl border border-blue-100 text-[11px] text-blue-900 space-y-1">
                    <span className="font-bold block flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-blue-600" />
                      <span>Info Keamanan Admin:</span>
                    </span>
                    <p className="leading-relaxed">
                      Setelah disimpan, gunakan username dan password baru ini saat masuk berikutnya. Kredensial tidak akan ditampilkan di layar login demi keamanan Anda.
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition-all active:scale-95"
                    >
                      Simpan Perubahan Username & Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
};