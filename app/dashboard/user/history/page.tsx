'use client'

import { useState, useEffect } from 'react'
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Star,
  Search,
  Filter,
  Download,
  Eye,
  MessageCircle,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuthStore } from '@/store'
import { mockBookings, mockFields } from '@/data/mock-data'

export default function BookingHistory() {
  const { user } = useAuthStore()
  const [userBookings, setUserBookings] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')

  useEffect(() => {
    if (!user) return

    // Get user bookings with field data
    const bookings = mockBookings
      .filter(booking => booking.userId === user.id)
      .map(booking => ({
        ...booking,
        field: mockFields.find(f => f.id === booking.fieldId)
      }))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    setUserBookings(bookings)
  }, [user])

  const filteredBookings = userBookings.filter(booking => {
    const matchesSearch = booking.field?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.field?.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || booking.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Dikonfirmasi
          </Badge>
        )
      case 'completed':
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Selesai
          </Badge>
        )
      case 'cancelled':
        return (
          <Badge className="bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            Dibatalkan
          </Badge>
        )
      default:
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const formatTime = (timeString: string) => {
    const [start, end] = timeString.split(' - ')
    return `${start} - ${end}`
  }

  const canCancelBooking = (booking: any) => {
    const bookingDateTime = new Date(`${booking.date} ${booking.timeSlot.split(' - ')[0]}`)
    const now = new Date()
    const hoursDiff = (bookingDateTime.getTime() - now.getTime()) / (1000 * 60 * 60)
    return booking.status === 'confirmed' && hoursDiff > 24 // Can cancel if more than 24 hours before
  }

  const handleCancelBooking = (bookingId: string) => {
    if (window.confirm('Apakah Anda yakin ingin membatalkan booking ini?')) {
      setUserBookings(userBookings.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'cancelled' }
          : booking
      ))
    }
  }

  const canRebookField = (booking: any) => {
    return booking.status === 'completed' || booking.status === 'cancelled'
  }

  // Statistics
  const stats = {
    total: userBookings.length,
    confirmed: userBookings.filter(b => b.status === 'confirmed').length,
    completed: userBookings.filter(b => b.status === 'completed').length,
    cancelled: userBookings.filter(b => b.status === 'cancelled').length,
    totalSpent: userBookings
      .filter(b => b.status === 'confirmed' || b.status === 'completed')
      .reduce((sum, b) => sum + b.totalPrice, 0)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Riwayat Booking</h1>
          <p className="text-gray-600">Lihat semua booking lapangan futsal Anda</p>
        </div>
        <Button variant="outline" className="space-x-2">
          <Download className="h-4 w-4" />
          <span>Download Riwayat</span>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-sm text-gray-600">Total Booking</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{stats.confirmed}</p>
              <p className="text-sm text-gray-600">Dikonfirmasi</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
              <p className="text-sm text-gray-600">Selesai</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{stats.cancelled}</p>
              <p className="text-sm text-gray-600">Dibatalkan</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-lg font-bold text-green-600">
                {formatCurrency(stats.totalSpent)}
              </p>
              <p className="text-sm text-gray-600">Total Pengeluaran</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Cari nama lapangan atau lokasi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="all">Semua Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Dikonfirmasi</option>
                <option value="completed">Selesai</option>
                <option value="cancelled">Dibatalkan</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bookings List */}
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Booking ({filteredBookings.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <div key={booking.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    {/* Header Info */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{booking.field?.name}</h3>
                        <p className="text-gray-600 flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{booking.field?.location}</span>
                        </p>
                      </div>
                      {getStatusBadge(booking.status)}
                    </div>

                    {/* Booking Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{formatDate(booking.date)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{formatTime(booking.timeSlot)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">
                          Booking ID: {booking.id.slice(0, 8).toUpperCase()}
                        </span>
                      </div>
                    </div>

                    {/* Field Rating */}
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm">{booking.field?.rating}</span>
                      <span className="text-sm text-gray-500">
                        • {booking.players} pemain • {booking.duration} jam
                      </span>
                    </div>
                  </div>

                  {/* Price and Actions */}
                  <div className="ml-4 flex flex-col items-end space-y-2">
                    <div className="text-right">
                      <p className="font-semibold text-lg">{formatCurrency(booking.totalPrice)}</p>
                      <p className="text-sm text-gray-500">
                        {booking.duration} jam × {formatCurrency(booking.pricePerHour)}
                      </p>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      
                      {booking.status === 'completed' && (
                        <Button variant="outline" size="sm">
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                      )}
                      
                      {canRebookField(booking) && (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <RefreshCw className="h-4 w-4 mr-1" />
                          Book Lagi
                        </Button>
                      )}
                      
                      {canCancelBooking(booking) && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleCancelBooking(booking.id)}
                          className="text-red-600 border-red-600 hover:bg-red-50"
                        >
                          Batalkan
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredBookings.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada riwayat booking</h3>
              <p className="text-gray-500 mb-4">Anda belum pernah melakukan booking lapangan futsal</p>
              <Button>
                Cari Lapangan Sekarang
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
