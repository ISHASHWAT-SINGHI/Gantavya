'use client'

import { useState } from 'react'
import { useAuth } from '@/components/AuthProvider'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { Lock, User, ArrowRight, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export default function LoginPage() {
    const [formData, setFormData] = useState({ clubId: '', password: '' })
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            const data = await res.json()

            if (!data.success) {
                throw new Error(data.error || 'Login failed')
            }

            toast.success('Login successful!')
            login(data.club)
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col">
            <Navbar />

            {/* Background Effects */}
            <div className="fixed inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
            <div className="fixed inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-orange-500/5 pointer-events-none" />
            <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

            <div className="flex-1 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md relative z-10"
                >
                    <Card className="bg-black/40 border-gray-800 backdrop-blur-md shadow-[0_0_50px_rgba(0,240,255,0.1)]">
                        <CardHeader className="text-center">
                            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                                Club Login
                            </CardTitle>
                            <CardDescription className="text-gray-400">
                                Enter your Club ID and Password to access the dashboard
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="clubId">Club ID</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                                        <Input
                                            id="clubId"
                                            placeholder="e.g. CLUB12345678"
                                            className="pl-10 bg-black/50 border-gray-800 focus:border-cyan-500 transition-colors"
                                            value={formData.clubId}
                                            onChange={(e) => setFormData({ ...formData, clubId: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="••••••••"
                                            className="pl-10 bg-black/50 border-gray-800 focus:border-purple-500 transition-colors"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all duration-300"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        <>
                                            Login <ArrowRight className="ml-2 h-4 w-4" />
                                        </>
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                        <CardFooter className="justify-center border-t border-gray-800 pt-6">
                            <p className="text-sm text-gray-400">
                                Don't have a club account?{' '}
                                <Link href="/register-club" className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium">
                                    Register here
                                </Link>
                            </p>
                        </CardFooter>
                    </Card>
                </motion.div>
            </div>

            <style jsx>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>
        </div>
    )
}
