import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ConnectElementsProvider } from "./connect-lines";
import { studioTheme, ThemeProvider } from "@sanity/ui";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={studioTheme}>
      <ConnectElementsProvider>
        <App />
      </ConnectElementsProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
