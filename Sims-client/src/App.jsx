import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { SocketManager } from "./components/SocketManager";
import { UI } from "./components/UI";
import { ScrollControls } from "@react-three/drei";

function App() {
  return (
    <>
      <SocketManager />
      <Canvas shadows camera={{ position: [8, 8, 8], fov: 30 }}>
        <color attach="background" args={["#ececec"]} />
        <ScrollControls pages={4}>
          <Experience />
        </ScrollControls>
      </Canvas>
      <UI />
    </>
  );
}

export default App;
