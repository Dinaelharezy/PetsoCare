
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
  // في article type
titleEn?: string
summaryEn?: string
contentEn?: string
}

export interface ArticleForm {
  Title:       string
  Summary:     string
  Content:     string
  TitleEn:     string
  SummaryEn:   string
  ContentEn:   string
  Source:      string
  Category:    string
  PublishDate: string
}