'use client'

import { useState, useEffect } from 'react'
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  DollarSign, 
  MapPin,
  Star,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { mockFields, mockBookings, mockUsers } from '@/data/mock-data'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    totalRevenue: 0,
    totalFields: 0,
    activeBookings: 0,
    completedBookings: 0,
    cancelledBookings: 0
  })

  const [recentBookings, setRecentBookings] = useState<any[]>([])
  const [recentUsers, setRecentUsers] = useState<any[]>([])

  useEffect(() => {
    // Calculate statistics
    const totalRevenue = mockBookings.reduce((sum, booking) => {
      return booking.status === 'confirmed' || booking.status === 'completed' 
        ? sum + booking.totalPrice 
        : sum
    }, 0)

    const activeBookings = mockBookings.filter(b => b.status === 'confirmed').length
    const completedBookings = mockBookings.filter(b => b.status === 'completed').length
    const cancelledBookings = mockBookings.filter(b => b.status === 'cancelled').length

    setStats({
      totalUsers: mockUsers.length,
      totalBookings: mockBookings.length,
      totalRevenue,
      totalFields: mockFields.length,
      activeBookings,
      completedBookings,
      cancelledBookings
    })

    // Get recent bookings (last 5)
    const sortedBookings = [...mockBookings]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5)
      .map(booking => ({
        ...booking,
        fieldName: mockFields.find(f => f.id === booking.fieldId)?.name || 'Unknown Field',
        userName: mockUsers.find(u => u.id === booking.userId)?.name || 'Unknown User'
      }))

    setRecentBookings(sortedBookings)

    // Get recent users (last 5)
    const sortedUsers = [...mockUsers]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5)

    setRecentUsers(sortedUsers)
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-blue-100 text-blue-800">Dikonfirmasi</Badge>
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Selesai</Badge>
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800">Dibatalkan</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Pending</Badge>
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
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
        <p className="text-gray-600">Kelola platform Jago Futsal Anda</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Pengguna
            </CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-green-600 mt-1">
              +12% dari bulan lalu
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Booking
            </CardTitle>
            <Calendar className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBookings}</div>
            <p className="text-xs text-green-600 mt-1">
              +8% dari bulan lalu
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Pendapatan
            </CardTitle>
            <DollarSign className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
            <p className="text-xs text-green-600 mt-1">
              +15% dari bulan lalu
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Lapangan
            </CardTitle>
            <MapPin className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalFields}</div>
            <p className="text-xs text-blue-600 mt-1">
              Aktif semua
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Booking Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Booking Aktif
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.activeBookings}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Booking Selesai
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.completedBookings}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Booking Dibatalkan
            </CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.cancelledBookings}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <Card>
          <CardHeader>
            <CardTitle>Booking Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{booking.fieldName}</p>
                    <p className="text-sm text-gray-600">{booking.userName}</p>
                    <p className="text-xs text-gray-500">
                      {formatDate(booking.date)} • {booking.timeSlot}
                    </p>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    {getStatusBadge(booking.status)}
                    <p className="text-sm font-medium">{formatCurrency(booking.totalPrice)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <Button variant="outline" className="w-full">
                Lihat Semua Booking
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Users */}
        <Card>
          <CardHeader>
            <CardTitle>Pengguna Baru</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-medium">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">
                      {formatDate(user.createdAt)}
                    </p>
                    <Badge variant="outline" className="mt-1">
                      {user.role === 'admin' ? 'Admin' : 'User biasa'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <Button variant="outline" className="w-full">
                Lihat Semua Pengguna
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Aksi Cepat</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="h-24 flex flex-col space-y-2">
              <MapPin className="h-6 w-6" />
              <span>Tambah Lapangan</span>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col space-y-2">
              <Calendar className="h-6 w-6" />
              <span>Kelola Jadwal</span>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col space-y-2">
              <Users className="h-6 w-6" />
              <span>Kelola Pengguna</span>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col space-y-2">
              <TrendingUp className="h-6 w-6" />
              <span>Lihat Laporan</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
