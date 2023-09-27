import { Box, OrbitControls, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const MyElement3D = () => {
  // Drei : R3F에서 사용할 수 있는 유용한 컴포넌트들을 모아놓은 라이브러리
  const refMesh = useRef();
  const refWireMesh = useRef();
  const mesh2 = useRef();

  // const { xSize, ySize, zSize, xSegments, ySegments, zSegments } = useControls({
  //   xSize: { value: 1, min: 0.1, max: 5, step: 0.01 },
  //   ySize: { value: 1, min: 0.1, max: 5, step: 0.01 },
  //   zSize: { value: 1, min: 0.1, max: 5, step: 0.01 },
  //   xSegments: { value: 1, min: 1, max: 10, step: 1 },
  //   ySegments: { value: 1, min: 1, max: 10, step: 1 },
  //   zSegments: { value: 1, min: 1, max: 10, step: 1 },
  // });

  /*
    FEAT: BOX Geometry를 두 개 사용하지 않고 위치가 같고 
    와이어 프레임처럼 사용할 시 이렇게 useEffect를 사용하여 
    메모리 낭비를 줄일 수 있음
  */
  // useEffect(() => {
  //   refWireMesh.current.geometry = refMesh.current.geometry;
  // }, [xSize, ySize, zSize, xSegments, ySegments, zSegments]);

  useEffect(() => {
    mesh2.current.material = refMesh.current.material;
  }, []);

  const mapcap = useTexture("./images/mapcap.jpg");

  const {
    roughness,
    metalness,
    clearcoat,
    clearcoatRoughness,
    transmission,
    thickness,
    ior,
  } = useControls({
    roughness: { value: 0, min: 0, max: 1, step: 0.01 },
    metalness: { value: 0, min: 0, max: 1, step: 0.01 },
    clearcoat: { value: 0, min: 0, max: 1, step: 0.01 },
    transmission: { value: 0, min: 0, max: 1, step: 0.01 },
    thickness: { value: 0, min: 0, max: 10, step: 0.01 },
    ior: { value: 1.5, min: 0, max: 2.333, step: 0.01 },
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[0, 1, 0]} />
      <directionalLight position={[1, 2, 8]} intensity={0.7} />

      <OrbitControls />

      <mesh ref={refMesh} position={[0.7, 0, 0]}>
        <torusKnotGeometry args={[0.5, 0.15, 256, 128]} />
        {/* <meshPhysicalMaterial
          visible={true}
          transparent={true}
          side={THREE.DoubleSide}
          depthTest={true}
          depthWrite={true}
          color={0xffffff}
          emissive={0x00000}
          opacity={1}
          roughness={roughness}
          metalness={metalness}
          clearcoat={clearcoat}
          clearcoatRoughness={clearcoatRoughness}
          transmission={transmission}
          thickness={thickness}
          ior={ior}
        /> */}
        <meshToonMaterial />
      </mesh>

      <mesh ref={mesh2} position={[-0.7, 0, 0]}>
        <torusGeometry args={[0.5, 0.2]} />
      </mesh>
    </>
  );
};

export default MyElement3D;
