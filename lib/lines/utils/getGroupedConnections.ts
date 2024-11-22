import {ConnectElement} from '../../types'
import {getElement} from './getElement'

const EMPTY_ARRAY: [] = []

interface GetGroupedConnectionsProps {
  elements: ConnectElement[]
}

export function getGroupedConnections(props: GetGroupedConnectionsProps) {
  const {elements} = props

  // const connections = elements?.map((e) => e.connectWith?.map((x) => x?.id)).flat()

  const grouped = elements
    .filter((e) => (e?.connectWith || EMPTY_ARRAY).length > 0)
    .map((el) => {
      const {connectWith} = el

      // const connectionsLen = connections.filter((y) => y === el.id)?.length || 0

      const connectEls = elements
        .filter((c) => connectWith?.map((a) => a.id).includes(c.id))
        .map((x) => {
          return {
            rect: getElement(x)?.getBoundingClientRect(),
            color: connectWith?.find((a) => a.id === x.id)?.color || '#000000',
            edge: connectWith?.find((a) => a.id === x.id)?.edge || 'bezier',
            stroke: connectWith?.find((a) => a.id === x.id)?.stroke || 'solid',
            hasArrows: Boolean(connectWith?.find((a) => a.id === x.id)?.hasArrows),
            // connectionsLen: connectionsLen,
          }
        })

      if (connectEls.length === 0) return

      return {
        from: {
          rect: getElement(el)?.getBoundingClientRect(),
        },
        to: connectEls,
      }
    })
    .filter(Boolean)

  return grouped
}
