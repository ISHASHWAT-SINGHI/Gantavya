import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

let client
let db

async function connectDB() {
  if (db) return db
  try {
    if (!process.env.MONGO_URL) {
      throw new Error('MONGO_URL environment variable is not defined')
    }
    client = new MongoClient(process.env.MONGO_URL)
    await client.connect()
    db = client.db(process.env.DB_NAME || 'gantavya')
    console.log('MongoDB connected successfully')
    return db
  } catch (error) {
    console.error('MongoDB connection error:', error)
    throw error
  }
}

// Helper function to create response
function createResponse(data, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}

// Handle OPTIONS requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}

// GET handler
export async function GET(request, { params }) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const path = params?.path || []
    const endpoint = path[0]

    switch (endpoint) {
      case 'clubs': {
        const clubs = await db.collection('clubs').find({}).toArray()
        return createResponse({ success: true, clubs })
      }

      case 'club': {
        const clubId = searchParams.get('id')
        if (!clubId) {
          return createResponse({ success: false, error: 'Club ID required' }, 400)
        }
        const club = await db.collection('clubs').findOne({ clubId })
        if (!club) {
          return createResponse({ success: false, error: 'Club not found' }, 404)
        }
        return createResponse({ success: true, club })
      }

      case 'events': {
        const events = await db.collection('events').find({}).toArray()
        return createResponse({ success: true, events })
      }

      case 'registrations': {
        const clubIdFilter = searchParams.get('clubId')
        const query = clubIdFilter ? { clubId: clubIdFilter } : {}
        const registrations = await db.collection('registrations').find(query).toArray()
        return createResponse({ success: true, registrations })
      }

      case 'health':
        return createResponse({ success: true, message: 'API is running', timestamp: new Date() })

      default:
        return createResponse({ success: false, error: 'Endpoint not found' }, 404)
    }
  } catch (error) {
    console.error('GET error:', error)
    return createResponse({ success: false, error: error.message }, 500)
  }
}

// POST handler
export async function POST(request, { params }) {
  try {
    await connectDB()
    const body = await request.json()
    const path = params?.path || []
    const endpoint = path[0]

    switch (endpoint) {
      case 'register-club': {
        const { clubName, clubAdmin, adminEmail, adminMobile, password, members } = body

        if (!clubName || !clubAdmin || !password || !members || !Array.isArray(members)) {
          return createResponse({
            success: false,
            error: 'Missing required fields: clubName, clubAdmin, password, members'
          }, 400)
        }

        // Generate unique club ID
        const clubId = `CLUB${Date.now()}`

        const clubData = {
          clubId,
          clubName,
          clubAdmin,
          adminEmail: adminEmail || '',
          adminMobile: adminMobile || '',
          password, // In a real app, hash this!
          members, // Array of { name, email, phone, role }
          createdAt: new Date(),
          updatedAt: new Date(),
        }

        const clubResult = await db.collection('clubs').insertOne(clubData)

        return createResponse({
          success: true,
          message: 'Club registered successfully',
          clubId,
          insertedId: clubResult.insertedId
        }, 201)
      }

      case 'register-event': {
        const { clubId, eventId, teamLeader, teamMembers } = body

        if (!clubId || !eventId || !teamLeader || !teamMembers) {
          return createResponse({
            success: false,
            error: 'Missing required fields: clubId, eventId, teamLeader, teamMembers'
          }, 400)
        }

        // Verify club exists
        const existingClub = await db.collection('clubs').findOne({ clubId })
        if (!existingClub) {
          return createResponse({ success: false, error: 'Club not found' }, 404)
        }

        // Verify event exists
        const existingEvent = await db.collection('events').findOne({ eventId })
        if (!existingEvent) {
          return createResponse({ success: false, error: 'Event not found' }, 404)
        }

        // Check if team already registered
        const existingRegistration = await db.collection('registrations').findOne({
          clubId,
          eventId
        })
        if (existingRegistration) {
          return createResponse({
            success: false,
            error: 'Club already registered for this event'
          }, 400)
        }

        const registrationId = `REG${Date.now()}`

        const registrationData = {
          registrationId,
          clubId,
          clubName: existingClub.clubName,
          eventId,
          eventName: existingEvent.eventName,
          teamLeader,
          teamMembers, // Array of member names/IDs from club
          status: 'pending', // pending, confirmed, cancelled
          paymentStatus: 'pending', // pending, completed, failed
          createdAt: new Date(),
          updatedAt: new Date(),
        }

        const regResult = await db.collection('registrations').insertOne(registrationData)

        return createResponse({
          success: true,
          message: 'Event registration successful',
          registrationId,
          insertedId: regResult.insertedId
        }, 201)
      }

      case 'create-event': {
        // Admin endpoint to create events
        const { eventName, eventDescription, eventDate, maxTeamSize, registrationFee } = body

        if (!eventName || !eventDescription) {
          return createResponse({
            success: false,
            error: 'Missing required fields: eventName, eventDescription'
          }, 400)
        }

        const eventId = `EVENT${Date.now()}`

        const eventData = {
          eventId,
          eventName,
          eventDescription,
          eventDate: eventDate || null,
          maxTeamSize: maxTeamSize || 5,
          registrationFee: registrationFee || 0,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }

        const eventResult = await db.collection('events').insertOne(eventData)

        return createResponse({
          success: true,
          message: 'Event created successfully',
          eventId,
          insertedId: eventResult.insertedId
        }, 201)
      }

      default:
        return createResponse({ success: false, error: 'Endpoint not found' }, 404)
    }
  } catch (error) {
    console.error('POST error:', error)
    return createResponse({ success: false, error: error.message }, 500)
  }
}

// PUT handler
export async function PUT(request, { params }) {
  try {
    await connectDB()
    const body = await request.json()
    const path = params?.path || []
    const endpoint = path[0]

    switch (endpoint) {
      case 'update-club': {
        const { clubId, updates } = body

        if (!clubId || !updates) {
          return createResponse({
            success: false,
            error: 'Missing required fields: clubId, updates'
          }, 400)
        }

        const updateResult = await db.collection('clubs').updateOne(
          { clubId },
          {
            $set: {
              ...updates,
              updatedAt: new Date()
            }
          }
        )

        if (updateResult.matchedCount === 0) {
          return createResponse({ success: false, error: 'Club not found' }, 404)
        }

        return createResponse({
          success: true,
          message: 'Club updated successfully'
        })
      }

      case 'update-registration': {
        const { registrationId, status, paymentStatus } = body

        if (!registrationId) {
          return createResponse({
            success: false,
            error: 'Registration ID required'
          }, 400)
        }

        const regUpdate = {}
        if (status) regUpdate.status = status
        if (paymentStatus) regUpdate.paymentStatus = paymentStatus
        regUpdate.updatedAt = new Date()

        const regUpdateResult = await db.collection('registrations').updateOne(
          { registrationId },
          { $set: regUpdate }
        )

        if (regUpdateResult.matchedCount === 0) {
          return createResponse({ success: false, error: 'Registration not found' }, 404)
        }

        return createResponse({
          success: true,
          message: 'Registration updated successfully'
        })
      }

      default:
        return createResponse({ success: false, error: 'Endpoint not found' }, 404)
    }
  } catch (error) {
    console.error('PUT error:', error)
    return createResponse({ success: false, error: error.message }, 500)
  }
}

// DELETE handler
export async function DELETE(request, { params }) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const path = params?.path || []
    const endpoint = path[0]

    switch (endpoint) {
      case 'delete-registration': {
        const registrationId = searchParams.get('registrationId')

        if (!registrationId) {
          return createResponse({
            success: false,
            error: 'Registration ID required'
          }, 400)
        }

        const deleteResult = await db.collection('registrations').deleteOne({ registrationId })

        if (deleteResult.deletedCount === 0) {
          return createResponse({ success: false, error: 'Registration not found' }, 404)
        }

        return createResponse({
          success: true,
          message: 'Registration deleted successfully'
        })
      }

      default:
        return createResponse({ success: false, error: 'Endpoint not found' }, 404)
    }
  } catch (error) {
    console.error('DELETE error:', error)
    return createResponse({ success: false, error: error.message }, 500)
  }
}
