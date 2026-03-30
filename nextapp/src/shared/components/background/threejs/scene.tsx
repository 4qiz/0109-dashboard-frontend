"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Effects } from "@react-three/drei";
import { Saturn } from "./saturn";
import { Cubes } from "./cubes";
import { useMemo } from "react";

function RandomScene() {
  const components = [Saturn, Cubes];

  const RandomComponent = useMemo(() => {
    const index = Math.floor(Math.random() * components.length);
    return components[index];
  }, []);

  return <RandomComponent />;
}

export const ThreeScene = () => {
  return (
    <div className="w-[150vw] h-[150vh] md:h-screen bg-black">
      <Canvas camera={{ position: [0, 0, 100], fov: 60 }}>
        <fog attach="fog" args={["#000000", 0.01]} />

        <RandomScene />

        <OrbitControls
          autoRotate={true}
          enableRotate={true}
          enableZoom={true}
          enablePan={false}
          enableDamping
          dampingFactor={0.05}
          rotateSpeed={0.8}
        />
        <Effects disableGamma>
          {/* @ts-ignore */}
          <unrealBloomPass threshold={0} strength={1.8} radius={0.4} />
        </Effects>
      </Canvas>
    </div>
  );
};
