'use client'

import Link from 'next/link'
import Image from 'next/image'
import { 
  Target, 
  Eye, 
  Users,
  MapPin,
  Trophy,
  Clock,
  Shield,
  Star,
  CheckCircle,
  Heart
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { futsalCenter } from '@/lib/mockData'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Tentang Champion Futsal Manado
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Venue futsal terdepan di Manado yang berkomitmen memberikan pengalaman bermain futsal terbaik 
            untuk semua kalangan di Sulawesi Utara.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">3</div>
            <div className="text-gray-600">Lapangan Berkualitas</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{futsalCenter.rating}</div>
            <div className="text-gray-600">Rating Pengguna</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{futsalCenter.totalReviews}+</div>
            <div className="text-gray-600">Review Positif</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">2019</div>
            <div className="text-gray-600">Tahun Berdiri</div>
          </div>
        </div>

        {/* Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Cerita Kami</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Champion Futsal didirikan pada tahun 2019 dengan visi menjadi venue futsal terbaik di Manado. 
                Berlokasi strategis di kawasan Bahu, kami hadir untuk memenuhi kebutuhan pecinta futsal di 
                Sulawesi Utara.
              </p>
              <p>
                Dengan 3 lapangan berkualitas tinggi - 2 indoor premium dan 1 outdoor dengan pemandangan alam - 
                kami berkomitmen memberikan pengalaman bermain futsal yang tak terlupakan untuk semua kalangan.
              </p>
              <p>
                Dari awal berdiri hingga sekarang, Champion Futsal telah melayani ribuan pemain dan menjadi 
                pilihan utama untuk berbagai acara, mulai dari latihan tim, turnamen, hingga acara corporate.
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-green-600" />
                  Visi Kami
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Menjadi venue futsal terdepan di Sulawesi Utara yang memberikan pengalaman bermain 
                  futsal berkualitas tinggi dengan fasilitas modern dan pelayanan terbaik.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-green-600" />
                  Misi Kami
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-gray-700">
                  <p>• Menyediakan lapangan futsal berkualitas internasional</p>
                  <p>• Memberikan pelayanan prima kepada setiap pengunjung</p>
                  <p>• Mendukung perkembangan olahraga futsal di Manado</p>
                  <p>• Menciptakan komunitas futsal yang solid dan sportif</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Mengapa Memilih Champion Futsal?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Kualitas Premium</h3>
                <p className="text-gray-600">
                  Lapangan dengan rumput sintetis FIFA Quality, pencahayaan LED optimal, dan fasilitas AC.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Lokasi Strategis</h3>
                <p className="text-gray-600">
                  Terletak di Bahu, mudah diakses dari berbagai wilayah di Manado dengan parkir yang luas.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Pelayanan Terbaik</h3>
                <p className="text-gray-600">
                  Tim yang berpengalaman, sistem booking online, dan fasilitas pendukung yang lengkap.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Team/Management */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Tim Management
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">R</span>
                </div>
                <h3 className="text-lg font-semibold mb-1">Rizky Manado</h3>
                <p className="text-green-600 mb-2">Owner & Founder</p>
                <p className="text-sm text-gray-600">
                  Pecinta futsal yang berdedikasi membangun venue futsal terbaik di Manado.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">A</span>
                </div>
                <h3 className="text-lg font-semibold mb-1">Andre Sondakh</h3>
                <p className="text-green-600 mb-2">Operations Manager</p>
                <p className="text-sm text-gray-600">
                  Mengawasi operasional harian dan memastikan kualitas pelayanan terbaik.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">M</span>
                </div>
                <h3 className="text-lg font-semibold mb-1">Maria Tangel</h3>
                <p className="text-green-600 mb-2">Customer Service Manager</p>
                <p className="text-sm text-gray-600">
                  Memastikan kepuasan pelanggan dan menangani kebutuhan khusus.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Location Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Lokasi & Kontak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Informasi Lokasi</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-green-600 mr-3 mt-1" />
                    <div>
                      <p className="font-medium">Alamat</p>
                      <p className="text-gray-600">{futsalCenter.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-green-600 mr-3 mt-1" />
                    <div>
                      <p className="font-medium">Jam Operasional</p>
                      <p className="text-gray-600">Setiap hari: {futsalCenter.operatingHours.weekdays}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Hubungi Kami</h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium">Telepon</p>
                    <p className="text-gray-600">{futsalCenter.contact.phone}</p>
                  </div>
                  <div>
                    <p className="font-medium">WhatsApp</p>
                    <p className="text-gray-600">{futsalCenter.contact.whatsapp}</p>
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">{futsalCenter.contact.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
