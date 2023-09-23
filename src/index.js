import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Canvas } from "@react-three/fiber";
import AppTwo from "./AppTwo";
import * as THREE from "three";
import { Physics } from "@react-three/cannon";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Canvas
      style={{ background: "#ac9982" }}
      onCreated={({ gl }) => {
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.VSMShadowMap;
      }}
      camera={{ position: [0, 0, 300] }}
    >
      <Physics>
        <AppTwo />
      </Physics>
    </Canvas>
  </>
);
