import { useEffect, useState } from 'react'
import { articlesApi } from '@/data/api/articles'
import { article } from '@/types/article'

export const useContent = (id: string) => {
  const [article, setArticle] = useState<article | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true)

        const data = await articlesApi.getById(Number(id))

        if (!data) {
          setError('Article not found')
          return
        }
        
        setArticle(data)
      } catch (err) {
        setError('Failed to load article')
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchArticle()
  }, [id])

  return { article, loading, error }
}