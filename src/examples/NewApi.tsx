import {Card, Container, Flex, Grid, Text} from '@sanity/ui'
import {motion} from 'framer-motion'
import {Connect} from '../../lib'

const MotionCard = motion(Card)

export function NewApi() {
  return (
    <Container padding={5}>
      <Grid columns={2} gap={8} padding={4}>
        <Connect
          id="card-1"
          connectWith={[
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
          ]}
        >
          <MotionCard padding={4} border radius={2} tone="primary" drag dragMomentum={false}>
            <Flex align="center" height="fill">
              <Text align="center" muted>
                Card 1
              </Text>
            </Flex>
          </MotionCard>
        </Connect>

        <Connect id="card-2">
          <MotionCard padding={4} border radius={2} tone="positive" drag dragMomentum={false}>
            <Flex align="center" height="fill">
              <Text align="center" muted>
                Card 2
              </Text>
            </Flex>
          </MotionCard>
        </Connect>

        <Connect id="card-3">
          <MotionCard padding={4} border radius={2} tone="critical" drag dragMomentum={false}>
            <Flex align="center" height="fill">
              <Text align="center" muted>
                Card 3
              </Text>
            </Flex>
          </MotionCard>
        </Connect>

        <Connect
          id="card-4"
          connectWith={[
            {
              id: 'card-2',
              color: 'coral',
            },
          ]}
        >
          <MotionCard padding={4} border radius={2} tone="caution" drag dragMomentum={false}>
            <Flex align="center" height="fill">
              <Text align="center" muted>
                Card 4
              </Text>
            </Flex>
          </MotionCard>
        </Connect>

        <Connect
          id="card-5"
          connectWith={[
            {
              id: 'card-3',
              color: '#7928CA',
            },
          ]}
        >
          <MotionCard padding={4} border radius={2} tone="transparent" drag dragMomentum={false}>
            <Flex align="center" height="fill">
              <Text align="center" muted>
                Card 5
              </Text>
            </Flex>
          </MotionCard>
        </Connect>

        <Connect
          id="card-6"
          connectWith={[
            {
              id: 'card-3',
              color: 'magenta',
              stroke: 'dashed',
            },
            {
              id: 'card-4',
              color: 'CornflowerBlue',
            },
          ]}
        >
          <MotionCard padding={4} border radius={2} tone="default" drag dragMomentum={false}>
            <Flex align="center" height="fill">
              <Text align="center" muted>
                Card 6
              </Text>
            </Flex>
          </MotionCard>
        </Connect>
      </Grid>
    </Container>
  )
}
