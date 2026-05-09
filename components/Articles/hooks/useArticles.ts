
'use client'

import { useState, useEffect, useCallback } from 'react'
import { article } from '@/types/article'
import { FALLBACK_ARTICLES } from '../../Home'

const ARTICLES_PER_PAGE = 4

export const useArticles = () => {
  const [articles, setArticles] = useState<article[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('Overview')
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [categories, setCategories] = useState(['Overview'])

  const fetchArticles = useCallback(async () => {
    try {
      setLoading(true)

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Articles?lang=en&t=${Date.now()}`,
        { cache: 'no-store' }
      )

      if (!res.ok) throw new Error('Articles API not working')

      const data: article[] = await res.json()
      applyData(data)

    } catch (error) {
      console.error('Failed to fetch articles:', error)
      applyData(FALLBACK_ARTICLES)
    } finally {
      setLoading(false)
    }
  }, [])

  const applyData = (data: article[]) => {
    setArticles(data)

    const uniqueCategories = [
      'Overview',
      ...new Set(data.map(a => a.category).filter(Boolean))
    ]

    setCategories(uniqueCategories)
  }

  useEffect(() => {
    fetchArticles()
  }, [fetchArticles])

  const filteredArticles = articles.filter(article => {
    const matchesCategory =
      activeCategory === 'Overview' || article.category === activeCategory

    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
  })

  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE)
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE

  const currentArticles = filteredArticles.slice(
    startIndex,
    startIndex + ARTICLES_PER_PAGE
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [activeCategory, searchQuery])

  return {
    loading,
    articles,
    setArticles,
    categories,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    totalPages,
    filteredArticles,
    currentArticles,
    fetchArticles,
  }
}