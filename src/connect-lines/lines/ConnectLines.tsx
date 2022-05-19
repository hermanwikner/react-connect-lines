import { useConnectElements } from "../elements";
import styled from "styled-components";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const Svg = styled.svg`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  pointer-events: none;
  width: 100%;
  height: 100%;
`;

const DEFAULT_COLOR = "magenta";

export function ConnectLines() {
  const [pointsData, setPointsData] = useState<any>([]);
  const { elements } = useConnectElements();

  const raf = useRef<any>();

  const colors = useMemo(
    () => [...new Set([...elements.map((e) => e.color), DEFAULT_COLOR])],
    [elements]
  );

  const handleCalcLines = useCallback(() => {
    if (raf.current) {
      window.cancelAnimationFrame(raf.current);
    }

    raf.current = window.requestAnimationFrame(() => {
      const connectData = elements
        .filter((e) => e.connectWith)
        .map((el) => {
          const { connectWith, element, color } = el;

          const connectEls = elements
            .filter((c) => connectWith?.includes(c.id))
            .map((a) => a.element);

          if (connectEls.length === 0) return;

          const boundingRects = connectEls.map((x) =>
            x?.getBoundingClientRect()
          );

          return {
            from: element?.getBoundingClientRect(),
            to: boundingRects,
            color: color,
          };
        })
        .filter(Boolean);

      const points = connectData
        .map((data) => {
          const { from, to: toArray, color } = data || {};

          if (!from || !toArray) return;

          const fromRight = `${from?.right} ${from?.top + from.height / 2}`;
          const fromLeft = `${from?.left} ${from?.top + from.height / 2}`;
          const fromBottom = `${from?.left + from.width / 2} ${from?.bottom}`;
          const fromTop = `${from?.left + from.width / 2} ${from?.top}`;

          const toL = toArray.map((to) => {
            if (!to) return;

            const { right, left, bottom, top, width, height } = to;

            const toRight = `${right} ${top + height / 2}`;
            const toLeft = `${left} ${top + height / 2}`;
            const toBottom = `${left + width / 2} ${bottom}`;
            const toTop = `${left + width / 2} ${top}`;

            const measure = () => {
              if (from.left > to.right) {
                return `${fromLeft} ${toRight}`;
              }

              if (from.right < to.left) {
                return `${fromRight} ${toLeft}`;
              }

              if (from.bottom < to.top) {
                return `${fromBottom} ${toTop}`;
              }

              if (from.top > to.bottom) {
                return `${fromTop} ${toBottom}`;
              }

              return `${fromTop} ${toBottom}`;
            };

            const d = measure();

            if (!d) return;

            return {
              d: `M ${d}`,
              color: color || DEFAULT_COLOR,
            };
          });

          return toL;
        })
        .filter(Boolean);

      setPointsData(points.flat());
    });
  }, [raf.current]);

  useEffect(() => {
    handleCalcLines();
  }, [elements]);

  useEffect(() => {
    window.addEventListener("resize", handleCalcLines, { passive: true });
    window.addEventListener("scroll", handleCalcLines, { passive: true });

    return () => {
      window.removeEventListener("resize", handleCalcLines);
      window.removeEventListener("scroll", handleCalcLines);
    };
  }, [handleCalcLines]);

  if (!pointsData) return null;

  return (
    <Svg>
      {colors.map((c) => (
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

      {pointsData.map((p: { d: string; color: string }, index: number) => (
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
  );
}
