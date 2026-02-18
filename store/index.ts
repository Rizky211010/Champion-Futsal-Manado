import { create } from 'zustand'
import { Field, Booking, mockFields, mockBookings } from '@/data/mock-data'

interface BookingState {
  selectedField: Field | null
  selectedDate: string | null
  selectedTime: { start: number; end: number } | null
  bookings: Booking[]
  setSelectedField: (field: Field | null) => void
  setSelectedDate: (date: string | null) => void
  setSelectedTime: (time: { start: number; end: number } | null) => void
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => void
  clearBooking: () => void
}

export const useBookingStore = create<BookingState>((set, get) => ({
  selectedField: null,
  selectedDate: null,
  selectedTime: null,
  bookings: mockBookings,
  
  setSelectedField: (field) => set({ selectedField: field }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setSelectedTime: (time) => set({ selectedTime: time }),
  
  addBooking: (bookingData) => {
    const newBooking: Booking = {
      ...bookingData,
      id: `bk${Date.now()}`,
      createdAt: new Date().toISOString(),
    }
    set((state) => ({
      bookings: [...state.bookings, newBooking]
    }))
  },
  
  clearBooking: () => set({
    selectedField: null,
    selectedDate: null,
    selectedTime: null
  })
}))

interface FilterState {
  priceRange: [number, number]
  facilities: string[]
  minRating: number
  sortBy: 'price-asc' | 'price-desc' | 'rating-desc'
  fields: Field[]
  filteredFields: Field[]
  
  setPriceRange: (range: [number, number]) => void
  setFacilities: (facilities: string[]) => void
  setMinRating: (rating: number) => void
  setSortBy: (sort: 'price-asc' | 'price-desc' | 'rating-desc') => void
  applyFilters: () => void
}

export const useFilterStore = create<FilterState>((set, get) => ({
  priceRange: [50000, 300000],
  facilities: [],
  minRating: 0,
  sortBy: 'rating-desc',
  fields: mockFields,
  filteredFields: mockFields,
  
  setPriceRange: (range) => set({ priceRange: range }),
  setFacilities: (facilities) => set({ facilities }),
  setMinRating: (rating) => set({ minRating: rating }),
  setSortBy: (sort) => set({ sortBy: sort }),
  
  applyFilters: () => {
    const { fields, priceRange, facilities, minRating, sortBy } = get()
    
    let filtered = fields.filter(field => {
      // Price filter (check minimum price)
      const minPrice = Math.min(
        field.pricing.weekday.morning,
        field.pricing.weekday.night,
        field.pricing.weekend.morning,
        field.pricing.weekend.night
      )
      const maxPrice = Math.max(
        field.pricing.weekday.morning,
        field.pricing.weekday.night,
        field.pricing.weekend.morning,
        field.pricing.weekend.night
      )
      
      if (minPrice > priceRange[1] || maxPrice < priceRange[0]) return false
      
      // Facilities filter
      if (facilities.length > 0) {
        const hasAllFacilities = facilities.every(facility => 
          field.facilities.includes(facility)
        )
        if (!hasAllFacilities) return false
      }
      
      // Rating filter
      if (field.rating < minRating) return false
      
      return true
    })
    
    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return Math.min(...Object.values(a.pricing).flatMap(p => Object.values(p))) - 
                 Math.min(...Object.values(b.pricing).flatMap(p => Object.values(p)))
        case 'price-desc':
          return Math.max(...Object.values(b.pricing).flatMap(p => Object.values(p))) - 
                 Math.max(...Object.values(a.pricing).flatMap(p => Object.values(p)))
        case 'rating-desc':
          return b.rating - a.rating
        default:
          return 0
      }
    })
    
    set({ filteredFields: filtered })
  }
}))

interface AuthState {
  user: { id: string; name: string; email: string; role: 'user' | 'admin' } | null
  isAuthenticated: boolean
  login: (email: string, password: string) => boolean
  logout: () => void
  register: (name: string, email: string, password: string) => boolean
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  
  login: (email, password) => {
    // Mock login - in real app, this would call an API
    if (email && password) {
      const user = {
        id: '1',
        name: email === 'admin@jagofutsal.com' ? 'Admin' : 'User',
        email,
        role: email === 'admin@jagofutsal.com' ? 'admin' as const : 'user' as const
      }
      set({ user, isAuthenticated: true })
      return true
    }
    return false
  },
  
  logout: () => set({ user: null, isAuthenticated: false }),
  
  register: (name, email, password) => {
    // Mock registration
    if (name && email && password) {
      const user = { id: '1', name, email, role: 'user' as const }
      set({ user, isAuthenticated: true })
      return true
    }
    return false
  }
}))
