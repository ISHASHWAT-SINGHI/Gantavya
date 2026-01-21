'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { User, Mail, School, Users, Lock, ArrowRight, Loader2, Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function RegisterClubPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        clubName: '',
        clubAdmin: '',
        adminEmail: '',
        adminMobile: '',
        password: '',
        members: [{ name: '', role: 'Member', email: '', mobile: '' }] // Initial member
    })

    const addMember = () => {
        setFormData({
            ...formData,
            members: [...formData.members, { name: '', role: 'Member', email: '', mobile: '' }]
        })
    }

    const removeMember = (index) => {
        const newMembers = [...formData.members]
        newMembers.splice(index, 1)
        setFormData({ ...formData, members: newMembers })
    }

    const handleMemberChange = (index, field, value) => {
        const newMembers = [...formData.members]
        newMembers[index][field] = value
        setFormData({ ...formData, members: newMembers })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            // Basic validation
            if (formData.members.some(m => !m.name.trim())) {
                throw new Error('All member names are required')
            }

            const res = await fetch('/api/register-club', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            const data = await res.json()

            if (!data.success) {
                throw new Error(data.error || 'Registration failed')
            }

            toast.success('Registration successful!', {
                description: `Your Club ID is: ${data.clubId}. Please login now.`,
                duration: 10000, // Show for longer
            })

            // Redirect to login after a delay
            setTimeout(() => {
                router.push('/login')
            }, 2000)

        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden pb-20">
            <Navbar />

            {/* Background Effects */}
            <div className="fixed inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
            <div className="fixed inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-orange-500/5 pointer-events-none" />

            <div className="pt-24 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-3xl mx-auto"
                >
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
                            Register Your Club
                        </h1>
                        <p className="text-gray-400">Join the community and start competing in events</p>
                    </div>

                    <Card className="bg-black/40 border-gray-800 backdrop-blur-md">
                        <CardContent className="pt-6">
                            <form onSubmit={handleSubmit} className="space-y-6">

                                {/* Basic Info */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="clubName">Club Name</Label>
                                        <div className="relative">
                                            <School className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                                            <Input
                                                id="clubName"
                                                placeholder="e.g. Robotics Society"
                                                className="pl-10 bg-black/50 border-gray-800"
                                                value={formData.clubName}
                                                onChange={(e) => setFormData({ ...formData, clubName: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="clubAdmin">Admin Name (President/Lead)</Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                                            <Input
                                                id="clubAdmin"
                                                placeholder="Full Name"
                                                className="pl-10 bg-black/50 border-gray-800"
                                                value={formData.clubAdmin}
                                                onChange={(e) => setFormData({ ...formData, clubAdmin: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="adminEmail">Admin Email</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                                            <Input
                                                id="adminEmail"
                                                type="email"
                                                placeholder="admin@college.edu"
                                                className="pl-10 bg-black/50 border-gray-800"
                                                value={formData.adminEmail || ''}
                                                onChange={(e) => setFormData({ ...formData, adminEmail: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="adminMobile">Admin Mobile</Label>
                                        <div className="relative">
                                            <Input
                                                id="adminMobile"
                                                type="tel"
                                                placeholder="+91 9876543210"
                                                className="bg-black/50 border-gray-800"
                                                value={formData.adminMobile || ''}
                                                onChange={(e) => setFormData({ ...formData, adminMobile: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">Password (For Login)</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="Create a strong password"
                                            className="pl-10 bg-black/50 border-gray-800 focus:border-purple-500"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500">You will use this password along with your generated Club ID to login.</p>
                                </div>

                                {/* Members Section */}
                                <div className="space-y-4 pt-4 border-t border-gray-800">
                                    <div className="flex items-center justify-between">
                                        <Label className="text-lg">Team Members</Label>
                                        <Button type="button" variant="outline" size="sm" onClick={addMember} className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10">
                                            <Plus className="w-4 h-4 mr-1" /> Add Member
                                        </Button>
                                    </div>

                                    {formData.members.map((member, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="flex flex-col md:flex-row gap-4 items-start md:items-end p-4 border border-gray-800 rounded-lg bg-black/20"
                                        >
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 w-full">
                                                <div className="space-y-2">
                                                    <Label className="text-xs text-gray-500">Name</Label>
                                                    <Input
                                                        placeholder="Member Name"
                                                        className="bg-black/50 border-gray-800"
                                                        value={member.name}
                                                        onChange={(e) => handleMemberChange(idx, 'name', e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-xs text-gray-500">Role</Label>
                                                    <Input
                                                        placeholder="Role"
                                                        className="bg-black/50 border-gray-800"
                                                        value={member.role}
                                                        onChange={(e) => handleMemberChange(idx, 'role', e.target.value)}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-xs text-gray-500">Email</Label>
                                                    <Input
                                                        type="email"
                                                        placeholder="Email"
                                                        className="bg-black/50 border-gray-800"
                                                        value={member.email || ''}
                                                        onChange={(e) => handleMemberChange(idx, 'email', e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-xs text-gray-500">Mobile</Label>
                                                    <Input
                                                        type="tel"
                                                        placeholder="Mobile"
                                                        className="bg-black/50 border-gray-800"
                                                        value={member.mobile || ''}
                                                        onChange={(e) => handleMemberChange(idx, 'mobile', e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            {formData.members.length > 1 && (
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => removeMember(idx)}
                                                    className="text-red-400 hover:bg-red-500/10 mb-2 md:mb-0"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            )}
                                        </motion.div>
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
                                                Register Club <ArrowRight className="ml-2 h-5 w-5" />
                                            </>
                                        )}
                                    </Button>
                                </div>

                            </form>
                        </CardContent>
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
