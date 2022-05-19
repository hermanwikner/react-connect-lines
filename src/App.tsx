import { Card, Container, Grid } from "@sanity/ui";
import { useCallback } from "react";
import { Connect, useConnectElements } from "./connect-lines";
import { ConnectLines } from "./connect-lines/lines";

export default function App() {
  const { addElement } = useConnectElements();

  const add = useCallback((node) => {
    addElement({
      color: "coral",
      id: "with-hook",
      connectWith: ["2", "5"],
      element: node,
    });
  }, []);

  return (
    <Card height="fill">
      <Container padding={4} sizing="border">
        <Grid columns={[5, 4, 2, 3, 2]} gap={[4, 4, 7, 9]}>
          <Connect id="1" color="seagreen" connectWith={["3"]}>
            <Card padding={4} tone="primary" border marginTop={3}>
              1
            </Card>
          </Connect>

          <Connect id="2" color="mediumturquoise" connectWith={["1"]}>
            <Card padding={5} tone="positive" border>
              2
            </Card>
          </Connect>

          <Connect
            id="3"
            color="cornflowerblue"
            connectWith={["2", "4", "with-hook"]}
          >
            <Card padding={7} tone="positive" border>
              3
            </Card>
          </Connect>

          <Card padding={4} tone="primary" border ref={add}>
            With hook
          </Card>

          <Connect id="4" connectWith={[""]} color="dodgerblue">
            <Card padding={4} tone="positive" border marginTop={2}>
              4
            </Card>
          </Connect>

          <Connect id="5" connectWith={["4"]} color="hotpink">
            <Card padding={2} tone="caution" border>
              5
            </Card>
          </Connect>
        </Grid>
      </Container>

      <ConnectLines />
    </Card>
  );
}
