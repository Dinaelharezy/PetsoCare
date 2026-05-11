

'use client'

import { useEffect, useState } from 'react'
import { article } from '@/types/article'
import { FALLBACK_ARTICLES } from '../../Home'

export const useContent = (id: string) => {
  const [article, setArticle] = useState<article | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchArticle = async () => {
    try {
      setLoading(true)
      setError(null)

      // const res = await fetch(
      //   `${process.env.NEXT_PUBLIC_API_URL}/api/Articles/${id}?lang=en&t=${Date.now()}`,
      //   { cache: 'no-store' }
      // )

      const res = await fetch(
  `/api/proxy/Articles/${id}?lang=en&t=${Date.now()}`,
  { cache: 'no-store' }
)

      if (!res.ok) throw new Error('Article not found')

      const data: article = await res.json()

      if (!data) {
        setError('Article not found')
        return
      }

      setArticle(data)
    } catch (err) {
      console.error('Failed to fetch article:', err)

      const fallback = FALLBACK_ARTICLES.find(
        a => a.id === Number(id)
      )

      if (fallback) {
        setArticle(fallback)
      } else {
        setError('Article not found')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) fetchArticle()
  }, [id])

  return {
    article,
    loading,
    error,
    refetch: fetchArticle,
  }
}