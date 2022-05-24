interface GetPathDataProps {
  from?: DOMRectReadOnly
  to?: DOMRectReadOnly
}

const OFFSET = 9

function getPosition(props: {from: DOMRect; to: DOMRect}) {
  const {from, to} = props

  const middleFrom = from.left + from.width / 2
  const middleTo = to.left + to.width / 2

  const yDiff = Math.round(Math.abs(middleFrom - middleTo)) - 30

  const bottomToTop = from.bottom < to.top && yDiff < to.width
  const topToBottom = from.top > to.bottom && yDiff < to.width
  const rightToLeft = from.left > to.right
  const leftToRight = from.right < to.left

  if (bottomToTop) return 'bottom-to-top'
  if (topToBottom) return 'top-to-bottom'
  if (rightToLeft) return 'right-to-left'
  if (leftToRight) return 'left-to-right'
}

export function getPathData(props: GetPathDataProps) {
  const {from, to} = props

  if (!from || !to) return

  const position = getPosition({from, to})

  switch (position) {
    case 'bottom-to-top': {
      return [
        {
          x: from?.left + from.width / 2,
          y: from?.bottom,
        },
        {
          x: from?.left + from.width / 2,
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
      ]
    }

    case 'top-to-bottom': {
      return [
        {
          x: from?.left + from.width / 2,
          y: from?.top,
        },
        {
          x: from?.left + from.width / 2,
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
      ]
    }

    case 'right-to-left': {
      return [
        {
          x: from?.left,
          y: from?.bottom - from.height / 2,
        },
        {
          x: (to.right + from.left) / 2,
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
      ]
    }

    case 'left-to-right': {
      return [
        {
          x: from?.right,
          y: from?.bottom - from.height / 2,
        },
        {
          x: (to.left + from.right) / 2,
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
      ]
    }

    default:
      return []
  }
}
