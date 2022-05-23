import {ConnectElement} from '../../elements'

interface PathifyProps {
  paths: {x: string | number; y: string | number}[]
  edge?: Pick<ConnectElement, 'edge'> | string
}

export const pathify = (props: PathifyProps) => {
  const {paths, edge} = props

  const path = `M ${paths
    .map((p, index) => {
      if (index === 1 && edge === 'step') return `${p.x} ${p.y}`
      if (index === 1 && edge === 'bezier') return `C ${p.x} ${p.y}`

      return `${p.x} ${p.y}`
    })
    .join(' ')}`

  return path
}
