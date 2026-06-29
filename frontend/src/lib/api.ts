import { getAdminToken } from './admin-token'
import { normalizeImageCollection, normalizeImageFields } from './image-url'

const PRODUCTION_API_URL = 'https://baroda-youth-federation-zqh6.onrender.com'
const LOCAL_API_URL = 'http://localhost:3001'

function getApiUrl(): string {
  const envUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, '')
  const onLocalClient =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')

  if (onLocalClient || import.meta.env.DEV) {
    return envUrl || LOCAL_API_URL
  }

  // Ignore localhost baked in at build time when running on production hosts.
  if (envUrl && !/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?\/?$/.test(envUrl)) {
    return envUrl
  }

  return PRODUCTION_API_URL
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${getApiUrl()}${endpoint}`

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  }

  const token = getAdminToken()
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include',
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }))
    const validation =
      Array.isArray(error.details) && error.details.length > 0
        ? error.details.map((d: { message?: string; path?: (string | number)[] }) =>
            d.path?.length ? `${d.path.join('.')}: ${d.message}` : d.message,
          ).filter(Boolean).join('; ')
        : undefined
    throw new Error(validation || error.error || error.message || 'Request failed')
  }

  return response.json()
}

export const api = {
  // Projects
  getProjects: () => request<any[]>('/api/projects').then((data) => normalizeImageCollection(data, ['image'])),
  getProject: (slug: string) =>
    request<any>(`/api/projects/${slug}`).then((data) => normalizeImageFields(data, ['image'])),
  createProject: (data: any) => request<any>('/api/projects', {
    method: 'POST',
    body: JSON.stringify(data),
  }).then((data) => normalizeImageFields(data, ['image'])),
  updateProject: (id: string, data: any) => request<any>(`/api/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }).then((data) => normalizeImageFields(data, ['image'])),
  deleteProject: (id: string) => request<{ success: boolean }>(`/api/projects/${id}`, {
    method: 'DELETE',
  }),

  // Gallery
  getGallery: () => request<any[]>('/api/gallery').then((data) => normalizeImageCollection(data, ['src'])),
  getGalleryByTag: (tag: string) =>
    request<any[]>(`/api/gallery/tag/${tag}`).then((data) => normalizeImageCollection(data, ['src'])),
  createGalleryItem: (data: any) => request<any>('/api/gallery', {
    method: 'POST',
    body: JSON.stringify(data),
  }).then((data) => normalizeImageFields(data, ['src'])),
  deleteGalleryItem: (id: string) => request<{ success: boolean }>(`/api/gallery/${id}`, {
    method: 'DELETE',
  }),

  // Events
  getEvents: () => request<any[]>('/api/events').then((data) => normalizeImageCollection(data, ['image'])),
  getUpcomingEvents: () =>
    request<any[]>('/api/events/upcoming').then((data) => normalizeImageCollection(data, ['image'])),
  createEvent: (data: any) => request<any>('/api/events', {
    method: 'POST',
    body: JSON.stringify(data),
  }).then((data) => normalizeImageFields(data, ['image'])),
  updateEvent: (id: string, data: any) => request<any>(`/api/events/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }).then((data) => normalizeImageFields(data, ['image'])),
  deleteEvent: (id: string) => request<{ success: boolean }>(`/api/events/${id}`, {
    method: 'DELETE',
  }),

  // Blog
  getBlogPosts: () => request<any[]>('/api/blog').then((data) => normalizeImageCollection(data, ['image'])),
  getBlogPost: (slug: string) =>
    request<any>(`/api/blog/${slug}`).then((data) => normalizeImageFields(data, ['image'])),
  createBlogPost: (data: any) => request<any>('/api/blog', {
    method: 'POST',
    body: JSON.stringify(data),
  }).then((data) => normalizeImageFields(data, ['image'])),
  updateBlogPost: (id: string, data: any) => request<any>(`/api/blog/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }).then((data) => normalizeImageFields(data, ['image'])),
  deleteBlogPost: (id: string) => request<{ success: boolean }>(`/api/blog/${id}`, {
    method: 'DELETE',
  }),

  // Volunteers
  getVolunteers: () => request<any[]>('/api/volunteers'),
  createVolunteer: (data: any) => request<any>('/api/volunteers', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  markVolunteerReviewed: (id: string) => request<{ success: boolean }>(`/api/volunteers/${id}/review`, {
    method: 'PUT',
  }),
  deleteVolunteer: (id: string) => request<{ success: boolean }>(`/api/volunteers/${id}`, {
    method: 'DELETE',
  }),

  // Messages
  getMessages: () => request<any[]>('/api/messages'),
  createMessage: (data: any) => request<any>('/api/messages', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  markMessageRead: (id: string) => request<{ success: boolean }>(`/api/messages/${id}/read`, {
    method: 'PUT',
  }),
  deleteMessage: (id: string) => request<{ success: boolean }>(`/api/messages/${id}`, {
    method: 'DELETE',
  }),

  // Settings
  getSettings: () => request<any>('/api/settings'),
  updateSettings: (data: any) => request<any>('/api/settings', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),

  // Auth
  login: (password: string) => request<{ success: boolean; token?: string }>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ password }),
  }),
  checkSession: () => request<{ authenticated: boolean }>('/api/auth/session'),
  logout: () => request<{ success: boolean }>('/api/auth/logout', {
    method: 'POST',
  }),

  // Upload
  uploadImage: async (file: File, folder?: string) => {
    const formData = new FormData()
    formData.append('file', file)
    if (folder) formData.append('folder', folder)

    const uploadHeaders: Record<string, string> = {}
    const token = getAdminToken()
    if (token) uploadHeaders.Authorization = `Bearer ${token}`

    const response = await fetch(`${getApiUrl()}/api/upload`, {
      method: 'POST',
      credentials: 'include',
      headers: uploadHeaders,
      body: formData,
    })

    if (!response.ok) {
      const error = await response.clone().json().catch(async () => {
        const message = await response.text().catch(() => '')
        return { message }
      })
      if (response.status === 401) {
        throw new Error('Please log in again to upload images.')
      }
      if (response.status >= 500 && (!error.error || error.error === 'Failed to upload image')) {
        throw new Error(
          'Image upload failed on the backend. Check CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in Render, then redeploy the backend.',
        )
      }
      throw new Error(error.error || error.message || 'Upload failed')
    }

    return response.json()
  },

  // Activities
  getActivities: () => request<any[]>('/api/activities').then((data) => normalizeImageCollection(data, ['image'])),
  createActivity: (data: any) => request<any>('/api/activities', {
    method: 'POST',
    body: JSON.stringify(data),
  }).then((data) => normalizeImageFields(data, ['image'])),
  updateActivity: (id: string, data: any) => request<any>(`/api/activities/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }).then((data) => normalizeImageFields(data, ['image'])),
  deleteActivity: (id: string) => request<{ success: boolean }>(`/api/activities/${id}`, {
    method: 'DELETE',
  }),

  // Testimonials
  getTestimonials: () =>
    request<any[]>('/api/testimonials').then((data) => normalizeImageCollection(data, ['image'])),
  createTestimonial: (data: any) => request<any>('/api/testimonials', {
    method: 'POST',
    body: JSON.stringify(data),
  }).then((data) => normalizeImageFields(data, ['image'])),
  updateTestimonial: (id: string, data: any) => request<any>(`/api/testimonials/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }).then((data) => normalizeImageFields(data, ['image'])),
  deleteTestimonial: (id: string) => request<{ success: boolean }>(`/api/testimonials/${id}`, {
    method: 'DELETE',
  }),

  // Impact Stats
  getImpactStats: () => request<any[]>('/api/impact-stats'),
  createImpactStat: (data: any) => request<any>('/api/impact-stats', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  updateImpactStat: (id: string, data: any) => request<any>(`/api/impact-stats/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  deleteImpactStat: (id: string) => request<{ success: boolean }>(`/api/impact-stats/${id}`, {
    method: 'DELETE',
  }),

  // Leaders
  getLeaders: () => request<any[]>('/api/leaders'),
  createLeader: (data: any) => request<any>('/api/leaders', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  updateLeader: (id: string, data: any) => request<any>(`/api/leaders/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  deleteLeader: (id: string) => request<{ success: boolean }>(`/api/leaders/${id}`, {
    method: 'DELETE',
  }),

  // Partners
  getPartners: () => request<any[]>('/api/partners'),
  createPartner: (data: any) => request<any>('/api/partners', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  updatePartner: (id: string, data: any) => request<any>(`/api/partners/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  deletePartner: (id: string) => request<{ success: boolean }>(`/api/partners/${id}`, {
    method: 'DELETE',
  }),

  // Donations
  getDonations: () => request<any[]>('/api/donations'),
  getDonation: (id: string) => request<any>(`/api/donations/${id}`),
  createDonationOrder: (data: {
    name: string
    email: string
    phone: string
    address: string
    pan?: string
    amount: number
    fund: string
    isAnonymous: boolean
  }) => request<{
    orderId: string
    amount: number
    currency: string
    keyId: string
    donationId: string
  }>('/api/donations/create-order', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  verifyDonation: (data: {
    razorpayOrderId: string
    razorpayPaymentId: string
    razorpaySignature: string
    donationId: string
  }) => request<{ success: boolean; donation: Record<string, unknown> }>('/api/donations/verify', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  deleteDonation: (id: string) => request<{ success: boolean }>(`/api/donations/${id}`, {
    method: 'DELETE',
  }),
}
