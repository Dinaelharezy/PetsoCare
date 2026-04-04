




// const ARTICLES_PER_PAGE = 4

// export default function ArticlesClient() {
//   const [articles, setArticles] = useState<article[]>([])
//   const [loading, setLoading] = useState(true)
//   const [activeCategory, setActiveCategory] = useState('Overview')
//   const [currentPage, setCurrentPage] = useState(1)
//   const [searchQuery, setSearchQuery] = useState('')

// const [categories, setCategories] = useState<string[]>(['Overview'])

// const fetchArticles = async () => {
//   try {
//     setLoading(true)
//     const data = await articlesApi.getAll()
//     setArticles(data)
//     console.log('Fetched articles:', data)
//     // استخرجي الـ categories من الـ API ✅
//     const uniqueCategories = ['Overview', ...new Set(data.map(a => a.category).filter(Boolean))]
//     setCategories(uniqueCategories)
    
//   } catch (error) {
//     console.error('Failed to fetch articles:', error)
//   } finally {
//     setLoading(false)
//   }
// }

//   // Fetch articles on mount and listen for updates
//   useEffect(() => {
//     fetchArticles()

//     // Listen for article updates from admin panel
//     const handleArticlesUpdated = () => {
//       console.log('Articles updated - refreshing...')
//       fetchArticles()
//     }

//     window.addEventListener('articlesUpdated', handleArticlesUpdated)

//     return () => {
//       window.removeEventListener('articlesUpdated', handleArticlesUpdated)
//     }
//   }, [])



//   // Filter articles based on category and search
//  const filteredArticles = articles.filter(article => {
//   const matchesCategory = activeCategory === 'Overview' || article.category === activeCategory
//   const matchesSearch =
//     article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     article.content.toLowerCase().includes(searchQuery.toLowerCase()) // 
//   return matchesCategory && matchesSearch
// })

//   // Calculate pagination
//   const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE)
//   const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE
//   const endIndex = startIndex + ARTICLES_PER_PAGE
//   const currentArticles = filteredArticles.slice(startIndex, endIndex)

//   // Reset to page 1 when filters change
//   useEffect(() => {
//     setCurrentPage(1)
//   }, [activeCategory, searchQuery])

//   if (loading) {
//     return (
//       <Container className="py-5 text-center">
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </Container>
//     )
//   }

//   return (
//     <>
//       {/* Header */}
//       <div className="header-section">
//         <Container>
//           <h1 className="main-title font-for-app">
//             Nurturing Knowledge for  your own safety and your pet's well-being
//           </h1>
//           <p className="subtitle">
//             Explore our curated collection of articles on pet health, behavior, and well-being. From essential preventative care, find expert advice to keep your furry friend happy, healthy, and thriving.
//           </p>

//           <SearchBar value={searchQuery} onChange={setSearchQuery} />
          
//           <CategoryFilters
//             categories={categories}
//             activeCategory={activeCategory}
//             onCategoryChange={setActiveCategory}
//           />
//         </Container>
//       </div>

//       {/* Articles Grid */}
//       <Container className="py-4">
//         {currentArticles.length > 0 ? (
//           <>
//             <Row className="g-4">
//               {currentArticles.map((article) => (
//                 <Col key={article.id} lg={3} md={6} sm={12}>
//                   <ArticleCard article={article} />
//                 </Col>
//               ))}
//             </Row>

//             {/* Pagination - only show if more than 8 articles */}
//             {filteredArticles.length > ARTICLES_PER_PAGE && (
//               <Pagination
//                 currentPage={currentPage}
//                 totalPages={totalPages}
//                 totalItems={filteredArticles.length}
//                 itemsPerPage={ARTICLES_PER_PAGE}
//                 onPageChange={setCurrentPage}
//               />
//             )}
//           </>
//         ) : (
//           <div className="text-center py-5">
//             <h4 className="text-muted">No articles found</h4>
//             <p className="text-muted">Try adjusting your search or filter</p>
//           </div>
//         )}
//       </Container>
//     </>
//   )
// }


'use client'

import { Container, Row, Col } from 'react-bootstrap'
import SearchBar from './SearchBar'
import CategoryFilters from './CategoryFilters'
import ArticleCard from './ArticleCard'
import Pagination from '../Pagination'
import { useArticles } from './hooks/useArticles'


export default function ArticlesClient() {
  const {
    loading,
    categories,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    totalPages,
    filteredArticles,
    currentArticles
  } = useArticles()

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Container>
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        <CategoryFilters
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <Row>
          {currentArticles.map((article) => (
            <Col key={article.id} lg={3}>
              <ArticleCard article={article} />
            </Col>
          ))}
        </Row>

        {filteredArticles.length > 4 && (
         <Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  totalItems={filteredArticles.length}
  itemsPerPage={4}
  onPageChange={setCurrentPage}
/>
        )}
      </Container>
    </>
  )
}