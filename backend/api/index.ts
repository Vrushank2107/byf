import { handle } from 'hono/vercel'
import app from '../dist/index.js'

export const config = {
  runtime: 'nodejs',
}

// Wrap the handler to add CORS headers
const honoHandler = handle(app)

export default async (req: any) => {
  // Handle OPTIONS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  }
  
  // Call Hono handler
  const response = await honoHandler(req)
  
  // Add CORS headers to response
  const newResponse = new Response(response.body, {
    status: response.status,
    headers: {
      ...response.headers,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
  
  return newResponse
}
