import { Article } from '@/types/article'
import articlesData from '../articles.json'

// Toggle this to switch between mock and real API
const USE_MOCK_DATA = true
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.yoursite.com'

// ==========================================
// MOCK DATA FUNCTIONS (for development)
// ==========================================
const getMockArticles = async (): Promise<Article[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))
  return articlesData.articles as Article[]
}

const getMockArticleById = async (id: number): Promise<Article | null> => {
  await new Promise(resolve => setTimeout(resolve, 300))
  const article = articlesData.articles.find(a => a.id === id)
  return article as Article || null
}

const getMockArticlesByCategory = async (category: string): Promise<Article[]> => {
  await new Promise(resolve => setTimeout(resolve, 300))
  return articlesData.articles.filter(a => a.category === category) as Article[]
}

const getMockArticlesByTag = async (tag: string): Promise<Article[]> => {
  await new Promise(resolve => setTimeout(resolve, 300))
  return articlesData.articles.filter(a => a.tags.includes(tag)) as Article[]
}

// ==========================================
// REAL API FUNCTIONS (for production)
// ==========================================
const fetchArticles = async (): Promise<Article[]> => {
  const response = await fetch(`${API_BASE_URL}/articles`, {
    next: { revalidate: 3600 } // Cache for 1 hour
  })
  
  if (!response.ok) {
    throw new Error('Failed to fetch articles')
  }
  
  return response.json()
}

const fetchArticleById = async (id: number): Promise<Article | null> => {
  const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
    next: { revalidate: 3600 }
  })
  
  if (!response.ok) {
    return null
  }
  
  return response.json()
}

const fetchArticlesByCategory = async (category: string): Promise<Article[]> => {
  const response = await fetch(`${API_BASE_URL}/articles?category=${category}`, {
    next: { revalidate: 3600 }
  })
  
  if (!response.ok) {
    throw new Error('Failed to fetch articles')
  }
  
  return response.json()
}

const fetchArticlesByTag = async (tag: string): Promise<Article[]> => {
  const response = await fetch(`${API_BASE_URL}/articles?tag=${tag}`, {
    next: { revalidate: 3600 }
  })
  
  if (!response.ok) {
    throw new Error('Failed to fetch articles')
  }
  
  return response.json()
}

// ==========================================
// EXPORTED API (single source of truth)
// ==========================================
export const articlesApi = {
  getAll: USE_MOCK_DATA ? getMockArticles : fetchArticles,
  getById: USE_MOCK_DATA ? getMockArticleById : fetchArticleById,
  getByCategory: USE_MOCK_DATA ? getMockArticlesByCategory : fetchArticlesByCategory,
  getByTag: USE_MOCK_DATA ? getMockArticlesByTag : fetchArticlesByTag,
}