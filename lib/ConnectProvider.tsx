import {ConnectElementsProvider} from './elements'
import {ConnectLines} from './lines'

interface ConnectProviderProps {
  children: React.ReactNode
}

export function ConnectProvider(props: ConnectProviderProps) {
  const {children} = props

  return (
    <ConnectElementsProvider>
      {children}
      <ConnectLines />
    </ConnectElementsProvider>
  )
}
