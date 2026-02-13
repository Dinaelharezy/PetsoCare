
'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Container, Spinner } from 'react-bootstrap'
import ArticleContent from "@/components/Articles/ArticleContent"
import { articlesApi } from '@/data/api/articles'
import { Article } from '@/types/article'

export default function ArticleContentPage() {
  const params = useParams()
  const router = useRouter()
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchArticle = async () => {
      if (!params?.id) {
        console.log('❌ No ID in params')
        setError('No article ID provided')
        setLoading(false)
        return
      }

      console.log('🔍 Fetching article with ID:', params.id)

      try {
        setLoading(true)
        
        // Debug: Log all articles
        const allArticles = await articlesApi.getAll()
        console.log('📚 All articles:', allArticles)
        console.log('🆔 Available IDs:', allArticles.map(a => ({ 
          id: a.id, 
          type: typeof a.id,
          title: a.title,
          published: a.published
        })))
        
        const data = await articlesApi.getById(params.id as string)
        console.log('✅ API returned:', data)
        
        if (!data) {
          console.log('❌ Article not found for ID:', params.id)
          setError('Article not found')
          setLoading(false)
          return
        }

        // Check if article is published
        if (!data.published) {
          console.log('⚠️ Article is not published')
          setError('This article is not available')
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
  }, [params?.id])

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3 text-muted">Loading article...</p>
      </Container>
    )
  }

  if (error || !article) {
    return (
      <Container className="py-5 text-center">
        <h3 className="text-muted">{error || 'Article not found'}</h3>
        <p className="text-muted mt-2">
          Requested ID: {params?.id ? String(params.id) : 'None'}
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