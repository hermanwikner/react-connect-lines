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
} from '@sanity/ui'
import {motion} from 'framer-motion'
import {useCallback, useState} from 'react'
import {Connect, ConnectElement} from '../connect-lines'

const MotionCard = motion(Card)

type ConnectionType = Omit<ConnectElement, 'element'> & Pick<CardProps, 'tone'>

const VARIANTS = ['solid', 'dashed']
const EDGES = ['bezier', 'step']

const CONNECTIONS: ConnectionType[] = [
  {
    id: 'card-1',
    connectWith: [],
    tone: 'primary',
    color: studioTheme.color.light.primary.card.selected.bg,
    stroke: 'solid',
    edge: 'bezier',
  },
  {
    id: 'card-2',
    connectWith: [],
    tone: 'positive',
    color: studioTheme.color.light.positive.card.selected.bg,
    stroke: 'solid',
    edge: 'bezier',
  },
  {
    id: 'card-3',
    connectWith: [],
    tone: 'critical',
    color: studioTheme.color.light.critical.card.selected.bg,
    stroke: 'solid',
    edge: 'bezier',
  },
  {
    id: 'card-4',
    connectWith: [],
    tone: 'caution',
    color: studioTheme.color.light.caution.card.selected.bg,
    stroke: 'dashed',
    edge: 'bezier',
  },
]

export function PropsTest() {
  const [connections, setConnections] = useState<ConnectionType[]>(CONNECTIONS)

  const handleAddElement = useCallback(() => {
    setConnections((prev) => [
      ...prev,
      {
        id: `card-${prev.length + 1}`,
        connectWith: [],
        tone: 'primary',
        color: studioTheme.color.light.primary.card.selected.bg,
        stroke: 'dashed',
        edge: 'bezier',
      },
    ])
  }, [])

  const handleConnect = useCallback(
    (changeProps) => {
      const {target, connectId, stroke} = changeProps

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
            stroke,
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
        <Button text="Add element" onClick={handleAddElement} />
      </Box>

      <Grid columns={2} gap={7}>
        {connections.map((c) => (
          <Connect
            id={c.id}
            connectWith={c.connectWith}
            color={c.color}
            stroke={c?.stroke}
            edge={c?.edge}
            key={c.id}
          >
            <MotionCard border padding={3} radius={2} drag dragMomentum={false} tone={c?.tone}>
              <Stack space={4}>
                <Text weight="semibold" size={3}>
                  {c.id}
                </Text>

                <Stack space={2}>
                  <Stack space={2}>
                    <Text muted size={1} weight="semibold">
                      Connect with
                    </Text>

                    <Flex align="center" gap={3}>
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
                          <Checkbox
                            size={1}
                            checked={c?.stroke === stroke}
                            name={stroke}
                            value={stroke}
                            onChange={(e) =>
                              handleUpdate({target: c.id, update: {stroke: e.currentTarget.value}})
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
                          <Checkbox
                            size={1}
                            checked={c?.edge === edge}
                            name={edge}
                            value={edge}
                            onChange={(e) =>
                              handleUpdate({target: c.id, update: {edge: e.currentTarget.value}})
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
