interface GetPathDataProps {
  from?: DOMRectReadOnly
  to?: DOMRectReadOnly
}

const OFFSET = 7

const pathify = (paths: {x: string | number; y: string | number}[]) =>
  `M ${paths.map((p) => `${p.x} ${p.y}`).join(' ')}`

export function getPathData(props: GetPathDataProps) {
  const {from, to} = props

  if (!from || !to) return

  // right => left
  if (from.left > to.right) {
    const rightToLeft = [
      {
        x: from?.left,
        y: from?.bottom - from.height / 2,
      },
      {
        x: `C ${(to.right + from.left) / 2}`,
        y: from?.bottom - from.height / 2,
      },
      {
        x: (to.right + from.left) / 2,
        y: to.top + to.height / 2,
      },
      {
        x: to.right + OFFSET,
        y: to.top + to.height / 2,
      },
      // Duplicate to make the arrow point at the right direction
      {
        x: to.right + OFFSET,
        y: to.top + to.height / 2,
      },
    ]

    return pathify(rightToLeft)
  }

  // left => right
  if (from.right < to.left) {
    const leftToRight = [
      {
        x: from?.right,
        y: from?.bottom - from.height / 2,
      },
      {
        x: `C ${(to.left + from.right) / 2}`,
        y: from?.bottom - from.height / 2,
      },
      {
        x: (to.left + from.right) / 2,
        y: to.top + to.height / 2,
      },
      {
        x: to.left - OFFSET,
        y: to.top + to.height / 2,
      },
      // Duplicate to make the arrow point at the right direction
      {
        x: to.left - OFFSET,
        y: to.top + to.height / 2,
      },
    ]

    return pathify(leftToRight)
  }

  // bottom => top
  if (from.bottom < to.top) {
    const bottomToTop = [
      {
        x: from?.left + from.width / 2,
        y: from?.bottom,
      },
      {
        x: `C ${from?.left + from.width / 2}`,
        y: from.bottom - (from.bottom - to.top) / 2,
      },
      {
        x: to?.left + to.width / 2,
        y: from.bottom - (from.bottom - to.top) / 2,
      },
      {
        x: to?.left + to.width / 2,
        y: to.top - OFFSET,
      },
      // Duplicate to make the arrow point at the right direction
      {
        x: to?.left + to.width / 2,
        y: to.top - OFFSET,
      },
    ]

    return pathify(bottomToTop)
  }

  // top => bottom
  if (from.top > to.bottom) {
    const topToBottom = [
      {
        x: from?.left + from.width / 2,
        y: from?.top,
      },
      {
        x: `C ${from?.left + from.width / 2}`,
        y: from.top - (from.top - to.bottom) / 2,
      },
      {
        x: to?.left + to.width / 2,
        y: from.top - (from.top - to.bottom) / 2,
      },
      {
        x: to?.left + to.width / 2,
        y: to.bottom + OFFSET,
      },
      // Duplicate to make the arrow point at the right direction
      {
        x: to?.left + to.width / 2,
        y: to.bottom + OFFSET,
      },
    ]

    return pathify(topToBottom)
  }

  return undefined
}
