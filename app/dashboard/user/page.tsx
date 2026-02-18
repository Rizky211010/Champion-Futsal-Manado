'use client'

import { Calendar, Clock, MapPin, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FieldCard } from '@/components/FieldCard'
import { useAuthStore, useBookingStore } from '@/store'
import { mockFields } from '@/data/mock-data'
import { formatCurrency, formatDate } from '@/lib/utils'
import Link from 'next/link'

export default function UserDashboard() {
  const { user } = useAuthStore()
  const { bookings } = useBookingStore()

  // Filter bookings for current user
  const userBookings = bookings.filter(booking => 
    booking.customerName === user?.name
  )

  const upcomingBookings = userBookings.filter(booking => {
    const bookingDate = new Date(booking.date)
    const today = new Date()
    return bookingDate >= today && booking.status === 'confirmed'
  })

  const recentBookings = userBookings
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3)

  const totalSpent = userBookings.reduce((total, booking) => total + booking.price, 0)

  const stats = [
    {
      title: 'Total Booking',
      value: userBookings.length.toString(),
      icon: Calendar,
      description: 'Semua waktu'
    },
    {
      title: 'Booking Mendatang',
      value: upcomingBookings.length.toString(),
      icon: Clock,
      description: 'Yang akan datang'
    },
    {
      title: 'Total Pengeluaran',
      value: formatCurrency(totalSpent),
      icon: TrendingUp,
      description: 'Semua waktu'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Selamat datang, {user?.name}! 👋
        </h1>
        <p className="text-gray-600 mt-2">
          Kelola booking dan profil Anda di dashboard ini.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <stat.icon className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Bookings */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Booking Mendatang</CardTitle>
            <Link href="/dashboard/user/bookings">
              <Button variant="outline" size="sm">
                Lihat Semua
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {upcomingBookings.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Belum ada booking mendatang</p>
                <Link href="/fields">
                  <Button className="bg-green-600 hover:bg-green-700">
                    Cari Lapangan
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingBookings.slice(0, 3).map((booking) => (
                  <div key={booking.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {booking.fieldName}
                        </h4>
                        <div className="text-sm text-gray-600 mt-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(new Date(booking.date))}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>
                              {booking.startTime.toString().padStart(2, '0')}:00 - 
                              {booking.endTime.toString().padStart(2, '0')}:00
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">
                          {formatCurrency(booking.price)}
                        </div>
                        <div className="text-xs text-gray-500 capitalize">
                          {booking.status}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Aktivitas Terakhir</CardTitle>
          </CardHeader>
          <CardContent>
            {recentBookings.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Belum ada aktivitas</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Calendar className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        Booking {booking.fieldName}
                      </p>
                      <p className="text-sm text-gray-600">
                        {formatDate(new Date(booking.createdAt))}
                      </p>
                    </div>
                    <div className="text-sm font-medium text-green-600">
                      {formatCurrency(booking.price)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recommended Fields */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Lapangan Rekomendasi</CardTitle>
          <Link href="/fields">
            <Button variant="outline" size="sm">
              Lihat Semua
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockFields.slice(0, 3).map((field) => (
              <FieldCard key={field.id} field={field} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
