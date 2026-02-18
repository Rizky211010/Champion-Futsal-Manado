'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, MapPin, Star, Users, Clock, Shield, Trophy, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { FieldCard } from '@/components/FieldCard'
import { mockFields, mockTestimonials } from '@/data/mock-data'

export default function HomePage() {
  const [searchLocation, setSearchLocation] = useState('')
  const popularFields = mockFields.slice(0, 3)

  const features = [
    {
      icon: Search,
      title: 'Cari Mudah',
      description: 'Temukan lapangan futsal di sekitar Anda dengan mudah dan cepat'
    },
    {
      icon: Clock,
      title: 'Booking Cepat',
      description: 'Proses booking hanya dalam hitungan menit'
    },
    {
      icon: Shield,
      title: 'Pembayaran Aman',
      description: 'Sistem pembayaran terpercaya dan aman'
    },
    {
      icon: Trophy,
      title: 'Kualitas Terjamin',
      description: 'Lapangan berkualitas dengan fasilitas lengkap'
    }
  ]

  const stats = [
    { label: 'Lapangan Tersedia', value: '500+' },
    { label: 'Pengguna Aktif', value: '10K+' },
    { label: 'Booking Sukses', value: '25K+' },
    { label: 'Kota Tersedia', value: '50+' }
  ]

  const handleSearch = () => {
    if (searchLocation.trim()) {
      window.location.href = `/fields?location=${encodeURIComponent(searchLocation)}`
    } else {
      window.location.href = '/fields'
    }
  }

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Cari & Booking
                  <span className="text-yellow-400"> Lapangan Futsal</span>
                  <br />
                  Mudah dan Cepat!
                </h1>
                <p className="text-xl text-green-100 max-w-2xl">
                  Platform booking lapangan futsal terpercaya dengan pilihan lapangan terbaik 
                  di seluruh Indonesia. Proses mudah, harga transparan, kualitas terjamin.
                </p>
              </div>

              {/* Search Form */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-4">
                <h3 className="text-lg font-semibold">Mulai Pencarian Anda</h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      placeholder="Masukkan lokasi (Jakarta, Surabaya, dll)"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      className="pl-10 h-12 bg-white text-gray-900"
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                  </div>
                  <Button 
                    onClick={handleSearch}
                    size="lg" 
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold h-12 px-8"
                  >
                    <Search className="h-5 w-5 mr-2" />
                    Cari Lapangan
                  </Button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-yellow-400">
                      {stat.value}
                    </div>
                    <div className="text-sm text-green-100">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=400&fit=crop"
                  alt="Lapangan Futsal Modern"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Mengapa Pilih Jago Futsal?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Kami memberikan pengalaman booking lapangan futsal terbaik dengan berbagai keunggulan
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <feature.icon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Popular Fields Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Lapangan Populer
              </h2>
              <p className="text-xl text-gray-600">
                Lapangan futsal pilihan dengan rating terbaik
              </p>
            </div>
            <Link href="/fields">
              <Button variant="outline" size="lg">
                Lihat Semua
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularFields.map((field) => (
              <FieldCard key={field.id} field={field} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Apa Kata Pengguna Kami?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ribuan pengguna telah mempercayai Jago Futsal untuk kebutuhan booking lapangan mereka
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockTestimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 italic">"{testimonial.comment}"</p>
                <div className="flex items-center space-x-3">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">Pengguna Jago Futsal</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Siap untuk Bermain Futsal?
            </h2>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Bergabunglah dengan ribuan pengguna yang telah merasakan kemudahan booking 
              lapangan futsal di Jago Futsal
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/fields">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                  <Search className="h-5 w-5 mr-2" />
                  Cari Lapangan Sekarang
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
                  <Users className="h-5 w-5 mr-2" />
                  Daftar Gratis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
