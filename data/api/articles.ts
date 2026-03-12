
import { article } from '@/types/article'

export const articlesApi = {

  getById: async (id: number): Promise<article> => {
  const response = await fetch(`/api/Articles/${id}`, // ✅ 
    {
      headers: { 'ngrok-skip-browser-warning': 'true' }
    })
  if (!response.ok) throw new Error('Failed to fetch article')
  return response.json()
},

  
  getAll: async (): Promise<article[]> => {
    const response = await fetch(`/api/dashboard/articles`, {
      headers: { 'ngrok-skip-browser-warning': 'true' }
    })
    if (!response.ok) throw new Error('Failed to fetch articles')
    return response.json()
  },

  // getById: async (id: number): Promise<article> => {
  //   const response = await fetch(`/api/dashboard/articles/${id}`, {
  //     headers: { 'ngrok-skip-browser-warning': 'true' }
  //   })
  //   if (!response.ok) throw new Error('Failed to fetch article')
  //   return response.json()
  // },

  create: async (data: Partial<article>): Promise<article> => {
    const response = await fetch(`/api/dashboard/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      },
      body: JSON.stringify(data)
    })
    if (!response.ok) throw new Error('Failed to create article')
    return response.json()
  },

  // update: async (id: number, data: Partial<article>): Promise<article> => {
  //   const response = await fetch(`/api/dashboard/articles/${id}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'ngrok-skip-browser-warning': 'true'
  //     },
  //     body: JSON.stringify(data)
  //   })
  //   if (!response.ok) throw new Error('Failed to update article')
  //   return response.json()
  // },
update: async (id: number, data: Partial<article>): Promise<article> => {
  const response = await fetch(`/api/dashboard/articles/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true'
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error('❌ Update failed:', response.status, errorText)
    throw new Error(errorText || 'Failed to update article')
  }

  const text = await response.text()
  if (!text || text.trim() === '') return data as article  // ✅ لو فاضي رجّع الـ data

  try {
    return JSON.parse(text)
  } catch {
    return data as article  // ✅ لو مش valid JSON رجّع الـ data
  }
},
  delete: async (id: number): Promise<void> => {
    const response = await fetch(`/api/dashboard/articles/${id}`, {
      method: 'DELETE',
      headers: { 'ngrok-skip-browser-warning': 'true' }
    })
    if (!response.ok) throw new Error('Failed to delete article')
  }
}
