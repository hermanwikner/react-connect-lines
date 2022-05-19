import {useContext} from 'react'
import {ConnectElementsContext} from './context'

export function useConnectElements() {
  return useContext(ConnectElementsContext)
}
