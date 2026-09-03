export interface ChurchProfile {
  name: string;
  denomination: string;
  tagline: string;
  shortDescription: string;
  fullHistory: string;
  address: string;
  village: string; // Kampung Salili
  district: string; // Kecamatan Siau Tengah
  regency: string; // Kabupaten Kepulauan Siau Tagulandang Biaro (SITARO)
  province: string; // Sulawesi Utara
  postalCode: string;
  googleMapsEmbedUrl: string;
  googleMapsDirectUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  email: string;
  phone: string;
  conference: string; // Uni/Konferens/Daerah Misi
}

export interface ChurchLogoConfig {
  activeType: 'official_gmahk' | 'custom';
  customLogoUrl: string;
  logoText: string;
  logoSubtitle: string;
  showText: boolean;
}

export interface HeroImage {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  badgeText?: string;
  isPrimary: boolean;
}

export interface VisiMisiData {
  visi: string;
  misi: string[];
  motto: string;
  coreValues: {
    title: string;
    description: string;
    icon: string;
  }[];
  bibleVerse: {
    text: string;
    reference: string;
  };
}

export interface WorshipSchedule {
  id: string;
  title: string;
  day: string;
  time: string;
  category: 'Sabat' | 'Tengah Minggu' | 'Pemuda' | 'Doa';
  location: string;
  description: string;
  leader?: string;
  isLiveStreamed?: boolean;
}

export interface ChurchArticle {
  id: string;
  title: string;
  slug: string;
  category: 'Renungan' | 'Warta Sabat' | 'Berita Jemaat' | 'Kesehatan' | 'Pemuda Advent' | 'Sekolah Sabat';
  summary: string;
  content: string;
  author: string;
  authorRole: string;
  publishDate: string;
  imageUrl: string;
  readTime: string;
  tags: string[];
  isFeatured?: boolean;
}

export interface PrayerRequest {
  id: string;
  name: string;
  phone: string;
  category: 'Kesehatan / Kesembuhan' | 'Keluarga' | 'Pekerjaan & Usaha' | 'Studi / Pendidikan' | 'Pertumbuhan Rohani' | 'Ucapan Syukur' | 'Lainnya';
  isPrivate: boolean; // if true, only pastoral team sees it; if false, shown on public prayer wall
  content: string;
  createdAt: string;
  status: 'pending' | 'prayed' | 'answered';
  prayerCount: number;
  pastoralNotes?: string;
}

export interface ChurchLeader {
  id: string;
  name: string;
  role: string;
  department: string;
  period: string; // e.g. "2024 - 2026"
  phone: string;
  photoUrl: string;
  bio?: string;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  purpose: 'Perpuluhan' | 'Persembahan Jemaat' | 'Pembangunan Gedung Gereja' | 'Kas Diakonat / Kemanusiaan' | 'Umum';
  instructions: string;
  qrisImageUrl?: string;
}

export interface PastoralContact {
  id: string;
  name: string;
  role: string; // e.g. "Pendeta Jemaat", "Ketua Jemaat", "Ketua Diaken", "Pelayanan Konseling"
  whatsappNumber: string; // international format without + (e.g. "6281234567890")
  photoUrl: string;
  serviceFocus: string;
  availableHours: string;
  welcomeMessage: string;
}

export interface SocialLinks {
  facebook: string;
  instagram: string;
  youtube: string;
  tiktok: string;
  whatsappGroup?: string;
}

export interface AdminCredentials {
  username: string;
  passwordHash: string; // plain or base64 for client side storage
  lastUpdated: string;
}
