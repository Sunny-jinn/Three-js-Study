import React, { useEffect, useRef, useState } from "react";
import { OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { useBox, useContactMaterial, usePlane } from "@react-three/cannon";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { Box3 } from "three";

const AppTwo = () => {
  const [controls, setControls] = useState({});
  const gltf = useLoader(GLTFLoader, "/models/bearCharacter.glb");

  useEffect(() => {
    if (gltf.scene) {
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
        }
      });
    }
  }, [gltf.scene]);

  const charBoxRef = useRef();
  const charRef = useRef();

  //FEAT: Character box
  const [ref, api] = useBox(() => ({
    mass: 1,
    ref: charBoxRef,
    args: [75, 75, 75],
    linearFactor: [1, 0, 1], // restrict movement to only along the XZ plane
    angularFactor: [0, 0, 0], // prevent rotation
  }));

  //FEAT: Red box
  const [boxRef] = useBox(() => ({
    mass: 1, // Make the box static by setting its mass to 0
    position: [150, 37.5, 0], // adjust position of the box
    args: [75, 75, 75],
    type: "Static",
  }));

  const [groundRef] = usePlane(() => ({
    type: "Dynamic",
    mass: 0,
    rotation: [-Math.PI / 2, 0, 0],
  }));

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

  useFrame(() => {
    if (charBoxRef.current && boxRef.current) {
      const characterBox = new Box3().setFromObject(charBoxRef.current);
      const boxBox = new Box3().setFromObject(boxRef.current);

      if (characterBox.intersectsBox(boxBox)) {
        console.log("충돌했어요!");
        // Handle the collision, e.g., stop the character's movement or apply a response force
      }
    }
  });

  // Start the desired animation, for example the first one:
  useEffect(() => {
    if (!charRef.current) return;
    const action = mixer.clipAction(curAnimations, charRef.current);
    mixer.stopAllAction(); // Stop the previous action
    // action.fadeOut(0.1).stop();
    // mixer.action.fadeOut(0.1).stop();
    action.fadeIn(0.2).play();
  }, [curAnimations, mixer]);

  useEffect(() => {
    // Apply a downward force to the character box
    api.applyForce([0, -10, 0], [0, 0, 0]);
  }, [api]);

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

  useEffect(() => {
    if (controls.w || controls.a || controls.d || controls.s) {
      setCurAnimations(animations[1]);
    } else {
      setCurAnimations(animations[0]);
    }
  }, [controls]);

  // useFrame(() => {
  //   if (controls.a) {
  //     charBoxRef.current.position.x -= 2;
  //   } else if (controls.d) {
  //     charBoxRef.current.position.x += 2;
  //   } else if (controls.w) {
  //     charBoxRef.current.position.z += 2;
  //   } else if (controls.s) {
  //     charBoxRef.current.position.z -= 2;
  //   }
  // });

  //FEAT: new character movement
  useFrame(() => {
    if (api) {
      let moveSpeed = 200; // You can adjust this value to control the character's movement speed

      if (controls.a) {
        api.velocity.set(-moveSpeed, 0, 0);
      } else if (controls.d) {
        api.velocity.set(moveSpeed, 0, 0);
      } else if (controls.w) {
        api.velocity.set(0, 0, -moveSpeed);
      } else if (controls.s) {
        api.velocity.set(0, 0, moveSpeed);
      } else if (controls.f) {
        api.velocity.set(0, -10, 0);
      } else {
        // Stop the character when no movement keys are pressed
        api.velocity.set(0, 0, 0);
      }
    }
  });

  return (
    <>
      <mesh receiveShadow ref={boxRef}>
        <boxGeometry args={[75, 75, 75]} />
        <meshPhongMaterial color={0xff0000} />
      </mesh>
      <mesh scale={40} ref={ref}>
        <primitive object={gltf.scene} ref={charRef} />
      </mesh>
      <mesh ref={groundRef} rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[1000, 1000]} />
        <meshPhongMaterial color={0x878787} />
      </mesh>
      <ambientLight color={0xffffff} intensity={1} />

      <directionalLight
        castShadow={true}
        color={0xffffff}
        intensity={1}
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
      <PerspectiveCamera
        makeDefault
        position={[300, 300, 1000]}
        near={0.1}
        far={10000}
      />
      <OrbitControls />
    </>
  );
};

export default AppTwo;
