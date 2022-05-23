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
  const {children, id, edge = 'bezier', stroke = 'solid', color = 'magenta'} = props
  const {dispatch} = useConnectElements()
  const [el, setEl] = useState<HTMLElement | null>(null)
  const [pressed, setPressed] = useState<boolean>(false)
  const addedRef = useRef<boolean>(false)

  const handleAdd = useCallback(
    (node: HTMLElement) => {
      if (addedRef.current === false) {
        setEl(node)

        dispatch({
          type: 'add',
          ...props,
          edge,
          stroke,
          element: node,
          color,
        })

        addedRef.current = true
      }
    },
    [dispatch, edge, props, stroke, color]
  )

  const handleUpdate = useCallback(() => {
    dispatch({
      type: 'add',
      ...props,
      edge,
      stroke,
      element: el,
      color,
    })
  }, [dispatch, props, edge, stroke, el, color])

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
      ref: (node: HTMLElement) => {
        handleAdd(node)

        if (typeof children === 'function') childProps.ref(node)
      },

      // Drag support
      onMouseMove: () => {
        if (pressed) handleUpdate()
        if (typeof childProps.onMouseUp === 'function') childProps.onMouseUp()
      },
      onMouseDown: () => {
        setPressed(true)
        if (typeof childProps.onMouseDown === 'function') childProps.onMouseDown()
      },
      onMouseUp: () => {
        setPressed(false)
        if (typeof childProps.onMouseUp === 'function') childProps.onMouseUp()
      },
      onTouchMove: () => {
        if (pressed) handleUpdate()
        if (typeof childProps.onTouchMove === 'function') childProps.onTouchMove()
      },
      onTouchStart: () => {
        setPressed(true)
        if (typeof childProps.onTouchStart === 'function') childProps.onTouchStart()
      },
      onTouchEnd: () => {
        setPressed(false)
        if (typeof childProps.onTouchEnd === 'function') childProps.onTouchEnd()
      },
    })
  }, [handleAdd, children, handleUpdate, pressed])

  useEffect(() => {
    return () => {
      dispatch({
        type: 'remove',
        id,
      })
    }
  }, [dispatch, id])

  return clone
}
