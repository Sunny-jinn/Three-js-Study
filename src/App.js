import React, { Suspense, useEffect, useRef, useState } from "react";
import "./App.css";

import { OrbitControls, PerspectiveCamera, useHelper } from "@react-three/drei";
import { useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {
  Box3,
  DirectionalLight,
  DirectionalLightHelper,
  PointLightHelper,
} from "three";
import * as THREE from "three";

function App() {
  let mesh = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "/models/character.glb"
  ).scene;

  const box = useRef(null);
  const charRef = useRef();
  const pointRef = useRef();
  const shadowLightRef = useRef();
  const { scene } = useThree();

  useHelper(pointRef, PointLightHelper, 10);
  useHelper(shadowLightRef, DirectionalLightHelper, 10);
  useHelper(charRef, THREE.BoxHelper);

  useEffect(() => {
    if (charRef.current) {
      charRef.current.traverse((child) => {
        child.castShadow = true;
      });
      const box = new Box3().setFromObject(charRef.current);
      const offsetY = (box.max.y - box.min.y) / 2;
      charRef.current.position.y = offsetY;
    }
  }, [charRef]);

  useEffect(() => {
    if (shadowLightRef.current) {
      shadowLightRef.current.target.position.set(0, 0, 0);
      scene.add(shadowLightRef.current.target);
    }
  }, [shadowLightRef, scene]);

  return (
    // <Suspense fallback={null}>
    <mesh ref={box}>
      {/* <boxGeometry attach="geometry" args={[1, 1, 1]} />
        <meshLambertMaterial
          attach={"material"}
          transparent={true}
          opacity={1}
          color={0x244497}
        /> */}
      <primitive ref={charRef} object={mesh} castShadow={true} />
      <mesh rotation-x={-Math.PI / 2} receiveShadow={true}>
        <planeBufferGeometry args={[1000, 1000]} />
        <meshPhongMaterial color={0x878787} />
      </mesh>
      <PerspectiveCamera
        makeDefault
        position={[0, 100, 500]}
        fov={60}
        near={1}
        far={5000}
      />
      <ambientLight color={0xffffff} intensity={0.5} />
      <pointLight
        ref={pointRef}
        distance={2000}
        position={[500, 150, 500]}
        intensity={1.5}
        color={0xffffff}
      />
      <pointLight
        ref={pointRef}
        distance={2000}
        position={[-500, 150, 500]}
        intensity={1.5}
        color={0xffffff}
      />
      <pointLight
        distance={2000}
        position={[-500, 150, -500]}
        intensity={1.5}
        color={0xffffff}
      />
      <pointLight
        distance={2000}
        position={[500, 150, -500]}
        intensity={1.5}
        color={0xffffff}
      />
      <directionalLight
        castShadow={true}
        ref={shadowLightRef}
        color={0xffffff}
        intensity={0.2}
        position={[200, 500, 200]}
        target-position={[0, 0, 0]}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={100}
        shadow-camera-far={900}
        shadow-camera-left={-700}
        shadow-camera-right={700}
        shadow-camera-top={700}
        shadow-camera-bottom={-700}
        shadow-radius={5}
      />
      <axesHelper args={[1000]} />
      <OrbitControls />
    </mesh>
    // </Suspense>
  );
}

export default App;
