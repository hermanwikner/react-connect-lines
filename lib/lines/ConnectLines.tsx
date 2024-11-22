import {useCallback, useEffect, useMemo, useRef, useState} from 'react'
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

const DEFAULT_COLOR = '#000000'
const EMPTY_ARRAY: [] = []

type PointsData = (
  | {
      rect: DOMRect | undefined
      color: string | undefined
      edge: Edge
      stroke: Stroke
      d: string
      hasArrows: boolean
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

  /**
   * Create array of all colors configured.
   * These colors is used to render the svg markers (e.g arrows).
   */
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
      /**
       * The `getGroupedConnections` function returns:
       *
       *  {
       *    from: DOMRect,
       *    to: {
       *       rect: DOMRect,
       *       color: string,
       *       edge: string,
       *       stroke: string,
       *       hasArrows: boolean
       *    }[]
       *  }
       */
      const groupedConnections = getGroupedConnections({elements})

      const points = groupedConnections
        .map((data) => {
          const {from, to: toArray} = data || {}

          const pathDataArr = toArray?.map((to) => {
            /**
             * The `getPathData` function returns an array of objects with
             * x and y coordinates for the line.
             */
            const pathData = getPathData({from: from, to: to})

            if (!pathData) return

            /**
             * The `pathify` functions returns a svg-readable string of the coordinates
             */
            const path = pathify({paths: pathData, edge: to?.edge})

            /**
             * Dummy validation of the path
             */
            if (!/\d/.test(path)) return

            /**
             * Return the path (d) together with other relevant data such as color, stroke, edge.
             */
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

  /**
   * Handle drag and drop gestures and update the paths
   */
  const handleStartInteracting = useCallback(() => {
    setIsInteracting(true)
  }, [])

  const handleStopInteracting = useCallback(() => {
    setIsInteracting(false)
  }, [])

  const handleUpdateLines = useCallback(() => {
    if (isInteracting) handleCalcLines()
  }, [handleCalcLines, isInteracting])

  useEffect(() => {
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

  return useMemo(
    () => (
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
            <marker
              id={`line-${c}`}
              markerHeight="5"
              markerUnits="strokeWidth"
              markerWidth="10"
              orient="auto"
              refX="0"
              refY="5"
              viewBox="0 0 10 10"
            >
              <path d="M 0 5 L 10 5" stroke={c} strokeWidth="2" fill="none" />
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
              stroke={p?.color}
              strokeWidth="2"
              strokeDasharray={p?.stroke === 'dashed' ? 4 : 0}
              strokeLinejoin="round"
              markerEnd={`url(#${p?.hasArrows ? `triangle` : `line`}-${p?.color})`}
            />
          )
        })}
      </svg>
    ),
    [colors, pointsData]
  )
}
