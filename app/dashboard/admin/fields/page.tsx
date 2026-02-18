'use client'

import { useState } from 'react'
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  MapPin, 
  Star,
  Users,
  Clock,
  Eye,
  MoreHorizontal
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mockFields } from '@/data/mock-data'

export default function FieldsManagement() {
  const [fields, setFields] = useState(mockFields)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')

  const filteredFields = fields.filter(field => {
    const matchesSearch = field.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         field.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || 
                         (selectedStatus === 'active' && field.isActive) ||
                         (selectedStatus === 'inactive' && !field.isActive)
    return matchesSearch && matchesStatus
  })

  const handleDeleteField = (fieldId: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus lapangan ini?')) {
      setFields(fields.filter(f => f.id !== fieldId))
    }
  }

  const toggleFieldStatus = (fieldId: string) => {
    setFields(fields.map(field => 
      field.id === fieldId 
        ? { ...field, isActive: !field.isActive }
        : field
    ))
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kelola Lapangan</h1>
          <p className="text-gray-600">Manage all futsal fields in the system</p>
        </div>
        <Button className="space-x-2">
          <Plus className="h-4 w-4" />
          <span>Tambah Lapangan</span>
        </Button>
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
                <option value="active">Aktif</option>
                <option value="inactive">Tidak Aktif</option>
              </select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Lapangan</p>
                <p className="text-2xl font-bold">{fields.length}</p>
              </div>
              <MapPin className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Lapangan Aktif</p>
                <p className="text-2xl font-bold text-green-600">
                  {fields.filter(f => f.isActive).length}
                </p>
              </div>
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rating Rata-rata</p>
                <p className="text-2xl font-bold">
                  {(fields.reduce((sum, f) => sum + f.rating, 0) / fields.length).toFixed(1)}
                </p>
              </div>
              <Star className="h-8 w-8 text-yellow-400 fill-current" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Harga Rata-rata</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(fields.reduce((sum, f) => sum + f.pricePerHour, 0) / fields.length)}
                </p>
              </div>
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                Rp
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fields List */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Lapangan ({filteredFields.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredFields.map((field) => (
              <div key={field.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <MapPin className="h-8 w-8 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-lg">{field.name}</h3>
                        <Badge variant={field.isActive ? "default" : "secondary"}>
                          {field.isActive ? 'Aktif' : 'Tidak Aktif'}
                        </Badge>
                      </div>
                      <p className="text-gray-600 flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{field.location}</span>
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm">{field.rating}</span>
                          <span className="text-sm text-gray-500">({field.reviewCount} review)</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{field.capacity} orang</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{field.operatingHours}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="text-right mr-4">
                      <p className="font-semibold text-lg">{formatCurrency(field.pricePerHour)}</p>
                      <p className="text-sm text-gray-500">per jam</p>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => toggleFieldStatus(field.id)}
                        className={field.isActive ? 'text-red-600' : 'text-green-600'}
                      >
                        {field.isActive ? 'Nonaktifkan' : 'Aktifkan'}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteField(field.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Facilities */}
                <div className="mt-3 pt-3 border-t">
                  <p className="text-sm text-gray-600 mb-2">Fasilitas:</p>
                  <div className="flex flex-wrap gap-2">
                    {field.facilities.map((facility, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {facility}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredFields.length === 0 && (
            <div className="text-center py-12">
              <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada lapangan ditemukan</h3>
              <p className="text-gray-500">Coba ubah filter pencarian Anda</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
