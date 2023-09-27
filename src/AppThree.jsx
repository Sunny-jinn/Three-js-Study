import { Canvas } from "@react-three/fiber";
import React from "react";
import MyElement3D from "./MyElement3D";

const AppThree = () => {
  return (
    <>
      <Canvas camera={{ near: 3.5, far: 6 }}>
        <MyElement3D />
      </Canvas>
    </>
  );
};

export default AppThree;
