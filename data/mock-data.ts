export interface Field {
  id: string
  name: string
  type: 'indoor' | 'outdoor'
  size: string
  description: string
  images: string[]
  specifications: {
    length: number
    width: number
    surface: string
    lighting: string
    capacity: number
  }
  pricePerHour: number
  isActive: boolean
  features: string[]
  pricing: {
    weekday: {
      morning: number // 06:00-18:00
      night: number   // 18:00-24:00
    }
    weekend: {
      morning: number
      night: number
    }
  }
  availability: Record<string, boolean[]> // date -> [hours] (6-23)
}

export interface FutsalCenter {
  id: string
  name: string
  location: string
  address: string
  description: string
  mainImage: string
  gallery: string[]
  rating: number
  totalReviews: number
  facilities: string[]
  operatingHours: string
  contact: {
    phone: string
    email: string
    whatsapp: string
  }
  socialMedia: {
    instagram?: string
    facebook?: string
    tiktok?: string
  }
}

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  dateOfBirth?: string
  emergencyContact?: string
  emergencyPhone?: string
  role: 'user' | 'admin'
  createdAt: string
}

export interface Booking {
  id: string
  fieldId: string
  userId: string
  fieldName?: string
  date: string
  timeSlot: string
  startTime: number
  endTime: number
  duration: number
  pricePerHour: number
  totalPrice: number
  players: number
  price: number
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  createdAt: string
  customerName: string
  customerPhone: string
}

export interface Review {
  id: string
  fieldId: string
  customerName: string
  rating: number
  comment: string
  createdAt: string
}

export interface Testimonial {
  id: string
  userName: string
  fieldName: string
  avatar?: string
  rating: number
  comment: string
}

// Data Tempat Futsal Utama
export const futsalCenter: FutsalCenter = {
  id: 'jago-futsal-center',
  name: 'Jago Futsal Center',
  location: 'Jakarta Selatan',
  address: 'Jl. Raya Kebayoran Lama No. 123, Jakarta Selatan 12240',
  description: 'Pusat futsal terdepan di Jakarta Selatan dengan 3 lapangan berkualitas tinggi. Dilengkapi fasilitas modern dan pelayanan terbaik untuk pengalaman bermain futsal yang tak terlupakan.',
  mainImage: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop',
  gallery: [
    'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop'
  ],
  rating: 4.8,
  totalReviews: 324,
  facilities: [
    'Parkir Luas', 'Ruang Ganti AC', 'Mushola', 'Kantin', 'Toilet Bersih', 
    'WiFi Gratis', 'Sound System', 'Tribun Penonton', 'CCTV Security', 'Locker'
  ],
  operatingHours: '06:00 - 24:00',
  contact: {
    phone: '+62 21 1234 5678',
    email: 'info@jagofutsal.com',
    whatsapp: '+62 812 3456 7890'
  },
  socialMedia: {
    instagram: '@jagofutsalcenter',
    facebook: 'Jago Futsal Center',
    tiktok: '@jagofutsal'
  }
}

// Data Lapangan-lapangan di dalam Jago Futsal Center
export const mockFields: Field[] = [
  {
    id: 'lapangan-a',
    name: 'Lapangan A (Indoor Premium)',
    type: 'indoor',
    size: 'Standar FIFA (40m x 20m)',
    description: 'Lapangan indoor premium dengan rumput sintetis berkualitas tinggi, sistem AC, dan pencahayaan LED profesional. Cocok untuk pertandingan resmi dan turnamen.',
    images: [
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=800&h=600&fit=crop'
    ],
    specifications: {
      length: 40,
      width: 20,
      surface: 'Rumput Sintetis Premium (FIFA Quality)',
      lighting: 'LED Professional (500 Lux)',
      capacity: 50
    },
    pricePerHour: 200000,
    isActive: true,
    features: ['AC Full Blast', 'Sound System', 'Scoreboard Digital', 'Tribun VIP'],
    pricing: {
      weekday: { morning: 180000, night: 220000 },
      weekend: { morning: 220000, night: 280000 }
    },
    availability: {}
  },
  {
    id: 'lapangan-b',
    name: 'Lapangan B (Indoor Standard)',
    type: 'indoor',
    size: 'Standar (38m x 18m)',
    description: 'Lapangan indoor dengan ventilasi alami dan pencahayaan yang baik. Ideal untuk latihan tim dan bermain santai bersama teman.',
    images: [
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop'
    ],
    specifications: {
      length: 38,
      width: 18,
      surface: 'Rumput Sintetis Standard',
      lighting: 'LED Standard (300 Lux)',
      capacity: 30
    },
    pricePerHour: 150000,
    isActive: true,
    features: ['Ventilasi Baik', 'Sound System Basic', 'Papan Skor Manual'],
    pricing: {
      weekday: { morning: 130000, night: 170000 },
      weekend: { morning: 170000, night: 200000 }
    },
    availability: {}
  },
  {
    id: 'lapangan-c',
    name: 'Lapangan C (Outdoor)',
    type: 'outdoor',
    size: 'Standar (40m x 20m)',
    description: 'Lapangan outdoor dengan suasana terbuka dan udara segar. Dilengkapi dengan pencahayaan untuk bermain malam hari.',
    images: [
      'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=800&h=600&fit=crop'
    ],
    specifications: {
      length: 40,
      width: 20,
      surface: 'Rumput Sintetis Weather Resistant',
      lighting: 'LED Outdoor (400 Lux)',
      capacity: 40
    },
    pricePerHour: 120000,
    isActive: true,
    features: ['Open Air', 'Night Light', 'Weather Resistant', 'Tribun Outdoor'],
    pricing: {
      weekday: { morning: 100000, night: 140000 },
      weekend: { morning: 140000, night: 160000 }
    },
    availability: {}
  }
]

export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '081234567890',
    address: 'Jl. Sudirman No. 123, Jakarta Pusat',
    dateOfBirth: '1990-05-15',
    role: 'user',
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'u2',
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    phone: '081234567891',
    address: 'Jl. Thamrin No. 456, Jakarta Pusat',
    role: 'user',
    createdAt: '2025-02-15T00:00:00Z'
  },
  {
    id: 'admin1',
    name: 'Admin User',
    email: 'admin@jagofutsal.com',
    phone: '081234567892',
    role: 'admin',
    createdAt: '2024-12-01T00:00:00Z'
  },
  {
    id: 'u3',
    name: 'Ahmad Rizki',
    email: 'ahmad.rizki@email.com',
    phone: '081234567893',
    role: 'user',
    createdAt: '2025-03-01T00:00:00Z'
  },
  {
    id: 'u4',
    name: 'Siti Nurhaliza',
    email: 'siti.nur@email.com',
    phone: '081234567894',
    role: 'user',
    createdAt: '2025-03-15T00:00:00Z'
  }
]

export const mockBookings: Booking[] = [
  {
    id: 'bk1',
    fieldId: '1',
    userId: 'u1',
    fieldName: 'Lapangan Futsal Premium A',
    date: '2025-06-25',
    timeSlot: '19:00 - 21:00',
    startTime: 19,
    endTime: 21,
    duration: 2,
    pricePerHour: 200000,
    totalPrice: 400000,
    players: 10,
    price: 400000,
    status: 'confirmed',
    createdAt: '2025-06-20T10:00:00Z',
    customerName: 'John Doe',
    customerPhone: '081234567890'
  },
  {
    id: 'bk2',
    fieldId: '2',
    userId: 'u2',
    fieldName: 'Arena Futsal Champion',
    date: '2025-06-22',
    timeSlot: '15:00 - 17:00',
    startTime: 15,
    endTime: 17,
    duration: 2,
    pricePerHour: 120000,
    totalPrice: 240000,
    players: 8,
    price: 240000,
    status: 'completed',
    createdAt: '2025-06-18T14:30:00Z',
    customerName: 'Jane Smith',
    customerPhone: '081234567891'
  },
  {
    id: 'bk3',
    fieldId: '1',
    userId: 'u3',
    fieldName: 'Lapangan Futsal Premium A',
    date: '2025-06-28',
    timeSlot: '20:00 - 22:00',
    startTime: 20,
    endTime: 22,
    duration: 2,
    pricePerHour: 200000,
    totalPrice: 400000,
    players: 12,
    price: 400000,
    status: 'pending',
    createdAt: '2025-06-21T16:00:00Z',
    customerName: 'Ahmad Rizki',
    customerPhone: '081234567893'
  },
  {
    id: 'bk4',
    fieldId: '3',
    userId: 'u4',
    fieldName: 'Star Futsal Club',
    date: '2025-06-20',
    timeSlot: '16:00 - 18:00',
    startTime: 16,
    endTime: 18,
    duration: 2,
    pricePerHour: 100000,
    totalPrice: 200000,
    players: 8,
    price: 200000,
    status: 'cancelled',
    createdAt: '2025-06-15T12:00:00Z',
    customerName: 'Siti Nurhaliza',
    customerPhone: '081234567894'
  },
  {
    id: 'bk5',
    fieldId: '4',
    userId: 'u1',
    fieldName: 'Elite Futsal Arena',
    date: '2025-06-30',
    timeSlot: '18:00 - 20:00',
    startTime: 18,
    endTime: 20,
    duration: 2,
    pricePerHour: 230000,
    totalPrice: 460000,
    players: 10,
    price: 460000,
    status: 'confirmed',
    createdAt: '2025-06-22T09:00:00Z',
    customerName: 'John Doe',
    customerPhone: '081234567890'
  }
]

export const mockReviews: Review[] = [
  {
    id: 'r1',
    fieldId: '1',
    customerName: 'Ahmad Rizki',
    rating: 5,
    comment: 'Lapangan sangat bagus, fasilitas lengkap dan pelayanan memuaskan!',
    createdAt: '2025-06-15T09:00:00Z'
  },
  {
    id: 'r2',
    fieldId: '1',
    customerName: 'Budi Santoso',
    rating: 4,
    comment: 'Tempat strategis dan lapangan berkualitas. Recommended!',
    createdAt: '2025-06-10T16:30:00Z'
  },
  {
    id: 'r3',
    fieldId: '2',
    customerName: 'Citra Dewi',
    rating: 5,
    comment: 'Pelayanan ramah dan lapangan terawat dengan baik.',
    createdAt: '2025-06-12T11:15:00Z'
  }
]

export const mockTestimonials: Testimonial[] = [
  {
    id: 't1',
    userName: 'Ridwan Kamil',
    fieldName: 'Lapangan Futsal Premium A',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    comment: 'Aplikasi ini sangat memudahkan untuk booking lapangan futsal. Prosesnya cepat dan simpel!'
  },
  {
    id: 't2',
    userName: 'Siti Nurhaliza',
    fieldName: 'Arena Futsal Champion',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b585829e?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    comment: 'Pilihan lapangan banyak dengan kualitas terjamin. Sangat puas dengan pelayanannya.'
  },
  {
    id: 't3',
    userName: 'Andi Prasetyo',
    fieldName: 'Star Futsal Club',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    rating: 4,
    comment: 'Interface user-friendly dan proses pembayaran yang aman. Recommended!'
  },
  {
    id: 't4',
    userName: 'Maya Sari',
    fieldName: 'Elite Futsal Arena',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    comment: 'Fasilitas premium dengan pelayanan yang sangat memuaskan. Akan kembali lagi!'
  }
]

// Helper function to generate availability
export function generateAvailability(fieldId: string): Record<string, boolean[]> {
  const availability: Record<string, boolean[]> = {}
  const today = new Date()
  
  // Generate for next 30 days
  for (let i = 0; i < 30; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    const dateStr = date.toISOString().split('T')[0]
    
    // Generate random availability for hours 6-23 (18 hours)
    const hours = Array.from({ length: 18 }, (_, index) => {
      // Random availability with higher chance of being available
      return Math.random() > (i < 7 ? 0.3 : 0.1) // More bookings in the next week
    })
    
    availability[dateStr] = hours
  }
  
  return availability
}

// Initialize availability for all fields
mockFields.forEach(field => {
  field.availability = generateAvailability(field.id)
})
