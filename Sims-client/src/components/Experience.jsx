import {
  ContactShadows,
  Environment,
  Grid,
  OrbitControls,
  useCursor,
} from "@react-three/drei";
import { AnimatedWoman } from "./AnimatedWoman";
import { useAtom } from "jotai";
import { charactersAtom, mapAtom, socket, userAtom } from "./SocketManager";
import { useEffect, useState } from "react";
import * as THREE from "three";
import { Item } from "./Items";
import { useThree } from "@react-three/fiber";
import { useGrid } from "../hooks/useGrid";

export const Experince = () => {
  const [buildMode, setBuildMode] = useState(true);
  const [characters] = useAtom(charactersAtom);
  const [map] = useAtom(mapAtom);
  const [items, setItems] = useState(map.items);
  const [onFloor, setOnFloor] = useState(false);

  const scene = useThree((state) => state.scene);
  const [user] = useAtom(userAtom);
  useCursor(onFloor);
  const { vector3ToGrid, gridToVector3 } = useGrid();

  const onPlaneClick = (e) => {
    if (!buildMode) {
      const character = scene.getObjectByName(`character-${user}`);
      if (!character) {
        return;
      }
      socket.emit(
        "move",
        vector3ToGrid(character.position),
        vector3ToGrid(e.point)
      );
    } else {
      if (draggedItem !== null) {
        setItems((prev) => {
          const newItems = [...prev];
          newItems[draggedItem].gridPosition = vector3ToGrid(e.point);
          return newItems;
        });
        setDraggedItem(null);
      }
    }
  };

  const [draggedItem, setDraggedItem] = useState(null);
  const [dragPosition, setDragPosition] = useState(null);
  const [canDrop, setCanDrop] = useState(false);

  useEffect(() => {
    if (!draggedItem) {
      return;
    }
    const item = items[draggedItem];
    const width =
      item.rotation === 1 || item.rotation === 3 ? item.size[1] : item.size[0];
    const height =
      item.rotation === 1 || item.rotation === 3 ? item.size[0] : item.size[1];

    let droppable = true;

    // 아이템이 맵 범위를 벗어나지 않았는가
    if (
      dragPosition[0] < 0 ||
      dragPosition[0] + width > map.size[0] * map.gridDivision
    ) {
      droppable = false;
    }
    if (
      dragPosition[1] < 0 ||
      dragPosition[1] + height > map.size[1] * map.gridDivision
    ) {
      droppable = false;
    }

    // 아이템이 다른 아이템과 겹치지 않는가
    if (!item.walkable && !item.wall) {
      items.forEach((otherItem, idx) => {
        // ignore self
        if (idx == draggedItem) {
          return;
        }

        // ignore wall & floor
        if (otherItem.walkable || otherItem.wall) {
          return;
        }

        // check item overlap
        const otherWidth =
          otherItem.rotation === 1 || otherItem.rotation === 3
            ? otherItem.size[1]
            : otherItem.size[0];
        const otherHeight =
          otherItem.rotation === 1 || otherItem.rotation === 3
            ? otherItem.size[0]
            : otherItem.size[1];
        if (
          dragPosition[0] < otherItem.gridPosition[0] + otherWidth &&
          dragPosition[0] + width > otherItem.gridPosition[0] &&
          dragPosition[1] < otherItem.gridPosition[1] + otherHeight &&
          dragPosition[1] + height > otherItem.gridPosition[1]
        ) {
          droppable = false;
        }
      });
    }

    setCanDrop(droppable);
  }, [dragPosition, draggedItem, items]);

  return (
    <>
      <Environment preset="sunset" />
      <ambientLight intensity={0.3} />
      <OrbitControls />

      {(buildMode ? items : map.items).map((item, idx) => (
        <Item
          key={`${item.name}-${idx}`}
          item={item}
          onClick={() => setDraggedItem((prev) => (prev === null ? idx : prev))}
          isDragging={draggedItem === idx}
          dragPosition={dragPosition}
          canDrop={canDrop}
        />
      ))}
      <mesh
        rotation-x={-Math.PI / 2}
        position-y={-0.001}
        onClick={onPlaneClick}
        onPointerEnter={() => setOnFloor(true)}
        onPointerLeave={() => setOnFloor(false)}
        onPointerMove={(e) => {
          if (!buildMode) {
            return;
          }
          const newPosition = vector3ToGrid(e.point);
          if (
            !dragPosition ||
            newPosition[0] !== dragPosition[0] ||
            newPosition[1] !== dragPosition[1]
          ) {
            setDragPosition(newPosition);
          }
        }}
        position-x={map.size[0] / 2}
        position-z={map.size[1] / 2}
      >
        <planeGeometry args={map.size} />
        <meshStandardMaterial color={"#f0f0f0"} />
      </mesh>
      <Grid infiniteGrid fadeDistance={50} fadeStrength={5} />
      {!buildMode &&
        characters.map((character) => (
          <AnimatedWoman
            id={character.id}
            key={character.id}
            path={character.path}
            position={gridToVector3(character.position)}
            hairColor={character.hairColor}
            topColor={character.topColor}
            bottomColor={character.bottomColor}
          />
        ))}
    </>
  );
};
