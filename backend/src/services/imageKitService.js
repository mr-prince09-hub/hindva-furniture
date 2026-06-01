import { createHmac, randomBytes } from 'node:crypto'

export function createImageKitAuth(imagekit) {
  const token = randomBytes(16).toString('hex')
  const expire = Math.floor(Date.now() / 1000) + 60 * 30
  const signature = createHmac('sha1', imagekit.privateKey).update(token + expire).digest('hex')

  return { token, expire, signature, publicKey: imagekit.publicKey }
}

export async function deleteImageKitFile(fileId, imagekit) {
  if (!fileId || !imagekit.privateKey) return false

  const response = await fetch(`https://api.imagekit.io/v1/files/${fileId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Basic ${Buffer.from(`${imagekit.privateKey}:`).toString('base64')}`,
    },
  })

  if (!response.ok) throw new Error(`ImageKit delete failed with ${response.status}`)
  return true
}
