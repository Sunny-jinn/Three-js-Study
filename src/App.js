import React, { Suspense, useRef } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import Box from "./Box";
import styled from "styled-components";

import {
  useGLTF,
  OrbitControls,
  Environment,
  PerspectiveCamera,
} from "@react-three/drei";
import AnimatedSphere from "./AnimatedSphere";
import { Track } from "./Track";
import { Ground } from "./Ground";
import { Car } from "./Car";

const Wrapper = styled.div`
  position: relative;

  canvas {
    height: 500px;
  }
`;
function Model(props) {
  const { nodes, materials } = useGLTF("../scene.gltf");
  return (
    <group {...props} dispose={null} scale={0.5}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          geometry={nodes.Object_3.geometry}
          material={materials.material_7}
        />
        <mesh
          geometry={nodes.Object_5.geometry}
          material={materials.material_6}
        />
        <mesh
          geometry={nodes.Object_7.geometry}
          material={materials.material_5}
        />
        <mesh
          geometry={nodes.Object_9.geometry}
          material={materials.material_4}
        />
        <mesh
          geometry={nodes.Object_11.geometry}
          material={materials.material_3}
        />
        <mesh
          geometry={nodes.Object_13.geometry}
          material={materials.material_2}
        />
        <mesh
          geometry={nodes.Object_15.geometry}
          material={materials.material_1}
        />
        <mesh
          geometry={nodes.Object_17.geometry}
          material={materials.material_0}
        />
      </group>
    </group>
  );
}

function App() {
  return (
    // <Wrapper className="App">
    //   <Canvas className="canvas">
    //     <OrbitControls enableZoom={false} />
    //     <ambientLight intensity={0.5} />
    //     <directionalLight position={[-2, 5, 2]} intensity={1} />
    //     <Suspense fallback={null}>
    //       <Box />
    //     </Suspense>
    //   </Canvas>
    //   <Canvas className="canvas">
    //     <OrbitControls enableZoom={false} />
    //     <ambientLight intensity={0.5} />
    //     <directionalLight position={[-2, 5, 2]} intensity={1} />
    //     <Suspense fallback={null}>
    //       <AnimatedSphere />
    //     </Suspense>
    //   </Canvas>
    //   <Canvas className="canvas">
    //     <OrbitControls enableZoom={false} />
    //     <ambientLight intensity={0.5} />
    //     <directionalLight position={[-2, 5, 2]} intensity={1} />
    //     <Suspense fallback={null}>
    //       <Model />
    //     </Suspense>
    //   </Canvas>
    // </Wrapper>
    <Suspense fallback={null}>
      <Environment
        files={process.env.PUBLIC_URL + "/textures/envmap.hdr"}
        background={"both"}
      />

      <PerspectiveCamera makeDefault position={[-6, 3.9, 6.21]} fov={40} />
      <OrbitControls target={[-2.64, -0.71, 0.03]} />
      <Car />
      <Track />
      <Ground />
    </Suspense>
  );
}

export default App;
