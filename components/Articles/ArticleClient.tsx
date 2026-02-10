'use client'

import { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import SearchBar from './SearchBar'
import CategoryFilters from './CategoryFilters'
import ArticleCard from './ArticleCard'
import Pagination from './Pagination'


const articles = [
  {
    id: 1,
    title: 'The Importance of a Balanced Diet',
    excerpt: 'Discover the nutritional essentials your pet needs to thrive. Learn how to create an ideal diet that keeps your furry friend healthy.',
    image: '/images/balanced-diet.jpg',
    tags: ['Nutrition', 'Health', 'Diet'],
    category: 'Nutrition',
    color: 'yellow'
  },
  {
    id: 2,
    title: 'Decoding Your Pet\'s Vaccination Schedule',
    excerpt: 'Learn about important vaccines and when to get them. Navigate the world of immunizations with this guide and protect your pet.',
    image: '/images/vaccination.jpg',
    tags: ['Vaccines', 'Prevention'],
    category: 'Vaccines',
    color: 'green'
  },
  {
    id: 3,
    title: 'Understanding Common Pet Behaviors',
    excerpt: 'Decode your pet\'s actions and strengthen your connection with them. Learn to read the signs and respond with confidence to their body language.',
    image: '/images/pet-behaviors.jpg',
    tags: ['Behavior', 'Training', 'Bonding'],
    category: 'Behavior',
    color: 'blue'
  },
  {
    id: 4,
    title: 'Zoonotic Diseases: What Every Pet Owner...',
    excerpt: 'Stay informed about zoonotic diseases that can transfer between pets and humans. Learn prevention tips to keep your family safe.',
    image: '/images/zoonotic.jpg',
    tags: ['Diseases', 'Public Health'],
    category: 'Diseases',
    color: 'purple'
  },
  {
    id: 5,
    title: 'Essential First Aid Tips for Pet Emergencies',
    excerpt: 'Be prepared to act quickly in emergencies with these crucial first aid tips. Learn life-saving techniques and build a pet emergency kit.',
    image: '/images/first-aid.jpg',
    tags: ['First Aid', 'Emergencies', 'Safety'],
    category: 'First Aid',
    color: 'yellow'
  },
  {
    id: 6,
    title: 'Caring for Your Senior Pet: A Guide for Their...',
    excerpt: 'Help your pet age gracefully with tips on nutrition, exercise, and care. Discover how to keep them comfortable and happy in their golden years.',
    image: '/images/senior-pet.jpg',
    tags: ['Senior Care', 'Health', 'Aging'],
    category: 'Senior Care',
    color: 'green'
  },
  {
    id: 7,
    title: 'The Critical Role of Dental Health in Pets',
    excerpt: 'Learn why dental care is vital for your pet\'s overall health. Discover tips to maintain their teeth and prevent common dental problems.',
    image: '/images/dental-health.jpg',
    tags: ['Dental Care', 'Health'],
    category: 'Dental Care',
    color: 'blue'
  },
  {
    id: 8,
    title: 'Identifying and Treating Common Pet Parasites',
    excerpt: 'Protect your pet from harmful parasites like fleas, ticks, and worms. Learn identification and treatment options to keep them healthy.',
    image: '/images/parasites.jpg',
    tags: ['Parasites', 'Prevention', 'Treatment'],
    category: 'Parasites',
    color: 'purple'
  }
]

const categories = ['Overview', 'Exact Health', 'Vaccines', 'Behavior', 'Nutrition', 'Prevention', 'First Aid']

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('Overview')
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredArticles = articles.filter(article => {
    const matchesCategory = activeCategory === 'Overview' || article.category === activeCategory
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <>
      {/* Header */}
      <div className="header-section">
        <Container>
          <h1 className="main-title">
            Nurturing Knowledge for Your Beloved Companion
          </h1>
          <p className="subtitle">
            Explore our curated collection of articles on pet health, behavior, and well-being. From essential preventative care, find expert advice to keep your furry friend happy, healthy, and thriving.
          </p>

          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          
          <CategoryFilters
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </Container>
      </div>

      {/* Articles Grid */}
      <Container className="py-4">
        <Row className="g-4">
          {filteredArticles.map((article, index) => (
            <Col key={article.id} lg={3} md={6} sm={12}>
              <ArticleCard article={article} index={index} />
            </Col>
          ))}
        </Row>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={3}
          onPageChange={setCurrentPage}
        />
      </Container>
    </>
  )
}