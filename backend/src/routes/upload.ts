import { Hono } from 'hono'
import { ImageUploadError, isCloudinaryConfigured, uploadImage } from '../lib/cloudinary'
import { authMiddleware } from '../middleware/auth'

const app = new Hono()

const MAX_BYTES = 5 * 1024 * 1024

function uploadErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message
  return 'Failed to upload image'
}

function sanitizeFolder(value: string): string {
  return value
    .trim()
    .replace(/[^a-zA-Z0-9/_-]/g, '-')
    .replace(/\/+/g, '/')
    .replace(/^\/|\/$/g, '')
    .slice(0, 120) || 'baroda-youth-federation-impact-hub'
}

// POST upload image to Cloudinary (admin only)
app.post('/', authMiddleware, async (c) => {
  if (!isCloudinaryConfigured()) {
    return c.json(
      {
        error:
          'Image upload is not configured on the server. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in Render → Environment, or paste an image URL instead.',
      },
      503 as any,
    )
  }

  try {
    const formData = await c.req.formData()
    const file = formData.get('file')
    const folder = sanitizeFolder((formData.get('folder') as string | null) || 'baroda-youth-federation-impact-hub')

    if (!(file instanceof File)) {
      return c.json({ error: 'No image file provided' }, 400 as any)
    }

    if (!file.type.startsWith('image/')) {
      return c.json({ error: 'Only image files are allowed' }, 400 as any)
    }

    if (file.size > MAX_BYTES) {
      return c.json({ error: 'Image must be under 5 MB' }, 400 as any)
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const url = await uploadImage(buffer, folder)

    return c.json({ url }, 201 as any)
  } catch (error) {
    console.error('Upload error:', error)
    const status = error instanceof ImageUploadError ? error.status : 500
    return c.json({ error: uploadErrorMessage(error) }, status as any)
  }
})

export default app
