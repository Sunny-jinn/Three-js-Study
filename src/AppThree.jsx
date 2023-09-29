import { Canvas } from "@react-three/fiber";
import React from "react";
import MyElement3D from "./MyElement3D";

const AppThree = () => {
  return (
    <>
      <Canvas
        camera={{
          near: 1,
          far: 100,
          position: [7, 7, 0],
        }}
      >
        <MyElement3D />
      </Canvas>
    </>
  );
};

export default AppThree;
