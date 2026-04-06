import { Container} from 'react-bootstrap'

const APP_GREEN_DARK = 'rgb(202, 244, 171)';

export default function LoadingSpin() {
  return (
    <Container className="py-5 text-center">
      <div className="spinner-border" style={{ color: APP_GREEN_DARK }} role="status" />
    </Container>
  )
}