'use client'

import { useState } from 'react'
import { 
  Search, 
  Filter, 
  Users as UsersIcon,
  Mail,
  Phone,
  Calendar,
  Shield,
  ShieldCheck,
  Ban,
  Eye,
  Edit,
  MoreHorizontal
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mockUsers, mockBookings } from '@/data/mock-data'

export default function UsersManagement() {
  const [users, setUsers] = useState(mockUsers)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState('all')

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.phone && user.phone.includes(searchTerm))
    
    const matchesRole = selectedRole === 'all' || user.role === selectedRole
    
    return matchesSearch && matchesRole
  })

  const getUserStats = (userId: string) => {
    const userBookings = mockBookings.filter(b => b.userId === userId)
    return {
      totalBookings: userBookings.length,
      completedBookings: userBookings.filter(b => b.status === 'completed').length,
      totalSpent: userBookings
        .filter(b => b.status === 'confirmed' || b.status === 'completed')
        .reduce((sum, b) => sum + b.totalPrice, 0)
    }
  }

  const handleToggleRole = (userId: string) => {
    if (window.confirm('Apakah Anda yakin ingin mengubah role pengguna ini?')) {
      setUsers(users.map(user => 
        user.id === userId 
          ? { ...user, role: user.role === 'admin' ? 'user' : 'admin' }
          : user
      ))
    }
  }

  const handleBanUser = (userId: string) => {
    if (window.confirm('Apakah Anda yakin ingin memblokir pengguna ini?')) {
      // In a real app, you would add a 'banned' status to the user
      alert('Pengguna telah diblokir')
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

  const getRoleBadge = (role: string) => {
    return role === 'admin' ? (
      <Badge className="bg-purple-100 text-purple-800">
        <ShieldCheck className="w-3 h-3 mr-1" />
        Admin
      </Badge>
    ) : (
      <Badge variant="outline">
        <UsersIcon className="w-3 h-3 mr-1" />
        User
      </Badge>
    )
  }

  // Statistics
  const stats = {
    total: users.length,
    admins: users.filter(u => u.role === 'admin').length,
    regularUsers: users.filter(u => u.role === 'user').length,
    recentUsers: users.filter(u => {
      const createdAt = new Date(u.createdAt)
      const now = new Date()
      const diffTime = now.getTime() - createdAt.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays <= 30
    }).length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kelola Pengguna</h1>
          <p className="text-gray-600">Manage all users and their permissions</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Pengguna</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <UsersIcon className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Admin</p>
                <p className="text-2xl font-bold text-purple-600">{stats.admins}</p>
              </div>
              <ShieldCheck className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">User Biasa</p>
                <p className="text-2xl font-bold text-blue-600">{stats.regularUsers}</p>
              </div>
              <UsersIcon className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">User Baru (30 hari)</p>
                <p className="text-2xl font-bold text-green-600">{stats.recentUsers}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              </div>
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
                  placeholder="Cari nama, email, atau nomor telepon..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="all">Semua Role</option>
                <option value="user">User Biasa</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Pengguna ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => {
              const stats = getUserStats(user.id)
              return (
                <div key={user.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {user.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-lg">{user.name}</h3>
                          {getRoleBadge(user.role)}
                        </div>
                        <div className="space-y-1">
                          <p className="text-gray-600 flex items-center space-x-1">
                            <Mail className="h-4 w-4" />
                            <span>{user.email}</span>
                          </p>
                          {user.phone && (
                            <p className="text-gray-600 flex items-center space-x-1">
                              <Phone className="h-4 w-4" />
                              <span>{user.phone}</span>
                            </p>
                          )}
                          <p className="text-gray-500 flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>Bergabung {formatDate(user.createdAt)}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                      {/* User Statistics */}
                      <div className="text-right space-y-1">
                        <div className="text-sm">
                          <span className="font-medium">{stats.totalBookings}</span>
                          <span className="text-gray-500"> booking</span>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">{stats.completedBookings}</span>
                          <span className="text-gray-500"> selesai</span>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium text-green-600">
                            {formatCurrency(stats.totalSpent)}
                          </span>
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleToggleRole(user.id)}
                          className={user.role === 'admin' ? 'text-blue-600' : 'text-purple-600'}
                        >
                          <Shield className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleBanUser(user.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Ban className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  {user.address && (
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-sm text-gray-600">
                        <strong>Alamat:</strong> {user.address}
                      </p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <UsersIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada pengguna ditemukan</h3>
              <p className="text-gray-500">Coba ubah filter pencarian Anda</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
