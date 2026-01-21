import fs from 'fs'
import path from 'path'

const DB_PATH = path.join(process.cwd(), 'db.json')

// Initialize DB if it doesn't exist
if (!fs.existsSync(DB_PATH)) {
    const initialData = {
        clubs: [],
        events: [],
        registrations: []
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2))
}

function readDB() {
    const data = fs.readFileSync(DB_PATH, 'utf-8')
    return JSON.parse(data)
}

function writeDB(data) {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2))
}

export const db = {
    collection: (name) => {
        return {
            find: (query = {}) => {
                const data = readDB()
                const collection = data[name] || []

                const filtered = collection.filter(item => {
                    return Object.keys(query).every(key => item[key] === query[key])
                })

                return {
                    toArray: async () => filtered
                }
            },
            findOne: async (query = {}) => {
                const data = readDB()
                const collection = data[name] || []
                return collection.find(item => {
                    return Object.keys(query).every(key => item[key] === query[key])
                }) || null
            },
            insertOne: async (doc) => {
                const data = readDB()
                if (!data[name]) data[name] = []

                const newDoc = { ...doc, _id: Date.now().toString() }
                data[name].push(newDoc)

                writeDB(data)
                return { insertedId: newDoc._id, acknowledged: true }
            },
            updateOne: async (query, update) => {
                const data = readDB()
                const collection = data[name] || []

                const index = collection.findIndex(item => {
                    return Object.keys(query).every(key => item[key] === query[key])
                })

                if (index === -1) return { matchedCount: 0 }

                // Handle $set operator
                const updates = update.$set || update

                collection[index] = { ...collection[index], ...updates }
                data[name] = collection

                writeDB(data)
                return { matchedCount: 1, modifiedCount: 1 }
            },
            deleteOne: async (query) => {
                const data = readDB()
                const collection = data[name] || []

                const initialLength = collection.length
                const newCollection = collection.filter(item => {
                    return !Object.keys(query).every(key => item[key] === query[key])
                })

                data[name] = newCollection
                writeDB(data)

                return { deletedCount: initialLength - newCollection.length }
            }
        }
    }
}
