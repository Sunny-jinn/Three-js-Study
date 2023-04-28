import React, { useEffect, useRef, useState } from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { MeshStandardMaterial } from "three";

const AppTwo = () => {
  const [controls, setControls] = useState({});
  //   const { scene, animations } = useGLTF("/models/prevChar.glb");
  //   const gltf = useLoader(GLTFLoader, "/models/prevChar2.glb");
  const gltf = useLoader(GLTFLoader, "/models/newChar.glb");
  //   const material = new MeshStandardMaterial({ color: 0xffffff });

  //   gltf.scene.traverse((child) => {
  //     if (child.isMesh) {
  //       child.material = material;
  //     }
  //   });

  const boxRef = useRef();
  const charRef = useRef();

  useEffect(() => {
    const keyDownPressHandler = (e) => {
      setControls((controls) => ({
        ...controls,
        [e.key.toLowerCase()]: true,
      }));
    };

    const keyUpPressHandler = (e) => {
      setControls((controls) => ({
        ...controls,
        [e.key.toLowerCase()]: false,
      }));
    };

    window.addEventListener("keydown", keyDownPressHandler);
    window.addEventListener("keyup", keyUpPressHandler);
    return () => {
      window.removeEventListener("keydown", keyDownPressHandler);
      window.removeEventListener("keyup", keyUpPressHandler);
    };
  }, []);

  useFrame(() => {
    if (controls.a) {
      boxRef.current.position.x -= 2;
    } else if (controls.d) {
      boxRef.current.position.x += 2;
    }
  });

  return (
    <>
      {/* <mesh ref={boxRef} position={[0, 50, 0]}>
        <boxGeometry args={[75, 75, 75]} />
        <meshPhongMaterial color={0xff0000} />
      </mesh> */}
      <mesh scale={40} ref={boxRef}>
        <primitive object={gltf.scene} ref={charRef} />
      </mesh>
      <ambientLight color={0xffffff} intensity={1} />
      <pointLight position={[50, 50, 50]} intensity={1.5} />
      <pointLight position={[-50, 70, -50]} intensity={1.5} />
      <pointLight position={[50, 70, -50]} intensity={1.5} />
      <pointLight position={[-50, 70, 50]} intensity={1.5} />
      <OrbitControls />
    </>
  );
};

export default AppTwo;
