'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, Filter, MapPin, Grid, List, Star, Clock, Users } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { FieldCard } from '@/components/FieldCard'
import { FilterSidebar } from '@/components/FilterSidebar'
import { useFilterStore } from '@/store'
import { futsalCenter } from '@/data/mock-data'

export default function FieldsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const searchParams = useSearchParams()
  
  const { filteredFields, applyFilters } = useFilterStore()

  useEffect(() => {
    // Get initial search query from URL
    const search = searchParams.get('search')
    if (search) {
      setSearchQuery(search)
    }
    applyFilters()
  }, [searchParams, applyFilters])

  const handleSearch = () => {
    applyFilters()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Venue Header */}
      <section className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-4">
                <h1 className="text-3xl font-bold text-gray-900">
                  {futsalCenter.name}
                </h1>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-semibold">{futsalCenter.rating}</span>
                  <span className="text-gray-500">({futsalCenter.totalReviews} review)</span>
                </div>
              </div>
              
              <p className="text-gray-600 max-w-2xl">
                {futsalCenter.description}
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{futsalCenter.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Buka {futsalCenter.operatingHours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{filteredFields.length} Lapangan Tersedia</span>
                </div>
              </div>
            </div>
            
            <div className="relative h-48 lg:h-32 rounded-lg overflow-hidden">
              <Image
                src={futsalCenter.mainImage}
                alt={futsalCenter.name}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Filter Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Pilih Lapangan ({filteredFields.length} tersedia)
          </h2>
          
          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Cari lapangan (A, B, C) atau jenis (indoor, outdoor)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch} className="bg-green-600 hover:bg-green-700">
              <Search className="h-4 w-4 mr-2" />
              Cari
            </Button>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <span className="text-gray-600">
                {filteredFields.length} lapangan ditemukan
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="hidden sm:flex"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="hidden sm:flex"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar - Desktop */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <FilterSidebar />
          </div>

          {/* Mobile Filter Overlay */}
          {showFilters && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowFilters(false)} />
              <div className="fixed left-0 top-0 bottom-0 w-80 bg-white overflow-y-auto">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">Filter</h2>
                    <Button variant="ghost" onClick={() => setShowFilters(false)}>
                      ×
                    </Button>
                  </div>
                  <FilterSidebar />
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1">
            {filteredFields.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Tidak ada lapangan ditemukan
                </h3>
                <p className="text-gray-600">
                  Coba ubah kriteria pencarian atau filter Anda
                </p>
              </div>
            ) : (
              <div className={
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
                  : 'space-y-4'
              }>
                {filteredFields.map((field) => (
                  <FieldCard 
                    key={field.id} 
                    field={field} 
                    variant={viewMode === 'list' ? 'compact' : 'default'}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
