import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useModelAnimations } from './useModelAnimations';

function Character() {
  const modelRef = useRef();
  const { scene: gltfScene, animations } = useGLTF('./data/character.glb');

  const scene = gltfScene.clone();
  const { mixer } = useModelAnimations(modelRef, { animations });

  // Update the mixer on each frame
  useFrame((_, delta) => {
    if (mixer) {
      mixer.update(delta);
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      // ...other props, e.g., position, rotation, etc.
    />
  );
}
