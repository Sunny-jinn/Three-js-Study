import {
  Environment,
  OrbitControls,
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
  const light = useRef();
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const smallShperePivot = state.scene.getObjectByName("smallSpherePivot");
    smallShperePivot.rotation.y = THREE.MathUtils.degToRad(time * 50);

    const target = new THREE.Vector3();
    smallShperePivot.children[0].getWorldPosition(target);
    state.camera.position.copy(target);

    const ghostSpherePivot = state.scene.getObjectByName("ghostSpherePivot");
    ghostSpherePivot.rotation.y = THREE.MathUtils.degToRad(time * 50 + 30);
    ghostSpherePivot.children[0].getWorldPosition(target);
    state.camera.lookAt(target);
  });

  useHelper(light, THREE.SpotLightHelper);

  const { camera } = useThree();

  return (
    <>
      {/* <OrbitControls /> */}

      <Environment files={"./images/rural_asphalt_road_4k.hdr"} />

      <mesh rotation-x={THREE.MathUtils.degToRad(-90)}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial
          color={"#2c3e50"}
          roughness={0.5}
          metalness={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh rotation-x={THREE.MathUtils.degToRad(-90)}>
        <sphereGeometry args={[1.5, 64, 64, 0, Math.PI]} />
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

      <group name="ghostSpherePivot">
        <object3D position={[3, 0.5, 0]} />
      </group>
    </>
  );
};

export default MyElement3D;
