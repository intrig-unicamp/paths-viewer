import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import "./index.css";

const MOUNT_NODE = document.getElementById('root') as HTMLElement;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  MOUNT_NODE
);
