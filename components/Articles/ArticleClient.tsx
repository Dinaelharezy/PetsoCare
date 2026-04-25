

'use client'

import { Container, Row, Col } from 'react-bootstrap'
import SearchBar from './SearchBar'
import CategoryFilters from './CategoryFilters'
import ArticleCard from './ArticleCard'
import Pagination from '../Pagination'
import { useArticles } from './hooks/useArticles'
import LoadingSpin from '../LoadingSpin'
import { useRouter } from 'next/navigation'

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

  if (loading) return <LoadingSpin />
const router = useRouter()
  return (
    <>
      <Container className='mb-4'>

      {/* <div style={{ textAlign: 'center', margin: '2rem', color: '#555' }}>
        <h3 className='bold'>Explore a world of knowledge, discover articles that inspire and inform you</h3>
        <p className='text-muted'>"Search, explore, and dive into content curated for you and your interests."</p>
      </div> */}
            {/* Header */}
            <div className="header-section">
              <Container>
              <h1 className="main-title font-for-app">
      Explore a world of knowledge, discover articles that inspire and inform you
              </h1>
              <p className="subtitle">
      Search, explore, and dive into content curated for you and your interests.
              </p>
      
                {/* <SearchBar value={searchQuery} onChange={setSearchQuery} /> */}
                
                <CategoryFilters
                  categories={categories}
                  activeCategory={activeCategory}
                  onCategoryChange={setActiveCategory}
                />
                <div className="content-type-filter">
  <button className="type-pill active-pill">
    <span className="pill-dot dot-green"></span>
    Articles
  </button>
  <button 
    className="type-pill"
    onClick={() => router.push('/main/Videos')}
  >
    <span className="pill-dot dot-blue"></span>
    Videos
  </button>
</div>
              </Container>
            </div>

    

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