import {createContext} from 'react'

export interface ConnectElement {
  color?: string
  connectWith?: string[]
  edge?: 'bezier' | 'step' | undefined
  element?: HTMLElement | null
  id: string
  stroke?: 'solid' | 'dashed' | undefined
}

export type ConnectElementsReducerPayload = ConnectElement & {type: 'add' | 'remove'}

export type ConnectElementsDispatch = React.Dispatch<ConnectElementsReducerPayload>

export type ConnectElementsContextValue = {
  elements: ConnectElement[]
  dispatch: ConnectElementsDispatch
}

export const ConnectElementsContext = createContext<ConnectElementsContextValue>({
  elements: [],
  dispatch: () => null,
})
