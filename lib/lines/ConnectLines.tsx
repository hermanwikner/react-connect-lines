import {useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react'
import {ConnectElement, Edge, Stroke} from '../types'
import {getElement, getGroupedConnections, getPathData, pathify} from './utils'

const SVG_STYLE: React.CSSProperties = {
  position: 'fixed',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  pointerEvents: 'none',
  width: '100%',
  height: '100%',
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

interface ConnectLinesProps {
  elements: ConnectElement[]
}

export function ConnectLines(props: ConnectLinesProps) {
  const [pointsData, setPointsData] = useState<PointsData>(EMPTY_ARRAY)
  const [isInteracting, setIsInteracting] = useState<boolean>(false)
  const {elements} = props
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

  const handleStartInteracting = useCallback(() => {
    setIsInteracting(true)
  }, [])

  const handleStopInteracting = useCallback(() => {
    setIsInteracting(false)
  }, [])

  const handleUpdateLines = useCallback(() => {
    if (isInteracting) handleCalcLines()
  }, [handleCalcLines, isInteracting])

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

  const ro = useMemo(() => new ResizeObserver(handleCalcLines), [handleCalcLines])

  useEffect(() => {
    elements.forEach((el) => {
      const element = getElement(el)

      element?.addEventListener('mousedown', handleStartInteracting, {passive: true})
      element?.addEventListener('mouseup', handleStopInteracting, {passive: true})
      element?.addEventListener('mousemove', handleUpdateLines, {passive: true})
      element?.addEventListener('touchstart', handleStartInteracting, {passive: true})
      element?.addEventListener('touchend', handleStopInteracting, {passive: true})
      element?.addEventListener('touchmove', handleUpdateLines, {passive: true})

      if (element) {
        ro.observe(element)
      }
    })

    return () => {
      elements.forEach((el) => {
        const element = getElement(el)

        element?.removeEventListener('mousedown', handleStartInteracting)
        element?.removeEventListener('mouseup', handleStopInteracting)
        element?.removeEventListener('mousemove', handleUpdateLines)
        element?.removeEventListener('touchstart', handleStartInteracting)
        element?.removeEventListener('touchend', handleStopInteracting)
        element?.removeEventListener('touchmove', handleUpdateLines)

        if (element) {
          ro.disconnect()
          ro.unobserve(element)
        }
      })
    }
  }, [
    elements,
    handleCalcLines,
    handleStartInteracting,
    handleStopInteracting,
    handleUpdateLines,
    ro,
  ])

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
            {/* <circle cx="5" cy="5" r="5" fill={c} /> */}
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
