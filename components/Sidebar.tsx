'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  Calendar, 
  User, 
  Settings, 
  LogOut, 
  Menu,
  X,
  BarChart3,
  MapPin,
  Users,
  CreditCard
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store'

interface SidebarProps {
  userRole: 'user' | 'admin'
}

export function Sidebar({ userRole }: SidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuthStore()
  const userNavItems = [
    {
      name: 'Dashboard',
      href: '/dashboard/user',
      icon: Home,
    },
    {
      name: 'Riwayat Booking',
      href: '/dashboard/user/history',
      icon: Calendar,
    },
    {
      name: 'Profil',
      href: '/dashboard/user/profile',
      icon: User,
    },
    {
      name: 'Pengaturan',
      href: '/dashboard/user/settings',
      icon: Settings,
    },
  ]

  const adminNavItems = [
    {
      name: 'Dashboard',
      href: '/dashboard/admin',
      icon: Home,
    },
    {
      name: 'Statistik',
      href: '/dashboard/admin/stats',
      icon: BarChart3,
    },
    {
      name: 'Lapangan',
      href: '/dashboard/admin/fields',
      icon: MapPin,
    },
    {
      name: 'Booking',
      href: '/dashboard/admin/bookings',
      icon: Calendar,
    },
    {
      name: 'Pengguna',
      href: '/dashboard/admin/users',
      icon: Users,
    },
    {
      name: 'Pembayaran',
      href: '/dashboard/admin/payments',
      icon: CreditCard,
    },
    {
      name: 'Pengaturan',
      href: '/dashboard/admin/settings',
      icon: Settings,
    },
  ]

  const navItems = userRole === 'admin' ? adminNavItems : userNavItems

  const handleLogout = () => {
    logout()
    window.location.href = '/'
  }

  const NavContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-2 p-6 border-b">
        <div className="bg-green-600 text-white p-2 rounded-lg font-bold text-lg">
          JF
        </div>
        <div>
          <div className="font-bold text-lg">Jago Futsal</div>
          <div className="text-sm text-gray-500 capitalize">
            {userRole} Dashboard
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-6 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-green-600 font-semibold">
              {user?.name?.charAt(0) || 'U'}
            </span>
          </div>
          <div>
            <div className="font-semibold">{user?.name}</div>
            <div className="text-sm text-gray-500">{user?.email}</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-green-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-6 border-t">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Keluar
        </Button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white shadow-md"
        >
          {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80 bg-white shadow-sm border-r h-screen sticky top-0">
        <NavContent />
      </div>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50" 
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed left-0 top-0 bottom-0 w-80 bg-white shadow-lg">
            <NavContent />
          </div>
        </div>
      )}
    </>
  )
}
