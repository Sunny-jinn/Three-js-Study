import { Box, OrbitControls, Sphere, Torus } from "@react-three/drei";
import { BallCollider, RigidBody } from "@react-three/rapier";

const MyElement3D = () => {
  return (
    <>
      <OrbitControls />

      <ambientLight intensity={1.5} />
      <directionalLight position={[-10, 10, 0]} intensity={0.4} />

      <RigidBody position={[0, 5, 0]} colliders={false} gravityScale={4}>
        <BallCollider args={[1]} position={[0, 1, 0]} />
        <Sphere position-y={1}>
          <meshStandardMaterial color={"hotpink"} />
        </Sphere>
        <Box>
          <meshStandardMaterial color={"royalblue"} />
        </Box>
      </RigidBody>

      <RigidBody position={[-2, 5, 0]} colliders="trimesh">
        <Torus>
          <meshStandardMaterial color={"orange"} />
        </Torus>
      </RigidBody>

      <RigidBody type="fixed" restitution={2}>
        <Box position={[0, 0, 0]} args={[10, 1, 10]}>
          <meshStandardMaterial color={"springgreen"} />
        </Box>
      </RigidBody>
    </>
  );
};

export default MyElement3D;
