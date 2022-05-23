import {Button, Card, Container, Grid, Menu, MenuButton, MenuItem} from '@sanity/ui'
import {motion} from 'framer-motion'
import {Connect} from '../connect-lines'

export function Testing() {
  return (
    <Container height="fill" padding={5} width={3} sizing="border">
      <Grid columns={2} gap={8}>
        <MenuButton
          id="test"
          button={<Button text="Hej" />}
          menu={
            <Menu>
              <Connect connectWith={['card-1']} id="button">
                <MenuItem text="Hej" padding={5} />
              </Connect>

              <Connect connectWith={['card-1']} id="button2">
                <MenuItem text="Hej" padding={5} />
              </Connect>
              <MenuItem text="Hej" />
            </Menu>
          }
        />

        <Connect id="card-1" connectWith={['card-2']} color="orange" edge="step" stroke="dashed">
          <Card tone="primary" padding={4} border>
            Card 1
          </Card>
        </Connect>
      </Grid>
    </Container>
  )
}
