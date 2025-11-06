# 🏐 Champion Futsal - Platform Booking Lapangan Futsal

> Platform booking lapangan futsal yang modern, cepat, dan mudah digunakan. Dirancang untuk memberikan pengalaman terbaik dalam memesan lapangan futsal dengan antarmuka yang intuitif dan responsif.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-blue?logo=tailwindcss)](https://tailwindcss.com/)

---

## 📋 Daftar Isi

- [Fitur Utama](#-fitur-utama)
- [Tech Stack](#-tech-stack)
- [Instalasi](#-instalasi)
- [Cara Menggunakan](#-cara-menggunakan)
- [Struktur Proyek](#-struktur-proyek)
- [Fitur Mendatang](#-fitur-mendatang)
- [Penulis](#-penulis)

---

## ✨ Fitur Utama

### 🎯 Untuk User
- ✅ **Lihat Daftar Lapangan** - Browse semua lapangan futsal yang tersedia dengan detail lengkap
- ✅ **Booking Online** - Pesan lapangan langsung melalui website dengan sistem yang mudah
- ✅ **Filter & Search** - Cari lapangan berdasarkan tipe (indoor/outdoor), harga, dan fasilitas
- ✅ **Rating & Review** - Lihat rating dan ulasan dari pengguna lain
- ✅ **Dashboard User** - Kelola profil dan riwayat booking
- ✅ **Sistem Autentikasi** - Login dan register dengan aman

### 🔧 Untuk Admin
- ✅ **Dashboard Admin** - Manage lapangan, booking, dan user
- ✅ **Kelola Lapangan** - Tambah, edit, hapus informasi lapangan
- ✅ **Kelola Booking** - Lihat dan kelola semua booking
- ✅ **Kelola User** - Monitor data pengguna

### 🎨 Desain & UX
- ✅ **Responsive Design** - Sempurna di mobile, tablet, dan desktop
- ✅ **Tema Modern** - UI/UX yang menarik dengan warna emerald dan slate
- ✅ **Aksesibilitas** - Kontras warna WCAG compliant
- ✅ **Animasi Smooth** - Transisi dan animasi yang halus
- ✅ **Dark Mode Ready** - Struktur siap untuk dark mode

---

## 🛠 Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn/ui
- **Icons:** Lucide React
- **State Management:** Zustand
- **HTTP Client:** Fetch API

### Development Tools
- **Package Manager:** npm
- **Linter:** ESLint
- **Code Quality:** TypeScript strict mode

### Browser Support
- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)

---

## 📦 Instalasi

### Prerequisites
- Node.js 18+ atau lebih baru
- npm atau yarn

### Langkah-Langkah

1. **Clone Repository**
```bash
git clone https://github.com/username/champion-futsal.git
cd champion-futsal
```

2. **Install Dependencies**
```bash
npm install
```

3. **Setup Environment Variables** (opsional untuk development)
```bash
cp .env.example .env.local
```

4. **Run Development Server**
```bash
npm run dev
```

5. **Buka di Browser**
Akses [http://localhost:3000](http://localhost:3000)

---

## 🚀 Cara Menggunakan

### Untuk User Biasa

1. **Lihat Halaman Utama**
   - Klik "Champion Futsal" di header untuk kembali ke home
   - Explore fitur-fitur yang tersedia

2. **Cari Lapangan**
   - Klik menu "Lapangan" atau tombol "Lihat Lapangan"
   - Gunakan filter untuk mencari lapangan sesuai kebutuhan
   - Klik card lapangan untuk lihat detail lengkap

3. **Booking Lapangan**
   - Pilih tanggal dan jam yang diinginkan
   - Klik tombol "Booking"
   - Isi data diri dan metode pembayaran
   - Konfirmasi booking

4. **Kelola Akun**
   - Daftar akun baru di halaman Register
   - Login dengan email dan password
   - Akses dashboard untuk lihat history booking

### Untuk Admin

1. **Login sebagai Admin**
   - Gunakan akun admin untuk login
   - Akses tersedia di dashboard

2. **Kelola Lapangan**
   - Tambahkan lapangan baru
   - Edit informasi lapangan
   - Hapus lapangan yang tidak aktif

3. **Monitor Booking**
   - Lihat semua booking yang masuk
   - Update status booking
   - Lihat laporan penjualan

---

## 📁 Struktur Proyek

```
champion-futsal/
├── app/                          # Next.js app directory
│   ├── page.tsx                  # Halaman utama (homepage)
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # CSS global & variabel
│   ├── about/                    # Halaman tentang kami
│   ├── contact/                  # Halaman kontak
│   ├── fields/                   # Halaman daftar lapangan
│   │   └── [id]/                 # Detail lapangan
│   ├── auth/                     # Halaman autentikasi
│   │   ├── login/
│   │   └── register/
│   └── dashboard/                # Dashboard (user & admin)
│       ├── user/
│       └── admin/
│
├── components/                   # React components
│   ├── Header.tsx                # Navigation header
│   ├── Footer.tsx                # Footer
│   ├── FieldCard.tsx             # Lapangan card component
│   ├── BookingModal.tsx          # Modal booking
│   ├── Calendar.tsx              # Calendar picker
│   └── ui/                       # Shadcn UI components
│
├── lib/                          # Utility functions
│   ├── mockData.ts               # Mock data
│   └── utils.ts                  # Helper functions
│
├── data/                         # Mock data untuk development
│
├── store/                        # State management (Zustand)
│   └── index.ts
│
├── public/                       # Static assets
│   ├── begraund.png              # Background image hero
│   └── [icon files]
│
└── package.json                  # Project dependencies
```

---

## 🎨 Fitur Design

### Palet Warna
- **Primary:** Emerald (#059669) - Untuk aksi utama
- **Secondary:** Slate (#0f172a) - Untuk teks dan border
- **Accent:** Cyan (#06b6d4) - Untuk highlight
- **Background:** Light Slate (#f8fafc) - Untuk background
- **Text:** Dark Slate (#0f172a) - Untuk teks utama

### Komponen UI
- Input Field dengan kontras tinggi
- Button dengan hover effect smooth
- Modal dialog yang user-friendly
- Card dengan shadow effect
- Badge untuk status dan kategori
- Select dropdown dengan styling custom

### Responsivitas
- Mobile First Design
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Flexible layout dengan Tailwind CSS
- Touch-friendly buttons dan spacing

---

## 🔄 Build & Deployment

### Build untuk Production
```bash
npm run build
npm run start
```

### Deployment ke Vercel
```bash
# Install Vercel CLI (jika belum)
npm i -g vercel

# Deploy
vercel
```

Atau push ke GitHub dan connect dengan Vercel untuk auto-deployment.

### Deployment ke Host Lain
```bash
# Build
npm run build

# Copy folder .next ke server
# Pastikan Node.js terinstall di server
# Run: npm start
```

---

## 🚧 Fitur Mendatang

- [ ] **Backend API** - Node.js/Express untuk real database
- [ ] **Database** - PostgreSQL/MongoDB untuk data persistence
- [ ] **Payment Gateway** - Integrasi Stripe/Midtrans
- [ ] **Email Notification** - Konfirmasi booking via email
- [ ] **SMS Notification** - Notifikasi via SMS
- [ ] **Real-time Chat** - Support chat untuk customer service
- [ ] **Rating System** - Sistem rating dan review yang lebih baik
- [ ] **Mobile App** - React Native app untuk iOS & Android
- [ ] **Dark Mode** - Toggle dark/light theme
- [ ] **Multilingual** - Support multiple languages
- [ ] **Analytics Dashboard** - Dashboard analytics untuk admin

---

## 🤝 Kontribusi

Contributions, issues, dan feature requests dipersilahkan! Feel free untuk:

1. Fork repository ini
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

---

## 📝 Lisensi

Project ini open source dan tersedia dibawah MIT License.

---

## 👤 Penulis

**Rizky Mema**

- GitHub: [@rizkymema](https://github.com/rizkymema)
- Website: [championfutsal.com](https://championfutsal.com)

### Informasi Kontak Champion Futsal

📍 **Alamat:** Bahu (Jl. RW Monginsidi), Manado, Sulawesi Utara 95115, Indonesia

📞 **Telepon:** (0431) 833999

💬 **WhatsApp:** +62 812 9876 5432

📧 **Email:** info@championfutsal.com

🌐 **Website:** https://championfutsal.com

---

## 📞 Support

Jika ada pertanyaan atau issue, silahkan:
- Buat issue di GitHub repository
- Email ke info@championfutsal.com
- WhatsApp ke (0431) 833999

---

## 🙏 Terima Kasih

Terima kasih telah melihat project ini! Jika dirasa helpful, jangan lupa untuk:
- ⭐ Star repository ini
- 🍴 Fork repository ini
- 📢 Share ke teman-teman

---

<div align="center">

**Made with ❤️ by Rizky Mema**

*Semoga project ini bermanfaat dan bisa menjadi portofolio yang bagus* 🚀

</div>
