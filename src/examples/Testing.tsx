import {Card, Container, Grid} from '@sanity/ui'
import {Connect} from '../connect-lines'

export function Testing() {
  return (
    <Container height="fill" padding={5} width={3} sizing="border">
      <Grid columns={2} gap={8}>
        <Connect id="card-1" connectWith={['card-2']}>
          <Card tone="primary" padding={4} border>
            Card 1
          </Card>
        </Connect>

        <Connect id="card-2">
          <Card tone="positive" padding={4} border>
            Card 2
          </Card>
        </Connect>
      </Grid>
    </Container>
  )
}
