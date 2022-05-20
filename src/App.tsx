import {Card, Container, Grid, Stack} from '@sanity/ui'
import {motion} from 'framer-motion'
import {Connect} from './connect-lines'

const MotionCard = motion(Card)

export default function App() {
  return (
    <Container padding={8}>
      <Grid columns={2} gap={7}>
        <Stack space={4}>
          <Connect id="card-1" connectWith={['card-4']}>
            <MotionCard tone="primary" border padding={3} drag dragMomentum={false}>
              Card 1
            </MotionCard>
          </Connect>

          <Connect id="card-2" connectWith={['card-4']}>
            <MotionCard tone="primary" border padding={3} drag dragMomentum={false}>
              Card 2
            </MotionCard>
          </Connect>

          <Connect id="card-3" connectWith={['card-4']}>
            <MotionCard tone="primary" border padding={3} drag dragMomentum={false}>
              Card 2
            </MotionCard>
          </Connect>
        </Stack>

        <Connect id="card-4" connectWith={['card-5']}>
          <MotionCard tone="primary" border padding={3} drag dragMomentum={false}>
            Card 4
          </MotionCard>
        </Connect>
      </Grid>
    </Container>
  )
}
