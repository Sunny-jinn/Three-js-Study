import React, { Suspense, useEffect, useRef, useState } from "react";
import "./App.css";

import {
  OrbitControls,
  PerspectiveCamera,
  useGLTF,
  useHelper,
} from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Box3, DirectionalLightHelper, PointLightHelper } from "three";
import * as THREE from "three";

//FEAT: Character animation
const useModelAnimations = (
  modelRef,
  gltf,
  setDirectionOffset,
  setSpeed,
  setMaxspeed,
  setAcceleration
) => {
  const [mixer, setMixer] = useState(null);
  const [controls, setControls] = useState({});

  const animationsMapRef = useRef(new Map());
  const [previousAnimationAction, setPreviousAnimationAction] = useState(null);
  const [currentAnimationAction, setCurrentAnimationAction] = useState(null);

  const [animationsMap, setAnimationsMap] = useState(new Map());

  useEffect(() => {
    if (modelRef.current && gltf && !mixer) {
      const animationClips = gltf.animations;
      const mixerInstance = new THREE.AnimationMixer(modelRef.current);

      if (animationClips) {
        animationClips.forEach((clip) => {
          const name = clip.name;
          console.log(name);
          animationsMap.set(name, mixerInstance.clipAction(clip));
        });
      }

      setMixer(mixerInstance);
      setAnimationsMap(animationsMap);
      setCurrentAnimationAction(animationsMap.get("Run"));
    }
  }, [modelRef, gltf, mixer]);

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
    let newAnimationAction = currentAnimationAction;
    if (controls.w || controls.a || controls.d || controls.s) {
      if (controls.shift) {
        newAnimationAction = animationsMap.get("Run");
        // setSpeed(350);
        setMaxspeed(350);
        setAcceleration(3);
      } else {
        newAnimationAction = animationsMap.get("Walk");
        // setSpeed(80);
        setMaxspeed(80);
        setAcceleration(3);
      }
    } else {
      newAnimationAction = animationsMap.get("Idle");
      setSpeed(0);
      setMaxspeed(0);
      setAcceleration(0);
    }

    if (
      currentAnimationAction &&
      newAnimationAction &&
      currentAnimationAction !== newAnimationAction
    ) {
      currentAnimationAction.fadeOut(0.5);
      newAnimationAction.reset().fadeIn(0.5).play();
      setCurrentAnimationAction(newAnimationAction);
    }
  }, [controls, animationsMap, currentAnimationAction]);

  useEffect(() => {
    if (controls.w) {
      if (controls.a) {
        setDirectionOffset(Math.PI / 4);
      } else if (controls.d) {
        setDirectionOffset(-Math.PI / 4);
      }
    } else if (controls.s) {
      if (controls.a) {
        setDirectionOffset(Math.PI / 4 + Math.PI / 2);
      } else if (controls.d) {
        setDirectionOffset(-Math.PI / 4 - Math.PI / 2);
      } else {
        setDirectionOffset(Math.PI);
      }
    } else if (controls.a) {
      setDirectionOffset(Math.PI / 2);
    } else if (controls.d) {
      setDirectionOffset(-Math.PI / 2);
    }
  }, [controls]);

  useEffect(() => {
    if (currentAnimationAction) {
      currentAnimationAction.play();
    }
  }, [currentAnimationAction]);

  return { mixer, animationsMap: animationsMapRef.current };
};

//FEAT: Character
function Character({
  charRef,
  setDirectionOffset,
  setSpeed,
  setMaxSpeed,
  setAcceleration,
}) {
  // const modelRef = useRef();
  const { scene, animations } = useGLTF("/models/character.glb");

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
  useHelper(charRef, THREE.BoxHelper);

  const { mixer } = useModelAnimations(
    charRef,
    { animations },
    setDirectionOffset,
    setSpeed,
    setMaxSpeed,
    setAcceleration
  );

  // Update the mixer on each frame
  useFrame((_, delta) => {
    if (mixer) {
      mixer.update(delta);
    }
  });

  return (
    <primitive
      ref={charRef}
      object={scene}
      castShadow={true}
      // ...other props, e.g., position, rotation, etc.
    />
  );
}

function Ground() {
  return (
    <mesh rotation-x={-Math.PI / 2} receiveShadow={true}>
      <planeGeometry args={[1000, 1000]} />
      <meshPhongMaterial color={0x878787} />
    </mesh>
  );
}

//FEAT: App.js
function App() {
  const [gltf, setGltf] = useState({});
  const [directionOffset, setDirectionOffset] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [maxSpeed, setMaxSpeed] = useState(0);
  const [acceleration, setAcceleration] = useState(0);

  const box = useRef(null);
  const charRef = useRef();
  const pointRef = useRef();
  const cameraRef = useRef();
  const orbitRef = useRef();
  const shadowLightRef = useRef();
  const { scene } = useThree();

  useHelper(pointRef, PointLightHelper, 10);
  useHelper(shadowLightRef, DirectionalLightHelper, 10);

  useEffect(() => {
    if (shadowLightRef.current) {
      shadowLightRef.current.target.position.set(0, 0, 0);
      scene.add(shadowLightRef.current.target);
    }
  }, [shadowLightRef, scene]);

  useFrame(() => {
    if (charRef.current && cameraRef.current) {
      const angleCameraDirectionAxisY =
        Math.atan2(
          cameraRef.current.position.x - charRef.current.position.x,
          cameraRef.current.position.z - charRef.current.position.z
        ) + Math.PI;

      const rotateQuaternion = new THREE.Quaternion();
      rotateQuaternion.setFromAxisAngle(
        new THREE.Vector3(0, 1, 0),
        angleCameraDirectionAxisY + directionOffset
      );

      charRef.current.quaternion.rotateTowards(
        rotateQuaternion,
        THREE.MathUtils.degToRad(5)
      );

      //FEAT: Character move
      const walkDirection = new THREE.Vector3();
      cameraRef.current.getWorldDirection(walkDirection);

      walkDirection.y = 0;
      walkDirection.normalize();

      walkDirection.applyAxisAngle(new THREE.Vector3(0, 1, 0), directionOffset);

      if (speed < maxSpeed) setSpeed(speed + acceleration);
      else setSpeed(speed - acceleration * 2);

      const moveX = walkDirection.x * speed * 0.007;
      const moveZ = walkDirection.z * speed * 0.007;

      charRef.current.position.x += moveX;
      charRef.current.position.z += moveZ;

      cameraRef.current.position.x += moveX;
      cameraRef.current.position.z += moveZ;

      //FEAT: Camera moving by character move
      orbitRef.current.target.set(
        charRef.current.position.x,
        charRef.current.position.y,
        charRef.current.position.z
      );
    }
  });

  //hello
  return (
    <Suspense fallback={null}>
      <mesh ref={box}>
        {/* <primitive ref={charRef} object={scene} castShadow={true} /> */}
        <Ground />
        <group>
          <Character
            charRef={charRef}
            directionOffset={directionOffset}
            setDirectionOffset={setDirectionOffset}
            setSpeed={setSpeed}
            setMaxSpeed={setMaxSpeed}
            setAcceleration={setAcceleration}
          />
          {/* <mesh rotation-x={-Math.PI / 2} receiveShadow={true}>
            <planeGeometry args={[1000, 1000]} />
            <meshPhongMaterial color={0x878787} />
          </mesh> */}
        </group>
        <PerspectiveCamera
          makeDefault
          position={[0, 100, 500]}
          ref={cameraRef}
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
        <OrbitControls ref={orbitRef} target={[0, 100, 0]} />
      </mesh>
    </Suspense>
  );
}

export default App;
