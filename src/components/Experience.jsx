import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { AnimatedWoman } from "./AnimatedWoman";

export const Experince = () => {
  return (
    <>
      <Environment preset="sunset" />
      <ambientLight intensity={0.3} />
      <ContactShadows blur={3} />
      <OrbitControls />
      <AnimatedWoman />
      <AnimatedWoman position-x={1} hairColor="red" topColor="blue" />
    </>
  );
};
