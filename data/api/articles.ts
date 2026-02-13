
// // data/api/articles.ts

// import { Article } from '@/types/article'

// const STORAGE_KEY = 'vet_clinic_articles'

// // Sample initial articles
// const INITIAL_ARTICLES: Article[] = [
//   {
//     id: '1',
//     title: 'Complete Guide to Dog Nutrition: What Your Canine Really Needs',
//     author: 'Dr. Sarah Mitchell',
//     date: 'November 15, 2025',
//     category: 'Nutrition',
//     excerpt: 'Proper nutrition is the foundation of your dog\'s health and wellbeing. Understanding what nutrients your canine companion needs...',
//     color: 'green',
//     tags: ['Dogs', 'Nutrition', 'Diet', 'Health', 'Feeding'],
//     content: [
//       {
//         text: 'Proper nutrition is the foundation of your dog\'s health and wellbeing. Understanding what nutrients your canine companion needs, in what quantities, and from which sources can significantly impact their quality of life, energy levels, and longevity. This comprehensive guide breaks down everything you need to know about dog nutrition.'
//       },
//       {
//         text: 'Dogs require six essential nutrient groups: proteins, fats, carbohydrates, vitamins, minerals, and water. Proteins are crucial for muscle development, tissue repair, and immune function. High-quality animal proteins from chicken, beef, fish, or lamb should form the backbone of your dog\'s diet. Aim for foods where meat is listed as the first ingredient.'
//       },
//       {
//         text: 'Fats are another vital component, providing energy and helping absorb fat-soluble vitamins (A, D, E, and K). Essential fatty acids like omega-3 and omega-6 support skin health, coat shine, and brain function. Fish oil, flaxseed, and chicken fat are excellent sources. However, balance is key—too much fat can lead to obesity and pancreatitis.'
//       },
//       {
//         text: 'While dogs don\'t strictly need carbohydrates, they provide readily available energy and fiber for digestive health. Whole grains like brown rice, oats, and quinoa are nutritious options. Some dogs may benefit from grain-free diets, particularly those with allergies, but consult your veterinarian before making significant dietary changes.'
//       }
//     ],
//     media: {
//       images: [
//         { url: '/images/dog-food-bowl.jpg', alt: 'Healthy dog food in bowl' },
//         { url: '/images/dog-nutrition-pyramid.jpg', alt: 'Dog nutrition pyramid chart' }
//       ],
//       video: {
//         url: '/videos/dog-nutrition.mp4',
//         title: 'Understanding Dog Nutrition'
//       }
//     },
//     published: true,
//     createdAt: new Date('2025-11-15').toISOString(),
//     updatedAt: new Date('2025-11-15').toISOString()
//   },
//   {
//     id: '2',
//     title: 'Essential Vaccinations for Your Pet: A Complete Timeline',
//     author: 'Dr. Ahmed Hassan',
//     date: 'December 1, 2025',
//     category: 'Prevention',
//     excerpt: 'Vaccinations are one of the most important aspects of preventive pet care. Learn about the essential vaccines your pet needs...',
//     color: 'blue',
//     tags: ['Vaccines', 'Prevention', 'Health', 'Puppies', 'Kittens'],
//     content: [
//       {
//         text: 'Vaccinations are one of the most important aspects of preventive pet care. They protect your beloved companion from serious, potentially fatal diseases. Understanding the vaccination schedule and which vaccines are essential can help you keep your pet healthy throughout their life.'
//       },
//       {
//         text: 'For puppies, the core vaccines include distemper, parvovirus, and rabies. The first vaccination series typically begins at 6-8 weeks of age, with boosters every 3-4 weeks until the puppy reaches 16 weeks. Rabies vaccination is usually given at 12-16 weeks and is required by law in most areas.'
//       },
//       {
//         text: 'Kittens require vaccinations against feline distemper (panleukopenia), feline herpesvirus, and calicivirus. The initial series starts at 6-8 weeks, with boosters at regular intervals. The rabies vaccine is also essential for cats, even indoor ones, as it\'s legally mandated in many jurisdictions.'
//       }
//     ],
//     media: {
//       images: [
//         { url: '/images/vaccine-timeline.jpg', alt: 'Pet vaccination timeline' }
//       ]
//     },
//     published: true,
//     createdAt: new Date('2025-12-01').toISOString(),
//     updatedAt: new Date('2025-12-01').toISOString()
//   }
// ]

// class ArticlesAPI {
//   private getArticles(): Article[] {
//     if (typeof window === 'undefined') return INITIAL_ARTICLES
    
//     const stored = localStorage.getItem(STORAGE_KEY)
//     if (!stored) {
//       // Initialize with sample articles
//       localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ARTICLES))
//       return INITIAL_ARTICLES
//     }
//     return JSON.parse(stored)
//   }

//   private saveArticles(articles: Article[]): void {
//     if (typeof window === 'undefined') return
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(articles))
//     // Trigger a custom event to notify other components
//     window.dispatchEvent(new CustomEvent('articlesUpdated'))
//   }

//   async getAll(): Promise<Article[]> {
//     // Simulate API delay
//     await new Promise(resolve => setTimeout(resolve, 300))
//     return this.getArticles()
//   }

//   async getById(id: string | number): Promise<Article | undefined> {
//     await new Promise(resolve => setTimeout(resolve, 200))
//     const articles = this.getArticles()
//     return articles.find(article => article.id.toString() === id.toString())
//   }

//   async create(article: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>): Promise<Article> {
//     await new Promise(resolve => setTimeout(resolve, 300))
    
//     const articles = this.getArticles()
//     const newArticle: Article = {
//       ...article,
//       id: Date.now().toString(),
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString()
//     }
    
//     const updatedArticles = [newArticle, ...articles]
//     this.saveArticles(updatedArticles)
    
//     return newArticle
//   }

//   async update(id: string | number, updates: Partial<Article>): Promise<Article | null> {
//     await new Promise(resolve => setTimeout(resolve, 300))
    
//     const articles = this.getArticles()
//     const index = articles.findIndex(article => article.id.toString() === id.toString())
    
//     if (index === -1) return null
    
//     const updatedArticle: Article = {
//       ...articles[index],
//       ...updates,
//       id: articles[index].id,
//       updatedAt: new Date().toISOString()
//     }
    
//     articles[index] = updatedArticle
//     this.saveArticles(articles)
    
//     return updatedArticle
//   }

//   async delete(id: string | number): Promise<boolean> {
//     await new Promise(resolve => setTimeout(resolve, 300))
    
//     const articles = this.getArticles()
//     const filteredArticles = articles.filter(article => article.id.toString() !== id.toString())
    
//     if (filteredArticles.length === articles.length) return false
    
//     this.saveArticles(filteredArticles)
//     return true
//   }

//   async togglePublish(id: string | number): Promise<Article | null> {
//     const articles = this.getArticles()
//     const article = articles.find(a => a.id.toString() === id.toString())
    
//     if (!article) return null
    
//     return this.update(id, { published: !article.published })
//   }
// }

// export const articlesApi = new ArticlesAPI()


import { Article } from '@/types/article'

const STORAGE_KEY = 'vet_clinic_articles'

// Sample initial articles
const INITIAL_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'Complete Guide to Dog Nutrition: What Your Canine Really Needs',
    author: 'Dr. Sarah Mitchell',
    date: 'November 15, 2025',
    category: 'Nutrition',
    excerpt: 'Proper nutrition is the foundation of your dog\'s health and wellbeing. Understanding what nutrients your canine companion needs...',
    color: 'green',
    tags: ['Dogs', 'Nutrition', 'Diet', 'Health', 'Feeding'],
    content: [
      {
        text: 'Proper nutrition is the foundation of your dog\'s health and wellbeing. Understanding what nutrients your canine companion needs, in what quantities, and from which sources can significantly impact their quality of life, energy levels, and longevity. This comprehensive guide breaks down everything you need to know about dog nutrition.'
      },
      {
        text: 'Dogs require six essential nutrient groups: proteins, fats, carbohydrates, vitamins, minerals, and water. Proteins are crucial for muscle development, tissue repair, and immune function. High-quality animal proteins from chicken, beef, fish, or lamb should form the backbone of your dog\'s diet. Aim for foods where meat is listed as the first ingredient.'
      },
      {
        text: 'Fats are another vital component, providing energy and helping absorb fat-soluble vitamins (A, D, E, and K). Essential fatty acids like omega-3 and omega-6 support skin health, coat shine, and brain function. Fish oil, flaxseed, and chicken fat are excellent sources. However, balance is key—too much fat can lead to obesity and pancreatitis.'
      },
      {
        text: 'While dogs don\'t strictly need carbohydrates, they provide readily available energy and fiber for digestive health. Whole grains like brown rice, oats, and quinoa are nutritious options. Some dogs may benefit from grain-free diets, particularly those with allergies, but consult your veterinarian before making significant dietary changes.'
      }
    ],
    media: {
      images: [
        { url: '/images/dog-food-bowl.jpg', alt: 'Healthy dog food in bowl' },
        { url: '/images/dog-nutrition-pyramid.jpg', alt: 'Dog nutrition pyramid chart' }
      ],
      video: {
        url: '/videos/dog-nutrition.mp4',
        title: 'Understanding Dog Nutrition'
      }
    },
    published: true,
    createdAt: new Date('2025-11-15').toISOString(),
    updatedAt: new Date('2025-11-15').toISOString()
  },
  {
    id: '2',
    title: 'Essential Vaccinations for Your Pet: A Complete Timeline',
    author: 'Dr. Ahmed Hassan',
    date: 'December 1, 2025',
    category: 'Prevention',
    excerpt: 'Vaccinations are one of the most important aspects of preventive pet care. Learn about the essential vaccines your pet needs...',
    color: 'blue',
    tags: ['Vaccines', 'Prevention', 'Health', 'Puppies', 'Kittens'],
    content: [
      {
        text: 'Vaccinations are one of the most important aspects of preventive pet care. They protect your beloved companion from serious, potentially fatal diseases. Understanding the vaccination schedule and which vaccines are essential can help you keep your pet healthy throughout their life.'
      },
      {
        text: 'For puppies, the core vaccines include distemper, parvovirus, and rabies. The first vaccination series typically begins at 6-8 weeks of age, with boosters every 3-4 weeks until the puppy reaches 16 weeks. Rabies vaccination is usually given at 12-16 weeks and is required by law in most areas.'
      },
      {
        text: 'Kittens require vaccinations against feline distemper (panleukopenia), feline herpesvirus, and calicivirus. The initial series starts at 6-8 weeks, with boosters at regular intervals. The rabies vaccine is also essential for cats, even indoor ones, as it\'s legally mandated in many jurisdictions.'
      }
    ],
    media: {
      images: [
        { url: '/images/vaccine-timeline.jpg', alt: 'Pet vaccination timeline' }
      ]
    },
    published: true,
    createdAt: new Date('2025-12-01').toISOString(),
    updatedAt: new Date('2025-12-01').toISOString()
  }
]

class ArticlesAPI {
  private getArticles(): Article[] {
    if (typeof window === 'undefined') return INITIAL_ARTICLES
    
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      // Initialize with sample articles
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ARTICLES))
      return INITIAL_ARTICLES
    }
    return JSON.parse(stored)
  }

  private saveArticles(articles: Article[]): void {
    if (typeof window === 'undefined') return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(articles))
    // Trigger a custom event to notify other components
    window.dispatchEvent(new CustomEvent('articlesUpdated'))
  }

  async getAll(): Promise<Article[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    return this.getArticles()
  }

  async getById(id: string | number): Promise<Article | undefined> {
    await new Promise(resolve => setTimeout(resolve, 200))
    const articles = this.getArticles()
    return articles.find(article => article.id.toString() === id.toString())
  }

  async create(articleData: Partial<Article>): Promise<Article> {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const articles = this.getArticles()
    
    // Generate ID if not provided
    const id = articleData.id || `article-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    
    const newArticle: Article = {
      title: '',
      author: '',
      date: '',
      category: '',
      excerpt: '',
      color: 'green',
      tags: [],
      content: [],
      media: { images: [] },
      published: false,
      ...articleData,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    const updatedArticles = [newArticle, ...articles]
    this.saveArticles(updatedArticles)
    
    return newArticle
  }

  async update(id: string | number, updates: Partial<Article>): Promise<Article | null> {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const articles = this.getArticles()
    const index = articles.findIndex(article => article.id.toString() === id.toString())
    
    if (index === -1) return null
    
    const updatedArticle: Article = {
      ...articles[index],
      ...updates,
      id: articles[index].id, // Preserve original ID
      createdAt: articles[index].createdAt, // Preserve creation date
      updatedAt: new Date().toISOString()
    }
    
    articles[index] = updatedArticle
    this.saveArticles(articles)
    
    return updatedArticle
  }

  async delete(id: string | number): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const articles = this.getArticles()
    const filteredArticles = articles.filter(article => article.id.toString() !== id.toString())
    
    if (filteredArticles.length === articles.length) return false
    
    this.saveArticles(filteredArticles)
    return true
  }

  async togglePublish(id: string | number): Promise<Article | null> {
    const articles = this.getArticles()
    const article = articles.find(a => a.id.toString() === id.toString())
    
    if (!article) return null
    
    return this.update(id, { published: !article.published })
  }
}

export const articlesApi = new ArticlesAPI()