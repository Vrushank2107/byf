import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export { cloudinary }

export async function uploadImage(
  file: File | Buffer,
  folder: string = 'byf-impact-hub'
): Promise<string> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        max_file_size: 5000000, // 5MB
      },
      (error, result) => {
        if (error) {
          reject(error)
        } else {
          resolve(result?.secure_url || '')
        }
      }
    ).end(file)
  })
}

export async function deleteImage(publicId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
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
