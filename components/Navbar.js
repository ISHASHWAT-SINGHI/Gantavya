'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Menu, X, LogOut, User } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '@/components/AuthProvider'

export default function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  const links = [
    { href: '/', label: 'Home' },
    { href: '/events', label: 'Events' },
    { href: '/gallery', label: 'Gallery' },
  ]

  if (user) {
    links.push({ href: '/dashboard', label: 'Dashboard' })
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
              GANTAVYA
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-2 text-sm font-medium transition-colors hover:text-white group ${pathname === link.href ? 'text-cyan-400' : 'text-gray-300'
                  }`}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400 rounded-full" />
                )}
              </Link>
            ))}

            {user ? (
              <div className="flex items-center gap-4 ml-4 pl-4 border-l border-gray-700">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <User className="w-4 h-4 text-purple-400" />
                  <span className="max-w-[100px] truncate">{user.clubName}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-4 ml-4">
                <Link href="/register-club">
                  <Button variant="ghost" className="text-gray-300 hover:text-white">
                    Register Club
                  </Button>
                </Link>
                <Link href="/login">
                  <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 border-0">
                    Login
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-gray-800 animate-in slide-in-from-top-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 rounded-md text-base font-medium transition-colors ${pathname === link.href
                    ? 'text-cyan-400 bg-cyan-500/10'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-4 mt-2 border-t border-gray-800 space-y-2">
              {user ? (
                <>
                  <div className="px-4 text-sm text-gray-400 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Logged in as {user.clubName}
                  </div>
                  <Button
                    variant="destructive"
                    className="w-full justify-start pl-4"
                    onClick={() => {
                      logout()
                      setMobileMenuOpen(false)
                    }}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full justify-center bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-500/20 mb-2">
                      Login
                    </Button>
                  </Link>
                  <Link href="/register-club" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full justify-center bg-gradient-to-r from-cyan-500 to-purple-500">
                      Register Club
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
