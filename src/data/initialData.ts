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

export const initialProfile: ChurchProfile = {
  name: 'GMAHK Jemaat Salili Siau Tengah',
  denomination: 'Gereja Masehi Advent Hari Ketujuh',
  tagline: 'Mewartakan Kasih Karunia & Pengharapan Kedatangan Yesus yang Segera di Kepulauan Sitaro',
  shortDescription:
    'Selamat datang di persekutuan jemaat GMAHK Salili, sebuah komunitas orang percaya yang berpusat pada Alkitab, berbakti dalam kekudusan hari Sabat, dan melayani sesama dengan kasih Kristus di Pulau Siau.',
  fullHistory:
    'Gereja Masehi Advent Hari Ketujuh Jemaat Salili berlokasi di Kampung Salili, Kecamatan Siau Tengah, Kabupaten Kepulauan Sitaro, Sulawesi Utara. Berada di bawah naungan Daerah Misi Kepulauan (Sangihe, Talaud, Sitaro) / Konferens Manado dan Maluku Utara, jemaat ini berdiri sebagai terang firman Tuhan, mempererat persaudaraan jemaat, membimbing generasi muda, serta aktif dalam pelayanan kesehatan dan sosial kemasyarakatan.',
  address: 'Kampung Salili, Kecamatan Siau Tengah',
  village: 'Kampung Salili',
  district: 'Kecamatan Siau Tengah',
  regency: 'Kabupaten Kepulauan Siau Tagulandang Biaro (SITARO)',
  province: 'Sulawesi Utara',
  postalCode: '95861',
  googleMapsEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31878.219854737225!2d125.37891277329102!3d2.7441584999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3285c544e3188849%3A0x6b77c5f49e0b19cb!2sSalili%2C%20Siau%20Tengah%2C%20Kabupaten%20Kepulauan%20Siau%20Tagulandang%20Biaro%2C%20Sulawesi%20Utara!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid',
  googleMapsDirectUrl:
    'https://maps.google.com/?q=Salili,+Siau+Tengah,+Kabupaten+Kepulauan+Siau+Tagulandang+Biaro,+Sulawesi+Utara',
  coordinates: {
    lat: 2.744158,
    lng: 125.398913,
  },
  email: 'gmahk.salilisiau@gmail.com',
  phone: '+62 812-4455-8899',
  conference: 'Uni Konferens Indonesia Kawasan Timur (UKIKT) / Daerah Misi Sitaro',
};

export const initialLogoConfig: ChurchLogoConfig = {
  activeType: 'official_gmahk',
  customLogoUrl: '',
  logoText: 'GMAHK SALILI',
  logoSubtitle: 'SIAU TENGAH - SITARO',
  showText: true,
};

export const initialHeroImages: HeroImage[] = [
  {
    id: 'hero-1',
    title: 'Damai Sabat Bagi Kita Semua',
    subtitle: 'Mari Bersekutu, Memuji Tuhan & Mempelajari Firman-Nya di Rumah Tuhan GMAHK Salili',
    imageUrl: 'https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&w=1600&q=80',
    badgeText: 'Selamat Datang di GMAHK Salili',
    isPrimary: true,
  },
  {
    id: 'hero-2',
    title: 'Keluarga Allah yang Penuh Kasih',
    subtitle: 'Membangun iman yang teguh, mempererat persaudaraan, dan menyiapkan umat bagi kedatangan Kristus',
    imageUrl: 'https://images.unsplash.com/photo-1548625361-165b4c107e32?auto=format&fit=crop&w=1600&q=80',
    badgeText: 'Persekutuan Umat Advent',
    isPrimary: false,
  },
  {
    id: 'hero-3',
    title: 'Pelayanan Pemuda Advent & Pathfinder',
    subtitle: 'Membimbing generasi muda menjadi duta Kristus yang tangguh, berbudi luhur, dan melayani',
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1600&q=80',
    badgeText: 'Adventist Youth & Pathfinder Salili',
    isPrimary: false,
  },
];

export const initialVisiMisi: VisiMisiData = {
  visi: 'Menjadi jemaat yang berpusat pada Kristus, setia pada kebenaran Alkitabiah, memancarkan kasih Allah, dan bersiap menyambut kedatangan Tuhan Yesus yang kedua kali di bumi Sitaro.',
  misi: [
    'Mewartakan Injil Kekal dan Tiga Pesan Malaikat (Wahyu 14:6-12) kepada seluruh masyarakat di Siau Tengah dan sekitarnya.',
    'Menyelenggarakan perbaktian Sabat yang kudus, khidmat, dan memperkaya kerohanian setiap anggota dan sahabat jemaat.',
    'Mendidik dan memuridkan setiap jemaat melalui pendalaman Alkitab di Sekolah Sabat, Rumah Tangga, dan Pemuda Advent.',
    'Mewujudkan kepedulian sosial melalui pelayanan kesehatan holistik, bantuan kemanusiaan, dan kasih persaudaraan sejati.',
    'Membina keluarga Kristen yang harmonis, kudus, dan berpegang teguh pada prinsip hidup sehat Adventist Health Message.',
  ],
  motto: 'Bersatu dalam Iman, Bertumbuh dalam Kasih, Berita Pengharapan Bagi Siau',
  coreValues: [
    {
      title: 'Kebenaran Alkitab',
      description: 'Menjadikan seluruh isi Alkitab sebagai pedoman utama iman, ajaran, dan tuntunan hidup sehari-hari.',
      icon: 'BookOpen',
    },
    {
      title: 'Kekudusan Hari Sabat',
      description: 'Menikmati hari ketujuh (Sabat) sebagai peringatan penciptaan, penebusan, dan peristirahatan rohani kudus.',
      icon: 'Sun',
    },
    {
      title: 'Pengharapan yang Hidup',
      description: 'Bersemangat menantikan hari kemuliaan saat Yesus Kristus datang kembali menjemput umat tebusan-Nya.',
      icon: 'HeartHandshake',
    },
    {
      title: 'Pelayanan Kesehatan Holistik',
      description: 'Menjaga tubuh sebagai bait Roh Kudus melalui gaya hidup sehat, bersih, dan pola makan nabati seimbang.',
      icon: 'Sparkles',
    },
  ],
  bibleVerse: {
    text: 'Ingatlah dan kuduskanlah hari Sabat: enam hari lamanya engkau akan bekerja dan melakukan segala pekerjaanmu, tetapi hari ketujuh adalah hari Sabat TUHAN, Allahmu.',
    reference: 'Keluaran 20:8-10',
  },
};

export const initialSchedules: WorshipSchedule[] = [
  {
    id: 'sch-1',
    title: 'Sekolah Sabat (Sabbath School)',
    day: 'Hari Sabat (Sabtu)',
    time: '09:00 - 10:15 WITA',
    category: 'Sabat',
    location: 'Gedung Gereja GMAHK Salili',
    description: 'Penyanyi jemaat, renungan lagu rohani, laporan misi sedunia, dan diskusi penuntun Sekolah Sabat per kelas (Dewasa, Pemuda, Remaja, Anak-anak).',
    leader: 'Pemimpin Sekolah Sabat',
    isLiveStreamed: true,
  },
  {
    id: 'sch-2',
    title: 'Kebaktian Khotbah & Persembahan',
    day: 'Hari Sabat (Sabtu)',
    time: '10:30 - 12:00 WITA',
    category: 'Sabat',
    location: 'Sanctuary GMAHK Salili',
    description: 'Ibadah utama memuji Tuhan, persembahan & perpuluhan syukur, doa syafaat jemaat, dan pemberitaan Firman Tuhan oleh Gembala/Pengkhotbah.',
    leader: 'Pendeta / Majelis Jemaat',
    isLiveStreamed: true,
  },
  {
    id: 'sch-3',
    title: 'Kebaktian Pemuda Advent (AY / Adventist Youth)',
    day: 'Hari Sabat (Sabtu)',
    time: '15:00 - 17:00 WITA',
    category: 'Pemuda',
    location: 'Aula Pemuda GMAHK Salili',
    description: 'Program kreatif pemuda, cerdas cermat Alkitab, puji-pujian vokal grup, drama rohani, dan persiapan menyambut tutup Sabat.',
    leader: 'Ketua Pemuda Advent',
    isLiveStreamed: false,
  },
  {
    id: 'sch-4',
    title: 'Kebaktian Vesper / Buka Sabat',
    day: 'Jumat Petang',
    time: '18:00 - 19:15 WITA',
    category: 'Sabat',
    location: 'Gedung Gereja & Rumah Tangga Jemaat',
    description: 'Menyambut kehadiran hari Sabat kudus dengan puji-pujian syukur, kesaksian berkat sepekan, dan renungan pembuka Sabat yang menyejukkan hati.',
    leader: 'Diaken & Majelis Piket',
    isLiveStreamed: false,
  },
  {
    id: 'sch-5',
    title: 'Kebaktian Tengah Minggu (Rabu Doa)',
    day: 'Rabu Malam',
    time: '19:00 - 20:15 WITA',
    category: 'Tengah Minggu',
    location: 'Gedung Gereja GMAHK Salili',
    description: 'Malam puji-pujian dan doa syafaat bersama untuk pergumulan jemaat, orang sakit, keluarga, serta pertumbuhan jemaat.',
    leader: 'Pemimpin Departemen Doa',
    isLiveStreamed: false,
  },
  {
    id: 'sch-6',
    title: 'Persekutuan Doa Fajar (Subuh)',
    day: 'Minggu Pagi',
    time: '05:00 - 06:00 WITA',
    category: 'Doa',
    location: 'Ruang Doa GMAHK Salili / Hybrid',
    description: 'Mengawali pekan dengan berserah dalam doa permohonan dan penyerahan hidup di hadapan takhta kasih karunia Tuhan.',
    leader: 'Tim Doa Syafaat',
    isLiveStreamed: false,
  },
];

export const initialArticles: ChurchArticle[] = [
  {
    id: 'art-1',
    title: 'Menemukan Perhentian Sejati dalam Naungan Sabat Kudus',
    slug: 'menemukan-perhentian-sejati-sabat-kudus',
    category: 'Renungan',
    summary:
      'Di tengah hiruk pikuk kesibukan duniawi modern, hari Sabat hadir sebagai oase rohani yang menyegarkan jiwa dan memperbaharui hubungan kita dengan Sang Pencipta.',
    content: `Setiap insan manusia merindukan ketenangan batin. Di tengah tekanan pekerjaan, kabar dunia yang mencemaskan, dan tuntutan hidup harian, Tuhan Yesus memberikan hadiah yang paling indah sejak permulaan dunia: Hari Sabat.

"Ingatlah dan kuduskanlah hari Sabat" (Keluaran 20:8). Ini bukan sekadar larangan bekerja, melainkan undangan emas untuk bersekutu secara akrab dengan Sang Pencipta. Sabat adalah tanda pengenal antara Allah dan umat-Nya (Yehezkiel 20:12, 20).

Ketika matahari terbenam pada Jumat petang di Pulau Siau yang permai ini, mari kita melepaskan seluruh beban dan kecemasan hidup. Masuklah ke dalam damai Kristus. Mari kita manfaatkan waktu kudus ini untuk beribadah bersama keluarga di GMAHK Salili, menyapa sesama saudara seiman, dan memuji kemurahan Tuhan yang tak pernah berkesudahan.

Biarlah setiap Sabat menjadi hari sukacita yang melimpah bagi keluarga kita masing-masing.`,
    author: 'Pdt. Ronald Manoppo, M.Th.',
    authorRole: 'Gembala Jemaat GMAHK Salili',
    publishDate: '2025-02-28',
    imageUrl: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1000&q=80',
    readTime: '4 menit',
    tags: ['Sabat', 'Renungan', 'Iman', 'Keluarga'],
    isFeatured: true,
  },
  {
    id: 'art-2',
    title: 'Warta Sabat: Jadwal Perjamuan Kudus & Pelayanan Diakonat Pekan Ini',
    slug: 'warta-sabat-jadwal-perjamuan-kudus',
    category: 'Warta Sabat',
    summary:
      'Pemberitahuan kepada seluruh jemaat GMAHK Salili tentang pelaksanaan Upacara Pembasuhan Kaki dan Perjamuan Kudus triwulan ini.',
    content: `Salam damai sejahtera dalam kasih Yesus Kristus.

Dengan sukacita kami mengundang seluruh anggota jemaat, pemuda, dan simpatisan untuk hadir dalam kebaktian Sabat mendatang. Majelis Jemaat menyampaikan warta penting sebagai berikut:

1. Pelaksanaan Upacara Perjamuan Kudus & Pembasuhan Kaki (Foot Washing Ordinance) akan dilaksanakan pada Kebaktian Khotbah Sabat jam 10.30 WITA.
2. Diharapkan seluruh keluarga mempersiapkan hati dalam doa penyerahan dan rekonsiliasi kasih antar sesama sebelum memasuki perbaktian.
3. Diakon dan Diakones bertugas menyediakan kelengkapan upacara pada Jumat petang.
4. Potluck Kasih Bersama jemaat akan diadakan setelah ibadah khotbah di aula gereja.

Kiranya berkat rohani tercurah melimpah bagi kita semua.`,
    author: 'Sekretariat Jemaat',
    authorRole: 'Majelis Jemaat GMAHK Salili',
    publishDate: '2025-02-26',
    imageUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1000&q=80',
    readTime: '3 menit',
    tags: ['Warta Sabat', 'Perjamuan Kudus', 'Pengumuman'],
    isFeatured: false,
  },
  {
    id: 'art-3',
    title: 'Prinsip NEWSTART: 8 Kunci Alami Hidup Sehat Anugerah Tuhan',
    slug: 'prinsip-newstart-hidup-sehat-advent',
    category: 'Kesehatan',
    summary:
      'Memahami hukum kesehatan yang diajarkan dalam firman Tuhan dan roh nubuat untuk menjaga tubuh kita tetap prima sebagai bait Roh Kudus.',
    content: `Gereja Masehi Advent Hari Ketujuh sejak dahulu dikenal memegang pesan kesehatan holistik. Tubuh kita adalah bait Roh Kudus (1 Korintus 6:19-20). 

Departemen Pelayanan Kesehatan GMAHK Salili membagikan 8 prinsip alami disingkat NEWSTART:
- N (Nutrition): Nutrisi seimbang nabati, buah-buahan lokal Sitaro, sayuran hijau, kacang-kacangan, dan biji-bijian.
- E (Exercise): Olahraga teratur yang melancarkan peredaran darah.
- W (Water): Minum air putih yang cukup dan bersih setiap hari.
- S (Sunlight): Sinar matahari pagi yang memberi vitamin D alami.
- T (Temperance): Penguasaan diri dan menjauhi segala yang merusak (alkohol, rokok, zat adiktif).
- A (Air): Udara segar pegunungan dan laut Siau yang kaya oksigen.
- R (Rest): Istirahat dan tidur yang cukup serta ketenangan di hari Sabat.
- T (Trust in God): Berserah dan percaya sepenuhnya pada kuasa penyembuhan Tuhan.

Mari kita terapkan dalam keluarga kita demi kemuliaan nama Tuhan!`,
    author: 'dr. Sarah Salindeho',
    authorRole: 'Pemimpin Pelayanan Kesehatan Jemaat',
    publishDate: '2025-02-20',
    imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1000&q=80',
    readTime: '5 menit',
    tags: ['Kesehatan', 'NEWSTART', 'Gaya Hidup', 'Keluarga'],
    isFeatured: true,
  },
  {
    id: 'art-4',
    title: 'Kegiatan Bakti Sosial & Kemah Pemuda Advent di Siau Tengah',
    slug: 'bakti-sosial-kemah-pemuda-advent-siau',
    category: 'Pemuda Advent',
    summary:
      'Laporan kegiatan pemuda Advent Salili dalam membersihkan fasilitas umum, penyuluhan kesehatan, dan persekutuan alam terbuka.',
    content: `Puji Tuhan! Klub Pathfinder dan Pemuda Advent (AY) GMAHK Salili telah sukses melaksanakan bakti sosial di lingkungan Kampung Salili, Siau Tengah. 

Kegiatan yang berlangsung selama dua hari ini meliputi:
- Pembersihan saluran air dan area publik bersama pemerintah kampung.
- Pemeriksaan tekanan darah dan gula darah gratis bagi warga sekitar.
- Acara puji-pujian rohani dan pembagian buku-buku penuntun hidup sehat.

Melalui kegiatan ini, generasi muda gereja diajak untuk menjadi garam dan terang yang nyata bagi masyarakat sekitar. Terima kasih atas dukungan doa dan materi dari seluruh jemaat.`,
    author: 'Kelvin Kansil',
    authorRole: 'Ketua Pemuda Advent Salili',
    publishDate: '2025-02-15',
    imageUrl: 'https://images.unsplash.com/photo-1526976668912-1a811878dd37?auto=format&fit=crop&w=1000&q=80',
    readTime: '4 menit',
    tags: ['Pemuda Advent', 'Pathfinder', 'Bakti Sosial', 'Sitaro'],
    isFeatured: false,
  },
];

export const initialPrayerRequests: PrayerRequest[] = [
  {
    id: 'pray-1',
    name: 'Keluarga Bpk. Markus Tatengkeng',
    phone: '081244889900',
    category: 'Kesehatan / Kesembuhan',
    isPrivate: false,
    content:
      'Mohon dukungan doa syafaat jemaat untuk kesembuhan Ibu Elisabeth yang sedang menjalani pemulihan kesehatan di rumah sakit. Kiranya jamahan kuasa Tuhan memulihkan sepenuhnya.',
    createdAt: '2025-02-27T08:30:00Z',
    status: 'pending',
    prayerCount: 24,
    pastoralNotes: 'Sudah dikunjungi oleh tim pastoral jemaat pada hari Rabu.',
  },
  {
    id: 'pray-2',
    name: 'Yosua & Rekan-rekan Pelajar',
    phone: '085299881122',
    category: 'Studi / Pendidikan',
    isPrivate: false,
    content:
      'Memohon doa jemaat bagi anak-anak dan pemuda jemaat Salili yang sedang menghadapi ujian akhir dan persiapan masuk perguruan tinggi, agar diberi hikmat dan ketetapan hati memelihara Sabat.',
    createdAt: '2025-02-25T14:15:00Z',
    status: 'prayed',
    prayerCount: 38,
    pastoralNotes: 'Didoakan dalam persekutuan doa Rabu malam.',
  },
  {
    id: 'pray-3',
    name: 'Keluarga Ibu Maria Derek',
    phone: '081356778899',
    category: 'Ucapan Syukur',
    isPrivate: false,
    content:
      'Mengucap syukur atas pertambahan usia pernikahan ke-25 dan berkat pemeliharaan Tuhan atas anak-anak dan panen pala yang melimpah di Siau.',
    createdAt: '2025-02-22T10:00:00Z',
    status: 'answered',
    prayerCount: 45,
    pastoralNotes: 'Disampaikan kesaksian syukur di Sekolah Sabat.',
  },
];

export const initialLeaders: ChurchLeader[] = [
  {
    id: 'lead-1',
    name: 'Pdt. Ronald Manoppo, M.Th.',
    role: 'Pendeta Jemaat (District Pastor)',
    department: 'Pelayanan Pastoral & Penggembalaan',
    period: '2024 - 2026',
    phone: '+62 812-4455-8899',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    bio: 'Melayani dengan hati menggembalakan kawanan domba Allah di Siau Tengah dengan ketulusan firman Tuhan.',
  },
  {
    id: 'lead-2',
    name: 'Bpk. Steven Tatengkeng',
    role: 'Ketua Jemaat (First Elder)',
    department: 'Majelis Jemaat',
    period: '2024 - 2026',
    phone: '+62 813-4011-2233',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bio: 'Membantu penggembalaan jemaat lokal, memimpin kebaktian, dan mengkoordinasi program majelis.',
  },
  {
    id: 'lead-3',
    name: 'Ibu Grace Salindeho, S.Pd.',
    role: 'Sekretaris Jemaat',
    department: 'Sekretariat & Komunikasi',
    period: '2024 - 2026',
    phone: '+62 852-5678-9012',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    bio: 'Mengelola administrasi keanggotaan jemaat, surat pengantar, warta sabat, dan dokumentasi sejarah.',
  },
  {
    id: 'lead-4',
    name: 'Ibu Meiske Kansil-Tatengket',
    role: 'Bendahara Jemaat',
    department: 'Perbendaharaan & Keuangan',
    period: '2024 - 2026',
    phone: '+62 821-9876-5432',
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    bio: 'Menjaga akuntabilitas perpuluhan dan persembahan jemaat dengan teliti dan penuh integritas.',
  },
  {
    id: 'lead-5',
    name: 'Bpk. Yohanis Derek',
    role: 'Kepala Diaken (Head Deacon)',
    department: 'Pelayanan Diakonat & Fasilitas',
    period: '2024 - 2026',
    phone: '+62 813-5566-7788',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    bio: 'Memelihara keindahan rumah Tuhan, ketertiban perbaktian, dan pelayanan kasih bagi kaum lansia dan orang sakit.',
  },
  {
    id: 'lead-6',
    name: 'Sdr. Kelvin Kansil',
    role: 'Ketua Pemuda Advent (AY Leader)',
    department: 'Pelayanan Pemuda Advent & Pathfinder',
    period: '2024 - 2026',
    phone: '+62 853-4433-2211',
    photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    bio: 'Mengobarkan semangat persekutuan, misi penginjilan, dan persaudaraan anak-anak muda di Salili.',
  },
];

export const initialBankAccounts: BankAccount[] = [
  {
    id: 'bank-1',
    bankName: 'Bank BRI (Bank Rakyat Indonesia)',
    accountNumber: '5123-01-009876-53-4',
    accountHolder: 'GMAHK JEMAAT SALILI SIAU',
    purpose: 'Perpuluhan',
    instructions:
      'Dikhususkan untuk perpuluhan kudus dan persembahan terima kasih yang diteruskan ke Konferens/Daerah Misi untuk pembiayaan penginjilan dunia.',
  },
  {
    id: 'bank-2',
    bankName: 'Bank SulutGo (BSG)',
    accountNumber: '018-02-11-009988-1',
    accountHolder: 'PANITIA PEMBANGUNAN GMAHK SALILI',
    purpose: 'Pembangunan Gedung Gereja',
    instructions:
      'Dikhususkan untuk renovasi fasilitas gereja, sound system, kelengkapan Sekolah Sabat anak, dan pemeliharaan gedung gereja Salili.',
  },
  {
    id: 'bank-3',
    bankName: 'Bank Mandiri',
    accountNumber: '150-00-1844-777-9',
    accountHolder: 'KAS DIAKONAT GMAHK SALILI',
    purpose: 'Kas Diakonat / Kemanusiaan',
    instructions:
      'Digunakan untuk bantuan sembako kaum duafa, janda, yatim piatu, dan biaya bantuan berobat bagi anggota jemaat yang membutuhkan.',
  },
];

export const initialPastoralContacts: PastoralContact[] = [
  {
    id: 'pastor-1',
    name: 'Pdt. Ronald Manoppo, M.Th.',
    role: 'Pendeta Jemaat (Pelayanan Pastoral & Konseling Rohani)',
    whatsappNumber: '6281244558899',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    serviceFocus: 'Konseling pernikahan, doa syafaat, bimbingan baptisan, perlawatan rohani keluarga.',
    availableHours: 'Senin - Jumat (08.00 - 18.00 WITA), Sabat (Setelah ibadah)',
    welcomeMessage: 'Halo Pendeta Ronald, salam damai Sabat. Saya ingin berkonsultasi / memohon doa dari GMAHK Salili...',
  },
  {
    id: 'pastor-2',
    name: 'Bpk. Steven Tatengkeng',
    role: 'Ketua Jemaat (Majelis & Pelayanan Jemaat Lokal)',
    whatsappNumber: '6281340112233',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    serviceFocus: 'Koordinasi perbaktian lokal, permohonan kunjungan jemaat, pelayanan rumah tangga.',
    availableHours: 'Setiap hari (07.00 - 20.00 WITA)',
    welcomeMessage: 'Halo Bpk. Steven (Ketua Jemaat), salam damai. Saya ingin menghubungi pengurus GMAHK Salili mengenai...',
  },
  {
    id: 'pastor-3',
    name: 'Sdr. Kelvin Kansil',
    role: 'Pemimpin Pemuda & Remaja (Adventist Youth)',
    whatsappNumber: '6285344332211',
    photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    serviceFocus: 'Kegiatan pemuda, Pathfinder, paduan suara, pelayanan kepemudaan.',
    availableHours: 'Setiap hari (08.00 - 21.00 WITA)',
    welcomeMessage: 'Halo Kak Kelvin, salam Pemuda Advent! Saya ingin bergabung / tanya kegiatan pemuda GMAHK Salili...',
  },
];

export const initialSocialLinks: SocialLinks = {
  facebook: 'https://facebook.com/gmahk.salili.siau',
  instagram: 'https://instagram.com/gmahk_salili_siau',
  youtube: 'https://youtube.com/@gmahksalilisiautengah',
  tiktok: 'https://tiktok.com/@adventistsalili',
  whatsappGroup: 'https://chat.whatsapp.com/GMAHKSaliliSiauCommunity',
};

export const initialAdminCredentials: AdminCredentials = {
  username: 'admin',
  passwordHash: 'advent1844', // default password easy to change in dashboard
  lastUpdated: new Date().toISOString(),
};
