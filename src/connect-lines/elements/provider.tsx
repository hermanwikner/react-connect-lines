import {useCallback, useMemo, useReducer} from 'react'
import {ConnectLines} from '../lines'
import {ConnectElement, ConnectElementsContext} from './context'
import {connectElementsReducer} from './reducer'

interface ConnectElementsProviderProps {
  children: React.ReactNode
}

export function ConnectElementsProvider(props: ConnectElementsProviderProps) {
  const {children} = props
  const [state, dispatch] = useReducer(connectElementsReducer, {
    elements: [],
    addElement: () => null,
    removeElement: () => null,
  })

  const handleAdd = useCallback((addProps: ConnectElement) => {
    dispatch({
      type: 'add',
      element: addProps.element,
      id: addProps.id,
      connectWith: addProps.connectWith,
      color: addProps.color,
    })
  }, [])

  const handleRemove = useCallback((id: string) => {
    dispatch({
      type: 'remove',
      id: id,
    })
  }, [])

  const ctxVal = useMemo(
    () => ({
      elements: state.elements,
      addElement: handleAdd,
      removeElement: handleRemove,
    }),
    [handleAdd, handleRemove, state.elements]
  )

  return (
    <ConnectElementsContext.Provider value={ctxVal}>
      {children}
      <ConnectLines />
    </ConnectElementsContext.Provider>
  )
}
