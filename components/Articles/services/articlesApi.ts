import { articlesApi } from '@/data/api/articles'


export const fetchArticles = async () => {
  const data = await articlesApi.getAll()
  return data
}