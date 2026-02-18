'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Star, MapPin, Clock, Users, Phone, Mail, Wifi, Car } from 'lucide-react'
import { FieldCard } from '@/components/FieldCard'
import { TestimonialSlider } from '@/components/TestimonialSlider'
import { mockFields, futsalCenter } from '@/lib/mockData'

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section with Background Image */}
      <section className="relative bg-gradient-to-r from-emerald-600 via-emerald-600 to-emerald-700 text-white py-16 md:py-24 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 opacity-30 z-0"
          style={{
            backgroundImage: 'url(/begraund.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Animated background shapes */}
        <div className="absolute inset-0 opacity-10 z-1">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl animate-pulse-soft"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl animate-pulse-soft delay-2000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="animate-slide-in-down">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg hero-text">
              Champion Futsal <br className="hidden sm:block" /> Manado
            </h1>
            <p className="text-lg md:text-xl mb-8 text-emerald-100 max-w-2xl mx-auto drop-shadow-md hero-text">
              Venue Futsal Terdepan di Manado, Sulawesi Utara dengan Lapangan Berkualitas dan Fasilitas Lengkap
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-in-up">
            <Button size="lg" className="bg-white text-emerald-600 hover:bg-slate-100 font-semibold h-12 px-8 transition-all hover:scale-105 shadow-lg" asChild>
              <Link href="/fields">
                🏐 Lihat Lapangan
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-emerald-600 font-semibold h-12 px-8 transition-all hover:scale-105 shadow-lg" asChild>
              <Link href={`tel:${futsalCenter.contact.phone}`}>
                📞 Hubungi Kami
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Search */}
      <section className="py-12 md:py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg shadow-md p-6 md:p-8 animate-slide-in-up border border-slate-200">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-slate-900">🔍 Cari Lapangan Tersedia</h2>
            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
              <div className="flex-1">
                <Input
                  placeholder="Cari Lapangan A, B, C atau Indoor/Outdoor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 text-base border-slate-300 focus:border-emerald-600"
                />
              </div>
              <Button className="bg-emerald-600 hover:bg-emerald-700 h-12 px-8 font-semibold transition-all hover:scale-105" asChild>
                <Link href="/fields">
                  Cari Sekarang
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Venue Info */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              ⭐ {futsalCenter.name}
            </h2>
            <div className="flex flex-col sm:flex-row justify-center items-center sm:items-center gap-4 sm:gap-8 text-slate-700 flex-wrap">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-amber-400 fill-current" />
                <span className="font-medium">{futsalCenter.rating}/5</span>
                <span className="text-sm">({futsalCenter.totalReviews} review)</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-emerald-600" />
                <span className="text-sm">{futsalCenter.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-sky-600" />
                <span className="text-sm">{futsalCenter.operatingHours.weekdays}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
            <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg border border-emerald-200 hover:shadow-lg transition-all card-hover">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900">3 Lapangan</h3>
              <p className="text-slate-700 text-sm">2 Indoor Premium & 1 Outdoor</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg border border-amber-200 hover:shadow-lg transition-all card-hover">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-white fill-current" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900">Rating {futsalCenter.rating}/5</h3>
              <p className="text-slate-700 text-sm">Dari {futsalCenter.totalReviews} pengguna</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-sky-50 to-cyan-50 rounded-lg border border-sky-200 hover:shadow-lg transition-all card-hover">
              <div className="w-16 h-16 bg-sky-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900">Buka 24 Jam</h3>
              <p className="text-slate-700 text-sm">Setiap hari 06:00-24:00</p>
            </div>
          </div>
        </div>
      </section>

      {/* Available Fields */}
      <section className="py-16 md:py-24 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              ⚽ Lapangan Tersedia
            </h2>
            <p className="text-slate-700 text-lg">
              Pilih lapangan yang sesuai dengan kebutuhan Anda
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {mockFields.map((field, index) => (
              <div key={field.id} className="animate-slide-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <FieldCard field={field} />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="px-8 h-12 font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-600 transition-all hover:scale-105 border-slate-300" asChild>
              <Link href="/fields">
                Lihat Semua Detail →
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Venue Information */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="animate-slide-in-up">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                📍 Tentang {futsalCenter.name}
              </h2>
              <p className="text-slate-700 leading-relaxed mb-6 text-lg">
                {futsalCenter.description}
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                  <MapPin className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-medium text-slate-900">Lokasi</div>
                    <span className="text-slate-700">{futsalCenter.address}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-sky-50 rounded-lg border border-sky-200">
                  <Phone className="h-5 w-5 text-sky-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-medium text-slate-900">Telepon</div>
                    <span className="text-slate-700">{futsalCenter.contact.phone}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <Mail className="h-5 w-5 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-medium text-slate-900">Email</div>
                    <span className="text-slate-700">{futsalCenter.contact.email}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-emerald-600 hover:bg-emerald-700 h-12 px-6 font-semibold transition-all hover:scale-105" size="lg" asChild>
                  <Link href={`https://wa.me/${futsalCenter.contact.whatsapp.replace('+', '')}`} target="_blank">
                    💬 Chat via WhatsApp
                  </Link>
                </Button>
                <Button variant="outline" className="h-12 px-6 font-semibold transition-all hover:scale-105 hover:bg-emerald-50 hover:border-emerald-600 text-slate-700 border-slate-300" size="lg" asChild>
                  <Link href={futsalCenter.mapUrl} target="_blank">
                    🗺️ Lihat di Maps
                  </Link>
                </Button>
              </div>
            </div>

            <div className="animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">🏆 Fasilitas Venue</h3>
              <div className="grid grid-cols-2 gap-4">
                {futsalCenter.facilities.map((facility, index) => {
                  const icons: Record<string, string> = {
                    'Toilet Bersih': '🚽',
                    'Parkir Luas': '🚗',
                    'Mushola': '🕌',
                    'Kantin': '🍽️',
                    'Ruang Ganti AC': '❄️',
                    'WiFi Gratis': '📶',
                    'Sound System': '🔊',
                    'CCTV 24 Jam': '📹'
                  }
                  return (
                    <div key={index} className="flex items-center gap-3 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-200 hover:shadow-md transition-all">
                      <span className="text-2xl">{icons[facility] || '✅'}</span>
                      <span className="text-slate-700 font-medium">{facility}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-slate-100 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              💬 Apa Kata Mereka
            </h2>
            <p className="text-slate-700 text-lg">
              Testimoni dari pengunjung Champion Futsal
            </p>
          </div>
          
          <TestimonialSlider />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl animate-pulse-soft"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ⚡ Siap Booking Lapangan?
          </h2>
          <p className="text-emerald-100 mb-8 text-lg max-w-2xl mx-auto">
            Hubungi kami sekarang atau lihat jadwal lapangan yang tersedia
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-emerald-600 hover:bg-slate-100 font-semibold h-12 px-8 transition-all hover:scale-105" asChild>
              <Link href="/fields">
                📅 Lihat Jadwal Lapangan
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-emerald-600 font-semibold h-12 px-8 transition-all hover:scale-105" asChild>
              <Link href={`https://wa.me/${futsalCenter.contact.whatsapp.replace('+', '')}`} target="_blank">
                💬 Chat di WhatsApp
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
