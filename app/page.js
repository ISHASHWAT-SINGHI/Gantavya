'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, Users, Trophy, Zap, ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Navbar />
      
      <div className="fixed inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-orange-500/5 pointer-events-none" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-cyan-500/50 bg-cyan-500/10 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-semibold tracking-wider text-cyan-400">CELEBRATING 10 YEARS</span>
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-7xl md:text-9xl font-bold mb-6 font-heading tracking-tight"
          >
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto] drop-shadow-[0_0_30px_rgba(0,240,255,0.5)]">GANTAVYA</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-400 mb-8 font-light tracking-wide"
          >
            Where Innovation Meets Excellence
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12"
          >
            <div className="flex items-center gap-3 px-6 py-3 rounded-lg border border-purple-500/30 bg-purple-500/10 backdrop-blur-sm">
              <Calendar className="w-5 h-5 text-purple-400" />
              <span className="text-lg font-medium">Feb 16-17, 2026</span>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 rounded-lg border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm">
              <MapPin className="w-5 h-5 text-cyan-400" />
              <span className="text-lg font-medium">Your Campus</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/register-club">
              <Button
                size="lg"
                className="px-8 py-6 text-lg font-semibold bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 border-0 shadow-[0_0_30px_rgba(0,240,255,0.3)] hover:shadow-[0_0_40px_rgba(0,240,255,0.5)] transition-all duration-300 group"
              >
                Register Your Club (FREE)
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/events">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg font-semibold border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
              >
                Browse Events
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 font-heading">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">About Gantavya</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              A decade of innovation, collaboration, and technical excellence. Gantavya is where the brightest minds converge to showcase cutting-edge robotics, technology, and engineering marvels.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Trophy, title: 'Compete', desc: 'Battle it out in challenging robotics and tech competitions', color: 'cyan' },
              { icon: Users, title: 'Collaborate', desc: 'Form teams, share knowledge, and build together', color: 'purple' },
              { icon: Zap, title: 'Innovate', desc: 'Push boundaries and showcase groundbreaking projects', color: 'orange' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <Card className="bg-black/40 border-gray-800 hover:border-cyan-500/50 transition-all duration-300 group backdrop-blur-sm h-full">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <item.icon className="w-7 h-7 text-cyan-400" />
                    </div>
                    <CardTitle className="text-2xl font-bold">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-400 text-base">{item.desc}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link href="/events">
              <Button
                size="lg"
                className="px-10 py-6 text-lg font-semibold bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600"
              >
                Explore All Events
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <footer className="relative border-t border-gray-800 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">GANTAVYA</h3>
          <p className="text-gray-400 mb-6">10 Years of Innovation & Excellence</p>
          <p className="text-sm text-gray-500">© 2026 Gantavya. All rights reserved.</p>
        </div>
      </footer>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
        
        .font-heading {
          font-family: 'Sora', sans-serif;
        }
      `}</style>
    </div>
  )
}
