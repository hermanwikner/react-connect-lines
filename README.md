<img width="955" alt="Screenshot 2022-07-04 at 18 35 43" src="https://user-images.githubusercontent.com/15094168/177193245-df61cce5-c07e-443b-bd10-aa746ac19322.png">

## React connect lines

This library lets you draw lines between elements ([demo](https://react-connect-lines.vercel.app)).

### Installation

`yarn add react-connect-lines` or `npm i react-connect-lines`

### Usage

First, wrap your app with the `ConnectProvider`. Then, wrap the elements you want to connect with the `Connect` component.

The `Connect` component accepts two props:

1. `id` – unqiue identifier to use when connecting elements
2. `connectWith` – an array of objects which configures connections and their appearance. The available configurations are:
   - `id: string` – the element to connect with
   - `color?: string` – the color of the line (`#000000` is default)
   - `edge?: "bezier" | "step"` – the curve of the line (`bezier` is default)
   - `hasArrows?: boolean` – the triangles at the end of the line (`true` is default)
   - `stroke?: "dashed" | "solid"` – the look of the line (`solid` is default)

#### Example

```jsx
import {ConnectProvider, Connect} from 'react-connect-lines'

export function MyApp() {
  return (
    <ConnectProvider>
      <Connect
        id="element-1"
        connectWith={[
          {id: 'element-2', color: 'red', stroke: 'dashed'},
          {id: 'element-3', edge: 'step'},
        ]}
      >
        <MyElement1 />
      </Connect>

      <Connect id="element-2">
        <MyElement2 />
      </Connect>

      <Connect id="element-3">
        <MyElement3 />
      </Connect>
    </ConnectProvider>
  )
}
```

### Alternative usage

It is possible to skip the `ConnectProvider` and the `Connect` component - and only use the `ConnectLines` component.

#### With DOM id:s

```jsx
import {ConnectLines, ConnectElement} from 'react-connect-lines'

const ELEMENTS: ConnectElement[] = [
  {id: 'id-1', connectWith: [{id: 'id-2'}]},
  {id: 'id-2', connectWith: [{id: 'id-3'}]},
  {id: 'id-3', connectWith: [{id: 'id-1'}]},
]

export function MyApp() {
  return (
    <div>
      <MyElement id="id-1" />
      <MyElement id="id-2" />
      <MyElement id="id-3" />

      <ConnectLines elements={ELEMENTS} />
    </div>
  )
}
```

#### With elements

```jsx
import {ConnectLines, ConnectElement} from 'react-connect-lines'

export function MyApp() {
  const [el1, setEl1] = useState<HTMLElement | null>(null)
  const [el2, setEl2] = useState<HTMLElement | null>(null)
  const [el3, setEl3] = useState<HTMLElement | null>(null)

  const elements: ConnectElement[] = useMemo(
    () => [
      {id: 'id-1', element: el1, connectWith: [{id: 'id-2'}]},
      {id: 'id-2', element: el2, connectWith: [{id: 'id-3'}]},
      {id: 'id-3', element: el3, connectWith: [{id: 'id-1'}]},
    ],
    [el1, el2, el3]
  )

  return (
    <div>
      <MyElement ref={setEl1} />
      <MyElement ref={setEl2} />
      <MyElement ref={setEl3} />

      <ConnectLines elements={elements} />
    </div>
  )
}
```
