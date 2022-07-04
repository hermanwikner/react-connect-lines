import React from "react";
type Edge = 'bezier' | 'step' | undefined;
type Stroke = 'solid' | 'dashed' | undefined;
interface ConnectWithProps {
    color?: string;
    edge?: Edge;
    stroke?: Stroke;
    id: string;
}
export interface ConnectElement {
    connectWith?: ConnectWithProps[];
    id: string;
}
interface ConnectProps extends Omit<ConnectElement, 'element'> {
    children: React.ReactElement;
}
export function Connect(props: ConnectProps): React.ReactElement<any, string | React.JSXElementConstructor<any>>;
interface ConnectLinesProps {
    elements: ConnectElement[];
}
export function ConnectLines(props: ConnectLinesProps): JSX.Element;
interface ConnectProviderProps {
    children: React.ReactNode;
}
export function ConnectProvider(props: ConnectProviderProps): JSX.Element;

//# sourceMappingURL=index.d.ts.map
