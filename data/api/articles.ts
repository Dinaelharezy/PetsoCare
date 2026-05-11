
// import { article } from '@/types/article'



// export const articlesApi = {

//   getById: async (id: number): Promise<article> => {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Articles/${id}`)
//     if (!response.ok) throw new Error('Failed to fetch article')
//     return response.json()
//   },

//   getAll: async (): Promise<article[]> => {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Articles`)
//     if (!response.ok) throw new Error('Failed to fetch articles')
//     return response.json()
//   },

//   create: async (data: Partial<article>): Promise<article> => {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Articles`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
        
//       },
//       body: JSON.stringify(data)
//     })
//     if (!response.ok) throw new Error('Failed to create article')
//     return response.json()
//   },

//   update: async (id: number, data: Partial<article>): Promise<article> => {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Articles/${id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
    
//       },
//       body: JSON.stringify(data)
//     })

//     if (!response.ok) {
//       const errorText = await response.text()
//       console.error('❌ Update failed:', response.status, errorText)
//       throw new Error(errorText || 'Failed to update article')
//     }

//     const text = await response.text()
//     if (!text || text.trim() === '') return data as article

//     try {
//       return JSON.parse(text)
//     } catch {
//       return data as article
//     }
//   },

//   delete: async (id: number): Promise<void> => {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Articles/${id}`, {
//       method: 'DELETE',
    
//     })
//     if (!response.ok) throw new Error('Failed to delete article')
//   }
// }


import { article } from '@/types/article'
import { apiUrl } from '@/lib/api'

export const articlesApi = {
  getById: async (id: number): Promise<article> => {
    const response = await fetch(apiUrl(`Articles/${id}`))
    if (!response.ok) throw new Error('Failed to fetch article')
    return response.json()
  },

  getAll: async (): Promise<article[]> => {
    const response = await fetch(apiUrl('Articles'))
    if (!response.ok) throw new Error('Failed to fetch articles')
    return response.json()
  },

  create: async (data: Partial<article>): Promise<article> => {
    const response = await fetch(apiUrl('Articles'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!response.ok) throw new Error('Failed to create article')
    return response.json()
  },

  update: async (id: number, data: Partial<article>): Promise<article> => {
    const response = await fetch(apiUrl(`Articles/${id}`), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Update failed:', response.status, errorText)
      throw new Error(errorText || 'Failed to update article')
    }

    const text = await response.text()
    if (!text || text.trim() === '') return data as article

    try {
      return JSON.parse(text)
    } catch {
      return data as article
    }
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(apiUrl(`Articles/${id}`), {
      method: 'DELETE',
    })
    if (!response.ok) throw new Error('Failed to delete article')
  }
}