import { Box, OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const MyElement3D = () => {
  // Drei : R3F에서 사용할 수 있는 유용한 컴포넌트들을 모아놓은 라이브러리
  const refMesh = useRef();
  const refWireMesh = useRef();

  const { xSize, ySize, zSize, xSegments, ySegments, zSegments } = useControls({
    xSize: { value: 1, min: 0.1, max: 5, step: 0.01 },
    ySize: { value: 1, min: 0.1, max: 5, step: 0.01 },
    zSize: { value: 1, min: 0.1, max: 5, step: 0.01 },
    xSegments: { value: 1, min: 1, max: 10, step: 1 },
    ySegments: { value: 1, min: 1, max: 10, step: 1 },
    zSegments: { value: 1, min: 1, max: 10, step: 1 },
  });

  /*
    FEAT: BOX Geometry를 두 개 사용하지 않고 위치가 같고 
    와이어 프레임처럼 사용할 시 이렇게 useEffect를 사용하여 
    메모리 낭비를 줄일 수 있음
  */
  useEffect(() => {
    refWireMesh.current.geometry = refMesh.current.geometry;
  }, [xSize, ySize, zSize, xSegments, ySegments, zSegments]);

  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight position={[2, 1, 3]} intensity={0.5} />

      <OrbitControls />

      <mesh ref={refMesh}>
        <boxGeometry
          args={[xSize, ySize, zSize, xSegments, ySegments, zSegments]}
        />
        <meshStandardMaterial color="#1abc9c" opacity={1} />
      </mesh>

      <mesh ref={refWireMesh}>
        <meshStandardMaterial emissive="yellow" opacity={1} wireframe />
      </mesh>
    </>
  );
};

export default MyElement3D;
