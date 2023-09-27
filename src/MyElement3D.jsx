import {
  Box,
  CubeCamera,
  MeshReflectorMaterial,
  MeshRefractionMaterial,
  OrbitControls,
  useTexture,
} from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { useControls } from "leva";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RGBELoader } from "three-stdlib";

const MyElement3D = () => {
  // Drei : R3F에서 사용할 수 있는 유용한 컴포넌트들을 모아놓은 라이브러리
  const refMesh = useRef();
  const refWireMesh = useRef();
  const mesh2 = useRef();

  const texture = useLoader(
    RGBELoader,
    "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr"
  );

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

  // const mapcap = useTexture("./images/mapcap.jpg");

  return (
    <>
      <OrbitControls />

      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 1, 0]} />
      <directionalLight position={[1, 2, 8]} intensity={0.7} />

      <CubeCamera resolution={1024} frames={1} envMap={texture}>
        {(texture) => (
          <mesh>
            <dodecahedronGeometry />
            <MeshRefractionMaterial
              envMap={texture}
              toneMapped={false}
              bounces={2}
              aberrationStrength={0.03}
              ior={2.75}
              fresnel={1}
              color={0xffffff}
              fastChroma={true}
            />
          </mesh>
        )}
      </CubeCamera>

      {
        //FEAT: 바닥에 reflection 주는 코드
        /* <mesh position={[0, -0.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={2048}
          mixBlur={1}
          mixStrength={30}
          roughness={1}
          depthScale={0.7}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          metalness={0.5}
          color={0x050505}
        />
      </mesh>

      <mesh position={[0, 0, 0]}>
        <boxGeometry />
        <meshStandardMaterial color={"cyan"} />
      </mesh> */
      }
    </>
  );
};

export default MyElement3D;
