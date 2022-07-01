interface GetPathDataProps {
  from?: DOMRectReadOnly
  to?: DOMRectReadOnly
}

const LINE_OFFSET = 9
const POS_OFFSET = 40

function getPosition(props: {from: DOMRect; to: DOMRect}) {
  const {from, to} = props

  const allowYConnect =
    from.left - POS_OFFSET < to.right && from.right + to.width > to.right - POS_OFFSET

  const bottomToTop = from.bottom < to.top && allowYConnect
  const topToBottom = from.top > to.bottom && allowYConnect
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
          y: to.top - LINE_OFFSET,
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
          y: to.bottom + LINE_OFFSET,
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
          x: to.right + LINE_OFFSET,
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
          x: to.left - LINE_OFFSET,
          y: to.top + to.height / 2,
        },
      ]
    }

    default:
      return []
  }
}
