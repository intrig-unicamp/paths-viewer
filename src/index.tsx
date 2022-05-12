import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import theme from "./config/theme";
import "./index.css";

const MOUNT_NODE = document.getElementById("root") as HTMLElement;

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  MOUNT_NODE
);
