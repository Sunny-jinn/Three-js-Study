/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.13 public/models/Animated Woman.glb -o src/components/AnimatedWoman.jsx -r public 
*/

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame, useGraph } from "@react-three/fiber";
import { SkeletonUtils } from "three-stdlib";
import { useAtom } from "jotai";
import { userAtom } from "./SocketManager";
import { useGrid } from "../hooks/useGrid";

const MOVEMENT_SPEED = 0.072;

export function Avatar({
  hairColor = "green",
  topColor = "pink",
  bottomColor = "brown",
  id,
  avatarUrl = "https://models.readyplayer.me/6527bf61a03b91ea2ab24bd4.glb",
  ...props
}) {
  const avatar = useRef();
  const position = useMemo(() => props.position, []);
  const [path, setPath] = useState();
  const { gridToVector3 } = useGrid();

  useEffect(() => {
    const path = [];
    props.path?.forEach((gridPosition) => {
      path.push(gridToVector3(gridPosition));
    });
    setPath(path);
  }, [props.path]);

  const group = useRef();
  const { scene } = useGLTF(avatarUrl);

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);

  const { animations: walkAnimation } = useGLTF("/animations/M_Walk_001.glb");
  const { animations: idleAnimation } = useGLTF(
    "/animations/M_Standing_Idle_001.glb"
  );

  const { actions } = useAnimations(
    [walkAnimation[0], idleAnimation[0]],
    avatar
  );
  const [animation, setAnimation] = useState("M_Standing_Idle_001");
  useEffect(() => {
    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, []);

  useEffect(() => {
    actions[animation].reset().fadeIn(0.32).play();
    return () => actions[animation]?.fadeOut(0.32);
  }, [animation]);

  const [user] = useAtom(userAtom);

  useFrame((state) => {
    const hips = avatar.current.getObjectByName("Hips");
    hips.position.set(0, hips.position.y, 0);
    if (path?.length && group.current.position.distanceTo(path[0]) > 0.1) {
      const direction = group.current.position
        .clone()
        .sub(path[0])
        .normalize()
        .multiplyScalar(MOVEMENT_SPEED);
      group.current.position.sub(direction);
      group.current.lookAt(path[0]);
      setAnimation("M_Walk_001");
    } else if (path?.length) {
      path.shift();
    } else {
      setAnimation("M_Standing_Idle_001");
    }

    if (id === user) {
      state.camera.position.x = group.current.position.x + 8;
      state.camera.position.y = group.current.position.y + 8;
      state.camera.position.z = group.current.position.z + 8;
      state.camera.lookAt(group.current.position);
    }
  });

  return (
    <group
      ref={group}
      {...props}
      position={position}
      dispose={null}
      name={`character-${id}`}
    >
      <primitive object={clone} ref={avatar} />
    </group>
  );
}

// useGLTF.preload("/models/Animated Woman.glb");
useGLTF.preload("/animations/M_Walk_001.glb");
useGLTF.preload("/animations/M_Standing_Idle_001.glb");
