import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-emerald-600 text-white p-2 rounded-lg font-bold text-xl">
                CF
              </div>
              <span className="font-bold text-xl">Champion Futsal</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Champion Futsal adalah platform booking lapangan futsal terpercaya di Indonesia. 
              Mudah, cepat, dan aman untuk semua kebutuhan futsal Anda.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-slate-400 hover:text-emerald-500 cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-slate-400 hover:text-emerald-500 cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-slate-400 hover:text-emerald-500 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Link Cepat</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-slate-300 hover:text-emerald-500 transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/fields" className="text-slate-300 hover:text-emerald-500 transition-colors">
                  Cari Lapangan
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-300 hover:text-emerald-500 transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-300 hover:text-emerald-500 transition-colors">
                  Kontak
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-slate-300 hover:text-emerald-500 transition-colors">
                  Bantuan
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Layanan</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/fields" className="text-slate-300 hover:text-emerald-500 transition-colors">
                  Booking Lapangan
                </Link>
              </li>
              <li>
                <Link href="/tournament" className="text-slate-300 hover:text-emerald-500 transition-colors">
                  Turnamen
                </Link>
              </li>
              <li>
                <Link href="/training" className="text-slate-300 hover:text-emerald-500 transition-colors">
                  Pelatihan
                </Link>
              </li>
              <li>
                <Link href="/equipment" className="text-slate-300 hover:text-emerald-500 transition-colors">
                  Sewa Peralatan
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Kontak Kami</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className="text-slate-300">
                  Bahu (Jl. RW Monginsidi)<br />
                  Manado, Sulawesi Utara 95115, Indonesia
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                <span className="text-slate-300">(0431) 833999</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                <span className="text-slate-300">info@championfutsal.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-slate-400">
              © 2025 Champion Futsal. Dibuat oleh <span className="font-semibold text-emerald-500">Rizky Mema</span>
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-slate-400 hover:text-emerald-500 transition-colors">
                Kebijakan Privasi
              </Link>
              <Link href="/terms" className="text-slate-400 hover:text-emerald-500 transition-colors">
                Syarat & Ketentuan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
