import React, {cloneElement, useCallback, useEffect, useMemo, useRef} from 'react'
import {useConnectElements} from './elements'
import {ConnectElement} from './types'

interface ConnectProps extends Omit<ConnectElement, 'element'> {
  children: React.ReactElement
}

export function Connect(props: ConnectProps) {
  const {children, id, connectWith} = props
  const {dispatch} = useConnectElements()
  const addedRef = useRef<boolean>(false)

  const handleAdd = useCallback(
    (node: HTMLElement) => {
      if (addedRef.current === false) {
        dispatch({
          type: 'add',
          id,
          connectWith,
          element: node,
        })

        addedRef.current = true
      }
    },
    [connectWith, dispatch, id]
  )

  const clone = useMemo(() => {
    const {props: childProps} = children

    return cloneElement(children, {
      ...childProps,
      ref: (node: HTMLElement) => {
        handleAdd(node)

        if (typeof children === 'function') childProps.ref(node)
      },
    })
  }, [handleAdd, children])

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
