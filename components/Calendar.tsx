'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Field } from '@/data/mock-data'
import { formatCurrency } from '@/lib/utils'
import { useBookingStore } from '@/store'

interface CalendarProps {
  field: Field
}

export function Calendar({ field }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDateLocal] = useState<string | null>(null)
  
  const { setSelectedDate, setSelectedTime, selectedTime } = useBookingStore()

  // Generate dates for the next 30 days
  const generateDates = () => {
    const dates = []
    const today = new Date()
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      dates.push(date)
    }
    
    return dates
  }

  const dates = generateDates()
  
  // Get available hours for a specific date
  const getAvailableHours = (dateStr: string) => {
    const availability = field.availability[dateStr] || []
    const hours = []
    
    for (let hour = 6; hour < 24; hour++) {
      const index = hour - 6
      const isAvailable = availability[index] !== false
      hours.push({
        hour,
        available: isAvailable,
        price: getHourPrice(dateStr, hour)
      })
    }
    
    return hours
  }

  const getHourPrice = (dateStr: string, hour: number) => {
    const date = new Date(dateStr)
    const isWeekend = date.getDay() === 0 || date.getDay() === 6
    const isNight = hour >= 18
    
    if (isWeekend) {
      return isNight ? field.pricing.weekend.night : field.pricing.weekend.morning
    } else {
      return isNight ? field.pricing.weekday.night : field.pricing.weekday.morning
    }
  }

  const handleDateSelect = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0]
    setSelectedDateLocal(dateStr)
    setSelectedDate(dateStr)
    setSelectedTime(null) // Reset time selection
  }

  const handleTimeSelect = (startHour: number, endHour: number = startHour + 2) => {
    setSelectedTime({ start: startHour, end: endHour })
  }

  const formatDate = (date: Date) => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)
    
    if (date.toDateString() === today.toDateString()) {
      return 'Hari Ini'
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Besok'
    } else {
      return date.toLocaleDateString('id-ID', { 
        weekday: 'short', 
        day: 'numeric',
        month: 'short'
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Date Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Pilih Tanggal</h3>
        <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
          {dates.slice(0, 14).map((date) => {
            const dateStr = date.toISOString().split('T')[0]
            const isSelected = selectedDate === dateStr
            const isToday = date.toDateString() === new Date().toDateString()
            
            return (
              <Button
                key={dateStr}
                variant={isSelected ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleDateSelect(date)}
                className={`p-3 h-auto flex flex-col items-center ${
                  isSelected ? 'bg-green-600 hover:bg-green-700' : ''
                } ${isToday ? 'border-green-600' : ''}`}
              >
                <span className="text-xs opacity-75">
                  {formatDate(date)}
                </span>
                <span className="font-semibold">
                  {date.getDate()}
                </span>
              </Button>
            )
          })}
        </div>
      </div>

      {/* Time Selection */}
      {selectedDate && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Pilih Jam</h3>
          <div className="space-y-4">
            {/* Morning Hours */}
            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Pagi (06:00 - 18:00)
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {getAvailableHours(selectedDate)
                  .filter(h => h.hour < 18)
                  .map(({ hour, available, price }) => (
                    <Button
                      key={hour}
                      variant={selectedTime?.start === hour ? 'default' : 'outline'}
                      size="sm"
                      disabled={!available}
                      onClick={() => handleTimeSelect(hour)}
                      className={`flex flex-col h-auto py-2 ${
                        selectedTime?.start === hour ? 'bg-green-600 hover:bg-green-700' : ''
                      } ${!available ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <span className="text-xs">
                        {hour.toString().padStart(2, '0')}:00
                      </span>
                      <span className="text-xs font-normal">
                        {formatCurrency(price)}
                      </span>
                    </Button>
                  ))}
              </div>
            </div>

            {/* Night Hours */}
            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Malam (18:00 - 24:00)
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {getAvailableHours(selectedDate)
                  .filter(h => h.hour >= 18)
                  .map(({ hour, available, price }) => (
                    <Button
                      key={hour}
                      variant={selectedTime?.start === hour ? 'default' : 'outline'}
                      size="sm"
                      disabled={!available}
                      onClick={() => handleTimeSelect(hour)}
                      className={`flex flex-col h-auto py-2 ${
                        selectedTime?.start === hour ? 'bg-green-600 hover:bg-green-700' : ''
                      } ${!available ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <span className="text-xs">
                        {hour.toString().padStart(2, '0')}:00
                      </span>
                      <span className="text-xs font-normal">
                        {formatCurrency(price)}
                      </span>
                    </Button>
                  ))}
              </div>
            </div>
          </div>

          {/* Selected Time Summary */}
          {selectedTime && (
            <Card className="mt-4 bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="text-sm">
                  <div className="font-semibold text-green-800 mb-1">
                    Waktu Dipilih:
                  </div>
                  <div className="text-green-700">
                    {new Date(selectedDate).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="text-green-700">
                    Jam {selectedTime.start.toString().padStart(2, '0')}:00 - {selectedTime.end.toString().padStart(2, '0')}:00
                  </div>
                  <div className="font-semibold text-green-800 mt-2">
                    Total: {formatCurrency(getHourPrice(selectedDate, selectedTime.start) * (selectedTime.end - selectedTime.start))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 border border-gray-300 rounded"></div>
          <span>Tersedia</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-gray-300 rounded"></div>
          <span>Terboking</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-600 rounded"></div>
          <span>Dipilih</span>
        </div>
      </div>
    </div>
  )
}
