export interface Thread {
  id: string;
  title: string;
  author: string;
  avatarInitials: string;
  replies: number;
  time: string;
  category: 'umum' | 'umkm' | 'freelance';
  likes: number;
}

export interface Freelancer {
  id: string;
  name: string;
  role: string;
  avatarInitials: string;
  bgGradient: string;
  rating: number;
  rate: string;
  location: string;
  tags: string[];
  bio: string;
  portfolio: { title: string; client: string; year: string }[];
}

export const FORUMS_DATA = {
  umum: {
    name: "Forum Umum",
    tag: "SEMUA ORANG",
    color: "border-brand-gold",
    description: "Topik bebas, tips bisnis umum, inspirasi, dan pengumuman komunitas.",
    threads: [
      {
        id: "u1",
        title: "Tips Mengatur Cash Flow untuk Pemula Tanpa Ribet",
        author: "Devi Anggraeni",
        avatarInitials: "DA",
        replies: 18,
        likes: 42,
        time: "3 jam yang lalu",
        category: "umum"
      },
      {
        id: "u2",
        title: "Pentingnya Punya Website Portofolio Sendiri vs Numpang Platform Lain",
        author: "Rian Prasetya",
        avatarInitials: "RP",
        replies: 24,
        likes: 56,
        time: "1 hari yang lalu",
        category: "umum"
      },
      {
        id: "u3",
        title: "Sharing Session: Bagaimana Cara Menghadapi Klien yang Suka Telat Bayar?",
        author: "Sartika Rahayu",
        avatarInitials: "SR",
        replies: 31,
        likes: 89,
        time: "2 hari yang lalu",
        category: "umum"
      }
    ] as Thread[]
  },
  umkm: {
    name: "Forum UMKM",
    tag: "USAHA & PRODUK",
    color: "border-brand-gold",
    description: "Strategi pemasaran lokal, packaging, modal, distribusi, dan kisah sukses UMKM.",
    threads: [
      {
        id: "m1",
        title: "Cara Urus Sertifikasi Halal Gratis (SEHATI) 2026",
        author: "H. Syarifudin",
        avatarInitials: "HS",
        replies: 45,
        likes: 112,
        time: "5 jam yang lalu",
        category: "umkm"
      },
      {
        id: "m2",
        title: "Rekomendasi Jasa Ekspedisi Murah untuk Kirip Produk Kerajinan Kayu",
        author: "Budi Santoso",
        avatarInitials: "BS",
        replies: 12,
        likes: 21,
        time: "12 jam yang lalu",
        category: "umkm"
      },
      {
        id: "m3",
        title: "Rahasia Packaging Estetik tapi Tetap Hemat Biaya Produksi",
        author: "Amanda Putri",
        avatarInitials: "AP",
        replies: 38,
        likes: 95,
        time: "3 hari yang lalu",
        category: "umkm"
      }
    ] as Thread[]
  },
  freelance: {
    name: "Forum Freelancer",
    tag: "JASA & DIGITAL",
    color: "border-brand-gold",
    description: "Rate card, negosiasi klien, portofolio, tools, dan tips karir freelance.",
    threads: [
      {
        id: "f1",
        title: "Berapa Rate Card Standar Desainer Grafis Pemula di Indonesia?",
        author: "Rara Dewanti",
        avatarInitials: "RD",
        replies: 57,
        likes: 148,
        time: "2 jam yang lalu",
        category: "freelance"
      },
      {
        id: "f2",
        title: "Panduan Bikin Kontrak Kerja Freelance Biar Nggak Kena Ghosting Klien",
        author: "Adit Nugroho",
        avatarInitials: "AN",
        replies: 41,
        likes: 130,
        time: "1 hari yang lalu",
        category: "freelance"
      },
      {
        id: "f3",
        title: "Website Terbaik untuk Berburu Proyek Luar Negeri Selain Upwork",
        author: "Zacky Maulana",
        avatarInitials: "ZM",
        replies: 29,
        likes: 72,
        time: "2 hari yang lalu",
        category: "freelance"
      }
    ] as Thread[]
  }
};

export const FREELANCERS_DIRECTORY: Freelancer[] = [
  {
    id: "fl1",
    name: "Rara Dewanti",
    role: "Freelance Graphic Designer",
    avatarInitials: "RD",
    bgGradient: "from-amber-200 to-amber-400 text-amber-900",
    rating: 4.9,
    rate: "Rp 150k - 300k / jam",
    location: "Bandung, Jawa Barat",
    tags: ["UI/UX", "Branding", "Social Media", "Illustrator"],
    bio: "Membantu UMKM dan startup berskala nasional membangun identitas visual yang premium dan memorable.",
    portfolio: [
      { title: "Selasar Kopi Identity", client: "Selasar Group", year: "2025" },
      { title: "Nusantara Coffee packaging", client: "Nusantara Seed", year: "2025" }
    ]
  },
  {
    id: "fl2",
    name: "Adit Nugroho",
    role: "Full-Stack Web Developer",
    avatarInitials: "AN",
    bgGradient: "from-zinc-300 to-zinc-500 text-zinc-900",
    rating: 4.8,
    rate: "Rp 250k - 500k / jam",
    location: "Yogyakarta, DIY",
    tags: ["React", "Node.js", "WordPress", "Landing Page"],
    bio: "Spesialis pembuat custom landing page berkecepatan tinggi dan e-commerce responsif untuk konversi bisnis.",
    portfolio: [
      { title: "Lestari Handcraft Store", client: "Lestari Craft", year: "2025" },
      { title: "HRIS Portal", client: "Sinergi Logistik", year: "2024" }
    ]
  },
  {
    id: "fl3",
    name: "Sartika Rahayu",
    role: "SEO Copywriter & Content Strategist",
    avatarInitials: "SR",
    bgGradient: "from-yellow-100 to-yellow-300 text-yellow-900",
    rating: 5.0,
    rate: "Rp 100k - 200k / jam",
    location: "Jakarta Selatan, DKI",
    tags: ["SEO Blog", "Product Copy", "Content Planning"],
    bio: "Menulis konten pemasaran yang tidak hanya ramah di mesin pencari Google, tapi juga persuasif bagi pembaca.",
    portfolio: [
      { title: "Blog Series Optimization", client: "Saka Aesthetic", year: "2025" },
      { title: "Website Rebranding Copy", client: "Inovasi Digital", year: "2024" }
    ]
  },
  {
    id: "fl4",
    name: "Budi Santoso",
    role: "Owner UMKM Kerajinan Kayu Lestari",
    avatarInitials: "BS",
    bgGradient: "from-amber-300 to-amber-500 text-amber-950",
    rating: 4.7,
    rate: "Supplier & Custom Craft",
    location: "Jepara, Jawa Tengah",
    tags: ["Kayu Jati", "Interior", "Furniture", "Souvenir"],
    bio: "Memproduksi kerajinan kayu jati berkualitas tinggi bernilai seni untuk kebutuhan retail maupun bulk order.",
    portfolio: [
      { title: "Custom Hampers Wooden Box", client: "Hotel Majapahit", year: "2025" },
      { title: "Minimalist Dining Tables", client: "Rumah Senja", year: "2024" }
    ]
  }
];

export const TESTIMONIALS = [
  {
    quote: "Sejak pakai NEXUS, klien-klien baru bisa nemuin portofolio aku dengan mudah. Pendapatan naik 2x dalam 3 bulan terakhir.",
    name: "Rara D.",
    role: "Freelance Graphic Designer",
    avatarInitials: "RD"
  },
  {
    quote: "Akhirnya ada forum yang ngerti masalah UMKM beneran. Saran dari komunitas NEXUS bikin aku bisa expand produk kerajinan ke luar kota.",
    name: "Budi S.",
    role: "Owner UMKM Kerajinan",
    avatarInitials: "BS"
  },
  {
    quote: "Invoice-nya simpel banget, klien jadi lebih cepat bayar karena opsi transfer lengkap. NEXUS bener-bener ngerti kebutuhan freelancer offline.",
    name: "Adit P.",
    role: "Web Developer Freelance",
    avatarInitials: "AP"
  }
];
