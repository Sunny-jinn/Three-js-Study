import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Canvas } from "@react-three/fiber";
import AppTwo from "./AppTwo";
import * as THREE from "three";
import { Physics } from "@react-three/cannon";
import AppThree from "./AppThree";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.Fragment>
    <AppThree />
  </React.Fragment>
);
