import {createContext} from 'react'
import {ConnectElementsContextValue} from '../types'

export const ConnectElementsContext = createContext<ConnectElementsContextValue>({
  elements: [],
  dispatch: () => null,
})
