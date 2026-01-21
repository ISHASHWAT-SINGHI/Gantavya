'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthProvider'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import { Loader2, ArrowRight, User, Hash, Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

function RegisterTeamContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const { user } = useAuth()

    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        clubId: '',
        eventId: '',
        teamLeader: '',
        teamMembers: [''] // Array of strings (names)
    })

    // Prepare member options from user context or default to manually added ones if context missing
    // We filter out any members that are already selected in other slots to avoid duplicates
    const availableMembers = user?.members || []

    useEffect(() => {
        // Pre-fill from URL and Auth
        const eventIdParam = searchParams.get('eventId')

        setFormData(prev => ({
            ...prev,
            eventId: eventIdParam || prev.eventId,
            clubId: user?.clubId || prev.clubId
        }))
    }, [searchParams, user])

    const addMember = () => {
        setFormData({
            ...formData,
            teamMembers: [...formData.teamMembers, '']
        })
    }

    const removeMember = (index) => {
        const newMembers = [...formData.teamMembers]
        newMembers.splice(index, 1)
        setFormData({ ...formData, teamMembers: newMembers })
    }

    const handleMemberChange = (index, value) => {
        const newMembers = [...formData.teamMembers]
        newMembers[index] = value
        setFormData({ ...formData, teamMembers: newMembers })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            if (formData.teamMembers.some(m => !m.trim())) {
                throw new Error('All member names are required')
            }

            const res = await fetch('/api/register-event', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    path: ['register-event']
                }),
            })

            const data = await res.json()

            if (!data.success) {
                throw new Error(data.error || 'Registration failed')
            }

            toast.success('Team registered successfully!', {
                description: `Registration ID: ${data.registrationId}`,
            })

            router.push('/dashboard')

        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-3xl mx-auto pt-24 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
                        Team Registration
                    </h1>
                    <p className="text-gray-400">Register your team for the event</p>
                </div>

                <Card className="bg-black/40 border-gray-800 backdrop-blur-md">
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="space-y-6">

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="clubId">Club ID</Label>
                                    <div className="relative">
                                        <Hash className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                                        <Input
                                            id="clubId"
                                            placeholder="Club ID"
                                            className="pl-10 bg-black/50 border-gray-800"
                                            value={formData.clubId}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="eventId">Event ID</Label>
                                    <div className="relative">
                                        <Hash className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                                        <Input
                                            id="eventId"
                                            placeholder="Event ID"
                                            className="pl-10 bg-black/50 border-gray-800"
                                            value={formData.eventId}
                                            onChange={(e) => setFormData({ ...formData, eventId: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="teamLeader">Team Leader Name</Label>
                                <Select
                                    value={formData.teamLeader}
                                    onValueChange={(val) => setFormData({ ...formData, teamLeader: val })}
                                >
                                    <SelectTrigger className="bg-black/50 border-gray-800">
                                        <SelectValue placeholder="Select Team Leader" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-black border-gray-800 text-white">
                                        {availableMembers.map((member, idx) => (
                                            <SelectItem key={idx} value={member.name}>{member.name}</SelectItem>
                                        ))}
                                        {availableMembers.length === 0 && <SelectItem value="external" disabled>No members found</SelectItem>}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-gray-800">
                                <div className="flex items-center justify-between">
                                    <Label className="text-lg">Team Members (Excluding Leader)</Label>
                                    <Button type="button" variant="outline" size="sm" onClick={addMember} className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10">
                                        <Plus className="w-4 h-4 mr-1" /> Add Member
                                    </Button>
                                </div>

                                {formData.teamMembers.map((member, idx) => (
                                    <div key={idx} className="flex gap-2">
                                        <div className="flex-1">
                                            <Select
                                                value={member}
                                                onValueChange={(val) => handleMemberChange(idx, val)}
                                            >
                                                <SelectTrigger className="bg-black/50 border-gray-800">
                                                    <SelectValue placeholder={`Select Member ${idx + 1}`} />
                                                </SelectTrigger>
                                                <SelectContent className="bg-black border-gray-800 text-white">
                                                    {availableMembers.map((m, mIdx) => (
                                                        <SelectItem key={mIdx} value={m.name}>{m.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        {formData.teamMembers.length > 0 && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeMember(idx)}
                                                className="text-red-400 hover:bg-red-500/10"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="pt-6">
                                <Button
                                    type="submit"
                                    className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all duration-300"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    ) : (
                                        <>
                                            Register Team <ArrowRight className="ml-2 h-5 w-5" />
                                        </>
                                    )}
                                </Button>
                            </div>

                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}

export default function RegisterTeamPage() {
    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden pb-20">
            <Navbar />

            {/* Background Effects */}
            <div className="fixed inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
            <div className="fixed inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-orange-500/5 pointer-events-none" />

            <Suspense fallback={<div className="flex justify-center pt-20"><Loader2 className="animate-spin text-cyan-500" /></div>}>
                <RegisterTeamContent />
            </Suspense>

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
