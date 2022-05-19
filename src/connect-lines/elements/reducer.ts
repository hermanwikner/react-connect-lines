import {ConnectElement, ConnectElementsContextValue} from './context'

type ActionTypes = 'add' | 'remove'

export function connectElementsReducer(
  state: ConnectElementsContextValue,
  payload: Partial<ConnectElement> & {type: ActionTypes}
): ConnectElementsContextValue {
  const {type, id, element, connectWith, color} = payload

  const exists = state?.elements?.some((l) => l.id === id)

  if (type === 'add') {
    if (exists || !element || !id) return state

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
