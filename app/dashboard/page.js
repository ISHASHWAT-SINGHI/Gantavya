'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthProvider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Navbar from '@/components/Navbar'
import { motion } from 'framer-motion'
import { Loader2, Users, Trophy, Calendar, LogOut } from 'lucide-react'

export default function DashboardPage() {
    const { user, loading: authLoading, logout } = useAuth()
    const router = useRouter()
    const [registrations, setRegistrations] = useState([])
    const [loadingRegs, setLoadingRegs] = useState(true)

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login')
        }
    }, [authLoading, user, router])

    useEffect(() => {
        if (user?.clubId) {
            fetchRegistrations(user.clubId)
        }
    }, [user])

    const fetchRegistrations = async (clubId) => {
        try {
            const res = await fetch(`/api/registrations?clubId=${clubId}`)
            const data = await res.json()
            if (data.success) {
                setRegistrations(data.registrations)
            }
        } catch (error) {
            console.error('Failed to fetch registrations', error)
        } finally {
            setLoadingRegs(false)
        }
    }

    if (authLoading || !user) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-cyan-500 animate-spin" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden pb-20">
            <Navbar />

            <div className="fixed inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
            <div className="fixed inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-orange-500/5 pointer-events-none" />

            <div className="pt-24 px-4 max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                            Dashboard
                        </h1>
                        <p className="text-gray-400 mt-1">Welcome back, {user.clubName}</p>
                    </motion.div>
                    <Button variant="outline" onClick={logout} className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                        <LogOut className="w-4 h-4 mr-2" /> Logout
                    </Button>
                </div>

                {/* Club Info Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-10"
                >
                    <Card className="bg-black/40 border-gray-800 backdrop-blur-md">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="w-5 h-5 text-cyan-400" />
                                Club Profile
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-3 gap-6 mb-6">
                                <div>
                                    <p className="text-sm text-gray-500">Club Name</p>
                                    <p className="font-medium text-lg">{user.clubName}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Club ID</p>
                                    <p className="font-mono text-lg text-purple-400">{user.clubId}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Admin</p>
                                    <p className="font-medium text-lg">{user.clubAdmin}</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-gray-400 mb-3 border-b border-gray-800 pb-2">Team Members</h3>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {user.members?.map((member, idx) => (
                                        <div key={idx} className="bg-black/40 p-3 rounded-md border border-gray-800">
                                            <p className="font-medium">{member.name}</p>
                                            <p className="text-xs text-gray-500">{member.role || 'Member'}</p>
                                            {member.email && <p className="text-xs text-cyan-400 mt-1">{member.email}</p>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Registrations List */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <Trophy className="w-5 h-5 text-yellow-500" />
                            Event Registrations
                        </h2>
                        <Button onClick={() => router.push('/events')} className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-500/20">
                            Register New Event
                        </Button>
                    </div>

                    {loadingRegs ? (
                        <div className="flex justify-center py-10">
                            <Loader2 className="w-8 h-8 text-cyan-500 animate-spin" />
                        </div>
                    ) : registrations.length === 0 ? (
                        <Card className="bg-black/20 border-gray-800 border-dashed">
                            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                                <Calendar className="w-12 h-12 text-gray-600 mb-4" />
                                <h3 className="text-xl font-medium text-gray-300">No Registrations Yet</h3>
                                <p className="text-gray-500 mt-2 mb-6">Your club hasn't registered for any events.</p>
                                <Button onClick={() => router.push('/events')}>Browse Events</Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid gap-4">
                            {registrations.map((reg) => (
                                <Card key={reg.registrationId} className="bg-black/40 border-gray-800">
                                    <CardContent className="p-6">
                                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-white mb-1">{reg.eventName}</h3>
                                                <p className="text-sm text-gray-400">Team Leader: {reg.teamLeader}</p>
                                                <p className="text-xs text-gray-500 mt-2">Reg ID: {reg.registrationId}</p>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-3">
                                                <Badge variant="secondary" className={
                                                    reg.status === 'confirmed' ? 'bg-green-500/10 text-green-400' :
                                                        reg.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-red-500/10 text-red-400'
                                                }>
                                                    {reg.status.toUpperCase()}
                                                </Badge>
                                                <Badge variant="outline" className="border-gray-700 text-gray-400">
                                                    {new Date(reg.createdAt).toLocaleDateString()}
                                                </Badge>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
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
