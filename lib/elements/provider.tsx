import {useMemo, useReducer} from 'react'
import {ConnectElementsContext} from './context'
import {connectElementsReducer} from './reducer'

interface ConnectElementsProviderProps {
  children: React.ReactNode
}

export function ConnectElementsProvider(props: ConnectElementsProviderProps) {
  const {children} = props
  const [state, dispatch] = useReducer(connectElementsReducer, {
    elements: [],
    dispatch: () => null,
  })

  const ctxVal = useMemo(
    () => ({
      elements: state.elements,
      dispatch: dispatch,
    }),
    [state]
  )

  return (
    <ConnectElementsContext.Provider value={ctxVal}>{children}</ConnectElementsContext.Provider>
  )
}
