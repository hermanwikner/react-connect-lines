import {Card, Container, Flex, Stack} from '@sanity/ui'
import {motion} from 'framer-motion'
import {Connect} from '../connect-lines'

const STRESS_DATA = [...Array(10).keys()]

const MotionCard = motion(Card)

export function StressTest() {
  return (
    <Container height="fill" padding={3} width={3} sizing="border">
      <Flex align="center" justify="center" height="fill">
        <Connect id="card" connectWith={STRESS_DATA.map((d) => `test-${d}`)}>
          <MotionCard padding={5} tone="critical" border drag dragMomentum={false}></MotionCard>
        </Connect>
      </Flex>

      <Stack flex={1} space={4}>
        {STRESS_DATA.map((d) => (
          <Connect
            key={d}
            id={`test-${d}`}
            connectWith={STRESS_DATA.filter((s) => s !== d).map((x) => `test-${x}`)}
          >
            <MotionCard
              drag
              dragMomentum={false}
              padding={5}
              sizing="border"
              tone="caution"
              border
              animate={{
                position: 'absolute',
                left: Math.random() * window.innerWidth - 50,
                top: Math.random() * window.innerHeight - 50,
              }}
            ></MotionCard>
          </Connect>
        ))}
      </Stack>
    </Container>
  )
}
