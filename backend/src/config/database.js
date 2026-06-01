import { MongoClient } from 'mongodb'

let db

export async function connectDatabase({ uri, dbName }) {
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 30000,
    maxPoolSize: 10,
    minPoolSize: 2,
    tls: uri.startsWith('mongodb+srv://') || uri.includes('mongodb.net'),
  })

  await client.connect()
  db = client.db(dbName)

  // Indexes
  await db.collection('categories').createIndex({ slug: 1 }, { unique: true })
  await db.collection('inquiries').createIndex({ createdAt: -1 })
  await db.collection('inquiries').createIndex({ status: 1 })

  return db
}

export function getDb() {
  if (!db) throw new Error('Database not connected')
  return db
}
