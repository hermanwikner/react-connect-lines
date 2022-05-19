import { useCallback, useMemo, useReducer } from "react";
import { ConnectElement, ConnectElementsContext } from "./context";
import { connectElementsReducer } from "./reducer";

interface ConnectElementsProviderProps {
  children: any;
}

export function ConnectElementsProvider(props: ConnectElementsProviderProps) {
  const { children } = props;
  const [state, dispatch] = useReducer(connectElementsReducer, {
    elements: [],
    addElement: () => null,
    removeElement: () => null,
  });

  const handleAdd = useCallback((props: ConnectElement) => {
    dispatch({
      type: "add",
      element: props.element,
      id: props.id,
      connectWith: props.connectWith,
      color: props.color,
    });
  }, []);

  const handleRemove = useCallback((id: string) => {
    dispatch({
      type: "remove",
      id: id,
    });
  }, []);

  const ctxVal = useMemo(
    () => ({
      elements: state.elements,
      addElement: handleAdd,
      removeElement: handleRemove,
    }),
    [state.elements]
  );

  return (
    <ConnectElementsContext.Provider value={ctxVal}>
      {children}
    </ConnectElementsContext.Provider>
  );
}
