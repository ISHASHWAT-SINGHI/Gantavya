import { Inter, Sora } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
})

export const metadata = {
  title: 'Gantavya 2026 | 10 Years of Innovation',
  description: 'Celebrating a decade of technical excellence. Join us for the ultimate robotics and technology event on Feb 16-17, 2026.',
  keywords: 'gantavya, robotics, technology, college event, innovation, engineering',
}

import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from '@/components/AuthProvider'

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster position="top-center" />
        </AuthProvider>
      </body>
    </html>
  )
}
