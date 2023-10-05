import { useGLTF } from "@react-three/drei";
import { mapAtom } from "./SocketManager";
import { useAtom } from "jotai";
import { useMemo } from "react";
import { SkeletonUtils } from "three-stdlib";
import { useGrid } from "../hooks/useGrid";

export const Item = ({ item, onClick, isDragging, dragPosition, canDrop }) => {
  const { name, gridPosition, size, rotation } = item;
  const { gridToVector3 } = useGrid();
  const [map] = useAtom(mapAtom);
  const { scene } = useGLTF(`models/items/${name}.glb`);

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const width = rotation === 1 || rotation === 3 ? size[1] : size[0];
  const height = rotation === 1 || rotation === 3 ? size[0] : size[1];

  return (
    <group
      onClick={onClick}
      position={gridToVector3(
        isDragging ? dragPosition || gridPosition : gridPosition,
        width,
        height
      )}
    >
      <primitive object={clone} rotation-y={((rotation || 0) * Math.PI) / 2} />
      {isDragging && (
        <mesh>
          <boxGeometry
            args={[width / map.gridDivision, 0.2, height / map.gridDivision]}
          />
          <meshBasicMaterial
            color={canDrop ? "green" : "red"}
            opacity={0.3}
            transparent
          />
        </mesh>
      )}
    </group>
  );
};
