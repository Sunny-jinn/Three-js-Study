import { OrbitControls, useTexture } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const MyElement3D = () => {
  return (
    <>
      <OrbitControls />

      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 1, -8]} intensity={0.5} />
      <directionalLight position={[1, 2, 8]} intensity={0.5} />

      <mesh>
        <boxGeometry />
        <meshStandardMaterial color={"cyan"} />
      </mesh>
    </>
  );
};

export default MyElement3D;
