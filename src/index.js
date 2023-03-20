import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Canvas>
    <Physics broadphase="SAP" gravity={[0, -2.6, 0]}>
      <App />
    </Physics>
  </Canvas>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
