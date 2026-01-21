import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

let client
let db

async function connectDB() {
    if (db) return db
    try {
        client = new MongoClient(process.env.MONGO_URL)
        await client.connect()
        db = client.db(process.env.DB_NAME || 'gantavya')
        return db
    } catch (error) {
        console.error('MongoDB connection error:', error)
        throw error
    }
}

export async function POST(request) {
    try {
        await connectDB()
        const { clubId, password } = await request.json()

        if (!clubId || !password) {
            return NextResponse.json(
                { success: false, error: 'Club ID and Password are required' },
                { status: 400 }
            )
        }

        const club = await db.collection('clubs').findOne({ clubId, password })

        if (!club) {
            return NextResponse.json(
                { success: false, error: 'Invalid credentials' },
                { status: 401 }
            )
        }

        // Return success with some basic club info (excluding password)
        const { password: _, ...clubWithoutPassword } = club
        return NextResponse.json({
            success: true,
            club: clubWithoutPassword
        })

    } catch (error) {
        console.error('Login error:', error)
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        )
    }
}
