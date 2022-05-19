interface GetPathDataProps {
  from?: DOMRectReadOnly
  to?: DOMRectReadOnly
}

const OFFSET = 7

export function getPathData(props: GetPathDataProps) {
  const {from, to} = props

  if (!from || !to) return

  let tmp

  if (from.left > to.right) {
    tmp = [
      {
        x: from?.left,
        y: from?.top + from.height / 2,
      },
      {
        x: to.right + OFFSET,
        y: to.top + to.height / 2,
      },
    ]
  }

  if (from.right < to.left) {
    tmp = [
      {
        x: from?.right,
        y: from?.top + from.height / 2,
      },
      {
        x: to.left - OFFSET,
        y: to.top + to.height / 2,
      },
    ]
  }

  if (from.bottom < to.top) {
    tmp = [
      {
        x: from?.left + from.width / 2,
        y: from?.bottom,
      },
      {
        x: to.left + to.width / 2,
        y: to.top - OFFSET,
      },
    ]
  }

  if (from.top > to.bottom) {
    tmp = [
      {
        x: from?.left + from.width / 2,
        y: from?.top,
      },
      {
        x: to.left + to.width / 2,
        y: to.bottom + OFFSET,
      },
    ]
  }

  if (tmp) {
    return `M ${tmp.map((p) => `${p.x} ${p.y}`).join(' ')}`
  }

  return undefined
}
