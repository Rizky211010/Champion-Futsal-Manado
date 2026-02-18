// Futsal Center Information - Champion Futsal Manado
export const futsalCenter = {
  id: 'champion-futsal-manado',
  name: 'Champion Futsal',
  description: 'Venue futsal terdepan di Manado dengan 3 lapangan berkualitas tinggi. Berlokasi strategis di Bahu dengan fasilitas lengkap untuk pengalaman bermain futsal terbaik di Sulawesi Utara.',
  location: 'Manado, Sulawesi Utara',
  address: 'Bahu (Jl. RW Monginsidi), Manado, Sulawesi Utara 95115, Indonesia',
  coordinates: {
    lat: 1.4748,
    lng: 124.8421
  },
  contact: {
    phone: '(0431) 833999',
    whatsapp: '+62 812 9876 5432',
    email: 'info@championfutsal.com',
    website: 'https://championfutsal.com'
  },
  operatingHours: {
    weekdays: '06:00 - 24:00',
    weekends: '06:00 - 24:00'
  },
  rating: 4.9,
  totalReviews: 287,
  facilities: [
    'Toilet Bersih',
    'Parkir Luas', 
    'Mushola',
    'Kantin',
    'Ruang Ganti AC',
    'WiFi Gratis',
    'Sound System',
    'CCTV 24 Jam'
  ],
  images: [
    'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800',
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
    'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=800'
  ],
  mapUrl: 'https://maps.app.goo.gl/TS7dT6nQgSeeNEb78'
}

// Fields at Champion Futsal
export const mockFields = [
  {
    id: 'lapangan-a',
    name: 'Lapangan A - Premium Indoor',
    type: 'Indoor',
    description: 'Lapangan indoor premium dengan rumput sintetis berkualitas tinggi, sistem AC, dan pencahayaan LED optimal. Cocok untuk pertandingan dan latihan profesional.',
    images: [
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800',
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
      'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=800'
    ],
    specifications: {
      size: '40x20',
      surface: 'Rumput Sintetis FIFA Quality',
      lighting: 'LED Full Stadium',
      capacity: 100
    },
    features: [
      'AC Central',
      'Sound System',
      'Papan Skor Digital',
      'Tribun Penonton',
      'Ruang Ganti VIP'
    ],
    pricing: {
      weekday: {
        morning: 200000, // 06:00-18:00
        night: 250000    // 18:00-24:00
      },
      weekend: {
        morning: 250000, // 06:00-18:00
        night: 300000    // 18:00-24:00
      }
    },
    available: true,
    featured: true
  },
  {
    id: 'lapangan-b',
    name: 'Lapangan B - Indoor Standard',
    type: 'Indoor',
    description: 'Lapangan indoor standar dengan fasilitas lengkap dan rumput sintetis berkualitas. Ideal untuk pertandingan dan latihan tim.',
    images: [
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800',
      'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=800'
    ],
    specifications: {
      size: '40x20',
      surface: 'Rumput Sintetis Standard',
      lighting: 'LED Stadium',
      capacity: 80
    },
    features: [
      'AC',
      'Sound System',
      'Papan Skor Manual',
      'Tribun Penonton'
    ],
    pricing: {
      weekday: {
        morning: 150000, // 06:00-18:00
        night: 200000    // 18:00-24:00
      },
      weekend: {
        morning: 200000, // 06:00-18:00
        night: 250000    // 18:00-24:00
      }
    },
    available: true,
    featured: false
  },
  {
    id: 'lapangan-c',
    name: 'Lapangan C - Outdoor',
    type: 'Outdoor',
    description: 'Lapangan outdoor dengan pemandangan alam Manado. Dilengkapi dengan sistem drainase modern dan pencahayaan yang baik untuk bermain malam hari.',
    images: [
      'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=800',
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800',
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800'
    ],
    specifications: {
      size: '40x20',
      surface: 'Rumput Sintetis Outdoor',
      lighting: 'Lampu Sorot LED',
      capacity: 60
    },
    features: [
      'Pencahayaan Malam',
      'Sistem Drainase',
      'Tribun Sederhana',
      'Area Parkir Dekat'
    ],
    pricing: {
      weekday: {
        morning: 100000, // 06:00-18:00
        night: 150000    // 18:00-24:00
      },
      weekend: {
        morning: 150000, // 06:00-18:00
        night: 200000    // 18:00-24:00
      }
    },
    available: true,
    featured: false
  }
]

// ...existing mock data for users, bookings, reviews, and testimonials...