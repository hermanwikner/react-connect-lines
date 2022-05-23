import React, {
  cloneElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {ConnectElement, useConnectElements} from './elements'

interface ConnectProps extends Omit<ConnectElement, 'element'> {
  children: React.ReactElement
}

export function Connect(props: ConnectProps) {
  const {children, id} = props
  const {addElement, removeElement} = useConnectElements()
  const [el, setEl] = useState<HTMLElement | null>(null)
  const [pressed, setPressed] = useState<boolean>(false)
  const addedRef = useRef<boolean>(false)

  const add = useCallback(
    (node: HTMLElement) => {
      if (addedRef.current === false) {
        setEl(node)

        addElement({
          ...props,
          edge: props?.edge || 'bezier',
          stroke: props?.stroke || 'solid',
          element: node,
        })

        addedRef.current = true
      }
    },
    [addElement, props]
  )

  const handleUpdate = useCallback(() => {
    addElement({
      ...props,
      edge: props?.edge || 'bezier',
      stroke: props?.stroke || 'solid',
      element: el,
    })
  }, [addElement, el, props])

  useLayoutEffect(() => {
    if (!el) return
    const ro = new ResizeObserver(handleUpdate)

    ro.observe(el)

    return () => {
      ro.disconnect()
      ro.unobserve(el)
    }
  }, [el, handleUpdate])

  const clone = useMemo(() => {
    const {props: childProps} = children

    return cloneElement(children, {
      ...childProps,
      ref: (node: React.RefObject<HTMLElement>) => {
        add(node as any)

        if (typeof children === 'function') {
          childProps.ref(node)
        }
      },

      // Drag support
      onMouseMove: () => {
        if (pressed) {
          handleUpdate()
        }

        if (typeof childProps.onMouseUp === 'function') {
          childProps.onMouseUp()
        }
      },
      onMouseDown: () => {
        setPressed(true)

        if (typeof childProps.onMouseDown === 'function') {
          childProps.onMouseDown()
        }
      },
      onMouseUp: () => {
        setPressed(false)

        if (typeof childProps.onMouseUp === 'function') {
          childProps.onMouseUp()
        }
      },
      onTouchMove: () => {
        if (pressed) {
          handleUpdate()
        }

        if (typeof childProps.onTouchMove === 'function') {
          childProps.onTouchMove()
        }
      },
      onTouchStart: () => {
        setPressed(true)

        if (typeof childProps.onTouchStart === 'function') {
          childProps.onTouchStart()
        }
      },
      onTouchEnd: () => {
        setPressed(false)

        if (typeof childProps.onTouchEnd === 'function') {
          childProps.onTouchEnd()
        }
      },
    })
  }, [add, children, handleUpdate, pressed])

  useEffect(() => {
    return () => {
      removeElement(id)
    }
  }, [id, removeElement])

  return clone
}
