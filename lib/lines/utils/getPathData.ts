interface GetPathDataProps {
  from?: {
    rect: DOMRect | undefined
  }
  to?: {
    rect: DOMRect | undefined
  }
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
  const fromRect = from?.rect
  const toRect = to?.rect

  if (!fromRect || !toRect) return

  const position = getPosition({from: fromRect, to: toRect})

  switch (position) {
    case 'bottom-to-top': {
      return [
        {
          x: fromRect?.left + fromRect.width / 2,
          y: fromRect?.bottom,
        },
        {
          x: fromRect?.left + fromRect.width / 2,
          y: fromRect.bottom - (fromRect.bottom - toRect.top) / 2,
        },
        {
          x: toRect?.left + toRect.width / 2,
          y: fromRect.bottom - (fromRect.bottom - toRect.top) / 2,
        },
        {
          x: toRect?.left + toRect.width / 2,
          y: toRect.top - LINE_OFFSET,
        },
      ]
    }

    case 'top-to-bottom': {
      return [
        {
          x: fromRect?.left + fromRect.width / 2,
          y: fromRect?.top,
        },
        {
          x: fromRect?.left + fromRect.width / 2,
          y: fromRect.top - (fromRect.top - toRect.bottom) / 2,
        },
        {
          x: toRect?.left + toRect.width / 2,
          y: fromRect.top - (fromRect.top - toRect.bottom) / 2,
        },
        {
          x: toRect?.left + toRect.width / 2,
          y: toRect.bottom + LINE_OFFSET,
        },
      ]
    }

    case 'right-to-left': {
      return [
        {
          x: fromRect?.left,
          y: fromRect?.bottom - fromRect.height / 2,
        },
        {
          x: (toRect.right + fromRect.left) / 2,
          y: fromRect?.bottom - fromRect.height / 2,
        },
        {
          x: (toRect.right + fromRect.left) / 2,
          y: toRect.top + toRect.height / 2,
        },
        {
          x: toRect.right + LINE_OFFSET,
          y: toRect.top + toRect.height / 2,
        },
      ]
    }

    case 'left-to-right': {
      return [
        {
          x: fromRect?.right,
          y: fromRect?.bottom - fromRect.height / 2,
        },
        {
          x: (toRect.left + fromRect.right) / 2,
          y: fromRect?.bottom - fromRect.height / 2,
        },
        {
          x: (toRect.left + fromRect.right) / 2,
          y: toRect.top + toRect.height / 2,
        },
        {
          x: toRect.left - LINE_OFFSET,
          y: toRect.top + toRect.height / 2,
        },
      ]
    }

    default:
      return []
  }
}
