import {Card, Container, Grid} from '@sanity/ui'
import {motion} from 'framer-motion'
import {useCallback} from 'react'
import {Connect, useConnectElements} from './connect-lines'

const MotionCard = motion(Card)

export default function App() {
  const {addElement} = useConnectElements()

  const addEl = useCallback(
    (node) => {
      addElement({
        element: node,
        id: 'with-hook',
        connectWith: ['motion-card'],
      })
    },
    [addElement]
  )

  return (
    <Card height="fill">
      <Container padding={6} sizing="border">
        <Grid columns={2} gap={8}>
          <Connect id="card-1" connectWith={['card-2', 'motion-card']} color="lightseagreen">
            <Card padding={6} border tone="primary">
              Card 1
            </Card>
          </Connect>

          <Connect id="card-2" connectWith={['card-4']}>
            <Card padding={6} border tone="positive">
              Card 2
            </Card>
          </Connect>

          <Connect id="motion-card">
            <MotionCard padding={6} border tone="caution" drag dragMomentum={false}>
              Motion Card 3
            </MotionCard>
          </Connect>

          <Connect id="card-4" connectWith={['card-3', 'motion-card']}>
            <Card padding={6} border tone="critical">
              Card 4
            </Card>
          </Connect>

          <Card padding={6} border tone="critical" ref={addEl}>
            With hook
          </Card>
        </Grid>
      </Container>
    </Card>
  )
}
