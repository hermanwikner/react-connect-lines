import React from 'react'
import {ConnectElementsProvider, useConnectElements} from './elements'
import {ConnectLines} from './lines'

interface ConnectProviderProps {
  children: React.ReactNode
}

function ConnectProviderInner() {
  const {elements} = useConnectElements()

  return <ConnectLines elements={elements} />
}

export function ConnectProvider(props: ConnectProviderProps) {
  const {children} = props

  return (
    <ConnectElementsProvider>
      {children}
      <ConnectProviderInner />
    </ConnectElementsProvider>
  )
}
