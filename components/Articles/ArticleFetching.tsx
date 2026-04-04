'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Container, Spinner } from 'react-bootstrap'
import ArticleContent from "@/components/Articles/ArticleContent"
import { articlesApi } from '@/data/api/articles'
import { article } from '@/types/article'
import { useContent } from './hooks/useContent'
export default function ArticleFetching({ id }: { id: string }) {
  const router = useRouter()
  const {article, loading, error} = useContent(id);

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