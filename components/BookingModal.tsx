'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Calendar, Clock, MapPin, User, Phone, CreditCard, CheckCircle } from 'lucide-react'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { useBookingStore, useAuthStore } from '@/store'
import { formatCurrency, formatDate } from '@/lib/utils'

interface BookingModalProps {
  open: boolean
  onClose: () => void
}

export function BookingModal({ open, onClose }: BookingModalProps) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: ''
  })
  const [paymentMethod, setPaymentMethod] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  
  const { 
    selectedField, 
    selectedDate, 
    selectedTime, 
    addBooking, 
    clearBooking 
  } = useBookingStore()
  
  const { user, isAuthenticated } = useAuthStore()

  if (!selectedField || !selectedDate || !selectedTime) {
    return null
  }

  const getHourPrice = (hour: number) => {
    const date = new Date(selectedDate)
    const isWeekend = date.getDay() === 0 || date.getDay() === 6
    const isNight = hour >= 18
    
    if (isWeekend) {
      return isNight ? selectedField.pricing.weekend.night : selectedField.pricing.weekend.morning
    } else {
      return isNight ? selectedField.pricing.weekday.night : selectedField.pricing.weekday.morning
    }
  }

  const duration = selectedTime.end - selectedTime.start
  const pricePerHour = getHourPrice(selectedTime.start)
  const totalPrice = pricePerHour * duration

  const handleNext = () => {
    if (step === 1) {
      if (!isAuthenticated) {
        // Redirect to login
        onClose()
        router.push('/auth/login')
        return
      }
      setStep(2)
    } else if (step === 2) {
      setStep(3)
    }
  }

  const handleBooking = async () => {
    setIsProcessing(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Add booking to store
    addBooking({
      fieldId: selectedField.id,
      fieldName: selectedField.name,
      date: selectedDate,
      startTime: selectedTime.start,
      endTime: selectedTime.end,
      price: totalPrice,
      status: 'confirmed',
      customerName: user?.name || customerInfo.name,
      customerPhone: customerInfo.phone
    })
    
    setIsProcessing(false)
    setStep(4)
  }

  const handleClose = () => {
    if (step === 4) {
      clearBooking()
    }
    setStep(1)
    setCustomerInfo({ name: '', phone: '', email: '' })
    setPaymentMethod('')
    onClose()
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Ringkasan Booking</h3>
              <Card>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <div className="font-semibold">{selectedField.name}</div>
                      <div className="text-sm text-gray-600">{selectedField.location}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-green-600" />
                    <div className="text-sm">
                      {formatDate(new Date(selectedDate))}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-green-600" />
                    <div className="text-sm">
                      {selectedTime.start.toString().padStart(2, '0')}:00 - {selectedTime.end.toString().padStart(2, '0')}:00
                      <span className="text-gray-600 ml-2">({duration} jam)</span>
                    </div>
                  </div>
                  
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total Harga:</span>
                      <span className="text-xl font-bold text-green-600">
                        {formatCurrency(totalPrice)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {!isAuthenticated && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <User className="h-5 w-5 text-yellow-600" />
                  <span className="font-medium text-yellow-800">Login Diperlukan</span>
                </div>
                <p className="text-sm text-yellow-700">
                  Anda perlu login untuk melanjutkan proses booking.
                </p>
              </div>
            )}
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Informasi Kontak</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <Input
                    id="name"
                    value={customerInfo.name || user?.name || ''}
                    onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                    placeholder="Masukkan nama lengkap"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Nomor HP</Label>
                  <Input
                    id="phone"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                    placeholder="Masukkan nomor HP"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerInfo.email || user?.email || ''}
                    onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                    placeholder="Masukkan email"
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Metode Pembayaran</h3>
              <div className="space-y-3">
                {[
                  { id: 'bank_transfer', name: 'Transfer Bank', desc: 'BCA, Mandiri, BNI, BRI' },
                  { id: 'e_wallet', name: 'E-Wallet', desc: 'OVO, GoPay, Dana, LinkAja' },
                  { id: 'credit_card', name: 'Kartu Kredit', desc: 'Visa, Mastercard' }
                ].map((method) => (
                  <Card 
                    key={method.id} 
                    className={`cursor-pointer transition-colors ${
                      paymentMethod === method.id ? 'border-green-600 bg-green-50' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setPaymentMethod(method.id)}
                  >
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        paymentMethod === method.id ? 'border-green-600 bg-green-600' : 'border-gray-300'
                      }`}>
                        {paymentMethod === method.id && (
                          <div className="w-full h-full bg-white rounded-full scale-50"></div>
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{method.name}</div>
                        <div className="text-sm text-gray-600">{method.desc}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-800">Total Pembayaran</span>
              </div>
              <div className="text-2xl font-bold text-blue-900">
                {formatCurrency(totalPrice)}
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                Booking Berhasil!
              </h3>
              <p className="text-gray-600">
                Terima kasih! Booking Anda telah dikonfirmasi.
              </p>
            </div>
            <Card>
              <CardContent className="p-4 text-left space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">ID Booking:</span>
                  <span className="font-medium">BK{Date.now()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lapangan:</span>
                  <span className="font-medium">{selectedField.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tanggal:</span>
                  <span className="font-medium">{formatDate(new Date(selectedDate))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Waktu:</span>
                  <span className="font-medium">
                    {selectedTime.start.toString().padStart(2, '0')}:00 - {selectedTime.end.toString().padStart(2, '0')}:00
                  </span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span className="text-green-600">{formatCurrency(totalPrice)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {step === 1 && 'Konfirmasi Booking'}
            {step === 2 && 'Informasi Kontak'}
            {step === 3 && 'Pembayaran'}
            {step === 4 && 'Booking Sukses'}
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {/* Progress Steps */}
          {step < 4 && (
            <div className="flex items-center mb-6">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNumber 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {stepNumber}
                  </div>
                  {stepNumber < 3 && (
                    <div className={`w-8 h-0.5 ${
                      step > stepNumber ? 'bg-green-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          )}

          {renderStepContent()}
        </div>

        <div className="flex gap-3">
          {step > 1 && step < 4 && (
            <Button variant="outline" onClick={() => setStep(step - 1)}>
              Kembali
            </Button>
          )}
          
          {step < 3 && (
            <Button 
              onClick={handleNext} 
              className="flex-1 bg-green-600 hover:bg-green-700"
              disabled={step === 2 && (!customerInfo.name || !customerInfo.phone)}
            >
              {step === 1 && !isAuthenticated ? 'Login untuk Lanjutkan' : 'Lanjutkan'}
            </Button>
          )}
          
          {step === 3 && (
            <Button 
              onClick={handleBooking}
              className="flex-1 bg-green-600 hover:bg-green-700"
              disabled={!paymentMethod || isProcessing}
            >
              {isProcessing ? 'Memproses...' : 'Bayar Sekarang'}
            </Button>
          )}
          
          {step === 4 && (
            <Button onClick={handleClose} className="flex-1">
              Selesai
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
