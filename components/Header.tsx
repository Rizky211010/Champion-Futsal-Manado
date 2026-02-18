'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, User, LogOut, Settings, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuthStore()
  const navigation = [
    { name: 'Beranda', href: '/' },
    { name: 'Lapangan', href: '/fields' },
    { name: 'Tentang Kami', href: '/about' },
    { name: 'Kontak', href: '/contact' },
  ]

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">⚽</span>
            </div>
            <span className="text-xl font-bold text-slate-900 hidden sm:inline">Champion Futsal</span>
            <span className="text-lg font-bold text-slate-900 sm:hidden">CF</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3 py-2 text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-all font-medium text-sm"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-slate-700 hover:text-emerald-600 px-3 py-2 rounded-md hover:bg-slate-100 transition-all font-medium">
                    <User className="h-5 w-5" />
                    <span className="hidden lg:inline text-sm">{user.name}</span>
                  </button>
                  <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-xl py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all border border-slate-200">
                    <Link
                      href={user.role === 'admin' ? '/dashboard/admin' : '/dashboard/user'}
                      className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Dashboard
                    </Link>
                    {user.role === 'user' && (
                      <Link
                        href="/dashboard/user/history"
                        className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Booking Saya
                      </Link>
                    )}
                    <button
                      onClick={logout}
                      className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Keluar
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/auth/login">
                  <Button variant="outline" size="sm" className="font-semibold text-slate-700 hover:bg-slate-100 transition-all border-slate-300">Masuk</Button>
                </Link>
                <Link href="/auth/register">
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 font-semibold transition-all hover:scale-105">Daftar</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hover:bg-emerald-50"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden animate-slide-in-down">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-slate-200">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-md font-medium text-sm transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-slate-200 pt-3 mt-3">
                {isAuthenticated && user ? (
                  <div className="space-y-1">
                    <div className="px-3 py-2 text-slate-900 font-semibold text-sm">
                      👤 {user.name}
                    </div>
                    <Link
                      href={user.role === 'admin' ? '/dashboard/admin' : '/dashboard/user'}
                      className="block px-3 py-2 text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-md text-sm transition-all"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      ⚙️ Dashboard
                    </Link>
                    {user.role === 'user' && (
                      <Link
                        href="/dashboard/user/history"
                        className="block px-3 py-2 text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-md text-sm transition-all"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        📅 Booking Saya
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout()
                        setIsMenuOpen(false)
                      }}
                      className="block w-full text-left px-3 py-2 text-slate-700 hover:text-red-600 hover:bg-red-50 rounded-md text-sm transition-all"
                    >
                      🚪 Keluar
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      href="/auth/login"
                      className="block w-full"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Button variant="outline" className="w-full font-semibold text-slate-700 hover:bg-slate-100 transition-all border-slate-300">
                        Masuk
                      </Button>
                    </Link>
                    <Link
                      href="/auth/register"
                      className="block w-full"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-700 font-semibold transition-all">
                        Daftar
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
