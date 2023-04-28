import React, { useEffect, useRef, useState } from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

const AppTwo = () => {
  const [controls, setControls] = useState({});
  const gltf = useLoader(GLTFLoader, "/models/aniChar214.glb");

  const boxRef = useRef();
  const charRef = useRef();

  const [mixer] = useState(() => new THREE.AnimationMixer());
  const animations = gltf.animations;

  // const [animations, setAnimations] = useState(gltf.animations);
  const [curAnimations, setCurAnimations] = useState(animations[0]);

  useEffect(() => {
    return () => mixer.stopAllAction(); // Clean up the mixer on unmount
  }, [mixer]);

  useFrame((state, delta) => {
    mixer.update(delta); // Update the animation mixer on each frame
  });

  // Start the desired animation, for example the first one:
  useEffect(() => {
    if (!charRef.current) return;
    const action = mixer.clipAction(curAnimations, charRef.current);
    mixer.stopAllAction(); // Stop the previous action
    action.play();
  }, [curAnimations, mixer]);

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
    } else if (controls.w) {
      setCurAnimations(animations[1]);
    } else {
      setCurAnimations(animations[0]);
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
      {/* <mesh rotation-x={-Math.PI / 2} receiveShadow={true}>
        <planeGeometry args={[1000, 1000]} />
      </mesh> */}
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
