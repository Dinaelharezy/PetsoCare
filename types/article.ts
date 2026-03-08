

// export interface Article {
//   id: string | number
//   title: string
//   author: string
//   date: string
//   category: string
//   excerpt: string
//   color: 'yellow' | 'green' | 'blue' | 'purple'
//   tags: string[]
//   content: ContentParagraph[]
//   media: {
//     images: MediaImage[]
//     video?: MediaVideo
//   }
//   published: boolean
//   createdAt?: string
//   updatedAt?: string
// }

export interface article {
  id: number
  title: string
  summary: string
  content: string
  imageUrl: string
  source: string
  category: string
  publishDate: string
  createdAt: string
}


// export interface ContentParagraph {
//   text: string
//   type?: 'paragraph' | 'heading' | 'quote'
// }

// export interface MediaImage {
//   url: string
//   alt: string
//   caption?: string
// }

// export interface MediaVideo {
//   url: string
//   title: string
//   thumbnail?: string
// }

// For the admin form
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