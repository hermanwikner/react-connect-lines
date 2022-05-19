import { Button, Card, Container, Flex, Grid } from "@sanity/ui";
import { useCallback } from "react";
import { Connect, useConnectElements } from "./connect-lines";
import { ConnectLines } from "./connect-lines/lines";

export default function App() {
  const { addElement } = useConnectElements();

  const add = useCallback((node) => {
    addElement({
      color: "coral",
      id: "with-hook",
      connectWith: ["button"],
      element: node,
    });
  }, []);

  return (
    <Card height="fill">
      <Container padding={4} sizing="border">
        <Grid columns={[2, 2, 2, 3]} gap={[4, 5, 6, 7, 8]}>
          <Connect id="card" connectWith={["button"]} color="lightseagreen">
            <Card padding={5} tone="positive" border>
              My Card
            </Card>
          </Connect>

          <Flex align="center">
            <Connect id="button" connectWith={["card-2"]} color="coral">
              <Button text="My Button" />
            </Connect>
          </Flex>

          <Connect id="card-2" connectWith={["with-hook"]}>
            <Card padding={5} tone="primary" border>
              My Card
            </Card>
          </Connect>

          <Connect id="card-3" connectWith={["card"]}>
            <Card padding={5} tone="primary" border>
              My Card
            </Card>
          </Connect>

          <Connect id="parent-card" connectWith={["card-3"]}>
            <Card border padding={4} tone="caution">
              <Connect id="inner-card" connectWith={["card"]} color="firebrick">
                <Card padding={4} border tone="positive">
                  <Card padding={4} border tone="transparent" ref={add}>
                    Inner card with hook
                  </Card>
                </Card>
              </Connect>
            </Card>
          </Connect>
        </Grid>
      </Container>

      <ConnectLines />
    </Card>
  );
}
