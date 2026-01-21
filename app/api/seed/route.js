import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

// Default events data matching the frontend fallback
const INITIAL_EVENTS = [
    {
        eventId: 'robo-war',
        eventName: 'RoboWars 2026',
        eventDescription: 'The ultimate battle of bots. Design, build, and destroy in this high-octane combat robotics tournament.',
        eventDate: '2026-02-16',
        maxTeamSize: 4,
        registrationFee: 500,
        category: 'Robotics',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        eventId: 'code-sprint',
        eventName: 'CodeSprint Hackathon',
        eventDescription: '24-hour coding marathon. Solve real-world problems and build innovative solutions.',
        eventDate: '2026-02-16',
        maxTeamSize: 3,
        registrationFee: 0,
        category: 'Coding',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        eventId: 'circuit-design',
        eventName: 'Circuit Design Challenge',
        eventDescription: 'Test your electronics knowledge. Design complex circuits and simulate them.',
        eventDate: '2026-02-17',
        maxTeamSize: 2,
        registrationFee: 200,
        category: 'Electronics',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        eventId: 'drone-prix',
        eventName: 'Drone Prix',
        eventDescription: 'High-speed drone racing through a complex obstacle course based on campus.',
        eventDate: '2026-02-17',
        maxTeamSize: 3,
        registrationFee: 800,
        category: 'Robotics',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
    }
]

export async function GET() {
    let client
    try {
        if (!process.env.MONGO_URL) {
            throw new Error('MONGO_URL not defined')
        }

        client = new MongoClient(process.env.MONGO_URL)
        await client.connect()
        const db = client.db(process.env.DB_NAME || 'gantavya')

        // Check if events already exist
        const existingCount = await db.collection('events').countDocuments()

        if (existingCount > 0) {
            return NextResponse.json({
                success: true,
                message: 'Database already has events. No changes made.',
                count: existingCount
            })
        }

        // Insert events
        const result = await db.collection('events').insertMany(INITIAL_EVENTS)

        return NextResponse.json({
            success: true,
            message: 'Database seeded successfully',
            insertedCount: result.insertedCount
        })

    } catch (error) {
        console.error('Seed error:', error)
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 })
    } finally {
        if (client) await client.close()
    }
}
