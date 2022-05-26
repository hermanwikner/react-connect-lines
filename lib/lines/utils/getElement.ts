import {ConnectElement} from '../../elements'

export function getElement(el: ConnectElement) {
  if (!el.element) {
    return document.querySelector(`#${el.id}`)
  }

  return el.element
}
