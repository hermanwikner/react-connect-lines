import {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import styled from 'styled-components'
import {useConnectElements} from '../elements'
import {getGroupedConnections} from './getGroupedConnections'
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

type PointsData = {d: string; color: string} | undefined

export function ConnectLines() {
  const [pointsData, setPointsData] = useState<PointsData[]>(EMPTY_ARRAY)
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
      // Group connections
      const groupedConnections = getGroupedConnections({elements})

      const points = groupedConnections
        .map((data) => {
          const {from, to: toArray, color} = data || {}

          const pathDataArr = toArray?.map((to) => {
            const pathData = getPathData({from, to})

            if (!pathData) return

            return {
              d: pathData,
              color: color || DEFAULT_COLOR,
            }
          })

          return pathDataArr
        })
        .filter(Boolean)
        .flat()

      const data = points.filter((p) => Boolean(p))

      setPointsData(data)
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

  if ((pointsData || EMPTY_ARRAY).length === 0) return null

  return (
    <Svg>
      {colors?.map((c) => (
        <defs key={c}>
          <marker
            id={`triangle-${c}`}
            markerHeight="5"
            markerUnits="strokeWidth"
            markerWidth="5"
            orient="auto"
            refX="1"
            refY="5"
            viewBox="0 0 10 10"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill={c} />
          </marker>
        </defs>
      ))}

      {pointsData?.map((p) => {
        return (
          <path
            d={p?.d}
            fill="none"
            key={p?.d}
            markerEnd={`url(#triangle-${p?.color})`}
            stroke={p?.color}
            strokeWidth="2"
          />
        )
      })}
    </Svg>
  )
}
