import { Hono } from 'hono'
import { uploadImage } from '../lib/cloudinary'
import { authMiddleware } from '../middleware/auth'

const app = new Hono()

// POST upload image to Cloudinary (admin only)
app.post('/', authMiddleware, async (c) => {
  try {
    const formData = await c.req.formData()
    const file = formData.get('file') as File
    const folder = formData.get('folder') as string || 'byf-impact-hub'

    if (!file) {
      return c.json({ error: 'No file provided' }, 400)
    }

    // Convert File to Buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Upload to Cloudinary
    const url = await uploadImage(buffer, folder)

    return c.json({ url }, 201)
  } catch (error) {
    console.error('Upload error:', error)
    return c.json({ error: 'Failed to upload image' }, 500)
  }
})

export default app
