import React, { cloneElement, useCallback, useEffect, useMemo } from "react";
import { ConnectElement, useConnectElements } from "./elements";

interface ConnectProps extends Omit<ConnectElement, "element"> {
  children: React.ReactElement;
}

export function Connect(props: ConnectProps) {
  const { children, connectWith, id, color } = props;
  const { addElement, removeElement } = useConnectElements();

  const add = useCallback(
    (node) => {
      addElement({
        id: id,
        element: node,
        connectWith: connectWith,
        color: color,
      });
    },
    [id, connectWith, color]
  );

  const clone = useMemo(
    () =>
      cloneElement(children, {
        ...children.props,
        ref: (node: any) => {
          const _ref = (children as any).ref;

          add(node);

          if (typeof _ref === "function") {
            _ref(node);
          }
        },
      }),
    [children, id, connectWith]
  );

  useEffect(() => {
    return () => {
      removeElement(id);
    };
  }, [id]);

  return clone;
}
