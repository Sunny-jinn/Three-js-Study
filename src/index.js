import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Canvas } from "@react-three/fiber";
import AppTwo from "./AppTwo";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <p className="text">Hello</p>
    <Canvas
      style={{ background: "#ac9982" }}
      camera={{ position: [0, 0, 300] }}
    >
      <AppTwo />
    </Canvas>
  </>
);
