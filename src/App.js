import React, { Suspense, useEffect, useRef, useState } from "react";
import "./App.css";

import {
  OrbitControls,
  Environment,
  PerspectiveCamera,
} from "@react-three/drei";
import { Track } from "./Track";
import { Ground } from "./Ground";
import { Car } from "./Car";
import Person from "./Person";
import { useFrame } from "@react-three/fiber";

function App() {
  // const [thirdPerson, setThirdPerson] = useState(false);
  // const [cameraPosition, setCameraPosition] = useState([-6, 3.9, 6.21]);

  // useEffect(() => {
  //   function keydownHandler(e) {
  //     if (e.key == "k") {
  //       if (thirdPerson)
  //         setCameraPosition([-6, 3.9, 6.21 + Math.random() * 0.01]);
  //       setThirdPerson(!thirdPerson);
  //     }
  //   }

  //   window.addEventListener("keydown", keydownHandler);
  //   return () => window.removeEventListener("keydown", keydownHandler);
  // }, [thirdPerson]);

  const box = useRef(null);
  useFrame(
    () =>
      box.current &&
      void ((box.current.rotation.x += 0.01), (box.current.rotation.y += 0.01))
  );

  return (
    <Suspense fallback={null}>
      <mesh ref={box}>
        <boxGeometry attach="geometry" args={[1, 1, 1]} />
        <meshLambertMaterial
          attach={"material"}
          transparent={true}
          opacity={1}
          color={0x000000}
        />
        <OrbitControls />
        {/* <PerspectiveCamera makeDefault position={cameraPosition} fov={40} /> */}
      </mesh>
      {/* <Environment
        files={process.env.PUBLIC_URL + "/textures/envmap.hdr"}
        background={"both"}
      />

      <PerspectiveCamera makeDefault position={cameraPosition} fov={40} />
      {!thirdPerson && <OrbitControls target={[-2.64, -0.71, 0.03]} />}
      <Track />
      <Ground />
      <Car thirdPerson={thirdPerson} /> */}
    </Suspense>
  );
}

export default App;
