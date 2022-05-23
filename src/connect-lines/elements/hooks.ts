import {useContext} from 'react'
import {ConnectElementsContext} from './context'

export function useConnectElements() {
  const ctxVal = useContext(ConnectElementsContext)

  if (!ctxVal) {
    throw new Error('Missing context value')
  }

  return useContext(ConnectElementsContext)
}
