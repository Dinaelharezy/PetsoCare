

import ArticleFetching from '../../../../components/Articles/ArticleFetching'

interface Params {
 params: Promise<{ id: string }>
}


export default async function ArticlesPage({ params }: Params) {
  const { id } = await params; // fixes Next.js async warning
  return <ArticleFetching id={id} />
}