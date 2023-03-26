import React, { Suspense, useEffect, useState } from "react";
import "./App.css";

import {
  OrbitControls,
  Environment,
  PerspectiveCamera,
} from "@react-three/drei";
import { Track } from "./Track";
import { Ground } from "./Ground";
import { Car } from "./Car";

function App() {
  const [thirdPerson, setThirdPerson] = useState(false);
  const [cameraPosition, setCameraPosition] = useState([-6, 3.9, 6.21]);

  return (
    <Suspense fallback={null}>
      <Environment
        files={process.env.PUBLIC_URL + "/textures/envmap.hdr"}
        background={"both"}
      />

      <PerspectiveCamera makeDefault position={cameraPosition} fov={40} />
      {!thirdPerson && <OrbitControls target={[-2.64, -0.71, 0.03]} />}
      <Track />
      <Ground />
      <Car thirdPerson={thirdPerson} />
    </Suspense>
  );
}

export default App;
