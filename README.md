<img width="955" alt="Screenshot 2022-07-04 at 18 35 43" src="https://user-images.githubusercontent.com/15094168/177193245-df61cce5-c07e-443b-bd10-aa746ac19322.png">


## React connect lines
This library lets you draw lines between elements ([demo](https://react-connect-lines.vercel.app)).

### Usage
First, wrap your app with the `ConnectProvider`. Then, wrap the elements you want to connect with the `Connect` component. 

The `Connect` component accepts two props:
1. `id` – unqiue identifier to use when connecting elements
2. `connectWith` – an array of objects which configures connections and their appearance. The available configurations are:
    - `id: string` – the element to connect with
    - `stroke?: "dashed" | "solid"` – the look of the line (`solid` is default)
    - `edge?: "bezier" | "edge"` – the curve of the line (`bezier` is default)
    - `color?: string` – the color of the line (`magenta` is default)


```js
import { ConnectProvider, Connect } from 'react-connect-lines'

export function MyApp() {
  return (
    <ConnectProvider>
      <Connect
        id="element-1"
        connectWith={[
          { id: "element-2", color: "red", stroke: "dashed" },
          { id: "element-3", edge: "step" },
          { id: "element-4" },
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
  );
}
```




