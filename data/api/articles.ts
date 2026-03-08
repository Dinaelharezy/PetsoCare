
import { article } from '@/types/article'

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const articlesApi = {
  getAll: async (): Promise<article[]> => {
    const response = await fetch(`/api/articles`, {
      headers: {
        'ngrok-skip-browser-warning': 'true',
      }
    })

    if (!response.ok) throw new Error('Failed to fetch articles')
    return response.json()
  },

  getById: async (id: number): Promise<article> => {
    const response = await fetch(`/api/articles/${id}`, {
      headers: {
        'ngrok-skip-browser-warning': 'true',
      }
    })

    if (!response.ok) throw new Error('Failed to fetch article')
    return response.json()
  }
}