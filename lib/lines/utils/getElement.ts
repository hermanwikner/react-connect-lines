import {ConnectElement} from '../../types'

export function getElement(el: ConnectElement & {element?: HTMLElement}) {
  if (!el.element) {
    return document.querySelector(`#${el.id}`)
  }

  return el.element
}
