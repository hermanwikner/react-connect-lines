import {AddIcon, EditIcon} from '@sanity/icons'
import {
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  Flex,
  Grid,
  Inline,
  Label,
  Menu,
  MenuButton,
  MenuDivider,
  Select,
  Stack,
  Switch,
  Text,
} from '@sanity/ui'
import {AnimatePresence, motion} from 'framer-motion'
import React, {useCallback, useState} from 'react'
import {Connect, ConnectProvider, ConnectElement} from '../../pkg'

const MotionCard = motion(Card)

const randId = () => Math.random().toString(36).slice(2)

const INITIAL: ConnectElement[] = [
  {
    id: randId(),
  },
  {
    id: randId(),
  },
]

export function WithContext() {
  const [connections, setConnections] = useState<ConnectElement[]>(INITIAL)

  const add = useCallback(() => {
    setConnections((prev) => [...prev, {id: randId()}])
  }, [])

  const handleConnect = useCallback(
    (e, from, to) => {
      const connect = e.currentTarget.checked

      const next = connections.map((p) => {
        if (from.id === p.id && connect) {
          return {
            ...p,
            connectWith: [...(p?.connectWith || []), {id: to.id}],
          }
        }

        if (from.id === p.id && !connect) {
          return {
            ...p,
            connectWith: p?.connectWith?.filter((y) => y.id !== to.id),
          }
        }

        return p
      })

      setConnections(next)
    },
    [connections]
  )

  const handleUpdate = useCallback(
    (parent: ConnectElement, child: ConnectElement, value) => {
      const update = connections.map((c) => {
        if (c.id === parent.id) {
          return {
            ...parent,
            connectWith: parent?.connectWith?.map((y) => {
              if (y.id === child.id) {
                return {
                  ...y,
                  papa: 'mama',
                  ...value,
                }
              }

              return y
            }),
          }
        }

        return c
      })

      setConnections(update)
    },
    [connections]
  )

  return (
    <ConnectProvider>
      <Container width={3} paddingX={7} paddingY={5} sizing="border">
        <Flex marginBottom={4}>
          <Button text="add" onClick={add} fontSize={1} padding={2} mode="ghost" icon={AddIcon} />
        </Flex>

        <Grid columns={2} gapY={7} gapX={9}>
          {connections.map((c) => (
            <Connect id={c.id} connectWith={c?.connectWith} key={c.id}>
              <MotionCard
                padding={4}
                border
                radius={2}
                drag
                dragMomentum={false}
                initial={{scale: 0.5}}
                animate={{scale: 1}}
              >
                <Stack space={4}>
                  <Flex align="center" gap={2}>
                    <Box>
                      <Text align="center" muted weight="bold">
                        {c.id}
                      </Text>
                    </Box>

                    <MenuButton
                      id="menu"
                      button={<Button icon={EditIcon} mode="ghost" fontSize={1} padding={2} />}
                      popover={{portal: true, constrainSize: true}}
                      menu={
                        <Menu padding={0}>
                          <Box padding={3}>
                            <Stack space={4}>
                              {/* Connect with */}
                              <Stack space={3}>
                                {connections
                                  .filter((i) => i.id !== c?.id)
                                  ?.map((x, index) => {
                                    return (
                                      <React.Fragment key={x.id}>
                                        <Flex gap={3}>
                                          <Stack space={2}>
                                            <Stack space={2}>
                                              <Label size={0} muted>
                                                Connected
                                              </Label>

                                              <Box style={{height: 25}}>
                                                <Switch
                                                  onChange={(e) => handleConnect(e, c, x)}
                                                  checked={Boolean(
                                                    c.connectWith?.find((y) => y.id === x.id)
                                                  )}
                                                />
                                              </Box>
                                            </Stack>
                                          </Stack>

                                          <Stack space={2}>
                                            <Label size={0} muted>
                                              Stroke
                                            </Label>

                                            <Select
                                              fontSize={1}
                                              padding={2}
                                              defaultValue={
                                                c.connectWith?.find((y) => y.id === x.id)?.stroke ||
                                                'solid'
                                              }
                                              onChange={(e) =>
                                                handleUpdate(c, x, {
                                                  stroke: e.currentTarget.value,
                                                })
                                              }
                                            >
                                              <option value="dashed">Dashed</option>
                                              <option value="solid">Solid</option>
                                            </Select>
                                          </Stack>

                                          <Stack space={2}>
                                            <Label size={0} muted>
                                              Edge
                                            </Label>

                                            <Select
                                              fontSize={1}
                                              padding={2}
                                              defaultValue={
                                                c.connectWith?.find((y) => y.id === x.id)?.edge ||
                                                'bezier'
                                              }
                                              onChange={(e) =>
                                                handleUpdate(c, x, {
                                                  edge: e.currentTarget.value,
                                                })
                                              }
                                            >
                                              <option value="bezier">Bezier</option>
                                              <option value="step">Step</option>
                                            </Select>
                                          </Stack>

                                          <Stack space={2}>
                                            <Label size={0} muted>
                                              Color
                                            </Label>

                                            <Card
                                              as="input"
                                              radius={2}
                                              style={{height: 25}}
                                              defaultValue={
                                                c.connectWith?.find((y) => y.id === x.id)?.color ||
                                                'magenta'
                                              }
                                              onChange={(e: any) =>
                                                handleUpdate(c, x, {
                                                  color: e.currentTarget.value,
                                                })
                                              }
                                              type="color"
                                            />
                                          </Stack>
                                        </Flex>

                                        {index + 2 < connections.length && <MenuDivider />}
                                      </React.Fragment>
                                    )
                                  })}
                              </Stack>
                            </Stack>
                          </Box>
                        </Menu>
                      }
                    />
                  </Flex>
                </Stack>
              </MotionCard>
            </Connect>
          ))}
        </Grid>
      </Container>
    </ConnectProvider>
  )
}
