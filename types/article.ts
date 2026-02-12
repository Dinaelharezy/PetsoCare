export interface ArticleContent {
  type: 'paragraph'
  text: string
}

export interface ArticleMedia {
  images: {
    url: string
    alt: string
  }[]
  video: {
    url: string
    thumbnail: string
    title: string
  }
}

export interface Article {
  id: number
  title: string
  author: string
  date: string
  category: string
  tags: string[]
  readTime: string
  image: string
  content: ArticleContent[]
  media: ArticleMedia
  excerpt: string
  color: string
}