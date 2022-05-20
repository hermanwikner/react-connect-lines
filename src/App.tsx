import {Card, Grid} from '@sanity/ui'
import {motion} from 'framer-motion'
import {Connect} from './connect-lines'

const MotionCard = motion(Card)

export default function App() {
  return (
    <Grid padding={8} columns={2} gap={7}>
      <Connect id="card-1">
        <Card tone="primary" border padding={3}>
          Card 1
        </Card>
      </Connect>

      <Connect id="card-2" color="lightseagreen" connectWith={['card-3']}>
        <Card tone="primary" border padding={3}>
          Card 2
        </Card>
      </Connect>

      <Connect id="card-3" connectWith={['card-5']} color="blue">
        <Card tone="primary" border padding={3}>
          Card 3
        </Card>
      </Connect>

      <Connect id="card-4" connectWith={['card-3']}>
        <MotionCard tone="primary" border padding={4} drag dragMomentum={false}>
          Card 4
        </MotionCard>
      </Connect>

      <Connect id="card-5" color="red">
        <Card tone="primary" border padding={3}>
          Card 5
        </Card>
      </Connect>

      <Connect id="card-6" connectWith={['card-3']} color="blue">
        <Card tone="primary" border padding={3}>
          Card 6
        </Card>
      </Connect>
    </Grid>
  )
}
