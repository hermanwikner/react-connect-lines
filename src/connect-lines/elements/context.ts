import {createContext} from 'react'

export interface ConnectElement {
  color?: string
  connectWith?: string[]
  element: HTMLElement | null | undefined
  id: string
  stroke?: 'solid' | 'dashed' | undefined
  edge?: 'bezier' | 'step' | undefined
}

export type ConnectElementsContextValue = {
  elements: ConnectElement[]
  addElement: (element: ConnectElement) => void
  removeElement: (id: string) => void
}

export const ConnectElementsContext = createContext<ConnectElementsContextValue>({
  elements: [],
  addElement: () => null,
  removeElement: () => null,
})
