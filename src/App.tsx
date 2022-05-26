import {Card, Container, Grid, Heading, Stack} from '@sanity/ui'
import {WithContext, WithoutContext} from './examples'

export default function App() {
  return (
    <Card tone="transparent" style={{height: 'auto'}}>
      <Container width={4}>
        <Grid columns={1} gap={5} padding={[3, 3, 5, 5]} sizing="border">
          <Stack space={3}>
            <Heading size={1}>With Context</Heading>

            <Card padding={6} shadow={1} radius={2} sizing="border">
              <Grid columns={2} padding={[3, 4, 4, 8]} gapX={[7, 7, 7, 9]} gapY={[6, 6, 6, 8]}>
                <WithContext />
              </Grid>
            </Card>
          </Stack>

          <Stack space={3}>
            <Heading size={1}>Without context</Heading>

            <Card padding={6} shadow={1} radius={2} sizing="border" scheme="dark">
              <Grid columns={2} padding={[3, 4, 4, 8]} gapX={[7, 7, 7, 9]} gapY={[6, 6, 6, 8]}>
                <WithoutContext />
              </Grid>
            </Card>
          </Stack>
        </Grid>
      </Container>
    </Card>
  )
}
