import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GamepadsProvider } from "react-gamepads";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GamepadsProvider>
      <App />
    </GamepadsProvider>
  </React.StrictMode>
);
