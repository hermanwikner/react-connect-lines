import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import styled from 'styled-components'
import {useConnectElements} from '../elements'
import {getPathData} from './getPathData'

const Svg = styled.svg`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  pointer-events: none;
  width: 100%;
  height: 100%;
`

const DEFAULT_COLOR = 'magenta'
const EMPTY_ARRAY: [] = []

export function ConnectLines() {
  const [pointsData, setPointsData] = useState<any>(EMPTY_ARRAY)
  const {elements} = useConnectElements()

  const raf = useRef<number>()

  const colors = useMemo(
    () => [...new Set([...elements.map((e) => e.color), DEFAULT_COLOR])].filter(Boolean),
    [elements]
  )

  const handleCalcLines = useCallback(() => {
    if (raf.current) {
      window.cancelAnimationFrame(raf.current)
    }

    raf.current = window.requestAnimationFrame(() => {
      const connectData = elements
        .filter((e) => (e.connectWith || EMPTY_ARRAY).length > 0)
        .map((el) => {
          const {connectWith, element, color} = el

          const connectEls = elements
            .filter((c) => connectWith?.includes(c.id))
            .map((a) => a.element)

          if (connectEls.length === 0) return

          const boundingRects = connectEls.map((x) => x?.getBoundingClientRect())

          return {
            from: element?.getBoundingClientRect(),
            to: boundingRects,
            color: color,
          }
        })
        .filter(Boolean)

      const points = connectData
        .map((data) => {
          const {from, to: toArray, color} = data || {}

          const pathDataArr = toArray?.map((to) => {
            if (!to || !from) return

            const pathData = getPathData({from, to})

            if (!pathData) return

            return {
              d: `M ${pathData.map((p) => `${p.x} ${p.y}`).join(' ')}`,
              color: color || DEFAULT_COLOR,
            }
          })

          return pathDataArr
        })
        .filter(Boolean)

      setPointsData(points.flat().filter((p) => Boolean(p)))
    })
  }, [elements])

  useEffect(() => {
    handleCalcLines()
  }, [elements, handleCalcLines])

  useEffect(() => {
    window.addEventListener('resize', handleCalcLines, {passive: true})
    window.addEventListener('scroll', handleCalcLines, {passive: true})

    return () => {
      window.removeEventListener('resize', handleCalcLines)
      window.removeEventListener('scroll', handleCalcLines)
    }
  }, [handleCalcLines])

  if (!pointsData) return null

  return (
    <Svg>
      {colors?.map((c) => (
        <defs key={c}>
          <marker
            id={`triangle-${c}`}
            viewBox="0 0 10 10"
            refX="1"
            refY="5"
            markerUnits="strokeWidth"
            markerWidth="5"
            markerHeight="5"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill={c} />
          </marker>
        </defs>
      ))}

      {pointsData?.map((p: {d: string; color: string}, index: number) => (
        <path
          key={index}
          data-index={index}
          d={p?.d}
          fill="none"
          strokeWidth="2"
          stroke={p?.color}
          markerEnd={`url(#triangle-${p.color})`}
        />
      ))}
    </Svg>
  )
}
