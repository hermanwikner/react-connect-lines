import { createContext } from "react";

export interface ConnectElement {
  id: string;
  element: HTMLElement | null | undefined;
  connectWith?: string[];
  color?: string;
}

export type ConnectElementsContextValue = {
  elements: ConnectElement[];
  addElement: (element: ConnectElement) => void;
  removeElement: (id: string) => void;
};

export const ConnectElementsContext =
  createContext<ConnectElementsContextValue>({
    elements: [],
    addElement: () => null,
    removeElement: () => null,
  });
