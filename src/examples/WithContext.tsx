import {AddIcon, EditIcon, TrashIcon} from '@sanity/icons'
import {
  Box,
  Button,
  Card,
  Checkbox,
  Flex,
  Grid,
  Label,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  Select,
  Stack,
  Switch,
  Text,
} from '@sanity/ui'
import {motion} from 'framer-motion'
import {useCallback, useState} from 'react'
import {Connect, ConnectProvider, ConnectElement} from '../../lib'
import {randomEmojiId} from './randomId'

const MotionCard = motion(Card)

export function WithContext() {
  const [connections, setConnections] = useState<ConnectElement[]>([])

  const add = useCallback(() => {
    setConnections((prev) => [...prev, {id: randomEmojiId()}])
  }, [])

  const remove = useCallback(
    (id: string) => {
      const update = connections.filter((c) => c.id !== id)

      setConnections(update)
    },
    [connections]
  )

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
      <Card padding={5} sizing="border" height="fill">
        <Flex marginBottom={4}>
          <Button
            text="Add element"
            onClick={add}
            fontSize={1}
            padding={2}
            mode="ghost"
            icon={AddIcon}
          />
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
                style={{position: 'absolute'}}
              >
                <Stack space={4}>
                  <Flex align="center" justify="space-between" gap={2}>
                    <Box>
                      <Text align="center" muted weight="bold">
                        {c.id}
                      </Text>
                    </Box>

                    <Flex gap={2} marginLeft={7}>
                      <MenuButton
                        id="del"
                        button={<Button icon={TrashIcon} mode="ghost" fontSize={1} padding={2} />}
                        menu={
                          <Menu>
                            <MenuItem
                              text="Confirm"
                              fontSize={1}
                              padding={2}
                              tone="critical"
                              onClick={() => remove(c.id)}
                            />
                          </Menu>
                        }
                      />

                      <MenuButton
                        id="menu"
                        button={
                          <Button
                            icon={EditIcon}
                            mode="ghost"
                            fontSize={1}
                            padding={2}
                            disabled={connections.length === 1}
                          />
                        }
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
                                      const connected = Boolean(
                                        c.connectWith?.find((y) => y.id === x.id)
                                      )

                                      return (
                                        <Stack key={x.id} space={4}>
                                          <Text weight="bold" size={1}>
                                            {x.id}
                                          </Text>
                                          <Flex gap={3}>
                                            <Stack space={2}>
                                              <Stack space={2}>
                                                <Label size={0} muted>
                                                  Connected
                                                </Label>

                                                <Box style={{height: 25}}>
                                                  <Switch
                                                    onChange={(e) => handleConnect(e, c, x)}
                                                    checked={connected}
                                                  />
                                                </Box>
                                              </Stack>
                                            </Stack>

                                            <Stack space={2}>
                                              <Label size={0} muted>
                                                Stroke
                                              </Label>

                                              <Select
                                                disabled={!connected}
                                                fontSize={1}
                                                padding={2}
                                                defaultValue={
                                                  c.connectWith?.find((y) => y.id === x.id)
                                                    ?.stroke || 'solid'
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

                                            {connected && (
                                              <Stack space={2}>
                                                <Label size={0} muted>
                                                  Has Arrows
                                                </Label>

                                                <Box style={{height: 25}}>
                                                  <Checkbox
                                                    onChange={(e) => {
                                                      return handleUpdate(c, x, {
                                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                                        // @ts-ignore
                                                        hasArrows: e.target?.checked,
                                                      })
                                                    }}
                                                    defaultChecked={
                                                      connected &&
                                                      c.connectWith?.find((y) => y.id === x.id)
                                                        ?.hasArrows
                                                    }
                                                  />
                                                </Box>
                                              </Stack>
                                            )}

                                            <Stack space={2}>
                                              <Label size={0} muted>
                                                Edge
                                              </Label>

                                              <Select
                                                disabled={!connected}
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
                                                disabled={!connected}
                                                as="input"
                                                radius={2}
                                                style={{height: 25}}
                                                defaultValue={
                                                  c.connectWith?.find((y) => y.id === x.id)?.color
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
                                        </Stack>
                                      )
                                    })}
                                </Stack>
                              </Stack>
                            </Box>
                          </Menu>
                        }
                      />
                    </Flex>
                  </Flex>
                </Stack>
              </MotionCard>
            </Connect>
          ))}
        </Grid>
      </Card>
    </ConnectProvider>
  )
}
