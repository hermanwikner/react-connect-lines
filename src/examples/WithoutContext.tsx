import {Card, Flex, Grid, Text} from '@sanity/ui'
import {motion} from 'framer-motion'
import {ConnectElement} from '../../lib'
import {ConnectLines} from '../../lib/lines'

const ELEMENTS: ConnectElement[] = [
  {
    id: 'card-1',
    connectWith: [
      {
        id: 'card-3',
        color: '#F5A623',
        stroke: 'dashed',
      },
      {
        id: 'card-4',
        color: '#50E3C2',
        edge: 'step',
      },
    ],
  },
  {
    id: 'card-2',
  },
  {
    id: 'card-3',
  },
  {
    id: 'card-4',
    connectWith: [
      {
        id: 'card-2',
        color: 'coral',
      },
    ],
  },
  {
    id: 'card-5',
    connectWith: [
      {
        id: 'card-3',
        color: '#7928CA',
      },
    ],
  },
  {
    id: 'card-6',
    connectWith: [
      {
        id: 'card-3',
        color: 'magenta',
        stroke: 'dashed',
      },
      {
        id: 'card-4',
        color: 'CornflowerBlue',
      },
    ],
  },
]

const MotionCard = motion(Card)

export function WithoutContext() {
  return (
    <Grid columns={2} gap={8}>
      <ConnectLines elements={ELEMENTS} />

      <MotionCard
        border
        tone="primary"
        padding={4}
        radius={2}
        id="card-1"
        drag
        dragMomentum={false}
      >
        <Flex align="center" height="fill">
          <Text align="center" muted>
            Card 1
          </Text>
        </Flex>
      </MotionCard>

      <MotionCard
        border
        tone="positive"
        padding={4}
        radius={2}
        id="card-2"
        drag
        dragMomentum={false}
      >
        <Flex align="center" height="fill">
          <Text align="center" muted>
            Card 2
          </Text>
        </Flex>
      </MotionCard>

      <MotionCard
        border
        tone="critical"
        padding={4}
        radius={2}
        id="card-3"
        drag
        dragMomentum={false}
      >
        <Flex align="center" height="fill">
          <Text align="center" muted>
            Card 3
          </Text>
        </Flex>
      </MotionCard>

      <MotionCard
        border
        tone="caution"
        padding={4}
        radius={2}
        id="card-4"
        drag
        dragMomentum={false}
      >
        <Flex align="center" height="fill">
          <Text align="center" muted>
            Card 4
          </Text>
        </Flex>
      </MotionCard>

      <MotionCard
        border
        tone="transparent"
        padding={4}
        radius={2}
        id="card-5"
        drag
        dragMomentum={false}
      >
        <Flex align="center" height="fill">
          <Text align="center" muted>
            Card 5
          </Text>
        </Flex>
      </MotionCard>

      <MotionCard
        border
        tone="default"
        padding={4}
        radius={2}
        id="card-6"
        drag
        dragMomentum={false}
      >
        <Flex align="center" height="fill">
          <Text align="center" muted>
            Card 6
          </Text>
        </Flex>
      </MotionCard>
    </Grid>
  )
}
