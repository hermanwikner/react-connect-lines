import {Card, Container, Grid} from '@sanity/ui'
import {useState} from 'react'
import {Connect} from './connect-lines'

export default function App() {
  const [color, setColor] = useState<string>('red')

  return (
    <Card height="fill">
      <Container padding={6} sizing="border">
        <Grid columns={2} gap={8}>
          <Connect id="card-1" connectWith={['card-2', 'card-4']} color={color}>
            <Card padding={6} border tone="primary" onClick={() => setColor('blue')}>
              Card 1
            </Card>
          </Connect>

          <Connect id="card-2" connectWith={['card-4']}>
            <Card padding={6} border tone="primary">
              Card 2
            </Card>
          </Connect>

          <Connect id="card-3" connectWith={['card-1']}>
            <Card padding={6} border tone="primary">
              Card 3
            </Card>
          </Connect>

          <Connect id="card-4" connectWith={['card-3']}>
            <Card padding={6} border tone="primary">
              Card 4
            </Card>
          </Connect>
        </Grid>
      </Container>
    </Card>
  )
}
