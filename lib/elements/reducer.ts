import {ConnectElement, ConnectElementsContextValue, ConnectElementsReducerPayload} from '../types'

export function connectElementsReducer(
  state: ConnectElementsContextValue,
  payload: ConnectElementsReducerPayload
): ConnectElementsContextValue {
  const {type, id, element, connectWith} = payload

  const exists = state?.elements?.some((l) => l.id === id)
  const connectWithArr = connectWith || []
  const node: ConnectElement & {element?: HTMLElement | null} = {
    id,
    element,
    connectWith: connectWithArr,
  }

  if (type === 'add' && element) {
    if (!exists) {
      return {
        ...state,
        elements: [...state.elements, node],
      }
    }

    if (exists) {
      const next = [...state.elements].map((el) => {
        if (el.id === id) {
          return node
        }

        return el
      })

      return {...state, elements: next}
    }

    return state
  }

  if (type === 'remove') {
    return {
      ...state,
      elements: state.elements
        .map((x) => {
          return {
            ...x,
            connectWith: x.connectWith?.filter((y) => y.id !== id),
          }
        })
        .filter((el) => el.id !== id),
    }
  }

  return state
}
