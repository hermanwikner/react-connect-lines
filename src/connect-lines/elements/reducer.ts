import {ConnectElement, ConnectElementsContextValue} from './context'

type ActionTypes = 'add' | 'remove'

export function connectElementsReducer(
  state: ConnectElementsContextValue,
  payload: Partial<ConnectElement> & {type: ActionTypes}
): ConnectElementsContextValue {
  const {type, id, element, connectWith, color} = payload

  const exists = state?.elements?.some((l) => l.id === id)

  if (type === 'add') {
    if (!element || !id) return state

    // If the element exists in the state – update that element
    if (exists) {
      const update = state.elements.map((el) => {
        if (el.id === id) {
          return {id, element, color, connectWith: connectWith || []}
        }

        return el
      })

      return {...state, elements: update}
    }

    return {
      ...state,
      elements: [...state.elements, {id, element, color, connectWith: connectWith || []}],
    }
  }

  if (type === 'remove') {
    return {...state, elements: state.elements.filter((el) => el.id !== id)}
  }

  return state
}
