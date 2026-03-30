"use client";

import { StarsBackground } from "@/shared/components/background/stars-background";
import { ThreeScene } from "@/shared/components/background/threejs/scene";
import { NeuroNoise } from "@paper-design/shaders-react";
import { useEffect, useState } from "react";

export const Background = () => {
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);

  useEffect(() => {
    const checkWebGL = () => {
      try {
        const canvas = document.createElement("canvas");
        return !!canvas.getContext("webgl2");
      } catch {
        return false;
      }
    };

    setHasWebGL(checkWebGL());
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      {hasWebGL === null ? (
        // SSR + first client render → identical
        <div className="w-full h-screen bg-black" />
      ) : !hasWebGL ? (
        // No WebGL
        <div className="w-full h-screen bg-black" />
      ) : (
        // WebGL available
        <>
          <ThreeScene />
          {/* <StarsBackground className="dark:hidden" /> */}
          {/* <NeuroNoise
            width="100%"
            height="100%"
            colorBack="#000000"
            colorMid="#47a6ff"
            colorFront="#c4c4c4"
            brightness={0}
            contrast={0.3}
            speed={0.14}
            className="hidden dark:block"
          /> */}
        </>
      )}
    </div>
  );
};
