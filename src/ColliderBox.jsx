import { useBox } from "@react-three/cannon";

const debug = false;

export function ColliderBox({ position, scale }) {
  //This useBox hook makes collider box.
  useBox(() => ({
    args: scale,
    position,
    type: "Static",
  }));

  return (
    debug && (
      <mesh>
        <boxGeometry args={scale} />
        <meshBasicMaterial transparent={true} opacity={0} />
      </mesh>
    )
  );
}
