// export interface ArticleContent {
//   type?: 'paragraph' | 'heading' | 'quote'
//   text: string
// }

// export interface ArticleMedia {
//   images: {
//     url: string
//     alt: string
//   }[]
//   video: {
//     url: string
//     thumbnail: string
//     title: string
//   }
// }

// export interface Article {
//   id: number
//   title: string
//   author: string
//   date: string
//   category: string
//   tags: string[]
//   readTime: string
//   image: string
//   content: ArticleContent[]
//   media: ArticleMedia
//   excerpt: string
//   color: string
//     published: boolean
//   createdAt?: string
//   updatedAt?: string
// }

// // types/article.ts


// // For the admin form
// export interface ArticleFormData {
//   title: string
//   author: string
//   date: string
//   category: string
//   excerpt: string
//   color: 'yellow' | 'green' | 'blue' | 'purple'
//   tags: string
//   content: string
//   imageUrls: string
//   imageAlts: string
//   videoUrl: string
//   videoTitle: string
//   published: boolean
// }


// types/article.ts

export interface Article {
  id: string | number
  title: string
  author: string
  date: string
  category: string
  excerpt: string
  color: 'yellow' | 'green' | 'blue' | 'purple'
  tags: string[]
  content: ContentParagraph[]
  media: {
    images: MediaImage[]
    video?: MediaVideo
  }
  published: boolean
  createdAt?: string
  updatedAt?: string
}

export interface ContentParagraph {
  text: string
  type?: 'paragraph' | 'heading' | 'quote'
}

export interface MediaImage {
  url: string
  alt: string
  caption?: string
}

export interface MediaVideo {
  url: string
  title: string
  thumbnail?: string
}

// For the admin form
export interface ArticleFormData {
  title: string
  author: string
  date: string
  category: string
  excerpt: string
  color: 'yellow' | 'green' | 'blue' | 'purple'
  tags: string
  content: string
  imageUrls: string
  imageAlts: string
  videoUrl: string
  videoTitle: string
  published: boolean
}