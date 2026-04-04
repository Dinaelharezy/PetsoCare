import { useContext, useEffect, useState } from 'react'
import { fetchArticles } from '../services/articlesApi'
import { article } from '@/types/article'

const ARTICLES_PER_PAGE = 4

export const useArticles = () => {
const [articles, setArticles] = useState<article[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('Overview')
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [categories, setCategories] = useState(['Overview'])

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const data = await fetchArticles()

        setArticles(data)

        const uniqueCategories = [
          'Overview',
          ...new Set(data.map(a => a.category).filter(Boolean))
        ]
        setCategories(uniqueCategories)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  // filtering
  const filteredArticles = articles.filter(article => {
    const matchesCategory =
      activeCategory === 'Overview' || article.category === activeCategory

    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
  })

  // pagination
  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE)
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE

  const currentArticles = filteredArticles.slice(
    startIndex,
    startIndex + ARTICLES_PER_PAGE
  )

  // reset page
  useEffect(() => {
    setCurrentPage(1)
  }, [activeCategory, searchQuery])

  return {
    loading,
    setLoading,
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

  }
}