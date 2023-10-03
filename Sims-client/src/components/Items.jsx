import { useGLTF } from "@react-three/drei";

export const Item = ({ item }) => {
  const { name, gridPosition, size } = item;
  const { scene } = useGLTF(`models/items/${name}.glb`);
  return <primitive object={scene} />;
};
