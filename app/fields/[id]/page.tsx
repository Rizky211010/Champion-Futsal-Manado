'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Star, MapPin, Users, Wifi, Car, WashingMachine, 
  Coffee, Shield, ArrowLeft, Calendar, Clock, 
  CheckCircle, Phone, Mail, Home, Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar as CalendarComponent } from '@/components/Calendar'
import { BookingModal } from '@/components/BookingModal'
import { mockFields, mockReviews, Field, Review, futsalCenter } from '@/data/mock-data'
import { formatCurrency, formatDate } from '@/lib/utils'
import { useBookingStore } from '@/store'

const facilityIcons: Record<string, any> = {
  'Toilet Bersih': WashingMachine,
  'Parkir Luas': Car,
  'Mushola': Shield,
  'Kantin': Coffee,
  'Ruang Ganti AC': WashingMachine,
  'AC Full Blast': Zap,
  'WiFi Gratis': Wifi,
  'Sound System': Users,
  'Scoreboard Digital': CheckCircle,
  'Tribun VIP': Star,
  'Ventilasi Baik': Shield,
  'Papan Skor Manual': CheckCircle,
  'Pencahayaan Alami': Star
}

export default function FieldDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [field, setField] = useState<Field | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [isLoadingField, setIsLoadingField] = useState(true)
  
  const { setSelectedField, selectedDate, selectedTime } = useBookingStore()

  useEffect(() => {
    const fieldId = params.id as string
    const foundField = mockFields.find(f => f.id === fieldId)
    if (foundField) {
      setField(foundField)
      setSelectedField(foundField)
      setSelectedImages(foundField.images)
      setReviews(mockReviews.filter(r => r.fieldId === fieldId))
    } else {
      router.push('/fields')
    }
  }, [params.id, router, setSelectedField])

  const handleBookNow = () => {
    if (selectedDate && selectedTime) {
      setShowBookingModal(true)
    } else {
      // Scroll to calendar
      document.getElementById('booking-calendar')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (!field) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p>Memuat data lapangan...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/fields">
            <Button variant="outline" className="mb-4 hover:bg-gray-100 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke Pencarian
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Venue Header */}
            <Card>
              <CardContent className="p-6">
                <div className="mb-4">
                  <Link href="/fields" className="text-green-600 hover:text-green-700 flex items-center gap-2 text-sm font-medium">
                    <Home className="h-4 w-4" />
                    {futsalCenter.name}
                  </Link>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{field.name}</h1>
                    <div className="flex flex-col gap-3 text-gray-600 mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-green-600" />
                        <span className="text-sm md:text-base">{futsalCenter.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-green-600" />
                        <span className="text-sm md:text-base">Kapasitas {field.specifications.capacity} orang</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant={field.type === 'indoor' ? 'default' : 'secondary'} className="text-xs md:text-sm">
                        {field.type === 'indoor' ? '🏠 Indoor' : '🌤️ Outdoor'}
                      </Badge>
                      <Badge variant="outline" className="text-xs md:text-sm">
                        📏 {field.size}
                      </Badge>
                      <Badge variant="outline" className="text-xs md:text-sm">
                        🏐 {field.specifications.surface}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-2 mb-2">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="font-semibold text-lg">{futsalCenter.rating}</span>
                      <span className="text-gray-500 text-sm">({futsalCenter.totalReviews} review)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="relative h-64 sm:h-80 md:h-96 rounded-t-lg overflow-hidden bg-gray-200">
                  <Image
                    src={selectedImages[currentImageIndex]}
                    alt={field.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    priority
                  />
                  {/* Image Counter */}
                  <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {selectedImages.length}
                  </div>
                </div>
                {selectedImages.length > 1 && (
                  <div className="p-4 bg-white">
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {selectedImages.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                            currentImageIndex === index ? 'border-green-600 ring-2 ring-green-300' : 'border-gray-200'
                          }`}
                        >
                          <Image
                            src={image}
                            alt={`${field.name} ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>            {/* Field Description & Specs */}
            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Tentang {field.name}</h2>
                  <p className="text-gray-700 leading-relaxed">{field.description}</p>
                </div>

                {/* Specifications */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Spesifikasi Lapangan</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-100 hover:shadow-md transition-shadow">
                      <div className="font-medium text-gray-900 mb-1 text-sm">Ukuran</div>
                      <div className="text-gray-600 font-semibold">{field.specifications.length}m x {field.specifications.width}m</div>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-100 hover:shadow-md transition-shadow">
                      <div className="font-medium text-gray-900 mb-1 text-sm">Permukaan</div>
                      <div className="text-gray-600 font-semibold">{field.specifications.surface}</div>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border border-yellow-100 hover:shadow-md transition-shadow">
                      <div className="font-medium text-gray-900 mb-1 text-sm">Pencahayaan</div>
                      <div className="text-gray-600 font-semibold">{field.specifications.lighting}</div>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-100 hover:shadow-md transition-shadow">
                      <div className="font-medium text-gray-900 mb-1 text-sm">Kapasitas</div>
                      <div className="text-gray-600 font-semibold">{field.specifications.capacity} orang</div>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Fasilitas Lapangan</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3">
                    {field.features.map((feature) => {
                      const Icon = facilityIcons[feature] || CheckCircle
                      return (
                        <div key={feature} className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100 hover:shadow-md transition-shadow">
                          <Icon className="h-5 w-5 text-green-600 flex-shrink-0" />
                          <span className="text-sm font-medium text-gray-700">{feature}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Venue Facilities */}
            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Fasilitas {futsalCenter.name}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {futsalCenter.facilities.map((facility) => {
                      const Icon = facilityIcons[facility] || CheckCircle
                      return (
                        <div key={facility} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                          <Icon className="h-5 w-5 text-green-600" />
                          <span className="text-sm font-medium">{facility}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6">💰 Harga Sewa</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border-2 border-green-200 rounded-lg p-5 bg-gradient-to-br from-green-50 to-white hover:shadow-lg transition-shadow">
                      <h4 className="font-semibold text-green-600 mb-4 flex items-center gap-2">
                        📅 Hari Kerja (Senin-Jumat)
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center pb-2 border-b border-green-100">
                          <span className="text-gray-600">☀️ Pagi (06:00-18:00)</span>
                          <span className="font-semibold text-green-600">{formatCurrency(field.pricing.weekday.morning)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">🌙 Malam (18:00-24:00)</span>
                          <span className="font-semibold text-green-600">{formatCurrency(field.pricing.weekday.night)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="border-2 border-blue-200 rounded-lg p-5 bg-gradient-to-br from-blue-50 to-white hover:shadow-lg transition-shadow">
                      <h4 className="font-semibold text-blue-600 mb-4 flex items-center gap-2">
                        🎉 Weekend (Sabtu-Minggu)
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center pb-2 border-b border-blue-100">
                          <span className="text-gray-600">☀️ Pagi (06:00-18:00)</span>
                          <span className="font-semibold text-blue-600">{formatCurrency(field.pricing.weekend.morning)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">🌙 Malam (18:00-24:00)</span>
                          <span className="font-semibold text-blue-600">{formatCurrency(field.pricing.weekend.night)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-400" />
                  Review ({reviews.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 font-semibold">
                            {review.customerName.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold">{review.customerName}</span>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">
                              {formatDate(new Date(review.createdAt))}
                            </span>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="sticky top-20">
              <CardContent className="p-6 space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    Mulai dari {formatCurrency(Math.min(
                      field.pricing.weekday.morning,
                      field.pricing.weekday.night,
                      field.pricing.weekend.morning,
                      field.pricing.weekend.night
                    ))}
                  </div>
                  <div className="text-sm text-gray-600">per jam</div>
                </div>
                <Button 
                  onClick={handleBookNow}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold h-12 transition-all duration-300 transform hover:scale-105"
                  size="lg"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  {selectedDate && selectedTime ? 'Konfirmasi Booking' : 'Pilih Jadwal'}
                </Button>
                <div className="flex gap-2">
                  <Link href={`tel:${futsalCenter.contact.phone}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full hover:bg-green-50">
                      <Phone className="h-4 w-4 mr-2" />
                      Telepon
                    </Button>
                  </Link>
                  <Link href={`https://wa.me/${futsalCenter.contact.whatsapp.replace('+', '')}`} className="flex-1" target="_blank">
                    <Button variant="outline" size="sm" className="w-full hover:bg-green-50">
                      <Phone className="h-4 w-4 mr-2" />
                      WhatsApp
                    </Button>
                  </Link>
                </div>
                {selectedDate && selectedTime && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 animate-fade-in">
                    <div className="text-sm font-medium text-green-800 mb-1">
                      ✅ Jadwal Dipilih:
                    </div>
                    <div className="text-sm text-green-700">
                      {formatDate(new Date(selectedDate))}
                    </div>
                    <div className="text-sm text-green-700">
                      Jam {selectedTime.start}:00 - {selectedTime.end}:00
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Calendar */}
            <Card id="booking-calendar">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Pilih Jadwal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CalendarComponent field={field} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal 
        open={showBookingModal}
        onClose={() => setShowBookingModal(false)}
      />
    </div>
  )
}
