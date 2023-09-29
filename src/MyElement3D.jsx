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
    smallShperePivot.rotation.y = THREE.MathUtils.degToRad(time * 10);
    smallShperePivot.children[0].getWorldPosition(
      light.current.target.position
    );
  });

  const { scene } = useThree();

  useEffect(() => {
    scene.add(light.current.target);
    // shadowCamera.current = new THREE.CameraHelper(light.current.shadow.camera);
    // scene.add(shadowCamera.current);
    return () => {
      scene.remove(light.current.target);
      // scene.remove(shadowCamera.current);
    };
  }, [light.current]);

  return (
    <>
      <OrbitControls />

      <ambientLight intensity={0.1} />

      <spotLight
        ref={light}
        shadow-mapSize={[512 * 4, 512 * 4]}
        castShadow
        color={0xffffff}
        intensity={0.9}
        position={[0, 5, 0]}
        angle={THREE.MathUtils.degToRad(60)}
      />

      {/* pointLight Shadow
       <pointLight
        ref={light}
        castShadow
        color={0xffffff}
        intensity={1}
        position={[0, 5, 0]}
      /> */}
      {/* FEAT: directionalLight Shadow
      <directionalLight
        castShadow
        ref={light}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-mapSize={[512 * 4, 512 * 4]}
        color={0xffffff}
        intensity={0.9}
        position={[0, 5, 0]}
        target-position={[0, 0, 0]}
      /> */}

      <mesh receiveShadow rotation-x={THREE.MathUtils.degToRad(-90)}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial
          color={"#2c3e50"}
          roughness={0.5}
          metalness={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh castShadow receiveShadow position-y={1.7}>
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
              castShadow
              receiveShadow
              geometry={torusGeometry}
              material={torusMaterial}
              position={[3, 0.5, 0]}
            />
          </group>
        );
      })}

      <group name="smallSpherePivot">
        <mesh castShadow position={[3, 0.5, 0]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial
            color={0xe74c3c}
            roughness={0.2}
            metalness={0.5}
          />
        </mesh>
      </group>
    </>
  );
};

export default MyElement3D;
