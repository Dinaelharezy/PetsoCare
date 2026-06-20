import { Container } from 'react-bootstrap'
import Link from 'next/link'

export default function ArticleNotFound() {
  return (
    <Container className="py-5 text-center">
      <h3 className="text-muted">Article not found</h3>
      <p className="text-muted mt-2">
        The article you're looking for doesn't exist or has been removed.
      </p>
      <Link href="/main/Articles" className="btn btn-primary mt-3">
        Back to Articles
      </Link>
    </Container>
  )
}