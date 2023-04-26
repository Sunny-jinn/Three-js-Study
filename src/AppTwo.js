import React, { useEffect, useRef, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const AppTwo = () => {
  const [controls, setControls] = useState({});

  const boxRef = useRef();

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
      <mesh ref={boxRef}>
        <boxGeometry args={[75, 75, 75]} />
        <meshPhongMaterial color={0xff0000} />
      </mesh>
      <ambientLight color={0xffffff} intensity={0.7} />
      <pointLight position={[150, 150, 150]} />
      <OrbitControls />
    </>
  );
};

export default AppTwo;
