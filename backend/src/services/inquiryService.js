import { randomBytes } from 'node:crypto'
import { getDb } from '../config/database.js'

export function getInquiries() {
  return getDb().collection('inquiries').find({}, { projection: { _id: 0 } }).sort({ createdAt: -1 }).toArray()
}

export async function createInquiry(body) {
  const inquiry = {
    id: randomBytes(8).toString('hex'),
    name: String(body.name).trim(),
    phone: String(body.phone).trim(),
    message: String(body.message || '').trim(),
    status: 'new',
    createdAt: new Date().toISOString(),
  }

  await getDb().collection('inquiries').insertOne(inquiry)
  return inquiry
}

export function deleteInquiry(id) {
  return getDb().collection('inquiries').deleteOne({ id })
}

export function updateInquiryStatus(id, status) {
  const readAt = status === 'read' ? new Date().toISOString() : null

  return getDb().collection('inquiries').findOneAndUpdate(
    { id },
    { $set: { status, readAt } },
    { returnDocument: 'after', projection: { _id: 0 } },
  )
}
