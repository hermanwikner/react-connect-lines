import {AddIcon, TrashIcon} from '@sanity/icons'
import {
  Card,
  CardProps,
  Checkbox,
  Container,
  Flex,
  Grid,
  Stack,
  Text,
  studioTheme,
  Button,
  Box,
  Radio,
} from '@sanity/ui'
import {motion} from 'framer-motion'
import React, {useCallback, useState} from 'react'
import {Connect, ConnectElement} from '../connect-lines'

const MotionCard = motion(Card)

const randId = () => Math.random().toString(36).substring(2, 9)

type ConnectionType = Omit<ConnectElement, 'element'> & Pick<CardProps, 'tone'>

const VARIANTS = ['solid', 'dashed']
const EDGES = ['bezier', 'step']

// const CONNECTIONS: ConnectionType[] = [
//   {
//     id: randId(),
//     connectWith: [],
//     tone: 'primary',
//     color: studioTheme.color.light.primary.card.selected.bg,
//     stroke: 'solid',
//     edge: 'bezier',
//   },
//   {
//     id: randId(),
//     connectWith: [],
//     tone: 'positive',
//     color: studioTheme.color.light.positive.card.selected.bg,
//     stroke: 'solid',
//     edge: 'bezier',
//   },
//   {
//     id: randId(),
//     connectWith: [],
//     tone: 'critical',
//     color: studioTheme.color.light.critical.card.selected.bg,
//     stroke: 'solid',
//     edge: 'bezier',
//   },
//   {
//     id: randId(),
//     connectWith: [],
//     tone: 'caution',
//     color: studioTheme.color.light.caution.card.selected.bg,
//     stroke: 'solid',
//     edge: 'bezier',
//   },
// ]

export function PropsTest() {
  const [connections, setConnections] = useState<ConnectionType[]>([])

  const handleAdd = useCallback(() => {
    setConnections((prev) => [
      ...prev,
      {
        id: randId(),
        connectWith: [],
        tone: 'primary',
        stroke: 'solid',
        edge: 'bezier',
      },
    ])
  }, [])

  const handleDelete = useCallback((id: string) => {
    setConnections((prev) =>
      prev
        .map((x) => {
          return {
            ...x,
            connectWith: x.connectWith?.filter((y) => y !== id),
          }
        })
        .filter((el) => el.id !== id)
    )
  }, [])

  const handleConnect = useCallback(
    (changeProps: {target: string; connectId: string}) => {
      const {target, connectId} = changeProps

      const exists = (connections.find((c) => c.id === target)?.connectWith || []).includes(
        connectId
      )

      const update = connections.map((c) => {
        if (c.id === target) {
          return {
            ...c,
            connectWith: exists
              ? (c?.connectWith || []).filter((a) => a !== connectId)
              : [...(c.connectWith || []), connectId],
          }
        }

        return c
      })

      setConnections(update)
    },
    [connections]
  )

  const handleUpdate = useCallback(
    (payload: {target: string; update: any}) => {
      const update = connections.map((c) => {
        if (c.id === payload.target) {
          return {
            ...c,
            ...payload.update,
          }
        }

        return c
      })

      setConnections(update)
    },
    [connections]
  )

  return (
    <Container padding={4} width={3} sizing="border">
      <Box marginBottom={4}>
        <Button
          text="Add element"
          icon={AddIcon}
          fontSize={1}
          padding={2}
          mode="ghost"
          onClick={handleAdd}
        />
      </Box>

      <Grid columns={[1, 2, 2, 3]} gap={8} padding={6} sizing="border">
        {connections.map((c) => (
          <Connect
            color={c.color}
            connectWith={c.connectWith}
            edge={c?.edge}
            id={c.id}
            key={c.id}
            stroke={c?.stroke}
          >
            <MotionCard
              border
              drag
              dragMomentum={false}
              padding={3}
              radius={3}
              sizing="border"
              tone={c?.tone}
              style={{position: 'absolute'}}
            >
              <Stack space={4}>
                <Flex align="center">
                  <Box flex={1}>
                    <Text weight="semibold" size={3}>
                      {c.id}
                    </Text>
                  </Box>

                  <Button
                    icon={TrashIcon}
                    mode="bleed"
                    tone="critical"
                    fontSize={1}
                    onClick={() => handleDelete(c.id)}
                  />
                </Flex>

                <Stack space={3}>
                  <Stack space={2}>
                    <Text muted size={1} weight="semibold">
                      Connected with
                    </Text>

                    <Flex align="center" gap={3} wrap="wrap">
                      {connections
                        .filter((a) => a.id !== c.id)
                        .map((a) => (
                          <Flex align="center" key={a.id} gap={1}>
                            <Checkbox
                              size={1}
                              checked={c.connectWith?.includes(a.id)}
                              onChange={() => handleConnect({target: c.id, connectId: a.id})}
                            />

                            <Text size={1} muted as="label">
                              {a.id}
                            </Text>
                          </Flex>
                        ))}
                    </Flex>
                  </Stack>

                  <Stack space={2}>
                    <Text muted size={1} weight="semibold">
                      Stroke
                    </Text>

                    <Flex align="center" gap={3}>
                      {VARIANTS.map((stroke) => (
                        <Flex align="center" key={stroke} gap={1}>
                          <Radio
                            size={1}
                            checked={c?.stroke === stroke}
                            name={`${c.id}-stroke`}
                            value={stroke}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                              handleUpdate({target: c.id, update: {stroke: e.target.value}})
                            }
                          />

                          <Text size={1} muted as="label">
                            {stroke}
                          </Text>
                        </Flex>
                      ))}
                    </Flex>
                  </Stack>

                  <Stack space={2}>
                    <Text muted size={1} weight="semibold">
                      Edge
                    </Text>

                    <Flex align="center" gap={3}>
                      {EDGES.map((edge) => (
                        <Flex align="center" key={edge} gap={1}>
                          <Radio
                            size={1}
                            checked={c?.edge === edge}
                            name={`${c.id}-edge`}
                            value={edge}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                              handleUpdate({target: c.id, update: {edge: e.target.value}})
                            }
                          />

                          <Text size={1} muted as="label">
                            {edge}
                          </Text>
                        </Flex>
                      ))}
                    </Flex>
                  </Stack>
                </Stack>
              </Stack>
            </MotionCard>
          </Connect>
        ))}
      </Grid>
    </Container>
  )
}
