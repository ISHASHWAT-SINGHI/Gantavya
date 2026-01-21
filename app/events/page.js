'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Users, ArrowRight, Trophy, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function EventsPage() {
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchEvents()
    }, [])

    const fetchEvents = async () => {
        try {
            const res = await fetch('/api/events')
            const data = await res.json()
            if (data.success) {
                setEvents(data.events)
            }
        } catch (error) {
            console.error('Failed to fetch events', error)
        } finally {
            setLoading(false)
        }
    }

    // Fallback data for demonstration if DB is empty
    const displayEvents = events.length > 0 ? events : [
        {
            eventId: 'robo-war',
            eventName: 'RoboWars 2026',
            eventDescription: 'The ultimate battle of bots. Design, build, and destroy in this high-octane combat robotics tournament.',
            eventDate: '2026-02-16',
            maxTeamSize: 4,
            registrationFee: 500,
            category: 'Robotics'
        },
        {
            eventId: 'code-sprint',
            eventName: 'CodeSprint Hackathon',
            eventDescription: '24-hour coding marathon. Solve real-world problems and build innovative solutions.',
            eventDate: '2026-02-16',
            maxTeamSize: 3,
            registrationFee: 0,
            category: 'Coding'
        },
        {
            eventId: 'circuit-design',
            eventName: 'Circuit Design Challenge',
            eventDescription: 'Test your electronics knowledge. Design complex circuits and simulate them.',
            eventDate: '2026-02-17',
            maxTeamSize: 2,
            registrationFee: 200,
            category: 'Electronics'
        },
        {
            eventId: 'drone-prix',
            eventName: 'Drone Prix',
            eventDescription: 'High-speed drone racing through a complex obstacle course based on campus.',
            eventDate: '2026-02-17',
            maxTeamSize: 3,
            registrationFee: 800,
            category: 'Robotics'
        }
    ]

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden pb-20">
            <Navbar />

            {/* Background Effects */}
            <div className="fixed inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
            <div className="fixed inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-orange-500/5 pointer-events-none" />

            <div className="pt-24 px-4 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 font-heading">
                        <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Event Schedule</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Explore our lineup of technical competitions, workshops, and challenges.
                    </p>
                </motion.div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayEvents.map((event, idx) => (
                            <motion.div
                                key={event.eventId}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <Card className="bg-black/40 border-gray-800 hover:border-cyan-500/50 transition-all duration-300 h-full flex flex-col backdrop-blur-sm group">
                                    <CardHeader>
                                        <div className="flex justify-between items-start mb-4">
                                            <Badge variant="outline" className="border-cyan-500/30 text-cyan-400 bg-cyan-500/10">
                                                {event.category || 'Event'}
                                            </Badge>
                                            <Trophy className="w-5 h-5 text-gray-500 group-hover:text-yellow-500 transition-colors" />
                                        </div>
                                        <CardTitle className="text-2xl font-bold group-hover:text-cyan-400 transition-colors">
                                            {event.eventName}
                                        </CardTitle>
                                        <CardDescription className="flex items-center gap-2 mt-2">
                                            <Calendar className="w-4 h-4" />
                                            {new Date(event.eventDate).toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <p className="text-gray-400 mb-6 line-clamp-3">
                                            {event.eventDescription}
                                        </p>
                                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                                            <div className="flex items-center gap-2">
                                                <Users className="w-4 h-4" />
                                                Max Team: {event.maxTeamSize}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4" />
                                                Campus
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="pt-6 border-t border-gray-800">
                                        <Link href={`/register-team?eventId=${event.eventId}`} className="w-full">
                                            <Button className="w-full bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/50">
                                                Register Team <ArrowRight className="ml-2 w-4 h-4" />
                                            </Button>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                )}
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
