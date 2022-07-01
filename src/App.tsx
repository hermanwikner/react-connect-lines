import {Card, Container} from '@sanity/ui'
import {WithContext} from './examples'

export default function App() {
  return (
    <Card height="fill">
      <Container width={2} padding={5}>
        <WithContext />
      </Container>
    </Card>
  )
}
