import {useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react'
import {Edge, Stroke, useConnectElements} from '../elements'
import {getGroupedConnections, getPathData, pathify} from './utils'

const SVG_STYLE: React.CSSProperties = {
  position: 'fixed',
  top: '0',
  left: '0',
  right: '0',
  pointerEvents: 'none',
  width: '100%',
  height: '100%',
  zIndex: -1,
}

const DEFAULT_COLOR = 'magenta'
const EMPTY_ARRAY: [] = []

type PointsData = (
  | {
      rect: DOMRect | undefined
      color: string | undefined
      edge: Edge
      stroke: Stroke
      d: string
    }
  | undefined
)[]

export function ConnectLines() {
  const [pointsData, setPointsData] = useState<PointsData>(EMPTY_ARRAY)
  const {elements} = useConnectElements()
  const raf = useRef<number>()

  const colors = useMemo(
    () =>
      [
        ...new Set([
          ...elements.map((e) => e.connectWith?.map((c) => c?.color)).flat(),
          DEFAULT_COLOR,
        ]),
      ].filter(Boolean),
    [elements]
  )

  const handleCalcLines = useCallback(() => {
    if (raf.current) {
      window.cancelAnimationFrame(raf.current)
    }

    raf.current = window.requestAnimationFrame(() => {
      const groupedConnections = getGroupedConnections({elements})

      const points = groupedConnections
        .map((data) => {
          const {from, to: toArray} = data || {}

          const pathDataArr = toArray?.map((to) => {
            const pathData = getPathData({from, to: to.rect})

            if (!pathData) return

            const path = pathify({paths: pathData, edge: to?.edge})

            if (!/\d/.test(path)) return

            return {
              d: path,
              ...to,
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

  useLayoutEffect(() => {
    handleCalcLines()
  }, [handleCalcLines])

  useEffect(() => {
    window.addEventListener('resize', handleCalcLines, {passive: true})
    window.addEventListener('scroll', handleCalcLines, {passive: true})

    return () => {
      window.removeEventListener('resize', handleCalcLines)
      window.removeEventListener('scroll', handleCalcLines)
    }
  }, [handleCalcLines])

  return (
    <svg style={SVG_STYLE}>
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
            id="p1"
            d={p?.d}
            fill="none"
            key={p?.d}
            markerEnd={`url(#triangle-${p?.color})`}
            stroke={p?.color}
            strokeWidth="2"
            strokeDasharray={p?.stroke === 'dashed' ? 4 : 0}
            strokeLinejoin="round"
          />
        )
      })}
    </svg>
  )
}
