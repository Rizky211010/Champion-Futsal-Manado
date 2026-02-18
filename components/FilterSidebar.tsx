'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Star, RefreshCw } from 'lucide-react'
import { useFilterStore } from '@/store'
import { formatCurrency } from '@/lib/utils'

export function FilterSidebar() {
  const {
    priceRange,
    facilities,
    minRating,
    sortBy,
    setPriceRange,
    setFacilities,
    setMinRating,
    setSortBy,
    applyFilters
  } = useFilterStore()
  const availableFacilities = [
    'AC Full Blast',
    'Sound System', 
    'Scoreboard Digital',
    'Tribun VIP',
    'Ventilasi Baik',
    'Papan Skor Manual',
    'Pencahayaan Alami'
  ]

  const fieldTypes = [
    { id: 'indoor', label: 'Indoor' },
    { id: 'outdoor', label: 'Outdoor' }
  ]

  const handleFacilityChange = (facility: string, checked: boolean) => {
    if (checked) {
      setFacilities([...facilities, facility])
    } else {
      setFacilities(facilities.filter(f => f !== facility))
    }
    applyFilters()
  }

  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]])
    applyFilters()  
  }

  const handleRatingChange = (rating: number) => {
    setMinRating(rating)
    applyFilters()
  }

  const handleSortChange = (value: string) => {
    setSortBy(value as 'price-asc' | 'price-desc' | 'rating-desc')
    applyFilters()
  }

  const resetFilters = () => {
    setPriceRange([50000, 300000])
    setFacilities([])
    setMinRating(0)
    setSortBy('rating-desc')
    applyFilters()
  }

  return (
    <div className="space-y-6">
      {/* Reset Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Filter</h2>
        <Button variant="outline" size="sm" onClick={resetFilters}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>

      {/* Sort */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Urutkan</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating-desc">Rating Tertinggi</SelectItem>
              <SelectItem value="price-asc">Harga Termurah</SelectItem>
              <SelectItem value="price-desc">Harga Termahal</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Rentang Harga</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={handlePriceChange}
            min={50000}
            max={300000}
            step={10000}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>{formatCurrency(priceRange[0])}</span>
            <span>{formatCurrency(priceRange[1])}</span>
          </div>
        </CardContent>
      </Card>

      {/* Rating */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Rating Minimal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[4, 3, 2, 1, 0].map((rating) => (
              <div
                key={rating}
                className={`flex items-center space-x-3 cursor-pointer p-2 rounded-lg transition-colors ${
                  minRating === rating ? 'bg-green-50 border border-green-200' : 'hover:bg-gray-50'
                }`}
                onClick={() => handleRatingChange(rating)}
              >
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm">
                  {rating === 0 ? 'Semua rating' : `${rating}+ bintang`}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>      {/* Facilities */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Fasilitas Lapangan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {availableFacilities.map((facility) => (
              <div key={facility} className="flex items-center space-x-2">
                <Checkbox
                  id={facility}
                  checked={facilities.includes(facility)}
                  onCheckedChange={(checked) => 
                    handleFacilityChange(facility, checked as boolean)
                  }
                />
                <Label 
                  htmlFor={facility}
                  className="text-sm font-normal cursor-pointer"
                >
                  {facility}
                </Label>              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Field Type */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Jenis Lapangan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {fieldTypes.map((type) => (
              <div key={type.id} className="flex items-center space-x-2">
                <Checkbox
                  id={type.id}
                  checked={facilities.includes(type.id)}
                  onCheckedChange={(checked) => handleFacilityChange(type.id, checked as boolean)}
                />
                <Label htmlFor={type.id} className="text-sm font-medium cursor-pointer">
                  {type.label}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Map Toggle (Future Feature) */}
      <Card>
        <CardContent className="pt-6">
          <Button variant="outline" className="w-full" disabled>
            <span className="mr-2">🗺️</span>
            Tampilkan Peta
            <span className="ml-2 text-xs text-gray-500">(Segera)</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
