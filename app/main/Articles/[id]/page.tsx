


import ArticleFetching from '@/components/Articles/ArticleFetching'
   
export default function ArticlesPage({ params }: { params: { id: string } }) {
  return <ArticleFetching id={params.id} />
}
