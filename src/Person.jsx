import React, { useRef } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import * as THREE from "three";

function Box(props) {
  const meshRef = useRef();
  const speed = 0.1;
  const moveVector = new THREE.Vector3();

  useFrame(() => {
    meshRef.current.position.add(moveVector);
  });

  function onKeyDown(event) {
    if (event.key === "ArrowUp") {
      moveVector.z = -speed;
    } else if (event.key === "ArrowDown") {
      moveVector.z = speed;
    } else if (event.key === "ArrowLeft") {
      moveVector.x = -speed;
    } else if (event.key === "ArrowRight") {
      moveVector.x = speed;
    }
  }

  function onKeyUp(event) {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      moveVector.z = 0;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      moveVector.x = 0;
    }
  }

  return (
    <mesh ref={meshRef} {...props}>
      <boxBufferGeometry />
      <meshStandardMaterial />
      {/* <Canvas onKeyDown={onKeyDown} onKeyUp={onKeyUp} /> */}
    </mesh>
  );
}

function Person() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[0, 0, 0]} />
    </Canvas>
  );
}

export default Person;
