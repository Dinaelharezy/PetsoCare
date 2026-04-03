'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Container, Spinner } from 'react-bootstrap'
import ArticleContent from "@/components/Articles/ArticleContent"
import { articlesApi } from '@/data/api/articles'
import { article } from '@/types/article'

export default function ArticleFetching({ id }: { id: string }) {
  const router = useRouter()
  const [article, setArticle] = useState<article | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) {
        console.log('❌ No ID provided')
        setError('No article ID provided')
        setLoading(false)
        return
      }

      console.log('🔍 Fetching article with ID:', id)

      try {
        setLoading(true)

        // Debug (اختياري)
        const allArticles = await articlesApi.getAll()
        console.log('📚 All articles:', allArticles)

        const data = await articlesApi.getById(Number(id))
        console.log('✅ API returned:', data)

        if (!data) {
          console.log('❌ Article not found for ID:', id)
          setError('Article not found')
          setLoading(false)
          return
        }

        console.log('✨ Article loaded successfully:', data.title)
        setArticle(data)
        setLoading(false)
      } catch (err) {
        console.error('💥 Failed to fetch article:', err)
        setError('Failed to load article')
        setLoading(false)
      }
    }

    fetchArticle()
  }, [id])

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status" />
        <p className="mt-3 text-muted">Loading article...</p>
      </Container>
    )
  }

  if (error || !article) {
    return (
      <Container className="py-5 text-center">
        <h3 className="text-muted">{error || 'Article not found'}</h3>
        <p className="text-muted mt-2">
          Requested ID: {id || 'None'}
        </p>
        <button
          className="btn btn-primary mt-3"
          onClick={() => router.push('/main/Articles')}
        >
          Back to Articles
        </button>
      </Container>
    )
  }

  return <ArticleContent article={article} />
}