import {ConnectElement} from '../../elements'
import {getElement} from './getElement'

const EMPTY_ARRAY: [] = []

interface GetGroupedConnectionsProps {
  elements: ConnectElement[]
}

export function getGroupedConnections(props: GetGroupedConnectionsProps) {
  const {elements} = props

  const grouped = elements
    .filter((e) => (e?.connectWith || EMPTY_ARRAY).length > 0)
    .map((el) => {
      const {connectWith} = el

      const connectEls = elements
        .filter((c) => connectWith?.map((a) => a.id).includes(c.id))
        .map((x) => {
          return {
            rect: getElement(x)?.getBoundingClientRect(),
            color: connectWith?.find((a) => a.id === x.id)?.color || 'magenta',
            edge: connectWith?.find((a) => a.id === x.id)?.edge || 'bezier',
            stroke: connectWith?.find((a) => a.id === x.id)?.stroke || 'solid',
          }
        })

      if (connectEls.length === 0) return

      return {
        from: getElement(el)?.getBoundingClientRect(),
        to: connectEls,
      }
    })
    .filter(Boolean)

  return grouped
}
