import {Card, Flex, Grid, Text} from '@sanity/ui'
import {motion} from 'framer-motion'
import React from 'react'
import {Connect, ConnectProvider, ConnectElement} from '../../pkg'

const DATA: ConnectElement[] = [
  {
    id: 'card-1',
    connectWith: [
      {
        id: 'card-2',
      },
    ],
  },
  {
    id: 'card-2',
    connectWith: [
      {
        id: 'card-3',
        color: 'lightseagreen',
        stroke: 'dashed',
      },
    ],
  },
  {
    id: 'card-3',
    connectWith: [
      {
        id: 'card-1',
        color: 'salmon',
      },
    ],
  },
  {
    id: 'card-4',
    connectWith: [
      {
        id: 'card-2',
      },
    ],
  },
  {
    id: 'card-5',
    connectWith: [
      {
        id: 'card-4',
        color: 'cadetblue',
        edge: 'step',
      },
      {
        id: 'card-3',
        color: 'deepskyblue',
      },
    ],
  },
  {
    id: 'card-6',
    connectWith: [
      {
        id: 'card-4',
        color: 'darkorange',
        edge: 'step',
      },
    ],
  },
]

const MotionCard = motion(Card)

export function WithContext() {
  return (
    <ConnectProvider>
      <Grid columns={2} gap={9}>
        {DATA.map((d) => (
          <Connect key={d.id} {...d}>
            <MotionCard padding={4} border radius={2} tone="transparent" drag dragMomentum={false}>
              <Flex align="center" height="fill">
                <Text align="center" muted size={1} weight="semibold">
                  {d.id}
                </Text>
              </Flex>
            </MotionCard>
          </Connect>
        ))}
      </Grid>
    </ConnectProvider>
  )
}
