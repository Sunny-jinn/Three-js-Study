import {
  AccumulativeShadows,
  ContactShadows,
  Environment,
  OrbitControls,
  RandomizedLight,
  SoftShadows,
  useHelper,
  useTexture,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const torusGeometry = new THREE.TorusGeometry(0.4, 0.1, 32, 32);
const torusMaterial = new THREE.MeshStandardMaterial({
  color: "#9b59b6",
  roughness: 0.5,
  metalness: 0.9,
});

const MyElement3D = () => {
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const smallShperePivot = state.scene.getObjectByName("smallSpherePivot");
    smallShperePivot.rotation.y = THREE.MathUtils.degToRad(time * 50);
  });

  return (
    <>
      <OrbitControls />

      <ambientLight intensity={0.1} />

      <directionalLight color={0xffffff} intensity={1} position={[0, 5, 0]} />
      {/**
       * FEAT: ContactShadows는 R3F의 그림자 기술이 아닌
       * 독립적인 그림자이기에 Canvas에서 shadows를 지워도 되고
       * mesh에서 castshadow와 receiveshadow 속성을 추가하지 않아도 된다
       */}
      <ContactShadows
        position={[0, 0, 0]}
        scale={10}
        resolution={512}
        color={0xff0000}
        opacity={1}
        blur={0.5}
        frames={1} //정적인 그림자로 사용하고 싶을 때
      />

      {/* <mesh rotation-x={THREE.MathUtils.degToRad(-90)}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial
          color={0x2c3e50}
          roughness={0.5}
          metalness={0.5}
          side={THREE.DoubleSide}
        />
      </mesh> */}

      <mesh position-y={1.7}>
        <torusKnotGeometry args={[1, 0.2, 128, 32]} />
        <meshStandardMaterial
          color={"#ffffff"}
          roughness={0.1}
          metalness={0.2}
        />
      </mesh>

      {new Array(8).fill().map((item, index) => {
        return (
          <group key={index} rotation-y={THREE.MathUtils.degToRad(45 * index)}>
            <mesh
              geometry={torusGeometry}
              material={torusMaterial}
              position={[3, 0.5, 0]}
            />
          </group>
        );
      })}

      <group name="smallSpherePivot">
        <mesh position={[3, 0.5, 0]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial
            color={0xe74c3c}
            roughness={0.2}
            metalness={0.5}
          />
        </mesh>
      </group>
      {/**
       * FEAT: Accumulavtive shadow는 정적인 그림자로 한 번 생성되면 움직이지
       * 않지만 GPU나 CPU의 처리 역시 0으로 수렴
       */}
      {/* <AccumulativeShadows
        position={[0, 0.01, 0]}
        scale={12}
        color="#000000"
        opacity={0.7}
        alphaTest={1}
        frames={Infinity}
        temporal
        blend={30}
      >
        <RandomizedLight
          radius={0.5}
          ambient={0.21}
          intensity={1.5}
          position={[5, 3, 0]}
        />
      </AccumulativeShadows> */}
    </>
  );
};

export default MyElement3D;
