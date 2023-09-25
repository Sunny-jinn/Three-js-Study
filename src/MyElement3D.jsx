import { Box, OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const MyBox = (props) => {
  const geom = new THREE.BoxGeometry();
  return <mesh {...props} geometry={geom}></mesh>;
};

const MyElement3D = () => {
  // Drei : R3F에서 사용할 수 있는 유용한 컴포넌트들을 모아놓은 라이브러리
  const refMesh = useRef();

  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight position={[2, 1, 3]} intensity={0.5} />

      <OrbitControls />

      <mesh ref={refMesh}>
        <boxGeometry />
        <meshStandardMaterial color="#1abc9c" opacity={1} />
      </mesh>

      <Box position={[1.2, 0, 0]}>
        <meshStandardMaterial color="#8e44ad" opacity={1} />
      </Box>

      <MyBox position={[-1.2, 0, 0]}>
        <meshStandardMaterial color="#e74c3c" opacity={1} />
      </MyBox>
    </>
  );
};

export default MyElement3D;
