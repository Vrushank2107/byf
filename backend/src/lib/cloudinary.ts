import { v2 as cloudinary } from 'cloudinary'

let configured = false

export class ImageUploadError extends Error {
  status = 502

  constructor(message: string) {
    super(message)
    this.name = 'ImageUploadError'
  }
}

export function isCloudinaryConfigured(): boolean {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME?.trim() &&
      process.env.CLOUDINARY_API_KEY?.trim() &&
      process.env.CLOUDINARY_API_SECRET?.trim(),
  )
}

function ensureConfigured(): void {
  if (!isCloudinaryConfigured()) {
    throw new Error(
      'Cloudinary is not configured on the server. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in your backend environment (Render → Environment), or paste an image URL instead of uploading.',
    )
  }

  if (configured) return

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  })
  configured = true
}

export { cloudinary }

export async function uploadImage(
  file: Buffer,
  folder: string = 'byf-impact-hub',
): Promise<string> {
  ensureConfigured()

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image' },
      (error, result) => {
        if (error) {
          const message =
            error instanceof Error && error.message
              ? error.message
              : 'Cloudinary rejected the upload'
          reject(new ImageUploadError(`Image upload failed: ${message}`))
          return
        }
        if (!result?.secure_url) {
          reject(new ImageUploadError('Image upload failed: Cloudinary returned no image URL'))
          return
        }
        resolve(result.secure_url)
      },
    )
    stream.end(file)
  })
}

export async function deleteImage(publicId: string): Promise<void> {
  ensureConfigured()

  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error) => {
      if (error) reject(error)
      else resolve()
    })
  })
}

export function getPublicIdFromUrl(url: string): string {
  const parts = url.split('/')
  const filename = parts[parts.length - 1]
  const publicId = filename.split('.')[0]
  const folder = parts.slice(-2, -1)[0]
  return `${folder}/${publicId}`
}
