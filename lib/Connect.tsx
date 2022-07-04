import React, {cloneElement, useCallback, useEffect, useMemo, useRef} from 'react'
import {useConnectElements} from './elements'
import {ConnectElement} from './types'

interface ConnectProps extends Omit<ConnectElement, 'element'> {
  children: React.ReactElement
}

export function Connect(props: ConnectProps) {
  const {children, id, connectWith} = props
  const {dispatch} = useConnectElements()
  const nodeRef = useRef<HTMLElement>()

  const handleAdd = useCallback(() => {
    dispatch({
      type: 'add',
      id,
      connectWith,
      element: nodeRef.current,
    })
  }, [connectWith, dispatch, id])

  const clone = useMemo(() => {
    const {props: childProps} = children

    return cloneElement(children, {
      ...childProps,
      ref: (node: HTMLElement) => {
        nodeRef.current = node

        if (typeof children === 'function') childProps.ref(node)
      },
    })
  }, [children])

  useEffect(() => {
    handleAdd()
  }, [props, handleAdd, nodeRef])

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
