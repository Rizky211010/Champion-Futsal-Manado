'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { MapPin, Phone, Mail, Clock, MessageCircle, Car, Utensils } from 'lucide-react'
import { futsalCenter } from '@/lib/mockData'
import Link from 'next/link'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Hubungi Champion Futsal
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ada pertanyaan atau ingin booking lapangan? Tim kami siap membantu Anda 24/7
          </p>
        </div>

        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Telepon</h3>
              <p className="text-gray-600 mb-4">{futsalCenter.contact.phone}</p>
              <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                <Link href={`tel:${futsalCenter.contact.phone}`}>
                  Hubungi Sekarang
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">WhatsApp</h3>
              <p className="text-gray-600 mb-4">{futsalCenter.contact.whatsapp}</p>
              <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                <Link href={`https://wa.me/${futsalCenter.contact.whatsapp.replace('+', '')}`} target="_blank">
                  Chat WhatsApp
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-gray-600 mb-4">{futsalCenter.contact.email}</p>
              <Button asChild variant="outline" className="w-full">
                <Link href={`mailto:${futsalCenter.contact.email}`}>
                  Kirim Email
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Kirim Pesan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Lengkap
                  </label>
                  <Input placeholder="Masukkan nama lengkap" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nomor WhatsApp
                  </label>
                  <Input placeholder="08xxxxxxxxxx" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <Input type="email" placeholder="nama@email.com" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Topik
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih topik pertanyaan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="booking">Booking Lapangan</SelectItem>
                    <SelectItem value="pricing">Informasi Harga</SelectItem>
                    <SelectItem value="facilities">Fasilitas</SelectItem>
                    <SelectItem value="event">Event & Tournament</SelectItem>
                    <SelectItem value="complaint">Keluhan</SelectItem>
                    <SelectItem value="other">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pesan
                </label>
                <textarea 
                  className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Tulis pesan Anda di sini..."
                  rows={4}
                />
              </div>
              
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Kirim Pesan
              </Button>
            </CardContent>
          </Card>

          {/* Location & Info */}
          <div className="space-y-6">
            {/* Location Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-green-600" />
                  Lokasi & Alamat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Alamat Lengkap</h4>
                    <p className="text-gray-600">{futsalCenter.address}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Akses Transportasi</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 10 menit dari Mega Mall Manado</li>
                      <li>• 15 menit dari Mantos (Manado Town Square)</li>
                      <li>• 20 menit dari Bandara Sam Ratulangi</li>
                      <li>• Akses mudah dari arah Boulevard</li>
                    </ul>
                  </div>
                  
                  <Button asChild variant="outline" className="w-full">
                    <Link href={futsalCenter.mapUrl} target="_blank">
                      🗺️ Buka di Google Maps
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Operating Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-green-600" />
                  Jam Operasional
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Senin - Minggu</span>
                    <Badge variant="secondary">{futsalCenter.operatingHours.weekdays}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Hari Libur Nasional</span>
                    <Badge variant="secondary">06:00 - 22:00</Badge>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg mt-4">
                    <p className="text-sm text-green-700">
                      💡 <strong>Tips:</strong> Booking H-1 untuk mendapatkan slot terbaik!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Services */}
            <Card>
              <CardHeader>
                <CardTitle>Layanan Tambahan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Car className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Parkir Gratis</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Utensils className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Kantin</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Konsultasi Gratis</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Booking Online</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Pertanyaan Yang Sering Diajukan
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Bagaimana cara booking lapangan?
                </h3>
                <p className="text-gray-600 text-sm">
                  Anda bisa booking melalui WhatsApp, telepon, atau langsung datang ke venue. 
                  Sistem booking online sedang dalam pengembangan.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Apakah ada biaya tambahan?
                </h3>
                <p className="text-gray-600 text-sm">
                  Tidak ada biaya tambahan. Harga sudah termasuk penggunaan lapangan, 
                  bola, dan fasilitas ruang ganti.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Apakah bisa cancel booking?
                </h3>
                <p className="text-gray-600 text-sm">
                  Bisa cancel H-1 tanpa biaya. Cancel H+0 dikenakan biaya 50% dari total booking.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Apakah tersedia penyewaan sepatu?
                </h3>
                <p className="text-gray-600 text-sm">
                  Saat ini belum tersedia penyewaan sepatu. Silakan bawa sepatu futsal sendiri.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
