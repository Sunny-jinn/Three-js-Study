import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { SoftShadows } from "@react-three/drei";
import { Suspense } from "react";

function App() {
  return (
    <Canvas shadows camera={{ position: [0, 30, 0], fov: 30 }}>
      <color attach="background" args={["#242424"]} />
      <SoftShadows size={42} />
      <Suspense>
        <Experience />
      </Suspense>
    </Canvas>
  );
}

export default App;
