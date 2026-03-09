

// import { article } from '@/types/article'

// export const articlesApi = {
//   getAll: async (): Promise<article[]> => {
//     const response = await fetch(`/api/Articles`, { 
//       headers: {
//         'ngrok-skip-browser-warning': 'true',
//       }
//     })
//     console.log('Response status:', response.status)
//     console.log('Response ok:', response.ok)
//     if (!response.ok) throw new Error('Failed to fetch articles')
//     return response.json()
//   },

//   getById: async (id: number): Promise<article> => {
//     const response = await fetch(`/api/Articles/${id}`, {  
//       headers: {
//         'ngrok-skip-browser-warning': 'true',
//       }
//     })
//     console.log('Response status:', response.status)
//     if (!response.ok) throw new Error('Failed to fetch article')
//     return response.json()
//   },

//   create: async (data: Partial<article>): Promise<article> => {
//     const response = await fetch(`/api/dashboard/articles`, { // ✅
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
import { article } from '@/types/article'

export const articlesApi = {
  
  getAll: async (): Promise<article[]> => {
    const response = await fetch(`/api/dashboard/articles`, {
      headers: { 'ngrok-skip-browser-warning': 'true' }
    })
    if (!response.ok) throw new Error('Failed to fetch articles')
    return response.json()
  },

  getById: async (id: number): Promise<article> => {
    const response = await fetch(`/api/dashboard/articles/${id}`, {
      headers: { 'ngrok-skip-browser-warning': 'true' }
    })
    if (!response.ok) throw new Error('Failed to fetch article')
    return response.json()
  },

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

  update: async (id: number, data: Partial<article>): Promise<article> => {
    const response = await fetch(`/api/dashboard/articles/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      },
      body: JSON.stringify(data)
    })
    if (!response.ok) throw new Error('Failed to update article')
    return response.json()
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`/api/dashboard/articles/${id}`, {
      method: 'DELETE',
      headers: { 'ngrok-skip-browser-warning': 'true' }
    })
    if (!response.ok) throw new Error('Failed to delete article')
  }
}

// import { article } from '@/types/article'

// export const articlesApi = {
//   getAll: async (): Promise<article[]> => {
//     const response = await fetch(`/api/Articles`, {
//       headers: { 'ngrok-skip-browser-warning': 'true' }
//     })
//     if (!response.ok) throw new Error('Failed to fetch articles')
//     return response.json()
//   },

//   getById: async (id: number): Promise<article> => {
//     const response = await fetch(`/api/Articles/${id}`, {
//       headers: { 'ngrok-skip-browser-warning': 'true' }
//     })
//     if (!response.ok) throw new Error('Failed to fetch article')
//     return response.json()
//   },

//   create: async (data: Partial<article>): Promise<article> => {
//     const response = await fetch(`/api/dashboard/articles`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'ngrok-skip-browser-warning': 'true'
//       },
//       body: JSON.stringify(data)
//     })
//     if (!response.ok) throw new Error('Failed to create article')
//     return response.json()
//   },

//   update: async (id: number, data: Partial<article>): Promise<article> => {
//     const response = await fetch(`/api/dashboard/articles/${id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         'ngrok-skip-browser-warning': 'true'
//       },
//       body: JSON.stringify(data)
//     })
//     if (!response.ok) throw new Error('Failed to update article')
//     return response.json()
//   },

//   delete: async (id: number): Promise<void> => {
//     const response = await fetch(`/api/dashboard/articles/${id}`, {
//       method: 'DELETE',
//       headers: { 'ngrok-skip-browser-warning': 'true' }
//     })
//     if (!response.ok) throw new Error('Failed to delete article')
//   }
// }
