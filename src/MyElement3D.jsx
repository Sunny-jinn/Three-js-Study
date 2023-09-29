import {
  Environment,
  OrbitControls,
  useAnimations,
  useGLTF,
} from "@react-three/drei";
import { useControls } from "leva";
import { useEffect, useState } from "react";

const MyElement3D = () => {
  const model = useGLTF("./models/model.glb");
  const animations = useAnimations(model.animations, model.scene);

  const { actionName } = useControls({
    actionName: {
      value: animations.names[1],
      options: animations.names,
    },
  });

  useEffect(() => {
    const action = animations.actions[actionName];
    action.reset().fadeIn(0.5).play();
    return () => {
      action.fadeOut(0.5);
    };
  }, [actionName]);

  const [height, setHeight] = useState(0);

  useEffect(() => {
    let minY = Infinity,
      maxY = -Infinity;

    model.scene.traverse((item) => {
      if (item.isMesh) {
        const geomBbox = item.geometry.boundingBox;
        if (minY > geomBbox.min.y) minY = geomBbox.min.y;
        if (maxY < geomBbox.max.y) maxY = geomBbox.max.y;
      }
    });

    const h = maxY - minY;
    setHeight(h);
  }, [model.scene]);

  return (
    <>
      <OrbitControls />

      <Environment blur={0.05} files={"./images/rural_asphalt_road_4k.hdr"} />
      <primitive
        scale={5}
        object={model.scene}
        position-y={-(height / 2) * 5}
      />
    </>
  );
};

export default MyElement3D;
