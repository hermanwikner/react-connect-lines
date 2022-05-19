import {ConnectElement} from '../elements'

const EMPTY_ARRAY: [] = []

interface GetGroupedConnectionsProps {
  elements: ConnectElement[]
}

export function getGroupedConnections(props: GetGroupedConnectionsProps) {
  const {elements} = props

  return elements
    .filter((e) => (e?.connectWith || EMPTY_ARRAY).length > 0)
    .map((el) => {
      const {connectWith, element, color} = el

      const connectEls = elements.filter((c) => connectWith?.includes(c.id)).map((a) => a.element)

      if (connectEls.length === 0) return

      const boundingRects = connectEls.map((x) => x?.getBoundingClientRect())

      return {
        from: element?.getBoundingClientRect(),
        to: boundingRects,
        color: color,
      }
    })
    .filter(Boolean)
}
