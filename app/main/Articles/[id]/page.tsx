
import ArticleContent from "../../../../components/Articles/ArticleContent"
import { articlesApi } from '../../../../data/api/articles'


export default async function ArticleContentPage({
  params,
}: {
  params: { id: string } // types مش مهم قوي هنا
}) {
  // فك الـ Promise
  const resolvedParams = await params; // ده هيطلعلك { id: '3' }
  const id = resolvedParams.id;

  const article = await articlesApi.getById(Number(id));

  if (!article) return <div>Article not found</div>;

  return <ArticleContent article={article} />;
}
