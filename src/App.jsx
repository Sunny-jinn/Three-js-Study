import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import MyElement3D from "./MyElement3D";
import { Physics } from "@react-three/rapier";

const App = () => {
  return (
    <>
      <Canvas
        camera={{
          fov: 30,
          position: [10, 10, 10],
        }}
      >
        <color attach={"background"} args={["#ececec"]} />
        <Suspense>
          <Physics debug>
            <MyElement3D />
          </Physics>
        </Suspense>
      </Canvas>
    </>
  );
};

export default App;
